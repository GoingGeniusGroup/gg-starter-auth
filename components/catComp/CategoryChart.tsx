"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart,Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


interface CategoryData {
  name: string;
  value: number;
  num:number;
  fill: string; // Optional: Add fill color if needed
}

interface CategoryChartProps {
  data: CategoryData[]; 
}

const chartConfig = {
  visitors: {
    label: "Products",
  },
  // extend this based on your category names if you want different styling or labels
} satisfies ChartConfig

export function CategoryChart({ data }: CategoryChartProps) {
  const totalProducts = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.num, 0)
  }, [data])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Product Category Breakdown</CardTitle>
        <CardDescription>Product distribution by category</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
             {/* <Tooltip 
              content={({ payload }) => {
                if (payload && payload.length) {
                  const { name, value, payload: item } = payload[0];
                  return (
                    <div className="bg-white p-2 rounded shadow text-black">
                      <p className="font-bold">{name}</p>
                      <p>Product Count: {value}</p>
                      <p>Stock Quantity: {item.num}</p>
                    </div>
                  );
                }
                return null;
              }}
            /> */}
            
            <Pie
              data={data}
              dataKey="num"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalProducts.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Products
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 font-medium leading-none">
    
          Category performance data <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          Showing total products by category.
        </div>
      </CardFooter>
    </Card>
  )
}
