import React, { createContext, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { useSearchParams } from "react-router-dom";

const HotelContext = createContext();

function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { isLoading, data: hotels } = useFetch("http://localhost:5000/hotels", `q=${destination || ""}&accommodates_gte=${room || 1}`); // q ==> search in all data with q

  return <HotelContext.Provider value={{ isLoading, hotels }}>{children}</HotelContext.Provider>;
}

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelContext);
}
