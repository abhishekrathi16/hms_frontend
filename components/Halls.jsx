import React, { useEffect, useState } from "react";
import useProfileStore, { loggedInProfileStore } from "@/store/profileStore";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";

const baseUrl =
  "https://django-server-production-b3bd.up.railway.app/api/halls/";

const Halls = () => {
  const registerProfileStore = useProfileStore();
  const loggerProfileStore = loggedInProfileStore();

  const [hallData, setHallData] = useState(null);

  const [rooms, setRooms] = useState(0);
  const [expSalary, setExpSalary] = useState(0);
  const [expMaintainance, setExpMaintainance] = useState(0);

  let hallId = registerProfileStore.Profile.hallId
    ? registerProfileStore.Profile.hallId
    : loggerProfileStore.Profile.hallId;

  useEffect(() => {
    try {
      axios.get(baseUrl + `${hallId}` + "/").then((response) => {
        setHallData(response.data);
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
    // console.log(hallData);
  }, [hallId, hallData]);

  const handleChanges = (event) => {
    event.preventDefault();
    axios
      .put(baseUrl + `${hallId}` + "/", {
        _id: hallData?._id,
        _type: hallData?._type,
        name: hallData?.name,
        total_rooms: hallData?.total_rooms,
        rooms_available: hallData?.rooms_available - rooms,
        amenities: hallData?.amenities,
        salary_grant: hallData?.salary_grant - expSalary,
        maintainance_grant: hallData?.maintainance_grant - expMaintainance,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <>
      <div className="grid grid-rows-2 grid-cols-2 h-[80vh]">
        <div className="text-2xl flex flex-col justify-center items-center mt-5 h-[80vh]">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell variant="head">Hall Id</TableCell>
                <TableCell>{hallData?._id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Hall Type</TableCell>
                <TableCell>{hallData?._type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Hall Name</TableCell>
                <TableCell>{hallData?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Total Rooms</TableCell>
                <TableCell>{hallData?.total_rooms}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Rooms Available</TableCell>
                <TableCell>{hallData?.rooms_available}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Amenities</TableCell>
                <TableCell>{hallData?.amenities}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Maintainance Grant Left</TableCell>
                <TableCell>{hallData?.maintainance_grant}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Salary Grant Left</TableCell>
                <TableCell>{hallData?.salary_grant}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="text-2xl flex justify-center items-center h-[80vh]">
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={handleChanges}
          >
            <TextField
              id=""
              label="Rooms Emptied/TakenUp"
              type="number"
              variant="outlined"
              sx={{ width: "400px", margin: "10px" }}
              onChange={(e) => setRooms(parseInt(e.target.value))}
            />
            <TextField
              id=""
              label="Expended Salary Grant"
              type="number"
              variant="outlined"
              sx={{ width: "400px", margin: "10px" }}
              onChange={(e) => setExpSalary(parseInt(e.target.value))}
            />
            <TextField
              id=""
              label="Expended Maintainance Grant"
              type="number"
              variant="outlined"
              sx={{ width: "400px", margin: "10px" }}
              onChange={(e) => setExpMaintainance(parseInt(e.target.value))}
            />
            <Button
              variant="outlined"
              type="submit"
              sx={{ marginTop: "15px", width: "auto" }}
            >
              Add Changes
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Halls;
