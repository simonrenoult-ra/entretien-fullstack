export default function ImpactList ({ elements }) {
    const items = elements.map((e, i) => <div key={i}>{e.name}</div>)
    return (
        <div>{items}</div>
    )
}