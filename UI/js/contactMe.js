
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
    return;
  }
  try {
    document.querySelector('.loading-indicator').classList.add('show')
    setTimeout(() => {
      saveMessage();
    }, 3000);

    // rest inputs of the form
    // form.reset();
  } catch (e) {
    // createToast("error", e);
  }
});


// Method to save message into localstorage
function saveMessage() {
  //get message from local storage and store to messageList array
  //we must to use JSON.parse, because message as string, we need convert to array
  messageList = JSON.parse(localStorage.getItem("messageItem")) ?? [];

  //get last array to get last id
  //and store it into variable id
  var id;
  messageList.length != 0
    ? messageList.findLast((item) => (id = item.id))
    : (id = 0);

  if (document.getElementById("id").value) {
    //edit messageList array based on value
    messageList.forEach((value) => {
      if (document.getElementById("id").value == value.id) {
        value.fullName = document.getElementById("fullName").value;
        value.email = document.getElementById("email").value;
        value.message = document.getElementById("message").value;
      }
    });

    //remove hidden input
    document.getElementById("id").value = "";
  } else {
    //save
    //get data from form
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let ampm = (hour > 12) ? "PM": "AM";
    let currentTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + ampm;
    var item = {
      id: id + 1,
      fullName: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
      time: currentTime,
    };
    //add item data to array messageList
    messageList.push(item);
    //save array into localstorage
    localStorage.setItem("messageItem", JSON.stringify(messageList));
    // remove loading indicator
    document.querySelector('.loading-indicator').classList.remove('show')
    //toast message
    createToast("success", "Message sent successfully");
  }
  //update table message list
  allMessage();
}
