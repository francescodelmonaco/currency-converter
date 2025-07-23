import { memo } from "react";

function Currency({ currencies, value, changeValue, curr, changeCurr }) {
    return (
        <div className="flex gap-3 justify-between items-center">
            <input
                className="border rounded p-1.5"
                type="number"
                name="number"
                min={0}
                step={0.01}
                value={value}
                onChange={e => changeValue(e.target.value)}
            />

            <select
                className="border rounded p-1.5"
                name="currency"
                value={curr}
                onChange={e => changeCurr(e.target.value)}
            >
                {
                    // estraggo i valori dall'oggetto e li mappo
                    Object.keys(currencies).map((c, id) => (
                        <option key={id} value={c} >{c}</option>
                    ))
                }
            </select>
        </div >
    )
};

export default memo(Currency);