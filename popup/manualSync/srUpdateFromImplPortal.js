//Function to fetch existing SR Update from implementation portal
function getSRUpdateFromImplPortal() {
	console.log('getSRUpdateFromImplPortal');
	startProcessing();
	var xhr = new XMLHttpRequest(),
		method = "GET",
		url = getSR + srNumber;
	xhr.open(method, url, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			processingComplete();
			var responseText = JSON.parse(xhr.responseText);
			var srCount = Object.keys(responseText.items).length;
			if (srCount > 0) { //SR exists in Portal
				var isSROpenInPortal = responseText.items[0].is_open;
				var portalUpdate = responseText.items[0].issue_detail;
				projId = responseText.items[0].project_id;
				generateImpPortalURl(projId);
				if (responseText.items[0].project_name != null) {
					var option = document.createElement("option");
					option.text = responseText.items[0].project_name;
					option.value = responseText.items[0].project_id;
					var select = document.getElementById("projName");
					select.appendChild(option);
					document.getElementById("projName").selectedIndex = "1";
					document.getElementById("projName").disabled = true;
				}
				document.getElementById("txtLastUpdDate").value = responseText.items[0].updated;
				document.getElementById("divLastUpdated").style.display = "block";
				/*
				document.getElementById("srOwner").value = responseText.items[0].issue_owner; //SR Owner
				document.getElementById("severity").value = responseText.items[0].issue_level; //SR Severity
				*/
				getSRSeverityUpdateFromMOS();
				document.getElementById("summaryTxt").value = decodeHTML(decodeURI(responseText.items[0].issue.replace(/–/g, "-"))); //SR Summary
				var existingMilestonesVal = responseText.items[0].milestone_id;
				if (existingMilestonesVal != null) {
					setMilestones(responseText.items[0].milestone_id);
					document.getElementById("milestoneDiv").style.display = "none";
					document.getElementById('actItem').checked = true;
					setSRCritical();
					//document.getElementById('actItem').disabled = true; //Disable the option for user to uncheck the flag from extension once set
				}
				// If SR Is Open
				if (isSROpenInPortal === "Y") {
					status_open == "Y";
					document.getElementById("srStatusSelect").value = "Open";
					document.getElementById("srStatusSelect").options[2].disabled = true;
					document.getElementById("saveForm").value = "Add Update To Project";
					document.getElementById("imptMilestone").style.display = "block";
				} else {
					status_open = "N";
					document.getElementById("srStatusSelect").value = "Closed";
					document.getElementById("srStatusSelect").options[2].disabled = true;
					document.getElementById("saveForm").value = "Close SR in Implementation Project";
				}
				if (portalUpdate !== "") {
					document.getElementById("element_2").value = replaceHTMLSpecialChars(decodeHTML(portalUpdate));
				}
			} else { //No SR Found in Portal, simulating new SR flow
				newSRFlow();
			}
		}
	};
	xhr.send();
}