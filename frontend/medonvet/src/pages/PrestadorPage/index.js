import React, { Component } from 'react';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { Menu } from 'primereact/menu';
import { Avatar } from 'primereact/avatar';

import logo from './../../assets/images/MedOnVet.png';
import { api } from './../../services/api';
import { logout } from './../../services/auth'

class PrestadorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            first_name: '',
            last_name: '',
            email: '',
        };
        this.items = [
            {   
                label: 'Home',
                icon: 'pi pi-fw pi-home',
                url: '/app'
            },
            {   
                label: 'Configurações',
                icon: 'pi pi-fw pi-cog',
                url: '/app'
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
            api.get('/prestadores/detalhe/').then((response) => {
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


                        <div className="grid px-6 py-3">
                            <div className="col-12 md:col-6 lg:col-3">
                                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                                    <div className="flex justify-content-between mb-3">
                                        <div>
                                            <span className="block text-500 font-medium mb-3">Orders</span>
                                            <div className="text-900 font-medium text-xl">152</div>
                                        </div>
                                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                            <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
                                        </div>
                                    </div>
                                    <span className="text-green-500 font-medium">24 new </span>
                                    <span className="text-500">since last visit</span>
                                </div>
                            </div>
                            <div className="col-12 md:col-6 lg:col-3">
                                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                                    <div className="flex justify-content-between mb-3">
                                        <div>
                                            <span className="block text-500 font-medium mb-3">Revenue</span>
                                            <div className="text-900 font-medium text-xl">$2.100</div>
                                        </div>
                                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                            <i className="pi pi-map-marker text-orange-500 text-xl"></i>
                                        </div>
                                    </div>
                                    <span className="text-green-500 font-medium">%52+ </span>
                                    <span className="text-500">since last week</span>
                                </div>
                            </div>
                            <div className="col-12 md:col-6 lg:col-3">
                                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                                    <div className="flex justify-content-between mb-3">
                                        <div>
                                            <span className="block text-500 font-medium mb-3">Customers</span>
                                            <div className="text-900 font-medium text-xl">28441</div>
                                        </div>
                                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                            <i className="pi pi-inbox text-cyan-500 text-xl"></i>
                                        </div>
                                    </div>
                                    <span className="text-green-500 font-medium">520  </span>
                                    <span className="text-500">newly registered</span>
                                </div>
                            </div>
                            <div className="col-12 md:col-6 lg:col-3">
                                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                                    <div className="flex justify-content-between mb-3">
                                        <div>
                                            <span className="block text-500 font-medium mb-3">Comments</span>
                                            <div className="text-900 font-medium text-xl">152 Unread</div>
                                        </div>
                                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                            <i className="pi pi-comment text-purple-500 text-xl"></i>
                                        </div>
                                    </div>
                                    <span className="text-green-500 font-medium">85 </span>
                                    <span className="text-500">responded</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid px-6 py-3">
                            <div className="col-12 md:col-12 lg:col-6">
                                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                                    <div className="flex justify-content-between mb-3">
                                        <div>
                                            <span className="text-900 mb-3">Veterinários</span>
                                        </div>
                                        <div className="flex align-items-center justify-content-center">
                                            <Menu model={this.teamItens} popup ref={el => this.menu = el} id="popup_menu" />
                                            <Button icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-plain" aria-label="Filter" onClick={(event) => this.menu.toggle(event)} aria-controls="popup_menu" aria-haspopup />
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="flex card-container blue-container overflow-hidden">
                                            <div class="flex-none flex align-items-center justify-content-center border-round">
                                                <Avatar label="V" className="mr-2" size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />
                                            </div>
                                            <div class="flex-grow-1 flex align-items-right justify-content-right m-2 px-5 py-3 border-round">
                                                <div>
                                                    <div className="font-medium text-xl text-900">Ygor Stengrat</div>
                                                        <div className="flex align-items-center text-700 flex-wrap">
                                                            <div className="mr-5">
                                                                <small>Clinico Geral</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            <div class="flex-none flex align-items-center justify-content-center m-2 px-5 py-3 border-round">
                                                <Button icon="pi pi-facebook" className="p-button-rounded p-button-text p-button-plain"/>
                                                <Button icon="pi pi-linkedin" className="p-button-rounded p-button-text p-button-plain"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default PrestadorPage;