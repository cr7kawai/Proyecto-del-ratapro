import React from 'react';
import Footer from '../components/pure/Footer';
import Principal from '../components/pure/Principal';

const Home = () => {
    return (
        <div className='container-xxl p-0'>
            <div>
                <Principal />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default Home;
