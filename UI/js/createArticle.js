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

const form = document.getElementById("create-article-form");
const title = document.getElementById("title");
const description = document.getElementById("description");
const blogBody = document.getElementById("articleBody");

const firebaseConfig = {
  apiKey: "AIzaSyA-aV1-Zx8h3J88pVAgKMWoTqmlZ5kjInE",
  authDomain: "capstone-4866e.firebaseapp.com",
  projectId: "capstone-4866e",
  storageBucket: "capstone-4866e.appspot.com",
  messagingSenderId: "1086595721569",
  appId: "1:1086595721569:web:d19f63924ba5ede0d83d20",
  measurementId: "G-M08R2TT062",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const storageRef = storage.ref();

// js for upload article image
const blogImageInput = document.getElementById("create-blog-image");
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
        localStorage.setItem("blogImage", downloadURL);
      });
    }
  );
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log(localStorage.getItem("blogImage"));
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const url = "https://shumbusho-emile.onrender.com/blogs/createBlog";
  const body = {
    title: title.value,
    description: description.value,
    blogBody: blogBody.value,
    imageUrl: localStorage.getItem("blogImage"),
  };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.user.token}`,
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        console.log(data);
        createToast("success", data.message);
      } else {
        const error = data.errorMsg.join("");
        createToast("error", error);
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});
