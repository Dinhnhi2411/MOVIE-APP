import React, {useState} from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import  FTextField from "./form/FTextField";
import InputAdornment  from "@mui/material/InputAdornment";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams} from 'react-router-dom';
import Box from '@mui/material/Box';


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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));




function SearchAppBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");
  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
        
  //       const res = await apiService.get(
  //         `genre/movie/q?api_key=${API_KEY}&language=en-US`
         
  //       );
  //       console.log("data", res)
        
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   };
  //   fetchData();
  // }, []);
  const handleSubmit =(e)=>{
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let q = formData.get("q");
    setSearchParams({q: q});
  };
  
  return (
    <Box component="form" onSubmit={handleSubmit}>  
    <Search>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
      name="q"
      placeholder="Search…"
      inputProps={{ "aria-label": "search" }}
    />
  </Search>
  </Box>
    );
  }
export default SearchAppBar;