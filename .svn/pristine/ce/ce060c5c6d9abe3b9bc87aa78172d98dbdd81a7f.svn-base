package com.digione.gdmobile.android.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Context;
import android.content.SharedPreferences;

import com.digione.gdmobile.android.common.Constants;

/**
 * Created with IntelliJ IDEA. User: youzh Date: 13-12-10 Time: 下午4:25
 */
public class PushSettingPlugin extends CordovaPlugin {
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

		if ("push_settting".equalsIgnoreCase(action)) {
			String pushKey = args.getString(0);
			String pushValue = args.getString(1);
			SharedPreferences preferences = this.cordova.getActivity().getSharedPreferences("push_policy_settting",
					Context.MODE_PRIVATE);
			SharedPreferences.Editor editor = preferences.edit();

			if (Constants.POLICY_PUSH.equalsIgnoreCase(pushKey)) {
				editor.putString(Constants.POLICY_PUSH, pushValue);
			} else if (Constants.ANNOUNCEMEN_PUSH.equalsIgnoreCase(pushKey)) {
				editor.putString(Constants.ANNOUNCEMEN_PUSH, pushValue);
			} else if (Constants.NIGHT_PUSH.equalsIgnoreCase(pushKey)) {
				editor.putString(Constants.NIGHT_PUSH, pushValue);
			} else {
				editor.putString(pushKey, pushValue);
			}

			editor.commit();

			return true;
		}
		return false;
	}
}
