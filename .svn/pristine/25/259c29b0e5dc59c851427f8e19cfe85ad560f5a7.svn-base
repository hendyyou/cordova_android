package com.digione.gdmobile.android.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.res.Resources;
import android.os.Environment;
import android.util.TypedValue;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.TextView;

public final class SystemUtil {

	public static final SimpleDateFormat chinese_formater = new SimpleDateFormat("yyyy年MM月dd日  HH:mm:ss",
			Locale.getDefault());

	public static final SimpleDateFormat common_formater = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault());

	public static boolean getSdcardStauts() {
		return Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED);
	}

	/**
	 * 根据手机的分辨率从 dp 的单位 转成为 px(像素)
	 */
	public static int dip2px(Context context, float dpValue) {
		final float scale = context.getResources().getDisplayMetrics().density;
		return (int) (dpValue * scale + 0.5f);
	}

	/**
	 * 根据手机的分辨率从 dp 的单位 转成为 px(像素)
	 */
	public static int dip2px(Resources res, int dp) {
		return (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp, res.getDisplayMetrics());
	}

	/**
	 * 根据手机的分辨率从 px(像素) 的单位 转成为 dp
	 */
	public static int px2dip(Context context, float pxValue) {
		final float scale = context.getResources().getDisplayMetrics().density;
		return (int) (pxValue / scale + 0.5f);
	}

	/**
	 * 根据手机的分辨率从 px(像素) 的单位 转成为 dp
	 */
	public static int px2dip(Resources res, float pxValue) {
		return (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_PX, pxValue, res.getDisplayMetrics());
	}

	public static void setViewSize(Context context, View view, int widthPX, int heightPX) {
		if (view instanceof EditText) {
			((EditText) view).setWidth(px2dip(context, widthPX));
			((EditText) view).setHeight(px2dip(context, heightPX));
		} else if (view instanceof Button) {
			((Button) view).setWidth(px2dip(context, widthPX));
			((Button) view).setHeight(px2dip(context, heightPX));
		} else if (view instanceof TextView) {
			((TextView) view).setWidth(px2dip(context, widthPX));
			((TextView) view).setHeight(px2dip(context, heightPX));
		}
	}

	public static String getDateTime() {
		Date curDate = new Date(System.currentTimeMillis());// 获取当前时间
		return chinese_formater.format(curDate);
	}

	public static int getDeviceWidth(Context context) {
		return context.getResources().getDisplayMetrics().widthPixels;
	}

	public static int getDeviceHeight(Context context) {
		return context.getResources().getDisplayMetrics().heightPixels;
	}

	/**
	 * 获取apk的版本信息
	 */
	public static String getVersion(Context context) {
		String versionname;
		PackageManager pm = context.getPackageManager();
		try {
			PackageInfo info = pm.getPackageInfo(context.getPackageName(), 0);
			versionname = info.versionName;
			return versionname;
		} catch (PackageManager.NameNotFoundException e) {
			e.printStackTrace();
			return "1.0";
		}
	}

	/**
	 * 计算两个时间之间相差多少
	 * 
	 * @param begin
	 * @param end
	 * @return
	 */
	public static long getTimeLeave(String begin, String end) {
		java.util.Date endDate = null;
		java.util.Date beginDate = null;
		try {
			endDate = common_formater.parse(end);
			beginDate = common_formater.parse(begin);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return endDate.getTime() - beginDate.getTime();
	}

	public static String getTimeLeaveString(long timeleave) {
		long day = timeleave / (24 * 60 * 60 * 1000);
		long hour = (timeleave / (60 * 60 * 1000) - day * 24);
		long min = ((timeleave / (60 * 1000)) - day * 24 * 60 - hour * 60);
		long s = (timeleave / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60);
		return "" + day + "天" + hour + "小时" + min + "分" + s + "秒";
	}

	public static void setListViewHeightBasedOnChildren(ListView listView) {

		ListAdapter listAdapter = listView.getAdapter();
		if (listAdapter == null) {
			return;
		}

		int totalHeight = 0;
		for (int i = 0; i < listAdapter.getCount(); i++) {
			View listItem = listAdapter.getView(i, null, listView);
			listItem.measure(0, 0);
			totalHeight += listItem.getMeasuredHeight() + 5;
		}

		ViewGroup.LayoutParams params = listView.getLayoutParams();
		params.height = totalHeight + (listView.getDividerHeight() * (listAdapter.getCount() - 1));
		listView.setLayoutParams(params);
	}

	/**
	 * 关闭软件盘
	 * 
	 * @param activity
	 *            当前的Activity
	 */
	public static void closeSoftInput(Activity activity) {
		if (null == activity) {
			return;
		}
		InputMethodManager inputMethodManager = (InputMethodManager) activity.getSystemService(Context.INPUT_METHOD_SERVICE);
		if (inputMethodManager.isActive()) {
			View currentFocusView = activity.getCurrentFocus();
			if (null != currentFocusView) {
				inputMethodManager.hideSoftInputFromWindow(currentFocusView.getWindowToken(), 0);
			}
		}
	}
}
