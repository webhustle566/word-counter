const display = document.getElementById("display");
const answerLabel = document.getElementById("answerLabel");

let lastAnswer = null;
let justCalculated = false;
let updatingDisplay = false;
let angleMode = "DEG";


// ------------------------------
// Buttons
// ------------------------------

document.querySelectorAll("[data-value]").forEach(button => {

    button.addEventListener("click", () => {

        addInput(button.dataset.value);

    });

});



// ------------------------------
// Action Buttons
// ------------------------------

document.getElementById("equalsBtn")
.addEventListener("click", calculate);


document.getElementById("clearBtn")
.addEventListener("click", clearEntry);


document.getElementById("acBtn")
.addEventListener("click", allClear);


document.getElementById("backspaceBtn")
.addEventListener("click", backspace);


document.getElementById("copyBtn")
.addEventListener("click", copyAnswer);

document.getElementById("angleModeBtn")
.addEventListener("click", () => {

    if(angleMode === "DEG"){

        angleMode = "RAD";

    } else {

        angleMode = "DEG";

    }


    document.getElementById("angleIndicator").textContent = angleMode;
    document.getElementById("angleModeBtn").textContent = angleMode;


});



// ------------------------------
// Keyboard
// ------------------------------

document.addEventListener("keydown", event => {


    if(event.key === "Enter"){

        event.preventDefault();

        calculate();

        display.blur();

        return;

    }



    if(event.key === "Escape"){

        event.preventDefault();

        allClear();

        return;

    }

    if(event.key === "Backspace"){

    event.preventDefault();

    backspace();

    return;

}

});






// ------------------------------
// Input Formatting
// ------------------------------

display.addEventListener("input", () => {


    if(updatingDisplay){

        updatingDisplay = false;

    }



    let value = display.value;



    // Continue from previous answer

    if(
        lastAnswer !== null &&
        /^[+\-*/]/.test(value)
    ){

        value = "Ans" + value;

        lastAnswer = null;

    }



    // Smart replacements

   // Smart replacements

// Smart replacements

if(value.endsWith("pi")){

    value = value.slice(0,-2) + "π";

}


if(value.endsWith("sqrt")){

    value = value.slice(0,-4) + "√(";

}


value = value.replace(
    /sin$/,
    "sin("
);

value = value.replace(
    /cos$/,
    "cos("
);

value = value.replace(
    /tan$/,
    "tan("
);


if(value.endsWith("ln")){

    value = value.slice(0,-2) + "ln(";

}


if(value.endsWith("log")){

    value = value.slice(0,-3) + "log(";

}

// Add multiplication after e when followed by a number

value = value.replace(
    /e(?=\d)/g,
    "e×"
);

value = value.replaceAll("*", "×");

value = value.replaceAll("x", "×");

value = value.replaceAll("X", "×");

value = value.replaceAll("/", "÷");

value = value.replaceAll("-", "−");


    updatingDisplay = true;

    display.value = value;



});







// ------------------------------
// Add Input
// ------------------------------

function addInput(value){


    if(
        justCalculated &&
        isOperator(value)
    ){

        display.value = "Ans" + convertSymbol(value);

        justCalculated = false;

        display.focus();

        return;

    }



    if(justCalculated){

        display.value = "";

        justCalculated = false;

    }



// Add multiplication automatically after constants

if(
    (
        display.value.endsWith("e") ||
        display.value.endsWith("π")
    )
    &&
    /^[0-9.]$/.test(value)
){

    display.value += "×";

}


display.value += value;
    display.focus();



    display.setSelectionRange(
        display.value.length,
        display.value.length
    );


}






function isOperator(value){


    return [
        "+",
        "-",
        "*",
        "/",
        "^"
    ].includes(value);


}




function convertSymbol(value){


    if(value === "*"){

        return "×";

    }


    if(value === "/"){

        return "÷";

    }


    if(value === "-"){

        return "−";

    }


    return value;


}
// ------------------------------
// Calculate
// ------------------------------

function calculate(){


    try{


        let expression = display.value;


        if(expression.trim() === ""){

            return;

        }




        expression = prepareExpression(expression);



        let result = eval(expression);




        if(
            typeof result !== "number" ||
            Number.isNaN(result)
        ){

            throw new Error();

        }





        result = Number(
            result.toFixed(10)
        );



        lastAnswer = result;


        answerLabel.textContent = result;


        display.value = result;


        justCalculated = true;


        display.blur();



    }


    catch(error){


        display.value = "Error";

        justCalculated = false;


    }


}








// ------------------------------
// Prepare Expression
// ------------------------------

function prepareExpression(expression){



    // Replace Ans

    expression = expression.replaceAll(
        "Ans",
        lastAnswer ?? 0
    );





    // Symbols

    expression = expression.replaceAll(
        "π",
        "Math.PI"
    );

    // Add multiplication for π

    expression = expression.replace(
        /(\d)(Math\.PI)/g,
        "$1*Math.PI"
    );

    expression = expression.replace(
        /(Math\.PI)(\d)/g,
        "Math.PI*$2"
    );

    expression = expression.replaceAll(
        "e",
        "Math.E"
    );


    expression = expression.replaceAll(
        "√",
        "Math.sqrt"
    );

    expression = expression.replaceAll(
        "×",
        "*"
    );

    expression = expression.replaceAll(
        "÷",
        "/"
    );



    expression = expression.replaceAll(
        "−",
        "-"
    );



    expression = expression.replaceAll(
        "^",
        "**"
    );







    // Functions

   expression = expression.replaceAll(
        "sin",
        "sinCalc"
    );

    expression = expression.replaceAll(
        "cos",
        "cosCalc"
    );

    expression = expression.replaceAll(
        "tan",
        "tanCalc"
    );


    expression = expression.replaceAll(
        "log",
        "Math.log10"
    );


    expression = expression.replaceAll(
        "ln",
        "Math.log"
    );





    // Close missing parentheses

    let open =
    (expression.match(/\(/g) || []).length;


    let close =
    (expression.match(/\)/g) || []).length;




    if(open > close){


        expression += ")".repeat(
            open - close
        );


    }




    return expression;


}









// ------------------------------
// Clear Functions
// ------------------------------

function clearEntry(){


    display.value = "";


}



function allClear(){


    display.value = "";


    answerLabel.textContent = "None";


    lastAnswer = null;


    justCalculated = false;


}




function backspace(){


    display.value =
    display.value.slice(0,-1);


}









// ------------------------------
// Copy
// ------------------------------

function copyAnswer(){



    navigator.clipboard.writeText(
        display.value
    );



    const button =
    document.getElementById("copyBtn");



    button.textContent = "Copied!";



    setTimeout(()=>{


        button.textContent = "Copy";


    },1500);



}
function sinCalc(x){

    if(angleMode === "DEG"){
        return Math.sin(x * Math.PI / 180);
    }

    return Math.sin(x);

}


function cosCalc(x){

    if(angleMode === "DEG"){
        return Math.cos(x * Math.PI / 180);
    }

    return Math.cos(x);

}


function tanCalc(x){

    if(angleMode === "DEG"){
        return Math.tan(x * Math.PI / 180);
    }

    return Math.tan(x);

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