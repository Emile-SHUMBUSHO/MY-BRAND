// js for updating an article modal
var updateArticleModel = document.querySelector(".article-modal");

function updateArticle(id){
    console.log(id);
    //get data from localstorage and store to articleItem array
    //we must to use JSON.parse, because data as string, we need convert to array
    articleItem = JSON.parse(localStorage.getItem('articleItem')) ?? []

    articleItem.forEach(function (value){
        if(value.id == id){
            document.getElementById('id').value = value.id,
            document.getElementById('title').value = value.title,
            document.getElementById('description').value = value.description,
            document.getElementById('articleBody').value = value.articleBody
        }
    })
    updateArticleModel.style.display = "flex";
}