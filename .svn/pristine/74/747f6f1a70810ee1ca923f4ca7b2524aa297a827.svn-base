package com.digione.gdmobile.android;

import android.app.AlertDialog.Builder;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.IBinder;
import com.digione.gdmobile.android.common.LogCustom;
import com.digione.gdmobile.android.utils.ToastUtil;

public class NetworkStateService extends Service {

    private static final String tag = "tag";
    private ConnectivityManager connectivityManager;
    private NetworkInfo info;
    private Builder builder;
    private BroadcastReceiver mReceiver = new BroadcastReceiver() {

        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            if (action.equals(ConnectivityManager.CONNECTIVITY_ACTION)) {
                LogCustom.d("网络状态已经改变");
                connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
                info = connectivityManager.getActiveNetworkInfo();
                if (info != null && info.isAvailable()) {
                    String name = info.getTypeName();
                    LogCustom.d("当前网络名称：" + name);
                    if (builder != null && builder.show().isShowing()) {
                        builder.show().dismiss();
                    }
                    ToastUtil.showToast(context, "网络可用", ToastUtil.LENGTH_LONG);
                    //doSomething()
                } else {
                    LogCustom.d("网络不可用");

                    ToastUtil.showToast(context, "网络不可用", ToastUtil.LENGTH_LONG);
                    //doSomething()
                }
            }
        }
    };

    @Override
    public IBinder onBind(Intent intent) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        IntentFilter mFilter = new IntentFilter();
        mFilter.addAction(ConnectivityManager.CONNECTIVITY_ACTION);
        registerReceiver(mReceiver, mFilter);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        unregisterReceiver(mReceiver);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return super.onStartCommand(intent, flags, startId);
    }

}
