/*Get Service Team From Portal*/
function contactServiceTeam() {
	console.log('contactServiceTeam');
	startProcessing();
	var url = contactServiceTeamURL;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("PROJECT_ID", document.getElementById("impProjName").value);
	xhr.setRequestHeader("PRIMARY_MANAGER", document.getElementById("implManager").value);
	xhr.setRequestHeader("PRIMARY_CONTACT", document.getElementById("implTeam").value);
	xhr.setRequestHeader("REASON", document.getElementById("contactReason").value);
	xhr.setRequestHeader("SR_NUMBER", document.getElementById("implTeamSR").value);
	xhr.setRequestHeader("CREATED_BY", localStorage.getItem("ssoEm"));

	xhr.onreadystatechange = function () { //Call a function when the state changes.
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			processingComplete();
			//alert("Service Team Has Been Notified");
			document.getElementById("hover_bkgr_fricc_conServiceTeam").style.display = "block"; //Show Confirmation
		}
		if (xhr.status !== 200) {
			processingComplete();
			errorServerConnection();
		}
	};
	xhr.send();
}