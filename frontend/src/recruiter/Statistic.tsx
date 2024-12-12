import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Statistic({title, description, statistic, icon, unit}: {title: string, description: string, statistic: number, icon: any, unit: string}) { 
    return <Card className="flex-[1] h-[310px] mr-2">
                    <CardHeader>
                        <div className="flex justify-between">
                        <CardTitle>{title}</CardTitle>
                        {icon}
                        </div>
                        <CardDescription>{description}</CardDescription>
                    </CardHeader>
                    <div className="h-[180px] flex justify-center items-center">
                        <h1 className="text-7xl font-bold tracking-tight">{statistic}</h1>
                        <p className="ml-3 mt-[1rem] text-xl">{unit}</p>
                    </div>
            </Card>
}