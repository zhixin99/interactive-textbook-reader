export default function LearnSection({icon, title, children}) {
    return (
        <section className="section-container">
            <h2> 
                {icon}
                {title}
            </h2>

            {children}
        </section>
    )
}