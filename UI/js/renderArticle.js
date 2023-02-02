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
            <div class="cols"><span>${value.title}</span></div>
            <div class="cols"><span>${value.description}</span></div>
            <div class="cols"><span>${value.articleBody.slice(0, 100)+"..."}</span></div>
            <div class="cols"><img src="${img.src}" alt=""></div>
            <div class="cols"><span>${value.time}</span></div>
            <div class="cols"><i class="fa fa-edit" onclick="updateArticle(${value.id})"></i></div>
            <div class="cols"><i onclick="deleteArticle(${value.id})" class="fa fa-trash"></i></div>
        </div>
        <hr>`
    })
}