$(window).scroll(function () {
    if ($(this).scrollTop() > 10) {
      $(".navBar").addClass("scrolled");
    } else {
      $(".navBar").removeClass("scrolled");
    }
  });