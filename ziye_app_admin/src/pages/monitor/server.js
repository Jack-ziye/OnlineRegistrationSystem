import "@/styles/server-wapper.scss";
import { http } from "@/utils";
import { Statistic, Progress } from "antd";
import React, { useEffect, useState } from "react";

const ServerComponent = () => {
  const [info, setInfo] = useState({ cpu: {}, jvm: {}, mem: {} });

  const getColor = (value, sort) => {
    if ((sort && value <= 20) || (!sort && value >= 60)) {
      return "#3f8600";
    } else if ((sort && value <= 40) || (!sort && value >= 40)) {
      return "#409EFF";
    } else if ((sort && value <= 60) || (!sort && value >= 20)) {
      return "#E6A23C";
    } else {
      return "#F56C6C";
    }
  };

  useEffect(() => {
    (async () => {
      const res = await http.get("/monitor/server");
      setInfo(res);
    })();
  }, []);

  return (
    <div className="server-wapper">
      <div className="header-wapper">
        <div className="chart_card">
          <div className="value">{info.cpu.num || 0}</div>
          <div className="label">CPU核心数</div>
        </div>
        <div className="chart_card">
          <div className="value" style={{ color: getColor(info.cpu.systemRate || 0, true) }}>
            {info.cpu.systemRate || 0}%
          </div>
          <div className="label">系统CPU使用率</div>
        </div>
        <div className="chart_card">
          <div className="value" style={{ color: getColor(info.cpu.usedRate || 0, true) }}>
            {info.cpu.usedRate || 0}%
          </div>
          <div className="label">用户CPU使用率</div>
        </div>
        <div className="chart_card">
          <div className="value" style={{ color: getColor(info.cpu.freeRate || 100, false) }}>
            {info.cpu.freeRate || 100}%
          </div>
          <div className="label">当前CPU空闲率</div>
        </div>
      </div>

      <div className="card-wapper">
        <div className="title">仪表盘</div>
        <div className="progress_card">
          <div className="progress_card-item">
            <Progress type="dashboard" percent={info.cpu.totalRate} strokeColor={getColor(info.cpu.totalRate, true)} />
            <div className="label">CPU使用率</div>
          </div>
          <div className="progress_card-item">
            <Progress type="dashboard" percent={info.mem.usageRate} strokeColor={getColor(info.mem.usageRate, true)} />
            <div className="label">内存使用率</div>
          </div>
          <div className="progress_card-item">
            <Progress type="dashboard" percent={info.jvm.usageRate} strokeColor={getColor(info.jvm.usageRate, true)} />
            <div className="label">JVM使用率</div>
          </div>
          <div className="progress_card-item">
            <Progress type="dashboard" percent={40.76} strokeColor={getColor(40.76, true)} />
            <div className="label">磁盘使用率</div>
          </div>
        </div>
      </div>

      <div className="card-wapper">
        <div className="title">内存</div>
        <div className="chart_card">
          <div className="chart_card-item">
            <div className="label">服务器总内存</div>
            <div className="content">
              <Statistic title="内存" valueStyle={{ color: "#3f8600" }} value={info.mem.total} suffix="G" />
              <Statistic title="JVM" valueStyle={{ color: "#cf1322" }} value={info.jvm.total} suffix="M" />
            </div>
          </div>
          <div className="chart_card-item">
            <div className="label">已用内存</div>
            <div className="content">
              <Statistic title="内存" valueStyle={{ color: "#3f8600" }} value={info.mem.used} suffix="G" />
              <Statistic title="JVM" valueStyle={{ color: "#cf1322" }} value={info.jvm.used} suffix="M" />
            </div>
          </div>
          <div className="chart_card-item">
            <div className="label">剩余内存</div>
            <div className="content">
              <Statistic title="内存" valueStyle={{ color: "#3f8600" }} value={info.mem.free} suffix="G" />
              <Statistic title="JVM" valueStyle={{ color: "#cf1322" }} value={info.jvm.free} suffix="M" />
            </div>
          </div>
          <div className="chart_card-item">
            <div className="label">使用率</div>
            <div className="content">
              <Statistic title="内存" valueStyle={{ color: "#3f8600" }} value={info.mem.usageRate} suffix="%" />
              <Statistic title="JVM" valueStyle={{ color: "#cf1322" }} value={info.jvm.usageRate} suffix="%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerComponent;
