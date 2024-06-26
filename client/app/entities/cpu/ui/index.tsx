import { useEffect, useState } from 'react';
import MODULE_CardUI from 'client/app/shared/Card';
import { serverName } from 'client/app/shared/config';
import { UNIT_CPU, Y_AXIS_LABEL, chartColors, chartKeys } from '../model/chart';
import { useCpuData } from '../lib/useCpuData';
import { useRefetch } from 'client/app/shared/hooks/refetch';
import { refreshInterval } from '../model/refresh';
import { BarChart } from 'client/app/shared/ui/chart';

interface initialDiskStatusState {
  totalCpuUsageRate: number;
  topProcesses: any[];
  timestamp: string | undefined;
}

export const ServerCpuStatus = () => {
  const [serverCpuStatus, setServerCpuStatus] =
    useState<initialDiskStatusState>({
      totalCpuUsageRate: 0,
      topProcesses: [],
      timestamp: undefined,
    });

  const percentData = {
    usage: serverCpuStatus.totalCpuUsageRate,
  };

  const chartData = {
    usage: [
      {
        server: serverName,
        used: serverCpuStatus.totalCpuUsageRate,
      },
    ],
  };

  const setColor = (currentValue: number): { [key: string]: string } => {
    let color;
    if (currentValue < 40) color = chartColors.usage['normal'];
    else if (40 <= currentValue && currentValue < 70)
      color = chartColors.usage['caution'];
    else color = chartColors.usage['danger'];

    return { used: color };
  };

  const usageChart = (
    <BarChart
      unit={UNIT_CPU}
      yAxisLabel={Y_AXIS_LABEL}
      data={chartData.usage}
      keys={chartKeys.usage}
      colors={setColor(serverCpuStatus.totalCpuUsageRate)}
      maxValue={100}
    />
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await useCpuData();
        if (data && !error) {
          const updateState = {
            totalCpuUsageRate: data?.payload?.totalCpuUsageRate,
            topProcesses: data?.payload?.topProcesses,
            timestamp: data?.timestamp,
          };
          setServerCpuStatus(updateState);
        } else {
          throw Error();
        }
      } catch (error) {
        console.error(error);
      }
    };

    useRefetch(fetchData, refreshInterval);
  }, []);

  return (
    <MODULE_CardUI
      title="CPU 사용량"
      timestamp={serverCpuStatus.timestamp}
      status={{
        value: percentData.usage,
        unit: '%',
      }}
      bodyContent={usageChart}
      // bodyContent={<LineChart className="aspect-[4/3]" />}
    />
  );
};
