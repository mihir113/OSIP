//Sync Open SRs in Portal
function syncSRinPortal() {
	console.log('syncSRinPortal');
	startProcessing();		
	var invocation = new XMLHttpRequest();
	var url = syncAllToPortal;
	if (invocation) {
		invocation.open("POST", url, true);
		invocation.timeout = 5000;
		invocation.setRequestHeader("syncSRNumber", syncSRNumber);
		invocation.setRequestHeader("syncStatus", syncStatus);
		invocation.setRequestHeader("syncSubStatus", syncSubStatus);
		invocation.setRequestHeader("syncSummary",  encodeURI(syncSummary.replace(/\n/g, "<br/>").replace(/–/g,"-").replace(/”/g, "\"").replace(/’/g, "'").replace(/‘/g, "'"))); 
		invocation.setRequestHeader("syncDetail", encodeURI(syncDetail.replace(/\n/g, "<br/>").replace(/–/g,"-").replace(/”/g, "\"").replace(/’/g, "'").replace(/‘/g, "'")));
		invocation.setRequestHeader("syncOwner", syncOwner);
		invocation.setRequestHeader("syncProjectId", document.getElementById("syncProjName").value);
		invocation.setRequestHeader("syncUpdated", syncUpdated); 
		invocation.setRequestHeader("syncSeverity", syncSeverity); 
		invocation.setRequestHeader("syncCreated",syncCreated);
		invocation.withCredentials = true;
		invocation.send();
		invocation.onreadystatechange = function (e) {
			if (invocation.readyState === 4) {
				if (invocation.status === 200) {
					varSyncStatus=="Y";
					processingComplete();
				}
				if (invocation.status !== 200) {
					processingComplete();
					varSyncStatus == "N";
					alert(invocation.status);
					errorServerConnection();
					return false;
				}
			}
		};
	}
}