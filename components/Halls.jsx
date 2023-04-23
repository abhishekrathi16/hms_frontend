import React, { useEffect, useState } from "react";
import useProfileStore, { loggedInProfileStore } from "@/store/profileStore";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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
        rooms_available: hallData?.rooms_available-rooms,
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
      <div className="flex justify-center items-center h-[80vh]">
        <div className="border-2 p-[50px] rounded-lg shadow-xl text-2xl">
          <div className="text-left">Hall Id: {hallData?._id}</div>
          <div className="text-left">Hall Type: {hallData?._type}</div>
          <div className="text-left">Hall Name: {hallData?.name}</div>
          <div className="text-left">Total Rooms: {hallData?.total_rooms}</div>
          <div className="text-left">
            Rooms Available: {hallData?.rooms_available}
          </div>
          <div className="text-left">Amenities: {hallData?.amenities}</div>
          <div className="text-left">
            Maintainance Grant Left: {hallData?.maintainance_grant}
          </div>
          <div className="text-left">
            Salary Grant Left: {hallData?.salary_grant}
          </div>
        </div>
        <div className="border-2 p-[50px] rounded-lg shadow-xl text-2xl">
          <form className="flex flex-col justify-center items-center" onSubmit={handleChanges}>
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
