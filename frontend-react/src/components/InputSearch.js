export default function InputSearch({ setFilter }) {
    const onSubmit = function (e) {
        e.preventDefault()
        console.log(e.target)
    }


    return (
        <form>
            <button type="submit" onSubmit={onSubmit}>Chercher</button>
        </form>
    )
}