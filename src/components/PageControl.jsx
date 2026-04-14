export default function PageControl({ 
    currentIndex, 
    maxIndex, 
    onNext, 
    onLast 
}) {
    return (
        <div className="page-control">
            <button 
                className={`btn btn-small page-btn ${currentIndex === 0 ? "is-disabled" : ""}`}
                onClick={onLast}
                disabled={currentIndex === 0}
            >
                上一页
            </button>
            
            <div className="btn-small page-indicator">
                {currentIndex + 1} / {maxIndex + 1}
            </div>

            <button 
                className={`btn btn-small page-btn ${currentIndex === maxIndex ? "is-disabled" : ""}`}
                onClick={onNext}
                disabled={currentIndex === maxIndex}
            >
                下一页
            </button>       
        </div>
    )
}