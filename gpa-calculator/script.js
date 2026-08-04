const classContainer = document.getElementById("classContainer");

const addClassButton = document.getElementById("addClass");

const calculateButton = document.getElementById("calculate");

const gpaResult = document.getElementById("gpaResult");

const previousSection = document.getElementById("previousSection");

const previousGPA = document.getElementById("previousGPA");

const previousCredits = document.getElementById("previousCredits");





const gradePoints = {

    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D+": 1.3,
    "D": 1.0,
    "F": 0.0,
    "P": null

};







function createClassRow(){


    const row = document.createElement("div");

    row.className = "class-row";



    row.innerHTML = `


        <input 
            type="text"
            placeholder="Class Name"
            class="class-name"
        >



        <select class="grade">

            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="B-">B-</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="C-">C-</option>
            <option value="D+">D+</option>
            <option value="D">D</option>
            <option value="F">F</option>
            <option value="P">P (Pass)</option>

        </select>




        <input

            type="number"

            placeholder="Credits"

            class="credits"

            min="1"

        >





        <select class="level">

            <option value="regular">
                Regular
            </option>


            <option value="honors">
                Honors
            </option>


            <option value="ap">
                AP / Advanced
            </option>


        </select>





        <button class="remove">
            X
        </button>



    `;





    row.querySelector(".remove").addEventListener("click", function(){

        row.remove();

    });





    classContainer.appendChild(row);


}






createClassRow();





addClassButton.addEventListener("click", function(){

    createClassRow();

});








document.querySelectorAll(
    'input[name="calcType"]'
).forEach(function(option){


    option.addEventListener("change", function(){


        if(option.value === "cumulative"){

            previousSection.classList.remove("hidden");

        }

        else{

            previousSection.classList.add("hidden");

        }


    });


});









calculateButton.addEventListener("click", function(){


    const rows = document.querySelectorAll(".class-row");



    let totalPoints = 0;

    let totalCredits = 0;





    rows.forEach(function(row){



        const grade = row.querySelector(".grade").value;


        const credits = Number(
            row.querySelector(".credits").value
        );


        const level = row.querySelector(".level").value;





        if(credits > 0 && grade !== "P"){



            let points = gradePoints[grade];





            if(level === "honors"){

                points += 0.5;

            }



            if(level === "ap"){

                points += 1.0;

            }





            if(points > 5){

                points = 5;

            }







            totalPoints += points * credits;


            totalCredits += credits;



        }



    });








    if(totalCredits === 0){


        gpaResult.textContent = "Enter classes";


        return;


    }







    let finalGPA = totalPoints / totalCredits;







    const calcType = document.querySelector(
        'input[name="calcType"]:checked'
    ).value;







    if(calcType === "cumulative"){



        const oldGPA = Number(previousGPA.value);

        const oldCredits = Number(previousCredits.value);





        if(oldGPA > 0 && oldCredits > 0){



            finalGPA = (

                (oldGPA * oldCredits) +

                (finalGPA * totalCredits)

            )

            /

            (oldCredits + totalCredits);



        }



    }






    gpaResult.textContent = finalGPA.toFixed(2);



});