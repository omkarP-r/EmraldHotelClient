import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ApiService from '../../service/ApiService';

const RoomResult = ({ roomSearchResults }) => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const isAdmin = ApiService.isAdmin();
    return (
        <section className="room-results">
            {roomSearchResults && roomSearchResults.length > 0 && (
                <div className="room-list">
                    {roomSearchResults.map(room => (
                        <div key={room.id} className="room-list-item">
                            <img className='room-list-item-image' src={room.roomPhotoUrl} alt={room.roomType} />
                            <div className="room-details">
                                <h3>{room.roomType}</h3>
                                <p>Price: ${room.roomPrice} / night</p>
                                <p>Description: {room.roomDescription}</p>
                            </div>

                           

                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default RoomResult;