/*Get Product Details From Portal*/
function getProductNames() {
  startProcessing();
  var url = syncSR;
  const xhr = new XMLHttpRequest();
  xhr.timeout = 5000;
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var responseText = JSON.parse(xhr.responseText);
        var countOfProducts = Object.keys(responseText.items).length;
        if (countOfProducts > 0) {
          var catOptions = "";
          for (var i = 0; i < countOfProducts; i++) {
            var option = document.createElement("option");
            option.text = responseText.items[i].area_name;
            option.value = responseText.items[i].area_id;
            var select = document.getElementById("syncProdName");
            select.appendChild(option);
          }
        } else {
          proj_available = "N";
          //window.alert("No Projects Available, Please Register the customer in Implementation Portal");
          processingComplete();
          document.getElementById("hover_bkgr_fricc_noProject").style.display = "block"; //Show Confirmation
        }
      } else {
        window.alert("Error in fetching Projects");
        document.getElementById("hover_bkgr_fricc_error").style.display = "block";
      }
    }
  };
  xhr.ontimeout = function () {
    document.getElementById("hover_bkgr_fricc_error").style.display = "block";
  };
  xhr.open("GET", url, true);
  xhr.send();
  processingComplete();
}