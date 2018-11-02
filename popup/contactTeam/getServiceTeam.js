/*Get Service Team From Portal*/
function getServiceTeam() {
    console.log('getServiceTeam');
    startProcessing();
    removeOptions(document.getElementById("implTeam")); //Clear the Team List
    removeOptions(document.getElementById("implManager")); //Clear the Manager List
    var projectId = document.getElementById("impProjName").value;
    var csiNum1 = document.getElementById("implTeamCSI").value;
    var url = getProductTeamURL + projectId;
    const xhr = new XMLHttpRequest();
    xhr.timeout = 5000;
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var responseText = JSON.parse(xhr.responseText);
                var countServiceTeam = Object.keys(responseText.items).length;
                if (projName !== "") {
                    if (countServiceTeam > 0) {
                        var catOptions = "";
                        for (var i = 0; i < countServiceTeam; i++) {
                            if ((responseText.items[i].role == "Manager Contact") || (responseText.items[i].role == "Primary DSM")) {
                                var option = document.createElement("option");
                                option.text = responseText.items[i].name;
                                option.value = responseText.items[i].id;
                                var select = document.getElementById("implManager");
                                select.appendChild(option);
                            } else {
                                var option = document.createElement("option");
                                option.text = responseText.items[i].name + ' - ' + responseText.items[i].role;
                                option.value = responseText.items[i].id;
                                var select = document.getElementById("implTeam");
                                select.appendChild(option);
                            }
                        }
                    } else {
                        proj_available = "N";
                        processingComplete();
                        alert('No Service Team Assigned for this project');
                        //document.getElementById("hover_bkgr_fricc_noProject").style.display = "block";//Show Confirmation
                    }
                }
            } else {
                for (i = 1; i < document.getElementById("implTeam").options.length; i++) {
                    select.options[i] = null;
                }
                window.alert("Error in fetching Service Team");
                document.getElementById("hover_bkgr_fricc_error").style.display = "block";
            }
        }
    };
    xhr.ontimeout = function () {
        document.getElementById("hover_bkgr_fricc_error").style.display = "block";
    };
    xhr.open("GET", url, true);
    xhr.send();
    processingComplete();
}