console.log('getProjectDetails');
//Function to fetch Project Name
function getProjectDetails(subTabName) {
    startProcessing();
    var csiTab2 = document.getElementById("implTeamCSI").value;
    //var csiNumber = csiNum;
    var url = getProject + newCSINumber;
    const xhr = new XMLHttpRequest();
    xhr.timeout = 5000;
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var responseText = JSON.parse(xhr.responseText);
                var countOfProjects = Object.keys(responseText.items).length;
                if (projName !== "") {
                    document.getElementById("projDiv").style.display = "block";
                    if (countOfProjects > 0) {
                        var catOptions = "";
                        for (var i = 0; i < countOfProjects; i++) {
                            var option = document.createElement("option");
                            option.text = responseText.items[i].projectname;
                            option.value = responseText.items[i].projectid;
                            //option.selected = "selected";
                            if (subTabName == "Subtab1") {
                                var select = document.getElementById("projName");
                            }
                            if (subTabName == "Subtab2") {
                                var select = document.getElementById("impProjName");
                            }
                            select.appendChild(option);
                        }
                    } else {
                        proj_available = "N";
                        //window.alert("No Projects Available, Please Register the customer in Implementation Portal");
                        processingComplete();
                        document.getElementById("hover_bkgr_fricc_noProject").style.display = "block"; //Show Confirmation
                    }
                }
            } else {
                //window.alert("Error in fetching Projects");
                document.getElementById("hover_bkgr_fricc_error").style.display = "block";
            }
        }
    };
    xhr.ontimeout = function () {
        document.getElementById("hover_bkgr_fricc_error").style.display = "block";
    };
    xhr.open("GET", url, true);
    xhr.send();
}