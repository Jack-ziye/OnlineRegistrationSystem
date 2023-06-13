import { http, getToken, removeToken } from "../utils";
import { makeAutoObservable } from "mobx";

class User {
  userInfo = {};

  constructor() {
    makeAutoObservable(this);
  }
  getUserInfo = async () => {
    if (!getToken()) return;
    const res = await http.get("/user/current");
    this.userInfo = res;
  };
  clearUserInfo = () => {
    this.userInfo = {};
    removeToken();
  };
}

export default User;
