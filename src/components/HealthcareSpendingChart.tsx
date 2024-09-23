import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface HealthcareSpendingData {
  year: number;
  healthcareSpending: number | null;
}

interface HealthcareSpendingChartProps {
  countryCode: string;
  countryName: string;
}

const HealthcareSpendingChart: React.FC<HealthcareSpendingChartProps> = ({ countryCode, countryName }) => {
  const [data, setData] = useState<HealthcareSpendingData[]>([]);

  useEffect(() => {
    if (!countryCode) return;

    axios
      .get(`https://api.worldbank.org/v2/country/${countryCode}/indicator/SH.XPD.CHEX.GD.ZS?format=json&date=2000:2022`)
      .then((response: AxiosResponse) => {
        const apiData = response.data[1].map((item: any) => ({
          year: parseInt(item.date),
          healthcareSpending: item.value,
        }));

        console.log("Dane wydatków na ochronę zdrowia przed filtrowaniem:", apiData);

        const filteredData = apiData.filter(
          (item: HealthcareSpendingData) =>
            item.healthcareSpending !== null &&
            item.healthcareSpending >= 0 &&   
            item.healthcareSpending <= 100    
        );
        
        setData(filteredData.reverse());
      })
      .catch((error: AxiosError) => console.error('Error fetching healthcare spending data:', error));
  }, [countryCode]);

  const domain = [0, 15]; 

  return (
    <div>
      <h2>Healthcare expenditure (% of GDP) in {countryName}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            tickFormatter={(tick) => `'${tick.toString().slice(-2)}`}
          />
          <YAxis domain={domain} tickFormatter={(tick) => `${tick}%`} />
          <Tooltip 
            formatter={(value: number) => `${value.toFixed(2)}%`} 
            contentStyle={{ backgroundColor: '#333', borderColor: '#666', borderRadius: '10px' }}  
            labelStyle={{ color: '#F2AE30' }}  
            itemStyle={{ color: '#F2AE30' }}  
          />
          <Line
            type="monotone"
            dataKey="healthcareSpending"
            stroke="#F2AE30"
            activeDot={{ r: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthcareSpendingChart;
