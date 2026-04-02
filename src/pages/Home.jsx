import { homeData } from "../data/homeData.js" 
import { Link } from "react-router-dom"

export default function Home() {
    const selectorEl = homeData.map( data => (
        data.available ? (
            <Link 
                to={`/text/${data.grade}/${data.semester}/1`}
                className="grade-selector"
                key={data.id}
            >
                {data.label}
                <p className="grade-status">可学习</p>
            </Link> 
        ) : (
            <div
                className="grade-selector disabled-selector"
                key={data.id}
            >
                {data.label}
                <p className="grade-status">即将开放</p>
            </div>
        )
    ))
    
    return (
        <>
        <main className="flex flex-column flex-center">
            <section className="heading-img-container">
                <img className="heading-img" src="../../img/h1.png" alt="译林英语一点通" />
                <h1 className="visually-hidden">译林英语一点通</h1>
            </section>  

            <section>
                <p>目前仅有四年级下册可学习。持续更新中！</p>
            </section>
            
            <section className="section-container">
                <div className="grade-container">
                    {selectorEl}
                </div>
            </section>
        </main>
        </>
    )
}