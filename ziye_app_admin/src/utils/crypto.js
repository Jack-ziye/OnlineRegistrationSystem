import CryptoJS from "crypto-js";

const crypto = () => {
  const SECRET_KEY = "_AES_ziye_randi_";

  // 参数配置
  const aseKey = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const option = {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  };

  /**
   * 加密
   *
   * @param {*} value
   * @returns
   */
  const encrypt = (value) => {
    if (value === undefined || value === null) {
      return;
    }

    return CryptoJS.AES.encrypt(value, aseKey, option).toString();
  };

  /**
   * 解密
   *
   * @param {*} value
   * @returns
   */
  const decrypt = (value) => {
    if (value === undefined || value === null) {
      return;
    }

    return CryptoJS.AES.decrypt(value, aseKey, option).toString(CryptoJS.enc.Utf8);
  };

  return { encrypt, decrypt };
};

export default crypto();
