var cakeNotification = "NOTIFICATION_OSIP_1";

function handleMessage(request, sender, sendResponse) {
	chrome.storage.local.get(['OSIPNotification'], function (result) {
		//Set Notification Preference - START	
		if (request.notificationPreference == "Disabled") {
			chrome.storage.local.set({
				OSIPNotification: request.notificationPreference
			}, function () {});
			return true;
		}
		if (request.notificationPreference == "Enabled") {
			chrome.storage.local.set({
				OSIPNotification: request.notificationPreference
			}, function () {});
			return true;
		}
		//Set Notification Preference - END

		//Create Notification - START
		if (request.greeting != "hello" && (result.OSIPNotification == "" || result.OSIPNotification == "Enabled")) {

			if (request.projType == "Implementation") {
				var n = browser.notifications.create(cakeNotification, {
					"type": "basic",
					"iconUrl": "icons/DSE.png",
					"title": "Oracle Support - Implementation Project",
					"message": request.greeting + " is an " + request.projType + " Customer"
				});
				window.setTimeout(closeNotification, 5000);
				return true;
			} else {
				var n = browser.notifications.create(cakeNotification, {
					"type": "basic",
					"iconUrl": "icons/DSE.png",
					"title": "Oracle Support - Implementation Project",
					"message": request.greeting + " is a " + request.projType + " Customer"
				});
				window.setTimeout(closeNotification, 5000);
				return true;

			}
		}
		//Create Notification - END
	});
}

function closeNotification() {
	chrome.notifications.clear(cakeNotification);
}
chrome.runtime.onMessage.addListener(handleMessage);
//Open Implementation Portal When Notification Is Clicked
function openUrls() {
	chrome.tabs.create({
		url: 'https://apex.oraclecorp.com/pls/apex/f?p=30339:64:116119529117238::NO:::',
		windowId: window.id
	}).then((tab) => {});
}
chrome.notifications.onClicked.addListener(function (cakeNotification) {
	openUrls();
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.greeting === 'hello') {
		chrome.storage.local.get(['OSIPNotification'], function (result1) {
			sendResponse({
				farewell: result1.OSIPNotification
			});
		});
		return true; // <-- I intend to call `sendResponse` later
	}
	return true; // <-- I do NOT intend to call `sendResponse`
});