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
  articleItem.data.forEach(function (value) {
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

  // js for upload article image
  const blogImageInput = document.getElementById("update-blog-image");
  blogImageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const fileRef = storageRef.child(file.name);
    const uploadTask = fileRef.put(file);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        // Handle progress changes
      },
      function (error) {
        console.error(error);
      },
      function () {
        // Handle successful uploads
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          localStorage.setItem("updateBlogImage", downloadURL);
        });
      }
    );
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const body = {
      title: title.value,
      description: description.value,
      blogBody: blogBody.value,
      imageUrl: localStorage.getItem("updateBlogImage"),
    };

    console.log(body.imageUrl)

    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const hostedUrl = "https://shumbusho-emile.onrender.com/blogs/update";
    const localUrl = "http://localhost:8080/blogs/update";
    fetch(`${hostedUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        form.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
