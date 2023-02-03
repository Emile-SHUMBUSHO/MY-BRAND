const notifications = document.querySelector(".notifications");
const buttons = document.querySelectorAll(".buttons .btn");

const toastDetails = {
  timer: 5000,
  success: {
    icon: "fa-circle-check",
    // title: "Success",
  },
  error: {
    icon: "fa-circle-xmark",
    // title: "Error",
  },
  warning: {
    icon: "fa-triangle-exclamation",
    // title: "Warning",
  },
  info: {
    icon: "fa-circle-info",
    // title: "Info",
  },
};

const removeToast = (toast)=>{
  toast.classList.add("hide");
  if(toast.timeoutId) clearTimeout(toast.timeoutId); //clear the timeout for toast
  setTimeout(()=> toast.remove(), 5000); // remove the toast after 5000ms
}

const createToast = (id, title) => {
  //get the toast icon and title based on the selected id
  const { icon } = toastDetails[id];
  const toast = document.createElement("li"); // Creating a new element for the toast
  toast.className = `toast ${id}`; // setting the classes for the toast
  toast.innerHTML = `
    <div class="column">
        <i class="fa-solid ${icon}"></i>
        <span>${title}</span>
    </div>
    <i class="fa-solid fa-xmark" onClick="removeToast(this.parentElement)"></i>`;
  notifications.appendChild(toast); // append the toast to the notification ul
  //setting a timeout to remove the toast after the specified amount of time
  toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
};

// add a click eventlistener to each button to create a toast when clicked
buttons.forEach((btn) => {
  btn.addEventListener("click", () => createToast(btn.id));
});
