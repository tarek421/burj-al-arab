import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userContext } from "../../App";
import "./Book.css";
import toast from "react-hot-toast";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Bookings from "../Bookings/Bookings";
const Book = () => {
  const { bedType } = useParams();
  const [loggedInUser] = useContext(userContext);
  const [value, setValue] = useState([new Date(), new Date()]);

  const handleBooking = () => {
    console.log(value[0]);
    const checkIn = (value[0]);
    const checkOut = (value[1]);
    const CheckDate = {checkIn, checkOut};
    console.log(CheckDate)
    const newBooking = { ...loggedInUser, ...CheckDate };
    fetch("http://localhost:5000/addBookings", {
      method: "POST",
      body: JSON.stringify(newBooking),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then(res => res.json())
    .then(data=> {
      console.log(data);
      toast.success('Successfully Add Bookings');
    })
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        Hello {loggedInUser.name} Let's book a {bedType} Room.
      </h1>
      <p>
        Want a <Link to="/home">different room?</Link>{" "}
      </p>

      <div className="date-container">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            startText="Check-in"
            endText="Check-out"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
      </div>
      <Button onClick={handleBooking}>Book Now</Button>
      <Bookings />
    </div>
  );
};

export default Book;
