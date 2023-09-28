const nameInput = document.getElementById("name");
console.log(nameInput);
nameInput.focus();

const jobRoleSelect = document.getElementById("title");
const otherJobRoleInput = document.getElementById("other-job-role");

jobRoleSelect.addEventListener("change", function (event) {
  if (event.target.value === "other") {
    otherJobRoleInput.style.display = "block";
  } else {
    otherJobRoleInput.style.display = "none";
  }
});

const designSelect = document.getElementById("design");
const colorSelect = document.getElementById("color");
const colorOptions = colorSelect.children;
console.log(designSelect);
console.log(colorSelect);

colorSelect.disabled = true;

designSelect.addEventListener("change", function (event) {
  colorSelect.disabled = false;

  const selectedDesign = event.target.value;

  for (let i = 0; i < colorOptions.length; i++) {
    const option = colorOptions[i];
    const optionTheme = option.getAttribute("data-theme");

    if (selectedDesign === optionTheme) {
      option.hidden = false;
      option.selected = true;
    } else {
      option.hidden = true;
      option.selected = false;
    }
  }
});

const activitiesFieldset = document.getElementById("activities");
const totalCostSpan = document.getElementById("activities-cost");
let totalCost = 0;

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function (event) {
    const dataCost = +event.target.getAttribute("data-cost");
    const isChecked = event.target.checked;

    if (isChecked) {
      totalCost += dataCost;
    } else {
      totalCost -= dataCost;
    }

    totalCostSpan.textContent = `Total: $${totalCost}`;
  });
});

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  const nameValid = /^[a-zA-Z\s]+$/.test(nameInput.value);
  if (!nameValid) {
    event.preventDefault();
    nameInput.parentElement.classList.remove("valid");
    nameInput.parentElement.classList.add("not-valid");
    nameInput.parentElement.lastElementChild.style.display = "block";
  } else {
    nameInput.parentElement.classList.remove("not-valid");
    nameInput.parentElement.classList.add("valid");
    nameInput.parentElement.lastElementChild.style.display = "none";
  }
});