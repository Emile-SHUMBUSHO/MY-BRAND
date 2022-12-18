//method to get all article
function allArticle(){
    var div = document.getElementById('articleData');
    div.innerHTML = ``
    //get article from localstorage and store to articlelist array
    //we must to use JSON.parse, because article as string, we need convert to array
    articleList = JSON.parse(localStorage.getItem('articleItem')) ?? []

    //looping data and show data in div
    articleList.forEach(function (value, i){
        const img = new Image();
        img.src = value.articleImage;
        div.innerHTML += `
        <div class="content-row">
            <h5>${i+1}</h5>
            <h5>${value.title}</h5>
            <h5>${value.description}</h5>
            <p>${value.articleBody}</p>
            <img class="article-cover" src="${img.src}" alt="">
            <h5>4:30 PM</h5>
            <i class="fa fa-edit" onclick="updateArticle(${value.id})"></i>
            <i onclick="deleteArticle(${value.id})" class="fa fa-trash"></i>
        </div>
        <hr>`
    })
}