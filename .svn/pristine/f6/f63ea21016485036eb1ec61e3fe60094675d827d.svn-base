package com.digione.gdmobile.android;

import java.lang.reflect.Type;
import java.util.Calendar;

import org.json.JSONException;
import org.json.JSONObject;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

import com.digione.gdmobile.android.bean.MessageBean;
import com.digione.gdmobile.android.common.Constants;
import com.digione.gdmobile.android.common.LogCustom;
import com.digione.gdmobile.android.utils.HttpClient;
import com.digione.gdmobile.android.utils.HttpUtil;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import com.loopj.android.http.JsonHttpResponseHandler;
import com.loopj.android.http.RequestParams;

/**
 * 根据timeservice发来的信号，尝试获取服务器上的最新消息
 * 
 * @author zhangqr
 * 
 */
public class AlarmReceiver extends BroadcastReceiver {

	private RequestParams params = new RequestParams(); // 本界面请求所需带的参数

	private Context context;
	private Intent mainIntent;

	MessageBean messageBean;
	private JsonHttpResponseHandler jsonHttpResponseHandler = new JsonHttpResponseHandler() {
		public void onSuccess(JSONObject response) {
			LogCustom.d("messag:" + response.toString());
			SharedPreferences preferences = context.getSharedPreferences(Constants.PUSH_POLICY_SETTING, Context.MODE_PRIVATE);
			if (response == null || response.equals(JSONObject.NULL)) {
				return;
			}
			Gson gson = new Gson();
			Type comonType = new TypeToken<MessageBean>() {
			}.getType();
			try {
				if(response.isNull("entity")){
					return;
				}
				messageBean = gson.fromJson(response.getJSONObject("entity").toString(), comonType);
			} catch (JsonSyntaxException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return;
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return;
			}
			String lastMessageID = preferences.getString(Constants.LASTNEWSID, "");
			if (lastMessageID.equals(messageBean.getId())) {
				// 没有新的消息。不提醒。
				return;
			} else {
				// 保存新消息
				SharedPreferences.Editor editor = preferences.edit();
				editor.putString("lastID", messageBean.getId());
				editor.commit();
			}

			NotificationManager manager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

			Notification notification = new Notification(R.drawable.icon, messageBean.getContent(),
					System.currentTimeMillis());
			notification.defaults = Notification.DEFAULT_ALL;
			notification.flags |= Notification.FLAG_AUTO_CANCEL;
			mainIntent.setClass(context, MainActivity.class);
			mainIntent.putExtra(Constants.MESSAGE_CALLBACK_KEY,
					context.getString(R.string.notify_call_back) + "('" + messageBean.getKey() + "')");
			notification.setLatestEventInfo(context, messageBean.getTitle(), messageBean.getContent(),
					PendingIntent.getActivity(context, 0, mainIntent, PendingIntent.FLAG_UPDATE_CURRENT));

			manager.notify(1, notification);

		}		
	};

	public AlarmReceiver() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public void onReceive(Context context, Intent intent) {
		LogCustom.d("onReceive() start");
		this.context = context;
		this.mainIntent = new Intent();

		SharedPreferences preferences = context.getSharedPreferences(Constants.PUSH_POLICY_SETTING, Context.MODE_PRIVATE);
		// 如果不选夜间推送，22点到7点之间则不进行消息获取。
		if (!preferences.getString(Constants.NIGHT_PUSH, Constants.ON).equals(Constants.ON)) {
			long time = System.currentTimeMillis();
			final Calendar mCalendar = Calendar.getInstance();
			mCalendar.setTimeInMillis(time);
			int mHour = mCalendar.get(Calendar.HOUR_OF_DAY);
			if (mHour >= 22 || mHour < 7) {
				return;
			}
		}

		// context.startActivity(intent);
		if (HttpUtil.isHasNetwork(context)) {
			// ---是否推送政策(默认是推送)
			String policyString = preferences.getString(Constants.POLICY_PUSH, Constants.ON);
			// 是否推送公告(默认是推送)
			String announcementString = preferences.getString(Constants.ANNOUNCEMEN_PUSH, Constants.ON);
			// 勾选了政策
			if (Constants.ON.equals(policyString)) {
				// LogCustom.d("政策推送");
				params.put(Constants.TYPE, Constants.POLICY_PUSH);
				// 政策+公告
				if (Constants.ON.equals(announcementString)) {
					// LogCustom.d("全部推送");
					params.put(Constants.TYPE, Constants.ALL);
				}
			} else if (Constants.ON.equals(announcementString)) {
				// 只勾选了公告
				// LogCustom.d("公告推送");
				params.put(Constants.TYPE, Constants.ANNOUNCEMEN_PUSH);
			} else {
				// 啥都不勾选。那就不请求网络了。
				// LogCustom.d("不推送");
				return;
			}
			params.put(Constants.ANNOUNCEMEN_PUSH, announcementString);
			HttpClient userClient = HttpClient.getInstall(context);
			userClient.postAsync(context.getString(R.string.data_base_url) + context.getString(R.string.message_url),
					params, jsonHttpResponseHandler);
		}

	}

}