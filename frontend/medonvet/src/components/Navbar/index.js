import React, { Component } from 'react';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';

import logo from './../../assets/images/MedOnVet.png';

export class Navbar extends Component {

    constructor(props) {
        super(props);

        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-fw pi-file',
                url: '/'
            },
            {
                label: 'Cliente',
                icon: 'pi pi-fw pi-pencil',
                url: '/'
            },
            {
                label: 'Prestador',
                icon: 'pi pi-fw pi-user',
                url: '/'
            },
            {
                label: 'MedOnVet',
                icon: 'pi pi-fw pi-calendar',
                url: '/'
            },
            {
                label: 'Apoiadores',
                icon: 'pi pi-fw pi-power-off',
                url: '/'
            }
        ];
    }

    render() {
        const start = <img alt="logo" src={logo} height="50" className="mr-2 px-4"></img>;
        const end = <a href='/login'><Avatar icon="pi pi-user" className="mr-2" size="large" shape="circle" /></a>;

        return (
            <div>
                <div className="card">
                    <Menubar model={this.items} start={start} end={end} />
                </div>
            </div>
        );
    }
}

export default Navbar;