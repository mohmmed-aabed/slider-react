import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';

function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  const nextIndex = (index) => {
    if (index < people.length - 1) {
      return index + 1;
    }
    return 0;
  };

  const prevIndex = (index) => {
    if (index > 0) {
      return index - 1;
    }
    return people.length - 1;
  };

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(nextIndex(index));
    }, 5000);
    return () => clearInterval(slider);
  }, [index]);

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>

      <div className="section-center">
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;
          let position;
          if (personIndex === index) position = 'activeSlide';
          if (personIndex === nextIndex(index)) position = 'nextSlide';
          if (personIndex === prevIndex(index)) position = 'lastSlide';
          return (
            <article key={id} className={position}>
              <img className="person-img" src={image} alt={name} />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text"> {quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}

        <button
          className="prev"
          onClick={() => {
            setIndex(prevIndex(index));
          }}
        >
          <FiChevronLeft />
        </button>

        <button
          className="next"
          onClick={() => {
            setIndex(nextIndex(index));
          }}
        >
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
