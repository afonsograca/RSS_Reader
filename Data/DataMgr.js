var DataMgr = {
    arrChannelList : null,			// Channel list
    arrChannelManagers : null,		// Channel managers
    arrChannelData : null,			// All Channel data array
    noticeCallback : null, 
}

DataMgr.create = function () {

	DataMgr.loadChannels("channels.rss");

    this.arrChannelManagers = new Array();
    this.arrChannelData = new Array();
    
    for (var i=0; i < this.arrChannelList.length; i++) {
        this.arrChannelManagers[this.arrChannelManagers.length] = new ChannelMgr({
            ID : i,
            title : this.arrChannelList[i].title,
            URL : this.arrChannelList[i].URL,
            callback : function (ChannelID) {
                DataMgr.receiveHandler(ChannelID);
            }			
        });
    }
}

DataMgr.loadChannels = function(ChannelsFile){
	this.arrChannelList = new Array();
	
	var fileSystemObj = new FileSystem();
    var jsFileObj = fileSystemObj.openCommonFile(curWidget.id+"/"+ChannelsFile,"r");
	if(jsFileObj){
	var strLine = "";
	var i=0;
	while(strLine=jsFileObj.readLine()){
		var strLineArray = strLine.split("%")
		this.arrChannelList[i++] = new ChannelStruct(strLineArray[0], strLineArray[1]);
	}
	fileSystemObj.closeCommonFile(jsFileObj);
	}else{
		alert("Error: No RSS file to load!");
	}
}

DataMgr.sendRequest = function (ChannelID, callback) {
    this.arrChannelManagers[ChannelID].sendXHRRequest();
    this.noticeCallback = callback;
}

DataMgr.receiveHandler = function (ChannelID) {
    // Save data recieved from ChannelMgr and execute callback function.
    if (this.arrChannelData[ChannelID] == null) {
        this.arrChannelData[ChannelID] = [];
    }
    this.arrChannelData[ChannelID].title = this.arrChannelManagers[ChannelID].getTitle();
    this.arrChannelData[ChannelID].bReady = this.arrChannelManagers[ChannelID].isReady();
    this.arrChannelData[ChannelID].arrArticles = this.arrChannelManagers[ChannelID].getArticles();
    
    if (this.noticeCallback)
        this.noticeCallback(ChannelID);
}

DataMgr.getChannelData = function() {
    return this.arrChannelList;
}
DataMgr.getFeedData = function(ChannelID) {
    return this.arrChannelData[ChannelID];
}

DataMgr.getChannelListData = function (articleIdx) {
    var listDataObj = {};
    var dataList = {};
	
    var from = this.getFirstArticleIdx(Channel.TITLE_MAX_NUM, articleIdx);
    var to = parseInt(from) + parseInt(Channel.TITLE_MAX_NUM);
    listDataObj = this.arrChannelList.slice(from, to);

    return listDataObj;
}

DataMgr.getFeedListData = function (ChannelID, articleIdx) {
    var listDataObj = {};
    
    listDataObj.ChannelTitle = this.arrChannelData[ChannelID].title;
    listDataObj.bReady = this.arrChannelData[ChannelID].bReady;
    if (listDataObj.bReady) {
        var arrArticles = this.arrChannelData[ChannelID].arrArticles;
        var from = this.getFirstArticleIdx(Channel.TITLE_MAX_NUM, articleIdx);
        var to = parseInt(from) + parseInt(Channel.TITLE_MAX_NUM);
        listDataObj.arrArticles = arrArticles.slice(from, to);
    }
    else {
        listDataObj.arrArticles = [];
    }
    return listDataObj;
}

DataMgr.getPageNum = function (MAX_LIST_NUM, articleIdx) {
    var retValue = Math.floor(articleIdx / MAX_LIST_NUM);
    return retValue;
}

DataMgr.getFirstArticleIdx = function (MAX_LIST_NUM, articleIdx) {
    var retValue = MAX_LIST_NUM * this.getPageNum(MAX_LIST_NUM, articleIdx);
    return retValue;
}

DataMgr.getContentsData = function (ChannelID, articleIdx) {
    var contentsDataObj = {};
    contentsDataObj.title = this.arrChannelData[ChannelID].title;
    contentsDataObj.article = this.arrChannelData[ChannelID].arrArticles[articleIdx];
    return contentsDataObj;
}

DataMgr.getChannelList = function () {
    var retValue = this.arrChannelList;
    return retValue;
}



















