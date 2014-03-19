var homeIndexPage = {
    initialize : function(tabIndex) {
        Utils.bindFooterTabEvent("home_index_page", tabIndex);

       
        var pictureSource;   // picture source
        var destinationType; // sets the format of returned value

        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
		
	//清空storage
	//localStorage.clear();
	//-----------------------------根据存储的状态填充政策、公告、夜间三个选项	
	var isPolicyOn = localStorage.getItem("policy"); 
	if(isPolicyOn=="on"){		
		$('input:checkbox').eq(0).attr('checked', true);
	//$("#home_test_push_policy").attr('checked','checked'); 
	}else{		
		$('input:checkbox').eq(0).attr('checked', false);
	}
	
	var isAnnouncementOn = localStorage.getItem("announcement"); 
	if(isAnnouncementOn=="on"){		
		$('input:checkbox').eq(1).attr('checked', true);
	//$("#home_test_push_policy").attr('checked','checked'); 
	}else{		
		$('input:checkbox').eq(1).attr('checked', false);
	}
	
	var isNightOn = localStorage.getItem("night"); 
	if(isNightOn=="on"){		
		$('input:checkbox').eq(2).attr('checked', true);
	//$("#home_test_push_policy").attr('checked','checked'); 
	}else{		
		$('input:checkbox').eq(2).attr('checked', false);
	}
	//-----------------------------   

	//------------------------政策、公告、夜间三个选项的事件----------------------
		//政策推送
		$("#home_test_push_policy").off("click").on("click",function(){			
			if($("#home_test_push_policy")[0].checked){
				Utils.pushSetting(['policy','on']) ;
				localStorage.setItem("policy","on");				
			}else{
				Utils.pushSetting(['policy','off']) ;
				localStorage.setItem("policy","off");				
			}         	
			
        }) ;
		//公告推送
        $("#home_test_push_announcement").off("click").on("click",function(){
			if($("#home_test_push_announcement")[0].checked){				
            	Utils.pushSetting(['announcement','on']) ;
				localStorage.setItem("announcement","on");
			}else{
				Utils.pushSetting(['announcement','off']) ;
				localStorage.setItem("announcement","off");
			}
        }) ;
		//夜间推送
        $("#home_test_push_night").off("click").on("click",function(){
			
			if($("#home_test_push_night")[0].checked){
            	Utils.pushSetting(['night','on']) ;
				localStorage.setItem("night","on");
			}else{
				Utils.pushSetting(['night','off']) ;
				localStorage.setItem("night","off");
			}
        }) ;
	//-------------------------------------------------------end of 推送
	
     //-------------------拍照和选择本地相册接口----------------------
	 $("#homte_test_carmer_capture_photo").off("click").on("click",function(){
         capturePhoto();
        }) ;    


     $("#homte_test_carmer_from_photo_library").off("click").on("click",function(){
            getPhoto(pictureSource.PHOTOLIBRARY);
        }) ; 
		
		// Called when a photo is successfully retrieved
        //
        function onPhotoDataSuccess(imageData) {
            // Uncomment to view the base64-encoded image data
            // console.log(imageData);

            // Get image handle
            //
            var smallImage = document.getElementById('smallImage');

            // Unhide image elements
            //
            smallImage.style.display = 'block';

            // Show the captured photo
            // The in-line CSS rules are used to resize the image
            //
            smallImage.src = "data:image/jpeg;base64," + imageData;
        }

        // Called when a photo is successfully retrieved
        //
        function onPhotoURISuccess(imageURI) {
            // Uncomment to view the image file URI
            // console.log(imageURI);

            // Get image handle
            //
            var largeImage = document.getElementById('largeImage');

            // Unhide image elements
            //
            largeImage.style.display = 'block';

            // Show the captured photo
            // The in-line CSS rules are used to resize the image
            //
            largeImage.src = imageURI;
        }

        // A button will call this function
        //
        function capturePhoto() {
            // Take picture using device camera and retrieve image as base64-encoded string
            navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
                destinationType: destinationType.DATA_URL });
        }

       

        // A button will call this function
        //
        function getPhoto(source) {
            // Retrieve image file location from specified source
            navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
                destinationType: destinationType.FILE_URI,
                sourceType: source });
        }
		
		
        // Called if something bad happens.
        //
        function onFail(message) {
            console.log('Failed because: ' + message);
        }
		
		//------------------------------------------end of 拍照和本地相册--------------------


        this.initData({
            test : "homeIndexPage"
        });
    },

    initData : function(dataObj) {
        console.log("homeIndexPage");
        if (dataObj != null) {
            console.log("homeIndexPage initData() text:" + dataObj.text);
        }
       
    }
};
