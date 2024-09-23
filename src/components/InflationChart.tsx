import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface InflationData {
  year: number;
  inflation: number | null;
}

interface InflationChartProps {
  countryCode: string;
  countryName: string;
}

const InflationChart: React.FC<InflationChartProps> = ({ countryCode, countryName }) => {
  const [data, setData] = useState<InflationData[]>([]);

  useEffect(() => {
    if (!countryCode) return;

    axios
      .get(`https://api.worldbank.org/v2/country/${countryCode}/indicator/FP.CPI.TOTL.ZG?format=json&date=2000:2022`)
      .then((response: AxiosResponse) => {
        const apiData = response.data[1].map((item: any) => ({
          year: parseInt(item.date),
          inflation: item.value,
        }));
        setData(apiData.reverse());
      })
      .catch((error: AxiosError) => console.error('Error fetching inflation data:', error));
  }, [countryCode]);

  return (
    <div>
      <h2>Inflation rate (% annually) in {countryName}</h2>
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
            labelStyle={{ color: '#F2E205' }}  
            itemStyle={{ color: '#F2E205' }}  
          />
          <Line type="monotone" dataKey="inflation" stroke="#F2E205" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InflationChart;
