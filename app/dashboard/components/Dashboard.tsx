'use client';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QCEVL1cv0el
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Avatar, Button } from '@nextui-org/react';
import { ResponsiveLine } from '@nivo/line';
import MODULE_CardUI from './Card/ui';
import { useEffect } from 'react';

export default function Component() {
  const getAPI = async () => {
    try {
      const response = await fetch('/api/status');
      if (response.ok) {
        const data = await response.json();
        console.log({ data });
      }
    } catch (error) {
      console.error('API 호출 중 에러 발생:', error);
    }
  };

  useEffect(() => {
    getAPI();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ServerIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          <h1 className="text-xl font-semibold">Server Monitoring Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button className="rounded-full" size="sm" variant="ghost">
            <SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="sr-only">Search</span>
          </Button>
          <Button className="rounded-full" size="sm" variant="ghost">
            <BellIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar name="Avatar" size="sm"></Avatar>
        </div>
      </header>
      <main className="flex-1 bg-gray-100 dark:bg-gray-800 p-6 grid gap-6">
        <div className="grid grid-cols-4 gap-6">
          {/* 모든 서버 */}
          <MODULE_CardUI
            title="Total Servers"
            status={{ value: '24' }}
            bodyContent={
              <div>
                <div className="flex items-center gap-2">
                  <ServerIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Healthy: 22
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ServerIcon className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-yellow-500">Warning: 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <ServerIcon className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-red-500">Error: 1</span>
                </div>
              </div>
            }
          />
          {/* CPU */}
          <MODULE_CardUI
            title="CPU Usage"
            status={{
              value: <span className="text-4xl font-bold">68</span>,
              unit: '%',
            }}
            bodyContent={<LineChart className="aspect-[4/3]" />}
          />
          {/* Memory */}
          <MODULE_CardUI
            title="Memory Usage"
            status={{
              value: <span className="text-4xl font-bold">82</span>,
              unit: '%',
            }}
            bodyContent={<LineChart className="aspect-[4/3]" />}
          />
          {/* 디스크 용량 */}
          <MODULE_CardUI
            title="Disk Usage"
            status={{
              value: <span className="text-4xl font-bold">75</span>,
              unit: '%',
            }}
            bodyContent={<LineChart className="aspect-[4/3]" />}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MODULE_CardUI
            title="Client Site A"
            status={{
              value: (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Healthy: 22
                </span>
              ),
              unit: '',
            }}
            bodyContent={
              <div className="grid gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">CPU Usage</h3>
                  <LineChart className="aspect-[4/3]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Memory Usage</h3>
                  <LineChart className="aspect-[4/3]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Disk Usage</h3>
                  <LineChart className="aspect-[4/3]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Network Traffic</h3>
                  <LineChart className="aspect-[4/3]" />
                </div>
              </div>
            }
          />
          <MODULE_CardUI
            title="Client Site B"
            status={{ value: 'Warning', unit: '' }}
            bodyContent={
              <div className="grid gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">CPU Usage</h3>
                  <LineChart className="aspect-[4/3]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Memory Usage</h3>
                  <LineChart className="aspect-[4/3]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Disk Usage</h3>
                  <LineChart className="aspect-[4/3]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Network Traffic</h3>
                  <LineChart className="aspect-[4/3]" />
                </div>
              </div>
            }
          />
          <MODULE_CardUI
            title="Client Site C"
            status={{ value: 'Error', unit: '' }}
            bodyContent={
              <div className="grid gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">CPU Usage</h3>
                  <LineChart className="aspect-[4/3]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Memory Usage</h3>
                  <LineChart className="aspect-[4/3]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Disk Usage</h3>
                  <LineChart className="aspect-[4/3]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Network Traffic</h3>
                  <LineChart className="aspect-[4/3]" />
                </div>
              </div>
            }
          />
        </div>
      </main>
    </div>
  );
}

function BellIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function LineChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: 'Desktop',
            data: [
              { x: 'Jan', y: 43 },
              { x: 'Feb', y: 137 },
              { x: 'Mar', y: 61 },
              { x: 'Apr', y: 145 },
              { x: 'May', y: 26 },
              { x: 'Jun', y: 154 },
            ],
          },
          {
            id: 'Mobile',
            data: [
              { x: 'Jan', y: 60 },
              { x: 'Feb', y: 48 },
              { x: 'Mar', y: 177 },
              { x: 'Apr', y: 78 },
              { x: 'May', y: 96 },
              { x: 'Jun', y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: 'point',
        }}
        yScale={{
          type: 'linear',
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={['#2563eb', '#e11d48']}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: '9999px',
            },
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px',
            },
          },
          grid: {
            line: {
              stroke: '#f3f4f6',
            },
          },
        }}
        role="application"
      />
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ServerIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}
