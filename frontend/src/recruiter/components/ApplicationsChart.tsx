
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardDescription, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

const chartConfig = {
applications: {
    label: "Number of applications",
    color: "#2563eb",
},
} satisfies ChartConfig

export default function ApplicationsChart({chartData}: {chartData: {openJobsCount: Number, unreviewedApplicationsCount: Number, chartStatistics: {date: string, count: Number}[]}[]}) {  

    return <Card className="w-full h-[310px]">
    <CardHeader className="pb-4">
      <div className="flex justify-between">
        <CardTitle>Applications Received</CardTitle>
        <InsertChartOutlinedIcon />
      </div>
      <CardDescription>Number of applications over the last 30 days</CardDescription>
    </CardHeader>
    <CardContent className="pt-0 pl-1">
      <ChartContainer config={chartConfig} className="h-[200px] w-full ml-[-0.5rem]">
        <BarChart 
          accessibilityLayer 
          data={chartData} 
          margin={{ top: 5, right: 5, bottom: 5, left: 40 }}
        >
          <CartesianGrid vertical={false} />
          <YAxis 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `${value}`}
            width={35}
            dx={-5}
          />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={dateString => { 
              const date = new Date(dateString);
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const day = date.getDate().toString().padStart(2, '0');
              return `${month}/${day}`;
            }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="hsl(var(--chart-2))" radius={4} />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
}