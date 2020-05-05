/**
 * 工具类
 */
import CryptoJS from 'crypto-js'
export default {
  encrypt (key, str) {
    var keyStr = CryptoJS.MD5(key).toString().substring(8, 24)
    key = CryptoJS.enc.Utf8.parse(keyStr)
    var iv = key
    var AESPass = CryptoJS.AES.encrypt(str, key, {
      iv: iv,
      // 补齐方式 CBC,ECB,etc.
      mode: CryptoJS.mode.CBC,
      // 偏移规则设定  pack5，pkcs7，nopadding,etc.
      padding: CryptoJS.pad.ZeroPadding
    })
    return AESPass.toString()
  },
  // 解密
  decrypt (word, keyStr) {
    var key = CryptoJS.enc.Utf8.parse(keyStr)
    var decrypt = CryptoJS.AES.decrypt(word, key, {
      // 补齐方式 CBC,ECB,etc.
      mode: CryptoJS.mode.CBC,
      // 偏移规则设定  pack5，pkcs7，nopadding,etc.
      padding: CryptoJS.pad.ZeroPadding
    })
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  }
}
