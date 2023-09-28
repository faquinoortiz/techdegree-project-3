// All DOM elements are listed below
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
const colorSelect = document.getElementById("color"); // Added this line

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
  colorSelect.removeAttribute("disabled"); // Remove the 'disabled' attribute

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
// Event Listener for submission
form.addEventListener("submit", function (event) {
  const nameValid = /^[a-zA-Z\s]+$/.test(nameInput.value);
  if (!nameValid) {
    nameInput.parentElement.classList.add("not-valid");
  } else {
    nameInput.parentElement.classList.remove("not-valid");
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
  if (!emailValid) {
    emailInput.parentElement.classList.add("not-valid");
  } else {
    emailInput.parentElement.classList.remove("not-valid");
  }

  const checkboxes = activitiesFieldset.querySelectorAll("input[type='checkbox']");
  const activitiesValid = Array.from(checkboxes).some((checkbox) => checkbox.checked);
  if (!activitiesValid) {
    activitiesFieldset.classList.add("not-valid");
  } else {
    activitiesFieldset.classList.remove("not-valid");
  }
 
  // Validate credit card fields
  if (paymentSelect.value === "credit-card") {
    validateCreditCard();
  }

  if (!nameValid || !emailValid || !activitiesValid || paymentSelect.value === "select method") {
    event.preventDefault();
  }
});

nameInput.focus();