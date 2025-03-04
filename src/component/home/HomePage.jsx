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
            {/* HEADER / BANNER ROOM SECTION */}
            <section>
                <header className="header-banner">
                    <img src="./assets/images/hotel.webp" alt="Phegon Hotel" className="header-image" />
                    <div className="overlay"></div>
                    <div className="animated-texts overlay-content">
                        <h1>
                            Welcome to <span className="phegon-color">Hotel Emrald</span>
                        </h1><br />
                        <h3>Step into a haven of comfort and care</h3>
                    </div>
                </header>
            </section>

           
        </div>
    );
}

export default HomePage;