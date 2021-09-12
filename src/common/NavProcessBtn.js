import React from 'react';
import { isLogin } from '../utils/auth';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ScheduleIcon from '@material-ui/icons/Schedule';

export default function NavProcessBtn() {

    let history = useHistory();

    const handleClick = () => {
        history.push("/secure/videos");
    }

    if (!isLogin()) {
        return null;
    }

    return (
        <ListItem onClick={handleClick} button key={"Video"}>
            <ListItemIcon><ScheduleIcon /></ListItemIcon>
            <ListItemText primary={"Video"} />
        </ListItem>
    )
}