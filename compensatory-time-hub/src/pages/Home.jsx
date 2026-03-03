import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"


import { faClock } from "@fortawesome/free-solid-svg-icons"
import { faSuitcase } from "@fortawesome/free-solid-svg-icons"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"

import CardTime from "../components/CardTime";
import DailyCard from "../components/DailyCard";
import Navbar from "../components/Navbar";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const validacaoToken = async () => {

            const token = localStorage.getItem("token");

            if (!token) { return navigate("/") };
            try {
                const response = await axios.get("http://localhost:8080/api/validacao",
                    {
                        headers: { authorization: `Bearer ${token}` }
                    });

                if (response.status === 403) { alert("Sessão Expirou"), navigate("/") } else { console.log("acesso autorizado") }

            } catch (error) {
                alert("Sessão Expirou");
                console.log(error)
                navigate("/");
            }


        }
        validacaoToken();
        ;
    }, []);

    const [workDays, setWorkDays] = useState(JSON.parse(localStorage.getItem("workDaysList")) || []);
    const [modal, setModal] = useState(null);
    const [newWorkDay, setNewWorkDay] = useState(
        {
            id: "",
            name: "",
            date: "",
            timeEntry: "",
            timeExit: "",
            project: ""
        },
    )

    const updateWorkDays = (e) => {
        e.preventDefault();
        if (Object.values(newWorkDay).some((valor) => typeof valor === "string" ? (valor.trim() === "") : false)) {
            alert("Preencha todos os campos antes de salvar")
        } else {
            setWorkDays([newWorkDay, ...workDays.map((workDay) => newWorkDay.id == workDay.id ?  newWorkDay : workDay)]);
            setNewWorkDay(
                {
                    id: 0,
                    name: "",
                    date: "",
                    timeEntry: "",
                    timeExit: "",
                    project: ""
                },
            )
            setModal(null);
        }
    };
    useEffect(() => {
        localStorage.setItem("workDaysList", JSON.stringify(workDays));
    }, [workDays]);

    const deleteCard = (id) => {
        setWorkDays(workDays.filter((day) => day.id !== id))
    }
    const editCard = (day) => {
        setModal(true);
        setNewWorkDay({
            id: day.id,
            name: day.name,
            date: day.date,
            timeEntry: day.timeEntry,
            timeExit: day.timeExit,
            project: day.project
        });
    }
    return (
        <div className="min-h-screen w-screen">
            <Navbar />
            <main className="px-3 pt-10 lg:px-20 lg:pt-10">

                <div className="flex flex-col gap-10 px-10 lg:p-0">
                    <header className="text-slate-800">
                        <h1 className="font-bold text-3xl"> Olá, Vitor</h1>
                        <p className="font-semibold text-md">Aqui está o resumo do seu banco de horas</p>
                    </header>
                    <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full flex-wrap gap-3">
                        <CardTime />
                    </div>
                </div>
            </main>



            {modal && (<article className="flex flex-col items-center justify-center fixed inset-0 z-9999 overflow-y-auto bg-black/90 w-full shadow-white shadow-2xl">

                <h1 className="text-3xl text-white font-bold mb-5">Registre suas horas</h1>

                <div className="flex items-center justify-center flex-col gap-2 bg-white w-[90%] md:w-[50%] overflow-hidden rounded-lg">
                    <div className="w-full">
                        <DailyCard className='shadow-none' name={newWorkDay.name} project={newWorkDay.project} timeExit={newWorkDay.timeExit} timeEntry={newWorkDay.timeEntry} date={newWorkDay.date} />
                    </div>
                    <div className="w-full">
                        <form className='flex flex-wrap justify-center w-full gap-4 py-5 px-0'>

                            <div className="w-[40%]">
                                <label htmlFor="e-mail" className='text-start font-semibold'>Projeto</label>
                                <div className='flex border border-slate-500 focus-within:border-2 focus-within:border-white  rounded-md justify-start items-center px-2 ease-in-out transition-colors'>
                                    <FontAwesomeIcon icon={faSuitcase} />
                                    <input onChange={(e) => setNewWorkDay({ ...newWorkDay, id: Math.floor(Math.random() * 100000000), name: e.target.value })} type="text" className='w-full outline-none focus:outline-1 rounded-md bg-transparent  p-2 text-sm' placeholder='Atividade desenvolvida' />
                                </div>
                            </div>


                            <div className="w-[40%]">
                                <label htmlFor="password" className='text-start font-semibold'>Descrição</label>
                                <div className='flex justify-start items-center px-2 border border-gray-400 focus-within:border-2 focus-within:border-white rounded-md ease-in-out transition-colors'>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <input onChange={(e) => setNewWorkDay({ ...newWorkDay, project: e.target.value })} className='w-full outline-none focus:outline-1 bg-transparent rounded-md p-2 text-sm' />
                                </div>
                            </div>

                            {/* Pendente de ajustar o cálculo de datas, horários e a edição de cards*/}
                            <div className="w-[25%]">
                                <label htmlFor="password" className='text-start font-semibold'>Data</label>
                                <div className='flex justify-start items-center px-2 border border-gray-400 focus-within:border-2 focus-within:border-white rounded-md ease-in-out transition-colors'>
                                    <FontAwesomeIcon icon={faCalendar} />
                                    <input type="date" onChange={(e) => setNewWorkDay({ ...newWorkDay, date: e.target.value })} className='w-full outline-none focus:outline-1 bg-transparent rounded-md p-2 text-sm' />
                                </div>
                            </div>

                            <div className="w-[25%]">
                                <label htmlFor="password" className='text-start font-semibold'>Horário de entrada</label>
                                <div className='flex justify-start items-center px-2 border border-gray-400 focus-within:border-2 focus-within:border-white rounded-md ease-in-out transition-colors'>
                                    <FontAwesomeIcon icon={faClock} />
                                    <input onChange={(e) => setNewWorkDay({ ...newWorkDay, timeEntry: e.target.value })} className='w-full outline-none focus:outline-1 bg-transparent rounded-md p-2 text-sm' />
                                </div>
                            </div>

                            <div className="w-[25%]">
                                <label htmlFor="password" className='text-start font-semibold'>Horário de saída</label>
                                <div className='flex justify-start items-center px-2 border border-gray-400 focus-within:border-2 focus-within:border-white rounded-md ease-in-out transition-colors'>
                                    <FontAwesomeIcon icon={faClock} />
                                    <input onChange={(e) => setNewWorkDay({ ...newWorkDay, timeExit: e.target.value })} className='w-full outline-none focus:outline-1 bg-transparent rounded-md p-2 text-sm' />
                                </div>
                            </div>

                            <div className="flex justify-center w-full gap-2">
                                <button onClick={(e) => { updateWorkDays(e); }} className='w-[40%] p-1 bg-slate-800 text-white rounded-md text-lg font-bold'>
                                    Salvar
                                </button>
                                <button onClick={(e) => {
                                    e.preventDefault(); setModal(null); setNewWorkDay(
                                        {
                                            id: 0,
                                            name: "",
                                            date: "",
                                            timeEntry: "",
                                            timeExit: "",
                                            project: ""
                                        },
                                    )
                                }} className='w-[40%] p-1 bg-white text-slate-800 border border-slate-800 rounded-md text-lg font-bold'>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </article>)}
            <article className="flex justify-between items-center px-10 lg:px-20 lg:pt-10 font-semibold text-slate-800">
                <p className="text-3xl">Histórico</p>
                <button onClick={() => setModal(true)} className="flex gap-1 items-center bg-slate-800 text-white px-2 py-1.5 rounded-lg"> <span className="flex leading-none text-2xl font-normal p-0 shadow-2xl"> + </span> Adicionar</button>
            </article>





            <section className="px-10 lg:px-20 py-4">

                {workDays.length > 0 ? (workDays.map((day, index) => (
                    <div key={index} className="m-3">
                        <DailyCard name={day.name} project={day.project} timeExit={day.timeExit} timeEntry={day.timeEntry} date={day.date} id={day.id} delete={deleteCard} edit={editCard} />
                    </div>
                ))) : (<div className="w-full py-10 text-lg text-center font-bold border border-slate-800 rounded-md"><h1> Ainda sem nenhum registro.. Clique em adicionar para começar</h1></div>)}

            </section>

        </div>
    )
}

export default Home;