var KeyHandler = {
    tvKey : null,
    channelAnchor : null,
	feedAnchor : null,
    contentsAnchor : null,
    keyBlockerAnchor : null
}

KeyHandler.create = function() {
    this.channelAnchor = document.getElementById("Channel_Anchor");
	this.feedAnchor = document.getElementById("Feed_Anchor");
    this.contentsAnchor = document.getElementById("Contents_Anchor");
    this.keyBlockerAnchor = document.getElementById("KeyBlocker_Anchor");
    this.tvKey = new Common.API.TVKeyValue();
}

KeyHandler.channelKeyDown = function() {
    var listKeyCode = event.keyCode;
    
    switch(listKeyCode) {
        case this.tvKey.KEY_LEFT:
            break;
        case this.tvKey.KEY_RIGHT:
			NewsController.request(NewsController.LIST_START_FEEDS);
            break;
        case this.tvKey.KEY_UP:
            NewsController.request(NewsController.LIST_CHANNEL_UP);
            break;
        case this.tvKey.KEY_DOWN:
            NewsController.request(NewsController.LIST_CHANNEL_DOWN);
            break;
        case this.tvKey.KEY_ENTER:
            NewsController.request(NewsController.LIST_START_FEEDS);
            break;
        case this.tvKey.KEY_RETURN:
			widgetAPI.blockNavigation(event);
			widgetAPI.sendExitEvent();
            break;
		case this.tvKey.KEY_EXIT:
			widgetAPI.blockNavigation(event);

			break;
		default:
			break;
    }
}

KeyHandler.feedKeyDown = function() {
    var listKeyCode = event.keyCode;
    
    switch(listKeyCode) {
        case this.tvKey.KEY_LEFT:
			NewsController.request(NewsController.CHANNELS_RETURN);
            break;
        case this.tvKey.KEY_RIGHT:
			NewsController.request(NewsController.LIST_START_CONTENTS);
            break;
        case this.tvKey.KEY_UP:
            NewsController.request(NewsController.LIST_FEED_UP);
            break;
        case this.tvKey.KEY_DOWN:
            NewsController.request(NewsController.LIST_FEED_DOWN);
            break;
        case this.tvKey.KEY_ENTER:
            NewsController.request(NewsController.LIST_START_CONTENTS);
            break;
        case this.tvKey.KEY_RETURN:
			widgetAPI.blockNavigation(event);
            NewsController.request(NewsController.CHANNELS_RETURN);
            break;
		case this.tvKey.KEY_EXIT:
			widgetAPI.blockNavigation(event);

			break;
		default:
			break;
    }
}

KeyHandler.contentsKeyDown = function() {
    var contentsKeyCode = event.keyCode;
    
    switch(contentsKeyCode) {
        case this.tvKey.KEY_LEFT:
			NewsController.request(NewsController.CONTENTS_RETURN);
            break;
        case this.tvKey.KEY_RIGHT:
            break;
        case this.tvKey.KEY_UP:
			NewsController.request(NewsController.CONTENTS_SCROLL_UP);
            break;
        case this.tvKey.KEY_DOWN:
			NewsController.request(NewsController.CONTENTS_SCROLL_DOWN);
            break;
        case this.tvKey.KEY_GREEN:
            break;
        case this.tvKey.KEY_ENTER:
			NewsController.request(NewsController.CONTENTS_RETURN);
            break;
        case this.tvKey.KEY_RETURN:
            widgetAPI.blockNavigation(event);
            NewsController.request(NewsController.CONTENTS_RETURN);
            break;
		case this.tvKey.KEY_EXIT:
			widgetAPI.blockNavigation(event);

			break;
		default:
			break;
    }
}

KeyHandler.keyBlocker = function() {
    var keyBlockerKeyCode = event.keyCode;
}

KeyHandler.focusToChannel = function() {
    this.channelAnchor.focus();
	document.getElementById("Channel_Anchor").focus();
}

KeyHandler.focusToFeed = function() {
    this.feedAnchor.focus();
	document.getElementById("Feed_Anchor").focus();
}

KeyHandler.focusToContents = function() {
    //this.contentsAnchor.focus();
    document.getElementById("Contents_Anchor").focus();
}

KeyHandler.focusToKeyBlocker = function() {
    this.keyBlockerAnchor.focus();
	document.getElementById("KeyBlocker_Anchor").focus();
}








