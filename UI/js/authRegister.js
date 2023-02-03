const form = document.querySelector("form");
uField = form.querySelector(".userName");
uInput = form.querySelector("input");
eField = form.querySelector(".email");
eInput = eField.querySelector("input");
pField = form.querySelector(".password");
pInput = pField.querySelector("input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if(uInput.value == ""){
    uField.classList.add("shake", "error");
  }
  if (eInput.value == "") {
    eField.classList.add("shake", "error");
  } else {
    checkEmail();
  }
  if (pInput.value == "") {
    pField.classList.add("shake", "error");
  }
  setTimeout(() => {
    uField.classList.remove("shake");
    eField.classList.remove("shake");
    pField.classList.remove("shake");
  }, 5000);

  uInput.onkeyup = () => {
    if(uInput.value == ""){
      uField.classList.add("error");
    }else{
      uField.classList.remove("error");
    }
  }

  eInput.onkeyup = () => {
    checkEmail();
  };

  pInput.onkeyup = () => {
    if (pInput.value == "") {
      pField.classList.add("error");
    } else {
      pField.classList.remove("error");
    }
  };

  if (
    !eField.classList.contains("error") &&
    !pField.classList.contains("error")
  ) {
    await fetch("https://shumbusho-emile.onrender.com/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: uInput.value,
        email: eInput.value,
        password: pInput.value,
      }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "login.html";
        } else {
          console.log("user register failed", response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

function checkEmail(){
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!eInput.value.match(pattern)) {
    eField.classList.add("error");
    let errorTxt = eField.querySelector(".error-txt");
    eInput.value != ""
      ? (errorTxt.innerText = "Enter a valid email address")
      : (errorTxt.innerText = "Email can't be blank");
  } else {
    eField.classList.remove("error");
  }
};

