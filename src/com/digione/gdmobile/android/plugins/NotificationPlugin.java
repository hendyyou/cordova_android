package com.digione.gdmobile.android.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;

import com.digione.gdmobile.android.R;
/**
 * 将信息显示在系统状态栏中。
 * @author zhangqr
 *
 */
public class NotificationPlugin extends CordovaPlugin {
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		if ("send".equals(action)) {
			NotificationManager manager = (NotificationManager) this.cordova.getActivity().getSystemService(
					Context.NOTIFICATION_SERVICE);

			String title = args.getString(0);
			String text = args.getString(1);
			String callbackString = args.getString(2);
			Notification notification = new Notification(R.drawable.icon, text, System.currentTimeMillis());
			notification.defaults = Notification.DEFAULT_ALL;
			notification.flags |= Notification.FLAG_AUTO_CANCEL;
			Intent intent = this.cordova.getActivity().getIntent();
			intent.putExtra("messageCallback", callbackString);
			notification.setLatestEventInfo(this.cordova.getActivity(), title, text,
					PendingIntent.getActivity(this.cordova.getActivity(), 0, intent, PendingIntent.FLAG_UPDATE_CURRENT));

			manager.notify(1, notification);

			return true;
		} else {
			return false;
		}
	}
}
