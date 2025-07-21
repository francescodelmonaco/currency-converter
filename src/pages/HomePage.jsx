// components
import Currency from "../components/Currency";

import { useGlobalContext } from "../contexts/GlobalContext";

export default function HomePage() {
    const { currencies } = useGlobalContext();

    return (
        <>
            <h1 className="text-center font-bold text-2xl py-3">Currency Converter</h1>

            <div className="flex flex-col gap-3 justify-between items-center">
                <Currency curr={currencies} defaultValue={"Euro"} />

                <i className="fa-solid fa-arrow-right-arrow-left"></i>

                <Currency curr={currencies} defaultValue={"United States Dollar"} />
            </div>
        </>
    )
}