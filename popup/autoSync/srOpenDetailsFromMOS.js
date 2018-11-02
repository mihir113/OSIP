/*ALL MOS SR Details For Open SRs*/
function srAllDetailsFromMOS(statusType) {
	startProcessing();
	console.log('srAllDetailsFromMOS');
	var emaiStored = localStorage.getItem("ssoEm");
	var sel = document.getElementById("syncProdName");
	var productName1 = sel.options[sel.selectedIndex].text;
	var username1 = localStorage.getItem("ssoEm");
	var csiNum1 = document.getElementById("csiInput").value;
	var count = 0;
	if (emaiStored !== null) {
		var xhr = new XMLHttpRequest();
		var file = "https://support.us.oracle.com/oip/faces/ListRequest?query=CSI%3D%27" + csiNum1 + "%27%0AAND%0Astatus%3D%27" + statusType + "%27%0AAND%20ownerGroup%20like%20%27FAPPS%3A%25%27%0AAND%20product%20%3D%27" + productName1 + "%27&type=SR&sort=%20-SRSubmitDate&listBCId=9381-46803&subject=" + emaiStored + "&mode=All&recCountType=NONE&customPreventCache=1538272995320&start=0&count=50";
		xhr.timeout = 5000;
		xhr.open('GET', file, true);
		xhr.send();
		xhr.addEventListener("readystatechange", processRequest, false);

		function processRequest(e) {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					if (xhr.responseText == "undefined") {
						alert("Undefined Response From MOS, Please Try Again");
					} else {
						var str = xhr.responseText;
						var str1 = str.replace(/sub-Status/g, 'subStatus'); //Doing String Replace as sub-status is not valid in json
						var responseText = JSON.parse(str1);
						var countOfSR = Object.keys(responseText.items).length;
						if (countOfSR > 0) {
							for (var i = 0; i < countOfSR; i++) {
								syncSRNumber = responseText.items[i].SRNumber;
								if (statusType == "Open") {
									syncStatus = "Y";
								}
								if (statusType == "Closed") {
									syncStatus = "N";
								}
								syncSubStatus = responseText.items[i].subStatus;
								syncSummary = responseText.items[i].summary;
								syncDetail = responseText.items[i].description;
								syncOwner = responseText.items[i].owner;
								syncProjectId = document.getElementById("syncProdName").value;
								syncUpdated = convertDateToGB(responseText.items[i].updated);
								syncSeverity = responseText.items[i].severity.split('-', 1)[0].replace(/-/g, "");
								syncCreated = convertDateToGB(responseText.items[i].created);
								syncCreatedBy = localStorage.getItem("ssoEm");
								syncGroup = responseText.items[i].ownerGroup;
								syncSRinPortal();
							}
							if (varSyncStatus == "Y") {
								processingComplete();
								document.getElementById("hover_bkgr_fricc_syncSRComplete").style.display = "block";
							}
						} else {
							alert("No Open SRs Available For This Product For This Customer");
							window.close();
							processingComplete();
						}
					}
				} else {
					processingComplete();
					document.getElementById("hover_bkgr_fricc_error").style.display = "block";
				}
			}
		}
	}
}