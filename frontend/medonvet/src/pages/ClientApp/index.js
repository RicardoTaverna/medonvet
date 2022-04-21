import React from 'react';
import './ClientApp.css';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Skeleton } from 'primereact/skeleton';
import { TabMenu } from 'primereact/tabmenu';

import { api } from './../../services/api';
import NavbarApp from './../../components/NavbarApp';
import Footer from './../../components/Footer';
import Pets from '../../components/Pets';


class ClientApp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            activeMenuIndex: 3,
            username: '',
            first_name: '',
            last_name: '',
            email: '',
        };
        this.menuItens =  [
            {label: 'Serviços', icon: 'pi pi-fw pi-home'},
            {label: 'Pets', icon: 'pi pi-fw pi-pencil'},
            {label: 'Calendário', icon: 'pi pi-fw pi-calendar'},
            {label: 'Perfil', icon: 'pi pi-fw pi-file'},
            {label: 'Configurações', icon: 'pi pi-fw pi-cog'}
        ];
        this.onLogin = this.onLogin.bind(this);
    }

    componentDidMount(){
        this.onLogin();
    }
    
    onLogin = async e => {
        try {
            api.get('/clientes/detalhe/').then((response) => {
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

    products = Array.from({ length: 5 });

    bodyTemplate = () => {
        return <Skeleton></Skeleton>
    }

    render(){

        const perfil = (
        
            <div>
                <div className="card-container p-d-flex p-6">
                    <div className="surface-0">
                        <ul className="list-none p-0 m-0 flex align-items-center font-medium mb-3">
                            <li>
                                <a className="text-500 no-underline line-height-3 cursor-pointer">Perfil Cliente</a>
                            </li>
                        </ul>
                        <div className="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
                            <div>
                                <div className="font-medium text-3xl text-900">{this.state.username}</div>
                            </div>
                            <div className="mt-3 lg:mt-0">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )

        const servicos = (
            <div className='p-6'>
                <div className="card">
                    <div className="grid formgrid">
                        <div className="field col-12 md:col-6 md:pr-6 pr-0">
                            <h4>Card</h4>
                            <div className="custom-skeleton p-4">
                                <div className="flex mb-3">
                                    <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                                    <div>
                                        <Skeleton width="10rem" className="mb-2"></Skeleton>
                                        <Skeleton width="5rem" className="mb-2"></Skeleton>
                                        <Skeleton height=".5rem"></Skeleton>
                                    </div>
                                </div>
                                <Skeleton width="100%" height="150px"></Skeleton>
                                <div className="flex justify-content-between mt-3">
                                    <Skeleton width="4rem" height="2rem"></Skeleton>
                                    <Skeleton width="4rem" height="2rem"></Skeleton>
                                </div>
                            </div>
                        </div>
                        <div className="field col-12 md:col-6 md:pr-6 pr-0">
                            <h4>Card</h4>
                            <div className="custom-skeleton p-4">
                                <div className="flex mb-3">
                                    <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                                    <div>
                                        <Skeleton width="10rem" className="mb-2"></Skeleton>
                                        <Skeleton width="5rem" className="mb-2"></Skeleton>
                                        <Skeleton height=".5rem"></Skeleton>
                                    </div>
                                </div>
                                <Skeleton width="100%" height="150px"></Skeleton>
                                <div className="flex justify-content-between mt-3">
                                    <Skeleton width="4rem" height="2rem"></Skeleton>
                                    <Skeleton width="4rem" height="2rem"></Skeleton>
                                </div>
                            </div>
                        </div>
                        <div className="field col-12 md:col-6 md:pr-6 pr-0">
                            <h4>Card</h4>
                            <div className="custom-skeleton p-4">
                                <div className="flex mb-3">
                                    <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                                    <div>
                                        <Skeleton width="10rem" className="mb-2"></Skeleton>
                                        <Skeleton width="5rem" className="mb-2"></Skeleton>
                                        <Skeleton height=".5rem"></Skeleton>
                                    </div>
                                </div>
                                <Skeleton width="100%" height="150px"></Skeleton>
                                <div className="flex justify-content-between mt-3">
                                    <Skeleton width="4rem" height="2rem"></Skeleton>
                                    <Skeleton width="4rem" height="2rem"></Skeleton>
                                </div>
                            </div>
                        </div>
                        <div className="field col-12 md:col-6 md:pr-6 pr-0">
                            <h4>Card</h4>
                            <div className="custom-skeleton p-4">
                                <div className="flex mb-3">
                                    <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                                    <div>
                                        <Skeleton width="10rem" className="mb-2"></Skeleton>
                                        <Skeleton width="5rem" className="mb-2"></Skeleton>
                                        <Skeleton height=".5rem"></Skeleton>
                                    </div>
                                </div>
                                <Skeleton width="100%" height="150px"></Skeleton>
                                <div className="flex justify-content-between mt-3">
                                    <Skeleton width="4rem" height="2rem"></Skeleton>
                                    <Skeleton width="4rem" height="2rem"></Skeleton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) 
        
        const pets = (
            <Pets></Pets>
            // <div className='p-6'>
            //     <h4>Pets</h4>
            //     <DataTable value={this.products} className="p-datatable-striped">
            //         <Column field="codigo" header="Código" style={{ width: '25%' }} body={this.bodyTemplate}></Column>
            //         <Column field="nome" header="Nome" style={{ width: '25%' }} body={this.bodyTemplate}></Column>
            //         <Column field="peso" header="Peso" style={{ width: '25%' }} body={this.bodyTemplate}></Column>
            //         <Column field="raca" header="Raça" style={{ width: '25%' }} body={this.bodyTemplate}></Column>
            //         <Column field="idade" header="Idade" style={{ width: '25%' }} body={this.bodyTemplate}></Column>
            //         <Column field="sexo" header="Sexo" style={{ width: '25%' }} body={this.bodyTemplate}></Column>
            //     </DataTable>
            // </div>
        )

        const calendario = (
            <div></div>
        )

        const configuracoes = (
            <div className='p-6'>
                <div className="card p-container">
                    <div className="grid formgrid">
                        <div className="field col-12 md:col-6">
                            <h3>Configurações</h3>
                            <Skeleton className="mb-2"></Skeleton>
                            <Skeleton width="10rem" className="mb-2"></Skeleton>
                            <Skeleton width="5rem" className="mb-2"></Skeleton>
                            <Skeleton height="2rem" className="mb-2"></Skeleton>
                            <Skeleton width="10rem" height="4rem"></Skeleton>
                        </div>
                    </div>
                </div>
            </div>
        )


        var render;
        
        switch(this.state.activeMenuIndex){
            case 0:
                render = servicos;
                console.log(servicos.type)
                break;
            case 1:
                render = pets;
                break;
            case 2:
                render = calendario;
                break;
            case 3:
                render = perfil;
                break;
            case 4:
                render = configuracoes;
                break;
            default:
                console.log("Switch default");
        }


        return(
            <React.Fragment>
            <NavbarApp></NavbarApp>
            <div>
                <section className="perfil-background">
                    <div className="p-text-center px-6 text-200">   
                        <h1 className="p-mb-5">Bem Vindo {this.state.first_name} {this.state.last_name} </h1>
                        <p>Essa é sua home do app <b>MedOnVet</b></p>
                    </div>
                </section>
                <div className="card">
                    <TabMenu 
                        model={this.menuItens} 
                        activeIndex={this.state.activeMenuIndex}
                        onTabChange={(e) => this.setState({ activeMenuIndex: e.index })}
                    />
                </div>
            </div>
            {render}            
            </React.Fragment>
        )
    }

}

export default ClientApp;