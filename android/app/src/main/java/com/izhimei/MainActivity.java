package com.izhimei;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import android.os.Bundle;

import com.umeng.analytics.MobclickAgent;
import com.umeng.socialize.UMShareAPI;
import com.izhimei.ReactBridge.uMeng.ShareModule;
import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactRootView;
import com.facebook.react.ReactActivityDelegate;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import android.content.res.Configuration;
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "izhimei";
  }


  @Override
  protected void onCreate(Bundle savedInstanceState) {
//    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
    ShareModule.initSocialSDK(this);
//    MobclickAgent.setSessionContinueMillis(1000);
  }

  @Override
  public void onResume() {
    super.onResume();
    android.util.Log.e("xxxxxx","onResume=");
//    MobclickAgent.onResume(this);
  }
  @Override
  protected void onPause() {
    super.onPause();
    android.util.Log.e("xxxxxx","onPause=");

    MobclickAgent.onPause(this);
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    //MobclickAgent.onKillProcess(this);
  }

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
        return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
      super.onConfigurationChanged(newConfig);
      Intent intent = new Intent("onConfigurationChanged");
      intent.putExtra("newConfig", newConfig);
      sendBroadcast(intent);
    }
}
