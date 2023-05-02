import { useState } from 'react';

function CreateSchedule() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [days, setDays] = useState('');
  const [drName, setDrName] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    const newStudent = {
      name,
      time,
      days,
      drName
    };
    setStudents([...students, newStudent]);
    setName('');
    setTime('');
    setDays('');
    setDrName('');
  };

  return (
    <div className="container mx-auto mt-4 p-4">
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700 font-bold mb-2">
            Time
          </label>
          <input
            type="text"
            id="time"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="days" className="block text-gray-700 font-bold mb-2">
            Days
          </label>
          <input
            type="text"
            id="days"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="drName" className="block text-gray-700 font-bold mb-2">
            Doctor's Name
          </label>
          <input
            type="text"
            id="drName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={drName}
            onChange={(e) => setDrName(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </form>
      <table className="mt-4 table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Days</th>
            <th className="px-4 py-2">Doctor's Name</th>
          </tr>
        </thead>
        <tbody>
         
        {students.map((student, index) => (
<tr key={index}>
<td className="border px-4 py-2">{student.name}</td>
<td className="border px-4 py-2">{student.time}</td>
<td className="border px-4 py-2">{student.days}</td>
<td className="border px-4 py-2">{student.drName}</td>
</tr>
))}
</tbody>
</table>
</div>
);
}

export default CreateSchedule;