import React, { Component } from 'react';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';

import logo from './../../assets/images/MedOnVet.png';
import { api } from '../../services/api';
import { logout } from '../../services/auth'
import VeterinarioHome from '../../components/VeterinarioHome';
import VeterinarioConfig from '../../components/VeterinarioConfig';
import ServicosVeterinario from '../../components/ServicosVeterinario';
import PrestadorAgenda from '../../components/PrestadorAgenda';

class VeterinarioPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            childComponent: 'home',
        };
        this.items = [
            {   
                label: 'Home',
                icon: 'pi pi-fw pi-home',
                command: () => {
                    this.setState({childComponent: 'home'})
                }
            },
            {   
                label: 'Serviços',
                icon: 'pi pi-fw pi-briefcase',
                command: () => {
                    this.setState({childComponent: 'servico'})
                }
            },
            {   
                label: 'Agenda',
                icon: 'pi pi-fw pi-calendar',
                command: () => {
                    this.setState({childComponent: 'agenda'})
                }
            },
            {   
                label: 'Configurações',
                icon: 'pi pi-fw pi-cog',
                command: () => {
                    this.setState({childComponent: 'config'})
                }
            }
        ];
        this.teamItens = [
            {   
                label: 'Editar Time',
                icon: 'pi pi-fw pi-cog',
                url: '/app'
            }
        ]
        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }
    componentDidMount(){
        this.onLogin();
    }

    onLogin = async e => {
        try {
            api.get('/prestadores/veterinario/').then((response) => {
                console.log(response);
                this.setState({
                    username: response.data.user.username,
                    first_name: response.data.user.first_name,
                    last_name: response.data.user.last_name,
                });
            });
        } catch (err) {
            console.log(`Erro: ${err}`)
        }
        
    }

    onLogout(){
        logout();
        window.location.reload();
    }

    render() {
        const start = <img alt="logo" src={logo} height="50" className="mr-2 px-4"></img>;
        const end = (
            <div>
                <Button className='p-button-rounded p-button-text mr-4' icon="pi pi-power-off" onClick={this.onLogout} />
                <a href='/login'><Avatar icon="pi pi-user" className="mr-2" size="large" shape="circle" style={{ color: '#c7c3b4' }} /></a>
            </div>
        );
        
        let renderChild
        if(this.state.childComponent === 'home'){
            renderChild = (<VeterinarioHome></VeterinarioHome>)
        } else if(this.state.childComponent === 'config'){
            renderChild = (<VeterinarioConfig></VeterinarioConfig>)
        } else if(this.state.childComponent === 'servico'){
            renderChild = (<ServicosVeterinario></ServicosVeterinario>)
        } else if(this.state.childComponent === 'agenda'){
            renderChild = (<PrestadorAgenda></PrestadorAgenda>)
        }

        return (
            <React.Fragment>
                <Menubar model={this.items} start={start} end={end} className="shadow-10"/>
                <section>
                    <div className='container' style={{backgroundColor: '#EEF2F8' }}>
                        <div class="p-card">
                            <div class="flex card-container overflow-hidden">
                                <div class="flex-none flex align-items-center justify-content-center m-2 px-5 py-3">
                                    <Avatar icon="pi pi-user" className="mr-2" size="xlarge" shape="circle"/>
                                </div>
                                <div class="flex-grow-1 flex align-items-right justify-content-right m-2 px-5 py-3">
                                    <div>
                                        <div className="font-medium text-3xl text-900">{this.state.first_name} {this.state.last_name}</div>
                                        <div className="flex align-items-center text-700 flex-wrap">
                                            <div className="mr-5 mt-3">
                                                <small>SEGUIDORES</small><br/>
                                                <small>332 Clientes</small>
                                            </div>
                                            <div className="mr-5 mt-3">
                                                <small>SERVIÇOS</small><br/>
                                                <small>25 Clientes</small>
                                            </div>
                                            <div className="mt-3">
                                                <small>NOTIFICAÇÕES</small><br/>
                                                <Badge value="4" severity="info" className="mr-2"></Badge >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div class="flex-none flex align-items-center justify-content-center bg-blue-500 font-bold text-white m-2 px-5 py-3 border-round">PrimeFlex</div> */}
                            </div>
                        </div>

                        {renderChild}

                        


                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default VeterinarioPage; //