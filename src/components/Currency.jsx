import { memo } from "react";

function Currency({ curr, defaultValue }) {
    return (
        <div className="flex gap-3 justify-between items-center">
            <input
                type="number"
                name="number"
                min={0}
                defaultValue={1}
                className="border rounded p-1.5"
            />

            <select
                name="currency"
                className="border rounded p-1.5"
                defaultValue={defaultValue}
            >
                {
                    // estraggo i valori dall'oggetto e li mappo
                    Object.values(curr).map((c, id) => (
                        <option key={id} value={c} >{c}</option>
                    ))
                }
            </select>
        </div >
    )
};

export default memo(Currency);