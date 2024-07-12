// ScoreGraph.tsx
'use client';
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useTheme } from 'next-themes';

interface ScoreGraphProps {
  value?: number;
}

const ScoreGraph: React.FC<ScoreGraphProps> = ({ value = 70 }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current, theme === 'dark' ? 'dark' : 'light');

      const option = {
        backgroundColor: theme === 'dark' ? 'transparent' : '#fff',
        series: [
          {
            type: 'gauge',
            progress: {
              show: true,
              width: 18,
            },
            axisLine: {
              lineStyle: {
                width: 18,
                color: [
                  [
                    1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      { offset: 0, color: theme === 'dark' ? '#00c6ff' : '#007bff' },
                      { offset: 1, color: theme === 'dark' ? '#0072ff' : '#00c6ff' }
                    ])
                  ]
                ]
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              length: 15,
              lineStyle: {
                width: 2,
                color: theme === 'dark' ? '#aaa' : '#999'
              }
            },
            axisLabel: {
              distance: 25,
              color: theme === 'dark' ? '#aaa' : '#333',
              fontSize: 20
            },
            anchor: {
              show: true,
              showAbove: true,
              size: 25,
              itemStyle: {
                borderWidth: 10,
              }
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              fontSize: 45,
              offsetCenter: [0, '70%'],
              color: theme === 'dark' ? '#fff' : '#333'
            },
            animationDuration: 1000 * 1.02,
            animationEasing: 'linear',
            data: [
              {
                value
              }
            ]
          }
        ]
      };

      option && myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [value, theme]);

  return (
    <div className="flex items-center justify-center h-fit">
      <div ref={chartRef} style={{ width: 400, height: 400 }} />
    </div>
  );
};

export default ScoreGraph;
