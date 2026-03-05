import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from "@fortawesome/free-solid-svg-icons"
import { faDollarSign } from "@fortawesome/free-solid-svg-icons"

function CardTime(props) {

    const sumBank = (array) => {
        let totalHours = 0
        let payTotalHours = 0

        let textTime = ""
        let payTextTime = ""

        let time = 0
        let payTime = 0

        for (let days = 0; days < array.length; days++) {
            if (array[days].project == "Banco de Horas") {
                time = (Number(String(array[days].timeExit.split(":")[0] * 60)) + Number(String(array[days].timeExit.split(":")[1]))) - (Number(String((array[days].timeEntry.split(":")[0] * 60))) + Number(String((array[days].timeEntry.split(":")[1]))))

                if (time <= 6 * 60) {
                    time = time - 9 * 60
                }
                if (time > 6 * 60) {
                    time = time - 10 * 60
                }

                totalHours = totalHours + time
            }

            if (array[days].project == "Horas Extra") {
                payTime = (Number(String(array[days].timeExit.split(":")[0] * 60)) + Number(String(array[days].timeExit.split(":")[1]))) - (Number(String((array[days].timeEntry.split(":")[0] * 60))) + Number(String((array[days].timeEntry.split(":")[1]))))

                if (payTime > 6 * 60) {
                    payTime = payTime - 60
                }
                payTotalHours = payTotalHours + payTime
            }

        }
        payTextTime = String(Math.floor(payTotalHours / 60)) + "h" + String((payTotalHours % 60))
        if(time < 0){
        textTime = Math.ceil(time/60) + "h" + (time % 60)
        
        }else{
            textTime = Math.floor(time/60) + "h" + (time % 60)
        }

        
        return [textTime, totalHours, payTextTime, payTotalHours]
    }

    let textTime = sumBank(props.workDaysList)[0]
    let totalHours = sumBank(props.workDaysList)[1]
    let payTextTime = sumBank(props.workDaysList)[2]
    let payTotalHours = sumBank(props.workDaysList)[3]


    return (
        <div className="flex flex-wrap gap-6 w-full lg:w-auto">
            <div className="flex flex-wrap w-full lg:w-auto lg:max-w-85 bg-[#15191E] rounded-lg p-5 text-white shadow-[#000000] shadow-lg">
                <FontAwesomeIcon className={totalHours >= 0 ? "mb-2 text-blue-400 p-1 rounded-md" : "mb-2 text-red-400 p-1 rounded-md" } icon={faClock}/>
                <p className="w-full text-sm">Saldo Atualizado</p>
                <h2 className={totalHours >= 0 ? "w-full font-bold text-4xl text-[#0077ff]" : "w-full font-bold text-4xl text-red-400"}>{textTime}</h2>
                <p className="text-sm w-full"> {totalHours >= 0 ? "horas positivas" : "Você está negativo!"} </p>
            </div>

            {!!payTotalHours &&( <div className="flex flex-wrap w-full lg:w-auto lg:max-w-85 bg-[#15191E] rounded-lg p-5 text-white shadow-[#000000] shadow-lg">
                <FontAwesomeIcon className="mb-2 text-[#FFD700] p-1 rounded-md" icon={faDollarSign}/>
                <p className="w-full text-sm">Horas Extras</p>
                <h2 className="w-full font-bold text-3xl text-[#FFD700]">{payTextTime}</h2><p className="text-sm w-full"> Referentes a Março </p></div>)}

        </div>

    )
}

export default CardTime;