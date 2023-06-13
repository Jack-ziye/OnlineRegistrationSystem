package com.code.service.monitor.impl;

import com.code.entity.monitor.Cpu;
import com.code.entity.monitor.Jvm;
import com.code.entity.monitor.Mem;
import com.code.entity.monitor.Sys;
import com.code.entity.system.Menu;
import com.code.service.monitor.IServerService;
import org.springframework.stereotype.Service;
import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.CentralProcessor.TickType;
import oshi.hardware.GlobalMemory;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.util.Util;

import java.util.HashMap;
import java.util.Properties;

@Service
public class ServerService implements IServerService {

    private static final int WAIT_SECOND = 1000;
    private static final SystemInfo systemInfo = new SystemInfo();
    private static HardwareAbstractionLayer hardware = systemInfo.getHardware();

    /**
     * 字节转换
     *
     * @param size 字节大小
     * @return 转换后值
     */
    public String convertFileSize(long size) {
        long kb = 1024;
        long mb = kb * 1024;
        long gb = mb * 1024;
        if (size >= gb) {
            return String.format("%.1f GB", (float) size / gb);
        } else if (size >= mb) {
            float f = (float) size / mb;
            return String.format(f > 100 ? "%.0f MB" : "%.1f MB", f);
        } else if (size >= kb) {
            float f = (float) size / kb;
            return String.format(f > 100 ? "%.0f KB" : "%.1f KB", f);
        } else {
            return String.format("%d B", size);
        }
    }


    /**
     * 获取CPU信息
     */
    private Cpu getCpuInfo() {
        CentralProcessor processor = hardware.getProcessor();
        long[] prevTicks = processor.getSystemCpuLoadTicks();
        Util.sleep(WAIT_SECOND);
        long[] ticks = processor.getSystemCpuLoadTicks();
        long nice = ticks[TickType.NICE.getIndex()] - prevTicks[TickType.NICE.getIndex()];
        long irq = ticks[TickType.IRQ.getIndex()] - prevTicks[TickType.IRQ.getIndex()];
        long softline = ticks[TickType.SOFTIRQ.getIndex()] - prevTicks[TickType.SOFTIRQ.getIndex()];
        long steal = ticks[TickType.STEAL.getIndex()] - prevTicks[TickType.STEAL.getIndex()];
        long cSys = ticks[TickType.SYSTEM.getIndex()] - prevTicks[TickType.SYSTEM.getIndex()];
        long user = ticks[TickType.USER.getIndex()] - prevTicks[TickType.USER.getIndex()];
        long ioWait = ticks[TickType.IOWAIT.getIndex()] - prevTicks[TickType.IOWAIT.getIndex()];
        long idle = ticks[TickType.IDLE.getIndex()] - prevTicks[TickType.IDLE.getIndex()];

        // 总使用率
        long totalCpu = user + nice + cSys + idle + ioWait + irq + softline + steal;

        Cpu cpu = new Cpu();
        cpu.setNum(processor.getLogicalProcessorCount());
        cpu.setTotal(totalCpu);
        cpu.setSystem(cSys);
        cpu.setUsed(user);
        cpu.setWait(ioWait);
        cpu.setFree(idle);
        return cpu;
    }

    /**
     * 设置Java虚拟机
     */
    private Jvm getJvmInfo() {
        Jvm jvm = new Jvm();
        Properties props = System.getProperties();
        jvm.setTotal(Runtime.getRuntime().totalMemory());
        jvm.setMax(Runtime.getRuntime().maxMemory());
        jvm.setFree(Runtime.getRuntime().freeMemory());
        jvm.setVersion(props.getProperty("java.version"));
        jvm.setHome(props.getProperty("java.home"));
//        jvm.setRunTime();
        return jvm;
    }

    /**
     * 设置服务器信息
     */
    private Sys getSysInfo() {
        Sys sys = new Sys();
        Properties props = System.getProperties();
        sys.setOsName(props.getProperty("os.name"));
        sys.setOsArch(props.getProperty("os.arch"));
        return sys;
    }

    /**
     * 设置内存信息
     */
    private Mem setMemInfo() {
        GlobalMemory memory = hardware.getMemory();
        Mem mem = new Mem();
        mem.setTotal(memory.getTotal());
        mem.setUsed(memory.getTotal() - memory.getAvailable());
        mem.setFree(memory.getAvailable());
        return mem;
    }


    /**
     * 获取服务信息
     */
    @Override
    public HashMap<String, Object> getServerInfo() {
        HashMap<String, Object> map = new HashMap<>();
        map.put("cpu", getCpuInfo());
        map.put("jvm", getJvmInfo());
        map.put("mem", setMemInfo());
        map.put("sys", getSysInfo());
        return map;
    }

}
