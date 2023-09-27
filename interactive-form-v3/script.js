
const nameInput = document.getElementById("name");
console.log(nameInput);
nameInput.focus();

const jobRoleSelect = document.getElementById("title"); 
const otherJobRoleInput = document.getElementById("title");
console.log(jobRoleSelect);
console.log(otherJobRoleInput);

otherJobRoleInput.style.display = "none";

jobRoleSelect.addEventListener("change",function(event){
if (event.target.value === "other"){
    otherJobRoleInput.style.display = "block";
        }else{
    otherJobRoleInput.style.display = "none";


});

const designSelect = document.getElementById("design");
const colorSelect = document.getElementById("color");
const colorOptions = colorSelect.children;
console.log(designSelect);
console.log(colorSelect);

colorSelect.disabled = true;

designSelect.addEventListener("change",function(event){
    colorSelect.disabled = false;

    const selectedDesign = event.target.value;


for (let i = 0; i < colorOptions.length; i++){
    const option = colorOptions[i];
    const optionTheme = option.getAttribute("data-theme");
    
    if(selectedDesign === optionTheme){
        option.hidden = false;
        option.selected = true;
        } else {
        option.hidden = true;
        option.selected = false; 
        }
    }

});