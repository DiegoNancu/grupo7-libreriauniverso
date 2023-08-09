import * as React from 'react';
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
import { Link,useNavigate  } from 'react-router-dom';
import logo from "../assets/logo.jpg";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MenuButton from '../components/MenuButton';
import Cookies from 'js-cookie';
import TextField from '@mui/material/TextField';


const pages = [
  {
    name: 'Productos', route: '/ListProducts',
  },
  {
    name: 'Chat', route: '/Chat',
  },
  {
    name: 'Historial', route: '/HistorialCompras',
  },
];
const pagesadmin = [
  {
    name: 'Productos', route: '/ListProducts',
  },
  {
    name: 'Chat', route: '/Chat',
  },
  {
    name: 'Historial', route: '/HistorialCompras',
  },
  {
  name: 'Admin', route: '/AdminPubli',
  },
];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [searchText, setSearchText] = React.useState('');
  const history = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#335eff'}}> 
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%'}}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                display: { xs: 'none', md: 'block' },
              }}
            >
              <Avatar sx={{ flexGrow: 1, display: { xs: 'flex' } }} alt="Remy Sharp" src={logo} />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {Cookies.get('logged') === 'true' ? (
                pagesadmin.map((page) => (
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ mx: 2, color: 'white', display: 'block' }}
                    component={Link}
                    to={page.route}
                  >
                    {page.name}
                  </Button>
                ))
              ) : (
                pages.map((page) => (
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ mx: 2, color: 'white', display: 'block' }}
                    component={Link}
                    to={page.route}
                  >
                    {page.name}
                  </Button>
                ))
              )}

            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
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
              {Cookies.get('logged') === 'true' ? (
                pagesadmin.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    {page.name}
                  </Typography>
                </MenuItem>
                ))
              ) : (
                pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    {page.name}
                  </Typography>
                </MenuItem>
                ))
              )}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>

                <StyledInputBase
                  placeholder="Buscar…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchText}
                  onChange={(event) => {
                    setSearchText(event.target.value);
                  }}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      console.log(event)
                      // Realiza la redirección con el texto ingresado en el campo
                      if (searchText.trim() !== '') {
                        history(`/results/${searchText}`);
                      }

                    }
                  }}
                />


              </Search>
            </Box>

            
          </Box>
          <MenuButton></MenuButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;

