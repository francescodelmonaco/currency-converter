import { memo } from "react";

function Currency({ currencies, value, changeValue, curr, changeCurr, otherCurr }) {
    return (
        <div className="flex gap-3 justify-between items-center">
            <input
                className="shadow rounded p-3 bg-white border border-gray-200"
                type="number"
                name="number"
                min={0}
                step={0.01}
                value={value}
                onChange={e => changeValue(e.target.value)}
            />

            <select
                className="shadow rounded p-3 bg-gray-300 border border-gray-300"
                name="currency"
                value={curr}
                onChange={e => changeCurr(e.target.value)}
            >
                {
                    // estraggo array chiave + valore dall'oggetto e li mappo
                    Object.entries(currencies).map(([code, name]) => (
                        <option
                            key={code}
                            value={code}
                            disabled={code === otherCurr}
                        >
                            {code} - {name}
                        </option>
                    ))
                }
            </select>
        </div >
    )
};

export default memo(Currency);