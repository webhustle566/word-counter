const textBox = document.getElementById("text");

const words = document.getElementById("words");
const characters = document.getElementById("characters");
const charactersNoSpaces = document.getElementById("charactersNoSpaces");
const sentences = document.getElementById("sentences");
const paragraphs = document.getElementById("paragraphs");
const reading = document.getElementById("reading");

const clearButton = document.getElementById("clear");
const copyButton = document.getElementById("copy");

const limitInput = document.getElementById("limit");
const limitResult = document.getElementById("limitResult");


function updateCounter() {

    const text = textBox.value;


    characters.textContent = text.length;


    charactersNoSpaces.textContent =
        text.replace(/\s/g, "").length;


    words.textContent =
        text.trim() === ""
        ? 0
        : text.trim().split(/\s+/).length;


    sentences.textContent =
        text.trim() === ""
        ? 0
        : text.split(/[.!?]+/).filter(Boolean).length;


    paragraphs.textContent =
        text.trim() === ""
        ? 0
        : text.split(/\n+/).filter(Boolean).length;


    const wordCount = text.trim() === ""
        ? 0
        : text.trim().split(/\s+/).length;


    reading.textContent =
        Math.ceil(wordCount / 200) + " min";


    updateLimit();

}


function updateLimit() {

    const limit = Number(limitInput.value);

    if (!limit) {
        limitResult.textContent = "Characters remaining: -";
        return;
    }


    const remaining = limit - textBox.value.length;


    limitResult.textContent =
        "Characters remaining: " + remaining;

}



textBox.addEventListener("input", updateCounter);


limitInput.addEventListener("input", updateLimit);



clearButton.addEventListener("click", function() {

    textBox.value = "";

    updateCounter();

});



copyButton.addEventListener("click", function() {

    navigator.clipboard.writeText(textBox.value);

    copyButton.textContent = "Copied!";

    setTimeout(() => {

        copyButton.textContent = "Copy Text";

    }, 1500);

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