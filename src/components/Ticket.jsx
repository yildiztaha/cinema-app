import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Ticket.css";
const Ticket = () => {
  const [ticketInfo, setTicketInfo] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    const ticketInfo = JSON.parse(localStorage.getItem("TicketInfo"));
    if (ticketInfo) {
      setTicketInfo(ticketInfo);
    }
  }, []);
  
  const comeBack = ()=>{
    navigate('/')
  }
  return <div>
    <div class="ticket">
      <h2>Film Bileti</h2>
      <p>Film Adı: <strong>{ticketInfo.moviename}</strong></p>
      <p>Tarih: <strong>15 Mayıs 2023</strong></p>
      <p>Saat: <strong>20:00</strong></p>
      <div class="ticket-info">
        <p class="ticket-price">Ücret: <strong>{ticketInfo.price} ₺</strong></p>
        <p class="ticket-seats">Koltuk No: {ticketInfo.seats?.map(p=>{
            return(
                <a>{p},</a>
            )
          })}</p>
      </div>
      <div class="ticket-details">
        <p class="ticket-date">14 Mayıs 2023</p>
        <p class="ticket-time">17:30</p>
      </div>
      <button onClick={comeBack} style={{marginLeft : "150px"}}>Ana Sayfa</button>
    </div>
  </div>;
};

export default Ticket;
