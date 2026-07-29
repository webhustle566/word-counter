console.log("JavaScript is working");

const textBox = document.getElementById("text");

const words = document.getElementById("words");
const characters = document.getElementById("characters");
const charactersNoSpaces = document.getElementById("charactersNoSpaces");
const sentences = document.getElementById("sentences");
const paragraphs = document.getElementById("paragraphs");
const reading = document.getElementById("reading");


textBox.addEventListener("input", function () {

    const text = textBox.value;

    // Characters
    characters.textContent = text.length;

    // Characters without spaces
    charactersNoSpaces.textContent = text.replace(/\s/g, "").length;

    // Words
    const wordCount = text.trim() === ""
        ? 0
        : text.trim().split(/\s+/).length;

    words.textContent = wordCount;


    // Sentences
    const sentenceCount = text.trim() === ""
        ? 0
        : text.split(/[.!?]+/).filter(Boolean).length;

    sentences.textContent = sentenceCount;


    // Paragraphs
    const paragraphCount = text.trim() === ""
        ? 0
        : text.split(/\n+/).filter(Boolean).length;

    paragraphs.textContent = paragraphCount;


    // Reading time
    const readingTime = Math.ceil(wordCount / 200);

    reading.textContent = readingTime + " min";

});