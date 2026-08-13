const input = document.getElementById("qr-input");
const generateBtn = document.getElementById("generate");
const clearBtn = document.getElementById("clear");
const downloadBtn = document.getElementById("download");
const printBtn = document.getElementById("print");
const qrContainer = document.getElementById("qrcode");
const backToTop = document.getElementById("backToTop");

let qrCode = null;


// =====================================
// Generate QR Code
// =====================================

generateBtn.addEventListener("click", () => {

    const text = input.value.trim();

    if (text === "") {

        alert("Please enter a website or text first.");

        return;

    }


    qrContainer.innerHTML = "";


    qrCode = new QRCode(qrContainer, {

        text: text,

        width: 220,

        height: 220

    });

});



// =====================================
// Clear
// =====================================

clearBtn.addEventListener("click", () => {

    input.value = "";

    qrContainer.innerHTML = "";

    qrCode = null;

});



// =====================================
// Download QR Code
// =====================================

downloadBtn.addEventListener("click", () => {

    const img = qrContainer.querySelector("img");


    if (!img) {

        alert("Generate a QR Code first.");

        return;

    }


    const link = document.createElement("a");

    link.href = img.src;

    link.download = "qrcode.png";

    link.click();

});



// =====================================
// Print QR Code
// =====================================

printBtn.addEventListener("click", () => {

    const img = qrContainer.querySelector("img");


    if (!img) {

        alert("Generate a QR Code first.");

        return;

    }


    localStorage.setItem("qrCodeToPrint", img.src);


    window.open("print.html", "_blank");

});



// =====================================
// Back to Top
// =====================================

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