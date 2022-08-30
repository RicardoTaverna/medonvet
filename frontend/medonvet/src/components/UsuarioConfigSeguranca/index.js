import React, { Component } from 'react';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

import { api } from './../../services/api';

class UsuarioConfigSeguranca extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password2: "",
            oldpassword: "",
            groupname: "",
            messageError: "",
            displayBasic: false,
            displayChangePassword: false,
            position: 'center'
        }
        this.onEnter = this.onEnter.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
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
                    email: response.data.email
                });
            });
        } catch (err) {
            console.log(`Erro: ${err}`)
        }
        
    }

    onUpdate = async e => {
        const { username, first_name, last_name, email, password } = this.state
        console.log(password)
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

    onCloseModal(name) {
        this.setState({
            [`${name}`]: false
        });
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
                <Button label="No" icon="pi pi-times" onClick={() => this.onCloseModal(name)} className="p-button-text" />
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

                <Divider></Divider>

                <Button label="Alterar Senha" className="p-button-text p-button-plain" onClick={() => this.onClick('displayChangePassword')} />

                <Dialog header="Confirmação" visible={this.state.displayBasic} style={{ width: '30vw' }} footer={this.renderFooter('displayBasic')} onHide={() => this.onCloseModal('displayBasic')}>
                    <p>Digite sua senha para confirmar essa ação.</p>
 
                    <span className="p-float-label">
                        <InputText id="password" type="password" className="w-full mb-3" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} toggleMask feedback={false} />
                        <label htmlFor="password" className="font-medium mb-2">Senha</label>
                    </span>
                            
                </Dialog>

                <Dialog header="Alteração de senha" visible={this.state.displayChangePassword} style={{ width: '30vw' }} footer={this.renderFooter('displayChangePassword')} onHide={() => this.onCloseModal('displayChangePassword')}>
                    <p>Digite sua senha antiga e a nova senha e confirmação da nova senha para realizar a alteração.</p>
 
                    <span className="p-float-label">
                        <InputText id="newpassword" type="password" className="w-full mb-3" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} toggleMask feedback={false} />
                        <label htmlFor="newpassword" className="font-medium mb-2">Nova Senha</label>
                    </span>
                    <span className="p-float-label">
                        <InputText id="password2" type="password" className="w-full mb-3" value={this.state.password2} onChange={(e) => this.setState({password2: e.target.value})} toggleMask feedback={false} />
                        <label htmlFor="password2" className="font-medium mb-2">Confirmação Nova Senha</label>
                    </span>
                    <span className="p-float-label">
                        <InputText id="oldpassword" type="password" className="w-full mb-3" value={this.state.oldpassword} onChange={(e) => this.setState({oldpassword: e.target.value})} toggleMask feedback={false} />
                        <label htmlFor="oldpassword" className="font-medium mb-2">Senha Antiga</label>
                    </span>
                            
                </Dialog>
                    
            </React.Fragment>
        )
    }
}

export default UsuarioConfigSeguranca;