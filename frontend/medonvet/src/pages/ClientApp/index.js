import React from 'react';
import './ClientApp.css';

import { Skeleton } from 'primereact/skeleton';
import { TabMenu } from 'primereact/tabmenu';

import { api } from './../../services/api';
import NavbarApp from './../../components/NavbarApp';
import Footer from './../../components/Footer';
import Pets from '../../components/Pets';
import ClienteServicos from '../../components/ClienteServicos';
import ClientePrestadores from '../../components/ClientePrestadores'
import ClienteConfig from '../../components/ClienteConfig';


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
            {label: 'Vets/Clinicas', icon: 'pi pi-fw pi-users'},
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

    componentWillUnmount() {
        
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
            <ClienteServicos></ClienteServicos>
        ) 
        
        const pets = (
            <Pets></Pets>
            
        )

        const calendario = (
            <div></div>
        )


        const configuracoes = (
            <ClienteConfig></ClienteConfig>
        )

        const vets_clinicas = (
            <ClientePrestadores></ClientePrestadores>
        )


        var render;
        
        switch(this.state.activeMenuIndex){
            case 0:
                render = vets_clinicas;
                break;
            case 1:
                render = servicos;
                console.log(servicos.type)
                break;
            case 2:
                render = pets;
                break;
            case 3:
                render = calendario;
                break;
            case 4:
                render = perfil;
                break;
            case 5:
                render = configuracoes;
                break;
            default:
                console.log("Switch default");
        }


        return(
            <React.Fragment>
            <NavbarApp></NavbarApp>
            <div>
                {/* <section className="perfil-background">
                    <div className="p-text-center px-6 text-200">   
                        <h1 className="p-mb-5">Bem Vindo {this.state.first_name} {this.state.last_name} </h1>
                        <p>Essa é sua home do app <b>MedOnVet</b></p>
                    </div>
                </section> */}
                <div className="card shadow-2">
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