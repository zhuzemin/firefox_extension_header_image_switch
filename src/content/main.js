    var imgList=[];
    var count=0;
    var imagePath;
    try{
        imagePath=getComplexValue('Header_Image_Switch_Path');
    }
    catch (e) {
        imagePath=null;
    }
    var speed;
    try{
        speed=getComplexValue('Header_Image_Switch_Speed');
    }
    catch (e) {
        speed=200;
    }
    var hex=new Array("00","14","28","3C","50","64","78","8C","A0","B4","C8","DC","F0")
    var r=1
    var g=1
    var b=1
    var seq=1
    var entensionEnable;
    try{
        entensionEnable=getBoolPref('Header_Image_Switch_Enable');
    }
    catch (e) {
        entensionEnable=true;
    }
    var main_window=document.querySelector('#main-window');
main();
function main(){
	if(imagePath!=null&&entensionEnable){
        readDir(imagePath);
        imgList=shuffle(imgList);
    //readDir(OS.Constants.Path.profileDir + '\\chrome\\header image');
        main_window.style.setProperty('background-size', 'contain', 'important');
        window.gBrowser.addEventListener("select",  function () {
            if(entensionEnable){
                if(count==imgList.length){
                    imgList=shuffle(imgList);
                    count=0;
                }
                //var randomNum = Math.floor(Math.random() * (imgList.length - 0));
                var img = imgList[count];
                main_window.style.setProperty('--lwt-header-image', 'url("' + encodeURI('file:///' + img.replace(/\\/g, '/')) + '")', 'important');
                //main_window.style.setProperty('--lwt-background-alignment','TOP');                change();
                //var rainbow="#"+hex[r]+hex[g]+hex[b]
                main_window.querySelector('#tabbrowser-tabs').style.setProperty('-webkit-text-fill-color', getRandomColor(), 'important');

                count++;
            }
   });
        /*var interval=setInterval(function () {
            if(entensionEnable){
                change();
                var rainbow="#"+hex[r]+hex[g]+hex[b]
                main_window.querySelector('#tabbrowser-tabs').style.setProperty('-webkit-text-fill-color', rainbow, 'important');
                i++;
            }
            else{
                clearInterval(interval);

            }
        },speed);*/
}
}
    //shuffle array
    function    shuffle (sourceArray) {
        for (var i = 0; i < sourceArray.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (sourceArray.length - i));

            var temp = sourceArray[j];
            sourceArray[j] = sourceArray[i];
            sourceArray[i] = temp;
        }
        return sourceArray;
    }

function entensionEnableSwitch(){
        if(entensionEnable){
            entensionEnable=false;
            main_window.querySelector('#tabbrowser-tabs').style.setProperty('-webkit-text-fill-color', 'black', 'important');
            main_window.style.setProperty('--lwt-header-image', '', 'important');
            main_window.querySelector('#Header_Image_Switch_btn').className='disable';
        }
        else {
            entensionEnable=true;
            main();
            main_window.querySelector('#Header_Image_Switch_btn').className='enable';

        }
        setBoolPref('Header_Image_Switch_Enable',entensionEnable);
    }
    function readDir(path) {
        var arr = readDirectory(path);
        for (var item of arr) {
            if (/\.(jpg|png|gif|bmp)$/.test(item)) {
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

                var child = children.getNext().QueryInterface(Components.interfaces.nsILocalFile);

                list.push(child.leafName);

            }

        }

        return list;

    }
function setPath(){
var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                        .getService(Components.interfaces.nsIPromptService);

var check = {value: false};                  // default the checkbox to false

var imagePathObj = {value: imagePath};                  // default the edit field to Bob

var result = prompts.prompt(null, "Header Image Switch", "Image folder path:", imagePathObj, null, check);
if(result){
	imagePath=imagePathObj.value;
	setComplexValue('Header_Image_Switch_Path',imagePath);
    imgList=[];
	main();
}
}
    function setTitleColorChangeSpeed(){
        var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
            .getService(Components.interfaces.nsIPromptService);

        var check = {value: false};                  // default the checkbox to false

        var obj = {value: speed};                  // default the edit field to Bob

        var result = prompts.prompt(null, "Header Image Switch", "Title Color Change Speed:", obj, null, check);
        if(result){
            speed=obj.value;
            setComplexValue('Header_Image_Switch_Speed',speed);
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

    function change(){
        if (seq==6){
            b--
            if (b==0)
                seq=1
        }
        if (seq==5){
            r++
            if (r==12)
                seq=6
        }
        if (seq==4){
            g--
            if (g==0)
                seq=5
        }
        if (seq==3){
            b++
            if (b==12)
                seq=4
        }
        if (seq==2){
            r--
            if (r==0)
                seq=3
        }
        if (seq==1){
            g++
            if (g==12)
                seq=2
        }
    }
    //Get Boolean Preference
    function getBoolPref(Varible)
    {
        var prefb = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
        var str = prefb.getBoolPref(Varible);
        return str
    }
    //Set Boolean Preference
    function setBoolPref(Varible,Value)
    {
        var prefb = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        prefb.setBoolPref(Varible, Value);
    }
    function getRandomColor() {
        var Colors = {};
        Colors.names = {
            aqua: "#00ffff",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            black: "#000000",
            blue: "#0000ff",
            brown: "#a52a2a",
            cyan: "#00ffff",
            fuchsia: "#ff00ff",
            gold: "#ffd700",
            green: "#008000",
            indigo: "#4b0082",
            khaki: "#f0e68c",
            lightblue: "#add8e6",
            lightcyan: "#e0ffff",
            lightgreen: "#90ee90",
            lightgrey: "#d3d3d3",
            lightpink: "#ffb6c1",
            lightyellow: "#ffffe0",
            lime: "#00ff00",
            magenta: "#ff00ff",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            orange: "#ffa500",
            pink: "#ffc0cb",
            purple: "#800080",
            violet: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            white: "#ffffff",
            yellow: "#ffff00"
        };
        Colors.random = function() {
            var result;
            var count = 0;
            for (var prop in this.names)
                if (Math.random() < 1/++count)
                    result = prop;
            return result;
        };
        return Colors.names[Colors.random()];
    }
