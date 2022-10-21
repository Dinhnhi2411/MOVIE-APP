import React,{useState} from 'react'
import apiService from '../api/apiService';
import MovieCard from './MovieCard';
import { Box } from '@mui/system';
import { API_KEY } from '../api/config';
import SearchAppBar from './SearchAppBar';

function RenderSearch() {
  const [loading, setLoading] = useState();
  const [searchMovie, setSearchMovie] = useState();
  const [searchInput, setSearchInput] = useState("")
  const [movied, setMovied] = useState([])
  // https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=titanic&page=1

  
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
    <>
    <SearchAppBar
    handleSubmit={handleSubmit}
    searchInput={searchInput}
    setSearchInput={setSearchInput}
    ></SearchAppBar>
     <Box>
    {movied?.map((item)=>(
      <MovieCard item={item}/>
    ))}
  </Box>
  </>
  )
}

export default RenderSearch;
