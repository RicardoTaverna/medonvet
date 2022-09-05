import React from 'react';

import { BreadCrumb } from 'primereact/breadcrumb';

import { api } from './../../services/api';
import NavbarApp from './../../components/NavbarApp';

class ClienteAgendamento extends React.Component {
    
    

    render(){
        const items = [
            {label: 'Agendamento'}
        ];
    
        const home = { icon: 'pi pi-home', url: '/app' }

        return(
            <React.Fragment>
            <NavbarApp></NavbarApp>
            <div className="card">
                <BreadCrumb model={items} home={home} />
            </div>
            </React.Fragment>
        )
    }

}

export default ClienteAgendamento;