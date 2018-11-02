/*Get Product Details From Portal*/
function getProductListForCustomer() {
	startProcessing();
	var url = "https://support.us.oracle.com/oip/faces/SRPickLovRequest?action=getModel&tzOffset=360&t=1541105427734&source=LICENSED_PRODUCT&queryObj={%22productLine%22:%22Oracle%20Cloud%22,%22csi%22:%22" + newCSINumber + "%22,%22csiId%22:%22%22,%22HWFlg%22:%22false%22,%22serialNumId%22:%22%22,%22serialNumProdClass%22:%22%22,%22serialNumStatus%22:%22%22,%22SNCSICStatus%22:%22%22}&start=0&count=100";
	const xhr = new XMLHttpRequest();
	xhr.timeout = 5000;
	xhr.onreadystatechange = function (e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var responseText = JSON.parse(xhr.responseText);
				var countOfProducts = Object.keys(responseText.items).length;
				if (countOfProducts > 0) {
					var catOptions = "";
					for (var i = 0; i < countOfProducts; i++) {
						var option = document.createElement("option");
						option.text = responseText.items[i].productDescription;
						option.value = responseText.items[i].productDescription;
						var select = document.getElementById("syncProdName");
						select.appendChild(option);
					}
				} else {
					proj_available = "N";
					//window.alert("No Projects Available, Please Register the customer in Implementation Portal");
					processingComplete();
					document.getElementById("hover_bkgr_fricc_noProject").style.display = "block"; //Show Confirmation
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