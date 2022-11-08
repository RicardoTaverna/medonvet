import React, { Component } from 'react';

import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Avatar } from 'primereact/avatar';
import { Rating } from 'primereact/rating';
import { Sidebar } from 'primereact/sidebar';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Chart } from 'primereact/chart';

import { api } from '../../services/api';
import VeterinarioAgendaCard from '../VeterinarioAgendaCard';

class VeterinarioHome extends Component {

    constructor(props){
        super(props);
        this.state = {
            veterinarios: [],
            visibleLeft: false,
            agendamentos: [],
            servicos: [],
            cirurgia: 0,
            aplicacao: 0,
            consulta: 0,
            medicamento: 0,
            vacina: 0,
        }
        this.onLoad = this.onLoad.bind(this)
        this.onServicoCount = this.onServicoCount.bind(this)
        this.lightOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            }
        };
    }

    componentDidMount(){
        this.onLoad();    
    }

    onServicoCount(){
        for(let x = 0; x < this.state.servicos.length; x++){
            if(this.state.servicos[x].servico.nome === "Consulta"){ 
                this.setState({consulta: this.state.consulta + 1 })  
            }else if(this.state.servicos[x].servico.nome === "Aplicação"){
                this.setState({aplicacao: this.state.aplicacao + 1 })
            } 
            else if (this.state.servicos[x].servico.nome === "Cirurgia"){
                this.setState({cirurgia: this.state.cirurgia + 1 })
            }
            else if (this.state.servicos[x].servico.nome === "Medicamento"){
                this.setState({medicamento: this.state.medicamento + 1 })
            }
            else if (this.state.servicos[x].servico.nome === "Vacina"){
                this.setState({vacina: this.state.vacina + 1 })
            }
        }
    }

    onLoad = async e => {
        try {
            await api.get('/agendamento/veterinario/').then((response) => {
                console.log('agendamentos',response);
                this.setState({ agendamentos: response.data })
            })
            await api.get('/agendamento/vet/').then((response) => {
                console.log('servicos',response);
                this.setState({ servicos: response.data })
                this.onServicoCount()
            })
        } catch (err) {
            console.log(`Erro: ${err}`)
        }
    }

    render(){
        const dadosGraficos = (
            this.chartData = {
                labels: ['Cirurgia', 'Aplicação', 'Consulta', 'Medicamento','Vacina'],
                datasets: [
                    {
                        data: [this.state.cirurgia, this.state.aplicacao, this.state.consulta,this.state.medicamento, this.state.vacina],
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#32A852",
                            "#A5B2C2"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#32A852",
                            "#A5B2C2"
                        ]
                    }]
                }

        );
        let { agendamentos } = this.state 
        return (
            <React.Fragment>

                <div className="grid px-6 py-3">
                    <div className="col-12 md:col-6 lg:col-3">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Total de Consultas</span>
                                    <div className="text-900 font-medium text-xl">{this.state.agendamentos.length}</div>
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
                                    <span className="text-900 mb-3">Proximos Atendimentos</span>
                                </div>
                            </div>
                            <ScrollPanel style={{width: '100%', height: '400px'}}>

                                { agendamentos.map(
                                    agendamento => <VeterinarioAgendaCard
                                        key={agendamento.id}
                                        agendamento={agendamento.id}
                                        cliente={agendamento.cliente}
                                        pet={agendamento.pet}
                                        servico={agendamento.servico}
                                        data={agendamento.data}
                                        horario_selecionado={agendamento.horario_selecionado}
                                    ></VeterinarioAgendaCard>
                                )}


                                
                                {/* { veterinarios.map(
                                    veterinario =><VeterinariosCard
                                        key={veterinario.id}
                                        id={veterinario.id}
                                        first_name={veterinario.user.first_name}
                                        last_name={veterinario.user.last_name}>
                                    </VeterinariosCard>
                                )} */}
                            </ScrollPanel>

                        </div>
                    </div>

                    <div className="col-12 md:col-12 lg:col-6">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="text-900 mb-3">Total de Atendimentos por Categoria</span>
                                </div>
                            </div>
                            
                            <div className="card flex justify-content-center">
                                <Chart type="doughnut" data={dadosGraficos} options={this.lightOptions} style={{ position: 'relative', width: '40%' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default VeterinarioHome;