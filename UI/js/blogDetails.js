const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

function singleBlog() {
    var div = document.getElementById("blog-details");
    div.innerHTML = ``;
  fetch(`https://shumbusho-emile.onrender.com/blogs/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("blogId", JSON.stringify(data.data._id));
      div.innerHTML += `
      <div class="article-content">
      <div class="article-details-card">
        <div class="article-detail-header">
          <h3 class="article-titles" id="in-this-article">
            In this article
          </h3>
          <svg
            width="20px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
            />
          </svg>
        </div>
        <div class="article-detail-body">
          <p>
            <span> 1. Prerequisites for Building Node.js REST API </span
            ><br />
            <span> 2. What is the REST API in Node.js? </span><br />
            <span> 3. Steps to Build REST API with Node.js </span><br />
            <span> 4. Principles of REST </span>
          </p>
        </div>
        <h3 class="article-titles" id="view-more">View More</h3>
      </div>
      <img id="blog-banner" src="${data.data.imageUrl}" alt="" />
      <div class="article-body">
        <p class="article-pragraphs">
          ${data.data.blogBody}
        </p>
      </div>
      <div class="article-author">
        <hr />
        <div
          style="
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 20px 0 0 0;
          "
        >
          <div style="display: flex">
            <svg
              width="50px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM256 272c39.8 0 72-32.2 72-72s-32.2-72-72-72s-72 32.2-72 72s32.2 72 72 72z"
              />
            </svg>
            <div
              style="display: flex; flex-direction: column; margin: 10px"
            >
              <h3 style="color: black; font-size: 16px">${data.data.author}</h3>
              <span>Blog Author</span>
            </div>
          </div>
          <a href="https://www.linkedin.com/">
            <svg
              width="25px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                fill="#2563EB"
                d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
              />
            </svg>
          </a>
        </div>
        <p class="article-pragraphs">
          A content marketing analyst, Binod’s area of interest is EdTech,
          marketing analytics, and digital marketing. He is also a
          professional blogger and writes extensively on skill development.
          His hobbies include travelling, programming, and watching sitcoms.
        </p>
      </div>
    </div>
      `;
    })
    .catch((error) => {
      console.log(error);
    });
}
