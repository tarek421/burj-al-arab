import React, { useContext, useState, useEffect } from 'react';
import { userContext } from "../../App";

const Bookings = () => {
   const [loggedInUser] = useContext(userContext);
   console.log(loggedInUser);
   const [bookings, setBookings] = useState([]);

   useEffect(() => {
      fetch(`http://localhost:5000/bookings?email=`+loggedInUser.email,{
         method: 'GET',
         headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${sessionStorage.getItem('idToken')}`
         }
      })
      .then((response) =>response.json())
      .then(data =>setBookings(data))
   },[loggedInUser.email])

   return (
      <div>
         <h4>you Have {bookings.length} bookings</h4>
         {
            bookings.map((booking) =><li>Name: {booking.name} From: {booking.checkIn} To: {booking.checkOut}</li>)
         }
      </div>
   );
};

export default Bookings;