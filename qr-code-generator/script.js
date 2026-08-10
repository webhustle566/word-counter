const input = document.getElementById("qr-input");
const generateBtn = document.getElementById("generate");
const clearBtn = document.getElementById("clear");
const downloadBtn = document.getElementById("download");
const qrContainer = document.getElementById("qrcode");

let qrCode = null;

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


clearBtn.addEventListener("click", () => {

    input.value = "";

    qrContainer.innerHTML = "";

});


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
// Back to Top Button
// =====================================

const backToTop = document.getElementById("backToTop");


window.addEventListener("scroll", () => {

    if(window.scrollY > 500){

        backToTop.style.display = "flex";

    }

    else{

        backToTop.style.display = "none";

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});