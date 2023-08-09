import React from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

function MenuButton() {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const navigate = useNavigate();

    const loginRouter = () => {
        Cookies.set('logged', 'false');
        Cookies.set('rut', '');
        navigate('/');
      }


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

  return (
    <Box sx={{ flexGrow: 0 }}>
<Tooltip title="Open settings">
  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
  </IconButton>
</Tooltip>
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
{Cookies.get('logged') === 'true' ? (
    <>
        <MenuItem onClick={loginRouter}>
        <Typography textAlign="center">Cerrar Sesión</Typography>
      </MenuItem>
    </>
    ):(
        <>
        <MenuItem onClick={()=>navigate('/Login')}>
          <Typography textAlign="center">Iniciar Sesión</Typography>
        </MenuItem>
        <MenuItem onClick={()=>navigate('/SignUp')}>
        <Typography textAlign="center">Registrarse</Typography>
      </MenuItem>
      </>
        )
}
</Menu>
</Box>
  )
}

export default MenuButton



