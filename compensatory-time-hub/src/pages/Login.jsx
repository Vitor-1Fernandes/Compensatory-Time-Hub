import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faLock } from "@fortawesome/free-solid-svg-icons"

function Login() {
    return (
        <div className="min-h-screen w-screen bg-slate-800 flex justify-center items-start py-30">

            <main className="flex w-90 items-start justify-center flex-wrap text-white">

                <header className='flex justify-center flex-wrap mb-5'>
                    <div className='w-full text-center text-5xl m-5'> <FontAwesomeIcon icon={faUser} /><FontAwesomeIcon icon={faClock} /> </div>
                    <h1 className='text-3xl font-bold'>Banco de Horas</h1>
                    <h2 className='text-sm'>Gerencie suas horas de forma simples</h2>
                </header>

                <section className='flex flex-col w-full gap-7 border border-slate-500 rounded-lg p-10 mb-5'>
                    <div>
                    <label for="e-mail" className='text-start font-semibold'>E-mail</label>
                    <div className='flex border border-slate-500 focus-within:border-2 focus-within:border-white  rounded-md justify-start items-center px-2 ease-in-out transition-colors'>
                        <FontAwesomeIcon icon={faEnvelope}/>
                        <input id="e-mail" className='w-full outline-none focus:outline-1 rounded-md bg-transparent  p-2 text-sm' placeholder='nome.sobrenome@sccorinthians.com.br' />
                    </div>
                    </div>

                    <div>
                    <label for="password" className='text-start font-semibold'>Senha</label>
                    <div className='flex justify-start items-center px-2 border border-gray-400 focus-within:border-2 focus-within:border-white rounded-md ease-in-out transition-colors'>
                        <FontAwesomeIcon icon={faLock}/>
                        <input id="password" type="password" className='w-full outline-none focus:outline-1 bg-transparent rounded-md p-2 text-sm' placeholder='••••••••' />
                    </div>
                    </div>
                    <button className='bg-slate-500 text-white rounded-md text-lg font-bold'>
                        Entrar
                    </button>
                </section>
                <div className='flex flex-col'>
                    <p className='text-sm'>Primeira vez aqui? Crie sua Conta</p>
                    </div>
            </main>
        </div>

    )
}

export default Login;