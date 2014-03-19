package com.digione.gdmobile.android.common;

import android.util.Xml;
import com.digione.gdmobile.android.bean.ImageBean;
import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: youzh
 * Date: 13-12-20
 * Time: 上午9:53
 */
public final class ImageUpdateXmlParse {


    /**
     * 对XML进行解析
     *
     * @param in 输入流
     * @return 集合
     */
    public static  ImageBean doParse(InputStream in) {
        ImageBean imageBean = null;
        String tagName = null;
         List<String> urls = null;
        XmlPullParser parser = Xml.newPullParser();
        try {
            parser.setInput(in,"utf-8");
            //获取事件类型
            int eventType=parser.getEventType();
            while(eventType!=XmlPullParser.END_DOCUMENT){
                switch(eventType){
                    //文档开始
                    case XmlPullParser.START_DOCUMENT:
                        imageBean=new ImageBean();
                        break;
                    case XmlPullParser.START_TAG:
                        tagName = parser.getName();
                        if("version".equalsIgnoreCase(tagName)){
                            imageBean.setVersion(Float.parseFloat(parser.nextText()) );
                        }else if("urls".equals(tagName)){
                           urls =new  ArrayList<String> ();
                        }else if("url".equals(tagName)){
                            urls.add(parser.nextText()) ;
                        }
                        break;
                    case XmlPullParser.END_TAG:
                        tagName = parser.getName();
                        if("urls".equals(parser.getName())){
                            imageBean.setUrls(urls);
                        }
                        break;
                }
                eventType=parser.next();
            }
        } catch (XmlPullParserException e) {
           LogCustom.e("pic_updatge解析出错:"+e.getMessage());
        }catch (IOException e) {
            LogCustom.e("pic_updatge解析出错:" + e.getMessage());
        } finally {
            try {
                in.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return imageBean;
    }
}
