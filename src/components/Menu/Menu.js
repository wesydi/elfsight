import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Menu.scss';

const url = new URL('https://jsonplaceholder.typicode.com');

const Menu = () => {
  const [data, setData] = useState(null);

  useEffect(async () => {
    try {
      const response = await axios.get(`${url}users`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <nav className="menu">
      <div className="menu__list">
        <ul>
          {
            data ? (
              data.map((el) => (
                <li key={el.id}>
                  <a href={el.id}>{el.name}</a>
                  <hr />
                </li>
              ))
            ) : null
          }
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
