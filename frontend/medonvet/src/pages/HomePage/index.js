import React from 'react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
 
import heroImage from './../../assets/images/dog_cat_cute.png'
import logo from './../../assets/images/MedOnVet.png';

import { Button } from 'primereact/button';

const HomePage = () => {

    return (
        <React.Fragment>
            <header>
                <Navbar></Navbar>
            </header>

            <main>
                <section id='hero'>
                    <div className="layout-main-container">
                        <div className="layout-main">
                            <div className="grid grid-nogutter surface-0 text-800">
                                <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                                    <section>
                                        <img alt="logo" src={logo} height="100" className="mr-2 px-4"></img>
                                        <div className="text-6xl text-primary font-bold mb-3">Conectando pets aos vets</div>
                                        <p className="mt-0 mb-4 text-700 line-height-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                                        <Button label="Learn More" type="button" className="mr-3 p-button-raised" />
                                        <Button label="Live Demo" type="button" className="p-button-outlined" />
                                    </section>
                                </div>
                                <div className="col-12 md:col-6 overflow-hidden">
                                    <img src={heroImage} alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id='products' className='mt-6'>
                    <div className='container px-6'>
                        <div className="surface-0 text-center">
                            <div className="mb-3 font-bold text-2xl">
                                <span className="text-900">One Product, </span>
                                <span className="text-blue-600">Many Solutions</span>
                            </div>
                            <div className="text-700 text-sm mb-6">Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.</div>
                            <div className="grid">
                                <div className="col-12 md:col-4 mb-4 px-5">
                                    <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                        <i className="pi pi-desktop text-4xl text-blue-500"></i>
                                    </span>
                                    <div className="text-900 mb-3 font-medium">Built for Developers</div>
                                    <span className="text-700 text-sm line-height-3">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
                                </div>
                                <div className="col-12 md:col-4 mb-4 px-5">
                                    <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                        <i className="pi pi-lock text-4xl text-blue-500"></i>
                                    </span>
                                    <div className="text-900 mb-3 font-medium">End-to-End Encryption</div>
                                    <span className="text-700 text-sm line-height-3">Risus nec feugiat in fermentum posuere urna nec. Posuere sollicitudin aliquam ultrices sagittis.</span>
                                </div>
                                <div className="col-12 md:col-4 mb-4 px-5">
                                    <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                        <i className="pi pi-check-circle text-4xl text-blue-500"></i>
                                    </span>
                                    <div className="text-900 mb-3 font-medium">Easy to Use</div>
                                    <span className="text-700 text-sm line-height-3">Ornare suspendisse sed nisi lacus sed viverra tellus. Neque volutpat ac tincidunt vitae semper.</span>
                                </div>
                                <div className="col-12 md:col-4 mb-4 px-5">
                                    <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                        <i className="pi pi-globe text-4xl text-blue-500"></i>
                                    </span>
                                    <div className="text-900 mb-3 font-medium">Fast & Global Support</div>
                                    <span className="text-700 text-sm line-height-3">Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus.</span>
                                </div>
                                <div className="col-12 md:col-4 mb-4 px-5">
                                    <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                        <i className="pi pi-github text-4xl text-blue-500"></i>
                                    </span>
                                    <div className="text-900 mb-3 font-medium">Open Source</div>
                                    <span className="text-700 text-sm line-height-3">Nec tincidunt praesent semper feugiat. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. </span>
                                </div>
                                <div className="col-12 md:col-4 md:mb-4 mb-0 px-3">
                                    <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                        <i className="pi pi-shield text-4xl text-blue-500"></i>
                                    </span>
                                    <div className="text-900 mb-3 font-medium">Trusted Securitty</div>
                                    <span className="text-700 text-sm line-height-3">Mattis rhoncus urna neque viverra justo nec ultrices. Id cursus metus aliquam eleifend.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </section>

                <section id='pricing' className=' mt-6'>
                    <div className='container px-6'>
                        <div className="surface-0">
                            <div className="text-900 font-bold text-6xl mb-4 text-center">Pricing Plans</div>
                            <div className="text-700 text-xl mb-6 text-center line-height-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div>

                            <div className="grid">
                                <div className="col-12 lg:col-4">
                                    <div className="p-3 h-full">
                                        <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                                            <div className="text-900 font-medium text-xl mb-2">Basic</div>
                                            <div className="text-600">Plan description</div>
                                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                            <div className="flex align-items-center">
                                                <span className="font-bold text-2xl text-900">$9</span>
                                                <span className="ml-2 font-medium text-600">per month</span>
                                            </div>
                                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                            <ul className="list-none p-0 m-0 flex-grow-1">
                                                <li className="flex align-items-center mb-3">
                                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                    <span>Arcu vitae elementum</span>
                                                </li>
                                                <li className="flex align-items-center mb-3">
                                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                    <span>Dui faucibus in ornare</span>
                                                </li>
                                                <li className="flex align-items-center mb-3">
                                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                    <span>Morbi tincidunt augue</span>
                                                </li>
                                            </ul>
                                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
                                            <Button label="Buy Now" className="p-3 w-full mt-auto" />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 lg:col-4">
                                    <div className="p-3 h-full">
                                        <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                                            <div className="text-900 font-medium text-xl mb-2">Premium</div>
                                            <div className="text-600">Plan description</div>
                                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                            <div className="flex align-items-center">
                                                <span className="font-bold text-2xl text-900">$29</span>
                                                <span className="ml-2 font-medium text-600">per month</span>
                                            </div>
                                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                            <ul className="list-none p-0 m-0 flex-grow-1">
                                                <li className="flex align-items-center mb-3">
                                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                    <span>Arcu vitae elementum</span>
                                                </li>
                                                <li className="flex align-items-center mb-3">
                                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                    <span>Dui faucibus in ornare</span>
                                                </li>
                                                <li className="flex align-items-center mb-3">
                                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                    <span>Morbi tincidunt augue</span>
                                                </li>
                                                <li className="flex align-items-center mb-3">
                                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                    <span>Duis ultricies lacus sed</span>
                                                </li>
                                            </ul>
                                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                                            <Button label="Buy Now" className="p-3 w-full" />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 lg:col-4">
                                    <div className="p-3 h-full">
                                        <div className="shadow-2 p-3 flex flex-column" style={{ borderRadius: '6px' }}>
                                            <div className="text-900 font-medium text-xl mb-2">Enterprise</div>
                                            <div className="text-600">Plan description</div>
                                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                            <div className="flex align-items-center">
                                                <span className="font-bold text-2xl text-900">$49</span>
                                                <span className="ml-2 font-medium text-600">per month</span>
                                            </div>
                                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                            <ul className="list-none p-0 m-0 flex-grow-1">
                                                <li className="flex align-items-center mb-3">
                                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                    <span>Arcu vitae elementum</span>
                                                </li>
                                                <li className="flex align-items-center mb-3">
                                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                    <span>Dui faucibus in ornare</span>
                                                </li>
                                                <li className="flex align-items-center mb-3">
                                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                    <span>Morbi tincidunt augue</span>
                                                </li>
                                                <li className="flex align-items-center mb-3">
                                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                    <span>Duis ultricies lacus sed</span>
                                                </li>
                                                <li className="flex align-items-center mb-3">
                                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                    <span>Imperdiet proin</span>
                                                </li>
                                                <li className="flex align-items-center mb-3">
                                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                    <span>Nisi scelerisque</span>
                                                </li>
                                            </ul>
                                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                                            <Button label="Buy Now" className="p-3 w-full p-button-outlined" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id='join' className='mt-6'>
                    <div className='container mt-6 p-6' style={{ backgroundColor: '#18283F' }}>
                        <div className="text-700 text-center p-6">
                            <div className="text-blue-600 font-bold mb-3"><i className="pi pi-discord"></i>&nbsp;POWERED BY DISCORD</div>
                            <div className="text-300 font-bold text-5xl mb-3">Join Our Design Community</div>
                            <div className="text-400 text-2xl mb-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div>
                            <Button label="Join Now" icon="pi pi-discord" className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap" />
                        </div>
                    </div>
                </section>

            </main>
            <footer className='m-4'>
                <Footer></Footer>
            </footer>
        </React.Fragment>
    )
}

export default HomePage;