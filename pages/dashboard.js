import Navbar from '../components/Navbar'
import Typography from '@mui/material/Typography';
import hallinfo from '../public/dummyjson/hall.json'

export default function Home() {
  return (
    <>
    {hallinfo.map((element, id) => {
        return (
            <table key={id}>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Total Rooms</th>
                    <th>Rooms Available</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{element.name}</td>
                    <td>{element.total_rooms}</td>
                    <td>{element.rooms_available}</td>
                </tr>
                </tbody>
            </table>
        );
    })}
    </>
  );
}
