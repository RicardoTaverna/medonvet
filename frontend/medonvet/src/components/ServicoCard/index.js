import React from 'react';
import './ServicoCard.css';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { Rating } from 'primereact/rating';

import { api } from './../../services/api';
import consulta_img from '../../assets/images/veterinary-sm.png'
import aplicacao_img from '../../assets/images/aplicacao-sm.png'
import cirurgia_img from '../../assets/images/cirurgia-sm.png'
import medicamento_img from '../../assets/images/medicine-sm.png'

export class ServicoCard extends React.Component {

    empty_prestador = {
        avatar: null,
        capa: null,
        cpf_cnpj: "",
        crmv: "",
        descricao: null,
        fimAtendimento: null,
        inicioAtendimento: null,
        user: {
            email: "",
            first_name: "",
            id: null,
            last_name: "",
            username: "",
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            displayDialog: false,
            position: 'center',
            prestador: this.empty_prestador,
        };
        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    componentDidMount() {
        this.onLoad();
    }

    onLoad() {
        try {
            let url;
            if(this.props.prestador){
                url = `/prestadores/detalhe/${this.props.prestador}/`
            } else if(this.props.veterinario){
                url = `/prestadores/veterinario/detalhe/${this.props.veterinario}/`
            }
            api.get(url).then((response) => {
                console.log(response)
                this.setState({
                    prestador: response.data,
                    loading: false,
                    search: "",
                })
            });

        } catch (err){
            console.log("erro: ", err);
        };
    }

    onClick(name, position) {
        let state = {
            [`${name}`]: true
        };
        if (position) {
            state = {
                ...state,
                position
            }
        }
        this.setState(state);
    }

    onHide(name) {
        this.setState({
            [`${name}`]: false
        });
    }

    render() {

        let img;
        let nome_string = this.props.nome

        if(nome_string.includes('Consulta')){
            img = consulta_img
        } else if(nome_string.includes('Cirurgia')){
            img = cirurgia_img
        } else if(nome_string.includes('Vacina')){
            img = aplicacao_img
        } else {
            img = medicamento_img
        }


        return(
            <React.Fragment>
                <div className="field col-12 md:col-6 pr-0">
                    <div className='card-servico mt-5' onClick={() => this.onClick('displayDialog')}>
                        <div className='grid'>
                            <div className="col-8">
                                <div className="grid">
                                    <div className="col-12">
                                        <p className='text-3xl'>{this.props.nome}</p> 
                                        <p className='font-light'><i className="pi pi-users mr-2"></i>{this.state.prestador.user.first_name} {this.state.prestador.user.last_name}</p>
                                        <p className='font-light'><i className="pi pi-map-marker mr-2"></i>Endereço</p>
                                        <Rating value={3} readOnly stars={5} cancel={false} />
                                    </div>
                                    <div className="col-12 mt-6">
                                        <span className='bg-green-100 border-round p-1'> R${this.props.valor}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <img alt="Card" src={img} className="mt-4"/>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <Dialog header={this.props.nome} visible={this.state.displayDialog} style={{ width: '50vw' }} onHide={() => this.onHide('displayDialog')}>
                    <div className='grid'>
                        <div className="col-4">
                            <img alt="Card" src={img} className="mt-4"/>
                        </div>
                        <div className="col-8">
                            <div className="grid">
                                <div className="col-12">
                                    <p className='font-light'><i className="pi pi-users mr-2"></i>{this.state.prestador.user.first_name} {this.state.prestador.user.last_name}</p>
                                    <p className='font-light'><i className="pi pi-map-marker mr-2"></i>Endereço</p>
                                
                                    <Divider></Divider>
                                    <p className='font-semibold'>Avaliação dos usuários</p>
                                    <Rating value={3} readOnly stars={5} cancel={false} />
                                
                                    <Divider></Divider>
                                    <p className='font-semibold'>Descrição do Serviço</p>
                                    <p className='font-light'>{this.props.descricao}</p>
                                    
                                    <Divider></Divider>
                                    <p className='font-semibold'>Contratar Serviço</p>
                                    
                                    <div className='grid'>
                                        <div className='col-4'>
                                            <p><span className='bg-green-100 border-round p-1'> R${this.props.valor}</span></p>
                                        </div>
                                        <div className='col-4 col-offset-4'>
                                            <Button label="Agendar" className="p-button-raised" />
                                        </div>
                                    </div>
                                        
                                        
                                    
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </Dialog>
            </React.Fragment>
        )
    }

}

export default ServicoCard;