/*MOS Details*/
function srCSIFromMOS() {
    var emaiStored = localStorage.getItem("ssoEm");
    if (emaiStored !== null) {
        startProcessing();
        var xhr = new XMLHttpRequest();
        var file = "https://support.us.oracle.com/oip/faces/ListRequest?query=SRNumber%3D%27" + srNumber + "%27&type=SR&sort=%2BadjustedPriorityScore&listBCId=282-577&subject=" + emaiStored + "&mode=All&recCountType=NONE&start=0&count=99%22+";
        xhr.timeout = 5000;
        xhr.open('GET', file, true);
        xhr.send();
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
                                csiNum1 = responseText.items[i].CSI;
                                mosProductName = responseText.items[i].product;
                                document.getElementById("csiInput").value = csiNum1;
                                document.getElementById("implTeamCSI").value = csiNum1;
                                newCSINumber = csiNum1;
                                processingComplete();
                            }
                        }
                    }
                } else {
                    document.getElementById("hover_bkgr_fricc_error").style.display = "block";
                }
            }
        }
    }
}