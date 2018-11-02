/*Get Product Details From Portal*/
function getProductProjects() {
 startProcessing();
 var productAreaId = document.getElementById("syncProdName").value;
 var csiNum1 = document.getElementById("csiInput").value;
 var url = getProductProjectsURL + '/' + csiNum1 + '/' + productAreaId;
 const xhr = new XMLHttpRequest();
 xhr.timeout = 5000;
 xhr.onreadystatechange = function(e) {
  if (xhr.readyState === 4) {
   if (xhr.status === 200) {
    var responseText = JSON.parse(xhr.responseText);
    var countOfProjects = Object.keys(responseText.items).length;
    if (projName !== "") {
     if (countOfProjects > 0) {
      var catOptions = "";
      for (var i = 0; i < countOfProjects; i++) {
       var option = document.createElement("option");
       option.text = responseText.items[i].projectname;
       option.value = responseText.items[i].projectid;
       var select = document.getElementById("syncProjName");
       select.appendChild(option);
      }
     } else {
      proj_available = "N";
      //window.alert("No Projects Available, Please Register the customer in Implementation Portal");
      processingComplete();
	  alert('No products available for this project');
      //document.getElementById("hover_bkgr_fricc_noProject").style.display = "block";//Show Confirmation
     }
    }
   } else {
    window.alert("Error in fetching Projects");
    document.getElementById("hover_bkgr_fricc_error").style.display = "block";
   }
  }
 };
 xhr.ontimeout = function() {
  document.getElementById("hover_bkgr_fricc_error").style.display = "block";
 };
 xhr.open("GET", url, true);
 xhr.send();
 processingComplete();
}