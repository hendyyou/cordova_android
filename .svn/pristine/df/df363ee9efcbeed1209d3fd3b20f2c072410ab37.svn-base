package com.digione.gdmobile.android;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.os.SystemClock;
import com.digione.gdmobile.android.common.LogCustom;

public class TimeService extends Service {

	@Override
	public void onStart(Intent intent, int startId) {
		super.onStart(intent, startId);
		LogCustom.d("...timeService start...");
		Intent mintent = new Intent();
		mintent.setAction("wakeup");
		PendingIntent pIntent = PendingIntent.getBroadcast(this, 0, mintent, 0);
		long startTime = SystemClock.elapsedRealtime();// 开始时间
		AlarmManager alarmManager = (AlarmManager) getSystemService(ALARM_SERVICE);
		// 启动1分钟后开始广播，每当配置时间（message_interval）到了将发送pIntent这个广播，在alarmReceiver中接受广播,决定是否向服务器请求公告消息。
		alarmManager.setRepeating(AlarmManager.ELAPSED_REALTIME_WAKEUP, startTime+6000000,
				Integer.parseInt(getResources().getString(R.string.message_interval)), pIntent);
	}

	@Override
	public IBinder onBind(Intent arg0) {
		return null;
	}
}