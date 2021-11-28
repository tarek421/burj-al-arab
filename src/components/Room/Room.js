import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";


import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import WcIcon from "@mui/icons-material/Wc";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { useHistory } from "react-router-dom";

export default function Room({ room }) {
  const history = useHistory();
  const handleBook = (bedType) => {
    history.push(`/book/${bedType}`);
  };

  console.log(room.bedType)
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar aria-label="recipe">{room.avatar}</Avatar>}
        title={room.title}
      />
        
      <CardMedia image={room.imgUrl} title="Paella dish" />
      <img src={`../../images/${room.bedType}.png`} alt="room" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {room.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <LocalHotelIcon />: {room.bed}
        </IconButton>
        <IconButton aria-label="share">
          <WcIcon />: {room.capacity}
        </IconButton>
        <IconButton aria-label="price">
          <AttachMoneyIcon />: {room.price}
        </IconButton>
        <Button
          onClick={() => handleBook(room.bedType)}
          variant="contained"
          color="primary"
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
}
