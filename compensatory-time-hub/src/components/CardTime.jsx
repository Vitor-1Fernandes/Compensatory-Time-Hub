function CardTime(){
    return(
        <div className="flex flex-wrap w-full lg:w-auto lg:max-w-85 bg-slate-800 rounded-lg p-5 gap-1 text-white shadow-2xl">
            <p className="w-full text-sm">Saldo Total</p>
            <h2 className="w-full text-3xl text-blue-300 font-bold">+5h02</h2>
            <p className="w-full text-sm"> Você está positivo!</p>
        </div> 
    )
}

export default CardTime;