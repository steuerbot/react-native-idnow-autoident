import Foundation
import IDNowSDKCore

@objc(IDnowAutoIdent)
class IDnowAutoIdent: NSObject {

  @objc(startAutoIdent:withResolver:withRejecter:)
  func startAutoIdent(a: NSDictionary, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
      let language = a["language"] ?? "de"
      IDNowSDK.shared.start(token: a["id"], preferredLanguage: language, fromViewController: self, listener:{ (result: IDNowSDK.IdentResult, message: String) in
         if result == IDNowSDK.IdentResult.FINISHED {
             resolve("FINISHED")
         } else if result == IDNowSDK.IdentResult.CANCELLED {
             reject("CANCELLED")
         } else {
             reject("ERROR")
         }
      })
  }
}
