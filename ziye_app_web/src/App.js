import React from "react";
import { BrowserRouter as RouterMode, Routes, Route } from "react-router-dom";

import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

import LayoutComponent from "@/components/LayoutComponent";

import Index from "@/pages/index";
import News from "@/pages/news";
import NewsDetails from "@/pages/newsDetails";
import SignUp from "@/pages/signUp";
import Project from "@/pages/project";

import Login from "@/pages/login";
import Register from "@/pages/register";

import AuthComponent from "@/components/AuthComponent";
import UserLayoutComponent from "@/components/UserLayoutComponent";
import ProfileInfo from "@/pages/profile/info";
import ProfileSecurity from "@/pages/profile/security";
import ProfileApply from "@/pages/profile/apply";
import ProfileApplyAdd from "@/pages/profile/applyAdd";
import ProfileApplyDetails from "@/pages/profile/applyDetails";

import ApplyPay from "@/pages/applyPay";

function App() {
  return (
    <>
      <div className="App">
        <ConfigProvider locale={zhCN}>
          <RouterMode>
            <Routes>
              <Route path="/" element={<LayoutComponent />}>
                <Route index element={<Index />}></Route>
                <Route path="news" element={<News />}></Route>
                <Route path="news/details/:id" element={<NewsDetails />}></Route>
                <Route path="sign-up" element={<SignUp />}></Route>
                <Route path="project/:id" element={<Project />}></Route>
                <Route
                  path="apply/add/:id"
                  element={
                    <AuthComponent>
                      <ProfileApplyAdd />
                    </AuthComponent>
                  }
                ></Route>
              </Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="register" element={<Register />}></Route>

              <Route path="apply-pay/:pid/:tid" element={<ApplyPay />}></Route>

              <Route
                path="profile"
                element={
                  <AuthComponent>
                    <UserLayoutComponent />
                  </AuthComponent>
                }
              >
                <Route index element={<ProfileInfo />}></Route>
                <Route path="security" element={<ProfileSecurity />}></Route>
                <Route path="apply" element={<ProfileApply />}></Route>
                <Route path="apply/details/:id" element={<ProfileApplyDetails />}></Route>
              </Route>
            </Routes>
          </RouterMode>
        </ConfigProvider>
      </div>
    </>
  );
}

export default App;
