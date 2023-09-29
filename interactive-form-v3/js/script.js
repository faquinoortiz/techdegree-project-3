const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const jobRoleSelect = document.getElementById("title");
const otherJobRoleInput = document.getElementById("other-job-role");
const activitiesFieldset = document.getElementById("activities");
const paymentSelect = document.getElementById("payment");
const creditCardDiv = document.getElementById("credit-card");
const paypalDiv = document.getElementById("paypal");
const bitcoinDiv = document.getElementById("bitcoin");
const form = document.querySelector("form");
const colorSelect = document.getElementById("color");

// Will allow for the display of an element
function showElement(element) {
element.style.display = "block";
}

function hideElement(element) {
element.style.display = "none";
}

function setOtherJobRoleVisibility() {
otherJobRoleInput.style.display = jobRoleSelect.value === "other" ? "block" : "none";
}

// Conditions for the payment for the selected payment visibility
function setPaymentSectionVisibility(selectedPayment) {
showElement(creditCardDiv);
showElement(paypalDiv);
showElement(bitcoinDiv);

if (selectedPayment === "credit-card") {
hideElement(paypalDiv);
hideElement(bitcoinDiv);
} else if (selectedPayment === "paypal") {
hideElement(creditCardDiv);
hideElement(bitcoinDiv);
} else if (selectedPayment === "bitcoin") {
hideElement(creditCardDiv);
hideElement(paypalDiv);
}
}

// Updates and gives color options based on the design that is selected
function updateColorOptions() {
const selectedDesign = designSelect.value;
colorSelect.removeAttribute("disabled");

for (let i = 0; i < colorOptions.length; i++) {
const option = colorOptions[i];
const optionTheme = option.getAttribute("data-theme");

if (selectedDesign === optionTheme) {
option.hidden = false;
} else {
option.hidden = true;
}
}
colorSelect.selectedIndex = 0;
}

const designSelect = document.getElementById("design");
const colorOptions = colorSelect.children;

// Set the first option in the colorSelect as selected by default
colorSelect.selectedIndex = 0;

setOtherJobRoleVisibility();
setPaymentSectionVisibility(paymentSelect.value);
updateColorOptions();

jobRoleSelect.addEventListener("change", setOtherJobRoleVisibility);

paymentSelect.addEventListener("change", () => {
setPaymentSectionVisibility(paymentSelect.value);
});

designSelect.addEventListener("change", updateColorOptions);

let totalCost = 0;

// Updates the cost every time a different activity is selected
function updateTotalCost() {
const checkboxes = activitiesFieldset.querySelectorAll("input[type='checkbox']");
totalCost = 0;

checkboxes.forEach((checkbox) => {
if (checkbox.checked) {
totalCost += parseInt(checkbox.getAttribute("data-cost"));
}
});

totalCostDisplay.textContent = `Total: $${totalCost}`;
}

const totalCostDisplay = document.createElement("p");
totalCostDisplay.textContent = "Total: $0";
activitiesFieldset.appendChild(totalCostDisplay);

activitiesFieldset.addEventListener("change", updateTotalCost);

const ccNumInput = document.getElementById("cc-num");
const zipInput = document.getElementById("zip");
const cvvInput = document.getElementById("cvv");
const ccHint = document.getElementById("cc-hint");
const zipHint = document.getElementById("zip-hint");
const cvvHint = document.getElementById("cvv-hint");

function validateCreditCard() {
const ccNumValid = /^\d{13,16}$/.test(ccNumInput.value);
const zipValid = /^\d{5}$/.test(zipInput.value);
const cvvValid = /^\d{3}$/.test(cvvInput.value);

if (!ccNumValid) {
ccNumInput.parentElement.classList.add("not-valid");
ccNumInput.parentElement.classList.remove("valid");
} else {
ccNumInput.parentElement.classList.remove("not-valid");
ccNumInput.parentElement.classList.add("valid");
}

if (!zipValid) {
zipInput.parentElement.classList.add("not-valid");
zipInput.parentElement.classList.remove("valid");
} else {
zipInput.parentElement.classList.remove("not-valid");
zipInput.parentElement.classList.add("valid");
}

if (!cvvValid) {
cvvInput.parentElement.classList.add("not-valid");
cvvInput.parentElement.classList.remove("valid");
} else {
cvvInput.parentElement.classList.remove("not-valid");
cvvInput.parentElement.classList.add("valid");
}

ccHint.style.display = ccNumValid ? "none" : "block";
zipHint.style.display = zipValid ? "none" : "block";
cvvHint.style.display = cvvValid ? "none" : "block";
}

ccNumInput.addEventListener("input", validateCreditCard);
zipInput.addEventListener("input", validateCreditCard);
cvvInput.addEventListener("input", validateCreditCard);

paymentSelect.value = "credit-card";
setPaymentSectionVisibility("credit-card");

const checkboxes = activitiesFieldset.querySelectorAll("input[type='checkbox']");
checkboxes.forEach((checkbox) => {
const label = checkbox.parentElement;
checkbox.addEventListener("focus", () => {
label.classList.add("focus");
});
checkbox.addEventListener("blur", () => {
label.classList.remove("focus");
});
});

// Event Listener for submission
// Event Listener for submission
form.addEventListener("submit", function (event) {
    const nameValid = /^[a-zA-Z\s]+$/.test(nameInput.value);
    if (!nameValid) {
      nameInput.parentElement.classList.add("not-valid");
      nameInput.parentElement.classList.remove("valid");
    } else {
      nameInput.parentElement.classList.remove("not-valid");
      nameInput.parentElement.classList.add("valid");
    }
  
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
    if (!emailValid) {
      emailInput.parentElement.classList.add("not-valid");
      emailInput.parentElement.classList.remove("valid");
    } else {
      emailInput.parentElement.classList.remove("not-valid");
      emailInput.parentElement.classList.add("valid");
    }
  
    const checkboxes = activitiesFieldset.querySelectorAll("input[type='checkbox']");
    const activitiesValid = Array.from(checkboxes).some((checkbox) => checkbox.checked);
    if (!activitiesValid) {
      activitiesFieldset.classList.add("not-valid");
      activitiesFieldset.classList.remove("valid");
    } else {
      activitiesFieldset.classList.remove("not-valid");
      activitiesFieldset.classList.add("valid");
    }
  
    // Check if the payment method is "credit-card" and validate credit card fields
    if (paymentSelect.value === "credit-card") {
      const ccNumValid = /^\d{13,16}$/.test(ccNumInput.value);
      const zipValid = /^\d{5}$/.test(zipInput.value);
      const cvvValid = /^\d{3}$/.test(cvvInput.value);
  
      if (!ccNumValid || !zipValid || !cvvValid) {
        event.preventDefault(); // Prevent form submission if credit card info is not valid
        ccNumInput.parentElement.classList.add("not-valid");
        zipInput.parentElement.classList.add("not-valid");
        cvvInput.parentElement.classList.add("not-valid");
      } else {
        ccNumInput.parentElement.classList.remove("not-valid");
        zipInput.parentElement.classList.remove("not-valid");
        cvvInput.parentElement.classList.remove("not-valid");
      }
    } else {
      // If the payment method is not "credit-card", remove any validation classes
      ccNumInput.parentElement.classList.remove("not-valid", "valid");
      zipInput.parentElement.classList.remove("not-valid", "valid");
      cvvInput.parentElement.classList.remove("not-valid", "valid");
    }
  
    // Check if all required fields are valid for submission
    const allValid = nameValid && emailValid && activitiesValid;
    if (!allValid) {
      event.preventDefault();
    }
  });