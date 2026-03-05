
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from "@fortawesome/free-solid-svg-icons"
import {faSignOut} from "@fortawesome/free-solid-svg-icons"
import {faUser} from "@fortawesome/free-solid-svg-icons"

import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className="flex items-center justify-between w-full bg-linear-600 from-slate-800 via-[#23324b] to-slate-800 text-white font-bold py-5 px-10"
        >
            <div className='flex items-center gap-3'>
                <FontAwesomeIcon className="text-3xl" icon={faClock} />
                <p className='text-xl'>Banco de horas</p>
            </div>


            <div className="flex gap-5">

                <Link to="/user"><FontAwesomeIcon className="text-3xl" icon={faUser}/></Link>
                <Link to="/"><FontAwesomeIcon className="text-3xl" icon={faSignOut}/></Link>
            </div>

        </div>
    )
}

export default Navbar;