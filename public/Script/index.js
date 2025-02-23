import { drawShapes } from "./canvas_controls.js";

const title = document.querySelectorAll(".Title");
const submitButton = document.querySelector("#submitButton");
const form = document.querySelector("#creationForm");

const animateTiming = {
    duration: 500,
    iterations: 1
}

title[title.length-1].addEventListener("click", (e)=>{
    
    const radius = 5;
    const randomAngle = {
        x: (Math.floor(Math.random()*360) * (Math.PI/180)) * radius,
        y: (Math.floor(Math.random()*360) * (Math.PI/180)) * radius
    }
    const cyanAnimate = [
        { transform: "translateX(0) translateY(0)"},
        { transform: `translateX(${randomAngle.x}px) translateY(${randomAngle.y}px)`},
        { transform: "translateX(0) translateY(0)"}
    ];
    const magentaAnimate = [
        { transform: "translateX(0) translateY(0)"},
        { transform: `translateX(-${randomAngle.x}px) translateY(-${randomAngle.y}px)`},
        { transform: "translateX(0) translateY(0)"}
    ];

    title[0].animate(cyanAnimate, animateTiming);
    title[1].animate(magentaAnimate, animateTiming);
});

submitButton.addEventListener("mouseenter", () => {
    const favColorField = document.querySelector("#color");
    submitButton.style.backgroundColor = favColorField.value
});
submitButton.addEventListener("mouseleave", () => {
    submitButton.style.backgroundColor = "initial";
});

async function handleSubmit(e) {
    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries()); // formData.entries() returns an iterator that lets you loop easily through the object.

        const response = await fetch("http://localhost:3000/users/", {
            method: "POST",
            headers: {'content-type':"application/json"},
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error("There was an error with the POST request");
        }
        const result = await response.json();
        console.log(result);
        drawShapes(result)

    } catch(error) {
        console.log(error);
    }
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSubmit(e.target.value);
});

// FRONT END FORM VALIDATION
const nameBlock = document.querySelector("#name_block");
const nameError = document.querySelector("#name_error");
let nameValid = false;
const nameField = document.querySelector("#name").addEventListener("change", (e)=>{
    if (typeof e.target.value != "string" || e.target.value.length > 20) {
        nameBlock.classList.add("error");
        nameError.style.display = "block";
        nameValid = false;
    } else {
        nameBlock.classList.remove("error");
        nameError.style.display = "none";
        nameValid = true;
    } 
    if (nameValid && colorValid) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
});
const colorBlock = document.querySelector("#color_block");
const colorError = document.querySelector("#color_error");
let colorValid = false
const colorField = document.querySelector("#color").addEventListener("change", (e)=>{
    if (typeof e.target.value != "string" || e.target.value.length > 20) {
        colorBlock.classList.add("error");
        colorError.style.display = "block";
        colorValid = false;
    } else {
        colorBlock.classList.remove("error");
        colorError.style.display = "none";
        colorValid = true;
    }
    if (nameValid && colorValid) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
})
