import { Mail, Notifications } from '@mui/icons-material'
import {Badge, Box, IconButton, Tooltip, Avatar} from '@mui/material'
import { useValue } from '../../context/ContextProvider'
import UserMenu from './UserMenu';
import React, { useState } from 'react';
import useCheckToken from '../../hooks/useCheckToken';

const UserIcons = () => {
    useCheckToken()

    const {state:{currentUser}} = useValue();

    const [anchorUserMenu, setAnchorUserMenu] = useState(null) //means closed

    return (
    <Box>
        <Tooltip title = 'Open Mailbox'>
            <IconButton size = 'large' color='inherit'>
                <Badge color = 'error' badgeContent={30}>
                    <Mail/>
                </Badge>
            </IconButton>
        </Tooltip>
        <Tooltip title = 'Open Notifications'>
            <IconButton size = 'large' color='inherit'>
                <Badge color = 'error' badgeContent={2}>
                    <Notifications/>
                </Badge>
            </IconButton>
        </Tooltip>
        <Tooltip title = 'Open User Settings'>
            <IconButton onClick = {(e)=>setAnchorUserMenu(e.currentTarget)}>
                <Avatar src={currentUser?.photoURL} alt={currentUser?.name}>
                    {currentUser?.name?.charAt(0).toUpperCase()}
                </Avatar>
            </IconButton>
        </Tooltip>
        <UserMenu {...{anchorUserMenu, setAnchorUserMenu}}/>
    </Box>
  );
};

export default UserIcons
