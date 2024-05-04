import React, { useState, useEffect } from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import Loader from "react-spinners/BeatLoader";
import { useSelector, useDispatch } from 'react-redux'

import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { useTheme } from '@emotion/react';

import Header from './../../components/Header';
import Sidebar from '../../components/Sidebar';

import { fetchJobs } from '../../redux/actionCreator'

import JobCard from './../../components/JobCard'

import DropdownMultipleSearchSelection from '../../components/DropdownInput';
import { LOCATION_NAME, ROLES } from '../../utils/appConstant';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(0),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(0),
                },
            }),
        },
    }),
);

function Home({ colorMode }) {
    const [limit, setLimit] = useState(25)
    const [offSet, setOffSet] = useState(0)


    const theme = useTheme()
    const [open, setOpen] = React.useState(true);
    const [openMobile, setOpenMobile] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
        setOpenMobile(!openMobile);
    };


    const dispatch = useDispatch()
    const { isLoading, jobList, totalCount } = useSelector((state) => state.jobs);
    const { roles: roleFilter, location: locationFilter, search: searchFilter } = useSelector((state) => state.filters);

    useEffect(() => {

        dispatch(fetchJobs({ limit: limit, offset: offSet }))

    }, [offSet])

    const handleScroll = (e) => {
        const element = e.currentTarget
        if (Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop) < 1) {
            setOffSet(prev => prev + 25)
        }
    }

    useEffect(() => {
        document.querySelector("main").addEventListener("scroll", handleScroll)
        return () => {
            document.querySelector("main").removeEventListener('scroll', handleScroll);
        };
    }, [])

    const filteredByRole = roleFilter.length > 0 ? jobList?.filter(item =>
        roleFilter.some(filterItem => item.jobRole === filterItem.value)
    ) : jobList;

    const jobFilteredList = locationFilter.length > 0 ? filteredByRole.filter(item =>
        locationFilter.some(filterItem => item?.location?.toLowerCase() === filterItem.value)
    ) : filteredByRole;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open} sx={{ display: { md: "block", sm: "none", xs: "none" } }}>
                <Header toggleDrawer={toggleDrawer} colorMode={colorMode} />
            </AppBar>

            <MuiAppBar open={openMobile} sx={{ display: { md: "none", sm: "block", xs: "block" } }}>
                <Header toggleDrawer={toggleDrawer} colorMode={colorMode} />
            </MuiAppBar>



            <Drawer variant="permanent" open={open} sx={{ display: { md: "block", sm: "none", xs: "none" } }}>
                <Sidebar toggleDrawer={toggleDrawer} open={open} drawerWidth={drawerWidth} >
                    <Box>
                        <Typography sx={{ p: 1, fontWeight: 700 }}>Filters</Typography>
                        <DropdownMultipleSearchSelection label={"Roles"} options={ROLES} values={roleFilter} />
                        <DropdownMultipleSearchSelection label={"Location"} options={LOCATION_NAME} values={locationFilter} />
                    </Box>
                </Sidebar>
            </Drawer>

            <MuiDrawer open={openMobile} sx={{ display: { md: "none", sm: "block", xs: "block" } }} onClose={toggleDrawer} >
                <Sidebar toggleDrawer={toggleDrawer} open={openMobile} drawerWidth={drawerWidth} >
                    <Box >
                        <DropdownMultipleSearchSelection label={"Roles"} options={ROLES} values={roleFilter} />
                        <DropdownMultipleSearchSelection label={"Location"} options={LOCATION_NAME} values={locationFilter} />
                    </Box>
                </Sidebar>
            </MuiDrawer>
            <Box component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "calc(100vh - 0px)",
                    overflow: 'auto',
                    scrollBehavior: 'smooth'
                }}>
                <Toolbar />
                <Container sx={{ py: 4 }} maxWidth="lg">
                    <Grid container spacing={2}>
                        {jobFilteredList?.filter(item => JSON.stringify(item?.companyName)?.toLocaleLowerCase()?.includes(searchFilter?.trim()?.toLowerCase()))?.map((item, key) => (
                            <Grid item key={key} xs={12} sm={6} md={4}>
                                <JobCard job={item} />
                            </Grid>
                        ))}
                    </Grid>
                    {isLoading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", height: 100, alignItems: "center" }}>
                            <Loader
                                style={{ padding: 5, mb: 5 }}
                                loading={isLoading}
                            /></Box>) : null}
                </Container>
            </Box>
        </Box>
    )
}
export default Home
