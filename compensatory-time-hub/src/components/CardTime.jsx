import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from "@fortawesome/free-solid-svg-icons"
import { faDollarSign } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from 'react'

function CardTime(props) {

    let today = new Date()
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    let primeiraQuinzena = true

    if(15 <= 13){primeiraQuinzena = true}else{primeiraQuinzena=false}
        
    let currentMonth = (primeiraQuinzena ? (today.getMonth() + 1) - 1 : (today.getMonth() + 1))
    let currentMonth2 = (primeiraQuinzena ? (today.getMonth() + 1) : (today.getMonth() + 1) + 1)

    const returnTime = (timeExit, timeEntry, projeto, dia) => {

        let time = (Number(String(timeExit.split(":")[0]*60)) + Number(String(timeExit.split(":")[1]))) - (Number(String((timeEntry.split(":")[0]*60))) + Number(String((timeEntry.split(":")[1]))))

        if(time > 6*60){time = time - 60}

        if(projeto != "Horas Extra"){dia != 5 ? time = time - 9*60 : time = time - 8*60}

        if(projeto == "Folga - Descontar do Banco"){dia != 5 ? time = 0 - 9*60 : time = 0 - 8*60}

        if(projeto == "Horas Negativas"){time = (Number(String((timeEntry.split(":")[0]*60))) + Number(String((timeEntry.split(":")[1]))))}

        if(projeto == "Horas Positivas"){time = (Number(String((timeEntry.split(":")[0]*60))) + Number(String((timeEntry.split(":")[1]))))}

        return time

    }

    const sumBank = (array) => {

        let totalHours = 0
        let payTotalHours = 0

        let textTime = ""
        let payTextTime = ""

        let time = 0

        for (let days = 0; days < array.length; days++) {

            let date = new Date(array[days].date)

                time = returnTime(array[days].timeExit, array[days].timeEntry, array[days].project, (date.getDay() + 1))                

                if(array[days].project == "Horas Extra"){
                    if(((date.getMonth()+1) == currentMonth && (date.getDate()+1 > 13) && date.getFullYear() == today.getFullYear()) || ((date.getMonth()+1) == currentMonth2 && (date.getDate()+1) <= 13) && date.getFullYear() == today.getFullYear()){
                        payTotalHours = payTotalHours + time
                    }
                }else{
                    if(array[days].project == "Horas Negativas"){
                        totalHours = totalHours - time
                    }
                    else{
                    totalHours = totalHours + time}
                }
                
            }
        
        payTextTime = String(Math.floor(payTotalHours / 60)) + "h" + String((payTotalHours % 60))
        if (totalHours < 0) {
            textTime = Math.ceil(totalHours / 60) + "h" + Math.abs((totalHours % 60))

        } else {
            textTime = Math.floor(totalHours/ 60) + "h" + Math.abs((totalHours % 60))
        }

        return [textTime, totalHours, payTextTime, payTotalHours]}

    let hoursList= sumBank(props.workDaysList)
    let textTime = hoursList[0]
    let totalHours = hoursList[1]
    let payTextTime = hoursList[2]
    let payTotalHours = hoursList[3]

    return (
        <div className="flex flex-wrap gap-6 w-full lg:w-auto">
            <div className="flex flex-wrap w-full lg:w-auto lg:max-w-85 bg-[#15191E] rounded-lg p-5 text-white shadow-[#000000] shadow-lg">
                <FontAwesomeIcon className={totalHours >= 0 ? "mb-2 text-blue-400 p-1 rounded-md" : "mb-2 text-red-400 p-1 rounded-md"} icon={faClock} />
                <p className="w-full text-sm">Saldo Atualizado</p>
                <h2 className={totalHours >= 0 ? "w-full font-bold text-4xl text-[#0077ff]" : "w-full font-bold text-4xl text-red-400"}>{textTime}</h2>
                <p className="text-sm w-full"> {totalHours >= 0 ? "horas positivas" : "Você está negativo!"} </p>
            </div>

            {!!payTotalHours && (<div className="flex flex-wrap w-full lg:w-auto lg:max-w-85 bg-[#15191E] rounded-lg p-5 text-white shadow-[#000000] shadow-lg">
                <FontAwesomeIcon className="mb-2 text-[#FFD700] p-1 rounded-md" icon={faDollarSign} />
                <p className="w-full text-sm">Horas Extras</p>
                <h2 className="w-full font-bold text-3xl text-[#FFD700]">{payTextTime}</h2><p className="text-sm w-full"> Período de 14/{currentMonth} a 13/{currentMonth2} </p>

                <p className="text-sm font-light w-full">Pagamento em {months[currentMonth + 1]} </p>
 
                </div>)}

        </div>)}

export default CardTime;