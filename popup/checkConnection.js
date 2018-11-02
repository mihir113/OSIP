//Check if user is inside ORA network
function doesConnectionExist() {
    var xhr = new XMLHttpRequest();
    var file = "https://support.us.oracle.com/";
    xhr.open('GET', file, true);
    xhr.send();
    xhr.addEventListener("readystatechange", processRequest, false);
    function processRequest(e) {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 304) {
          validInternet = "true";
        } else {
		    document.getElementById("outer_div").style.display = "none";
			document.getElementById("initialize_user").style.display = "none";
			document.getElementById("error_content").style.display = "block"; //Display Error Message
        }
      }
    }
}