import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from 'next/router'
import useLoggerStore from "@/store/login_logoutStore";
import { loggedInProfileStore } from "@/store/profileStore";

const Login = () => {
  const [username, setUserName] = useState("");
  const [hallId, setHallId] = useState("")
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [hallIdError, setHallIdError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const state = useLoggerStore();
  const loggerProfileStore = loggedInProfileStore()

  const router = useRouter()

  const submitHandler = (event) => {
    event.preventDefault();

    setUsernameError(false);
    setPasswordError(false);
    setHallIdError(false);

    if (username == "") {
      setUsernameError(true);
    }
    if (password == "") {
      setPasswordError(true);
    }
    if(hallId==""){
      setHallIdError(true);
    }

    if (username && password && hallId) {
      loggerProfileStore.setProfile(username,hallId,password)
      state.setLogger()
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
          Login
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
            error={usernameError}
            onChange={(e) => setUserName(e.target.value)}
            sx={{ width: "400px", margin: "10px"}}
            required="true"
          />
          <TextField
            id="standard-basic"
            label="Hall Id"
            variant="outlined"
            error={hallIdError}
            onChange={(e) => setHallId(e.target.value)}
            sx={{ width: "400px", margin: "10px"}}
            required="true"
          />
          <TextField
            id="filled-password-input"
            label="Password"
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
            sx={{ marginTop: "15px", width: "80px" }}
          >
            Login
          </Button>
        </form>
        <div className="mt-[20px] text-xs">
          Not Registered Yet? Click{" "}
          <Link href="/register" className="text-cyan-600">
            here
          </Link>{" "}
          to register.
        </div>
      </div>
    </div>
  );
};

export default Login;
