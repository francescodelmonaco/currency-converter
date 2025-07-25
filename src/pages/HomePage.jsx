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
        <main>
            <h1 className="text-center font-bold text-2xl py-10">Currency Converter</h1>

            <div className="shadow flex flex-col gap-7 justify-between items-center p-6 border border-gray-100 bg-gray-100 rounded-2xl w-150 mx-auto">
                <Currency
                    currencies={currencies}
                    curr={firstCurrency}
                    changeCurr={setFirstCurrency}
                    value={firstValue}
                    changeValue={setFirstValue}
                    otherCurr={secondCurrency}
                />

                <button
                    className="cursor-pointer text-2xl"
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
                    otherCurr={firstCurrency}
                />
            </div>
        </main>
    )
}