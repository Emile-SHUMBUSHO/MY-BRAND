// js for updating an article modal
var updateArticleModel = document.querySelector(".article-modal");
var closeUpdateArticle = document.querySelector(".close-create-article-modal");
closeUpdateArticle.addEventListener('click', closeUpdateArticleModal);
window.addEventListener('click', outSideClickUpdateArticleModal);

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

function closeUpdateArticleModal (){
    updateArticleModel.style.display = "none";
}

function outSideClickUpdateArticleModal (e){
    if(e.target == updateArticleModel){
        updateArticleModel.style.display = "none";
    }
}

//method to get detail article data based on id
function find(id){
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
}