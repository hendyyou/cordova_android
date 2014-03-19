package com.digione.gdmobile.android;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.AlertDialog.Builder;
import android.app.ProgressDialog;
import android.content.*;
import android.content.DialogInterface.OnClickListener;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.util.Xml;
import android.widget.LinearLayout;
import com.digione.gdmobile.android.bean.UpdateInfoBean;
import com.digione.gdmobile.android.common.Constants;
import com.digione.gdmobile.android.common.Constants.MsgCode;
import com.digione.gdmobile.android.common.CustomProgressDialog;
import com.digione.gdmobile.android.common.DownLoadTask;
import com.digione.gdmobile.android.common.LogCustom;
import com.digione.gdmobile.android.common.ThreadPoolManager;
import com.digione.gdmobile.android.utils.HttpUtil;
import com.digione.gdmobile.android.utils.SystemUtil;
import com.digione.gdmobile.android.utils.ToastUtil;
import org.xmlpull.v1.XmlPullParser;

import java.io.File;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * 显示Logo，并检查更新，如果有更新，下载apk进行安装
 *
 * @author 尤振华
 */
public class SplashActivity extends Activity implements Runnable, DownLoadTask.DownlaodListener {

    private static final String TAG = "SplashActivity";

    private AlertDialog alertDialog;
    // 从服务器获取的版本信息
    private UpdateInfoBean mUpdateInfoBean;
    // apk 文件
    private File file;
    //图片
    private File imageFile;
    // 下载任务
    private DownLoadTask downLoadTask;
    private LinearLayout ll_splash;
    // 版本号
    private double clientVersion;
    // 进度条
    private ProgressDialog mProgressDialog;

    //加载进度
    private CustomProgressDialog mLoadProgressDialog;
    //private TextView clientVersionTV;
    /**
     * 进度条当前的值
     */
    private int progressVaue;
    /**
     * 是否设置进度条最大值
     */
    private boolean flag = true;
    private boolean isStop = false;

    private SharedPreferences preferences;

    private Handler mHandler = new Handler() {
        public void handleMessage(android.os.Message msg) {
            switch (msg.what) {
                case MsgCode.APK_DOWN_ERROR:
                    mProgressDialog.dismiss();
                    ToastUtil.showToast(SplashActivity.this, R.string.down_error, ToastUtil.LENGTH_SHORT);
                    gotoHome();
                    break;
                case MsgCode.SHOW_UPDATE_DIALOG:
                    LogCustom.d("更新版本提示");
                    String title = SplashActivity.this.getString(R.string.update_hint);
                    String hintMsg = SplashActivity.this.getString(R.string.update_hint_msg);
                    if (mUpdateInfoBean != null) {
                        hintMsg = mUpdateInfoBean.getDesc();
                    }
                    Builder builder =
                            new Builder(SplashActivity.this).setTitle(title).setMessage(hintMsg).setCancelable(false)
                                                            .setPositiveButton(SplashActivity.this.getString(R.string.yes),
                                                                               new OnClickListener() {
                                                                                   @Override
                                                                                   public void onClick(
                                                                                           DialogInterface dialog,
                                                                                           int which) {
                                                                                       downApk();
                                                                                   }
                                                                               });

                    if (mUpdateInfoBean.isForce()) {// 要求强制更新
                        builder.setNegativeButton(SplashActivity.this.getString(R.string.no_update_quit),
                                                  new OnClickListener() {

                                                      @Override
                                                      public void onClick(DialogInterface dialog, int which) {
                                                          LogCustom.d("要求强制更新");
                                                          android.os.Process.killProcess(android.os.Process.myPid());
                                                          System.exit(0);
                                                      }
                                                  });

                    } else {
                        builder.setNegativeButton(SplashActivity.this.getString(R.string.no), new OnClickListener() {

                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                LogCustom.d("不更新直接进入主界面");
                                gotoHome();
                            }
                        });
                    }
                    if (!isStop) {
                        builder.show();
                    }
                    break;
                case MsgCode.SHOW_NO_NETWORK:
                    AlertDialog.Builder build = new AlertDialog.Builder(SplashActivity.this);

                    build.setMessage(getString(R.string.no_network_hint));
                    build.setPositiveButton(getString(R.string.setting_network), new DialogInterface.OnClickListener() {

                        @Override
                        public void onClick(DialogInterface mDialogInterface, int which) {
                            Intent intent = null;
                            // 判断手机系统的版本 即API大于10 就是3.0或以上版本
                            if (android.os.Build.VERSION.SDK_INT > 10) {
                                intent = new Intent(android.provider.Settings.ACTION_WIRELESS_SETTINGS);
                            } else {
                                intent = new Intent();
                                ComponentName component =
                                        new ComponentName("com.android.settings", "com.android.settings.WirelessSettings");
                                intent.setComponent(component);
                                intent.setAction("android.intent.action.VIEW");
                            }
                            startActivity(intent);
                            android.os.Process.killProcess(android.os.Process.myPid());
                            System.exit(0);
                        }
                    });
                    build.setNegativeButton(getString(R.string.cancel), new DialogInterface.OnClickListener() {

                        @Override
                        public void onClick(DialogInterface mDialogInterface, int which) {
                            if (alertDialog != null) {
                                alertDialog.dismiss();
                                android.os.Process.killProcess(android.os.Process.myPid());
                                System.exit(0);
                            }
                        }
                    });
                    alertDialog = build.create();
                    alertDialog.show();

                default:
                    break;
            }
        }

        ;
    };
    // 取消下载
    private DialogInterface.OnCancelListener proDialogCancelListener = new DialogInterface.OnCancelListener() {

        @Override
        public void onCancel(DialogInterface dialog) {
            downLoadTask.cancel();
            gotoHome();
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // 设置没有标题
        setContentView(R.layout.splash);
        ll_splash = (LinearLayout) findViewById(R.id.splash_ll);
        preferences = getSharedPreferences(Constants.IMAGE_UPDATE_INFO, Context.MODE_PRIVATE);   
        // Cache 目录下是否存在splash 图片 ，不存用默认的splash图片
        String filePath = preferences.getString(Constants.IMAGE_NAME_+"1", "");
        File image = new File(filePath);
        LogCustom.e("image length=" + image.length());
        if ((filePath != "" || !filePath.equals("")) && image.exists() && image.length() > 0) {
            Drawable drawable = Drawable.createFromPath(filePath);
           // ll_splash.setBackground(drawable);
            ll_splash.setBackgroundDrawable(drawable);
        }


        //clientVersionTV = (TextView) findViewById(R.id.welcome_version_tv);
        try {
            // 客户端版本
            clientVersion = getClientVersion();
            //clientVersionTV.setText(clientVersionTV.getText().toString() + clientVersion);
        } catch (NameNotFoundException e) {
            LogCustom.e("获取版本错误", e);
            //	clientVersionTV.setText(1.0 + "");
        }
        overridePendingTransition(R.anim.zoomin, 0);
        // 增加任务
        ThreadPoolManager.getInstance().addTask(this);
        initLoadProgressDialog();
    }

    /**
     * 安装Apk
     */
    private void installApk() {
        if (file.exists()) {
            LogCustom.d(file.getName() + " path=" + file.getPath());
            Intent intent = new Intent(Intent.ACTION_VIEW);
            intent.setDataAndType(Uri.fromFile(file), "application/vnd.android.package-archive");

            startActivity(intent);
            overridePendingTransition(R.anim.zoomin, 0);
            finish();
        }
    }

    @Override
    public void update(int total, int len, int threadid, String filePath) {
        if (flag) {
            mProgressDialog.setMax(total);
            flag = false;
        }
        progressVaue += len;
        mProgressDialog.setProgress(progressVaue);
    }

    @Override
    public void downLoadFinish(int totalSucess, String filePath) {
        mProgressDialog.dismiss();
        if (totalSucess == Constants.THREADCOUNT) {
            installApk();
        } else {
            Message.obtain(mHandler, MsgCode.APK_DOWN_ERROR).sendToTarget();
        }
    }

    @Override
    public void downLoadError(int type) {
        // Message.obtain(handler, DOWN_ERROR).sendToTarget();
    }

    /**
     * 初始化进度条
     */
    private void initProgressDialog() {
        mProgressDialog = new ProgressDialog(this);// 进度条初始化

        if (mUpdateInfoBean != null) {
            mProgressDialog.setCancelable(mUpdateInfoBean.isForce());
        }

        mProgressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
        mProgressDialog.setMessage(getString(R.string.downning));
        mProgressDialog.show();
        mProgressDialog.setOnCancelListener(proDialogCancelListener);
    }

    /**
     * 初始化进度条
     */
    private void initLoadProgressDialog() {
        if (mLoadProgressDialog == null) {
            mLoadProgressDialog = CustomProgressDialog.createDialog(this);
            mLoadProgressDialog.setMessage("正在加载中...");
        }
        mLoadProgressDialog.show();
    }


    /**
     * 从服务器下载新的Apk
     */
    private void downApk() {

        initProgressDialog();
        mLoadProgressDialog.dismiss();
        // mProgressBar.setVisibility(View.GONE);

        if (SystemUtil.getSdcardStauts()) {

            String url = mUpdateInfoBean.getUrl();
            if (url != null && !url.equals("")) {
                LogCustom.d("url=" + url);
                String filename = url.substring(url.lastIndexOf("/") + 1);
                String path = Environment.getExternalStorageDirectory() + "/Download";

                // 判断目录是否存在，不存在就创建
                File pathFile = new File(path);
                if (!pathFile.exists()) {
                    pathFile.mkdir();
                }

                file = new File(path, filename);
                // 下载
                downLoadTask = new DownLoadTask(mUpdateInfoBean.getUrl(), file.getAbsolutePath(), Constants.THREADCOUNT);
                // 下载监听
                downLoadTask.setListener(this);
                // 线程池管理
                ThreadPoolManager.getInstance().addTask(downLoadTask);
            }

        } else {
            ToastUtil.showToast(this, getString(R.string.sdcard_not_exit), ToastUtil.LENGTH_SHORT);
            mProgressDialog.dismiss();
            gotoHome();
        }
    }


    /**
     * 进入主界面
     */
    private void gotoHome() {
        //Log.d(TAG, getClass().getSimpleName() + " gotoHome isStop:" + isStop);
        if (!isStop) {
            Intent intent = new Intent(SplashActivity.this, MainActivity.class);
            startActivity(intent);
            finish();
        }
    }

    @Override
    public void run() {
        while (true) {
            try {
                if (isStop) {
                	
                    Thread.sleep(2000);
                    continue;
                }
            //    Thread.sleep(500);

                if (HttpUtil.isHasNetwork(this)) {
                    String path =getString(R.string.data_base_url)+getString(R.string.update_config_url);// Constant.URL +
                    // "download/apkupdate.xml";
                    URL url = new URL(path);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setConnectTimeout(2000);
                    InputStream is = conn.getInputStream();
                    mUpdateInfoBean = getUpdateInfo(is);

                    if (mUpdateInfoBean != null && mUpdateInfoBean.getVersion() > 0) {
                        double v = mUpdateInfoBean.getVersion();
                        LogCustom.d("获取当前服务器版本号为 ：" + v);
                        if (clientVersion >= v) {
                            gotoHome();
                        } else {
                            Message.obtain(mHandler, MsgCode.SHOW_UPDATE_DIALOG).sendToTarget();
                            break;
                        }
                    } else {
                        gotoHome();
                    }
                } else {
                    // gotoHome();
                    mHandler.sendEmptyMessage(MsgCode.SHOW_NO_NETWORK);
                    break;
                }
            } catch (Exception e) {
                Log.e(TAG, "网络检查出现异常", e);
                gotoHome();
            }
            if (!isStop) {
                break;
            }
        }
    }

    /**
     * 获取当前应用的版本号
     *
     * @return
     * @throws NameNotFoundException
     */
    private double getClientVersion() throws NameNotFoundException {
        PackageManager packageManager = getPackageManager();
        PackageInfo packageInfo = packageManager.getPackageInfo(getPackageName(), 0);
        return Double.valueOf(packageInfo.versionName);
    }

    /**
     * 解析升级xml文件
     *
     * @param is
     * @return UpdateInfoBean
     * @throws Exception
     */
    private UpdateInfoBean getUpdateInfo(InputStream is) throws Exception {
        UpdateInfoBean updateInfo = new UpdateInfoBean();
        XmlPullParser parser = Xml.newPullParser();
        parser.setInput(is, "UTF-8");
        int type = parser.getEventType();
        while (type != XmlPullParser.END_DOCUMENT) {
            switch (type) {
                case XmlPullParser.START_TAG:
                    if ("version".equals(parser.getName())) {
                        String version = parser.nextText().trim();
                        updateInfo.setVersion(version);
                    } else if ("url".equals(parser.getName())) {
                        String url = parser.nextText().trim();
                        updateInfo.setUrl(url);
                    } else if ("force".equals(parser.getName())) {
                        boolean force = Boolean.valueOf(parser.nextText().trim());
                        updateInfo.setForce(force);
                    } else if ("desc".equals(parser.getName())) {
                        String desc = parser.nextText().trim();
                        updateInfo.setDesc(desc);
                    }
                    break;
            }
            type = parser.next();
        }
        return updateInfo;
    }

    @Override
    protected void onStop() {
        //Log.d(TAG, getClass().getSimpleName() + " onStop");
        isStop = true;
        mHandler.removeMessages(MsgCode.APK_DOWN_ERROR);
        mHandler.removeMessages(MsgCode.SHOW_UPDATE_DIALOG);
        mLoadProgressDialog.dismiss();
        super.onStop();
    }

    @Override
    protected void onResume() {
        isStop = false;
        //Log.d(TAG, getClass().getSimpleName() + " onResume");
        super.onResume();
    }

    @Override
    protected void onDestroy() {
        if (downLoadTask != null) {
            downLoadTask.cancel();
            downLoadTask = null;
        }
        if (mProgressDialog != null) {
            mProgressDialog.dismiss();
            mProgressDialog = null;
        }
        file = null;
        super.onDestroy();
    }
}