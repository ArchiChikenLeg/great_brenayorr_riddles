import './Cell.css'
function Cell({ isOpen, value, onClick }){
    return (<>
        <button className={`cell-${isOpen ? value : "closed"}`} onClick={onClick}>{isOpen && <span>{value}</span>}</button>
    </>)
}

export default Cell