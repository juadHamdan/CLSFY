import * as React from 'react';
import { useState } from 'react';
import Login from './Login'
import Logout from './Logout'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const StartText = 'Get Started'
const LoginText = 'Login'
const LogoutText = 'Logout'

const pages = [StartText, LoginText];
const settings = [LogoutText];

const AppNavBar = ({handleHomeClick, handleStartClick, handleLogin, handleLogout, user}) => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onLoginSuccess = () => {
        setShowLoginModal(false)
    }

    const handleLogoutClick = () => {
        handleCloseNavMenu()
        setShowLogoutModal(true)
    }


  const handleItemClick = (event) => {
    let itemClickedTextLowered = event.target.innerText.toLowerCase()
    console.log(itemClickedTextLowered)
    if(itemClickedTextLowered === StartText.toLowerCase())
        handleStartClick();
    else if(itemClickedTextLowered === LoginText.toLowerCase())
        setShowLoginModal(true)
    handleCloseNavMenu()
  };

  return (
      <>
        <AppBar position="fixed" style={{color: "black", backgroundColor: "white"}}>
            <Container>
                <Toolbar disableGutters>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    >
                    <MenuIcon/>
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                    >
                    {pages.map((page) => (
                        <MenuItem key={page} onClick={handleItemClick}>
                        <Typography variant="button" display="block" gutterBottom textAlign="center">
                            <strong>{page}</strong>
                        </Typography>
                        </MenuItem>
                    ))}

                    <Login 
                        show={showLoginModal} 
                        onHide={() => setShowLoginModal(false)}
                        onLogin={handleLogin}
                        onLoginSuccess={onLoginSuccess}
                    />
                    <Logout 
                        show={showLogoutModal} 
                        onHide={() => setShowLogoutModal(false)}
                        onLogoutSuccess={handleLogout}
                    />


                    </Menu>
                </Box>

                <div style={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <Button>
                        <img onClick={handleHomeClick} src="img/CLSFYlogo.png" alt="logo" height="90rem" width="160rem"/>
                    </Button>
                </div>


                <Box sx={{ paddingLeft: "10rem", flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                    <Button
                        key={page}
                        onClick={handleItemClick}
                        sx={{ fontSize: "0.8rem", paddingLeft: "2rem", paddingRight: "2rem", my: 4, color: 'black', display: 'block' }}
                    >
                        <strong>{page}</strong>
                    </Button>
                    ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>

                    {user && user.photoURL?
                        <Avatar alt="User" src={user.photoURL} />
                    :
                        <AccountCircleRoundedIcon fontSize="large"/>
                    }
                    </IconButton>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleLogoutClick}>
                            <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>

                </Toolbar>
            </Container>
        </AppBar>
    </>
  );
};
export default AppNavBar;
