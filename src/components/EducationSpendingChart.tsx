import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface EducationSpendingData {
  year: number;
  spending: number | null;
}

interface EducationSpendingChartProps {
  countryCode: string;
  countryName: string;
}

const EducationSpendingChart: React.FC<EducationSpendingChartProps> = ({ countryCode, countryName }) => {
  const [data, setData] = useState<EducationSpendingData[]>([]);

  useEffect(() => {
    if (!countryCode) return;

    axios
      .get(`https://api.worldbank.org/v2/country/${countryCode}/indicator/SE.XPD.TOTL.GD.ZS?format=json&date=2000:2022`)
      .then((response: AxiosResponse) => {
        const apiData = response.data[1].map((item: any) => ({
          year: parseInt(item.date),
          spending: item.value,
        }));
        setData(apiData.reverse());
      })
      .catch((error: AxiosError) => console.error('Error fetching education spending data:', error));
  }, [countryCode]);

  return (
    <div>
      <h2>Education expenditure in {countryName} as % of GDP</h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            tickFormatter={(tick) => `'${tick.toString().slice(-2)}`}
          />
          <YAxis tickFormatter={(tick) => `${tick.toFixed(1)}%`} />
          <Tooltip 
            formatter={(value: number) => `${value.toFixed(2)}%`} 
            contentStyle={{ backgroundColor: '#333', borderColor: '#666', borderRadius: '10px' }}  
            labelStyle={{ color: '#F2C230' }}  
            itemStyle={{ color: '#F2C230' }}  
          />
          <Area
            type="monotone"
            dataKey="spending"
            stroke="#fff"
            fill="#F2C230"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EducationSpendingChart;
