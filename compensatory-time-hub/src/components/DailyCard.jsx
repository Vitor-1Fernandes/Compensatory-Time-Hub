import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from "@fortawesome/free-solid-svg-icons"
import { faSuitcase } from "@fortawesome/free-solid-svg-icons"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { faPencil } from "@fortawesome/free-solid-svg-icons"

function DailyCard(props){
    return(
        
         <div className="flex flex-wrap justify-between bg-slate-800 rounded-lg p-5 gap-1 text-white">
            <div>
            <p className="w-full text-sm"><FontAwesomeIcon icon={faCalendar}/>{props.date}</p>
            <h2 className="w-full text-xl text-blue-300 font-bold">{props.name}</h2>
            <p className="w-full text-sm"> <FontAwesomeIcon icon={faSuitcase}/> {props.project}</p>
            <p className="w-full text-sm text-blue-300"> <FontAwesomeIcon icon={faClock}/> {props.timeEntry} - {props.timeExit}</p>
            </div>
            <div className='flex items-start text-lg gap-5'>
                <button onClick={() => props.delete(props.id)}><FontAwesomeIcon icon={faTrash}/></button>
                <button><FontAwesomeIcon icon={faPencil}/></button>
            </div>
        </div>
    )
}

export default DailyCard;