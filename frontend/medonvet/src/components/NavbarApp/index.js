import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';

import logo from './../../assets/images/logo2.png';
import { logout } from './../../services/auth'

export class NavbarApp extends Component {

    constructor(props) {
        super(props);

        this.items = [
            // {
            //     icon: 'pi pi-fw pi-bars',
            //     url: '/'
            // }
        ];
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout(){
        logout();
        window.location.reload();
    }

    render() {
        const start = <img alt="logo" src={logo} height="50" className="mr-2 px-4"></img>;
        const end = (
            <div>
                <Button label="Logout" className='p-button-outlined mr-4 p-button-sm' icon="pi pi-power-off" onClick={this.onLogout} />
                <a href='/login'><Avatar icon="pi pi-user" className="mr-2" size="large" shape="circle" style={{ color: '#c7c3b4' }} /></a>
            </div>
        );

        return (
            <Menubar model={this.items} start={start} end={end} className="shadow-10" style={{ backgroundColor: '#18283F', border: 0, borderRadius: 0}}/>
        );
    }
}

export default NavbarApp;