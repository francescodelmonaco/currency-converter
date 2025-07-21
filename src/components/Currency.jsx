export default function Currency({ curr }) {
    return (
        <div>
            <input type="number" name="number" min={0} />

            <select name="currency">
                {
                    curr.map((c, id) => (
                        <option key={id} value={c} >{c}</option>
                    ))
                }
            </select>
        </div >
    )
};