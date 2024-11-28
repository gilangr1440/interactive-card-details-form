const formSection = document.querySelector(".form-section");
const success = document.querySelector(".success");
const successButton = document.querySelector(".success__button");
const formContainer = document.querySelector(".form-section__form-cont");
const submitButton = document.querySelector(".form-section__form-button");
const inputHolder = document.getElementById("holder");
const inputNumber = document.getElementById("number");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");
const inputCvc = document.getElementById("cvc");
const holderError = document.getElementById("holderError");
const numberError = document.getElementById("numberError");
const dateError = document.getElementById("dateError");
const cvcError = document.getElementById("cvcError");
const cardNumber = document.querySelector(".card-section__card-number");
const cardHolder = document.querySelector(".card-section__holder-name");
const cardDate = document.querySelector(".card-section__exp-date");
const cardCvc = document.querySelector(".card-section__cvc-number");

formContainer.addEventListener("submit", (e) => e.preventDefault());
inputNumber.addEventListener("keydown", (e) => addSpace(e));
inputMonth.addEventListener("input", (e) => setNumber(e));
inputYear.addEventListener("input", (e) => setNumber(e));
inputCvc.addEventListener("input", (e) => cvcLength(e));
submitButton.addEventListener("click", () => formValidation());
successButton.addEventListener("click", (e) => closeSuccess(e));

function setNumber(e) {
  let val = e.target.value;
  let len = e.target.getAttribute("maxlength");

  e.target.value = val.slice(0, len);
}

function addSpace(e) {
  if (inputNumber.value.length == 4 && e.key !== "Backspace") {
    inputNumber.value += " ";
  }
  if (inputNumber.value.length == 9 && e.key !== "Backspace") {
    inputNumber.value += " ";
  }
  if (inputNumber.value.length == 14 && e.key !== "Backspace") {
    inputNumber.value += " ";
  }
}

function cvcLength(e) {
  let val = e.target.value;
  let len = e.target.getAttribute("maxlength");

  e.target.value = val.slice(0, len);
}

function holderValidation() {
  if (inputHolder.value == "") {
    inputHolder.classList.add("error");
    holderError.innerText = "Cant't be blank";
    holderError.classList.add("error");
    return false;
  } else if (inputHolder.value.length < 3) {
    inputHolder.classList.add("error");
    holderError.innerText = "Name must be at least 3 characters";
    holderError.classList.add("error");
    return false;
  } else {
    inputHolder.classList.remove("error");
    holderError.classList.remove("error");
    return true;
  }
}

function numberValidation() {
  if (inputNumber.value == "") {
    inputNumber.classList.add("error");
    numberError.innerText = "Cant't be blank";
    numberError.classList.add("error");
    return false;
  } else if (inputNumber.value.length < 19) {
    inputNumber.classList.add("error");
    numberError.innerText = "Number must be at least 16 characters";
    numberError.classList.add("error");
    return false;
  } else if (!inputNumber.value.match(/^[0-9\s]*$/)) {
    inputNumber.classList.add("error");
    numberError.innerText = "Wrong format, numbers only";
    numberError.classList.add("error");
    return false;
  } else {
    inputNumber.classList.remove("error");
    numberError.classList.remove("error");
    return true;
  }
}

function dateValidation() {
  if (inputMonth.value == "" || inputYear.value == "") {
    inputMonth.classList.add("error");
    inputYear.classList.add("error");
    dateError.innerText = "Cant't be blank";
    dateError.classList.add("error");
    if (inputMonth.value !== "") {
      inputMonth.classList.remove("error");
    } else if (inputYear.value !== "") {
      inputYear.classList.remove("error");
    }

    return false;
  } else if (inputMonth.value > 12) {
    inputMonth.classList.add("error");
    dateError.innerText = "Month must be between 1 and 12";
    dateError.classList.add("error");

    return false;
  } else {
    inputMonth.classList.remove("error");
    inputYear.classList.remove("error");
    dateError.classList.remove("error");

    return true;
  }
}

function cvcValidation() {
  if (inputCvc.value == "") {
    console.log("cvc Can't be blank");
    inputCvc.classList.add("error");
    cvcError.innerText = "Cant't be blank";
    cvcError.classList.add("error");

    return false;
  } else if (inputCvc.value.length < 3) {
    inputCvc.classList.add("error");
    cvcError.innerText = "CVC must be at least 3 characters";
    cvcError.classList.add("error");

    return false;
  } else {
    inputCvc.classList.remove("error");
    cvcError.classList.remove("error");

    return true;
  }
}

function formValidation() {
  holderValidation();
  numberValidation();
  dateValidation();
  cvcValidation();

  if (inputHolder.value !== "") {
    cardHolder.innerText = inputHolder.value;
  }

  if (inputNumber.value !== "") {
    cardNumber.innerText = inputNumber.value;
  }

  if (inputMonth.value !== "" && inputYear.value !== "") {
    let month = inputMonth.value.length < 2 ? "0" + inputMonth.value : inputMonth.value;
    let year = inputYear.value.length < 2 ? "0" + inputYear.value : inputYear.value;

    cardDate.innerText = month + "/" + year;
  }

  if (inputCvc.value !== "") {
    cardCvc.innerText = inputCvc.value;
  }

  if (holderValidation() && numberValidation() && dateValidation() && cvcValidation()) {
    formSection.style.animation = "fade-out 1s";

    setTimeout(() => {
      formSection.style.display = "none";
      success.style.animation = "fade-in 1s";

      setTimeout(() => {
        success.style.display = "block";
      }, 500);
    }, 500);
  }
}

function reset() {
  inputHolder.value = "";
  inputNumber.value = "";
  inputMonth.value = "";
  inputYear.value = "";
  inputCvc.value = "";
}

function closeSuccess(e) {
  success.style.animation = "fade-out 1s";
  reset();

  setTimeout(() => {
    success.style.display = "none";
    formSection.style.animation = "fade-in 1s";

    setTimeout(() => {
      formSection.style.display = "block";
    }, 500);
  }, 500);
}
