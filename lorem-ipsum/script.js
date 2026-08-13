const paragraphs = [

`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,

`Curabitur blandit tempus porttitor. Maecenas faucibus mollis interdum. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui.`,

`Sed posuere consectetur est at lobortis. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Etiam porta sem malesuada magna mollis euismod. Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.`,

`Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.`,

`Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec id elit non mi porta gravida at eget metus. Vestibulum id ligula porta felis euismod semper. Aenean eu leo quam.`,

`Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum.`,

`Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec ullamcorper nulla non metus auctor fringilla.`,

`Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Etiam porta sem malesuada magna mollis euismod.`,

`Nullam quis risus eget urna mollis ornare vel eu leo. Donec id elit non mi porta gravida at eget metus. Curabitur blandit tempus porttitor. Vestibulum id ligula porta felis euismod semper.`,

`Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla. Maecenas faucibus mollis interdum.`

];



function generateLorem() {

    let amount = document.getElementById("amount").value;

    let output = "";

    let usedParagraphs = [];


    while (usedParagraphs.length < amount) {

        let random = Math.floor(Math.random() * paragraphs.length);


        if (!usedParagraphs.includes(random)) {

            usedParagraphs.push(random);

            output += paragraphs[random] + "\n\n";

        }

    }


    document.getElementById("output").value = output;

}



function copyText() {

    const text = document.getElementById("output");

    const copyButton = document.querySelector(
        '.buttons button[onclick="copyText()"]'
    );


    if (!text.value.trim()) {

        return;

    }


    navigator.clipboard.writeText(text.value);


    const originalText = copyButton.textContent;

    copyButton.textContent = "Copied!";


    setTimeout(() => {

        copyButton.textContent = originalText;

    }, 1500);

}



function clearText() {

    document.getElementById("output").value = "";

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