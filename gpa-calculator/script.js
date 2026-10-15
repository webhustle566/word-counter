
const classContainer = document.getElementById("classContainer");
const addClassButton = document.getElementById("addClass");
const calculateButton = document.getElementById("calculate");
const gpaResult = document.getElementById("gpaResult");
const previousSection = document.getElementById("previousSection");
const previousGPA = document.getElementById("previousGPA");
const previousCredits = document.getElementById("previousCredits");

const gradePoints = {
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D+": 1.3,
    "D": 1.0,
    "F": 0.0,
    "P": null
};

function createClassRow() {
    const row = document.createElement("div");
    row.className = "class-row";

    row.innerHTML = `
        <input type="text" placeholder="Class Name" class="class-name">

        <select class="grade">
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="B-">B-</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="C-">C-</option>
            <option value="D+">D+</option>
            <option value="D">D</option>
            <option value="F">F</option>
            <option value="P">P (Pass)</option>
        </select>

        <input type="number" placeholder="Credits" class="credits" min="1" step="1">

        <select class="level">
            <option value="regular">Regular</option>
            <option value="honors">Honors</option>
            <option value="ap">AP / Advanced</option>
        </select>

        <button type="button" class="remove">X</button>
    `;

    row.querySelector(".remove").addEventListener("click", () => {
        row.remove();
    });

    classContainer.appendChild(row);
}

createClassRow();

addClassButton.addEventListener("click", createClassRow);

// Show or hide previous GPA fields.
document.querySelectorAll('input[name="calcType"]').forEach(option => {
    option.addEventListener("change", () => {
        const cumulative =
            document.querySelector('input[name="calcType"]:checked').value
            === "cumulative";

        previousSection.classList.toggle("hidden", !cumulative);
    });
});

// Add the weighted/unweighted selector to the existing page.
const weightingSection = document.createElement("div");
weightingSection.className = "settings weighting-settings";
weightingSection.innerHTML = `
    <h2>GPA Scale</h2>
    <label>
        <input type="radio" name="gpaWeighting" value="unweighted" checked>
        Unweighted GPA (4.0 scale)
    </label>
    <label>
        <input type="radio" name="gpaWeighting" value="weighted">
        Weighted GPA (Honors +0.5, AP +1.0)
    </label>
    <p class="note">
        Weighted GPA uses a common 5.0 maximum policy. Your school's rules may differ.
    </p>
`;

const settings = document.querySelector(".settings");
settings.insertAdjacentElement("afterend", weightingSection);

calculateButton.addEventListener("click", () => {
    const rows = document.querySelectorAll(".class-row");

    let totalPoints = 0;
    let totalCredits = 0;
    let invalidCredits = false;

    const weighting = document.querySelector(
        'input[name="gpaWeighting"]:checked'
    ).value;

    rows.forEach(row => {
        const grade = row.querySelector(".grade").value;
        const creditsInput = row.querySelector(".credits");
        const credits = Number(creditsInput.value);
        const level = row.querySelector(".level").value;

        // Ignore blank credit fields, but reject invalid entered values.
        if (creditsInput.value.trim() === "") return;

        if (!Number.isFinite(credits) || credits <= 0) {
            invalidCredits = true;
            return;
        }

        // Pass/fail classes do not affect GPA.
        if (grade === "P") return;

        let points = gradePoints[grade];

        // F always remains zero, including Honors/AP.
        if (weighting === "weighted" && grade !== "F") {
            if (level === "honors") points += 0.5;
            if (level === "ap") points += 1.0;
            points = Math.min(points, 5.0);
        }

        totalPoints += points * credits;
        totalCredits += credits;
    });

    if (invalidCredits) {
        gpaResult.textContent = "Enter valid positive credits for each class.";
        return;
    }

    if (totalCredits === 0) {
        gpaResult.textContent = "Enter classes and credits";
        return;
    }

    let finalGPA = totalPoints / totalCredits;
    let finalCredits = totalCredits;

    const calcType = document.querySelector(
        'input[name="calcType"]:checked'
    ).value;

    if (calcType === "cumulative") {
        const oldGPA = Number(previousGPA.value);
        const oldCredits = Number(previousCredits.value);

        if (
            previousGPA.value.trim() === "" ||
            previousCredits.value.trim() === "" ||
            !Number.isFinite(oldGPA) ||
            !Number.isFinite(oldCredits) ||
            oldGPA < 0 ||
            oldGPA > 5 ||
            oldCredits <= 0
        ) {
            gpaResult.textContent =
                "Enter a valid previous GPA and positive previous credits.";
            return;
        }

        finalGPA =
            ((oldGPA * oldCredits) + (finalGPA * totalCredits)) /
            (oldCredits + totalCredits);

        finalCredits = oldCredits + totalCredits;
    }

    gpaResult.textContent =
        `${finalGPA.toFixed(2)} (${weighting}, ${finalCredits} credits)`;
});

// Back to Top Button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 500 ? "flex" : "none";
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Highlight Current Tool
const currentPage = window.location.pathname;
const toolLinks = document.querySelectorAll(".tools-dropdown-menu a");

toolLinks.forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname;

    if (
        currentPage === linkPath ||
        currentPage === linkPath.replace(/index\.html$/, "")
    ) {
        link.classList.add("current-tool");
    }
});

// Share This Tool
const shareButton = document.getElementById("shareButton");

if (shareButton) {
    shareButton.addEventListener("click", async () => {
        const shareData = {
            title: document.title,
            text: "Check out this free tool from WebHustle Tools.",
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                // User closed the share menu.
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                shareButton.textContent = "Link Copied!";

                setTimeout(() => {
                    shareButton.textContent = "Share This Tool";
                }, 2000);
            } catch (error) {
                shareButton.textContent = "Copy Link";
            }
        }
    });
}
