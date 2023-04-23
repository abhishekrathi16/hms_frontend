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
  "https://django-server-production-b3bd.up.railway.app/api/staffs/";

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

function BasicTable() {
  const [staff, setStaff] = useState(null);

  // form inputs for students
  const [staffId, setStaffId] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [hallId, setHallId] = useState(0);
  const [salary, setSalary] = useState(0);

  // error control for form
  const [staffIdError, setStaffIdError] = useState("");
  const [nameError, setNameError] = useState("");
  const [positionError, setPositionError] = useState("");
  const [hallIdError, setHallIdError] = useState("");
  const [salaryError, setSalaryError] = useState("");

  const handleAdd = (event) => {
    event.preventDefault();

    setStaffIdError(false);
    setNameError(false);
    setPositionError(false);
    setHallIdError(false);
    setSalaryError(false);

    if (staffId === "") {
      setStaffIdError(true);
    }
    if (name === "") {
      setNameError(true);
    }
    if (position === "") {
      setPositionError(true);
    }
    if (hallId === "") {
      setHallIdError(true);
    }
    if (salary === "") {
      setSalaryError(true);
    }

    // to add new student details to the rows array
    if (staffId && name && position && hallId && salary) {
      axios.post(baseUrl, {
          _id: "",
          name: name,
          position: position,
          salary: salary,
          hall_no: hallId,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      setStaffId("");
      setName("");
      setPosition("");
      setHallId(0);
      setSalary(0);
    }
  };
  const handleDelete = (id) => {
    axios.delete(baseUrl + `${id}`);
  };

  useEffect(() => {
    try {
      axios.get(baseUrl).then((response) => {
        setStaff(response.data);
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  }, [staff]);
//   console.log(staff);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left" sx={{ width: "300px" }}>
                Staff ID
              </StyledTableCell>
              <StyledTableCell align="center">Staff Name</StyledTableCell>
              <StyledTableCell align="center">Position</StyledTableCell>
              <StyledTableCell align="center">Hall ID</StyledTableCell>
              <StyledTableCell align="center">Salary</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staff?.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  {row._id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.position}</TableCell>
                <TableCell align="center">{row.hall_no}</TableCell>
                <TableCell align="center">{row.salary}</TableCell>
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
          Add Staff
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
              label="Staff Id"
              variant="outlined"
              error={staffIdError}
              onChange={(e) => setStaffId(e.target.value)}
              sx={{ width: "400px", margin: "10px" }}
              required="true"
            />
            <TextField
              id="standard-basic"
              label="Staff Name"
              variant="outlined"
              error={nameError}
              onChange={(e) => setName(e.target.value)}
              sx={{ width: "400px", margin: "10px" }}
              required="true"
            />
            <TextField
              id="standard-basic"
              label="Position"
              variant="outlined"
              sx={{ width: "400px", margin: "10px" }}
              error={positionError}
              onChange={(e) => setPosition(e.target.value)}
              required="true"
            />
            <TextField
              id="standard-basic"
              label="Hall Id"
              variant="outlined"
              type="number"
              sx={{ width: "400px", margin: "10px" }}
              error={hallIdError}
              onChange={(e) => setHallId(e.target.value)}
              required="true"
            />
            <TextField
              id="standard-basic"
              label="Salary"
              type="number"
              variant="outlined"
              sx={{ width: "400px", margin: "10px" }}
              error={salaryError}
              onChange={(e) => setSalary(parseInt(e.target.value))}
              required="true"
            />
          </div>
          <Button
            variant="outlined"
            type="submit"
            sx={{ marginTop: "15px", width: "auto" }}
          >
            Add Staff
          </Button>
        </form>
      </div>
    </>
  );
}

export default function Staff() {
  return (
    <>
      <BasicTable />
    </>
  );
}
