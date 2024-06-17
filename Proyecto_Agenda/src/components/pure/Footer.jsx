import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    
    return (
        <section className='container col-12 sec-footer flex-column flex-sm-row'>
            <div className='footer-text-init'>
                <h4>Comienza a organizar tus tareas</h4>
                <Link className='btn btn-outline-light btn-sm' to={`/projects-form`} style={{ textDecoration: 'none' }} >Comenzar</Link>
            </div>
            <div className='footer-contact'>
                <h6>Contactanos</h6>
                <ul>
                    <li><i className="bi bi-phone-fill"></i></li>
                    <li><i className="bi bi-envelope-fill"></i>  jarttorres2@gmail.com</li>
                    <li><i className="bi bi-geo-alt-fill"></i>  Dolores Hidalgo gto</li>
                </ul>
            </div>
            <div className='footer-network'>
                <h6>Redes Sociales</h6>
                <ul>
                    <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i></a></li>
                    <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a></li>
                    <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter"></i></a></li>
                </ul>
            </div>
        </section>
    );
}

export default Footer;
