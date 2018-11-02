/*MOS Details*/
var retryCount = 0;

function getSRDetailsFromMOS() {
    console.log('getSRDetailsFromMOS');
    startProcessing();
    var emaiStored = localStorage.getItem("ssoEm");
    if (emaiStored !== null) {
        var xhr = new XMLHttpRequest();
        var file = "https://support.us.oracle.com/oip/faces/ListRequest?query=SRNumber%3D%27" + srNumber + "%27&type=SR&sort=%2BadjustedPriorityScore&listBCId=282-577&subject=" + emaiStored + "&mode=All&recCountType=NONE&start=0&count=99%22+";
        xhr.timeout = 5000;
        xhr.open('GET', file, true);
        xhr.send();
        retryCount++;
        console.log(retryCount);
        xhr.addEventListener("readystatechange", processRequest, false);

        function processRequest(e) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (xhr.responseText == "undefined") {
                        alert("Undefined Response From MOS, Please Try Again");
                    } else {
                        var responseText = JSON.parse(xhr.responseText);
                        var countOfProjects = Object.keys(responseText.items).length;
                        if (countOfProjects > 0) {
                            for (var i = 0; i < countOfProjects; i++) {
                                var encode = encodeURIComponent(responseText.items[i].description);
                                var decode = decodeURIComponent(encode);
                                document.getElementById("summaryTxt").value = decodeHTML(responseText.items[i].summary);
                                document.getElementById("srOwner").value = responseText.items[i].owner;
                                var srOpenDate = responseText.items[i].SRSubmitDate;
                                srOpenDateFormatted = formatDates(srOpenDate.substr(0, srOpenDate.indexOf(' ')));
                                srGroup = decodeHTML(responseText.items[i].ownerGroup);
                                document.getElementById("srStatusSelect").value = "New";
                                document.getElementById("element_2").value = decodeHTML(responseText.items[i].description);;
                                csiNum = responseText.items[i].CSI;
                                var srSev = responseText.items[i].severity;
                                if (srSev === "1-Critical") {
                                    srSev = "1";
                                }
                                if (srSev === "2-Significant") {
                                    srSev = "2";
                                }
                                if (srSev === "3-Standard") {
                                    srSev = "3";
                                }
                                if (srSev === "4-Minimal") {
                                    srSev = "4";
                                }
                                document.getElementById("severity").value = srSev;
                                document.getElementById("srStatusSelect").disabled = true;
                                srCSIFromMOS();
                                getProjectDetails('Subtab1'); // Get Project Names from Implementation Portal
                                processingComplete();
                            }
                        }
                    }
                } else {
                    if (retryCount <= 2) {
                        retryLogic();
                    }
                    processingComplete();
                    document.getElementById("hover_bkgr_fricc_error").style.display = "block";
                }
            }
        }
    }
}

function retryLogic() {
    getSRDetailsFromMOS();
}