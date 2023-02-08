const form = document.querySelector("form");
eField = form.querySelector(".email");
eInput = eField.querySelector("input");
pField = form.querySelector(".password");
pInput = pField.querySelector("input");

form.addEventListener(`submit`, (e) => {
  e.preventDefault();
  showLoading();
  if (eInput.value == "") {
    eField.classList.add("shake", "error");
  } else {
    checkEmail();
  }
  if (pInput.value == "") {
    pField.classList.add("shake", "error");
  }
  setTimeout(() => {
    eField.classList.remove("shake");
    pField.classList.remove("shake");
  }, 5000);

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
    fetch("https://shumbusho-emile.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: eInput.value,
        password: pInput.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        
        if (data.message === "Invalid email or password") {
          hideLoading();
          createToast("error", "Invalid email or password");
        } else {
          localStorage.setItem("userInfo", JSON.stringify(data));
          hideLoading();
          createToast("success", "Logged in successfully");
          setTimeout(() => {
            window.location.href = "dashboard.html";
          }, 2000);
        }
      })
      .catch((err) => {
        hideLoading();
        console.log(err);
      });
  }
});

function checkEmail() {
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
}
