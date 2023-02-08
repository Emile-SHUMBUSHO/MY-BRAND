function showLoading() {
  document.getElementById("submit").addEventListener("click", function () {
    document.getElementById("submit").style.display = "none";
    document.getElementById("loader").style.display = "block";
  });
}

function hideLoading() {
  document.getElementById("submit").style.display = "block";
  document.getElementById("loader").style.display = "none";
}
