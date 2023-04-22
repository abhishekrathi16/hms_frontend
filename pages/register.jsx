import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from 'next/router'
import useLoggerStore from "@/store/login_logoutStore";
import useProfileStore from "@/store/profileStore";

const Register = () => {
  const [hallId, setHallId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  const [role,setRole] = useState("")
  const [idError, setIdError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false)
  const [roleError, setRoleError] = useState(false)

  const state = useLoggerStore()
  const profileState = useProfileStore()

  const router = useRouter()

  const submitHandler = (event) => {
    event.preventDefault();

    setIdError(false);
    setPasswordError(false);

    if (hallId == "") {
      setIdError(true);
    }
    if (password == "") {
      setPasswordError(true);
    }
    if(name == "") {
      setNameError(true)
    }
    if(role== ""){
      setRoleError(true)
    }

    if (hallId && password && name && role) {
      state.setLogger()
      profileState.setProfile(name,hallId,role,password)
      router.push("/")
    }
  };
  return (
    <div className="h-[80vh] w-[100vw] flex justify-center items-center">
      <div className="h-auto w-[40vw] flex flex-col items-center justify-center border-[1px] rounded-lg shadow-lg px-[20px] py-[40px]">
        <div
          className="text-left"
          style={{
            letterSpacing: "5px",
            fontFamily: "monospace",
            fontSize: "2rem",
            marginBottom: "20px"
          }}
        >
          Register
        </div>
        <form
          onSubmit={submitHandler}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            id="standard-basic"
            label="User Name"
            variant="outlined"
            error={nameError}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: "400px", margin: "10px" }}
            required="true"
          />
          <TextField
            id="standard-basic"
            label="Hall Id"
            variant="outlined"
            error={idError}
            onChange={(e) => setHallId(e.target.value)}
            sx={{ width: "400px", margin: "10px" }}
            required="true"
          />
          <TextField
            id="standard-basic"
            label="Role"
            variant="outlined"
            error={roleError}
            onChange={(e) => setRole(e.target.value)}
            sx={{ width: "400px", margin: "10px" }}
            required="true"
          />
          <TextField
            id="filled-password-input"
            label="Set Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            sx={{ width: "400px", margin: "10px" }}
            error={passwordError}
            onChange={(e) => setPassword(e.target.value)}
            required="true"
          />
          <Button
            variant="outlined"
            type="submit"
            sx={{ marginTop: "15px", width: "80px", padding:"5px 50px" }}
          >
            Register
          </Button>
        </form>
        <div className="mt-[20px] text-xs">
          Already have an account? Click{" "}
          <Link href="/login" className="text-cyan-600">
            here
          </Link>{" "}
          to log in.
        </div>
      </div>
    </div>
  );
};

export default Register;
