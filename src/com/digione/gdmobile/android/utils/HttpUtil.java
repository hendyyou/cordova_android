package com.digione.gdmobile.android.utils;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

public final class HttpUtil {

	// 判断是否为wifi连接
	public static boolean isWifiConnected(Context context) {
		ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
		NetworkInfo ni = cm.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
		if (ni.getState() == NetworkInfo.State.CONNECTED) {
			// Resource.bWifiConnected = true;
			return true;
		}
		return false;
	}

	// 判断当前是否有网络
	public static boolean isHasNetwork(Context context) {
		ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
		if (cm == null)
			return false;
		NetworkInfo networkInfo = cm.getActiveNetworkInfo();
		if (networkInfo == null || !networkInfo.isAvailable()) {
			return false;
		}
		return true;
	}

}
