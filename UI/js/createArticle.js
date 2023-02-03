// js for creating an article modal
var createArticleModel = document.querySelector(".article-modal");
var openCreateArticleModal = document.querySelector(".open-create-article-modal");
var closeCreateArticle = document.querySelector(".close-create-article-modal");
var articleImg = document.getElementById('article-cover');

closeCreateArticle.addEventListener('click', closeCreateArticleModal);
window.addEventListener('click', outSideClickCreateArticleModal);
openCreateArticleModal.onclick = function(){
    createArticleModel.style.display = "flex";
}
function closeCreateArticleModal (){
    createArticleModel.style.display = "none";
}
function outSideClickCreateArticleModal (e){
    if(e.target == createArticleModel){
        createArticleModel.style.display = "none";
    }
}

 // js for upload article image
 const input = document.getElementById('img');
 var articleCover = [];
 console.log(articleCover);
 input.addEventListener('change', (event) => {
     const image = event.target.files[0];
 
     const reader = new FileReader();

     reader.readAsDataURL(image);
 
     reader.addEventListener('load', () => {
        articleCover.push(reader.result);
        //  console.log(reader.result);
        //  localStorage.setItem('thumbnail', reader.result);
     });
 });

//method to save article into localstorage
function create(){
    //get article from localstorage and store to articlelist array
    //we must to use JSON.parse, because article as string, we need convert to array
    articleList = JSON.parse(localStorage.getItem('articleItem')) ?? []

    //get last array to get last id
    //and store it into variable id
    var id
    articleList.length != 0 ? articleList.findLast((item) => id = item.id) : id = 0

    if(document.getElementById('id').value){
        //edit articletlist array based on value
        articleList.forEach(value => {
            if(document.getElementById('id').value == value.id){
                value.title     = document.getElementById('title').value, 
                value.description       = document.getElementById('description').value,
                value.articleImage       = articleCover[0],
                value.articleBody   = document.getElementById('articleBody').value
            }
        });

        //remove hidden input
        document.getElementById('id').value = ''

    }else{
        
        //save
        //get data from form
        var item = {
            id        : id + 1, 
            title      : document.getElementById('title').value, 
            description       : document.getElementById('description').value,
            articleImage       : articleCover[0], 
            articleBody   : document.getElementById('articleBody').value
        }

        //add item data to array articlelist
        articleList.push(item);
    }

    // save array into localstorage
    localStorage.setItem('articleItem', JSON.stringify(articleList))

    //update table list
    allArticle()

    //remove form data
    document.getElementById('create-article-form').reset()
}