import React from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
export default function Sidebar({ children, drawerWidth }) {
    return (
        <React.Fragment>
            <Box sx={{ width: drawerWidth }} role="presentation">
                <Toolbar />
                {children}
            </Box>
        </React.Fragment>
    )
}
