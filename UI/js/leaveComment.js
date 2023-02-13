const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const message = document.getElementById("comment");
const form = document.getElementById("comment-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const fullNameValue = fullName.value.trim();
  const emailValue = email.value.trim();
  const messageValue = message.value.trim();
  const blogId = localStorage.getItem("blogId");
  const id = JSON.parse(blogId);
  const localUrl = `https://shumbusho-emile.onrender.com/blog/${id}/comment`;
  fetch(localUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: fullNameValue,
      email: emailValue,
      comment: messageValue,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        setTimeout(() => {
          createToast("success", "Message Sent successfully");
        }, 2000);
      }
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
