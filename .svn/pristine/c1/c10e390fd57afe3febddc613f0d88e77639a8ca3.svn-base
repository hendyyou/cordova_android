package com.digione.gdmobile.android.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Intent;

import com.digione.gdmobile.android.common.Constants;

public class GoToHome extends CordovaPlugin {

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		try {
			if (Constants.GOTO_HOME.equals(action)) {
				Intent intent = new Intent(Intent.ACTION_MAIN);
				intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
				// 如果intent不指定category，那么无论intent filter的内容是什么都应该是匹配的。
				intent.addCategory(Intent.CATEGORY_HOME);
				this.cordova.getActivity().startActivity(intent);
				return true;
				// 清除缓存
			} else if (Constants.CLEAR_MEMORY.equals(action)) {
				this.webView.clearCache(true);
			}

			return false;
		} catch (Exception e) {
			callbackContext.error(e.getMessage());
		}
		return false;
	}

}