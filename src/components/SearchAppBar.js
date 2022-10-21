import React, {useState} from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Box from '@mui/material/Box';
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import { Button } from "@mui/material";




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
   
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));


function SearchAppBar() {
  const [loading, setLoading] = useState();
  const [searchMovie, setSearchMovie] = useState();
  const [searchInput, setSearchInput] = useState("")
  const [movied, setMovied] = useState([])

  React.useEffect(()=> {
  
    const fetchData = async() =>{
      try{
        setLoading(true)
        const res = await apiService.get(`search/movie?api_key=${API_KEY}&query=${searchMovie}&page=1`);
        setMovied(res.data.results)
        
        setLoading(false);
      } catch (e) {
        console.log(e.message)
      }
    }
    fetchData();
    
  },[searchMovie])

  const handleSubmit =(e) =>{
    e.preventDefault();
    setSearchMovie(searchInput);
  }
 

  return (
    <Box display="flex" flexDirection="row">
   
    <Search>
    <SearchIconWrapper>
     
    </SearchIconWrapper>
    <StyledInputBase
    
      value={searchInput}
      onChange={(e)=> setSearchInput(e.target.value)}
      placeholder="Search…"
      inputProps={{ "aria-label": "search" }}
      
    />
  </Search>
  <Button onClick={handleSubmit} color="inherit">
    Search
    </Button>
  

  </Box>
  )


  

}
export default SearchAppBar;