var Channel = {
    listArea : null,			// Channel Div
    scrollBar : null,			// Scroll bar Div
    scrollBead : null,			// Scroll bead Div
    arrTitles : new Array(),	// Array of Title Divs
    
    SCROLLBAR_SIZE : 425,		// Scroll bar length
    titleIdx : 0,				// title index being highlighted
    TITLE_MAX_NUM : 7,			// max title number
    dataObj : null, 			// Data object
	noObj : null
}

Channel.create = function() {
    this.listArea = document.getElementById("ui-list-top");
    this.scrollBar = document.getElementById("ui-scroll-top");
    this.scrollBead = document.getElementById("ui-scroll-bead-top");
    
    for (var i=0; i < this.TITLE_MAX_NUM; i++) {
        this.arrTitles[i] = document.getElementById("list-top-li-"+i);
    }
}

Channel.show = function() {
    this.listArea.style.display = "block";
	KeyHandler.focusToKeyBlocker();
    this.fillTitles();
    this.highlightTitle(this.titleIdx);
}

Channel.refresh = function() {
    this.clearContents();							// clear all contents in Divs
    this.fillTitles();
    this.highlightTitle(this.titleIdx);
}

Channel.setTitleIdx = function (titleIdx) {
    this.titleIdx = titleIdx;
}

Channel.clearContents = function() {
    for (var i=0; i < this.TITLE_MAX_NUM; i++) {
        this.arrTitles[i].innerHTML = "";
    }
}

Channel.hide = function() {
    $("#feed-title td").html($("#rss-list-top li.selected").find(".news-title h2").html());
	var i = this;
	$("#rss-list-top, #ui-scroll-bead-top").animate({left: "-=262px"}, 600, function(){
		$("#rss-list-top, #ui-scroll-bead-top").addClass("hidden");
		i.blurTitle(i.titleIdx);	
	});
	$("#content-right-wrapper , #header-right").fadeIn('slow', function(){
		$("#content-right-wrapper, #header-right, #ui-scroll-bead-bottom").removeClass("hidden");
		$("#logo_title").replaceWith('<td id="back"><h3>Channels</h3></td>');
	});
	KeyHandler.focusToKeyBlocker();	// block remote controller key event
}

Channel.setDataObj = function(pDataObj) {
    this.dataObj = pDataObj;
}

Channel.fillTitles = function() {
    var article = null;
    for (var i=0; i < this.TITLE_MAX_NUM; i++) {
        article = this.dataObj[i];
        if (article) {
            this.arrTitles[i].innerHTML = WrapInTable(article.title, null, "number");
        }
        else {
            this.arrTitles[i].innerHTML = "";
        }
    }
	KeyHandler.focusToChannel()
}

Channel.highlightTitle = function(pIndex) {
	$(this.arrTitles[pIndex!=null?pIndex:this.titleIdx]).addClass("selected");
}

Channel.blurTitle = function(pIndex) {
    $(this.arrTitles[pIndex!=null?pIndex:this.titleIdx]).removeClass("selected");
}


Channel.articleUp = function() {
    this.blurTitle(this.titleIdx);
    if (--this.titleIdx < 0) {						// if first title 
        NewsController.request(NewsController.LIST_FIRST_CHANNEL_UP);	// request to update data object
    }
    else {
        this.highlightTitle(this.titleIdx);
    }
}

Channel.articleDown = function() {
    this.blurTitle(this.titleIdx);
    if (++this.titleIdx > this.TITLE_MAX_NUM -1 || this.titleIdx > this.dataObj.length-1) {
        NewsController.request(NewsController.LIST_LAST_CHANNEL_DOWN);	// if last title, request to update data object
    }
    else {
        this.highlightTitle(this.titleIdx);
    }
}

Channel.getLastTitleIdx = function() {
    var retValue = this.dataObj.length - 1;
    return retValue;
}

Channel.getTitleIdx = function() {
    var retValue = this.titleIdx;
    return retValue;
}

Channel.adjustScrollBar = function(articleIdx, totalArticle) {
    var curPage = Math.floor(articleIdx/this.TITLE_MAX_NUM);
    var totalPage = Math.floor((totalArticle-1)/this.TITLE_MAX_NUM);
    if (totalPage <= 0) {		// if number of articles are under 10, 
        this.hideScrollBar();	// hide scroll bar.
    }
    else {
        var position = Math.round((curPage*this.SCROLLBAR_SIZE)/totalPage);
        this.scrollBead.style.top = position + "px";
        this.showScrollBar();
    }
}

Channel.showScrollBar = function() {
    this.scrollBar.style.display = "block";
}

Channel.hideScrollBar = function() {
    this.scrollBar.style.display = "none";
}