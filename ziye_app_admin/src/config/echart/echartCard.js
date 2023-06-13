import * as echarts from "echarts";
import { debounce } from "@/utils";

const initChart = ({
  target = null,
  title = {
    text: "Referer of a Website",
    left: "center",
  },
  data = [
    { value: 1048, name: "A" },
    { value: 735, name: "B" },
  ],
}) => {
  if (target === null) {
    return;
  }
  const myChart = echarts.init(target);
  const option = {
    title: { ...title },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      top: "bottom",
    },
    series: [
      {
        name: title.text,
        type: "pie",
        radius: "40%",
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  option && myChart.setOption(option);

  window.addEventListener("resize", () => {
    debounce(myChart.resize(), 200);
  });

  return myChart;
};

export default initChart;
