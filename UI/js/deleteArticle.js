function deleteArticle(id){
    //get data from localstorage and store to articleList array
    //we must to use JSON.parse, because data as string, we need convert to array
    articleList = JSON.parse(localStorage.getItem('articleItem')) ?? []

    articleList = articleList.filter(function(value){ 
        return value.id != id; 
    });

    // save array into localstorage
    localStorage.setItem('articleItem', JSON.stringify(articleList))

    //get data again
    allArticle()
}