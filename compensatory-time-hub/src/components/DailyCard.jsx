import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from "@fortawesome/free-solid-svg-icons"
import { faSuitcase } from "@fortawesome/free-solid-svg-icons"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { faPencil } from "@fortawesome/free-solid-svg-icons"

function DailyCard(props){

    const returnTime = (timeExit, timeEntry, projeto, dia) => {

        let time = (Number(String(timeExit.split(":")[0]*60)) + Number(String(timeExit.split(":")[1]))) - (Number(String((timeEntry.split(":")[0]*60))) + Number(String((timeEntry.split(":")[1]))))

        if(time > 6*60){time = time - 60}

        if(projeto != "Horas Extra"){dia != 5 ? time = time - 9*60 : time = time - 8*60}

        if(projeto == "Folga - Descontar do Banco"){dia != 5 ? time = 0 - 9*60 : time = 0 - 8*60}

        if(projeto == "Horas Negativas"){time = (Number(String((timeEntry.split(":")[0]*60))) + Number(String((timeEntry.split(":")[1]))))}

        if(projeto == "Horas Positivas"){time = (Number(String((timeEntry.split(":")[0]*60))) + Number(String((timeEntry.split(":")[1]))))}

        return time

    }

    let dateBug = new Date(props.date)
    let date = new Date(dateBug.getTime() + 24*60*60*1000)
    
    console.log(date)
    const time = returnTime(props.timeExit, props.timeEntry, props.project, date.getDay() + 1);

    let payTextTime = ""
    let textTime = ""

    payTextTime = Math.floor(time/60) + "h" + (time % 60)
     
    if(time < 0){
        textTime = Math.ceil(time/60) + "h" + Math.abs((time % 60))
        
    }else{
        textTime = Math.floor(time/60) + "h" + Math.abs((time % 60))
    }

    
    return(
        
         <div className="flex flex-wrap justify-between  bg-[#15191E] rounded-lg p-5 gap-1 text-white shadow-[#000000] shadow-sm">
           <div>
            <p className="w-full text-sm"><FontAwesomeIcon icon={faCalendar}/>{date.toLocaleDateString('pt-BR')}</p>
            <h2 className={time >= 0 || props.project == "Horas Extra" ? "text-blue-400 font-bold" : "text-red-400 font-bold"}>{props.name}</h2>
            <p className="w-full text-sm"> <FontAwesomeIcon icon={faSuitcase}/> {props.project}</p>
            <p className={time >= 0 || props.project == "Horas Extra" ? "text-blue-400 text-sm" : "text-red-400 text-sm"}> <FontAwesomeIcon icon={faClock}/> {props.timeEntry} - {props.timeExit}</p>
            </div>
            <div className='flex flex-col justify-between
            '>
            <div className='text-3xl flex justify-end items-center'>
                <p className={time >= 0 || props.project == "Horas Extra" ? "text-blue-400 font-bold" : "text-red-400 font-bold"}>{time >= 0 || props.project == "Horas Extra"? "+" : ""}{props.project == "Horas Extra" ? payTextTime : textTime}</p>
            </div>
            <div className='flex justify-end text-lg gap-5'>
                <button onClick={(e) => props.delete(e, props)}><FontAwesomeIcon icon={faTrash}/></button>
                <button onClick={() => props.edit(props)}><FontAwesomeIcon icon={faPencil}/></button>
            </div>
            </div>
        </div>
    )
}

export default DailyCard;