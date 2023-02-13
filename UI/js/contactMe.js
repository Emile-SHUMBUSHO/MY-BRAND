const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const message = document.getElementById("message");
const form = document.getElementById("contactMeForm");

const isValidEmail = (email) => {
  const rejex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return rejex.test(String(email).toLowerCase());
};

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

form.addEventListener("submit", function (event) {
  event.preventDefault();
  showLoading();
  const fullNameValue = fullName.value.trim();
  const emailValue = email.value.trim();
  const messageValue = message.value.trim();
  let errors = [];

  if (fullNameValue === "") {
    setError(fullName, "Names must not be empty");
    errors.push("Names must not be empty");
  } else {
    setSuccess(fullName);
  }

  if (emailValue === "") {
    setError(email, "Email must not be empty");
    errors.push("Email must not be empty");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Invalid email");
    errors.push("Invalid email");
  } else {
    setSuccess(email);
  }

  if (messageValue == "") {
    setError(message, "Message must not be empty");
    errors.push("Message must not be empty");
  } else {
    setSuccess(message);
  }

  if (errors.length > 0) {
    hideLoading();
    return;
  }
  showLoading();
  fetch("https://shumbusho-emile.onrender.com/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: fullNameValue,
      email: emailValue,
      message: messageValue,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        hideLoading();
        setTimeout(() => {
          createToast("success", "Message Sent successfully");
        }, 2000);
      }
      console.log(data);
    })
    .catch((err) => {
      hideLoading();
      console.log(err);
    });
});
