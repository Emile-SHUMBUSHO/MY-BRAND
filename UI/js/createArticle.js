// js for creating an article modal
var createArticleModel = document.querySelector(".article-modal");
var openCreateArticleModal = document.querySelector(
  ".open-create-article-modal"
);
var closeCreateArticle = document.querySelector(".close-create-article-modal");
var articleImg = document.getElementById("article-cover");

closeCreateArticle.addEventListener("click", closeCreateArticleModal);
window.addEventListener("click", outSideClickCreateArticleModal);
openCreateArticleModal.onclick = function () {
  createArticleModel.style.display = "flex";
};
function closeCreateArticleModal() {
  createArticleModel.style.display = "none";
}
function outSideClickCreateArticleModal(e) {
  if (e.target == createArticleModel) {
    createArticleModel.style.display = "none";
  }
}

// js for upload article image
const input = document.getElementById("img");
var articleCover = [];
console.log(articleCover);
input.addEventListener("change", (event) => {
  const image = event.target.files[0];

  const reader = new FileReader();

  reader.readAsDataURL(image);

  reader.addEventListener("load", () => {
    articleCover.push(reader.result);
    //  console.log(reader.result);
    //  localStorage.setItem('thumbnail', reader.result);
  });
});

//method to save article into localstorage
function createArticle() {
  //get article from localstorage and store to articlelist array
  //we must to use JSON.parse, because article as string, we need convert to array
  articleList = JSON.parse(localStorage.getItem("articleItem")) ?? [];

  //get last array to get last id
  //and store it into variable id
  var id;
  articleList.length != 0
    ? articleList.findLast((item) => (id = item.id))
    : (id = 0);

  if (document.getElementById("id").value) {
    //edit articletlist array based on value
    articleList.forEach((value) => {
      if (document.getElementById("id").value == value.id) {
        (value.title = document.getElementById("title").value),
          (value.description = document.getElementById("description").value),
          (value.articleImage = articleCover[0]),
          (value.articleBody = document.getElementById("articleBody").value);
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
    let ampm = hour > 12 ? "PM" : "AM";
    let currentTime =
      year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + ampm;
    var item = {
      id: id + 1,
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      articleImage: articleCover[0],
      articleBody: document.getElementById("articleBody").value,
      time: currentTime,
    };

    //add item data to array articlelist
    articleList.push(item);
  }

  // save array into localstorage
  localStorage.setItem("articleItem", JSON.stringify(articleList));

  //update table list
  allArticle();
  //remove form data
  document.getElementById("create-article-form").reset();
}

const form = document.getElementById("create-article-form");
const title = document.getElementById("title");
const description = document.getElementById("description");
const blogBody = document.getElementById("articleBody");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDkzN2ViZDAzYzU5NjllMTNhOWJhZiIsImlhdCI6MTY3NTM3NDA3NCwiZXhwIjoxNjc1NDYwNDc0fQ.TZZKL5-3h6gyxOgYo8yBQfTVQd4PPURS5htrORVOwLI";
console.log(token);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  fetch("http://localhost:8080/blogs/createBlog", {
    method: "POST",
    headers: {
      "Content-Type": "application",
      Authorization: `Bearer ${token}`,
    },
    body: {
      title: "hellojdsdjdjhdshdhdshjh",
      description: "kjjxkcghgxjcxjcxkcn sksj",
      blogBody:
        "JavaScript.com is a resojgurce for the JavaScript community. You will find resources and examples for JavaScript beginners as well as support for JavaScript experts. Learn JavaScript or free with our easy ilkjhhto use input output machine.",
      imageUrl:
        "https://imgs.search.brave.com/0Phbn0ycrNwDONqWQGJv_lNJc-8it55i87fHfmc2Zy0/rs:fit:1200:1200:1/g:ce/aHR0cDovL3d3dy5z/bnV0LmZyL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE1LzA4L2lt/YWdlLWRlLXBheXNh/Z2UuanBn",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Blog created successfully");
      } else {
        console.log("Creating blog failed", response);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
