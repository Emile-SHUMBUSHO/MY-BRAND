function deleteArticle(id){
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    fetch(`https://shumbusho-emile.onrender.com/blogs/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
}