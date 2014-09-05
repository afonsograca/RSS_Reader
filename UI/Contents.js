var Contents = {
    contentsArea : null,		// Contents Div
    feedTitle : null,		// feed title Div
    feedDescription : null,	// feed description Div
    scrollBar : null,			// Scroll bar Div
    scrollBead : null,			// Scroll bead Div
	user: null, 
	date: null,
    
    SCROLLBAR_SIZE : 280,		// scroll bar length
    dataObj : null,				// Data object
}

Contents.create = function() {
    this.contentsArea = document.getElementById("main-content");
    this.feedTitle = document.getElementById("news-title");
    this.feedDescription = document.getElementById("news-content");
    this.scrollBar = document.getElementById("main-content-scroll");
    this.scrollBead = document.getElementById("main-content-bead");
	this.user = document.getElementById("user");
    this.date = document.getElementById("date");
}

Contents.show = function() {
	this.feedDescription.innerHTML = this.dataObj.article.description + " <a href='javascript:void(0);' id='Contents_Anchor'></a>";
    KeyHandler.focusToContents();
}

Contents.refresh = function() {
    this.fillCategoryTitle();
    this.fillUser();
    this.fillDate();
    this.fillfeedTitle();
    this.fillDescription();
}

Contents.hide = function() {
    $("#main-content-bead").addClass("hidden");
	$("#back h3").html("Channels");
	$("#content-left-wrapper").css("background",'');
	$("li").css("background",'');
	$("li.selected").css("background",'');
    KeyHandler.focusToKeyBlocker();
}

Contents.setDataObj = function(pDataObj) {
    this.dataObj = pDataObj;
}

Contents.fillfeedTitle = function() {
	$("#news-title").css("font-size", "28px");
    this.feedTitle.innerHTML = this.dataObj.article.title;
	while(this.feedTitle.scrollHeight >= this.feedTitle.offsetHeight) {
		var size = parseInt(resizer.css("font-size"), 10);
		$("#news-title").css("font-size", size - 1);
	}
}

Contents.fillUser = function() {
    this.user.innerHTML = this.dataObj.article.user;
    KeyHandler.focusToContents();
}

Contents.fillDate = function() {
    this.date.innerHTML = this.dataObj.article.date;
    KeyHandler.focusToContents();
}

Contents.fillDescription = function() {
    KeyHandler.focusToContents();
}

Contents.adjustScrollBar = function() {
    var scrollTop = this.feedDescription.scrollTop;
    var scrollHeight = this.feedDescription.scrollHeight;
    var offsetHeight = this.feedDescription.offsetHeight;
    
    if (scrollHeight <= offsetHeight) {
        this.hideScrollBar();
    }
    else {
		$("#main-content-bead").removeClass("hidden");
        var position = parseInt((this.feedDescription.scrollTop)/(this.feedDescription.scrollHeight-this.feedDescription.offsetHeight) * this.SCROLLBAR_SIZE);
		
        this.scrollBead.style.top = (190+position) + "px";
        this.showScrollBar();
    }
}

Contents.showScrollBar = function() {
    this.scrollBar.style.display = "block";
}

Contents.hideScrollBar = function() {
    this.scrollBar.style.display = "none";
}






