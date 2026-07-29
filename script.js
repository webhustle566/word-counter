const textInput = document.getElementById("textInput");

const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");
const charNoSpaces = document.getElementById("charNoSpaces");
const sentenceCount = document.getElementById("sentenceCount");
const paragraphCount = document.getElementById("paragraphCount");
const readingTime = document.getElementById("readingTime");

textInput.addEventListener("input", () => {
    const text = textInput.value;

    // Characters
    charCount.textContent = text.length;

    // Characters without spaces
    charNoSpaces.textContent = text.replace(/\s/g, "").length;

    // Words
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    wordCount.textContent = words.length;

    // Sentences
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    sentenceCount.textContent = sentences.length;

    // Paragraphs
    const paragraphs = text.split(/\n+/).filter(paragraph => paragraph.trim().length > 0);
    paragraphCount.textContent = paragraphs.length;

    // Reading time (average person reads ~200 words/min)
    const minutes = Math.ceil(words.length / 200);
    readingTime.textContent = minutes + " min";
});