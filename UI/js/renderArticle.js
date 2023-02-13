//method to get all article
function allArticle() {
  var div = document.getElementById("articleData");
  div.innerHTML = ``;
  fetch("https://shumbusho-emile.onrender.com/blogs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("articleItem", JSON.stringify(data));
      data.data.forEach((article) => {
        const date = new Date(article.date);
        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        };
        const formattedDate = date.toLocaleString("default", options);

        div.innerHTML += `
            <div class="content-row">
                <div class="cols"><span>${
                  article.title.slice(0, 10) + "..."
                }</span></div>
                <div class="cols"><span>${
                  article.description.slice(0, 10) + "..."
                }</span></div>
                <div class="cols"><span>${
                  article.blogBody.slice(0, 10) + "..."
                }</span></div>
                <div class="cols"><img src="${article.imageUrl}" alt=""></div>
                <div class="cols"><span>${formattedDate}</span></div>
                <div class="cols"><i class="fa fa-edit" onclick="updateArticle('${
                  article._id
                }')"></i></div>
                <div class="cols"><i onclick="deleteArticle('${
                  article._id
                }')" class="fa fa-trash"></i></div>
            </div>
            <hr>`;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
