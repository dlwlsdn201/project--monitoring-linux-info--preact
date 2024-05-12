'use client';
import dotenv from 'dotenv';
dotenv.config();

// import { Avatar, Button } from '@nextui-org/react';
// import MODULE_CardUI from '../../shared/Card';
import { ResponsiveBarChart } from './BarChart';
import { diskChartData } from '../model/handlers';
import { useEffect, useState } from 'react';
// import ServerMomoryUsage from '../../widgets/ServerMomoryUsage';
// import ServerCpuUsage from '../../widgets/ServerCpuUsage';
import ServerDiskSpaceUsage from '../../widgets/ServerDiskSpaceUsage';
// import { BellIcon, SearchIcon, ServerIcon } from '../../shared/icons';
import { ServerDiskStatusProps } from '../../../types/server';

interface initialDiskStatusState {
  size: number | '';
  used: number | '';
  avail: number | '';
  capacity: number | '';
  filesystem: string;
  timestamp: string | undefined;
}

export default function Dashboard({
  rawData,
  timestamp,
}: {
  rawData: ServerDiskStatusProps & any;
  timestamp: string | undefined;
}) {
  const [serverDiskStatus, setServerDiskStatus] =
    useState<initialDiskStatusState>({
      size: 0,
      used: 0,
      avail: 0,
      capacity: 0,
      filesystem: '',
      timestamp,
    });

  // const [serverCpuStatus, setServerCpuStatus] =

  // useEffect(() => {
  //   fetchServerStatusData();
  // }, [serverDiskStatus]);

  const initServerDiskStatus = (formattedDiskData: {
    size: number | '';
    used: number | '';
    avail: number | '';
    capacity: number | '';
    filesystem: string;
  }) => {
    console.log({ formattedDiskData });
    setServerDiskStatus({
      ...serverDiskStatus,
      size: formattedDiskData?.size,
      used: formattedDiskData?.used,
      avail: formattedDiskData?.avail,
      capacity: formattedDiskData?.capacity,
      filesystem: formattedDiskData?.filesystem,
    });
  };

  useEffect(() => {
    const formattedRawDiskData = diskChartData(rawData?.diskStatus);
    initServerDiskStatus(formattedRawDiskData);
  }, [rawData]);

  const serverName = process.env.NEXT_PUBLIC_TARGET_SERVER_NAME || '';

  const percentData = {
    usage: serverDiskStatus.capacity,
  };

  const chartData = {
    usage: [
      {
        server: serverName,
        avail: serverDiskStatus.avail,
        used: serverDiskStatus.used,
      },
    ],
  };

  const chartKeys: {
    [key: string]: string[];
  } = {
    usage: ['avail', 'used'],
  };

  const chartColors = {
    usage: {
      avail: '#51b811',
      used: '#eb5228',
    },
  };

  const usageChart = (
    <ResponsiveBarChart
      data={chartData.usage}
      keys={chartKeys.usage}
      colors={chartColors.usage}
      maxValue={
        Number.isInteger(serverDiskStatus?.size)
          ? (serverDiskStatus?.size as number)
          : undefined
      }
    />
  );

  return (
    <div className="flex flex-col w-full">
      <main className="flex-1 bg-gray-100 dark:bg-gray-800 p-6 grid gap-6">
        <div className="grid grid-cols-1 gap-6 min-h-[85vh] max-h-[85vh]">
          {/* 모든 서버 상태 */}
          {/* <TotalServerInfo /> */}
          {/* CPU */}
          {/* <ServerCpuUsage/> */}
          {/* Memory */}
          {/* <ServerMomoryUsage/> */}
          {/* 디스크 용량 */}
          <ServerDiskSpaceUsage
            usageRate={percentData?.usage}
            chartContent={usageChart}
          />
        </div>
      </main>
    </div>
  );
}