import React, { Component } from 'react';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

import { api } from './../../services/api';

class PrestadorConfigSeguranca extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            passwordconfirm: "",
            groupname: "prestador",
            messageError: "",
            displayBasic: false,
            position: 'center'
        }
        this.onEnter = this.onEnter.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    componentDidMount(){
        this.onEnter();
    }


    onEnter = async e => {
        try {
            api.get('/usuarios/detalhe/').then((response) => {
                console.log(response);
                this.setState({
                    username: response.data.username,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
                });
            });
        } catch (err) {
            console.log(`Erro: ${err}`)
        }
        
    }

    onUpdate = async e => {
        const { username, first_name, last_name, email, password } = this.state
        try {
            const response = await api.put("/usuarios/detalhe/", { username, first_name, last_name, email, password });
            console.log(response)    
            this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Cadastro atualizado', life: 3000 });        
        } catch (err) {

            this.toast.show({ severity: 'error', summary: 'Erro', detail: "Houve um problema com a atalização, verifique seus os dados inseridos. T.T", life: 3000 });
            
        }
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
        this.onUpdate();
    }

    renderFooter(name) {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => this.onHide(name)} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => this.onHide(name)} autoFocus />
            </div>
        );
    }

    render(){


        return(
            <React.Fragment>
                <Toast ref={(el) => this.toast = el} />
                
                <div className="text-3xl font-mediumtext-900 mb-3">Segurança</div>
                <div className="font-medium text-500 mb-3">Atualize suas informações privadas de usuário.</div>

                <div className="p-fluid grid">
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <InputText id="username" type="text" className="w-full mb-3" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} />
                            <label htmlFor="username" className="font-medium mb-2">Username</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">                                 
                        <span className="p-float-label">
                            <InputText id="email" type="email" className="w-full mb-3" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
                            <label htmlFor="email" className="font-medium mb-2">E-mail</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                                <InputText id="first_name" type="text" className="w-full mb-3" value={this.state.first_name} onChange={(e) => this.setState({first_name: e.target.value})} />
                                <label htmlFor="first_name" className="font-medium mb-2">Nome</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <InputText id="last_name" type="text" className="w-full mb-3" value={this.state.last_name} onChange={(e) => this.setState({last_name: e.target.value})} />
                            <label htmlFor="last_name" className="font-medium mb-2">Sobrenome</label>
                        </span>
                    </div>
                    
                </div>

                <Button label="Atualizar" onClick={() => this.onClick('displayBasic')}  />    

                <Dialog header="Confirmação" visible={this.state.displayBasic} style={{ width: '30vw' }} footer={this.renderFooter('displayBasic')} onHide={() => this.onHide('displayBasic')}>
                    <p>Digite sua senha para confirmar essa ação.</p>
 
                    <span className="p-float-label">
                        <InputText id="password" type="password" className="w-full mb-3" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} toggleMask feedback={false} />
                        <label htmlFor="password" className="font-medium mb-2">Senha</label>
                    </span>
                            
                </Dialog>
                    
            </React.Fragment>
        )
    }
}

export default PrestadorConfigSeguranca;