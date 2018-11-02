function closeOpenSRInPortal() {
	console.log('closeOpenSRInPortal');
	startProcessing();
	var srUpdate = encodeURI(document.getElementById("element_2").value.replace(/\n/g, "<br />").replace(/–/g, ""));
	var srSummary = encodeURI(document.getElementById("summaryTxt").value);
	var srOwner = document.getElementById("srOwner").value;
	var srSev = document.getElementById("severity").value;
	var srMilestone = document.getElementById("selMilestone").value;
	var url = updateSR;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("comment", srUpdate);
	xhr.setRequestHeader("issue", srSummary);
	xhr.setRequestHeader("issue_level", srSev);
	xhr.setRequestHeader("issue_owner", srOwner);
	xhr.setRequestHeader("is_open", "N");
	xhr.setRequestHeader("sr_number", srNumber);
	xhr.setRequestHeader("milestone_id", srMilestone);
	xhr.onreadystatechange = function () { //Call a function when the state changes.
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			processingComplete();
			document.getElementById("hover_bkgr_fricc_srClosed").style.display = "block"; //Show Confirmation Box
		}
		if (xhr.status !== 200) {
			processingComplete();
			errorServerConnection();
		}
	}
	xhr.send();
}