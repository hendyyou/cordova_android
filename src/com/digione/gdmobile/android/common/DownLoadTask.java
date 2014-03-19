package com.digione.gdmobile.android.common;

import java.io.*;
import java.net.ConnectException;
import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ArrayBlockingQueue;

/**
 * 下载
 *
 * @author
 */
public class DownLoadTask implements Runnable {

   // private static final String TAG = "DownLoadTask";

    // 未知错误
    public static final int ERROR = 0;
    // 保存文件地址没有找到
    public static final int ERROR_FILENOTFOUND = 1;
    // 连接超时异常
    public static final int ERROR_CONNECTEXCEPTION = 2;
    // 子线程异常
    public static final int ERROR_THREAD = 4;

    // url地址
    private String url = "";

    // 线程数量
    private int threadCount = 4;
    // 保存地址
    private String savePath;
    // 毫秒
    public static int connectTimeout = 5000;
    // 持有下载线程的引用集合
    private List<DownLoadThread> threads;
    // 消息队列
    private ArrayBlockingQueue<DownMessage> msgQueue;
    // 消息缓存队列
    private ArrayBlockingQueue<DownMessage> bufferQueue;

    private DownInfo info;

    private DownlaodListener listener;

    // 是否继续下载
    private boolean flag;

    /**
     * 默认构造函数
     */
    private DownLoadTask() {
        msgQueue = new ArrayBlockingQueue<DownMessage>(100);
        bufferQueue = new ArrayBlockingQueue<DownMessage>(100);
    }

    /**
     * 下载一个存在线程的DwonInfo
     */
    public DownLoadTask(DownInfo info) {
        this();
        this.url = info.url;
        this.savePath = info.savePath;
        this.threadCount = info.threads.size();
        this.info = info;
    }

    /**
     * 下载一个新的路径
     *
     * @param url
     * @param savePath
     * @param threadId
     */
    public DownLoadTask(String url, String savePath, int threadId) {
        this();
        this.url = url;
        this.savePath = savePath;
        this.threadCount = threadId;
    }

    public void setListener(DownlaodListener listener) {
        this.listener = listener;
    }

    @Override
    public void run() {
        LogCustom.d("开始下载URL = " + url);
        HttpURLConnection conn = null;
        // 已完成总线程数
        int countSucess = 0;

        try {

            long starttime = System.currentTimeMillis();
            URL urlconn = new URL(url);
            conn = (HttpURLConnection) urlconn.openConnection();
            conn.setRequestProperty("Accept-Encoding", "identity");
            conn.setConnectTimeout(connectTimeout);
            int length = conn.getContentLength();
            int responseCode = conn.getResponseCode();

            // 下载失败
            if (HttpURLConnection.HTTP_OK != responseCode || length < 0) {            	
            	notifyListenerError(ERROR);
                return;
            }

            if (info != null) {
                if (info.length != length) {
                    LogCustom.d("地址数据已更改，重新下载");
                }
            }

            RandomAccessFile randFile = new RandomAccessFile(savePath, "rwd");
            randFile.setLength(length);

            // 开始下载
            start(length);

            int stop = 0;
            DownMessage msg;
            flag = true;
            while (threadCount != countSucess && flag && threadCount != stop) {
                msg = msgQueue.take();
                switch (msg.type) {
                    case DownMessage.MSG_SUCCESS:
                        countSucess++;
                        LogCustom.d("线程Id=" + msg.threadid + "已完成下载");
                        break;
                    case DownMessage.MSG_UPDATE:
                        // 更新进度
                        if (listener != null) {
                            listener.update(length, msg.data, msg.threadid,savePath);
                        }
                        break;
                    case DownMessage.MSG_ERROR:
                        flag = false;
                        for (DownLoadThread thread : threads) {
                            thread.canleDown();
                        }
                        break;
                    case DownMessage.MSG_STOP:
                        stop++;
                        break;
                }
                recyle(msg);
            }
            LogCustom.d("耗时" + (System.currentTimeMillis() - starttime));

        } catch (Throwable e) {
            if (e instanceof ConnectException) {
                notifyListenerError(ERROR_CONNECTEXCEPTION);
                LogCustom.e("连接异常", e);
            } else if (e instanceof FileNotFoundException) {
                notifyListenerError(ERROR_FILENOTFOUND);
                LogCustom.e( "文件路径错误", e);
            } else if (e instanceof SocketTimeoutException) {
                notifyListenerError(ERROR_FILENOTFOUND);
                LogCustom.e( "连接超时", e);
            } else {
                LogCustom.e( "连接超时", e);
            }

        } finally {
            if (conn != null) {
                conn.disconnect();
                conn = null;
            }
            if (listener != null) {
                listener.downLoadFinish(countSucess,savePath);
            }
            Release();
        }
    }

    // 取消下载
    public void cancel() {
        flag = false;
        Release();
    }

    private void start(int length) throws FileNotFoundException {
        // 如果apk内容大小小于线程数量
        if (length < threadCount) {
            threadCount = 1;
        }

        // 实例化下载线程List,里面没有DownLoadThread
        threads = new ArrayList<DownLoadThread>();

        DownLoadThread downLoadThread;
        int start = 0;

        // 如果线程数量大于1，计算每个线程下载文件的大小
        if (threadCount > 1) {

            //每个thread下载文件的大小
            int size = length / threadCount;
            int end;

            for (int i = 0; i < threadCount; i++) {
                // 最后一个线程下载文件的开始和接受位置
                if (i == threadCount - 1) {
                    start = i * size;
                    end = length - 1;
                } else {// 其他线程下载文件的开始和接受位置
                    start = i * size;
                    end = (i + 1) * size - 1;
                }// end if
                if (info != null) {
                    start += info.threads.get(i);
                }
                downLoadThread =
                        new DownLoadThread(start, end, new RandomAccessFile(savePath, "rwd"), url, i, msgQueue, bufferQueue);
                threads.add(downLoadThread);
                downLoadThread.start();
            }// end for
        } else {
            if (info != null) {
                start += info.threads.get(0);
            }
            downLoadThread = new DownLoadThread(start, length - 1, new RandomAccessFile(savePath, "rwd"), url, 0, msgQueue,
                                                bufferQueue);
            threads.add(downLoadThread);
            downLoadThread.start();
        }// end if (threadCount > 1)
    }

    /**
     * 如果监听器不为空通知发送错误
     *
     * @param type
     */
    private void notifyListenerError(int type) {
        if (listener != null) {
            listener.downLoadError(type);
        }
    }

    /**
     * 回收 DownMessage 对象
     *
     * @param msg
     */
    private void recyle(DownMessage msg) {
        if (flag) {
            msg.type = -1;
            msg.threadid = -1;
            bufferQueue.offer(msg);
        }
    }

    private void Release() {
        if (threads != null) {
            for (DownLoadThread thread : threads) {
                thread.canleDown();
            }
        }
        msgQueue = null;
        bufferQueue = null;
        info = null;
        listener = null;
    }

    /**
     * 下载线程
     *
     * @author 尤振华
     */
    public static class DownLoadThread extends Thread {

        // 开始位置
        private int start;
        // 结束位置
        private int end;
        // 存放的文件
        private RandomAccessFile file;
        private String url;
        private int threadid;
        private boolean flag = true;
        // 消息队列
        private ArrayBlockingQueue<DownMessage> queue;
        // 缓存队列
        private ArrayBlockingQueue<DownMessage> bufferMsg;
        // 消息
        private DownMessage msg;

        public DownLoadThread(int start, int end, RandomAccessFile file, String url, int threadid,
                              ArrayBlockingQueue<DownMessage> queue, ArrayBlockingQueue<DownMessage> bufferMsg) {
            this.start = start;
            this.end = end;
            this.file = file;
            this.url = url;
            this.threadid = threadid;
            this.queue = queue;
            this.bufferMsg = bufferMsg;
        }

        /**
         * 当出现错误调用方法，取消线程下载，让线程正常结束
         */
        public void canleDown() {
            flag = false;
        }

        @Override
        public void run() {
            InputStream is = null;
            HttpURLConnection conn = null;
            try {
                file.seek(start);

                URL connUrl = new URL(url);
                conn = (HttpURLConnection) connUrl.openConnection();
                conn.setRequestMethod("GET");
                conn.setRequestProperty("Accept-Encoding", "identity");
                conn.setConnectTimeout(DownLoadTask.connectTimeout);
                //注意设置Range属性
                conn.setRequestProperty("Range", "bytes=" + start + "-" + end);
                int responseCode = conn.getResponseCode();

                if (responseCode == HttpURLConnection.HTTP_PARTIAL || responseCode == HttpURLConnection.HTTP_OK) {
                    is = new BufferedInputStream(conn.getInputStream(), 8192);
                    byte[] buffer = new byte[8192];// 10K缓存
                    int len = 0;
                    while ((len = is.read(buffer)) != -1 && flag) {
                        file.write(buffer, 0, len);
                        sendMessage(DownMessage.MSG_UPDATE, len);
                    }
                    sendMessage(DownMessage.MSG_SUCCESS, 0);
                } else {
                    sendMessage(DownMessage.MSG_ERROR, 10);
                }
            } catch (Exception e) {
                e.printStackTrace();
                try {
                    sendMessage(DownMessage.MSG_ERROR, 0);
                } catch (InterruptedException e1) {
                    e1.printStackTrace();
                }

            } finally {
                try {
                    sendMessage(DownMessage.MSG_STOP, 0);
                } catch (InterruptedException e1) {
                    e1.printStackTrace();
                }
                if (file != null) {
                    try {
                        file.close();
                    } catch (IOException e) {
                    }
                }
                file = null;
                if (is != null) {
                    try {
                        is.close();
                    } catch (IOException e) {
                    }
                }
                is = null;
                if (conn != null) {
                    conn.disconnect();
                }
                conn = null;

                Release();
            }
        }

        private void sendMessage(int type, int data) throws InterruptedException {
            msg = bufferMsg.poll();
            if (msg == null) {
                msg = new DownMessage(type, data, threadid);
            } else {
                msg.type = type;
                msg.data = data;
                msg.threadid = threadid;
            }
            queue.put(msg);
        }

        private void Release() {
            file = null;
            queue = null;
            bufferMsg = null;
        }
    }

    /**
     * 下载消息
     *
     * @author 尤振华
     */
    public static class DownMessage {
        public static final int MSG_SUCCESS = 0;
        public static final int MSG_UPDATE = 1;
        public static final int MSG_ERROR = 2;
        public static final int MSG_STOP = 3;
        int type;
        int data;
        int threadid;

        public DownMessage(int type, int data, int threadid) {
            this.type = type;
            this.data = data;
            this.threadid = threadid;
        }
    }

    public static class DownInfo {
        private String url = ""; // url地址
        private String savePath; // 保存地址
        private int length;// 总长度

        /**
         * <线程, 已下载数量> 注意需要下载的所有线程
         */
        private Map<Integer, Integer> threads;

        public DownInfo(String url, String savePath, Map<Integer, Integer> threads) {
            this.url = url;
            this.savePath = savePath;
            this.threads = threads;
        }

        public int getLength() {
            return length;
        }

        public void setLength(int length) {
            this.length = length;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public String getSavePath() {
            return savePath;
        }

        public void setSavePath(String savePath) {
            this.savePath = savePath;
        }

        public Map<Integer, Integer> getThreads() {
            return threads;
        }

        public void setThreads(Map<Integer, Integer> threads) {
            this.threads = threads;
        }
    }

    public static interface DownlaodListener {
        void update(int total, int len, int threadid,String filePath);

        void downLoadFinish(int totalSucess,String filePath);

        void downLoadError(int type);
    }
}
