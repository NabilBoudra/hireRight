
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardDescription, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

const chartData = [
    { date: "11/11", applications: 45 },
    { date: "11/12", applications: 52 },
    { date: "11/13", applications: 40 },
    { date: "11/14", applications: 60 },
    { date: "11/15", applications: 55 },
    { date: "11/16", applications: 48 },
    { date: "11/17", applications: 62 },
    { date: "11/18", applications: 70 },
    { date: "11/19", applications: 58 },
    { date: "11/20", applications: 66 },
    { date: "11/21", applications: 73 },
    { date: "11/22", applications: 50 },
    { date: "11/23", applications: 61 },
    { date: "11/24", applications: 59 },
    { date: "11/25", applications: 63 },
    { date: "11/26", applications: 47 },
    { date: "11/27", applications: 75 },
    { date: "11/28", applications: 53 },
    { date: "11/29", applications: 68 },
    { date: "11/30", applications: 62 },
    { date: "12/01", applications: 50 },
    { date: "12/02", applications: 69 },
    { date: "12/03", applications: 55 },
    { date: "12/04", applications: 72 },
    { date: "12/05", applications: 60 },
    { date: "12/06", applications: 57 },
    { date: "12/07", applications: 63 },
    { date: "12/08", applications: 58 },
    { date: "12/09", applications: 64 },
    { date: "12/10", applications: 71 },
];

const chartConfig = {
applications: {
    label: "Number of applications",
    color: "#2563eb",
},
} satisfies ChartConfig

export default function ApplicationsChart() {  

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
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="applications" fill="hsl(var(--chart-2))" radius={4} />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
}