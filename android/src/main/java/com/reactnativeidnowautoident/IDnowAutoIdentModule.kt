package com.reactnativeidnowautoident

import com.facebook.react.bridge.*
import de.idnow.core.*

class IDnowAutoIdentModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "IDnowAutoIdent"
  }

  @ReactMethod
  fun startAutoIdent(options: ReadableMap, promise: Promise) {
    val id = options.getString("id")
    val language = options.getString("language") ?: "de"
    if(id.isNullOrBlank()) {
      promise.reject("ID_NEEDED", "Please provide an id")
      return;
    }

    val idNowConfig = IDnowConfig.Builder.getInstance()
      .withLanguage(language)
      .build()

    val idNowInstance = IDnowSDK.getInstance()
    idNowInstance.initialize(currentActivity, idNowConfig)
    idNowInstance.startIdent(id, IDnowSDK.IDnowResultListener {
      iDnowResult: IDnowResult ->
        when (iDnowResult.iDnowStatusCode) {
          IDnowResult.IDnowStatusCode.FINISHED -> promise.resolve("SUCCESS")
          IDnowResult.IDnowStatusCode.CANCELLED -> promise.reject("CANCELLED", "verification cancelled")
          IDnowResult.IDnowStatusCode.ERROR -> promise.reject("ERROR", iDnowResult.message)
          else -> promise.reject("ERROR_UNSPECIFIED", "verification error (unspecified)")
        }
    })
  }

}
