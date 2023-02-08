function allMessage() {
  var div = document.getElementById("message-body");
  div.innerHTML = ``;
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  fetch("https://shumbusho-emile.onrender.com/all-message", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userInfo.user.token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item)=>{
        div.innerHTML += `
        <div class="content-row">
          <div class="cols">
            <input type="checkbox" value="Eric" name="article" class="article1" id="article1">
          </div>
          <div class="cols">
          <span>${item.name}</span>
          </div>
          <div class="cols">
          <span>${item.email}</span>
          </div>
          <div class="cols">
          <span>${item.message}</span>
          </div>
          <div class="cols">
          <span></span>
          </div>   
        </div>
            `
      })
    });
}
