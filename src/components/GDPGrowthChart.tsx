import React, { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface GDPGrowthData {
  year: number;
  growth: number | null;
}

interface GDPGrowthChartProps {
  countryCode: string;
  countryName: string;
}

const GDPGrowthChart: React.FC<GDPGrowthChartProps> = ({
  countryCode,
  countryName,
}) => {
  const [data, setData] = useState<GDPGrowthData[]>([]);

  useEffect(() => {
    if (!countryCode) return;

    axios
      .get(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.KD.ZG?format=json&date=2000:2022`
      )
      .then((response: AxiosResponse) => {
        const apiData = response.data[1].map((item: any) => ({
          year: parseInt(item.date),
          growth: item.value,
        }));
        setData(apiData.reverse());
      })
      .catch((error: AxiosError) =>
        console.error("Error fetching GDP growth data:", error)
      );
  }, [countryCode]);

  return (
    <div>
      <h2>GDP growth (% annually) in {countryName}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            tickFormatter={(tick) => `'${tick.toString().slice(-2)}`}
          />
          <YAxis tickFormatter={(tick) => `${tick.toFixed(1)}%`} />
          <Tooltip 
            formatter={(value: number) => `${value.toFixed(2)}%`} 
            contentStyle={{ backgroundColor: '#333', borderColor: '#666', borderRadius: '10px' }}  
            labelStyle={{ color: '#F28D52' }}  
            itemStyle={{ color: '#F28D52' }}  
          />
          <Line
            type="monotone"
            dataKey="growth"
            stroke="#F28D52"
            activeDot={{ r: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GDPGrowthChart;
