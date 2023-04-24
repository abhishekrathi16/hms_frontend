import React, { useState, useEffect } from "react";
import ComplaintCard from "./ComplaintCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const baseUrl =
  "https://django-server-production-b3bd.up.railway.app/api/complaints/";

const Complaints = () => {
  const [complaints, setComplaints] = useState(null);

  const [complaintDesc, setComplaintDesc] = useState("");
  const [studentId, setStudentId] = useState(0);

  const [isResolved, setResolved] = useState(false);

  const [studentIdError, setStudentIdError] = useState("");
  const [complaintDescError, setComplaintDescError] = useState("");

  useEffect(() => {
    try {
      axios.get(baseUrl).then((response) => {
        setComplaints(response.data);
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  }, [complaints]);
  // console.log(complaints);

  const handleAdd = (event) => {
    event.preventDefault();

    setStudentIdError(false);
    setComplaintDescError(false);

    if (studentId === "") {
      setStudentIdError(true);
    }
    if (complaintDesc === "") {
      setComplaintDescError(true);
    }

    if (studentId && complaintDesc) {
      axios
        .post(baseUrl, {
          description: complaintDesc,
          is_resolved: false,
          student_id: studentId,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div>
        {complaints?.map((complaint) => {
          return (
            <ComplaintCard
              key={complaint._id}
              complaintId={complaint._id}
              description={complaint.description}
              isResolved={complaint.is_resolved}
              studentId={complaint.student_id}
            />
          );
        })}
      </div>
      <div className="mb-10">
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
          Add Complaint
        </div>
        <form
          className="mt-4"
          onSubmit={handleAdd}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
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
            label="Complaint Description"
            variant="outlined"
            error={complaintDescError}
            onChange={(e) => setComplaintDesc(e.target.value)}
            sx={{ width: "400px", margin: "10px" }}
            required="true"
          />
          <Button
            variant="outlined"
            type="submit"
            sx={{ width: "auto", margin:"10px" }}
          >
            Add Complaint
          </Button>
        </form>
      </div>
    </>
  );
};

export default Complaints;
