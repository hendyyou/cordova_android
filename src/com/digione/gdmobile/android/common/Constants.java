package com.digione.gdmobile.android.common;

public final class Constants {
    /**
     * 线程数量：5
     */
    public static final int THREADCOUNT = 5;
    /**
     * 日志标识：common_android
     */
    public static final String TAG = "gdmobile";  
    /**
     *          政策推送
     **/
    public  static final  String POLICY_PUSH = "policy";

    public  static final  String ANNOUNCEMEN_PUSH = "announcement";

    public  static final  String NIGHT_PUSH = "night";

    public   static final String DISK_IMAGE_PATH = "/splash_image/";

    public   static final String IMAGE_UPATE_FILE_NAME = "pic_update.xml";
    
    public static final String CACHEDIR = "cache";
    
    public static final String SUB_PAGE_NAME = "/default.html";
    
    public static final String SPLASH_SCREEN_PROPERTY = "splashscreen";
    
    public static final String DATABASE_DIR = "database";
    
    public static final String TIMEOUT_PROPERTY = "loadUrlTimeoutValue";
    
    public static final String MESSAGE_CALLBACK_KEY = "messageCallback";

    public static  final  String IMAGE_VERSION = "image_version";

    public static  final  String IMAGE_UPDATE_INFO = "image_update_info";

    public static  final  String IMAGE_NAME_ = "image_name_";

    public static  final  String IMAGE_COUNT = "image_count";
    
    public static final String LOADING_DIALOG_START = "loadingStart";

	public static final String LOADING_DIALOG_STOP = "loadingStop";

	public static final String GOTO_HOME = "tohome";

	public static final String CLEAR_MEMORY = "clearMemory";
	
	public static final String PUSH_POLICY_SETTING = "push_policy_settting";
	
	public static final String ON = "on";
	
	public static final String OFF = "off";
	
	public static final String ALL = "all";
	
	public static final String TYPE = "type";
	
	public static final String LASTNEWSID = "lastID";

    /**
     * 消息代码常量定义
     */
    public static final class MsgCode {
        
        /**
         * 显示更新提示对话框:11
         */
        public static final int SHOW_UPDATE_DIALOG = 11;
        /**
         * APK下载失败:12
         */
        public static final int APK_DOWN_ERROR = 12;
        /**
         * 显示无网络对话框:13
         */
        public static final int SHOW_NO_NETWORK = 13;
        
        /**
         * 首页广告图展示时间到
         */
        public static final int AD_TIMEOUT = 20;
       
    }

       
}
