// js for updating an article modal
var updateArticleModel = document.querySelector(".update-article-modal");
var closeUpdateArticle = document.querySelector(".close-update-article-modal");
var articleImg = document.getElementById("article-cover");

closeUpdateArticle.addEventListener("click", closeUpdateArticleModal);
window.addEventListener("click", outSideClickUpdateArticleModal);

function closeUpdateArticleModal() {
  updateArticleModel.style.display = "none";
}
function outSideClickUpdateArticleModal(e) {
  if (e.target == updateArticleModel) {
    updateArticleModel.style.display = "none";
  }
}

function updateArticle(id) {
  //we must to use JSON.parse, because data as string, we need convert to array
  articleItem = JSON.parse(localStorage.getItem("articleItem")) ?? [];
  articleItem.forEach(function (value) {
    if (value._id == id) {
      (document.getElementById("uid").value = value._id),
        (document.getElementById("u-title").value = value.title),
        (document.getElementById("u-description").value = value.description),
        (document.getElementById("u-articleBody").value = value.blogBody);
    }
  });
  updateArticleModel.style.display = "flex";
  const form = document.getElementById("update-form");
  const title = document.getElementById("u-title");
  const description = document.getElementById("u-description");
  const blogBody = document.getElementById("u-articleBody");
  console.log(title.value, description.value, blogBody.value);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const body = {
      title: title.value,
      description: description.value,
      blogBody: blogBody.value,
      imageUrl:
        "https://imgs.search.brave.com/feANRSdW-1g7FnPUhtB5JPmSlRivB5JXbjL7fmXHWOM/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly95b3Vy/c2VydmVyYWRtaW4u/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE4LzA0L25vZGUu/anBn",
    };

    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    fetch(`https://shumbusho-emile.onrender.com/blogs/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.user.token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
