var NewsController = {
    currentState : 0,		// current UI state (LIST, CONTENTS, PHOTOLIST, PHOTOCONTENTS)
    currentCategoryID : 0,
    currentArticleIdx : 0,
	currentChannelID : 0,
    
    // UI state
    CHANNEL : 1,
	FEED : 2,
    CONTENTS : 3,
    PHOTOLIST : 4,
    PHOTOCONTENTS : 5,
    
    // Process
    LIST_CHANNEL_RIGHT : 101,
	LIST_START_FEEDS : 109,
    LIST_CHANNEL_UP : 102,
    LIST_CHANNEL_DOWN : 103,
    LIST_FIRST_CHANNEL_UP : 104,
    LIST_LAST_CHANNEL_DOWN : 105,
    
	LIST_FEED_LEFT : 200,
    LIST_FEED_RIGHT : 201,
    LIST_START_CONTENTS : 209,
    LIST_FEED_UP : 202,
    LIST_FEED_DOWN : 203,
    LIST_FIRST_FEED_UP : 204,
    LIST_LAST_FEED_DOWN : 205,
	
    CONTENTS_SCROLL_UP : 302,
    CONTENTS_SCROLL_DOWN : 303,
    CONTENTS_RETURN : 304,
}

NewsController.create = function() {
    DataMgr.create();
    KeyHandler.create();
    Channel.create();
	Feed.create();
    Contents.create();
}

NewsController.start = function() {
	for(var i = 0; i < DataMgr.arrChannelList.length ; i++){
		DataMgr.sendRequest(i, function (i) {
		});
	}
	
	KeyHandler.focusToKeyBlocker();
	NewsController.showChannel();
}

NewsController.showChannel = function() {
    this.currentState = this.CHANNEL;			// set current UI state
	this.currentArticleIdx = this.currentChannelID;
    Channel.setDataObj(DataMgr.getChannelListData(this.currentArticleIdx));		// set data object
    Channel.setTitleIdx(this.currentChannelID%Channel.TITLE_MAX_NUM);	// set title index to be highlight
    Channel.adjustScrollBar(this.currentArticleIdx, DataMgr.getChannelData().length);
	KeyHandler.focusToKeyBlocker();
    Channel.show();
}

NewsController.showFeed = function() {
    this.currentState = this.FEED;				// set current UI state
    Feed.setDataObj(DataMgr.getFeedData(this.currentChannelID, this.currentArticleIdx));		// set data object
    Feed.setTitleIdx(this.currentArticleIdx%Feed.TITLE_MAX_NUM);	// set title index to be highlight
    Feed.adjustScrollBar(this.currentArticleIdx, DataMgr.getFeedData(this.currentChannelID).arrArticles.length);
    Feed.show();
}

NewsController.refreshChannel = function() {
    Channel.setDataObj(DataMgr.getChannelData());
    Channel.setTitleIdx(this.currentArticleIdx%Channel.TITLE_MAX_NUM);
    Channel.adjustScrollBar(this.currentArticleIdx, DataMgr.getChannelData().length);
    Channel.refresh();
}

NewsController.refreshFeed = function() {
    Feed.setDataObj(DataMgr.getFeedData(this.currentChannelID, this.currentArticleIdx));
    Feed.setTitleIdx(this.currentArticleIdx%Feed.TITLE_MAX_NUM);
    Feed.adjustScrollBar(this.currentArticleIdx, DataMgr.getFeedData(this.currentChannelID).arrArticles.length);
    Feed.refresh();
}

NewsController.showContents = function() {
    this.currentState = this.UICONTENTS;
 
    Contents.setDataObj(DataMgr.getContentsData(this.currentChannelID, this.currentArticleIdx));

	setTimeout("Contents.adjustScrollBar()", 0);
    Contents.show();
}

NewsController.changeChannel = function() {
    Channel.blurTitle(Channel.getTitleIdx());
    Channel.adjustScrollBar(this.currentArticleIdx, DataMgr.getCategoryData(this.currentCategoryID).arrArticles.length);
    this.refreshChannel();
}

NewsController.changeFeed = function() {
    Feed.blurTitle(Feed.getTitleIdx());
    Feed.adjustScrollBar(this.currentArticleIdx, DataMgr.getFeedData(this.currentChannelID).arrArticles.length);
    this.refreshFeed();
}

NewsController.request = function (REQUEST, option) {
    switch (REQUEST) {
        
        // Channel
        case this.LIST_START_FEEDS:
			this.currentChannelID =  this.currentArticleIdx;
			this.currentArticleIdx = 0;
            Channel.hide();
            this.showFeed();				
            break;
        case this.LIST_CHANNEL_UP:
            var totalArticleCount = DataMgr.getChannelData().length;
            if (--this.currentArticleIdx < 0) {
                this.currentArticleIdx = totalArticleCount - 1;
            }
            Channel.articleUp();
            break;
        case this.LIST_CHANNEL_DOWN :
            var totalArticleCount = DataMgr.getChannelData().length;
            if (++this.currentArticleIdx > totalArticleCount - 1) {
                this.currentArticleIdx = 0;
            }
            Channel.articleDown();
            break;
        case this.LIST_FIRST_CHANNEL_UP:
            Channel.setDataObj(DataMgr.getChannelListData(this.currentArticleIdx));
            Channel.setTitleIdx(Channel.getLastTitleIdx());
            Channel.adjustScrollBar(this.currentArticleIdx, DataMgr.getChannelData().length);
            Channel.refresh();
            break;
        case this.LIST_LAST_CHANNEL_DOWN:
            Channel.setDataObj(DataMgr.getChannelListData(this.currentArticleIdx));
            Channel.setTitleIdx(this.currentArticleIdx%Channel.TITLE_MAX_NUM);
            Channel.adjustScrollBar(this.currentArticleIdx, DataMgr.getChannelData().length);
            Channel.refresh();
            break;
			
		// Feeds
        case this.CHANNELS_RETURN:
            Feed.hide();
			this.showChannel();
        break;
        case this.LIST_START_CONTENTS:
			$("#back h3").html("Feeds");
			$("#content-left-wrapper").css("background","#dfdfdf");
			$("li").css("background-image","url(images/list-gradient-black.png)");
			$("li.selected").css("background-image","url(images/arrow-blue.png)");
            this.showContents();				
        break;
        case this.LIST_FEED_UP:
            var totalArticleCount = DataMgr.getFeedData(this.currentChannelID).arrArticles.length;
            if (--this.currentArticleIdx < 0) {
                this.currentArticleIdx = totalArticleCount - 1;
            }
            Feed.articleUp();
        break;
        case this.LIST_FEED_DOWN :
            var totalArticleCount = DataMgr.getFeedData(this.currentChannelID).arrArticles.length;
            if (++this.currentArticleIdx > totalArticleCount - 1) {
                this.currentArticleIdx = 0;
            }
            Feed.articleDown();
		break;
        case this.LIST_FIRST_FEED_UP:
            Feed.setDataObj(DataMgr.getFeedListData(this.currentChannelID, this.currentArticleIdx));
            Feed.setTitleIdx(Feed.getLastTitleIdx());
            Feed.adjustScrollBar(this.currentArticleIdx, DataMgr.getFeedData(this.currentChannelID).arrArticles.length);
            Feed.refresh();
        break;
        case this.LIST_LAST_FEED_DOWN:
            Feed.setDataObj(DataMgr.getFeedListData(this.currentChannelID, this.currentArticleIdx));
            Feed.setTitleIdx(0);
            Feed.adjustScrollBar(this.currentArticleIdx, DataMgr.getFeedData(this.currentChannelID).arrArticles.length);
            Feed.refresh();
        break;

        // Contents
        case this.CONTENTS_SCROLL_UP:
            setTimeout("Contents.adjustScrollBar()", 0);
            break;
        case this.CONTENTS_SCROLL_DOWN:
            setTimeout("Contents.adjustScrollBar()", 0);
            break;
        case this.CONTENTS_RETURN:
            Contents.hide();
            this.showFeed();
            break;

        default:
            break;
    }
}