
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSignOut} from "@fortawesome/free-solid-svg-icons"
import {faUser} from "@fortawesome/free-solid-svg-icons"

import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className="flex items-center justify-between w-full text-[#ffffff] font-bold py-5 px-2 lg:px-4 md:px-10" 
        >
            <div className='flex flex-col-reverse items-start gap-1 pl-4 lg:pl-12'>
                <h1 className="flex w-auto font-light"> Olá, Vitor - Aqui está seu resumo</h1>
                <p className='lg:text-2xl text-xl bg-clip-text text-transparent bg-linear-to-l from-[#6c8cde] via-[#5b9be5] to-[#8aa3e1]'>Banco de horas</p>
            </div>


            <div className="flex gap-5">

                <Link to="/user"><FontAwesomeIcon className="lg:text-xl" icon={faUser}/></Link>
                <Link to="/"><FontAwesomeIcon className="lg:text-xl" icon={faSignOut}/></Link>
            </div>

        </div>
    )
}

export default Navbar;