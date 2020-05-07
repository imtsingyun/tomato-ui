/**
 * 工具类
 */
import CryptoJS from 'crypto-js'

export default {
  encrypt (theKey, str) {
    var keyStr = CryptoJS.MD5(theKey).toString().substring(8, 24)
    console.log('keyStr = ' + keyStr)
    var key = CryptoJS.enc.Utf8.parse(keyStr)
    console.log('key = ' + key)
    var iv = key
    var AESPass = CryptoJS.AES.encrypt(str, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    })
    return AESPass.toString()
  }
}
