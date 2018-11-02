try {
	window.onload = checkImplementationProjects; //Only Load the Code when the page completely loads
} catch (e) {
	if (e instanceof TypeError) {} else if (e instanceof RangeError) {
		// statements to handle RangeError exceptions
	} else if (e instanceof EvalError) {
		// statements to handle EvalError exceptions
	} else {
		// statements to handle any unspecified exceptions
	}
}

function checkImplementationProjects() {
	//Code to Check For Implementation Project on MOS HTML
	window.setTimeout(srButtonChange, 5000);

	function srButtonChange() {
		try {
			if (document.getElementById('dijit_form_Button_1').value != null) {
				document.getElementById('dijit_form_Button_1').onclick = function () {
					window.setTimeout(checkCSIProject, 10000);
				};
			}
			if (document.querySelector('[title="Refresh the page"]') != null) {
				document.querySelector('[title="Refresh the page"]').onclick = function () {
					window.setTimeout(checkCSIProjectWithNoNotification, 10000);
				};
				if (e instanceof TypeError) {} else if (e instanceof RangeError) {
					// statements to handle RangeError exceptions
				} else if (e instanceof EvalError) {
					// statements to handle EvalError exceptions
				} else {
					// statements to handle any unspecified exceptions
				}
			}
		} catch (e) {

		}

	}
	window.setTimeout(checkCSIProject, 5000);
	//Mihir: Code to Check If Customer Has Any Open Projects Associated To PLA
	function checkCSIProject() {
		try {
			if (document.getElementById("csi").value != null) {
				var url = "https://apex.oraclecorp.com/pls/apex/fusion_projects/implementation/getProductProjects/" + document.getElementById("csi").value + "/" + document.getElementById("productDescription").value;
				const xhr = new XMLHttpRequest();
				xhr.timeout = 5000;
				xhr.onreadystatechange = function (e) {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							var responseText = JSON.parse(xhr.responseText);
							var countOfProjects = Object.keys(responseText.items).length;
							if (countOfProjects > 0) {
								document.querySelector('[title="Account"]').innerText = responseText.items[0].project_type + ' Project:';
								document.querySelector('[title="Account"]').style.color = "red";
								var accText = document.getElementById("accountName").value;
								notifyBackgroundPage();

								function handleResponse(message) {
									//console.log('Message from the background script:  ${message.response}');
								}

								function handleError(error) {
									console.log('Error: ${error}');
								}

								function notifyBackgroundPage(e) {
									var sending = chrome.runtime.sendMessage({
										greeting: accText,
										projType: responseText.items[0].project_type
									});
									sending.then(handleResponse, handleError);
								}
							} else {
								document.querySelector('[title="Account"]').innerText = 'Account:';
								document.querySelector('[title="Account"]').style.color = "black";
							}
						}
					}
				};
				xhr.open("GET", url, true);
				xhr.send();
			}
		} catch (e) {
			if (e instanceof TypeError) {}
		}
	}

	function checkCSIProjectWithNoNotification() {
		try {
			if (document.getElementById("csi").value != null) {
				var url = "https://apex.oraclecorp.com/pls/apex/fusion_projects/implementation/getProductProjects/" + document.getElementById("csi").value + "/" + document.getElementById("productDescription").value;
				const xhr = new XMLHttpRequest();
				xhr.timeout = 5000;
				xhr.onreadystatechange = function (e) {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							var responseText = JSON.parse(xhr.responseText);
							var countOfProjects = Object.keys(responseText.items).length;
							if (countOfProjects > 0) {
								document.querySelector('[title="Account"]').innerText = responseText.items[0].project_type + ' Project:';
								document.querySelector('[title="Account"]').style.color = "red";
								var accText = document.getElementById("accountName").value;
							} else {
								document.querySelector('[title="Account"]').innerText = 'Account:';
								document.querySelector('[title="Account"]').style.color = "black";
							}
						}
					}
				};
				xhr.open("GET", url, true);
				xhr.send();
			}
		} catch (e) {
			if (e instanceof TypeError) {}
		}
	} //Function End
}
(function () {
	'use strict'; // this function is strict...
}());
//Global Variables-Start
var status_open = "Y";
var srNumber = "";
var status_new = "N";
var proj_available = "Y";
const getSR = "https://apex.oraclecorp.com/pls/apex/fusion_projects/implementation/get_comment/";
const updateSR = "https://apex.oraclecorp.com/pls/apex/fusion_projects/implementation/sr_update/";
const createSR = "https://apex.oraclecorp.com/pls/apex/fusion_projects/implementation/sr_create";
const getProject = "https://apex.oraclecorp.com/pls/apex/fusion_projects/implementation/get_project/";
const getMilestones = "https://apex.oraclecorp.com/pls/apex/fusion_projects/implementation/get_milestones/";
const syncSR = "https://apex.oraclecorp.com/pls/apex/fusion_projects/implementation/getProductList";
const syncAllToPortal = "https://apex.oraclecorp.com/pls/apex/fusion_projects/implementation/synchronizeAllSRForCustomer";
var getProductProjectsURL = "https://apex.oraclecorp.com/pls/apex/fusion_projects/implementation/getProductProjects";
var getProductTeamURL = "https://apex.oraclecorp.com/pls/apex/fusion_projects/implementation/getServiceTeam/";
var contactServiceTeamURL = "https://apex.oraclecorp.com/pls/apex/fusion_projects/implementation/contactServiceTeam";
var allOpenProjectSRURL = "https://apex.oraclecorp.com/pls/apex/fusion_projects/implementation/getOpenSRList/";
var srInformation = "";
var validInternet = "";
var srList = [];
var csiNum = "";
var srOpenDateFormatted = "";
var projId = "";
var srGroup = "";
var milestone_id = "";
var currMilestoneVal = "";
/* Sync SR Var */
var syncSRNumber = "";
var syncSeverity = "";
var syncStatus = "";
var syncSubStatus = "";
var syncSummary = "";
var syncDetail = "";
var syncOwner = "";
var syncProjectId = "";
var syncUpdated = "";
var syncCreated = "";
var syncCreatedBy = "";
var syncGroup = "";
var syncCount = 1;
var varSyncStatus = "";
var newCSINumber = "";
var mosProductName = "";
// When the Firefox Addon is loaded
window.addEventListener("load", populateSRNumber);

function populateSRNumber() {
	document.getElementById("initialize_user").style.display = "none";
	doesConnectionExist(); // Check Internet Connection & VPN
	generateImpPortalURl("");
	/* Hide Unwanted Sections On Page Load */
	startProcessing();
	document.getElementById("projDiv").style.display = "block"; //Project List
	document.getElementById("milestoneDiv").style.display = "none"; //Milestone List
	document.getElementById("hover_bkgr_fricc_srUpdate").style.display = "none"; //Update Modal Dialog
	document.getElementById("hover_bkgr_fricc_srCreate").style.display = "none"; //Create Modal Dialog
	document.getElementById("hover_bkgr_fricc_srClosed").style.display = "none"; //Closed Modal Dialog
	document.getElementById("hover_bkgr_fricc_noProject").style.display = "none"; //No Project Dialog
	document.getElementById("hover_bkgr_fricc_error").style.display = "none"; //Timeout Error
	document.getElementById("hover_bkgr_fricc_noSR").style.display = "none"; //SR Page not opened
	document.getElementById("hover_bkgr_fricc_resetExtension").style.display = "none"; //Reset Exntension
	document.getElementById("hover_bkgr_fricc_loader").style.display = "none"; //Reset Exntension
	document.getElementById("hover_bkgr_fricc_errUsername").style.display = "none"; //Error UserName
	document.getElementById("lblSRClose1").style.display = "none";
	document.getElementById("imptMilestone").style.display = "none"; //Hide Impact Milestone Dropdown
	document.getElementById("hover_bkgr_fricc_conServiceTeam").style.display = "none";
	document.getElementById("hover_bkgr_fricc_syncSRComplete").style.display = "none";
	document.getElementById("hover_bkgr_fricc_requiredFields").style.display = "none";
	document.getElementById("hover_bkgr_fricc_networkError").style.display = "none";
	document.getElementById("hover_bkgr_fricc_enableNotifications").style.display = "none";
	document.getElementById("hover_bkgr_fricc_disableNotifications").style.display = "none";
	//New Version Additions for subtabs
	document.getElementById("srSectionDiv").style.display = "block";
	document.getElementById("implTeamDiv").style.display = "none";
	//Make Buttons Opacity
	document.getElementById("btnShowImplTeam").style.opacity = "0.4";
	document.getElementById("btnSyncTeam").style.opacity = "0.4";
	chrome.tabs.query({
		'active': true,
		'lastFocusedWindow': true
	}, function (tabs) {
		var currentTabUrl = tabs[0].url;
		var url = new URL(currentTabUrl);
		var domain = url.hostname;
		var strM = tabs[0].title;
		if (domain === ("support.us.oracle.com") && ((url.toString().indexOf("https://support.us.oracle.com/oip/faces/secure/srm/srview/SRTechnical.jspx?action=createQueryTab&srNumber=") > -1) || (url.toString().indexOf("https://support.us.oracle.com/oip/faces/secure/srm/srview/SRTechnical.jspx?srNumber=") > -1))) { //Execute the rest of the plugin code only when user is MOS site
			srNumber = strM.substring(3, 16);
			var inputBoxSRNum = document.getElementById("element_1"); // Set the SR Number Parameter to the SR Input Textbox on form.
			inputBoxSRNum.value = srNumber;
			document.getElementById("implTeamSR").value = srNumber;
			if (inputBoxSRNum.value === "echnical") {
				document.getElementById("element_1").value = "SR#";
				document.getElementById("outer_div").style.display = "block";
				document.getElementById("initialize_user").style.display = "none";
				document.getElementById("error_content").style.display = "none";
				document.getElementById("hover_bkgr_fricc_noSR").style.display = "block";
				return false;
			}
			verifyLocalMemory();
			var em = localStorage.getItem("ssoEm");
			if (srNumber !== "" && em !== null) {
				startProcessing();
				getSRUpdateFromImplPortal();
				srCSIFromMOS();
			} else {
				initializeFirstLoad();
			}
		} else { //Error Handling
			document.getElementById("outer_div").style.display = "none";
			document.getElementById("initialize_user").style.display = "none";
			document.getElementById("error_content").style.display = "block"; //Display Error Message
		}
	});
}
//Code To Handle SR Status
document.addEventListener("DOMContentLoaded", function (event) {
	var a = document.getElementById('srStatusSelect');
	a.addEventListener('change', function () {
		if (this.value == "Closed") { //Closed
			status_open = "N";
			status_new = "N";
			document.getElementById("saveForm").value = "Set Status To Close In Project";
			document.getElementById("lblSRUpd1").style.display = "none";
			document.getElementById("lblSRClose1").style.display = "block";
			status_open = "N";
		}
		if (this.value == "Open") { //Open
			document.getElementById("saveForm").value = "Add Update To Project";
			document.getElementById("projDiv").style.display = "block";
			document.getElementById("lblSRClose1").style.display = "none";
			document.getElementById("lblSRUpd1").style.display = "block";
			status_open = "Y";
			status_new = "N";
		}
		if (this.value == "New") {
			newSRFlow();
		}
	}, false);
});
//Submit Button
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("saveForm").addEventListener("click", function (event) {
		//Check Required Fields
		var allRequiredFields = true;
		if (document.getElementById("projName").selectedIndex == "0") {
			document.getElementById("projName").required = true;
			allRequiredFields = false;
		}
		if (document.getElementById("summaryTxt").value == "") {
			document.getElementById("summaryTxt").required = true;
			allRequiredFields = false;
		}
		if (document.getElementById("element_2").value == "") {
			document.getElementById("element_2").required = true;
			allRequiredFields = false;
		}
		if (allRequiredFields == false) {
			throwErrorRequiredFields();
			return false;
		}
		startProcessing();
		if (document.getElementById("element_2").value !== "") {
			if (status_new == "Y" && proj_available == "N") {
				window.alert("Project Name Is Required");
				document.getElementById("loader").style.display = "none";
				document.getElementById("outer_div").style.display = "block";
			}
			//If SR is OPEN -- Update SR In Portal
			if (status_open == "Y" && status_new == "N" && proj_available == "Y") {
				updateOpenSRInPortal();
			}
			//If SR is Closed
			if (status_open == "N" && status_new == "N") {
				closeOpenSRInPortal();
			}
			//If SR is a NEW SR
			if (status_open == "N" && status_new == "Y" && proj_available == "Y") {
				createNewSRInPortal();
			}
		} //If end
		else {
			generateErrorMessage("Please provide a SR update before clicking Submit")
		}
	}, false);
});

function throwErrorRequiredFields() {
	document.getElementById("hover_bkgr_fricc_requiredFields").style.display = "block";
}

function processingComplete() {
	document.getElementById("hover_bkgr_fricc_loader").style.display = "none";
	document.getElementById("preLoader").style.display = "none";
}

function startProcessing() {
	document.getElementById("hover_bkgr_fricc_loader").style.display = "block";
	document.getElementById("preLoader").style.display = "none";
}

function newSRFlow() {
	document.getElementById("projName").required = true;
	getSRDetailsFromMOS();
	document.getElementById("srStatusSelect").value = "New";
	document.getElementById("saveForm").value = "Add SR To Project";
	document.getElementById("projDiv").style.display = "block";
	document.getElementById("lblSRClose1").style.display = "none";
	document.getElementById("lblSRUpd1").style.display = "block";
	document.getElementById("initialize_user").style.display = "none";
	status_open = "N";
	status_new = "Y";
	document.getElementById("severity").disabled = true;
}

function replaceHTMLSpecialChars(mystring) {
	return brToNewLine(mystring).replace(/<{1}[^<>]{1,}>{1}/g, "");
}

function brToNewLine(str) {
	return str.replace(/<br ?\/?>/g, "\n");
}

function convertMOSSpecCharacters(mystring) {
	return mystring.replace(/&amp;/g, "&").replace(/&quot;/g, '\\"');
}
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnOKServerCreate").addEventListener("click", function (event) {
		document.getElementById("hover_bkgr_fricc_srCreate").style.display = "none";
		window.close(); //Close the popup
	}, false);
});
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnOKNetworkError").addEventListener("click", function (event) {
		document.getElementById("hover_bkgr_fricc_networkError").style.display = "none";
		window.close(); //Close the popup
	}, false);
});

document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnOKRequiredFields").addEventListener("click", function (event) {
		document.getElementById("hover_bkgr_fricc_requiredFields").style.display = "none";
	}, false);
});
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnOKconServiceTeam").addEventListener("click", function (event) {
		document.getElementById("hover_bkgr_fricc_conServiceTeam").style.display = "none";
		window.close(); //Close the popup
	}, false);
});
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnOKServerUpdate").addEventListener("click", function (event) {
		document.getElementById("hover_bkgr_fricc_srUpdate").style.display = "none";
		window.close(); //Close the popup
	}, false);
});
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnOKServerClosed").addEventListener("click", function (event) {
		document.getElementById("hover_bkgr_fricc_srClosed").style.display = "none";
		window.close(); //Close the popup
	}, false);
});
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnOKsyncSRComplete").addEventListener("click", function (event) {
		document.getElementById("hover_bkgr_fricc_syncSRComplete").style.display = "none";
		window.close(); //Close the popup
	}, false);
});
// No Milestone
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnOKNoMilestone").addEventListener("click", function (event) {
		document.getElementById("hover_bkgr_fricc_noMilestone").style.display = "none"; //Hide the Popup Window
		document.getElementById("selMilestone").focus();
	}, false);
});
// No Project
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnOKNoProject").addEventListener("click", function (event) {
		document.getElementById("hover_bkgr_fricc_noProject").style.display = "none"; //Hide the Popup Window
		window.close(); //Close the popup
	}, false);
});
//Invalid Username
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnOKErrUsername").addEventListener("click", function (event) {
		document.getElementById("hover_bkgr_fricc_errUsername").style.display = "none";
	}, false);
});
//No SR
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnOKNoSR").addEventListener("click", function (event) {
		document.getElementById("hover_bkgr_fricc_noSR").style.display = "none"; //Hide the Popup Window
		window.close(); //Close the popup
	}, false);
});
//Milestone new
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("actItem").addEventListener("change", function (event) {
		var a = document.getElementById("actItem").value;
		if (a == "Y") {
			fetchMilestones();
		} else {
			a.checked = false; // Uncheck the Milestone
			document.getElementById('actItem').value = "N";
			document.getElementById("milestoneDiv").style.display = "none";
			document.getElementById("selMilestone").options.length = 0;
			undoSRCritical();
		}
	}, false);
});
//Show Impacts Milestone Section
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("projName").addEventListener("change", function (event) {
		if (document.getElementById("projName").selectedIndex > "0") {
			document.getElementById("projName").required = false;
		}
		document.getElementById("actItem").value = "N";
		document.getElementById("imptMilestone").style.display = "block";
		document.getElementById("milestoneDiv").style.display = "none";
		projId = document.getElementById("projName").value;
		undoSRCritical();
		document.getElementById("actItem").value = "N";
		/*Code to empty out milestone drop down when the project changes*/
		var select = document.getElementById("selMilestone");
		var length = select.options.length;
		for (i = 0; i < length; i++) {
			select.options[i] = null;
		}
	}, false);
});
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("selMilestone").addEventListener("change", function (event) {
		if (document.getElementById("selMilestone").selectedIndex > "0") {
			document.getElementById("selMilestone").required = false;
		}
	}, false);
});
//Format the date
function formatDates(dateStr) {
	var date = dateStr.split("-");
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	for (var j = 0; j < months.length; j++) {
		if (date[1] == months[j]) {
			date[1] = months.indexOf(months[j]) + 1;
		}
	}
	if (date[1] < 10) {
		date[1] = '0' + date[1];
	}
	return date[1] + '-' + date[0] + '-' + date[2];
}

function replaceSpecialChars(strEnc) {
	return strEnc.replace(/–/g, "");
}
//Decode the HTML characters
function decodeHTML(str) {
	var map = {
		amp: '&',
		lt: '<',
		le: '≤',
		gt: '>',
		ge: '≥',
		quot: '"',
		'#039': "'"
	};
	return str.replace(/&([^;]+);/g, (m, c) => map[c] || '')
}
//Code to Generate Dynamic URL for Impl Portal
function generateImpPortalURl(projId) {
	var link = "https://apex.oraclecorp.com/pls/apex/f?p=30339:200:::::P200_ID:" + projId;
	var x = document.createElement("A");
	var t = document.createTextNode("Click Here -> Implementation Project");
	x.setAttribute("href", link);
	x.setAttribute("target", "_blank");
	x.appendChild(t);
	var node = document.getElementById("portalLink");
	while (node.firstChild)
		node.removeChild(node.firstChild);
	node.appendChild(document.body.appendChild(x));
}
//Display Confirmation Box When User Clicks Reset Extension
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnResetExtn").addEventListener("click", function (event) {
		document.getElementById("hover_bkgr_fricc_resetExtension").style.display = "block";
		dynamicUsername();
		dynamicVersionName();

		chrome.runtime.sendMessage({
			greeting: "hello"
		}, function (response) {
			if (response.farewell == "Disabled") {
				document.getElementById("btnEnableNotification").style.display = "block";
				document.getElementById("btnDisableNotification").style.display = "none";
			}
			if (response.farewell == "Enabled") {
				document.getElementById("btnEnableNotification").style.display = "none";
				document.getElementById("btnDisableNotification").style.display = "block";
			}
			if (response.farewell == "undefined") {
				document.getElementById("btnEnableNotification").style.display = "none";
				document.getElementById("btnDisableNotification").style.display = "block";
			}
		});
	}, false);
});
//Reset button event from Confirmation Box
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnYesReset").addEventListener("click", function (event) {
		document.getElementById("hover_bkgr_fricc_resetExtension").style.display = "none";
		localStorage.clear();
		window.close();
	}, false);
});
//Disable Notifications
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnDisableNotification").addEventListener("click", function (event) {
		console.log('Disable Notifications');
		disableNotificationsPreference();
	}, false);
});
//Enable Notifications
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnEnableNotification").addEventListener("click", function (event) {
		console.log('Enable Notifications');
		enableNotificationsPreference();
	}, false);
});
//OK Notifications - Disabled
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnOKErrDisabledNotification").addEventListener("click", function (event) {
		document.getElementById("hover_bkgr_fricc_disableNotifications").style.display = "none";
		window.close();
	}, false);
});
//OK Notifications - Enabled
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnOKErrEnabledNotification").addEventListener("click", function (event) {
		document.getElementById("hover_bkgr_fricc_enableNotifications").style.display = "none";
		window.close();
	}, false);
});
//Settings Popup Cancelled
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("popupCloseResetButton").addEventListener("click", function (event) {
		document.getElementById("hover_bkgr_fricc_resetExtension").style.display = "none";
		window.close();
	}, false);
});
/*
//Cancel Button event from confirmation box
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnCancelReset").addEventListener("click", function (event) {
		document.getElementById("hover_bkgr_fricc_resetExtension").style.display = "none";
	}, false);
});
*/
function textAreaAdjust(o) {
	o.style.height = "1px";
	o.style.height = (25 + o.scrollHeight) + "px";
}
//Auto Resize the TextArea
;
(function () {
	function domReady(f) {
		/in/.test(document.readyState) ? setTimeout(domReady, 16, f) : f()
	}

	function resize(event) {
		event.target.style.height = 'auto';
		event.target.style.height = event.target.scrollHeight + 'px';
	}
	/* 0-timeout to get the already changed text */
	function delayedResize(event) {
		window.setTimeout(resize, 0, event);
	}
	domReady(function () {
		var textareas = document.querySelectorAll('textarea[auto-resize]')
		for (var i = 0, l = textareas.length; i < l; ++i) {
			var el = textareas.item(i)
			el.addEventListener('change', resize, false);
			el.addEventListener('cut', delayedResize, false);
			el.addEventListener('paste', delayedResize, false);
			el.addEventListener('drop', delayedResize, false);
			el.addEventListener('keydown', delayedResize, false);
		}
	})
}());
//Set SR Critical
function setSRCritical() {
	var node = document.getElementById("lblSRNumber");
	while (node.firstChild)
		node.removeChild(node.firstChild);
	node.appendChild(document.createTextNode("CRITICAL SR#"));
	document.getElementById("lblSRNumber").style.color = "#ff0000";
	document.getElementById("lblSRNumber").style.font = "#ff0000";
}
//Undo SR Critical
function undoSRCritical() {
	var node = document.getElementById("lblSRNumber");
	while (node.firstChild)
		node.removeChild(node.firstChild);
	node.appendChild(document.createTextNode("SR#"));
	document.getElementById("lblSRNumber").style.color = "black";
	document.getElementById("lblSRNumber").style.fontFamily = "Segoe UI";
	document.getElementById("lblSRNumber").style.color = "inherit";
}
//Code to Handle Subtab:
//Subtab 1
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnShowSR").addEventListener("click", function (event) {
		document.getElementById("srSectionDiv").style.display = "block";
		document.getElementById("implTeamDiv").style.display = "none";
		document.getElementById("synchSRDiv").style.display = "none";
		document.getElementById("btnShowSR").style.opacity = "1.0";
		document.getElementById("btnShowImplTeam").style.opacity = "0.4";
		document.getElementById("btnSyncTeam").style.opacity = "0.4";
	}, false);
});
//Subtab 2
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnShowImplTeam").addEventListener("click", function (event) {
		document.getElementById("implTeamDiv").style.display = "block";
		document.getElementById("srSectionDiv").style.display = "none";
		document.getElementById("synchSRDiv").style.display = "none";
		removeOptions(document.getElementById("impProjName")); //Clear the Project List
		removeOptions(document.getElementById("implTeam")); //Clear the Team List
		removeOptions(document.getElementById("implManager")); //Clear the Manager List
		document.getElementById("contactReason").value = '0';
		document.getElementById("btnShowSR").style.opacity = "0.4";
		document.getElementById("btnShowImplTeam").style.opacity = "1.0";
		document.getElementById("btnSyncTeam").style.opacity = "0.4";
		srCSIFromMOS();
		/*Code to empty out drop down */
		getProjectDetails('Subtab2');
	}, false);
});
//Subtab 3
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnSyncTeam").addEventListener("click", function (event) {
		document.getElementById("impProjName").selectedIndex = "0";
		document.getElementById("implTeam").selectedIndex = "0";
		document.getElementById("implManager").selectedIndex = "0";
		document.getElementById("implTeamSR").value = srNumber; // Set the SR Number Parameter to the SR Input Textbox on form.
		removeOptions(document.getElementById("syncProdName")); //Clear the product List
		//removeOptions(document.getElementById("syncMOSProdName"));//Clear the product List
		//removeOptions(document.getElementById("syncProjName"));//Clear the product List
		document.getElementById("synchSRDiv").style.display = "block";
		document.getElementById("srSectionDiv").style.display = "none";
		document.getElementById("implTeamDiv").style.display = "none";
		document.getElementById("btnShowSR").style.opacity = "0.4";
		document.getElementById("btnShowImplTeam").style.opacity = "0.4";
		document.getElementById("btnSyncTeam").style.opacity = "1.0";
		srCSIFromMOS();
		getProductListForCustomer(newCSINumber);
		//getProductNames();
	}, false);
});
//When product is selected in subtab 3
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("syncProdName").addEventListener("change", function (event) {
		/*Code to empty out milestone drop down when the project changes*/
		var select = document.getElementById("syncProjName");
		var length = select.options.length;
		for (i = 0; i < length; i++) {
			select.options[i] = null;
		}
		getProductListForCustomer(newCSINumber);
		var sel = document.getElementById("syncProdName");
		var productName1 = sel.options[sel.selectedIndex].text;
		syncProjectDetails(newCSINumber);
	}, false);
});
//Synchronize Button -- OPEN
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("syncSR").addEventListener("click", function (event) {
		srAllDetailsFromMOS("Open"); //First Get all data from MOS
		document.getElementById("hover_bkgr_fricc_syncSRComplete").style.display = "block";
	}, false);
});
//Synchronize Button -- CLOSED
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("syncSRClosed").addEventListener("click", function (event) {
		//srAllDetailsFromMOS("Closed"); //First Get all data from MOS
		getOpenSRForProject();
		document.getElementById("hover_bkgr_fricc_syncSRComplete").style.display = "block";
	}, false);
});
//Get Service Team
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("impProjName").addEventListener("change", function (event) {
		if (document.getElementById("impProjName").value != '0') {
			document.getElementById("impProjName").required = false;
			getServiceTeam();
		} else {
			removeOptions(document.getElementById("implTeam"));
			//Clear the Team List
			removeOptions(document.getElementById("implManager")); //Clear the Team List
		}
	}, false);
});
//Contact Service Team
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("contactTeam").addEventListener("click", function (event) {
		//Check Required Fields
		var allFieldsReq = true;
		if (document.getElementById("impProjName").value == "0") {
			document.getElementById("impProjName").required = true;
			allFieldsReq = false;
		}
		if (document.getElementById("implManager").value == "0") {
			document.getElementById("implManager").required = true;
			allFieldsReq = false;
		}
		if (document.getElementById("implTeam").value == "0") {
			document.getElementById("implTeam").required = true;
			allFieldsReq = false;
		}
		if (document.getElementById("contactReason").value == "0") {
			document.getElementById("contactReason").required = true;
			allFieldsReq = false;
		}
		if (document.getElementById("impProjName").value != "0" &&
			document.getElementById("implManager").value != "0" &&
			document.getElementById("implTeam").value != "0" &&
			document.getElementById("contactReason").value != "0") {
			contactServiceTeam();
		} else {
			throwErrorRequiredFields();
			return false;
		}
	}, false);
});
//Contact Team Fields Required - Unrequired
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("implManager").addEventListener("change", function (event) {
		if (document.getElementById("implManager").value != '0') {
			document.getElementById("implManager").required = false;
		}
	}, false);
});
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("implTeam").addEventListener("change", function (event) {
		if (document.getElementById("implTeam").value != '0') {
			document.getElementById("implTeam").required = false;
		}
	}, false);
});
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("contactReason").addEventListener("change", function (event) {
		if (document.getElementById("contactReason").value != '0') {
			document.getElementById("contactReason").required = false;
		}
	}, false);
});
//Display Username in Reset Settings Page
function dynamicUsername() {
	var x = document.createElement("P");
	var t = document.createTextNode('Current User: ' + localStorage.getItem("ssoEm").toUpperCase());
	x.appendChild(t);
	var node = document.getElementById("userNameHolder");
	while (node.firstChild) node.removeChild(node.firstChild);
	node.appendChild(document.body.appendChild(x));
}
//Display Version in Reset Settings Page
function dynamicVersionName() {
	var manifest = chrome.runtime.getManifest();
	var x = document.createElement("P");
	var t = document.createTextNode('Version: ' + manifest.version);
	x.appendChild(t);
	var node = document.getElementById("versionHolder");
	while (node.firstChild) node.removeChild(node.firstChild);
	node.appendChild(document.body.appendChild(x));
}
//Convert to Date DD-MON-YYYY
function convertDateToGB(dateFomat) {
	return dateFomat.split(' ', 1)[0];
}
//Remove Select Box
function removeOptions(selectbox) {
	var i;
	for (i = selectbox.options.length - 1; i >= 1; i--) {
		selectbox.remove(i);
	}
}
//For allowing users to click enter after entering email
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("email_add").addEventListener("keyup", function (event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			document.getElementById("btnUpdateEmail").click();
		}
	}, false);
});