function verifyLocalMemory(){
	var emaiStored = localStorage.getItem("ssoEm");
	if(emaiStored === null){
		initializeFirstLoad();
	}
	else{
		hideMailDiv();
	}
}
function setEmail(em_text) {
  localStorage.setItem('ssoEm', em_text);
}

//Disable Notifications
function disableNotificationsPreference(){
	chrome.runtime.sendMessage({notificationPreference: "Disabled"}, function(response) {
		console.log(response);
	});
	document.getElementById("hover_bkgr_fricc_disableNotifications").style.display = "block";
}
//Enable Notifications
function enableNotificationsPreference(){
	chrome.runtime.sendMessage({notificationPreference: "Enabled"}, function(response) {
		console.log(response);
	});
	document.getElementById("hover_bkgr_fricc_enableNotifications").style.display = "block";
}
