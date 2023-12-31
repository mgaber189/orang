import React , { useContext, useEffect, useState }  from 'react';
import { BsPeople, BsCalendar, BsGlobe } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import "../../css/Searchbar.css";
import { Link } from 'react-router-dom';
import { BookContext } from '../context/BookContext';

const SearchBar = () => {

    const [selectedDate, setSelectedDate] = useState(null);
    const book = useContext(BookContext)  
    const handleDateChange = (date) => {
      setSelectedDate(date);
      book.addBook({ bookingDate: date });
    };
    return (
      <div className="search-bar mt-2">
          <div className="search-bar-overlay mt-3"></div> 
    
       <div className="search-bar-item s2 ">
   
      <DatePicker
        className="first-date"
        selected={selectedDate}
        onChange={handleDateChange}
       
        placeholderText="Pick your Date"
        dateFormat="MM/dd/yyyy"
      />
    </div>
        <Link to="/program">
          <button className="search-button">Search</button>
        </Link>
      </div>
    );
  };
  export default SearchBar ; 