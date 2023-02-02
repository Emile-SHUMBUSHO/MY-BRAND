function allMessage() {
  var div = document.getElementById("message-body");
  div.innerHTML = ``;
  // get messages from localStorage and store them in the messageList array
  //we must to use JSON.parse, because message as string, we need convert to array
  messageList = JSON.parse(localStorage.getItem("messageItem")) ?? [];

  // looping through messageList array and get data in a div
  messageList.forEach((element, index) => {
    div.innerHTML += `
    <div class="content-row">
      <div class="cols">
        <input type="checkbox" value="Eric" name="article" class="article1" id="article1">
      </div>
      <div class="cols">
      <span>${element.fullName}</span>
      </div>
      <div class="cols">
      <span>${element.email}</span>
      </div>
      <div class="cols">
      <span>${element.message}</span>
      </div>
      <div class="cols">
      <span>${element.time}</span>
      </div>   
    </div>
        `;
  });
}
