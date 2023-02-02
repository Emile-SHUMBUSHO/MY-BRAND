// js for managing tabs
dashboardContent = document.getElementsByClassName("dashboard-content");
dashboardContent[0].style.display="block";
function openCard(evt, cardContent) {
    console.log(cardContent);
    var i, dashboardContent, tabs;
    dashboardContent = document.getElementsByClassName("dashboard-content");
    for( i = 0; i < dashboardContent.length; i++){
        dashboardContent[i].style.display = "none";
    }
    document.getElementById(cardContent).style.display = "block";
    tabs = document.getElementsByClassName("tabLink");
    for( i = 0; i < tabs.length; i++){
        tabs[i].className = tabs[i].className.replace(" active", "");
    }
    evt.currentTarget.className += " active";
}