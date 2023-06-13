import React from "react";
import UserStore from "./user.Store";

class RootStore {
  constructor() {
    this.userStore = new UserStore();
  }
}

const rootStore = new RootStore();

const context = React.createContext(rootStore);
const useStore = () => React.useContext(context);

export { useStore };
