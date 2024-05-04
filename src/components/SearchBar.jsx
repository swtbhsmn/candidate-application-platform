import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import {updateSearch} from '../redux/filterSlice';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
    display: "flex",
    flexDirection: "row-reverse"
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: "pointer",
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    }
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('xs')]: {
            width: '18ch',
            paddingLeft: `calc(1em + ${theme.spacing(1)})`
        },
        [theme.breakpoints.up('sm')]: {
            width: '22ch'
        },
        [theme.breakpoints.up('md')]: {
            width: '36ch'
        },
        [theme.breakpoints.up('lg')]: {
            width: '50ch'
        },
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        }
    },
}));

const SearchBar = (props) => {

    const dispatch = useDispatch()
    const onChangeHandler = (e)=>{
        dispatch(updateSearch(e.target.value))
    }
    return (
        <Search>
            <StyledInputBase
                placeholder="Search Company…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={onChangeHandler}
            />
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
        </Search>
    )
}
export default SearchBar;
