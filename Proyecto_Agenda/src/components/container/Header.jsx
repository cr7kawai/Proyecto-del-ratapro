import React, { useState } from 'react';
import { Link } from 'react-router-dom';



const Header = () => {

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu =()=> {
        setShowMenu(!showMenu)
    }
    
    return (
        <nav className=' container col-12 sec-nav'>
            <h2 className='navbar-brand display-2'>Mi agenda</h2>
            <ul className= {`menu-projects ${ showMenu ? 'show ':' none' }`} >
                <li>
                    <Link to='/' onClick={ toggleMenu }  className='link-project'>
                        <i className=" link-icon bi bi-house-door-fill"></i> 
                        <span className='text-link'>Inicio</span>
                    </Link>
                </li>
                <li>
                    <Link to='/projects-form' onClick={ toggleMenu }  className='link-project'>
                        <i className=" link-icon bi bi-tools"></i> 
                        <span className='text-link'>Nueva agenda</span>
                    </Link>
                </li>
                <li> 
                    <Link to='/projects' onClick={ toggleMenu }  className='link-project'>
                        <i className="link-icon bi bi-eye-fill"></i>
                        <span className='text-link'>ver agendas</span>
                    </Link>
                </li>
            </ul>
            <button onClick={ toggleMenu } className='hamb'><i className="bi bi-list"></i></button> 
        </nav>
    );
}

export default Header;
