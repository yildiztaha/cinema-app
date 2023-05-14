import React, { useState, useEffect } from "react";
import "./Pay.css";
import { useNavigate } from 'react-router-dom';

const Pay = () => {
  const [ticketInfo, setTicketInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ticketInfo = JSON.parse(localStorage.getItem("TicketInfo"));
    if (ticketInfo) {
      setTicketInfo(ticketInfo);
    }
  }, []);

  const handleCompletePay = ()=>{
    navigate('/ticket')
  }

  return (
    <div>
      <div class="container">
        <div class="movie-info">
          <h4>Film Adı: {ticketInfo.moviename}</h4>
          <h4>Seçili koltuklar:</h4>
          {ticketInfo.seats?.map(p=>{
            return(
                <a>{p},</a>
            )
          })}
          <h3>Toplam Ücret: {ticketInfo.price} ₺</h3>
        </div>
        <h1>Ödeme Bilgileri</h1>
          <label for="card-number">Kredi Kartı Numarası</label>
          <input
            type="text"
            id="card-number"
            name="card-number"
            placeholder="Kredi kartı numaranızı girin"
          />

          <label for="expiry-date">Son Kullanma Tarihi</label>
          <input
            type="text"
            id="expiry-date"
            name="expiry-date"
            placeholder="MM/YY"
          />

          <label for="security-code">Güvenlik Kodu</label>
          <input
            type="number"
            id="security-code"
            name="security-code"
            placeholder="Güvenlik kodunu girin"
          />

          <button onClick={handleCompletePay}>Ödemeyi Tamamla</button>
      </div>
    </div>
  );
};

export default Pay;
