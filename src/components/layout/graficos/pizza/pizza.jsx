import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#00FF11', '#FF0000'];

export default function GraficoPizza({ visitados, naoVisitados }) {
  const data = [
    { name: 'Visitados', value: visitados },
    { name: 'Não Visitados', value: naoVisitados },
  ];


  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        label
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
