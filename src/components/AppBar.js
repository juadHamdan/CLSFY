import * as React from 'react';
import { useState } from 'react';
import LoginModal from './authentication/LoginModal'
import LogoutModal from './authentication/LogoutModal'
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

const AppNavBar = ({handleHomeClick, handleStartClick, onLogin, onLogout, user}) => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLoginClick = () => {
        handleCloseNavMenu()
        setShowLoginModal(true)
    }

    const handleLogoutClick = () => {
        handleCloseNavMenu()
        setShowLogoutModal(true)
    }

  return (
    <div>
        <LoginModal 
            show={showLoginModal} 
            onHide={() => setShowLoginModal(false)}
            onLogin={onLogin}
        />
        <LogoutModal
            show={showLogoutModal} 
            onHide={() => setShowLogoutModal(false)}
            onLogout={onLogout}
        />

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
                            <MenuItem onClick={handleStartClick}>
                                <Typography variant="button" display="block" gutterBottom textAlign="center">
                                    <strong>{StartText}</strong>
                                </Typography>
                            </MenuItem>
                            {user?
                                <MenuItem onClick={handleLogoutClick}>
                                    <Typography variant="button" display="block" gutterBottom textAlign="center">
                                        <strong>{LogoutText}</strong>
                                    </Typography>
                                </MenuItem>
                            :
                                <MenuItem onClick={handleLoginClick}>
                                    <Typography variant="button" display="block" gutterBottom textAlign="center">
                                        <strong>{LoginText}</strong>
                                    </Typography>
                                </MenuItem>
                            }
                    </Menu>
                </Box>

                <div style={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <Button>
                        <img onClick={handleHomeClick} src="img/CLSFYlogo.png" alt="logo" height="90rem" width="160rem"/>
                    </Button>
                </div>


                <Box sx={{ paddingLeft: "10rem", flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Button
                        onClick={handleStartClick}
                        sx={{ fontSize: "0.8rem", paddingLeft: "2rem", paddingRight: "2rem", my: 4, color: 'black', display: 'block' }}
                    >
                        <strong>{StartText}</strong>
                    </Button>
                    {user?
                        <Button
                            onClick={handleLogoutClick}
                            sx={{ fontSize: "0.8rem", paddingLeft: "2rem", paddingRight: "2rem", my: 4, color: 'black', display: 'block' }}
                        >
                            <strong>{LogoutText}</strong>
                        </Button>
                    :
                        <Button
                            onClick={handleLoginClick}
                            sx={{ fontSize: "0.8rem", paddingLeft: "2rem", paddingRight: "2rem", my: 4, color: 'black', display: 'block' }}
                        >
                            <strong>{LoginText}</strong>
                        </Button>
                    }
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <IconButton sx={{ p: 0 }}>

                    {user && user.photoURL?
                        <Avatar alt="User" src={user.photoURL} />
                    :
                        <AccountCircleRoundedIcon fontSize="large"/>
                    }
                    </IconButton>
                </Box>

                </Toolbar>
            </Container>
        </AppBar>
    </div>
  );
};
export default AppNavBar;
