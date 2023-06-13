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

    const data = {
      key: Math.random().toString(16).substring(2),
      value: value,
      createTime: new Date().getTime(),
    };

    const encryptStr = CryptoJS.AES.encrypt(JSON.stringify(data), aseKey, option).toString();

    return encryptStr.replace(/\//g, ".").replace(/\+/g, "_").replace("==", "");
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
    value = `${value}==`.replace(/\./g, "/").replace(/_/g, "+");
    const data = CryptoJS.AES.decrypt(value, aseKey, option).toString(CryptoJS.enc.Utf8);

    return JSON.parse(data).value;
  };

  return { encrypt, decrypt };
};

export default crypto();
