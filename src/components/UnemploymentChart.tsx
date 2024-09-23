import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface UnemploymentData {
  year: number;
  unemploymentRate: number;
}

interface UnemploymentChartProps {
  countryCode: string;
  countryName: string; 
}

const UnemploymentChart: React.FC<UnemploymentChartProps> = ({ countryCode, countryName }) => {
  const [data, setData] = useState<UnemploymentData[]>([]);

  useEffect(() => {
    if (!countryCode) return;

    axios
      .get(`https://api.worldbank.org/v2/country/${countryCode}/indicator/SL.UEM.TOTL.ZS?format=json&date=2000:2022`)
      .then((response: AxiosResponse) => {
        const apiData = response.data[1].map((item: any) => ({
          year: parseInt(item.date),
          unemploymentRate: item.value,
        }));
        setData(apiData.reverse());
      })
      .catch((error: AxiosError) => console.error('Error fetching unemployment data:', error));
  }, [countryCode]);

  return (
    <div>
      <h2>Unemployment rate in {countryName}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            tickFormatter={(tick) => `'${tick.toString().slice(-2)}`} 
          />
          <YAxis domain={[0, 'dataMax + 5']} tickFormatter={(tick) => `${tick}%`} />
          <Tooltip 
            formatter={(value: number) => `${value.toFixed(2)}%`} 
            contentStyle={{ backgroundColor: '#333', borderColor: '#666', borderRadius: '10px' }}  
            labelStyle={{ color: '#F25C5C' }}  
            itemStyle={{ color: '#F25C5C' }}  
          />
          <Area
            type="monotone"
            dataKey="unemploymentRate"
            stroke="#F2A9A2"
            fill="#F25C5C" 
            fillOpacity={1}
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#84d8a1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#84d8d8" stopOpacity={0.4} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UnemploymentChart;
