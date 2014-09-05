var Main = {
    startCategoryID : 0,
     countryCode : -1,
    languageCode : -1,
}

var widgetAPI = new Common.API.Widget();
var objMsgFromManager = {}

Main.onLoad = function() {
    this.analyzeVars();
	NewsController.create();
	widgetAPI.sendReadyEvent();
	KeyHandler.focusToKeyBlocker();
	NewsController.start();
}

Main.analyzeVars = function() {
    
    
	var vars = window.location.search;
    
	
	if (vars.charAt(0) == "?") {
		vars = vars.slice(1, vars.length);
	}
	
    vars = vars.split("&");
    for (var i=0; i < vars.length; i++) {
        var data = vars[i].split("=");
		if (data.length == 2) {
			
	        switch (data[0]) {
	            case "country":
					this.countryCode = data[1];
//                    alert(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+this.countryCode );
	                break;
	            case "language":
	                this.languageCode = data[1];
	                break;
	            case "modelid":
					//this.modelID = data[1];
	                break;
	            case "server":
	                break;
	            case "id":
	                //this.picasaID = data[1];
	                break;
				case "pw":
					//this.picasaPW = data[1];
					break;
	            default :
	                break;
	        }
		}
		else {
			
		}
    }
    // var 가 없을 경우의 default 값
    if (this.countryCode == -1) this.countryCode = 0;
    if (this.languageCode == -1) this.languageCode = 0;
   
}

Main.onUnload = function() {
	widgetAPI.sendExitEvent();
}