import React from 'react';
import './ClientServicos.css';
import { InputText } from 'primereact/inputtext';
import { api } from './../../services/api';
import ServicoCard from '../ServicoCard';

export class ClienteServicos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            servicos: [],
            loading: true,
            search: "",
            filter: "",
        };
        this.onLoad = this.onLoad.bind(this);
        this.filterChange = this.filterChange.bind(this);
    }

    componentDidMount() {
        this.onLoad();
    }


    onLoad = async e => {
        try {
            api.get("/servicos/").then((response) => {
                console.log(response)
                this.setState({
                    servicos: response.data,
                    loading: false,
                    search: "",
                })
            });

        } catch (err){
            console.log("erro: ", err);
        };
    }

    filterChange(e) {
        this.setState(
            {
                filter: e.target.value
            }
        )
    }

    render() {

        let {servicos, filter} = this.state;

        if (filter) {
            servicos = servicos.filter(({nome=""}) => nome.toLowerCase().includes(filter));
        }

        return (
            <React.Fragment>
                <div className='p-6'>
                    <div className="grid formgrid">
                        <div className="field col-12">
                            <span className="p-float-label p-input-icon-left">
                                <i className="pi pi-search" />
                                <InputText id="lefticon" value={this.state.filter} onChange={this.filterChange} />
                                <label htmlFor="lefticon">Procurar Serviço</label>
                            </span>
                        </div>
                        
                        { servicos.map(
                            servico => <ServicoCard
                                key={servico.id}
                                servicoId={servico.id}
                                nome={servico.nome}
                                descricao={servico.descricao}
                                valor={servico.valor}
                                prestador={servico.prestador}
                                veterinario={servico.veterinario}
                            ></ServicoCard>
                        )}
                        
                        
                    </div>
                </div>
            </React.Fragment>
        )
    }

};

export default ClienteServicos;