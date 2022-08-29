import React from 'react';

import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Image } from 'primereact/image';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Rating } from 'primereact/rating';
import { Sidebar } from 'primereact/sidebar';

import { api } from './../../services/api';
import ClientePrestadoresMapa from '../ClientePrestadoresMapa';
import ServicoCard from '../ServicoCard';

export class PrestadorCard extends React.Component {
    empty_servico = {
        nome: '',
        descricao: '',
        valor: null,
        prestador: null,
        veterinario: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            prestadores: [],
            servicos: [],
            loading: true,
            search: "",
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick = async e => {
        this.setState({ visibleRight: true })
        try {
            api.get(`/servicos/servico/${this.props.grupo}/${this.props.id}/`).then((response) => {
                console.log(response)
                this.setState({
                    servicos: response.data
                })
            });

        } catch (err){
            console.log("erro: ", err);
        };
    }

    render(){
        let prestador_template
        if(this.props.grupo === "prestador"){
            prestador_template = (<span className="text-green-500 font-medium bg-green-100 border-round p-1">Clinica</span>)

        }else if(this.props.grupo === "veterinario"){
            prestador_template = (<span className="text-blue-500 font-medium bg-blue-100 border-round p-1">Autônomo</span>)
        }

        let { servicos } = this.state
        return(
            <React.Fragment>
                <div className="col-8 mb-5">
                    <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                        <div className="flex align-items-end justify-content-start mb-3">
                            <div className="">
                                <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt="Image" width="150" preview />
                            </div>
                            <div className="ml-6">
                                <div className="text-900 font-medium text-xl mb-3">{this.props.first_name} {this.props.last_name}</div>
                                
                                <div className='flex align-items-center flex-wrap'>
                                    <div className='flex align-items-center justify-content-center mr-3'>
                                        <span className="block text-500 font-medium">Endereço</span>
                                    </div>
                                    <div className='flex align-items-center justify-content-center'>
                                        <Button icon="pi pi-map-marker" className="p-button-rounded p-button-text" onClick={(e) => this.op.toggle(e)} aria-haspopup aria-controls="overlay_panel"/>
                                    </div>
                                </div>
                                {prestador_template}
                                <Divider></Divider>
                                <span className="text-500">Avaliação dos usuários</span>
                                <Rating value={5} readOnly stars={5} cancel={false} />
                            </div>
                            <div className="ml-6"></div>
                            <div className="ml-6">
                                <Button label="Serviços" className="p-button-raised p-button-primary" onClick={this.onClick} />
                            </div>
                            <div className="ml-6">
                                <Button label="Agenda" className="p-button-raised p-button-help" />
                            </div>
                        </div>
                    </div>
                </div>

                <OverlayPanel ref={(el) => this.op = el} showCloseIcon id="overlay_panel">
                    <ClientePrestadoresMapa></ClientePrestadoresMapa>
                </OverlayPanel>

                <Sidebar className="p-sidebar-md" visible={this.state.visibleRight} position="right" onHide={() => this.setState({ visibleRight: false })}>
                    <p>{this.props.grupo}</p>
                    { servicos.map(
                        servico => <ServicoCard
                            key={servico.id}
                            nome={servico.nome}
                            descricao={servico.descricao}
                            valor={servico.valor}
                            prestador={servico.prestador}
                            veterinario={servico.veterinario}
                        ></ServicoCard>
                    )}
                    
                    
                    
                </Sidebar>
                
            </React.Fragment>
        )
    }
};

export default PrestadorCard;