function syncCloseSRinPortal() {
	console.log('syncCloseSRinPortal');
	var url = syncAllToPortal;
	var invocation = new XMLHttpRequest();
	var url = syncAllToPortal;
	if (invocation) {
		invocation.open("POST", url, true);
		invocation.timeout = 5000;
		invocation.setRequestHeader("syncSRNumber", syncSRNumber);
		invocation.setRequestHeader("syncProjectId", syncProjectId);
		invocation.setRequestHeader("syncUpdated", syncUpdated);
		invocation.setRequestHeader("syncSRUpdatedBy", localStorage.getItem("ssoEm"));
		invocation.setRequestHeader("syncStatus", 'N');
		invocation.withCredentials = true;
		invocation.send();
		invocation.onreadystatechange = function (e) {
			if (invocation.readyState === 4) {
				if (invocation.status === 200) {
					varSyncStatus == "Y";
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