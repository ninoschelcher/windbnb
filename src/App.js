import { useState, useEffect } from "react";

import Header from "./components/organisms/Header";
import LocationOverview from "./components/organisms/LocationOverview";
import "./App.scss";
import Data from "./assets/stays.json";

function App() {
  const [search, setSearch] = useState(0);
  const [filter, setFilter] = useState({
    location: "Helsinki",
    guests: {
      adults: 1,
      children: 0,
    },
  });

  const [stays, setStays] = useState([]);

   useEffect(() => {
    if(search === 1){
      setStays(stays.filter((item) => item.city === filter.location && filter.guests.adults + filter.guests.children <= item.maxGuests));
      setSearch(0);
    }
  }, [filter.guests.adults, filter.guests.children, filter.location, search, stays]);

  useEffect(() => {
    setStays(Data);
  }, [filter]);
  

  return (
    <div className="App">
      <Header
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />
      <LocationOverview
        stays={stays}
      />
    </div>
  );
}

export default App;
