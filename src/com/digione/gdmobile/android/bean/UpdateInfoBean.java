package com.digione.gdmobile.android.bean;

import java.io.Serializable;

/**
 * 版本
 * 
 * @author 尤振华
 */
public class UpdateInfoBean implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4130420942151069813L;
	private String version;
	private boolean force;
	private String url;
	private String desc;

	public UpdateInfoBean() {
	}

	public UpdateInfoBean(boolean isnew, String version, boolean force, String url) {

		this.version = version;
		this.force = force;
		this.url = url;
	}

	public double getVersion() {
		return Double.valueOf(version);
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public boolean isForce() {
		return force;
	}

	public void setForce(boolean force) {
		this.force = force;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}
}
