 // js for success pop up
 let successPopUp = document.getElementById("successPopUp");
 function openSuccessPopUp(){
     successPopUp.classList.add("open-success-modal");
 }

 function closeSuccessPopUp(){
     successPopUp.classList.remove("open-success-modal");
 }

 // js for toggle menu
 let subMunu = document.getElementById("subMenu");
 function toggleMenu(){
     subMunu.classList.toggle("open-menu");
 }
 
 // js for clear form data
 function clearData(){
     document.getElementById('create-article-form').reset()
     document.getElementById('id').value = ""
 }