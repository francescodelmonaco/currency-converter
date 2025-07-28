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
    const [lastChanged, setLastChanged] = useState("first"); // traccia quale input è stato modificato per ultimo

    const converter = (from, to, amount, updateTarget) => {
        axios.get(`${urlConvert}?base=${from}&symbols=${to}`)
            .then(res => {
                const rate = res.data.rates[to];
                const valueConverted = (amount * rate).toFixed(2);
                console.log(`${amount} ${from} = ${valueConverted} ${to}`);
                updateTarget(valueConverted);
            })
            .catch(err => console.error(err))
    };

    // aggiorno il primo valore
    const handleFirstValueChange = (value) => {
        setFirstValue(value);
        setLastChanged("first");
    };

    // aggiorno il secondo valore
    const handleSecondValueChange = (value) => {
        setSecondValue(value);
        setLastChanged("second");
    };

    // gestione cambio valuta
    const handleFirstCurrencyChange = (newCurrency) => {
        setFirstCurrency(newCurrency);
        setLastChanged("first");
    };
    const handleSecondCurrencyChange = (newCurrency) => {
        setSecondCurrency(newCurrency);
        setLastChanged("second");
    };

    // conversione da primo a secondo
    useEffect(() => {
        if (lastChanged === "first" && firstValue) {
            converter(firstCurrency, secondCurrency, firstValue, setSecondValue);
        }
    }, [firstValue, firstCurrency, secondCurrency, lastChanged]);

    // conversione da secondo a primo
    useEffect(() => {
        if (lastChanged === "second" && secondValue) {
            converter(secondCurrency, firstCurrency, secondValue, setFirstValue);
        }
    }, [secondValue, firstCurrency, secondCurrency, lastChanged]);



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
        setFirstValue: handleFirstValueChange,
        firstCurrency,
        setFirstCurrency: handleFirstCurrencyChange,
        secondValue,
        setSecondValue: handleSecondValueChange,
        secondCurrency,
        setSecondCurrency: handleSecondCurrencyChange,
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