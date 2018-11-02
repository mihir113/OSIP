/* Error Handling */
function errorToggle() {
	document.getElementById("outer_div").style.display = "none";
	document.getElementById("error_content").style.display = "block";
}
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnOKServerError").addEventListener("click", function( event ) {
		document.getElementById("hover_bkgr_fricc_error").style.display = "none";
		window.close(); //Close the popup
	}, false);
});

function errorServerConnection() {
	document.getElementById("hover_bkgr_fricc_error").style.display = "block";
}
