//Get List of All Open SRs Associated To Project from Apex
function getOpenSRForProject() {
	startProcessing();
	var projectId = document.getElementById("syncProjName").value;
	var url = allOpenProjectSRURL + projectId;
	const xhr = new XMLHttpRequest();
	xhr.timeout = 5000;
	xhr.onreadystatechange = function (e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var responseText = JSON.parse(xhr.responseText);
				var countOfSR = Object.keys(responseText.items).length;
				if (countOfSR > 0) {
					for (var i = 0; i < countOfSR; i++) {
						srList.push("'" + responseText.items[i].sr_number + "'");
					}
					srListFromMOS();
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