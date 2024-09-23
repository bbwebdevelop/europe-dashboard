import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LifeExpectancyData {
  year: number;
  lifeExpectancy: number | null;
}

interface LifeExpectancyChartProps {
  countryCode: string;
  countryName: string;
}

const LifeExpectancyChart: React.FC<LifeExpectancyChartProps> = ({ countryCode, countryName }) => {
  const [data, setData] = useState<LifeExpectancyData[]>([]);

  useEffect(() => {
    if (!countryCode) return;

    axios
      .get(`https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.DYN.LE00.IN?format=json&date=2000:2022`)
      .then((response: AxiosResponse) => {
        const apiData = response.data[1].map((item: any) => ({
          year: parseInt(item.date),
          lifeExpectancy: item.value || 0, 
        }));
        setData(apiData.reverse());
      })
      .catch((error: AxiosError) => console.error('Error fetching life expectancy data:', error));
  }, [countryCode]);

  return (
    <div>
      <h2>Life expectancy in {countryName}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            tickFormatter={(tick) => `'${tick.toString().slice(-2)}`} 
          />
          <YAxis domain={[50, 100]} tickFormatter={(tick) => `${tick} yr`} /> 
          <Tooltip 
            formatter={(value: number) => `${(Math.round((value as number) * 10) / 10).toFixed(1)} yr`}  
            contentStyle={{ backgroundColor: '#333', borderColor: '#666', borderRadius: '10px' }}  
            labelStyle={{ color: '#2BD9A8' }}  
            itemStyle={{ color: '#2BD9A8' }}  
          />
          <Area type="monotone" dataKey="lifeExpectancy" stroke="#A7F2BA" fill="#2BD9A8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LifeExpectancyChart;
