"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const data = [
  { name: "Mon", workout: 40, calories: 24, steps: 22 },
  { name: "Tue", workout: 30, calories: 13, steps: 20 },
  { name: "Wed", workout: 20, calories: 98, steps: 22 },
  { name: "Thu", workout: 27, calories: 39, steps: 20 },
  { name: "Fri", workout: 18, calories: 48, steps: 23 },
  { name: "Sat", workout: 23, calories: 38, steps: 24 },
  { name: "Sun", workout: 34, calories: 43, steps: 26 }
];

export default function DashboardChart() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">Goal Progress</CardTitle>
        <span className="text-xs text-muted-foreground">Weekly</span>
      </CardHeader>
      <CardContent className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="workout" stroke="#1d8cf8" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="calories" stroke="#ff6b4a" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="steps" stroke="#7c3aed" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}


