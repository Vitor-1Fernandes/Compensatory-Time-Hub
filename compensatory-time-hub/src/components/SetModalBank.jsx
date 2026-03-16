
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { text } from '@fortawesome/fontawesome-svg-core';

function SetModalBank(props) {

    const [project, setProject] = useState("")
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)

    return (
        <div className="flex flex-col items-center justify-start pt-20 fixed inset-0 z-9999 overflow-y-auto bg-black/90 w-full">
            <main className="flex flex-col justify-around items-center rounded-2xl bg-[#020617]">
                <h1 className="py-6 text-2xl bg-clip-text text-transparent bg-linear-to-l from-[#6c8cde] via-[#5b9be5] to-[#8aa3e1] font-bold">Ajuste de Saldo</h1>
                <form className="flex flex-col gap-3 justify-center items-center">

                    <div value={hours} className="flex flex-row flex-nowrap gap-5 w-[50%]">
                        <div className="flex flex-col flex-nowrap">
                            <label className="text-center">Horas</label>
                            <div className='flex border border-text-[#b4c6f3]-500 focus-within:border-2 focus-within:border-text-[#b4c6f3]-800 rounded-md justify-start items-center px-2 ease-in-out transition-colors'>

                                <input value={hours} onChange={(e) => {setHours(e.target.value) }} type="number" className='w-full outline-none focus:outline-1 rounded-md bg-transparent p-2 text-sm text-center' />
                            </div></div>
                        <div className="flex flex-col items-center justify-center"><div className="text-transparent">"</div>:</div>
                        <div className="flex flex-col">
                            <label className="text-center">Minutos</label>
                            <div className='flex border border-text-[#b4c6f3]-500 focus-within:border-2 focus-within:border-text-[#b4c6f3]-800 rounded-md justify-start items-center px-2 ease-in-out transition-colors'>
                                <input value={minutes} onChange={(e) => setMinutes(e.target.value)} type="number" className='w-full outline-none focus:outline-1 rounded-md bg-transparent  p-2 text-sm text-center' />
                            </div></div>

                    </div>
                    <select className='w-[49%] border border-text-[#b4c6f3]-500 focus-within:border-2 focus-within:border-text-[#b4c6f3]-800 rounded-sm px-2 ease-in-out transition-colors' onChange={(e) => {setProject(e.target.value)}}><option value="" selected className='text-slate-950'>Selecione uma opção</option><option className='text-slate-950'>Horas Positivas</option><option className='text-slate-950'>Horas Negativas</option></select>

                    <div className='flex w-[59%] items-center justify-center gap-4 pt-3 mb-7'>

                        <button className='w-[40%] p-1 border text-blue-400 border-blue-400 rounded-md text-md font-bold' onClick={(e) => {e.preventDefault(); Number(minutes) < 60 && Number(minutes) >= 0 && Number(hours) >= 0 ?  (props.create(e, {
                            "name": "Ajuste de Horas",
                            "date": "00-00-0000",
                            "timeEntry": hours+":"+minutes,
                            "timeExit": "00:00",
                            "project": project
                        }), props.showModel()) : alert("Insira o saldo corretamente"), setMinutes(0), setHours(0) } }>
                            Confirmar
                        </button>
                        <button onClick={(e) => props.modelShow(e)} className='w-[40%] p-1 bg-[#020617] text-red-400 border border-red-400 rounded-md text-md font-bold'>
                            Cancelar
                        </button>
                    </div>

                </form>
            </main>
        </div>
    )
}

export default SetModalBank;