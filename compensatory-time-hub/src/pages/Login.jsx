import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faLock } from "@fortawesome/free-solid-svg-icons"


function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const entrar = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/login", {
                email: email,
                senha: senha
            });
            if(response.data.message === "autorizado"){
                localStorage.setItem("token", response.data.token);
                navigate("/home");
            }
            else{
                alert(response.data.erro);
            }
        }
        catch (error) {
            console.error("Erro na conexão:", error);
            alert("O servidor está desligado ou houve um erro!");
        }


    };

    return (
        <div className="min-h-screen w-screen bg-[#0E1116] flex justify-center items-start pt-10">

            <main className="flex w-90 items-start justify-center flex-wrap text-white">

                <header className='flex justify-center flex-wrap mb-4'>
                    <div className='w-full text-center text-5xl m-5'> <FontAwesomeIcon icon={faUser} /><FontAwesomeIcon icon={faClock} /> </div>
                    <h1 className='text-3xl font-bold'>Banco de Horas</h1>
                    <h2 className='text-sm'>Gerencie suas horas de forma simples</h2>
                </header>

                <form onSubmit={entrar} className='flex flex-col w-full gap-7 rounded-lg mb-2'>
                    <div>
                        <label htmlFor="e-mail" className='text-start font-semibold'>E-mail</label>
                        <div className='flex border border-white focus-within:border-2 focus-within:border-white  rounded-md justify-start items-center px-2 ease-in-out transition-colors'>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input required onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" className='w-full outline-none focus:outline-1 rounded-md bg-transparent  p-2 text-sm' placeholder='nome.sobrenome@sccorinthians.com.br' />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className='text-start font-semibold'>Senha</label>
                        <div className='flex justify-start items-center px-2 border border-gray-400 focus-within:border-2 focus-within:border-white rounded-md ease-in-out transition-colors'>
                            <FontAwesomeIcon icon={faLock} />
                            <input required onChange={(e) => setSenha(e.target.value)} id="password" name="password" type="password" className='w-full outline-none focus:outline-1 bg-transparent rounded-md p-2 text-sm' placeholder='••••••••' />
                        </div>
                    </div>
                    <button type="submit" className='bg-blue-400 text-white rounded-md text-lg font-bold'>
                        Entrar
                    </button>
                </form>
                <div className='flex flex-col'>
                    <p className='text-sm mt-5'>Primeira vez aqui? Crie sua Conta</p>
                </div>
            </main>
        </div>

    )
}

export default Login;