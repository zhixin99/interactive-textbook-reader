import { Link } from "react-router-dom"
export default function Header() {
    return (
        <header>
            <div className="header-container">
                <Link to="/select-grade">四年级下册</Link>
                <i className="fa-solid fa-user"></i>
            </div>
        </header>
    )
}