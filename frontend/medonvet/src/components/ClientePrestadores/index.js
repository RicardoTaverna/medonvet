import React from 'react';

import { InputText } from 'primereact/inputtext';

import { api } from './../../services/api';
import PrestadorCard from '../PrestadorCard';

export class ClientePrestadores extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            prestadores: [],
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
            api.get("/prestadores/all/").then((response) => {
                console.log(response)
                this.setState({
                    prestadores: response.data,
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

    render(){

        let {prestadores, filter} = this.state;

        if (filter) {
            prestadores = prestadores.filter(({first_name=""}) => first_name.toLowerCase().includes(filter));
        }

        return(
            <React.Fragment>
                <div className="card">
                    <div className='p-6'>
                        <div className="grid formgrid">
                            <div className="field col-12">
                                <span className="p-float-label p-input-icon-left">
                                    <i className="pi pi-search" />
                                    <InputText id="lefticon" value={this.state.filter} onChange={this.filterChange} />
                                    <label htmlFor="lefticon">Procurar Veterinário ou Clínica</label>
                                </span>
                            </div>
                    
                            <div className="col-12 justify-content-center mt-6">
                                <div className="p-fluid">
                                    
                                        { prestadores.map(
                                            prestador => <PrestadorCard
                                                key={prestador.id}
                                                id={prestador.id}
                                                crmv={prestador.crmv}
                                                descricao={prestador.descricao}
                                                cpf_cnpj={prestador.cpf_cnpj}
                                                user={prestador.user}
                                                grupo={prestador.grupo}
                                                first_name={prestador.first_name}
                                                last_name={prestador.last_name}
                                            ></PrestadorCard>
                                        )}
                                        
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ClientePrestadores;