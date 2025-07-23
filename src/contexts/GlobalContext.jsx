import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// creo provider
const GlobalContext = createContext();

const urlCurr = "https://api.frankfurter.dev/v1/currencies";
const urlConvert = "https://api.frankfurter.dev/v1/latest";

const GlobalProvider = ({ children }) => {

    // chiamata per elenco valute
    const [currencies, setCurrencies] = useState({});

    useEffect(() => {
        axios.get(urlCurr)
            .then(res => {
                setCurrencies(res.data); // salvo l'intero oggetto
                console.log("Currencies:", res.data);
            })
            .catch(err => console.error(err))
    }, []);



    // conversione
    const [firstValue, setFirstValue] = useState(1);
    const [firstCurrency, setFirstCurrency] = useState("EUR");
    const [secondValue, setSecondValue] = useState(1);
    const [secondCurrency, setSecondCurrency] = useState("USD");

    const converter = (from, to, amount) => {
        axios.get(`${urlConvert}?&base=${from}&symbols=${to}`)
            .then(res => {
                const objConverted = res.data; // oggetto con info cambio tra le due valute "from" - "to"
                const rate = objConverted.rates[to]; // estraggo dall'oggetto il tasso di cambio
                console.log(`Tasso di cambio ${from} - ${to}: ${rate}`);

                const valueConverted = (amount * rate).toFixed(2); // valore "firstValue" convertito
                console.log(`Valore convertito: ${valueConverted}`);
                setSecondValue(valueConverted); // aggiorno il secondo valore con quello convertito
            })
            .catch(err => console.error(err))
    };

    useEffect(() => {
        converter(firstCurrency, secondCurrency, firstValue);
    }, [firstValue, firstCurrency, secondCurrency]);



    // switch button
    function switcher() {
        setFirstValue(secondValue);
        setFirstCurrency(secondCurrency);
        setSecondValue(firstValue);
        setSecondCurrency(firstCurrency);
    };



    // destructuring
    const value = {
        currencies,
        firstValue,
        setFirstValue,
        firstCurrency,
        setFirstCurrency,
        secondValue,
        setSecondValue,
        secondCurrency,
        setSecondCurrency,
        switcher
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };