import React, { useState } from 'react';
import OneCourseQuizizz from './quizComponents/oneCourseQuizizz';
import OneCourseDocuments from './documentCompnents/oneCourseDocuments';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import App_Bar from './appBar';
import Container from '@material-ui/core/Container';
import SchoolIcon from '@material-ui/icons/School';
import DescriptionIcon from '@material-ui/icons/Description';
import './styles/quizList.css';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const useStyles = makeStyles((theme) => ({
    btn: {
        marginLeft: 8,
        marginBottom: 20,
    }
}))


function OneCourseMatreial(props) {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [material, setMaterials] = useState("quizizz");

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSetMaterials = (material) => {
        setMaterials(material);
        setAnchorEl(null);
    }


    return (
        <div>
            <App_Bar backgroundColor={`${material === "quizizz" ? "#007991" : "#5F1C5A"}`} />
            <Container maxWidth="lg">
                <div>
                    <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                        className={classes.btn}
                        style={{ backgroundColor: `${material === "quizizz" ? "#0A636D" : "#7E1476"}` }}
                    >
                        Choose Material
                    </Button>
                    <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => handleSetMaterials("quizizz")}>
                            <ListItemIcon>
                                <SchoolIcon fontSize="large" />
                            </ListItemIcon>
                            <ListItemText primary="Quizizz" />
                        </MenuItem>
                        <MenuItem onClick={() => handleSetMaterials("documents")}>
                            <ListItemIcon>
                                <DescriptionIcon fontSize="large" />
                            </ListItemIcon>
                            <ListItemText primary="Documents" />
                        </MenuItem>
                    </StyledMenu>
                </div>
                {material === "quizizz" && <OneCourseQuizizz course_name={props.match.params.course_name} />}
                {material === "documents" && <OneCourseDocuments course_name={props.match.params.course_name} />}
            </Container>
        </div >
    );
}

export default OneCourseMatreial;