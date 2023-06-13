import React, { lazy, Suspense } from "react";
import { BrowserRouter as RouterMode, Routes, Route } from "react-router-dom";

import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

import LoadingComponent from "@/components/LoadingComponent";

// import Login from "@/pages/login";
import AuthComponent from "@/components/AuthComponent";
import LayoutComponent from "@/components/LayoutComponent";

import Index from "@/pages/index";
import UserProfile from "@/pages/user/profile";
import UserSetting from "@/pages/user/setting";
import SystemNotice from "@/pages/system/notice";
import SystemNoticePush from "@/pages/system/noticePush";
import SystemInform from "@/pages/system/inform";
import SystemUser from "@/pages/system/user";
import SystemRole from "@/pages/system/role";
import SystemRoleAssginUser from "@/pages/system/assignUser";
import SystemMenu from "@/pages/system/menu";
import SystemDict from "@/pages/system/dict";
import SystemConfig from "@/pages/system/config";
import SystemLogInfo from "@/pages/system/logInfo";

import MonitorOnline from "@/pages/monitor/online";
import MonitorServer from "@/pages/monitor/server";
import MonitorCache from "@/pages/monitor/cache";
import PfNews from "@/pages/pf/news";
import PfNewsEditor from "@/pages/pf/newsEditor";
import PfNewsDetails from "@/pages/pf/newsDetails";
import PfCategory from "@/pages/pf/category";
import PfTalent from "@/pages/pf/talent";
import PfTalentDetails from "@/pages/pf/talentDetails";
import PfProject from "@/pages/pf/project";
import PfProjectEditor from "@/pages/pf/projectEditor";
import PfProjectDetails from "@/pages/pf/projectDetails";
import PfApply from "@/pages/pf/apply";
import PfApplyDetails from "@/pages/pf/applyDetails";

// -------------------------------------------------------------------------

const Login = lazy(() => import("@/pages/login"));
/*
const AuthComponent = lazy(() => import("@/components/AuthComponent"));
const LayoutComponent = lazy(() => import("@/components/LayoutComponent"));

const Index = lazy(() => import("@/pages/index"));
const UserProfile = lazy(() => import("@/pages/user/profile"));
const UserSetting = lazy(() => import("@/pages/user/setting"));
const SystemNotice = lazy(() => import("@/pages/system/notice"));
const SystemUser = lazy(() => import("@/pages/system/user"));
const SystemRole = lazy(() => import("@/pages/system/role"));
const SystemRoleAssginUser = lazy(() => import("@/pages/system/assignUser"));
const SystemMenu = lazy(() => import("@/pages/system/menu"));
const SystemDict = lazy(() => import("@/pages/system/dict"));
const SystemConfig = lazy(() => import("@/pages/system/config"));
const SystemLogInfo = lazy(() => import("@/pages/system/logInfo"));
const MonitorOnline = lazy(() => import("@/pages/monitor/online"));
const MonitorServer = lazy(() => import("@/pages/monitor/server"));
const MonitorCache = lazy(() => import("@/pages/monitor/cache"));
const PfNews = lazy(() => import("@/pages/pf/news"));
const PfNewsEditor = lazy(() => import("@/pages/pf/newsEditor"));
const PfNewsDetails = lazy(() => import("@/pages/pf/newsDetails"));
const PfCategory = lazy(() => import("@/pages/pf/category"));
const PfTalent = lazy(() => import("@/pages/pf/talent"));
const PfTalentDetails = lazy(() => import("@/pages/pf/talentDetails"));
const PfProject = lazy(() => import("@/pages/pf/project"));
const PfProjectEditor = lazy(() => import("@/pages/pf/projectEditor"));
const PfProjectDetails = lazy(() => import("@/pages/pf/projectDetails"));
const PfApply = lazy(() => import("@/pages/pf/apply"));
const PfApplyDetails = lazy(() => import("@/pages/pf/applyDetails"));
*/

function App() {
  return (
    <>
      <div className="App">
        <LoadingComponent />
        <ConfigProvider locale={zhCN}>
          <RouterMode>
            <Suspense fallback={<LoadingComponent />}>
              <Routes>
                <Route path="/login" element={<Login />} />

                <Route
                  path="/"
                  element={
                    <AuthComponent>
                      <LayoutComponent />
                    </AuthComponent>
                  }
                >
                  <Route index element={<Index />}></Route>
                  <Route path="/user/profile" element={<UserProfile />}></Route>
                  <Route path="/user/setting" element={<UserSetting />}></Route>

                  <Route path="/system/inform" element={<SystemInform />}></Route>
                  <Route path="/system/notice" element={<SystemNotice />}></Route>
                  <Route path="/system/notice/push" element={<SystemNoticePush />}></Route>
                  <Route path="/system/user" element={<SystemUser />}></Route>
                  <Route path="/system/role" element={<SystemRole />}></Route>
                  <Route path="/system/role/assgin/user" element={<SystemRoleAssginUser />}></Route>
                  <Route path="/system/menu" element={<SystemMenu />}></Route>
                  <Route path="/system/dict" element={<SystemDict />}></Route>
                  <Route path="/system/config" element={<SystemConfig />}></Route>
                  <Route path="/system/log-info" element={<SystemLogInfo />}></Route>

                  <Route path="/monitor/online" element={<MonitorOnline />}></Route>
                  <Route path="/monitor/server" element={<MonitorServer />}></Route>
                  <Route path="/monitor/cache" element={<MonitorCache />}></Route>

                  <Route path="/pf/news" element={<PfNews />}></Route>
                  <Route path="/pf/news/add" element={<PfNewsEditor />}></Route>
                  <Route path="/pf/news/editor" element={<PfNewsEditor />}></Route>
                  <Route path="/pf/news/details" element={<PfNewsDetails />}></Route>

                  <Route path="/pf/category" element={<PfCategory />}></Route>

                  <Route path="/pf/talent" element={<PfTalent />}></Route>
                  <Route path="/pf/talent/details" element={<PfTalentDetails />}></Route>

                  <Route path="/pf/project" element={<PfProject />}></Route>
                  <Route path="/pf/project/add" element={<PfProjectEditor />}></Route>
                  <Route path="/pf/project/editor" element={<PfProjectEditor />}></Route>
                  <Route path="/pf/project/details" element={<PfProjectDetails />}></Route>

                  <Route path="/pf/apply" element={<PfApply />}></Route>
                  <Route path="/pf/apply/details" element={<PfApplyDetails />}></Route>
                </Route>
              </Routes>
            </Suspense>
          </RouterMode>
        </ConfigProvider>
      </div>
    </>
  );
}

export default App;
