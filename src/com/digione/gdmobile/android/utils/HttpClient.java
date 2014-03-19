package com.digione.gdmobile.android.utils;

import android.content.Context;
import android.util.Log;

import com.digione.gdmobile.android.R;
import com.digione.gdmobile.android.common.Constants;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.PersistentCookieStore;
import com.loopj.android.http.RequestParams;

/**
 * 网络请求 youzh
 */
public class HttpClient {

	/**
	 * 静态本地cookie
	 */
	private static PersistentCookieStore myCookieStore;
	private final String BASE_URL;
	private AsyncHttpClient asyncClient = null;
	private Context context;

	private HttpClient() {
		this.BASE_URL = null;
	}

	// 获取网站根路径
	public String getBaseUrl() {
		return BASE_URL;
	}

	/**
	 * 异步请求模式的构造方法
	 * 
	 * @param context
	 *            界面Context
	 */
	private HttpClient(Context context) {
		this.context = context;
		this.asyncClient = new AsyncHttpClient();
		this.BASE_URL = context.getResources().getString(R.string.data_base_url);
		myCookieStore = new PersistentCookieStore(context);
		this.asyncClient.setCookieStore(myCookieStore);
	}

	/**
	 * 获取异步模式的HttpClient的实例
	 * 
	 * @param context
	 *            界面Context
	 * @return 异步模式的HttpClient的实例
	 */
	public static HttpClient getInstall(Context context) {
		HttpClient install = new HttpClient(context);
		return install;
	}

	/**
	 * 异步模式GET请求
	 * 
	 * @param url
	 *            请求URL
	 * @param params
	 *            参数
	 * @param responseHandler
	 *            处理返回数据的Handler
	 */
	public void getAsync(String url, RequestParams params, AsyncHttpResponseHandler responseHandler) {
		if (!HttpUtil.isHasNetwork(context)) {

		} else {
			asyncClient.get(getAbsoluteUrl(url), params, responseHandler);
		}
	}

	/**
	 * 异步模式POST请求
	 * 
	 * @param url
	 *            请求URL
	 * @param params
	 *            参数
	 * @param responseHandler
	 *            处理返回数据的Handler
	 */
	public void postAsync(String url, RequestParams params, AsyncHttpResponseHandler responseHandler) {
		if (!HttpUtil.isHasNetwork(context)) {

		} else {
			asyncClient.post(getAbsoluteUrl(url), params, responseHandler);
		}
	}

	/**
	 * 获取完整的URL
	 * 
	 * @param relativeUrl
	 *            相对的URL
	 * @return 完整的URL
	 */
	private String getAbsoluteUrl(String relativeUrl) {
		if (relativeUrl.startsWith("http:")) {
			Log.i(Constants.TAG, "请求网络的URL为" + relativeUrl);
			return relativeUrl;
		}
		Log.i(Constants.TAG, "请求网络的URL为" + BASE_URL + relativeUrl);
		return BASE_URL + relativeUrl;
	}

	/**
	 * 清楚Cookie
	 */
	public static void clearCookie() {
		if (myCookieStore != null) {
			myCookieStore.clear();
		}
	}

}
