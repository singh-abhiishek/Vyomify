import React from 'react'

const StatCard = ({ icon, label, value }) => (
  <div className="flex flex-col items-center gap-0.5 bg-white dark:bg-zinc-800 p-1 rounded-lg shadow-md">
    <p className="text-sm text-gray-500">{label}</p>
    <div className='flex items-center gap-1 justify-center'>
      <div className="text-2xl">{icon}</div>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);


export default StatCard