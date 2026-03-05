function CardTime(props){

    const sumBank = (array) => {
        let totalHours = 0
        let textTime = ""
        let time = 0
        for (let days=0; days < array.length; days++){
            time = (Number(String(array[days].timeExit.split(":")[0]*60)) + Number(String(array[days].timeExit.split(":")[1]))) - (Number(String((array[days].timeEntry.split(":")[0]*60))) + Number(String((array[days].timeEntry.split(":")[1]))))

            

            if(time < 8*60){
                time = time - 8*60
            }
            if(time > 8*60){
                time = time - 10*60
            }

            totalHours = totalHours + time

        }
        textTime = String(Math.floor(totalHours/60)) + "h" + String((totalHours % 60))
        return [textTime, totalHours]
    }

    let textTime = sumBank(props.workDaysList)[0]
    let totalHours = sumBank(props.workDaysList)[1]
    return(
        <div className="flex flex-wrap w-full lg:w-auto lg:max-w-85 bg-linear-100 from-slate-800 via-[#23324b] to-slate-800 rounded-lg p-5 gap-1 text-white shadow-2xl">
            <p className="w-full text-sm">Saldo Total</p>
            <h2 className={totalHours > 0 ? "w-full font-bold text-3xl text-blue-400" : "w-full font-bold text-3xl text-red-400" }>{textTime}</h2>
            <p className="text-sm w-full"> {totalHours > 0 ? "Você está positivo!" : "Você está negativo!" } </p>
        </div> 
    )
}

export default CardTime;