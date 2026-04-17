export default function PageControl({ 
    currentIndex, 
    maxIndex, 
    onNext, 
    onLast 
}) {

    const progress = ((currentIndex + 1) / (maxIndex + 1)) * 100;

    return (
        
        <div className="page-control">

            <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{width: `${progress}%`}}></div>
            </div>


            <button 
                className={`btn btn-small btn-orange ${currentIndex === 0 ? "is-disabled" : ""}`}
                onClick={onLast}
                disabled={currentIndex === 0}
            >
                上一页
            </button>

            <button 
                className={`btn btn-small btn-orange ${currentIndex === maxIndex ? "is-disabled" : ""}`}
                onClick={onNext}
                disabled={currentIndex === maxIndex}
            >
                下一页
            </button>       
        </div>
    )
}