import { useParams } from "react-router-dom"
export default function Home(){
    const params = useParams();
    return(
        <div>
            Hello {params&&params.name}
        </div>
    )
}