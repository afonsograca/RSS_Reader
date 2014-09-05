var WrapInTable = function (pStrTitle, pStrDate, pStyle) {
	var retValue = "";

	retValue += "<table class=\"listitem\" >";
	retValue += "<tr>";
	if (pStyle == "marker") {
		retValue += "<td class=\"news-marker\"></td>";
	}
	else if(pStyle == "number" ){
		retValue += "<td class=\"news-number\"></td>";
	}
	retValue += "<td class=\"news-title\" >";
	retValue += "<h2>";
	if(pStrTitle.length > 60){
		retValue += pStrTitle.substr(0,60);
	}
	else{
		retValue += pStrTitle;	
	}
	retValue += "</h2>";
	if(pStyle == "marker"){
		retValue += "<h3>";
		retValue += pStrDate;
		retValue += "</h3>";
	}
	retValue += "</td>";
	retValue += "</tr>";
	retValue += "</table>";
	return retValue;
}
