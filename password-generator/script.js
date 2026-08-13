const passwordInput = document.getElementById("password");

const generateButton = document.getElementById("generate");

const copyButton = document.getElementById("copy");

const clearButton = document.getElementById("clear");


const lengthSlider = document.getElementById("length");

const lengthValue = document.getElementById("lengthValue");


const uppercase = document.getElementById("uppercase");

const lowercase = document.getElementById("lowercase");

const numbers = document.getElementById("numbers");

const symbols = document.getElementById("symbols");


const strengthText = document.getElementById("strengthText");





lengthSlider.addEventListener("input", function(){

    lengthValue.textContent = lengthSlider.value;

});





function generatePassword(){


    let characters = "";


    if(uppercase.checked){

        characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    }


    if(lowercase.checked){

        characters += "abcdefghijklmnopqrstuvwxyz";

    }


    if(numbers.checked){

        characters += "0123456789";

    }


    if(symbols.checked){

        characters += "!@#$%^&*()_+-={}[]<>?";

    }




    if(characters.length === 0){

        passwordInput.value = "Select at least one option";

        return;

    }





    let password = "";


    for(let i = 0; i < lengthSlider.value; i++){


        let randomIndex = Math.floor(Math.random() * characters.length);


        password += characters[randomIndex];


    }





    passwordInput.value = password;


    checkStrength(password);


}





generateButton.addEventListener("click", generatePassword);







copyButton.addEventListener("click", function(){


    if(passwordInput.value === ""){

        return;

    }



    navigator.clipboard.writeText(passwordInput.value);


    copyButton.textContent = "✓ Copied!";


    setTimeout(function(){

        copyButton.textContent = "Copy Password";

    },1500);


});







clearButton.addEventListener("click", function(){


    passwordInput.value = "";

    strengthText.textContent = "Enter a password to check strength.";


});







passwordInput.addEventListener("input", function(){


    checkStrength(passwordInput.value);


});








function checkStrength(password){


    let score = 0;



    if(password.length >= 8){

        score++;

    }


    if(password.length >= 16){

        score++;

    }


    if(/[A-Z]/.test(password)){

        score++;

    }


    if(/[a-z]/.test(password)){

        score++;

    }


    if(/[0-9]/.test(password)){

        score++;

    }


    if(/[^A-Za-z0-9]/.test(password)){

        score++;

    }






    if(password.length === 0){

        strengthText.textContent = "Enter a password to check strength.";

    }


    else if(score <= 2){

        strengthText.textContent = "Weak Password";

    }


    else if(score <= 4){

        strengthText.textContent = "Medium Password";

    }


    else{

        strengthText.textContent = "Strong Password ✓";

    }


}

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