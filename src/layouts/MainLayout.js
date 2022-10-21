import React,{useState} from "react";
import {Outlet} from "react-router-dom";
import Grid from "@mui/material/Grid";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import MovieCard from "../components/MovieCard";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import SearchAppBar from "../components/SearchAppBar";

export const ExampleContext = React.createContext();
function MainLayout({children}) {
    const [loading, setLoading] = useState();
    const [searchMovie, setSearchMovie] = useState();
    const [searchInput, setSearchInput] = useState("")
    const [movied, setMovied] = useState([])
    const store ={
        loading: [loading, setLoading],
        searchMovie: [searchMovie, setSearchMovie],
        searchInput: [searchInput, setSearchInput],
        movied : [movied, setMovied]
    }
  
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
  
   
  const placeholder = [0, 1, 2, 3];
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );

    return (
        <ExampleContext.Provider value={store}>
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <MainHeader/>
                <SearchAppBar/>
            </Grid>
            <Grid item xs={10} mt={5}>
                <Outlet/>
                {movied.length > 0 
                ?
                 <>
                  <Grid container direction="row" spacing={5} mt={2}>
                {loading
        ? placeholder.map((item) => (
            <Grid item xs={6} sm={4} md={3}>
              {detailSkeleton}
            </Grid>
          ))
        : movied.map((item) => (
            <Grid item xs={6} sm={4} md={3}>
              <MovieCard item={item} />
            </Grid>
          ))}
         </Grid>
                 
                 </> 


                : {children}}
            </Grid>
            <Grid item xs={12}>
                <MainFooter/>
            </Grid>
        </Grid>
        </ExampleContext.Provider>
    )
}
export default MainLayout;