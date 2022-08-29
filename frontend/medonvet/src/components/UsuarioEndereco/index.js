import React, { Component } from 'react';

import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { viaCEP, api } from '../../services/api';


class UsuarioEndereco extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageError: "",
            cep: "",
            estado: "",
            cidade: "",
            bairro: "",
            rua: "",
            numero: "",
            complemento: "",
            id: null,
        }
        this.buscaCEP = this.buscaCEP.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onEnter = this.onEnter.bind(this);
    }

    componentDidMount(){
        this.onEnter();
    }
    onEnter = async e => {
        try {
            api.get('/usuarios/enderecos/').then((response) => {
                console.log(response);
                this.setState({
                    id: response.data.id,
                    cep: response.data.cep,
                    estado: response.data.estado,
                    cidade: response.data.cidade,
                    bairro: response.data.bairro,
                    rua: response.data.rua,
                    numero: response.data.numero,
                    complemento: response.data.complemento,
                });
                console.log(this.state.id);
            });
        } catch (err) {
            console.log(`Erro: ${err}`)
        }
        
    }

    buscaCEP = (event) => {
        const cep = event.target.value
        var validacep = /^[0-9]{8}$/;
        if (cep !== "") {
            if(validacep.test(cep)) {
                try {
                    viaCEP.get(cep + '/json/').then((response) => {
                        console.log(response);
                        this.setState({
                            cep: event.target.value,
                            estado: response.data.uf,
                            cidade: response.data.localidade,
                            bairro: response.data.bairro,
                            rua: response.data.logradouro,
                            
                        });
                        console.log(this.state.rua)
                    });
                }catch (err) {
                        console.log(`Erro: ${err}`)
                }
            } 
        }
        else{
            this.toast.show({ severity: 'error', summary: 'Erro', detail: "Digite o CEP", life: 3000 });
            
        }
        return cep;
    };

    onUpdate = async e => {
        const {id, rua, numero, complemento, cep, cidade, estado, bairro } = this.state
        console.log(rua, numero, complemento, cep, cidade, estado, bairro)
        console.log(id)
        if(id != null){
            try {
                const response = await api.put("/usuarios/enderecos/", {id, rua, numero, complemento, cep, cidade, estado, bairro });
                console.log(response)    
                console.log("passei pelo put")
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Cadastro atualizado', life: 3000 });        
            } catch (err) {
                this.toast.show({ severity: 'error', summary: 'Erro', detail: "Houve um problema com a atalização, verifique seus os dados inseridos. T.T", life: 3000 });
            }
        }else{
            try {
                const response = await api.post("/usuarios/endereco/", { rua, numero, complemento, cep, cidade, estado, bairro });
                console.log(response)    
                console.log("passei pelo post")
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Cadastro atualizado', life: 3000 });        
            } catch (err) {
                this.toast.show({ severity: 'error', summary: 'Erro', detail: "Houve um problema com a atalização, verifique seus os dados inseridos. T.T", life: 3000 });
            }
        }
    }
    render(){
        return(
            <React.Fragment>
                <Toast ref={(el) => this.toast = el} />
                    <div className="text-3xl font-mediumtext-900 mb-3">Endereço</div>
                    <div className="font-medium text-500 mb-3">Atualize suas informações de endereço.</div>
                    <div className="p-fluid grid">
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <InputText id="cep" type="text" className="w-full mb-3" value={this.state.cep} onChange={(e) => this.setState({cep: this.buscaCEP(e)})} />
                                <label htmlFor="cep" className="font-medium mb-2">CEP</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <InputText id="rua" type="text" className="w-full mb-3" value={this.state.rua} onChange={(e) => this.setState({rua: e.target.value})} />
                                <label htmlFor="rua" className="font-medium mb-2">Rua</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <InputText id="numero" type="text" className="w-full mb-3" value={this.state.numero} onChange={(e) => this.setState({numero: e.target.value})} />
                                <label htmlFor="numero" className="font-medium mb-2">Numero</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <InputText id="complemento" type="text" className="w-full mb-3" value={this.state.complemento} onChange={(e) => this.setState({complemento: e.target.value})} />
                                <label htmlFor="complemento" className="font-medium mb-2">Complemento</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <InputText id="bairro" type="text" className="w-full mb-3" value={this.state.bairro} onChange={(e) => this.setState({bairro: e.target.value})} />
                                <label htmlFor="bairro" className="font-medium mb-2">Bairro</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <InputText id="cidade" type="text" className="w-full mb-3" value={this.state.cidade} onChange={(e) => this.setState({cidade: e.target.value})} />
                                <label htmlFor="cidade" className="font-medium mb-2">Cidade</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <InputText id="estado" type="text" className="w-full mb-3" value={this.state.estado} onChange={(e) => this.setState({estado: e.target.value})} />
                                <label htmlFor="estado" className="font-medium mb-2">Estado</label>
                            </span>
                        </div>
                    </div>
                    
                    <Button  label="Atualizar" onClick={this.onUpdate}  />


            </React.Fragment>
        )
    }
}

export default UsuarioEndereco;