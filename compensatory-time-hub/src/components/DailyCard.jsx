import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from "@fortawesome/free-solid-svg-icons"
import { faSuitcase } from "@fortawesome/free-solid-svg-icons"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { faPencil } from "@fortawesome/free-solid-svg-icons"

function DailyCard(props){

    let workTime = 0;
    let textTime = ""

     const time = (Number(String(props.timeExit.split(":")[0]*60)) + Number(String(props.timeExit.split(":")[1]))) - (Number(String((props.timeEntry.split(":")[0]*60))) + Number(String((props.timeEntry.split(":")[1]))));

    
    if (Number(time) <= 6*60){
        workTime = ((Number(String(props.timeExit.split(":")[0]*60)) + Number(String(props.timeExit.split(":")[1]))) - (Number(String((props.timeEntry.split(":")[0]*60))) + Number(String((props.timeEntry.split(":")[1])))) - 9*60)
    }
    if (Number(time)  > 6*60){
        workTime =  ((Number(String(props.timeExit.split(":")[0]*60)) + Number(String(props.timeExit.split(":")[1]))) - (Number(String((props.timeEntry.split(":")[0]*60))) + Number(String((props.timeEntry.split(":")[1])))) - 10*60)
    }
    if(props.project == "Folga - Descontar do Banco"){

        workTime = 0 - 9*60
    }

    let payWorkTime = 0
    let payTextTime = ""


    let payTime = (Number(String(props.timeExit.split(":")[0]*60)) + Number(String(props.timeExit.split(":")[1]))) - (Number(String((props.timeEntry.split(":")[0]*60))) + Number(String((props.timeEntry.split(":")[1]))));

    if (Number(payTime) > 6*60){
        payWorkTime = ((Number(String(props.timeExit.split(":")[0]*60)) + Number(String(props.timeExit.split(":")[1]))) - (Number(String((props.timeEntry.split(":")[0]*60))) + Number(String((props.timeEntry.split(":")[1])))) - 60)
    }else{
        payWorkTime = payTime
    }
   
    payTextTime = Math.floor(payWorkTime/60) + "h" + (payWorkTime % 60)
     


    if(workTime < 0){
        textTime = Math.ceil(workTime/60) + "h" + Math.abs((workTime % 60))
        
    }else{
        textTime = Math.floor(workTime/60) + "h" + Math.abs((workTime % 60))
    }

    
    
    

    return(
        
         <div className="flex flex-wrap justify-between  bg-[#15191E] rounded-lg p-5 gap-1 text-white shadow-[#1b1b1b] shadow-2xl">
           <div>
            <p className="w-full text-sm"><FontAwesomeIcon icon={faCalendar}/>{props.date}</p>
            <h2 className={workTime >= 0 || props.project == "Horas Extra" ? "text-blue-400 font-bold" : "text-red-400 font-bold"}>{props.name}</h2>
            <p className="w-full text-sm"> <FontAwesomeIcon icon={faSuitcase}/> {props.project}</p>
            <p className={workTime >= 0 || props.project == "Horas Extra" ? "text-blue-400 text-sm" : "text-red-400 text-sm"}> <FontAwesomeIcon icon={faClock}/> {props.timeEntry} - {props.timeExit}</p>
            </div>
            <div className='flex flex-col justify-between
            '>
            <div className='text-3xl flex justify-end items-center'>
                <p className={workTime >= 0 || props.project == "Horas Extra" ? "text-blue-400 font-bold" : "text-red-400 font-bold"}>{workTime >= 0 || props.project == "Horas Extra"? "+" : ""}{props.project == "Horas Extra" ? payTextTime : textTime}</p>
            </div>
            <div className='flex items-start text-lg gap-5'>
                <button onClick={() => props.delete(props.id)}><FontAwesomeIcon icon={faTrash}/></button>
                <button onClick={() => props.edit(props)}><FontAwesomeIcon icon={faPencil}/></button>
            </div>
            </div>
        </div>
    )
}

export default DailyCard;