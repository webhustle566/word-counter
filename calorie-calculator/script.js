// ======================================
// Elements
// ======================================

const unitSystem = document.getElementById("unitSystem");

const heightUS = document.getElementById("heightUS");
const heightMetric = document.getElementById("heightMetric");

const weightUS = document.getElementById("weightUS");
const weightMetric = document.getElementById("weightMetric");

const calculateBtn = document.getElementById("calculateBtn");

const maintain = document.getElementById("maintain");
const mild = document.getElementById("mild");
const loss = document.getElementById("loss");
const extreme = document.getElementById("extreme");

const clearBtn = document.getElementById("clearBtn");


// ======================================
// Clear Old Saved Results
// ======================================

// Prevent the print page from showing results
// from an older calculation.

localStorage.removeItem("calorieResults");


// ======================================
// Clear Calculator
// ======================================

clearBtn.addEventListener("click", () => {

    document.getElementById("age").value = "";

    document.getElementById("feet").value = "";

    document.getElementById("inches").value = "";

    document.getElementById("pounds").value = "";

    document.getElementById("cm").value = "";

    document.getElementById("kg").value = "";


    maintain.textContent = "—";

    mild.textContent = "—";

    loss.textContent = "—";

    extreme.textContent = "—";


    // Also remove saved results
    localStorage.removeItem("calorieResults");

});


// ======================================
// Number Input Protection
// ======================================

const numberInputs =
    document.querySelectorAll('input[type="number"]');

numberInputs.forEach(input => {

    input.addEventListener("input", () => {

        input.value =
            input.value.replace(/[^0-9.]/g, "");

    });

});


// ======================================
// Switch Between US & Metric
// ======================================

unitSystem.addEventListener("change", () => {

    if (unitSystem.value === "us") {

        heightUS.style.display = "block";

        weightUS.style.display = "block";

        heightMetric.style.display = "none";

        weightMetric.style.display = "none";

    }

    else {

        heightUS.style.display = "none";

        weightUS.style.display = "none";

        heightMetric.style.display = "block";

        weightMetric.style.display = "block";

    }

});


// ======================================
// Calculate Calories
// ======================================

calculateBtn.addEventListener(
    "click",
    calculateCalories
);


function calculateCalories() {

    const age =
        Number(document.getElementById("age").value);

    const gender =
        document.getElementById("gender").value;

    const activity =
        Number(document.getElementById("activity").value);


    let heightCM;

    let weightKG;


    // ------------------------------
    // US Units
    // ------------------------------

    if (unitSystem.value === "us") {

        const feet =
            Number(document.getElementById("feet").value);

        const inches =
            Number(document.getElementById("inches").value);

        const pounds =
            Number(document.getElementById("pounds").value);


        heightCM =
            ((feet * 12) + inches) * 2.54;

        weightKG =
            pounds * 0.45359237;

    }


    // ------------------------------
    // Metric
    // ------------------------------

    else {

        heightCM =
            Number(document.getElementById("cm").value);

        weightKG =
            Number(document.getElementById("kg").value);

    }


    // ------------------------------
    // Mifflin-St Jeor Equation
    // ------------------------------

    let bmr;


    if (gender === "male") {

        bmr =
            (10 * weightKG) +
            (6.25 * heightCM) -
            (5 * age) +
            5;

    }

    else {

        bmr =
            (10 * weightKG) +
            (6.25 * heightCM) -
            (5 * age) -
            161;

    }


    const tdee =
        Math.round(bmr * activity);


    // ------------------------------
    // Results
    // ------------------------------

    maintain.textContent =
        `${tdee.toLocaleString()} Calories/day`;


    mild.textContent =
        `${Math.round(tdee * 0.90).toLocaleString()} Calories/day`;


    loss.textContent =
        `${Math.round(tdee * 0.80).toLocaleString()} Calories/day`;


    extreme.textContent =
        `${Math.round(tdee * 0.60).toLocaleString()} Calories/day`;


    // ======================================
    // Save Results For Printing
    // ======================================

    localStorage.setItem(
        "calorieResults",
        JSON.stringify({

            maintain:
                maintain.textContent,

            mild:
                mild.textContent,

            loss:
                loss.textContent,

            extreme:
                extreme.textContent

        })
    );

}


// ======================================
// Back to Top Button
// ======================================

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.style.display = "flex";

    }

    else {

        backToTop.style.display = "none";

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// =====================================
// Highlight Current Tool
// =====================================

const currentPage = window.location.pathname;

const toolLinks = document.querySelectorAll(
    ".tools-dropdown-menu a"
);

toolLinks.forEach(link => {

    const linkPath = new URL(
        link.href,
        window.location.origin
    ).pathname;

    if (currentPage === linkPath) {

        link.classList.add("current-tool");

    }

});

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