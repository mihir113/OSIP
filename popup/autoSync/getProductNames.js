//Function to fetch Project Name from Apex
function getProductNames() {
    startProcessing();
    var projectId = document.getElementById("syncProdName").value;
    var url = "https://apex.oraclecorp.com/pls/apex/fusion_projects/implementation/getProductProjects/" + document.getElementById("csi").value + "/" + document.getElementById("productDescription").value;
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
                            var select = document.getElementById("syncProjName");
                            select.appendChild(option);
                        }
                    } else {
                        proj_available = "N";
                        processingComplete();
                        document.getElementById("hover_bkgr_fricc_noProject").style.display = "block"; //Show Confirmation
                    }
                }
            } else {
                window.alert("Error in fetching Projects");
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