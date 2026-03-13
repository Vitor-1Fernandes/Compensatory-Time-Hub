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

    // Validação do token
    const navigate = useNavigate();
    useEffect(() => {
        const validacaoToken = async () => {

            const token = localStorage.getItem("token");

            if (!token) { return navigate("/") };
            try {
                const response = await axios.get("https://banco-de-horas-qmy6.onrender.com/api/validacao",
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

    const [workDays, setWorkDays] = useState([]);

// Busca informações na API  salva no local storage - READ
    useEffect(() => {

        const getData = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("https://banco-de-horas-qmy6.onrender.com/register", { headers: { authorization: `Bearer ${token}` } });
                setWorkDays(response.data)
            } catch (error) {
                console.log(error, " Deu Erro")
            }
        }
        getData();
    }, [])

// CREATE 
    const increaseDB = async (e, newWorkDay) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (Object.values(newWorkDay).some((valor) => typeof valor === "string" ? (valor.trim() === "") : false)) {
            alert("Preencha todos os campos antes de salvar")
        }
        else {

            try {
                const response = await axios.post("https://banco-de-horas-qmy6.onrender.com/register", {
                    "name": newWorkDay.name,
                    "date": newWorkDay.date,
                    "timeEntry": newWorkDay.timeEntry,
                    "timeExit": newWorkDay.timeExit,
                    "project": newWorkDay.project
                }, { headers: { authorization: `Bearer ${token}` } });

                setNewWorkDay(
                    {
                        name: "",
                        date: "",
                        timeEntry: "",
                        timeExit: "",
                        project: ""
                    },
                )
            setWorkDays([response.data, ...workDays])
            } catch (error) {
                console.log(error, " Deu Erro")
            }
            setModal(null);
        };
    };


    const [modal, setModal] = useState(null);
    const [newWorkDay, setNewWorkDay] = useState(
        {
            name: "",
            date: "",
            timeEntry: "",
            timeExit: "",
            project: ""
        },
    )

// UPDATE
    const updateWorkDays = async (e, newWorkDay) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) { return navigate("/") };
        if (Object.values(newWorkDay).some((valor) => typeof valor === "string" ? (valor.trim() === "") : false)) {
            alert("Preencha todos os campos antes de salvar")
        } else {
            try{
            const response = await axios.put("https://banco-de-horas-qmy6.onrender.com/register",{
                "_id": newWorkDay._id,
                "name": newWorkDay.name,
                "date": newWorkDay.date,
                "timeEntry": newWorkDay.timeEntry,
                "timeExit": newWorkDay.timeExit,
                "project": newWorkDay.project
            },{ headers: { authorization: `Bearer ${token}` } }); 

            console.log(response.data)

            setWorkDays(workDays.map((day) => day._id === newWorkDay._id ? response.data : day))
            setNewWorkDay(
                {
                    name: "",
                    date: "",
                    timeEntry: "",
                    timeExit: "",
                    project: ""
                },
            )
            setModal(null);}
            catch(error){
                console.log(error)
            }
        }
    };

// DELETE
    const deleteCard = async(e, newWorkDay) => {

        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) { return navigate("/") };

        try{
        const response = await axios.delete("https://banco-de-horas-qmy6.onrender.com/register", { headers: { authorization: `Bearer ${token}` },  data:newWorkDay })
        if(!response.data){
            setWorkDays([])
        }else{
            setWorkDays([response.data])};
        window.location.reload()}
        catch(error){
            console.log(error)
        }
    }


// Salva array no localStorage sempre que houver atualização
    useEffect(() => {
        localStorage.setItem("workDaysList", JSON.stringify(workDays));
    }, [workDays]);

// Modal de edit
    const [modalEdit, setModalEdit] = useState({})
    const editCard = (day) => {
        setModalEdit({
            _id: day._id,
            name: day.name,
            date: day.date,
            timeEntry: day.timeEntry,
            timeExit: day.timeExit,
            project: day.project
        });
        setNewWorkDay({
            _id: day._id,
            name: day.name,
            date: day.date,
            timeEntry: day.timeEntry,
            timeExit: day.timeExit,
            project: day.project
        });
        setModal("editar");
    }
    
// JSX
    return (
        <div className="min-h-screen w-screen">
            <Navbar />
            <main className="px-3 py-5 lg:px-20 lg:pt-10">
                <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full flex-wrap">
                    <CardTime workDaysList={workDays} />
                </div>
            </main>



            {modal && (<article className="flex flex-col items-center justify-center fixed inset-0 z-9999 overflow-y-auto bg-black/90 w-full shadow-white shadow-2xl">

                <h1 className="text-3xl text-white font-bold mb-5">Registre suas horas</h1>

                <div className="flex items-center justify-center flex-col gap-2  md:w-[50%] overflow-hidden rounded-lg">
                    <div className="w-full">
                        <DailyCard name={newWorkDay.name} project={newWorkDay.project} timeExit={newWorkDay.timeExit} timeEntry={newWorkDay.timeEntry} date={newWorkDay.date} />
                    </div>
                    <div className="w-full">
                        <form className='flex flex-wrap justify-center w-full gap-4 py-5 px-0 bg-[#020617]'>

                            <div className="w-[40%]">
                                <label htmlFor="e-mail" className='text-start font-semibold'>Projeto</label>
                                <div className='flex border border-text-[#b4c6f3]-500 focus-within:border-2 focus-within:border-text-[#b4c6f3]-800  rounded-md justify-start items-center px-2 ease-in-out transition-colors'>
                                    <FontAwesomeIcon icon={faSuitcase} />
                                    <input value={newWorkDay.name} onChange={(e) => setNewWorkDay({ ...newWorkDay, name: e.target.value })} type="text" className='w-full outline-none focus:outline-1 rounded-md bg-transparent  p-2 text-sm' placeholder='Atividade desenvolvida' />
                                </div>
                            </div>


                            <div className="w-[40%]">
                                <label htmlFor="password" className='text-start font-semibold'>Descrição</label>
                                <div className='flex justify-start items-center px-2 border border-white focus-within:border-2 focus-within:border-text-[#b4c6f3]-800 rounded-md ease-in-out transition-colors'>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <select value={newWorkDay.project} onChange={(e) => { e.target.value == "Folga - Descontar do Banco" ? setNewWorkDay({ ...newWorkDay, project: e.target.value, timeEntry: "08:00", timeExit: "17:00" }) : setNewWorkDay({ ...newWorkDay, project: e.target.value }) }} className='w-full outline-none focus:outline-1 bg-transparent rounded-md p-2 text-sm'> <option selected value="" className="text-slate-950 font-semibold">Selecione uma opção</option><option className="text-slate-950 font-semibold">Folga - Descontar do Banco</option><option className="text-slate-950 font-semibold">Banco de Horas</option><option className="text-slate-950 font-semibold">Horas Extra</option></select>
                                </div>
                            </div>

                            <div className={newWorkDay.project != "Folga - Descontar do Banco" ? "w-[85%] lg:w-[25%]" : "w-[83%]"}>
                                <label htmlFor="password" className='text-start font-semibold'>Data</label>
                                <div className='flex justify-start items-center px-2 border border-gray-400 focus-within:border-2 focus-within:border-text-[#b4c6f3]-800 rounded-md ease-in-out transition-colors'>
                                    <FontAwesomeIcon icon={faCalendar} />
                                    <input value={newWorkDay.date} type="date" onChange={(e) => setNewWorkDay({ ...newWorkDay, date: e.target.value })} className='w-full outline-none focus:outline-1 bg-transparent rounded-md p-2 text-sm' />
                                </div>
                            </div>


                            {newWorkDay.project != "Folga - Descontar do Banco" ? (<><div className="hidden lg:flex  lg:justify-around  lg:items-center  lg:w-[55%]">
                                <div className="w-[40%]">
                                    <label htmlFor="password" className='text-start font-semibold'>Horário de entrada</label>
                                    <div className='flex justify-start items-center px-2 border border-gray-400 focus-within:border-2 focus-within:border-text-[#b4c6f3]-800 rounded-md ease-in-out transition-colors'>
                                        <FontAwesomeIcon icon={faClock} />
                                        <input value={newWorkDay.timeEntry} type="time" onChange={(e) => { setNewWorkDay({ ...newWorkDay, timeEntry: e.target.value }) }} className='w-full outline-none focus:outline-1 bg-transparent rounded-md p-2 text-sm' />
                                    </div>
                                </div>

                                <div className="w-[40%]">
                                    <label htmlFor="password" className='text-start font-semibold'>Horário de saída</label>
                                    <div className='flex justify-start items-center px-2 border border-gray-400 focus-within:border-2 focus-within:border-text-[#b4c6f3]-800 rounded-md ease-in-out transition-colors'>
                                        <FontAwesomeIcon icon={faClock} />
                                        <input type="time" value={newWorkDay.timeExit} onChange={(e) => { setNewWorkDay({ ...newWorkDay, timeExit: e.target.value }) }} className='w-full outline-none focus:outline-1 bg-transparent rounded-md p-2 text-sm' />
                                    </div>
                                </div>
                            </div>
                                <div className="lg:hidden flex justify-around  items-center w-[95%]">
                                    <div className="w-[40%]">
                                        <label htmlFor="password" className='text-start font-semibold'>Horário de entrada</label>
                                        <div className='flex justify-start items-center px-2 border border-gray-400 focus-within:border-2 focus-within:border-text-[#b4c6f3]-800 rounded-md ease-in-out transition-colors'>
                                            <FontAwesomeIcon icon={faClock} />
                                            <input value={newWorkDay.timeEntry} type="time" onChange={(e) => setNewWorkDay({ ...newWorkDay, timeEntry: e.target.value })} className='w-full outline-none focus:outline-1 bg-transparent rounded-md p-2 text-sm' />
                                        </div>
                                    </div>

                                    <div className="w-[40%]">
                                        <label htmlFor="password" className='text-start font-semibold'>Horário de saída</label>
                                        <div className='flex justify-start items-center px-2 border border-gray-400 focus-within:border-2 focus-within:border-text-[#b4c6f3]-800 rounded-md ease-in-out transition-colors'>
                                            <FontAwesomeIcon icon={faClock} />
                                            <input type="time" value={newWorkDay.timeExit} onChange={(e) => setNewWorkDay({ ...newWorkDay, timeExit: e.target.value })} className='w-full outline-none focus:outline-1 bg-transparent rounded-md p-2 text-sm' />
                                        </div>
                                    </div></div></>) : <> </>}



                            <div className="flex justify-center w-full gap-2 py-6">

                                {modal == 'adicionar' &&
                                    <button onClick={(e) => { newWorkDay.timeExit < newWorkDay.timeEntry ? (e.preventDefault(), alert("Seu horário de entrada não pode ser menor que o seu horário de saída"), setNewWorkDay({ ...newWorkDay, timeEntry: "", timeExit: "" })) : increaseDB(e, newWorkDay) }} className='w-[40%] p-1 border text-blue-400 border-blue-400 rounded-md text-lg font-bold'>
                                        Salvar
                                    </button>}
                                {modal == 'editar' &&
                                    <button onClick={(e) => { newWorkDay.timeExit < newWorkDay.timeEntry ? (e.preventDefault(), alert("Seu horário de entrada não pode ser menor que o seu horário de saída"), setNewWorkDay({ ...newWorkDay, timeEntry: "", timeExit: "" })) : updateWorkDays(e, newWorkDay) }} className='w-[40%] p-1 border text-blue-400 border-blue-400 rounded-md text-lg font-bold'>
                                        Atualizar
                                    </button>}
                                <button onClick={(e) => {
                                    e.preventDefault(); setModal(null); setNewWorkDay(
                                        {
                                            _id: "",
                                            name: "",
                                            date: "",
                                            timeEntry: "",
                                            timeExit: "",
                                            project: ""
                                        },
                                    )
                                }} className='w-[40%] p-1 bg-[#020617] text-red-400 border border-red-400 rounded-md text-lg font-bold'>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </article>)}

            <div className="boder border-slate-500">
                <article className="flex justify-between items-center px-3 lg:px-20 lg:pt-10 font-semibold text-text-[#b4c6f3]-800">
                    <p className="text-3xl">Histórico</p>
                    <button onClick={() => setModal("adicionar")} className="flex gap-1 items-center bg-text-[#b4c6f3]-800 text-white px-2 py-1.5 rounded-lg"> <span className="flex leading-none text-2xl font-normal p-0 shadow-2xl"> + </span> Adicionar</button>
                </article>


                <section className="px-1 lg:px-20 py-4">

                    {workDays.length > 0 ? (workDays.map((day, index) => (
                        <div key={index} className="my-5">
                            <DailyCard name={day.name} project={day.project} timeExit={day.timeExit} timeEntry={day.timeEntry} date={day.date} _id={day._id} delete={deleteCard} edit={editCard} />
                        </div>
                    ))) : (<div className="w-full py-10 text-lg text-center font-bold rounded-md"><h1> Ainda sem nenhum registro.. Clique em adicionar para começar</h1></div>)}

                </section>
            </div>

        </div>
    )
}

export default Home;