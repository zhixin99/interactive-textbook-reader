import { useParams, useLocation, NavLink } from "react-router-dom"
import { textbookData } from "../data/textbookData.js"


export default function Sidebar() {
    
    const { grade, semester} = useParams()

    const path = useLocation().pathname

    let mode = ""

    if (path.includes("/text")) {
        mode = "text"
    } else if (path.includes("/vocabulary")) {
        mode="vocabulary"
    } else if (path.includes("/dictation")) {
        mode="dictation"
    } else if (path.includes("/review")) {
        mode="review"
    }

    const unitsArray = textbookData.filter((item) => (
            item.grade === Number(grade) && item.semester === Number(semester)
        ))
    
    const sidebarEl = unitsArray.map(item => (
        <NavLink 
            to={`/${mode}/${grade}/${semester}/${item.unit}`}
            key={item.unit}>
            Unit{item.unit}
        </NavLink>
    ))
    
    return (
        <div className="side-bar">
            {sidebarEl}
        </div>
    ) 
}