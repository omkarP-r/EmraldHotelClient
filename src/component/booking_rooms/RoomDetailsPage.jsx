import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService'; // Assuming your service is in a file called ApiService.js
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

const RoomDetailsPage = () => {
  const navigate = useNavigate(); // Access the navigate function to navigate
  const { roomId } = useParams(); // Get room ID from URL parameters
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track any errors
  const [checkInDate, setCheckInDate] = useState(null); // State variable for check-in date
  const [checkOutDate, setCheckOutDate] = useState(null); // State variable for check-out date
  const [numAdults, setNumAdults] = useState(1); // State variable for number of adults
  const [numChildren, setNumChildren] = useState(0); // State variable for number of children
  const [totalPrice, setTotalPrice] = useState(0); // State variable for total booking price
  const [totalGuests, setTotalGuests] = useState(1); // State variable for total number of guests
  const [showDatePicker, setShowDatePicker] = useState(false); // State variable to control date picker visibility
  const [userId, setUserId] = useState(''); // Set user id
  const [showMessage, setShowMessage] = useState(false); // State variable to control message visibility
  const [confirmationCode, setConfirmationCode] = useState(''); // State variable for booking confirmation code
  const [errorMessage, setErrorMessage] = useState(''); // State variable for error message

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading state to true
        const response = await ApiService.getRoomById(roomId);
        setRoomDetails(response.room);
        const userProfile = await ApiService.getUserProfile();
        setUserId(userProfile.user.id);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching or error
      }
    };
    fetchData();
  }, [roomId]); // Re-run effect when roomId changes

  const handleConfirmBooking = async () => {
    // Check if check-in and check-out dates are selected
    if (!checkInDate || !checkOutDate) {
      setErrorMessage('Please select check-in and check-out dates.');
      setTimeout(() => setErrorMessage(''), 5000); // Clear error message after 5 seconds
      return;
    }

    // Check if number of adults and children are valid
    if (isNaN(numAdults) || numAdults < 1 || isNaN(numChildren) || numChildren < 0) {
      setErrorMessage('Please enter valid numbers for adults and children.');
      setTimeout(() => setErrorMessage(''), 5000); // Clear error message after 5 seconds
      return;
    }

    // Calculate total number of days
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

    // Calculate total number of guests
    const totalGuests = numAdults + numChildren;

    // Calculate total price
    const roomPricePerNight = roomDetails.roomPrice;
    const totalPrice = roomPricePerNight * totalDays;

    setTotalPrice(totalPrice);
    setTotalGuests(totalGuests);
  };

  const acceptBooking = async () => {
    try {

      // Ensure checkInDate and checkOutDate are Date objects
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);

      // Log the original dates for debugging
      console.log("Original Check-in Date:", startDate);
      console.log("Original Check-out Date:", endDate);

      // Convert dates to YYYY-MM-DD format, adjusting for time zone differences
      const formattedCheckInDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
      const formattedCheckOutDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

// Log the original dates for debugging
console.log("Formated Check-in Date:", formattedCheckInDate);
console.log("Formated Check-out Date:", formattedCheckOutDate);

// Create booking object
const booking = {
  checkInDate: formattedCheckInDate,
  checkOutDate: formattedCheckOutDate,
  numOfAdults: numAdults,
  numOfChildren: numChildren
};
console.log(booking)
console.log(checkOutDate)

