import React, { useState } from "react";
 import RoomResult from "../common/RoomResult";
 import RoomSearch from "../common/RoomSearch";




const HomePage = () => {

    const [roomSearchResults, setRoomSearchResults] = useState([]);

    // Function to handle search results
    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    };

 

    return (
        <div className="home">
           
        </div>
    );
}

export default HomePage;