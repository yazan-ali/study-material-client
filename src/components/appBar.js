import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import DescriptionIcon from '@material-ui/icons/Description';
import './styles/appBar.css';
import { AuthContext } from './userContext';
import { useQuery } from '@apollo/client';
import { FETCH_COURSE_NAME_QUERY } from '../util/graphql'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    search: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#E7EEE9",
        '&:hover': {
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: theme.spacing(1),
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    listItem: {
        textDecoration: "none",
        color: "black",
    }
}));

function App_Bar(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const { user, logout } = useContext(AuthContext);

    const { data } = useQuery(FETCH_COURSE_NAME_QUERY);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = (evt, reason) => {
        if (reason === 'clickaway') {
            setOpen(false);
        }
        setOpen(false);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleSearch = (evt) => {
        setSearch(evt.target.value);
    }

    const filteredCourses =
        search !== "" ?
            data.getCourseName.filter(c => {
                return c.toLowerCase().includes(search.toLowerCase())
            })
            : [];

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {user ?
                <>
                    <MenuItem><a style={{ color: `${props.backgroundColor}`, textDecoration: "none" }} href={`/dashbord/${user.username}`}>{user.username}</a></MenuItem>
                    <MenuItem onClick={logout}><span style={{ color: `${props.backgroundColor}`, textDecoration: "none" }}>Logout</span></MenuItem>
                </>
                :
                <>
                    <MenuItem onClick={handleMenuClose}><a style={{ color: `${props.backgroundColor}`, textDecoration: "none" }} href="/login">Login</a></MenuItem>
                    <MenuItem onClick={handleMenuClose}><a style={{ color: `${props.backgroundColor}`, textDecoration: "none" }} href="/register">Sing up</a></MenuItem>
                </>
            }
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {user ?
                <>
                    <MenuItem><a style={{ color: `${props.backgroundColor}`, textDecoration: "none" }} href={`/dashbord/${user.username}`}>{user.username}</a></MenuItem>
                    <MenuItem onClick={logout}><span style={{ color: `${props.backgroundColor}`, textDecoration: "none" }} >Logout</span></MenuItem>
                </>
                :
                <>
                    <MenuItem onClick={handleMenuClose}><a style={{ color: `${props.backgroundColor}`, textDecoration: "none" }} href="/login">Login</a></MenuItem>
                    <MenuItem onClick={handleMenuClose}><a style={{ color: `${props.backgroundColor}`, textDecoration: "none" }} href="/register">Sing up</a></MenuItem>
                </>
            }
        </Menu>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                style={{ backgroundColor: props.backgroundColor }}
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        Study-Material
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <a className={classes.listItem} href="/"><ListItemText primary="Home" /></a>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><SchoolIcon /></ListItemIcon>
                        <a className={classes.listItem} href="/quiz"><ListItemText primary="Quizizz" /></a>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><DescriptionIcon /></ListItemIcon>
                        <a className={classes.listItem} href="/documents"><ListItemText primary="Documents" /></a>
                    </ListItem>
                    <ListItem>
                        <div className={classes.search}>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                onChange={handleSearch}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                            <div className="vertical-menu">
                                {filteredCourses.map(c => (
                                    <>
                                        <a href={`/${c}`}>{c}</a>
                                    </>
                                ))}
                            </div>
                        </div>
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
            </main>
        </div >
    );
}

export default App_Bar;