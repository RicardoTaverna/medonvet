import React from 'react';

import { api } from './../../services/api';
import { login } from './../../services/auth'

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';

import LoginBackground from './../../assets/images/login_background.png'
import logo from './../../assets/images/logo2.png'

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            messageError: "",
        }
        this.onLogin = this.onLogin.bind(this);
        this.showError = this.showError.bind(this);
    }

    onLogin = async e => {
        const { username, password } = this.state
        if (!username || !password) {
            this.setState(
                {messageError: "Preencha username e senha para continuar!"},
                () => this.showError()
            );
        } else {
            console.log(`username: ${username}| passsword: ${password}`)
            try {
                const response = await api.post("/usuarios/login/", { username, password });
                console.log(response)
                login(response.data.token);
                this.props.history.push("/app");
                
            } catch (err) {
                this.setState(
                    {messageError: "Houve um problema com o login, verifique suas credenciais. T.T"},
                    () => this.showError()
                );
            }
        }
    }

    showError() {
        this.toast.show({severity:'error', summary: 'Error', detail: this.state.messageError , life: 3000});
    }

    render(){
        return(
            <React.Fragment>
                <div className="layout-main-container">
                    <Toast ref={(el) => this.toast = el} />
                    <div className="layout-main">
                        <div className="grid grid-nogutter text-200" style={{ backgroundColor: '#18283F' }}>
                            
                            <div className="col-12 md:col-6 p-6 mt-6">
                                <section>                                    
                                    <div className="text-center mb-5 mt-6">
                                        <img src={logo} alt="hyper" height={100} className="mb-3" />
                                        <div className="text-300 text-3xl font-medium mb-3">Bem vindo!</div>
                                        <span className="text-200 font-medium line-height-3">Ainda não possui uma conta?</span>
                                        <a href="/cadastro" className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Crie agora!</a>
                                    </div>

                                    <div>
                                        <span className="p-float-label">
                                            <InputText id="username" type="text" className="w-full mb-3" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} />
                                            <label htmlFor="username" className="font-medium mb-2">Username</label>
                                        </span>

                                        <span className="p-float-label">
                                            <InputText id="password" type="password" className="w-full mb-3" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} toggleMask feedback={false} />
                                            <label htmlFor="password" className="font-medium mb-2">Password</label>
                                        </span>

                                        <div className="flex align-items-center justify-content-between mb-6">
                                            <a href="/recuperar-senha" className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Esqueceu sua senha?</a>
                                        </div>

                                        <Button label="Acessar" icon="pi pi-user" className="w-full" onClick={this.onLogin} />
                                    </div>
                                </section>
                            </div>

                            <div className="col-12 md:col-6 overflow-hidden">
                                <img src={LoginBackground} alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Login;