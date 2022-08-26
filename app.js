const form = document.querySelector("#form");
const userName = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");

//show input error message
function displayError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// show input success outline
function displaySuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

//Check if email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    displaySuccess(input);
  } else {
    displayError(input, "Email is not valid");
  }
}

//check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      displayError(input, `${getFieldName(input)} is required `);
    } else {
      displaySuccess(input);
    }
  });
}

// Get Field Name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase(0) + input.id.slice(1);
}

// Check input field lenght
function checkLength(input, min, max) {
  if (input.value.length < min) {
    displayError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    displayError(
      input,
      `${getFieldName(input)} cannot be greater than ${max} characters`
    );
  } else {
    displaySuccess(input);
  }
}

// check password match
function checkPasswords(input1, input2) {
  if (input1.value !== input2.value) {
    displayError(input2, "Passwords do not match");
  }
}

//Submit event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([userName, email, password, confirmPassword]);
  checkLength(userName, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswords(password, confirmPassword);
});
