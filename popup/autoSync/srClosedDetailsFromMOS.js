/*Search For Closed SR in MOS */
function srListFromMOS() {
	console.log('srListFromMOS');
	var emaiStored = localStorage.getItem("ssoEm");
	var url = "https://support.us.oracle.com/oip/faces/ListRequest?query=SRNumber in (" + srList + ")&type=SR&sort=&listBCId=9999-11451&subject=" + emaiStored + "&mode=All&recCountType=NONE&customPreventCache=1539482129388&start=0&count=50";
	const xhr = new XMLHttpRequest();
	xhr.timeout = 15000;
	xhr.onreadystatechange = function (e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var responseText = JSON.parse(xhr.responseText);
				var countOfSR = Object.keys(responseText.items).length;
				if (countOfSR > 0) {
					for (var i = 0; i < countOfSR; i++) {
						syncStatus = responseText.items[i].status;
						if (syncStatus == "Closed") {
							syncSRNumber = responseText.items[i].SRNumber;
							syncProjectId = document.getElementById("syncProjName").value;
							syncUpdated = convertDateToGB(responseText.items[i].updated);
							syncCloseSRinPortal();
						}
					}
					processingComplete();
				} else {
					document.getElementById("hover_bkgr_fricc_error").style.display = "block";
				}
			}
		}
	};
	xhr.ontimeout = function () {
		document.getElementById("hover_bkgr_fricc_error").style.display = "block";
	};
	xhr.open("GET", url, true);
	xhr.send();
}