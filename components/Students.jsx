import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const baseUrl =
  "https://django-server-production-b3bd.up.railway.app/api/students/";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontFamily: "monospace",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// to calculate total charges
function chargesCalculator(messCharge, amenityCharge, roomRent) {
  return messCharge + amenityCharge + roomRent;
}

// to truncate address string
function truncate(str) {
  let n = 40;
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

function BasicTable() {
  const [students, setStudents] = useState(null);
  // form inputs for students
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [hallId, setHallId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [messCharge, setMessCharge] = useState(0);
  const [amenityCharge, setAmenityCharge] = useState(0);
  const [roomRent, setRoomRent] = useState(0);

  // error control for form
  const [studentIdError, setStudentIdError] = useState("");
  const [nameError, setNameError] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [hallIdError, setHallIdError] = useState("");
  const [roomIdError, setRoomIdError] = useState("");
  const [messChargeError, setMessChargeError] = useState("");
  const [amenityChargeError, setAmenityChargeError] = useState("");
  const [roomRentError, setRoomRentError] = useState("");

  // for updating student
  const [updatedStudent, setUpdatedStudent] = useState(null);
  const [updateStudentId, setUpdateStudentId] = useState("");
  const [updateMessCharge, setUpdateMessCharge] = useState(0);
  const [updateAmenityCharge, setUpdateAmenityCharge] = useState(0);
  const [updateRoomRent, setUpdateRoomRent] = useState(0);
  const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
  const handleAdd = (event) => {
    event.preventDefault();

    setStudentIdError(false);
    setNameError(false);
    setContactNumberError(false);
    setAddressError(false);
    setHallIdError(false);
    setRoomIdError(false);
    setMessChargeError(false);
    setAmenityChargeError(false);
    setRoomRentError(false);

    if (studentId === "") {
      setStudentIdError(true);
    }
    if (name === "") {
      setNameError(true);
    }
    if (contactNumber === "") {
      setContactNumberError(true);
    }
    if (address === "") {
      setAddressError(true);
    }
    if (hallId === "") {
      setHallIdError(true);
    }
    if (roomId === "") {
      setRoomIdError(true);
    }
    if (messCharge === "") {
      setMessChargeError(true);
    }
    if (amenityCharge === "") {
      setAmenityChargeError(true);
    }
    if (roomRent === "") {
      setAmenityChargeError(true);
    }

    // to add new student details to the rows array
    if (
      studentId &&
      name &&
      contactNumber &&
      address &&
      address &&
      hallId &&
      roomId &&
      messCharge &&
      amenityCharge &&
      roomRent
    ) {
      
      axios
        .post(baseUrl, {
          _id: studentId,
          name: name,
          address: address,
          contact_no: contactNumber,
          mess_charge: messCharge,
          amenity_charge: amenityCharge,
          room_rent: roomRent,
          hall_assigned: hallId,
          room_assigned: roomId,
        },{headers})
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      setStudentId("");
      setName("");
      setContactNumber("");
      setAddress("");
      setHallId("");
      setRoomId("");
      setMessCharge(0);
      setAmenityCharge(0);
      setRoomRent(0);
    }
  };
  const handleDelete = (id) => {
    axios.delete(baseUrl + `${id}`, {headers});
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    try {
      axios.get(baseUrl + `${updateStudentId}/`).then((response) => {
        setUpdatedStudent(response.data);
      }, {headers});
    } catch (error) {
      console.log(error.response.data.message);
    }
    console.log(updatedStudent);
    if (updatedStudent !== null) {
      axios.put(baseUrl + `${updateStudentId}/`, {
        _id: updateStudentId,
        name: updatedStudent?.name,
        address: updatedStudent?.address,
        contact_no: updatedStudent?.contact_no,
        mess_charge: updatedStudent?.mess_charge - updateMessCharge,
        amenity_charge: updatedStudent?.amenity_charge - updateAmenityCharge,
        room_rent: updatedStudent?.room_rent - updateRoomRent,
        hall_assigned: updatedStudent?.hall_assigned,
        room_assigned: updatedStudent?.room_assigned,
      },{headers});
    }
  };

  useEffect(() => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      axios.get(baseUrl,{headers}).then((response) => {
        setStudents(response.data);
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  }, [students]);
  //   console.log(students);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Student ID</StyledTableCell>
              <StyledTableCell align="center">Student Name</StyledTableCell>
              <StyledTableCell align="right">Contact No.</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Hall Id</StyledTableCell>
              <StyledTableCell align="center">Room Id</StyledTableCell>
              <StyledTableCell align="center">Unpaid Charges</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row._id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.contact_no}</TableCell>
                <TableCell align="center">{truncate(row.address)}</TableCell>
                <TableCell align="center">{row.hall_assigned}</TableCell>
                <TableCell align="center">{row.room_assigned}</TableCell>
                <TableCell align="center">
                  {chargesCalculator(
                    row.mess_charge,
                    row.amenity_charge,
                    row.room_rent
                  )}
                </TableCell>
                <TableCell
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(row._id)}
                >
                  <DeleteIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="form mb-10">
        <div
          style={{
            fontSize: "1.4rem",
            fontStyle: "bold",
            fontFamily: "monospace",
            background: "black",
            color: "white",
            padding: "8px 20px",
          }}
        >
          Add Student
        </div>
        <form
          className="mt-4"
          onSubmit={handleAdd}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="grid grid-rows-3 grid-cols-3">
            <TextField
              id="standard-basic"
              label="Student Id"
              variant="outlined"
              error={studentIdError}
              onChange={(e) => setStudentId(e.target.value)}
              sx={{ width: "400px", margin: "10px" }}
              required="true"
            />
            <TextField
              id="standard-basic"
              label="Student Name"
              variant="outlined"
              error={nameError}
              onChange={(e) => setName(e.target.value)}
              sx={{ width: "400px", margin: "10px" }}
              required="true"
            />
            <TextField
              id="standard-basic"
              label="Contact Number"
              variant="outlined"
              sx={{ width: "400px", margin: "10px" }}
              error={contactNumberError}
              onChange={(e) => setContactNumber(e.target.value)}
              required="true"
            />
            <TextField
              id="standard-basic"
              label="Address"
              variant="outlined"
              sx={{ width: "400px", margin: "10px" }}
              error={addressError}
              onChange={(e) => setAddress(e.target.value)}
              required="true"
            />
            <TextField
              id="standard-basic"
              label="Hall Id"
              variant="outlined"
              sx={{ width: "400px", margin: "10px" }}
              error={hallIdError}
              onChange={(e) => setHallId(e.target.value)}
              required="true"
            />
            <TextField
              id="standard-basic"
              label="Room Id"
              variant="outlined"
              sx={{ width: "400px", margin: "10px" }}
              error={roomIdError}
              onChange={(e) => setRoomId(e.target.value)}
              required="true"
            />
            <TextField
              id="standard-basic"
              label="Mess Charges"
              type="number"
              variant="outlined"
              sx={{ width: "400px", margin: "10px" }}
              error={messChargeError}
              onChange={(e) => setMessCharge(parseInt(e.target.value))}
              required="true"
            />
            <TextField
              id="standard-basic"
              label="Amenity Charges"
              type="number"
              variant="outlined"
              sx={{ width: "400px", margin: "10px" }}
              error={amenityChargeError}
              onChange={(e) => setAmenityCharge(parseInt(e.target.value))}
              required="true"
            />
            <TextField
              id=""
              label="Room Rent"
              type="number"
              variant="outlined"
              sx={{ width: "400px", margin: "10px" }}
              error={roomRentError}
              onChange={(e) => setRoomRent(parseInt(e.target.value))}
              required="true"
            />
          </div>
          <Button
            variant="outlined"
            type="submit"
            sx={{ marginTop: "15px", width: "auto" }}
          >
            Add Student
          </Button>
        </form>
      </div>

      <div className="form mb-10">
        <div
          style={{
            fontSize: "1.4rem",
            fontStyle: "bold",
            fontFamily: "monospace",
            background: "black",
            color: "white",
            padding: "8px 20px",
          }}
        >
          Fees Paid
        </div>
        <form
          className="mt-4"
          onSubmit={handleUpdate}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="grid grid-rows-2 grid-cols-2">
            <TextField
              id="standard-basic"
              label="Student Id"
              variant="outlined"
              onChange={(e) => setUpdateStudentId(e.target.value)}
              sx={{ width: "400px", margin: "10px" }}
            />
            <TextField
              id="standard-basic"
              label="Mess Charges"
              type="number"
              variant="outlined"
              sx={{ width: "400px", margin: "10px" }}
              onChange={(e) => setUpdateMessCharge(parseInt(e.target.value))}
            />
            <TextField
              id="standard-basic"
              label="Amenity Charges"
              type="number"
              variant="outlined"
              sx={{ width: "400px", margin: "10px" }}
              onChange={(e) => setUpdateAmenityCharge(parseInt(e.target.value))}
            />
            <TextField
              id=""
              label="Room Rent"
              type="number"
              variant="outlined"
              sx={{ width: "400px", margin: "10px" }}
              onChange={(e) => setUpdateRoomRent(parseInt(e.target.value))}
            />
          </div>
          <Button
            variant="outlined"
            type="submit"
            sx={{ marginTop: "15px", width: "auto" }}
          >
            Update
          </Button>
        </form>
      </div>
    </>
  );
}

export default function Students() {
  return (
    <>
      <BasicTable />
    </>
  );
}
