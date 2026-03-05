import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from "@fortawesome/free-solid-svg-icons"
import { faSuitcase } from "@fortawesome/free-solid-svg-icons"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'

function DailyCard(props){

    let workTime = 0;
    let textTime = ""

     const time = (Number(String(props.timeExit.split(":")[0]*60)) + Number(String(props.timeExit.split(":")[1]))) - (Number(String((props.timeEntry.split(":")[0]*60))) + Number(String((props.timeEntry.split(":")[1]))));

    if (Number(time) < 8*60){
        workTime = ((Number(String(props.timeExit.split(":")[0]*60)) + Number(String(props.timeExit.split(":")[1]))) - (Number(String((props.timeEntry.split(":")[0]*60))) + Number(String((props.timeEntry.split(":")[1])))) - 8*60)
    }
    if (Number(time)  > 8*60){
        workTime =  ((Number(String(props.timeExit.split(":")[0]*60)) + Number(String(props.timeExit.split(":")[1]))) - (Number(String((props.timeEntry.split(":")[0]*60))) + Number(String((props.timeEntry.split(":")[1])))) - 10*60)
    }

        textTime = Math.floor(workTime/60) + "h" + (workTime % 60)

    return(
        
         <div className="flex flex-wrap justify-between bg-linear-600 from-slate-800 via-[#23324b] to-slate-800 rounded-lg p-5 gap-1 text-white shadow-2xl">
           <div>
            <p className="w-full text-sm"><FontAwesomeIcon icon={faCalendar}/>{props.date}</p>
            <h2 className="w-full text-xl text-blue-400 font-bold">{props.name}</h2>
            <p className="w-full text-sm"> <FontAwesomeIcon icon={faSuitcase}/> {props.project}</p>
            <p className="w-full text-sm text-blue-300"> <FontAwesomeIcon icon={faClock}/> {props.timeEntry} - {props.timeExit}</p>
            </div>
            <div className='flex flex-col justify-between
            '>
            <div className='text-3xl flex justify-end items-center'>
                <p className={workTime >= 0 ? "text-blue-400 font-bold" : "text-red-400 font-bold"}>{workTime >= 0 ? "+" : ""}{textTime}</p>
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