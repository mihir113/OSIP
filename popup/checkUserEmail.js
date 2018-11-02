/*MOS Details*/
function checkUserEmail() {
	startProcessing();
	var varEmail = document.getElementById("email_add").value.toLowerCase();;
	if (varEmail !== null) {
		var xhr = new XMLHttpRequest();
		var file = "https://support.us.oracle.com/oip/faces/ListRequest?query=SRNumber%3D%27" + srNumber + "%27&type=SR&sort=%2BadjustedPriorityScore&listBCId=282-577&subject=" + varEmail + "&mode=All&recCountType=NONE&start=0&count=99%22+";
		xhr.timeout = 5000;
		xhr.open('GET', file, true);
		xhr.send();
		xhr.addEventListener("readystatechange", processRequest, false);
		function processRequest(e) {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var responseText = JSON.parse(xhr.responseText);
					var errMessage = responseText.errorMsg;
					if (errMessage != null) {
						processingComplete();
						document.getElementById("hover_bkgr_fricc_errUsername").style.display = "block";
					}
					if (errMessage == undefined){
						processingComplete();
						updateMail();
					}
				}
			}
		}

	} else {
		document.getElementById("hover_bkgr_fricc_error").style.display = "block";
	}
}