var ChannelMgr = function (paramObject) {
    var ID = paramObject.ID;						// Channel ID
    var title = paramObject.title;					// Channel title
    var URL = paramObject.URL;						// cateogry URL
    var noticeCallback = paramObject.callback;		// callback
    
    var XHRTool = new XHRToolKit(URL, function (result) {
        onReceiveData(result);
    });
    
    var arrArticles = null;				// Article structure array
    var bDataReady = false;				// Data ready flag
    
    // initialize
    var initData = function () {
        arrArticles = new Array();
        bDataReady = false;
    }
    
	// parsing data, save to structure, and execute callback function
    var onReceiveData = function (bSuccess) {
        if (bSuccess) {
            var responseXML = XHRTool.getResponseXML();
            var responseDoc = responseXML.documentElement;
            
            if (responseDoc) {
                var itemElements = responseDoc.getElementsByTagName("item");
                if (itemElements && itemElements.length > 0) { // more than 1 article
                    for (var i = 0; i < itemElements.length; i++) {
                        if (isValidNormalArticle(itemElements[i])) {
                            var tTitle = getElementData(itemElements[i], "title");
                            var tDescription = getElementData(itemElements[i], "description");
							var tDate = getElementData(itemElements[i], "pubDate");
                            var tUser = getElementData(itemElements[i], "author");
                            arrArticles[arrArticles.length] = new FeedStruct(tTitle, tDescription, tDate, tUser);
                        }
                    }
                    if (arrArticles.length > 0) { 
                        // if valid article exist, set the flag true
                        bDataReady = true;
                    }
                }
            }
        }
        noticeCallback(ID);
    }
	// is valid article format
    var isValidNormalArticle = function (itemElement) {
        if (itemElement.getElementsByTagName("title")[0] && itemElement.getElementsByTagName("description")[0]) {
            return true;
        }
        return false;
    }
	var getElementData = function (itemElement, element) {
		if(itemElement.getElementsByTagName(element)[0] !== undefined )
			return itemElement.getElementsByTagName(element)[0].firstChild.data;
		else
			return "";
	}
    // send XHR request
    this.sendXHRRequest = function () {
//        alert("Channel " + ID + " XHR requested.");
        initData();
        XHRTool.sendXHRRequest();
    }
    // get Channel ID
    this.getID = function () {
        return ID;		
    }
    // get Channel title
    this.getTitle = function () {
        return title;		
    }
    // get Channel URL
    this.getURL = function () {
        return URL;		
    }
    // get Channel data
    this.getArticles = function () {
        return arrArticles;		
    }
    // get Channel ready state
    this.isReady = function () {
        return bDataReady;
    }
}
























