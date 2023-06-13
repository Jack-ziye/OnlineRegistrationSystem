import * as echarts from "echarts";
import { debounce } from "@/utils";

const initChart = ({
  target = null,
  title = {
    text: "title",
    left: "center",
  },
  xData = ["A", "B"],
  series = [{ data: [150, 230], type: "line" }],
}) => {
  if (target === null) {
    return;
  }
  const myChart = echarts.init(target);
  const option = {
    title: { ...title },
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "bottom",
    },
    xAxis: {
      type: "category",
      data: xData,
    },
    yAxis: {
      type: "value",
    },
    series: series,
  };

  option && myChart.setOption(option);

  window.addEventListener("resize", () => {
    debounce(myChart.resize(), 200);
  });

  return myChart;
};

export default initChart;
