import React, { Component } from 'react';
import { Menubar } from 'primereact/menubar';


import logo from './../../assets/images/MedOnVet.png';

export class Footer extends Component {

    render() {
        const start = (
            <div className='text-left px-6'>
                <div>
                    <img alt="logo" src={logo} height="50" className=""></img>
                </div>
                <div>
                    <span>© 2022 MedOnVet, Inc. All rights reserved</span>
                </div>    
            </div>
        );
        const end = (
            <div className='text-left px-6'>
                <span>
                    <a href='/'><i className="pi pi-twitter mr-3" style={{'fontSize': '2em'}}></i></a>
                    <a href='/'><i className="pi pi-discord mr-3" style={{'fontSize': '2em'}}></i></a>
                    <a href='/'><i className="pi pi-github" style={{'fontSize': '2em'}}></i></a>
                </span>
            </div>
        );

        return (    
            <Menubar start={start} end={end} />
        );
    }
}

export default Footer;