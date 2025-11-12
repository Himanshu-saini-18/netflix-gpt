import React, { useEffect } from "react";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";
import { API_Options } from "../utils/constants";

const useMovieTrailer = (movieId) => {
  //fetch tariler video  && updating the store with trailer video data

  const dispatch = useDispatch();
  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",
      API_Options
    );
    const json = await data.json();
  

    const filterData = json.results.filter((video) => video.type == "Trailer");
    const trailer = filterData.length == 0 ? filterData[0] : json.results[0];

    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieVideo();
  }, []);
};

export default useMovieTrailer;
