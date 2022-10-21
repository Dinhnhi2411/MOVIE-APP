import React, {useState} from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Box from '@mui/material/Box';

import { Button } from "@mui/material";

import { Link } from "react-router-dom";

import {ExampleContext} from '../layouts/MainLayout'




const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));



const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
   
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));


function SearchAppBar() {
  const {setSearchMovie} = React.useContext(ExampleContext)
  const {searchInput} = React.useContext(ExampleContext)
  const {setSearchInput} =  React.useContext(ExampleContext)

  const handleSubmit =(e) =>{
    e.preventDefault();
    setSearchMovie(searchInput);
  }

  return (
    <>
    <Box display="flex" flexDirection="row">
   
    <Search>
    <StyledInputBase
    
      value={searchInput}
      onChange={(e)=> setSearchInput(e.target.value)}
      placeholder="Search…"
      inputProps={{ "aria-label": "search" }}
      
    />
    </Search>
    <Button component={Link} to="/search"
    onClick={handleSubmit} 
    color="inherit"
    disableRipple={true}
    childen={<SearchIcon/>}
    >
      Search
    </Button>
  

  </Box>



</>

  )
}
export default SearchAppBar;