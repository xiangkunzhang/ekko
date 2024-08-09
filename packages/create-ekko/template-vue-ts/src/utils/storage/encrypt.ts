/**
 * encrypt
 * @file 利用crypto-js 进行前端AES加密解密实现.
 * @author Ekko Zhang <zxk_q@qq.com>
 * @copyright Ekko Zhang 2023
 */
import CryptoJS from 'crypto-js'

/**
 * Encrypt
 * @description 加密解密
 * @class [Encrypt]
 * */
class Encrypt {
  /**
   * key
   * @description 加密秘钥 长度为16的整数倍
   */
  private readonly key: CryptoJS.lib.WordArray
  /**
   * key
   * @description 十六位十六进制数作为密钥偏移量
   */
  private readonly iv: CryptoJS.lib.WordArray

  constructor(key, iv) {
    this.key = this.parseKey(key)
    this.iv = this.parseKey(iv)
  }

  aesEncrypt(msg: string): string {
    if (!msg) {
      return ''
    }
    const { key, cfg } = this.getEncParam()
    const res = CryptoJS.AES.encrypt(msg, key, cfg)
    return res.toString()
  }

  aesDecrypt(msg: string): string {
    if (!msg) {
      return ''
    }
    const { key, cfg } = this.getEncParam()
    const bytes = CryptoJS.AES.decrypt(msg, key, cfg)
    return bytes.toString(CryptoJS.enc.Utf8)
  }

  private parseKey(val: string): CryptoJS.lib.WordArray {
    return CryptoJS.enc.Hex.parse(val)
  }

  private getEncParam() {
    return {
      key: this.key,
      cfg: {
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    }
  }
}

const defaultIV = '101112131415161718191a1b1c1d1e1f'

const defaultKey = '000102030405060708090a0b0c0d0e0f'

export const EkkoEncrypt = new Encrypt(defaultKey, defaultIV)
