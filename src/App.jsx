import axios from "axios";
import { useState, useEffect } from "react";

// components
import Currency from "./components/Currency";

const url = "https://api.frankfurter.dev/v1/currencies";

export default function App() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    axios.get(url)
      .then(res => {
        const resValues = Object.values(res.data); // estraggo i valori dall'oggetto della res
        setCurrencies(resValues);
        console.log("Currencies:", resValues);
      })
      .catch(err => console.error(err))
  }, []);

  return (
    <>
      <h1>Currency Converter</h1>

      <div>
        <Currency curr={currencies} />

        <i className="fa-solid fa-arrow-right-arrow-left"></i>

        <Currency curr={currencies} />
      </div>
    </>
  )
};