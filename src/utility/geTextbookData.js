import { textbookData } from "../data/textbookData"
import { useParams } from "react-router-dom";


export function getTextbookData() {

    const { grade, semester, unit} = useParams()

    const unitData = textbookData.filter((item) => (
            item.grade === Number(grade) && item.semester === Number(semester) && item.unit === Number(unit)
        ))[0]
    
    const unitTitle = unitData.title
    const pagesArray = unitData.pages
    const vocabArray = unitData.words

    return {
        grade, 
        semester, 
        unit, 
        unitTitle,
        pagesArray,
        vocabArray
    }
    
}



