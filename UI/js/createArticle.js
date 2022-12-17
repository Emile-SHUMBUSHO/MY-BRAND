// js for creating an article modal
var createArticleModel = document.querySelector(".article-modal");
var openCreateArticleModal = document.querySelector(".open-create-article-modal");
var closeCreateArticle = document.querySelector(".close-create-article-modal");
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
            articleBody   : document.getElementById('articleBody').value
        }

        //add item data to array articlelist
        articleList.push(item)
    }

    // save array into localstorage
    localStorage.setItem('articleItem', JSON.stringify(articleList))

    //update table list
    allArticle()

    //remove form data
    document.getElementById('create-article-form').reset()
}

const articleData = [];
const createItem = () => {
    const title = document.getElementById('title').value;
    console.log(title);
    const description = document.getElementById('description').value;
    const titleBody = document.getElementById('articleBody').value;
    console.log(titleBody);
    const formData = {
        title,
        description,
        titleBody
    }
    articleData.push(formData);
    try{
        if (localStorage.getItem("article")=== null){
            localStorage.setItem("article", JSON.stringify(articleData));
        }else{
            let storage = JSON.parse(localStorage.getItem("article"));
            storage.push(formData);
            localStorage.setItem("article", JSON.stringify(storage));
            console.log(storage);
        }
    } catch(e){
        console.error(e);
    }
};