
"use client"

import React, { useState, useEffect } from "react"
import {
Card,
CardContent,
CardDescription,
CardHeader,
CardTitle,
} from "@/components/ui/card"
import {
Bar,
BarChart,
CartesianGrid,
ResponsiveContainer,
XAxis,
YAxis,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { getTopProducts } from "@/action/prodOrder"
const Page = () => {
    const [data, setData] = useState<{ id: string; name: string; totalSold: number; productType: string }[]>([])
const [loading, setLoading] = useState(true)

useEffect(() => {
async function fetchData() {
try {
const response = await getTopProducts()
if (response.success && response.data) {
const formattedData = response.data.map((product: any) => ({
id: product.id,
name: product.name,
totalSold: product.totalSold,
productType: product.productType,
}))
setData(formattedData)
}
} catch (error) {
console.error("Error fetching the data", error)
} finally {
setLoading(false)
}
}
fetchData()
}, [])

if (loading) return <p>Loading...</p>
  return (
    <div >
<Card>
<CardHeader>
<CardTitle>Top Products</CardTitle>
<CardDescription>Best selling products by units sold</CardDescription>
</CardHeader>
<CardContent>
<ChartContainer
config={{
totalSold: {
label: "Units Sold",
color: "hsl(var(--chart-2))",
},
}}

>
<ResponsiveContainer width="100%" height="100%">
<BarChart
accessibilityLayer
data={data}
layout="vertical"
margin={{
left:-10,
right:10
}}

>
<CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={true} vertical={false} />
<XAxis type="number" className="text-xs" tickLine={false} axisLine={false} hide />
<YAxis
dataKey="name"
type="category"
className="text-xs"
tickMargin={10}
tickLine={false}
axisLine={false}
/>
<ChartTooltip content={<ChartTooltipContent  />} />
<Bar dataKey="totalSold" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} barSize={20} />
</BarChart>
</ResponsiveContainer>
</ChartContainer>
</CardContent>
</Card>
        
    </div>
  )
}

export default Page