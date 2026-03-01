import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from "@fortawesome/free-solid-svg-icons"
import { faSuitcase } from "@fortawesome/free-solid-svg-icons"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"

function DailyCard(props){
    return(
        
         <div className="flex flex-wrap bg-slate-800 rounded-lg p-5 gap-1 text-white">
            <p className="w-full text-sm"><FontAwesomeIcon icon={faCalendar}/>{props.date}</p>
            <h2 className="w-full text-xl text-blue-300 font-bold">{props.name}</h2>
            <p className="w-full text-sm"> <FontAwesomeIcon icon={faSuitcase}/> {props.project}</p>
            <p className="w-full text-sm text-blue-300"> <FontAwesomeIcon icon={faClock}/> {props.time}</p>
        </div>
    )
}

export default DailyCard;