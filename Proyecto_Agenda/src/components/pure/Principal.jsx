import React from 'react';
import portatil from '../../assets/img/portatil.svg'

const Principal = () => {
    return (
        <>
            <section className='sec-home'>
                <div className='home-info'>
                    <div className='info-text'>
                        <span>Organiza tus Rutinas de Mantenimiento</span>
                    </div>
                    <h2 className='home-title'>Revisión de mantenimiento</h2>
                    <p className='home-description'>
                        Este software permite la visualización, monitoreo y control de la ejecución de las rutinas de mantenimiento de tu casa, empresa y mas, logrando así una mayor eficiencia en sus indicadores de mantenimiento.
                    </p>
                </div>
                <div className='home-img d-none d-md-block'>
                    <img src={ portatil } alt='foto' />
                </div>  
            </section>
            <section className='sec-details'>
                <div className='details-info'>
                    <h2 className='details-title'>Organiza las solicitudes de mantenimiento</h2>
                    <p className='details-description'>
                        Haz un seguimiento fácil del progreso de las solicitudes de mantenimiento utilizando la vista de proyectos. Utiliza la lista de rutinas de mantenimiento para organizar y planificar actividades.
                    </p>
                </div>
            </section>
        </>
    );
}

export default Principal;

