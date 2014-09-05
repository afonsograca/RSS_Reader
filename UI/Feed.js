var Feed = {
    listArea : null,			// Feed Div
    scrollBar : null,			// Scroll bar Div
    scrollBead : null,			// Scroll bead Div
    arrTitles : new Array(),	// Array of Title Divs
    
    SCROLLBAR_SIZE : 425,		// Scroll bar length
    titleIdx : 0,				// title index being highlighted
    TITLE_MAX_NUM : 7,			// max title number
    dataObj : null    			// Data object
}

Feed.create = function() {
    this.listArea = document.getElementById("ui-list-bottom");
    this.scrollBar = document.getElementById("ui-scroll-bottom");
    this.scrollBead = document.getElementById("ui-scroll-bead-bottom");
    
    for (var i=0; i < this.TITLE_MAX_NUM; i++) {
        this.arrTitles[i] = document.getElementById("list-bottom-li-"+i);
    }
}

Feed.show = function() {
    this.listArea.style.display = "block";
	$("#rss-list-bottom").removeClass("hidden");
    this.fillTitles();
    this.highlightTitle(this.titleIdx);
    KeyHandler.focusToFeed();
}

Feed.refresh = function() {
    this.clearContents();							// clear all contents in Divs
    this.fillTitles();
    this.highlightTitle(this.titleIdx);
}

Feed.setTitleIdx = function (titleIdx) {
    this.titleIdx = titleIdx;
}

Feed.clearContents = function() {
    for (var i=0; i < this.TITLE_MAX_NUM; i++) {
        this.arrTitles[i].innerHTML = "";
    }
}

Feed.hide = function() {
	$("#rss-list-top, #ui-scroll-bead-top").removeClass("hidden");
	var i = this;
	$("#rss-list-top, #ui-scroll-bead-top").animate({left: "+=262px"}, 600, function(){
		$("#feed-title td").html('');
		$("#back").replaceWith('<td id="logo_title"><h1>RSS Reader</h1></td>');
		$("#rss-list-bottom, #ui-scroll-bead-bottom").addClass("hidden");
		i.blurTitle(i.titleIdx);			
	});
	$("#content-right-wrapper , #header-right").fadeOut('slow', function(){
		$("#content-right-wrapper, #header-right").addClass("hidden");
	});
	KeyHandler.focusToKeyBlocker();		// block remote controller key event
}

Feed.setDataObj = function(pDataObj) {
    this.dataObj = pDataObj;
}

Feed.fillTitles = function() {
    var article = null;
    for (var i=0; i < this.TITLE_MAX_NUM; i++) {
        article = this.dataObj.arrArticles[i];
        if (article) {
            this.arrTitles[i].innerHTML = WrapInTable(article.title, article.date, "marker");
        }
        else {
            this.arrTitles[i].innerHTML = "";
        }
    }
}

Feed.highlightTitle = function(pIndex) {
	$(this.arrTitles[pIndex!=null?pIndex:this.titleIdx]).addClass("selected");
	$("#user").html("");
	$("#date").html("");
	document.getElementById("news-content").innerHTML = "";
	$("#news-title").css("color", "white");
	$("#news-title").html(this.dataObj.arrArticles[pIndex!=null?pIndex:this.titleIdx].title);
	$("#news-title").css("font-size", "");
	while($("#news-title").attr("scrollHeight") > $("#news-title").attr("offsetHeight")) {
		var size = parseInt($("#news-title").css("font-size"));
		$("#news-title").css("font-size", size - 3);
	}
	$("#news-title").css("color", "");
	$("#user").html(this.dataObj.arrArticles[pIndex!=null?pIndex:this.titleIdx].user);
	$("#date").html(this.dataObj.arrArticles[pIndex!=null?pIndex:this.titleIdx].date);
	var text = this.dataObj.arrArticles[pIndex!=null?pIndex:this.titleIdx].description.split('<br>');
	document.getElementById("news-content").innerHTML = text[0] + " <a href='javascript:void(0);' id='Contents_Anchor'></a>";
	
}

Feed.blurTitle = function(pIndex) {
	$(this.arrTitles[pIndex!=null?pIndex:this.titleIdx]).removeClass("selected");
}


Feed.articleUp = function() {
    this.blurTitle(this.titleIdx);
    if (--this.titleIdx < 0) {						// if first title 
        NewsController.request(NewsController.LIST_FIRST_FEED_UP);	// request to update data object
    }
    else {
        this.highlightTitle(this.titleIdx);
    }
}

Feed.articleDown = function() {
    this.blurTitle(this.titleIdx);
    if (++this.titleIdx > this.TITLE_MAX_NUM -1 || this.titleIdx > this.dataObj.arrArticles.length-1) {
        NewsController.request(NewsController.LIST_LAST_FEED_DOWN);	// if last title, request to update data object
    }
    else {
        this.highlightTitle(this.titleIdx);
    }
}

Feed.getLastTitleIdx = function() {
    var retValue = this.dataObj.arrArticles.length - 1;
    return retValue;
}

Feed.getTitleIdx = function() {
    var retValue = this.titleIdx;
    return retValue;
}

Feed.adjustScrollBar = function(articleIdx, totalArticle) {
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

Feed.showScrollBar = function() {
    this.scrollBar.style.display = "block";
}

Feed.hideScrollBar = function() {
    this.scrollBar.style.display = "none";
}