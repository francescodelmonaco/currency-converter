import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// creo provider
const GlobalContext = createContext();

const urlCurr = "https://api.frankfurter.dev/v1/currencies";

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

    // destructuring
    const value = {
        currencies
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };