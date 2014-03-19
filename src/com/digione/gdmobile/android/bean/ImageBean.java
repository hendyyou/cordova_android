package com.digione.gdmobile.android.bean;

import java.io.Serializable;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: youzh
 * Date: 13-12-20
 * Time: 上午9:37
 */
public class ImageBean implements Serializable {

    private static final long serialVersionUID = 4130420942151069847L;

    private  Float version;

    private List<String> urls;

    public Float getVersion() {
        return version;
    }

    public void setVersion(Float version) {
        this.version = version;
    }

    public List<String> getUrls() {
        return urls;
    }

    public void setUrls(List<String> urls) {
        this.urls = urls;
    }
}
