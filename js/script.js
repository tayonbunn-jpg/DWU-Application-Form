/*=========================================
DWU ADMISSION PORTAL
JavaScript
=========================================*/

const steps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const progress = document.getElementById("progress");
const stepIndicators = document.querySelectorAll(".step");
const form = document.getElementById("applicationForm");

let currentStep = 0;

/*=========================================
INITIALIZE
=========================================*/

showStep(currentStep);

/*=========================================
SHOW CURRENT STEP
=========================================*/

function showStep(index){

    steps.forEach((step)=>{

        step.classList.remove("active");

    });

    steps[index].classList.add("active");

    updateProgress();

    window.scrollTo({

        top:document.querySelector(".application").offsetTop-70,
        behavior:"smooth"

    });

}

/*=========================================
NEXT BUTTON
=========================================*/

nextBtns.forEach((button)=>{

    button.addEventListener("click",()=>{

        if(validateStep(currentStep)){

            if(currentStep < steps.length-1){

                currentStep++;

                showStep(currentStep);

            }

        }

    });

});

/*=========================================
PREVIOUS BUTTON
=========================================*/

prevBtns.forEach((button)=>{

    button.addEventListener("click",()=>{

        if(currentStep>0){

            currentStep--;

            showStep(currentStep);

        }

    });

});

/*=========================================
UPDATE PROGRESS BAR
=========================================*/

function updateProgress(){

    const percentage=((currentStep)/(steps.length-1))*100;

    progress.style.width=percentage+"%";

    stepIndicators.forEach((step,index)=>{

        if(index<=currentStep){

            step.classList.add("active");

        }

        else{

            step.classList.remove("active");

        }

    });

}

/*=========================================
VALIDATE CURRENT STEP
=========================================*/

function validateStep(stepIndex){

    const current=steps[stepIndex];

    const required=current.querySelectorAll("[required]");

    let valid=true;

    required.forEach((field)=>{

        if(field.type==="checkbox"){

            if(!field.checked){

                valid=false;

                field.focus();

            }

        }

        else{

            if(field.value.trim()===""){

                valid=false;

                field.style.borderColor="red";

            }

            else{

                field.style.borderColor="#ccc";

            }

        }

    });

    if(!valid){

        alert("Please complete all required fields.");

    }

    return valid;

}

/*=========================================
EMAIL VALIDATION
=========================================*/

const email=document.querySelector('input[type="email"]');

if(email){

email.addEventListener("blur",()=>{

const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(email.value!="" && !pattern.test(email.value)){

email.style.borderColor="red";

alert("Invalid Email Address");

}

else{

email.style.borderColor="#ccc";

}

});

}

/*=========================================
FILE UPLOAD NAME
=========================================*/

const uploads=document.querySelectorAll('input[type="file"]');

uploads.forEach((upload)=>{

upload.addEventListener("change",()=>{

if(upload.files.length>0){

upload.style.background="#dff7e8";

upload.title=upload.files[0].name;

}

});

});

/*=========================================
SEVISPASS SIMULATION
=========================================*/

let verified=false;

const verifyBtn=document.getElementById("verifyBtn");

const status=document.getElementById("verificationStatus");

const verifyDate=document.getElementById("verifyDate");

if(verifyBtn){

verifyBtn.addEventListener("click",()=>{

verifyBtn.disabled=true;

verifyBtn.innerHTML="Verifying...";

setTimeout(()=>{

verified=true;

status.classList.remove("not-verified");

status.classList.add("verified");

status.innerHTML="✅ Identity Verified via SevisPass";

verifyBtn.innerHTML="Verified";

verifyBtn.style.background="#009245";

verifyDate.value=new Date().toISOString().split("T")[0];

alert("SevisPass verification successful.");

},2000);

});

}

/*=========================================
FORM SUBMIT
=========================================*/

form.addEventListener("submit",(e)=>{

e.preventDefault();

if(!validateStep(currentStep)){

return;

}

/* ==========================
   SEVISPASS CHECK
========================== */

if(!verified){

alert("Please verify your identity using SevisPass before submitting.");

return;

}

const confirmSubmit=confirm(

"Are you sure you want to submit this application?"

);

if(confirmSubmit){

alert(

"Congratulations!\n\nYour Divine Word University application has been submitted successfully."

);

form.reset();

currentStep=0;

verified=false;

showStep(currentStep);

}

});

/*=========================================
INPUT ANIMATION
=========================================*/

const inputs=document.querySelectorAll(

"input, select, textarea"

);

inputs.forEach((input)=>{

input.addEventListener("focus",()=>{

input.parentElement.style.transform="translateY(-3px)";

});

input.addEventListener("blur",()=>{

input.parentElement.style.transform="translateY(0px)";

});

});

/*=========================================
SMOOTH NAVIGATION
=========================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",(e)=>{

e.preventDefault();

const target=document.querySelector(

anchor.getAttribute("href")

);

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

/*=========================================
NAVBAR SHADOW
=========================================*/

window.addEventListener("scroll",()=>{

const nav=document.querySelector(".navbar");

if(window.scrollY>80){

nav.style.boxShadow="0 8px 25px rgba(0,0,0,.18)";

}

else{

nav.style.boxShadow="0 3px 15px rgba(0,0,0,.08)";

}

});

/*=========================================
HERO BUTTON
=========================================*/

const heroBtn=document.querySelector(".hero-btn");

if(heroBtn){

heroBtn.addEventListener("mouseenter",()=>{

heroBtn.style.transform="translateY(-5px) scale(1.03)";

});

heroBtn.addEventListener("mouseleave",()=>{

heroBtn.style.transform="translateY(0) scale(1)";

});

}

/*=========================================
END OF SCRIPT
=========================================*/