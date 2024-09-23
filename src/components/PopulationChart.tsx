import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from 'recharts';

interface PopulationData {
  year: number;
  population: number | null;
}

interface PopulationChartProps {
  countryCode: string;
  countryName: string;
}

const PopulationChart: React.FC<PopulationChartProps> = ({ countryCode, countryName }) => {
  const [data, setData] = useState<PopulationData[]>([]);

  useEffect(() => {
    if (!countryCode) return;

    axios
      .get(`https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.TOTL?format=json&date=1970:2022`)
      .then((response: AxiosResponse) => {
        const apiData = response.data[1].map((item: any) => ({
          year: parseInt(item.date),
          population: item.value,
        }));
        setData(apiData.reverse());
      })
      .catch((error: AxiosError) => console.error('Error fetching population data:', error));
  }, [countryCode]);

  const domain = [
    Math.min(...data.map((d) => d.population !== null ? d.population : 0)),
    Math.max(...data.map((d) => d.population !== null ? d.population : 0)),
  ];

  return (
    <div>
      <h2>Population in {countryName} over the years</h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            tickFormatter={(tick) => `'${tick.toString().slice(-2)}`}
          />
          <YAxis domain={domain} tickFormatter={(tick) => `${(tick / 1000000).toFixed(1)}M`} />
          <Tooltip 
            formatter={(value: number) => `${value.toLocaleString()}`} 
            contentStyle={{ backgroundColor: '#333', borderColor: '#666', borderRadius: '10px' }}  
            labelStyle={{ color: '#BFF207' }}  
            itemStyle={{ color: '#BFF207' }}  
          />
          <Area type="monotone" dataKey="population" stroke="#BFF207" fill="#83A603" fillOpacity={0.5} />
          <Line type="monotone" dataKey="population" stroke="#8884d8" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopulationChart;
