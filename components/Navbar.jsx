import * as React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useRouter } from 'next/router'
import useLoggerStore from "@/store/login_logoutStore";

const pages = ["Students", "Complaints", "Management", "Salary"];
const loggedOutSettings = ["Login", "Register"];

function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const state = useLoggerStore();
  console.log(state);

  const router = useRouter()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    // props.setIsLoggedIn(false)
    state.setLogger()
    router.push("/")
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ backgroundColor: "black" }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            // component="a"
            // href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Hall Management Portal
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                className={`${state.loggedIn ? "" : "none"}`}
              >
                <Link href={`/` + page.toLowerCase()}>{page}</Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {state.loggedIn ? 
                <div>
                  <MenuItem key="1" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link
                        href={`/profile`}
                      >
                        Profile
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem key="2" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link
                        href={`/dashboard`}
                      >
                        Dashboard
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem key="3" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link
                        href={`/account`}
                      >
                        Account
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem key="4" onClick={handleLogOut}>
                    <Typography textAlign="center">
                        Logout
                    </Typography>
                  </MenuItem>
                </div>
               : (
                loggedOutSettings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link
                        href={`/` + setting.toLowerCase().replace(/\s/g, "")}
                      >
                        {setting}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;