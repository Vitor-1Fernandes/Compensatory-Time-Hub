import { useState, useEffect} from "react";
import axios from "axios";

import CardTime from "../components/CardTime";
import DailyCard from "../components/DailyCard";
import Navbar from "../components/Navbar";

function Home() {

    const [workDays, setWorkDays] = useState([{ id: 1, name: "Neo Quimica Arena", date: "27 de fevereiro, 2026", time: "+2h30", project: "Projeto Alfa" }, { id: 1, name: "Neo Quimica Arena", date: "27 de fevereiro, 2026", time: "+2h30", project: "Projeto Alfa", }])

    const fetchAPI = async () => {
        const response = await axios.get("http://localhost:8080/api")
        console.log(response.data.day)
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    return (
        <div className="min-h-screen w-screen">
            <Navbar />
            <main className="px-3 py-10 lg:px-20 lg:py-10">

                <div className="flex flex-col gap-10 px-10 lg:p-0">
                    <header className="text-slate-800">
                        <h1 className="font-bold text-3xl"> Olá, Vitor</h1>
                        <p>Aqui está o resumo do seu banco de horas</p>
                    </header>
                    <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full flex-wrap gap-3">
                        <CardTime />
                        <CardTime />
                        <CardTime />
                    </div>
                </div>
            </main>
            <article className="flex justify-between items-center px-10 lg:px-20 lg:pt-10 font-semibold text-slate-800">
                <p className="text-3xl">Histórico</p>
                <p className="flex gap-1 items-center bg-slate-800 text-white px-2 py-1.5 rounded-lg"> <span className="flex leading-none text-2xl font-normal p-0"> + </span> Adicionar</p>
            </article>
            <section className="px-10 lg:px-20 py-4">

                {workDays.map((day) => (
                    <div className="m-3">
                        <DailyCard name={day.name} project={day.project} time={day.time} date={day.date} />
                    </div>
                ))}

            </section>

        </div>
    )
}

export default Home;