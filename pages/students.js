import studentInfo from "../public/dummyjson/student.json";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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

function createData(
  id,
  name,
  contactNumber,
  address,
  hallID,
  roomID,
  messCharge,
  amenityCharge,
  roomRent
) {
  return {
    id,
    name,
    contactNumber,
    address,
    hallID,
    roomID,
    messCharge,
    amenityCharge,
    roomRent,
  };
}

const rows = [
  createData(
    "2020UGCS027R",
    "Abhishek",
    "9876543210",
    "9, Sahara Road, Chandni, Mumbai, 900124",
    "H-3",
    "B-110",
    10000,
    12000,
    15000
  ),
  createData(
    "2020UGCS027R",
    "Abhishek",
    "9876543210",
    "9, Sahara Road, Chandni, Mumbai, 900124",
    "H-3",
    "B-110",
    10000,
    15000,
    15000
  ),
  createData(
    "2020UGCS027R",
    "Abhishek",
    "9876543210",
    "9, Sahara Road, Chandni, Mumbai, 900124",
    "H-3",
    "B-110",
    10000,
    10000,
    15000
  ),
  createData(
    "2020UGCS027R",
    "Abhishek",
    "9876543210",
    "9, Sahara Road, Chandni, Mumbai, 900124",
    "H-3",
    "B-110",
    10000,
    11000,
    15000
  ),
];

function BasicTable() {
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
      rows.push(
        createData(
          studentId,
          name,
          contactNumber,
          address,
          hallId,
          roomId,
          messCharge,
          amenityCharge,
          roomRent
        )
      );
    }
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Student ID</StyledTableCell>
              <StyledTableCell align="center">Student Name</StyledTableCell>
              <StyledTableCell align="right">Contact No.</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Hall Id</StyledTableCell>
              <StyledTableCell align="center">Room Id</StyledTableCell>
              <StyledTableCell align="center">Unpaid Charges</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="right">{row.contactNumber}</TableCell>
                <TableCell align="center">{truncate(row.address)}</TableCell>
                <TableCell align="center">{row.hallID}</TableCell>
                <TableCell align="center">{row.roomID}</TableCell>
                <TableCell align="center">
                  {chargesCalculator(
                    row.messCharge,
                    row.amenityCharge,
                    row.roomRent
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="form mt-10 mb-10">
        <div
          style={{
            fontSize: "1.4rem",
            fontStyle: "bold",
            fontFamily: "monospace",
            background: "black",
            color: "white",
            padding: "8px 20px"
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
            <div className="grid grid-rows-4 grid-cols-2">
            <TextField
            id="standard-basic"
            label="Student Id"
            variant="outlined"
            error={studentIdError}
            onChange={(e) => setStudentId(e.target.value)}
            sx={{ width: "400px", margin: "10px"}}
            required="true"
          />
          <TextField
            id="standard-basic"
            label="Student Name"
            variant="outlined"
            error={nameError}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: "400px", margin: "10px"}}
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
    </>
  );
}

export default function Home() {
  return (
    <>
      <BasicTable />
    </>
  );
}
