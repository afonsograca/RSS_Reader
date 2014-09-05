var XHRToolKit = function (pURL, pSendResultFunc) {
    var URL = pURL;
    var sendResultFunc = pSendResultFunc;
    var XHRObj = null;
    
    this.sendXHRRequest = function() {
        if (XHRObj)
            XHRObj.destroy();
        XHRObj = new XMLHttpRequest();
        
        if (XHRObj) {
            XHRObj.onreadystatechange = function () {
                if (XHRObj.readyState == 4) {
                    receiveXHRResponse();
                }
            };
            XHRObj.open("GET", URL, true);
            XHRObj.send(null);
        }
        else 	{
            alert("XHR Object is NULL");
        }
    }

    var receiveXHRResponse = function(){
        if (XHRObj.status == 200) {
            sendResultFunc(true);
        }
        else {
            alert("Bad XHR response.");
            sendResultFunc(false);
        }
    }
    
    this.getResponseXML = function () {
        return XHRObj.responseXML;
    }
	
	this.getXHRObj = function () {
		return XHRObj;
	}
    
    this.abortXHRObj = function () {
        if (XHRObj) {
            XHRObj.abort();
        }
    }
}