package com.digione.gdmobile.android.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.DialogInterface;
import android.content.DialogInterface.OnCancelListener;

import com.digione.gdmobile.android.common.Constants;
import com.digione.gdmobile.android.common.CustomProgressDialog;
import com.digione.gdmobile.android.common.LogCustom;

/**
 * 显示等待对话框的插件
 * 
 * @author Administrator
 * 
 */
public class LoadingDialog extends CordovaPlugin {

	private CustomProgressDialog loadingDialog = null;
	private int dialogCount = 0; // 动画对话框的个数

	public LoadingDialog() {

	}

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		if (Constants.LOADING_DIALOG_START.equals(action)) {
			this.loadingStart(args.getString(0));
		} else if (Constants.LOADING_DIALOG_STOP.equals(action)) {
			this.loadingStop(args.getBoolean(0));
		} else {
			return false;
		}

		// Only alert and confirm are async.
		callbackContext.success();
		return true;
	}

	/**
	 * 
	 * 
	 * @param message
	 *            The message of the dialog
	 */
	public synchronized void loadingStart(final String message) {
		final CordovaInterface cordova = this.cordova;
		Runnable runnable = new Runnable() {
			public void run() {
				if (LoadingDialog.this.loadingDialog == null || !LoadingDialog.this.loadingDialog.isShowing()) {
					LoadingDialog.this.loadingDialog = CustomProgressDialog.createDialog(cordova.getActivity());
					LoadingDialog.this.loadingDialog.setOnCancelListener(new OnCancelListener() {
						@Override
						public void onCancel(DialogInterface dialog) {
							LoadingDialog.this.dialogCount--;
							LogCustom.d("onCancel dialogCount:" + LoadingDialog.this.dialogCount);
						}
					});
					LoadingDialog.this.loadingDialog.setCancelable(true);
					LoadingDialog.this.loadingDialog.setCanceledOnTouchOutside(false);
					loadingDialog.setMessage(message);
					loadingDialog.show();
				}
				LoadingDialog.this.dialogCount++;
				LogCustom.d("loadingStart dialogCount:" + LoadingDialog.this.dialogCount);
			}
		};
		cordova.getActivity().runOnUiThread(runnable);
	}

	/**
	 * Stop spinner.
	 */
	public synchronized void loadingStop(final boolean closeAll) {
		if (closeAll) {
			this.dialogCount = 0;
		} else {
			this.dialogCount--;
		}
		LogCustom.d("loadingStop dialogCount:" + this.dialogCount);
		if (this.dialogCount <= 0 && this.loadingDialog != null) {
			this.loadingDialog.dismiss();
			this.loadingDialog = null;
			this.dialogCount = 0;
		}
	}
}
