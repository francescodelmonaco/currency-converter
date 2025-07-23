// components
import Currency from "../components/Currency";

import { useGlobalContext } from "../contexts/GlobalContext";

export default function HomePage() {
    const {
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
    } = useGlobalContext();

    return (
        <>
            <h1 className="text-center font-bold text-2xl py-3">Currency Converter</h1>

            <div className="flex flex-col gap-3 justify-between items-center">
                <Currency
                    currencies={currencies}
                    curr={firstCurrency}
                    changeCurr={setFirstCurrency}
                    value={firstValue}
                    changeValue={setFirstValue}
                />

                <button
                    className="cursor-pointer"
                    onClick={switcher}
                >
                    <i className="fa-solid fa-arrow-right-arrow-left"></i>
                </button>

                <Currency
                    currencies={currencies}
                    curr={secondCurrency}
                    changeCurr={setSecondCurrency}
                    value={secondValue}
                    changeValue={setSecondValue}
                />
            </div>
        </>
    )
}