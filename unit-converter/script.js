const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const category = document.getElementById("category");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const inputValue = document.getElementById("inputValue");
const result = document.getElementById("result");
const swapBtn = document.getElementById("swapBtn");
const availableUnits = document.getElementById("availableUnits");
const formula = document.getElementById("formula");


const units = {

length:{

Millimeter:0.001,
Centimeter:0.01,
Meter:1,
Kilometer:1000,
Inch:0.0254,
Foot:0.3048,
Yard:0.9144,
Mile:1609.344

},

weight:{

Milligram:0.000001,
Gram:0.001,
Kilogram:1,
Ounce:0.028349523125,
Pound:0.45359237,
Ton:1000

},

volume:{

Milliliter:0.001,
Liter:1,
Cup:0.2365882365,
Pint:0.473176473,
Quart:0.946352946,
Gallon:3.785411784

},

time:{

Second:1,
Minute:60,
Hour:3600,
Day:86400,
Week:604800,
Month:2629800,
Year:31557600

},

speed:{

"m/s":1,
"km/h":0.2777777778,
mph:0.44704,
Knots:0.514444

},

temperature:{

Celsius:"Celsius",
Fahrenheit:"Fahrenheit",
Kelvin:"Kelvin"

}

};



// ------------------------------
// Populate Units
// ------------------------------

function populateUnits(){

    const current = category.value;

    fromUnit.innerHTML = "";

    toUnit.innerHTML = "";

    updateAvailableUnits();

    Object.keys(units[current]).forEach(unit=>{

        const option1 = document.createElement("option");

        option1.value = unit;

        option1.textContent = unit;

        fromUnit.appendChild(option1);



        const option2 = document.createElement("option");

        option2.value = unit;

        option2.textContent = unit;

        toUnit.appendChild(option2);

    });

    if(toUnit.options.length > 1){

        toUnit.selectedIndex = 1;

    }

    convert();

}


// ------------------------------
// Available Units Display
// ------------------------------

function updateAvailableUnits(){

    const current = category.value;

    const title =
        current.charAt(0).toUpperCase() +
        current.slice(1);


    availableUnits.innerHTML =
        `<strong>Available Units (${title})</strong>
        <p>${Object.keys(units[current]).join(" • ")}</p>`;

}

// ------------------------------
// Convert
// ------------------------------

function convert(){

    const current = category.value;

    const value = parseFloat(inputValue.value);

    if(isNaN(value)){

        result.textContent = "—";

        formula.textContent = "—";


        return;

    }



    // Temperature

    if(current === "temperature"){

        result.textContent = convertTemperature(
            value,
            fromUnit.value,
            toUnit.value
        );


        updateFormula(
            value,
            current,
            fromUnit.value,
            toUnit.value,
            result.textContent
        );

        return;

    }



    const baseValue =
        value *
        units[current][fromUnit.value];



    const converted =
        baseValue /
        units[current][toUnit.value];



    result.textContent =
        formatNumber(converted);

    
    updateFormula(
        value,
        current,
        fromUnit.value,
        toUnit.value,
        result.textContent
    );

}



// ------------------------------
// Temperature
// ------------------------------

function convertTemperature(value,from,to){

    let celsius;



    if(from==="Celsius"){

        celsius=value;

    }

    else if(from==="Fahrenheit"){

        celsius=(value-32)*(5/9);

    }

    else{

        celsius=value-273.15;

    }



    let answer;



    if(to==="Celsius"){

        answer=celsius;

    }

    else if(to==="Fahrenheit"){

        answer=(celsius*9/5)+32;

    }

    else{

        answer=celsius+273.15;

    }



    return formatNumber(answer);

}



// ------------------------------
// Format
// ------------------------------

function formatNumber(number){

    return Number(
        number.toFixed(10)
    ).toLocaleString();

}

// ------------------------------
// Formula Generator
// ------------------------------

function updateFormula(value,category,from,to,answer){


    let text="";


    if(category==="temperature"){


        if(from==="Celsius" && to==="Kelvin"){

            text =
            `K = °C + 273.15<br>
            ${value} + 273.15 = ${answer} K`;

        }


        else if(from==="Kelvin" && to==="Celsius"){

            text =
            `°C = K - 273.15<br>
            ${value} - 273.15 = ${answer} °C`;

        }


        else if(from==="Celsius" && to==="Fahrenheit"){

            text =
            `°F = (°C × 9/5) + 32<br>
            (${value} × 9/5) + 32 = ${answer} °F`;

        }


        else if(from==="Fahrenheit" && to==="Celsius"){

            text =
            `°C = (°F - 32) × 5/9<br>
            (${value} - 32) × 5/9 = ${answer} °C`;

        }


        else{

            text =
            `Temperature conversion formula applied`;

        }

    }



    else{


        const factor =
        units[category][from] /
        units[category][to];


        text =
        `${to} = ${from} × ${formatNumber(factor)}<br>
        ${value} × ${formatNumber(factor)} = ${answer} ${to}`;

    }



    formula.innerHTML=text;

}

// ------------------------------
// Swap
// ------------------------------

swapBtn.addEventListener("click",()=>{

    const temp = fromUnit.value;

    fromUnit.value = toUnit.value;

    toUnit.value = temp;

    convert();

});



// ------------------------------
// Events
// ------------------------------

category.addEventListener(
    "change",
    populateUnits
);

fromUnit.addEventListener(
    "change",
    convert
);

toUnit.addEventListener(
    "change",
    convert
);

inputValue.addEventListener(
    "input",
    convert
);

copyBtn.addEventListener("click",()=>{

    navigator.clipboard.writeText(
        result.textContent
    );

    copyBtn.textContent="Copied!";


    setTimeout(()=>{

        copyBtn.textContent="Copy";

    },1500);

});



clearBtn.addEventListener("click",()=>{

    inputValue.value="";

    result.textContent="—";

});


// ------------------------------
// Enter Key Navigation
// ------------------------------

fromUnit.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        e.preventDefault();

        toUnit.focus();

    }

});


toUnit.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        e.preventDefault();

        inputValue.focus();

    }

});


inputValue.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        e.preventDefault();

        convert();

    }

});



// ------------------------------
// Start
// ------------------------------

populateUnits();

// ------------------------------
// Start
// ------------------------------

populateUnits();

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

document.addEventListener("DOMContentLoaded", () => {

    const shareButton = document.getElementById("shareButton");

    if (!shareButton) return;

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

});