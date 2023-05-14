import React, { useState, useEffect } from 'react';
import "./Seats.css"
import { useNavigate } from 'react-router-dom';
const MovieSeatSelector = () => {
  const navigate = useNavigate();

  const movieOptions = [
    { value: 10, label: 'Movie 1',seats:[] },
    { value: 12, label: 'Movie 2' ,seats:[]},
    { value: 8, label: 'Movie 3' ,seats:[]},
  ];
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);

  const handleSeatClick = (index) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(index)) {
        return prevSelectedSeats.filter((i) => i !== index);
      } else {
        return [...prevSelectedSeats, index];
      }
    });
  };


   useEffect(()=>{
    if (selectedSeats !==null) {
      setTimeout(() => {
        setSelectedSeats([])
        localStorage.setItem('selectedSeats',JSON.stringify([]))
      }, 500000);
    }
   })

  const handleMovieChange = (e) => {
    setSelectedSeats([])
    setSelectedMovieIndex(e.target.value);
  };

  const handleBuyTicket = ()=> {
    const ticketInfo = {
      moviename: movieOptions[selectedMovieIndex].label,
      price:totalPrice,
      seats: selectedSeats
    };
    localStorage.setItem('TicketInfo',JSON.stringify(ticketInfo))
     navigate('/pay');
  }
  useEffect(() => {
    const storedSelectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (storedSelectedSeats) {
      setSelectedSeats(storedSelectedSeats);
    }

    const storedSelectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (storedSelectedMovieIndex) {
      setSelectedMovieIndex(storedSelectedMovieIndex);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    localStorage.setItem('selectedMovieIndex', selectedMovieIndex);
  }, [selectedSeats, selectedMovieIndex]);

  const selectedMovie = movieOptions[selectedMovieIndex];
  const seats = selectedMovie.seats;

  for (let i = 1; i <= 50; i++) {
  const isSelected = selectedSeats.includes(i);

  seats.push(
    <button
      key={i}
      className={`seat ${isSelected ? 'selected' : ''} ${isSelected && 'green'}`}
      onClick={() => handleSeatClick(i)}
    >{i}</button>
  );
}

  const totalPrice = selectedSeats.length * selectedMovie.value;

  return (
    <div className="container">
      <select id="movie" value={selectedMovieIndex} onChange={handleMovieChange}>
          {movieOptions.map((option, index) => (
            <option key={index} value={index}>
              {option.label} (${option.value})
            </option>
          ))}
        </select>
      <div className="screen">
        <p>Sahne</p>
      </div>
      <div className="seats">{seats}</div>
      <div className="details">
        <p>
          Seçili olan koltuk sayısı <span id="count">{selectedSeats.length}</span> toplam fiyat{' '}
          <span id="amount">${totalPrice}</span>.
        </p>
      </div>
      <div className='buy'>
        <button onClick={handleBuyTicket}>Satın Al</button>
      </div>
    </div>
  );
};

export default MovieSeatSelector;
