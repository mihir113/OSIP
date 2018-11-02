console.log('setMilestones');
//Function to Set Milestones
function setMilestones(m_id) {
 startProcessing();
 var url = getMilestones+ projId;//See if Proj_id can be reused
 const xhr = new XMLHttpRequest();
 xhr.timeout = 5000;
 xhr.onreadystatechange = function(e) {
  if (xhr.readyState === 4) {
   if (xhr.status === 200) {
    var responseText = JSON.parse(xhr.responseText);
    var countOfMilestones = Object.keys(responseText.items).length;
    document.getElementById("milestoneDiv").style.display = "block";
    if (countOfMilestones > 0){
      var catOptions = "";
      for (var i = 0; i < countOfMilestones; i++) {
       var option = document.createElement("option");
       option.text = responseText.items[i].milestone_name;
       option.value = responseText.items[i].milestone_id;
        if(option.value === m_id){
          option.selected = "selected";
        }
       var select = document.getElementById("selMilestone");
       select.appendChild(option);
      }
       document.getElementById("milestoneDiv").style.display = "block";
       document.getElementById("selMilestone").focus();
	   document.getElementById('actItem').value = "Y";
       processingComplete();
    }
    else {
       processingComplete();
       document.getElementById("hover_bkgr_fricc_noMilestone").style.display = "block"; //Show No Milestone Dialog Box
       document.getElementById('actItem').value = "N";// Uncheck the Milestone checkbox
       document.getElementById("milestoneDiv").style.display = "none";
    }
   }
    else {
    document.getElementById("hover_bkgr_fricc_error").style.display = "block";
   }
  }
 };
 xhr.ontimeout = function() {
  document.getElementById("hover_bkgr_fricc_error").style.display = "block";
 };
 xhr.open("GET", url, true);
 xhr.send();
}
