import React from 'react';

import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';

import { api } from '../../services/api';

export class AplicacoesPetInfo extends React.Component {
    emptyAplicacao = {
        id: null,
        tipo: "",
        nome_medicamento: "",
        data_aplicacao: "",
        data_reaplicacao: "",
        notificar: ""
    };

    emptyAnamnese = {
		id: null,
		queixa_principal: "",
		frequencia_cardiaca: "",
		frequencia_respiratoria: "",
		linfonodo: "",
		cor_mucosa: "",
		tpc: "",
		hidratacao: "",
		agendamento: null
	}

    emptyAgendamento = {
       
        id: 44,
        cliente: null,
        servico: {
            id: null,
            nome: "",
            descricao: "",
            valor: null,
            status_servico: 0,
            prestador: null,
            veterinario: 0
        },
        veterinario: {
            id: null,
            user: {
                id: null,
                username: "",
                first_name: "",
                last_name: "",
                email: ""
            },
            crmv: "",
            avatar: "",
            descricao: "",
            cpf_cnpj: null,
            inicioAtendimento: null,
            fimAtendimento: null
        },
        pet: null,
        data: "",
        horario_selecionado: ""
    }

    constructor(props) {
        super(props);
        this.state = {
            aplicacoes: [],
            aplicacao: this.emptyAplicacao,
            anamneseDialog: false,
            anamnese: this.emptyAnamnese,
            agendamento: this.emptyAgendamento,
        };
        this.onLoad = this.onLoad.bind(this);
        this.dateBodyTemplate = this.dateBodyTemplate.bind(this);
        this.anamnesePet = this.anamnesePet.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
    }

    componentDidMount(){
        this.onLoad()
    }

    onLoad = async e => {
        try {
            api.get(`/aplicacoes/pet/${this.props.id}/`).then((response) => {
                this.setState({
                    aplicacoes: response.data
                })
            });

            

        } catch (err){
            console.log("erro: ", err);
        };
    }

    dateBodyTemplate(rowData){
        let date = new Date(rowData)
        return <span>{date.toUTCString().slice(6, 22)}</span>
    }

    anamnesePet = async aplicacao => {
        this.setState({
            anamneseDialog: true
        });
        await api.get(`anamneses/anamneses/detalhe/${aplicacao.anamneses}/`).then((response) => {
            this.setState({
                anamnese: response.data
            })
        })

        let { anamnese } = this.state

        api.get(`/agendamento/detalhe/${anamnese[0].agendamento}/`).then((response) => {
            this.setState({
                agendamento: response.data
            })
        })
            
    }

    hideDialog() {
        this.setState({
            anamneseDialog: false,
        });
    }

    render() {
        let { aplicacoes } = this.state

        return (
            <React.Fragment>
                {aplicacoes.map(
                   aplicacao => <div className='grid'>
                        <div className="col-12 bg-primary text-center">
                            <p className='font-semibold'>Data Aplicação</p><span>{this.dateBodyTemplate(aplicacao.data_aplicacao)}</span>
                        </div>
                        <div className="col-6">
                            <p className='font-semibold'>Tipo</p><span>{aplicacao.tipo}</span>
                        </div>
                        <div className="col-6">
                            <p className='font-semibold'>Nome Medicamento</p><span>{aplicacao.nome_medicamento}</span>
                        </div>
                        <Divider></Divider> 
                        <div className="col-6">
                            <p className='font-semibold'>Data Reaplicação</p><span>{this.dateBodyTemplate(aplicacao.data_reaplicacao)}</span>
                        </div>
                        <div className="col-6">
                            <p className='font-semibold'>Visualizar Anamese</p>
                            <div className='col-6'>
                                <button className='p-button p-button-secondary' onClick={() => this.anamnesePet(aplicacao)}>Ver anamese</button>
                            </div>
                        </div>
                        <Divider></Divider>
                    </div>
                )}
            
            <Dialog visible={this.state.anamneseDialog} style={{ width: '950px' }} header="Anamnese Realizada" modal className="p-fluid" onHide={this.hideDialog}>
                <div class="grid">
                    <div className="col-12 bg-primary text-center">
                        <p className='font-semibold'>Data da Consulta</p>
                    </div>
                    <div class="col-4">
                        <p className='font-semibold'>Veterinário(a)</p>
                        <span>{this.state.agendamento.veterinario.user.first_name} {this.state.agendamento.veterinario.user.last_name}</span>
                    </div>
                    <div class="col-4">
                        <p className='font-semibold'>Atendimento</p>
                        <span>{this.state.agendamento.servico.nome} - {this.state.agendamento.servico.descricao}</span>
                    </div>
                    <div class="col-4">
                        <p className='font-semibold'>Horário</p>
                        <span>{this.state.agendamento.horario_selecionado}</span>
                    </div>
                    <Divider></Divider>
                    <div class="col-12">
                        <p className='font-semibold'>Queixa Principal</p>
                        <span>{this.state.anamnese.queixa_principal}</span>
                    </div>
                    <Divider></Divider>
                    <div class="col-6">
                        <p className='font-semibold'>Frequencia Cardiaca (bpm)</p>
                        <span>{this.state.anamnese.frequencia_cardiaca}</span>
                    </div>
                    <div class="col-6">
                        <p className='font-semibold'>Frequencia Respiratoria (bpm)</p>
                        <span>{this.state.anamnese.frequencia_respiratoria}</span>
                    </div>
                    <Divider></Divider>
                    <div class="col-3">
                        <p className='font-semibold'>Linfonodo</p>
                        <span>{this.state.anamnese.linfonodo}</span>
                    </div>
                    <div class="col-3">
                        <p className='font-semibold'>Cor Mucosa</p>
                        <span>{this.state.anamnese.linfonodo}</span>
                    </div>
                    <div class="col-3">
                        <p className='font-semibold'>TPC</p>
                        <span>{this.state.anamnese.cor_mucosa}</span>
                    </div>
                    <div class="col-3">
                        <p className='font-semibold'>Hidratação</p>
                        <span>{this.state.anamnese.hidratacao}</span>
                    </div>
                </div>
            </Dialog>
                
                
            </React.Fragment>
        )
    }
}

export default AplicacoesPetInfo;