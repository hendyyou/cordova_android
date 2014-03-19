package com.digione.gdmobile.android.utils;

import android.content.Context;
import android.widget.Toast;

public final class ToastUtil {

	private static Toast toast;// 提示语

	public final static int LENGTH_LONG = Toast.LENGTH_LONG;

	public final static int LENGTH_SHORT = Toast.LENGTH_SHORT;

	// title为显示的语句在string的ID，time为Toast.long 或 Toast.short
	public static void showToast(Context context, int title, int time) {
		if (toast == null) {
			toast = Toast.makeText(context, title, time);
			toast.show();
		} else {
			toast.setText(title);
			toast.setDuration(time);
			toast.show();
		}
	}

	// title为显示的语句D，time为Toast.long 或 Toast.short
	public static void showToast(Context context, String title, int time) {
		if (toast == null) {
			toast = Toast.makeText(context, title, time);
			toast.show();
		} else {
			toast.setText(title);
			toast.setDuration(time);
			toast.show();
		}
	}

}
