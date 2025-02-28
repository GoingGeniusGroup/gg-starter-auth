"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { orderInfo,orderInformation } from "@/action/order";

export default function OrderStatsChart() {
  const [chartData, setChartData] = useState<{ month: string; totalOrderAmount: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await orderInfo();
      if (response.success && response.data) {
        const formattedData = Object.values(response.data).map((item) => ({
          month: item.month,
          totalOrderAmount: item.totalOrderAmount,
        }));
        setChartData(formattedData);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Updated Chart Data:", chartData);
  }, [chartData]); 

  const chartConfig = {
    totalOrderAmount: {
      label: "Total Order Amount",
      color: "hsl(var(--chart-1))",
      
    },
  } satisfies ChartConfig;

  if (loading) return <div>Loading...</div>;
  if (!chartData.length) return <div>No data available</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Statistics</CardTitle>
        <CardDescription>Total order amount for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis 
              dataKey="month" 
              tickFormatter={(value) => {
                if (!value) return "";
                const [year, month] = value.split("-");
                return new Date(Number(year), Number(month) - 1).toLocaleString("default", { month: "short" });
              }} 
            />
            <YAxis dataKey="totalOrderAmount" tickLine={false} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="totalOrderAmount"
              type="natural"
              fill="var(--color-totalOrderAmount)"
              fillOpacity={0.4}
              stroke="var(--color-totalOrderAmount)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
