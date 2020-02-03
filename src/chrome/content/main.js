main();
    var lastTabLabel;
    var imgList=[];
    var imagePath=getComplexValue('Header_Image_Switch_Path')||null;
function main(){
	if(imagePath!=null){
    readDir(imagePath);
    //readDir(OS.Constants.Path.profileDir + '\\chrome\\header image');
    var main_window=document.querySelector('#main-window');
    main_window.querySelector('#TabsToolbar').addEventListener("click", function () {
        var currentTabLabel=window.gBrowser.selectedTab.label;
        if(currentTabLabel!=lastTabLabel){
            var randomNum = Math.floor(Math.random() * (imgList.length - 0));
            var img = imgList[randomNum];
            main_window.style.setProperty('--lwt-header-image', 'url("' + encodeURI('file:///' + img.replace(/\\/g, '/')) + '")', 'important');
            main_window.style.setProperty('--lwt-background-alignment','TOP');
            lastTabLabel=currentTabLabel;
        }
    });
}
}
    function readDir(path) {
        var arr = readDirectory(path);
        for (var item of arr) {
            if (item.includes('.')) {
                imgList.push(path + '\\' + item);
            }
            else {
                readDir(path + '\\' + item);
            }

        }

    }


//read files name from dir, return "array"
    function readDirectory(path) {
        var nsFile = Components.Constructor("@mozilla.org/file/local;1", "nsIFile", "initWithPath");

        var file = new nsFile(path);

        var list = [];

        if (file.isDirectory()) {

            var children = file.directoryEntries;

            while (children.hasMoreElements()) {

                child = children.getNext().QueryInterface(Components.interfaces.nsILocalFile);

                list.push(child.leafName);

            }

        }

        return list;

    }
function setPath(){
var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                        .getService(Components.interfaces.nsIPromptService);

var check = {value: false};                  // default the checkbox to false

var imagePathObj = {value: 'C:\\Header_image'};                  // default the edit field to Bob

var result = prompts.prompt(null, "Header Image Switch", "Image folder path:", imagePathObj, null, check);
if(result){
	imagePath=imagePathObj.value;
	setComplexValue('Header_Image_Switch_Path',imagePath);
	main();
}
}
//Read Preference Item
function getComplexValue(Varible)
	{
	var prefb = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	var str = prefb.getComplexValue(Varible, Components.interfaces.nsISupportsString);
	return str.data
 	}	
//Create Preference Item
function setComplexValue(Varible,Value)
	{
	var prefb = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
	str.data = Value;
	prefb.setComplexValue(Varible, Components.interfaces.nsISupportsString, str);
	}	
