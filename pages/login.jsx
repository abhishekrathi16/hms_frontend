import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import register from "./register";

const Login = () => {
  const [hallId, setHallId] = useState("");
  const [password, setPassword] = useState("");
  const [idError, setIdError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const submitHandler = () => {
    event.preventDefault();

    setIdError(false);
    setPasswordError(false);

    if (email == "") {
      setIdError(true);
    }
    if (password == "") {
      setPasswordError(true);
    }

    if (hallId && password) {
      console.log(hallId, password);
    }
  };
  return (
    <div className="h-[80vh] w-[100vw] flex justify-center items-center">
      <div className="h-[50vh] w-[40vw] flex flex-col items-center justify-center border-[1px] rounded-lg shadow-lg px-[20px]">
        <div className="text-left">Login</div>
        <div className="m-[10px]">
          <TextField
            id="standard-basic"
            label="Hall Id"
            variant="outlined"
            error={idError}
            onChange={e=>setHallId(e.target.value)}
            sx={{ width: "400px" }}
            required="true"
          />
        </div>
        <div className="m-[10px]">
          <TextField
            id="filled-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            sx={{ width: "400px" }}
            error={passwordError}
            onChange={e=>setPassword(e.target.value)}
            required="true"
          />
        </div>
        <Button variant="outlined" type="submit">
          Login
        </Button>
        <div className="mt-[20px] text-xs">
          Not Registered Yet? Click <Link href="/register" className="text-cyan-600">here</Link> to register.
        </div>
      </div>
    </div>
  );
};

export default Login;
