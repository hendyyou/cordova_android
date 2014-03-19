package com.digione.gdmobile.android.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Intent;
import android.net.Uri;
import android.telephony.PhoneNumberUtils;

import com.digione.gdmobile.android.R;

/**
 * 用于拨打电话的插件
 * 
 * @author zhangqr
 * 
 */
public class Phone extends CordovaPlugin {

	private static final int PHONE_CALL = 0; // 拨打电话

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		try {

			if ("call".equals(action)) {
				this.call(args.getString(0), callbackContext);
				return true;
			}

			return false;
		} catch (Exception e) {
			callbackContext.error(e.getMessage());
		}
		return false;
	}

	// 拨打电话
	private void call(String phonenumber, CallbackContext callbackContext) {

		if (phonenumber != null && phonenumber.length() > 0) {

			if (PhoneNumberUtils.isGlobalPhoneNumber(phonenumber)) {
				Intent i = new Intent();
				i.setAction(Intent.ACTION_CALL);
				i.setData(Uri.parse("tel:" + phonenumber));
				// LogCustom.d("phone=" + phonenumber);
				this.cordova.startActivityForResult(this, i, PHONE_CALL);

			} else {
				callbackContext.error(phonenumber + this.cordova.getActivity().getString(R.string.wrong_number));
			}
		} else {
			callbackContext.error(this.cordova.getActivity().getString(R.string.empty_number));
		}
	}
}