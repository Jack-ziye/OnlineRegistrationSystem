import { http, getToken, removeToken } from "../utils";
import { makeAutoObservable } from "mobx";

class User {
  userInfo = {};

  constructor() {
    makeAutoObservable(this);
  }
  setUserInfo = async () => {
    if (!getToken()) return;
    const res = await http.get("/talent/current");
    this.userInfo = res;
  };
  getUserInfo = () => {
    return { ...this.userInfo };
  };
  clearUserInfo = () => {
    this.userInfo = {};
    removeToken();
  };
}

export default User;
