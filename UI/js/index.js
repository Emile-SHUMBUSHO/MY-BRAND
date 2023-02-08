$(window).scroll(function () {
  if ($(this).scrollTop() > 10) {
    $(".navBar").addClass("scrolled");
  } else {
    $(".navBar").removeClass("scrolled");
  }
});

 // js for managing my work section tabs
 function openMyWork(evt, workName) {
  var i, tabBtn;
  var x = document.getElementsByClassName("my-work-container");
  var tab = document.getElementsByClassName("tabBtn");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(workName).style.display = "inline-flex";
  tabBtn = document.getElementsByClassName("tabBtn");
  for (i = 0; i < tabBtn.length; i++) {
    tabBtn[i].className = tabBtn[i].className.replace("active", "");
  }
  evt.currentTarget.className += " active";
}
// js for managing navigation menu
let navigation = document.querySelector(".navigation");
function toggleMenu() {
  if (navigation.style.display === "block") {
    navigation.style.display = "none";
  } else {
    navigation.style.display = "block";
  }
}