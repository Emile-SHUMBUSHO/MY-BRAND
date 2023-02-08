//method to get all article
let counter = 0;
function allArticle() {
  var div = document.getElementById("blogData");
  div.innerHTML = ``;
  fetch("https://shumbusho-emile.onrender.com/blogs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.lenght >= 3) {
        console.log("hello data");
        loadMoreBtn();
      }
      localStorage.setItem("articleItem", JSON.stringify(data));
      data.slice(0, counter + 3).forEach((article) => {
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
              <div class="blog-content">
              <img src="${article.imageUrl}" alt="" style="width: 100%;">
              <div style="display: flex; justify-content:space-between; align-items:center; padding:10px">
                  <button style="width: 90px; border-radius:20px; border: 1px solid #CCCCCC;background-color: #FFFF; padding:6px; color: black; font-size: 12px; cursor: pointer;">Blogs</button>
                  <div style="display: flex; justify-content:center; align-items:center">
                      <svg width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="grey" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z"/></svg>
                      <span style="margin: 10px;">123</span>
                  </div>
              </div>
              <div style="padding: 10px;">
                  <h3 style="color:black; font-size: 16px;">${
                    article.description.slice(0, 10) + "..."
                  }</h3>
                  <p style="color:black; font-size: 16px;">${
                    article.blogBody.slice(0, 10) + "..."
                  }</p>
                  <a href="../pages/blogDetail.html?id=${
                    article._id
                  }" style="color: #2563EB; text-decoration:none">Read More</a>
              </div>
              <hr style="margin: 10px;">
              <div style="display: flex; justify-content:space-between; align-items: center; padding:10px;">
                  <h5>By<Span style="margin: 10px; color: #2563EB">Christian</Span></h5>
                  <span>${formattedDate}</span>
              </div>
          </div>
              `;
      });
      counter += 3;
    })
    .catch((error) => {
      console.log(error);
    });
}

document.getElementById("loadMoreBtn").addEventListener("click", allArticle);
function loadMoreBtn() {
  document.getElementById("loadMoreBtnWrapper").style.display = "flex";
}
