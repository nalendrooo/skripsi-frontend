import useGetCartDashboard from '@/feature/dashboard/useGetCartDashboard'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'

// const data = [
//   {
//     name: 'Jan',
//     itemIn: Math.floor(Math.random() * 3000) + 500,
//     itemOut: Math.floor(Math.random() * 3000) + 500,
//   },
//   {
//     name: 'Feb',
//     itemIn: Math.floor(Math.random() * 3000) + 500,
//     itemOut: Math.floor(Math.random() * 3000) + 500,
//   },
//   {
//     name: 'Mar',
//     itemIn: Math.floor(Math.random() * 3000) + 500,
//     itemOut: Math.floor(Math.random() * 3000) + 500,
//   },
//   {
//     name: 'Apr',
//     itemIn: Math.floor(Math.random() * 3000) + 500,
//     itemOut: Math.floor(Math.random() * 3000) + 500,
//   },
//   {
//     name: 'May',
//     itemIn: Math.floor(Math.random() * 3000) + 500,
//     itemOut: Math.floor(Math.random() * 3000) + 500,
//   },
//   {
//     name: 'Jun',
//     itemIn: Math.floor(Math.random() * 3000) + 500,
//     itemOut: Math.floor(Math.random() * 3000) + 500,
//   },
//   {
//     name: 'Jul',
//     itemIn: Math.floor(Math.random() * 3000) + 500,
//     itemOut: Math.floor(Math.random() * 3000) + 500,
//   },
//   {
//     name: 'Aug',
//     itemIn: Math.floor(Math.random() * 3000) + 500,
//     itemOut: Math.floor(Math.random() * 3000) + 500,
//   },
//   {
//     name: 'Sep',
//     itemIn: Math.floor(Math.random() * 3000) + 500,
//     itemOut: Math.floor(Math.random() * 3000) + 500,
//   },
//   {
//     name: 'Oct',
//     itemIn: Math.floor(Math.random() * 3000) + 500,
//     itemOut: Math.floor(Math.random() * 3000) + 500,
//   },
//   {
//     name: 'Nov',
//     itemIn: Math.floor(Math.random() * 3000) + 500,
//     itemOut: Math.floor(Math.random() * 3000) + 500,
//   },
//   {
//     name: 'Dec',
//     itemIn: Math.floor(Math.random() * 3000) + 500,
//     itemOut: Math.floor(Math.random() * 3000) + 500,
//   },
// ]


export function Overview() {
  const { data } = useGetCartDashboard()
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="itemIn" fill="#4ade80" radius={[4, 4, 0, 0]} name="Barang Masuk" />
        <Bar dataKey="itemOut" fill="#f87171" radius={[4, 4, 0, 0]} name="Barang Keluar" />
      </BarChart>
    </ResponsiveContainer>
  )
}
