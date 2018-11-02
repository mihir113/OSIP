console.log('updateOpenSRInPortal');

function updateOpenSRInPortal() {
	startProcessing();
	var srUpdate = encodeURI(document.getElementById("element_2").value.replace(/\n/g, "<br />").replace(/–/g, "").replace(/”/g, "\"").replace(/’/g, "'").replace(/‘/g, "'"));
	var srSummary = encodeURI(document.getElementById("summaryTxt").value.replace(/”/g, "\"").replace(/’/g, "'").replace(/‘/g, "'"));
	var srOwner = document.getElementById("srOwner").value;
	var srSev = document.getElementById("severity").value;
	var actItem = document.getElementById("actItem").value;
	var srMilestone = document.getElementById("selMilestone").value;
	if (srMilestone == "" || srMilestone == "undefined") {
		srMilestone = "123"; //Use 123 for NULL
	}
	if (actItem == "Y" & srMilestone == "123") {
		processingComplete();
		document.getElementById("hover_bkgr_fricc_requiredFields").style.display = "block";
		return false;
	}
	var url = updateSR;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("comment", srUpdate);
	xhr.setRequestHeader("issue", srSummary);
	xhr.setRequestHeader("issue_level", srSev);
	xhr.setRequestHeader("issue_owner", srOwner);
	xhr.setRequestHeader("is_open", "Y");
	xhr.setRequestHeader("sr_number", srNumber);
	xhr.setRequestHeader("milestone_id", srMilestone);
	xhr.onreadystatechange = function () { //Call a function when the state changes.
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			processingComplete();
			document.getElementById("hover_bkgr_fricc_srUpdate").style.display = "block"; //Show Confirmation
		}
		if (xhr.status !== 200) {
			processingComplete();
			errorServerConnection();
		}
	};
	xhr.send();
}