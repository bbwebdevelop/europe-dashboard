import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface PopulationAgeGenderData {
  ageGroup: string;
  percentage: number;
}

interface PopulationAgeGenderChartProps {
  countryCode: string;
  countryName: string;
}

const PopulationAgeGenderChart: React.FC<PopulationAgeGenderChartProps> = ({ countryCode, countryName }) => {
  const [data, setData] = useState<PopulationAgeGenderData[]>([]);
  const [outerRadius, setOuterRadius] = useState(150); 

  useEffect(() => {
    if (!countryCode) return;

    axios
      .get(`https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.0014.TO.ZS?format=json`)
      .then((response: AxiosResponse) => {
        const childrenPercentage = response.data[1][0].value;

        return axios.get(`https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.1564.TO.ZS?format=json`)
          .then((response2: AxiosResponse) => {
            const adultsPercentage = response2.data[1][0].value;

            return axios.get(`https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.65UP.TO.ZS?format=json`)
              .then((response3: AxiosResponse) => {
                const seniorsPercentage = response3.data[1][0].value;

                const apiData = [
                  { ageGroup: "Children (0-14 years)", percentage: childrenPercentage },
                  { ageGroup: "Adults (15-64 years)", percentage: adultsPercentage },
                  { ageGroup: "Seniors (65+ years)", percentage: seniorsPercentage },
                ];

                setData(apiData);
              });
          });
      })
      .catch((error: AxiosError) => console.error('Error fetching population age data:', error));
  }, [countryCode]);

  
  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 768) {
        setOuterRadius(80); 
      } else {
        setOuterRadius(150); 
      }
    };

   
    updateRadius();

  
    window.addEventListener('resize', updateRadius);


    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div>
      <h2>Age distribution of the population in {countryName}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="percentage"
            nameKey="ageGroup"
            cx="50%"
            cy="50%"
            outerRadius={outerRadius}  
            fill="#8884d8"
            label={({ percent }) => {
              return `${(percent * 100).toFixed(2)}%`; 
            }}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => `${value.toFixed(2)}%`} 
            contentStyle={{ backgroundColor: '#333', borderColor: '#666', borderRadius: '10px' }}  
            labelStyle={{ color: '#fff' }}  
            itemStyle={{ color: '#fff' }}  
          />
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopulationAgeGenderChart;
