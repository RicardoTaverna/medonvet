import React from 'react';

import { api } from './../../services/api';
import { login } from './../../services/auth'

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';

import LoginBackground from './../../assets/images/recuperar-senha.png'
import logo from './../../assets/images/logo2.png'

class RecuperarSenha extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            password_check: "",
            token: "",
            is_token_valid: true,
            messageError: "",
            submitted: false
        }
        this.onSendMail = this.onSendMail.bind(this);
        this.showError = this.showError.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onValidateToken = this.onValidateToken.bind(this);
    }

    componentDidMount(){
        if(this.props.match.params.token){
            this.setState({ token: this.props.match.params.token })
            this.onValidateToken()
        }
    }

    onValidateToken = async e => {
        try {
            await api.get(`/usuarios/reset-password/${this.props.match.params.token}/`);
            
        } catch (err) {
            console.log(err)
            this.setState({ is_token_valid: false })
        }
    }

    onSendMail = async e => {
        const { email } = this.state

        try {
            const response = await api.post("/emailer/forgetpassword/", { email });
            console.log(response)
            this.setState({ submitted: true })
            
        } catch (err) {
            this.setState(
                {messageError: "Houve um problema com o e-mail digitado, verifique se digitou corretamente. T.T"},
                () => this.showError()
            );
        }
    }

    onChangePassword = async e => {
        const { password, password_check, token } = this.state
        if ( !password || !password_check) {
            this.setState(
                {messageError: "Preencha todos os campos para conlcuir a troca da senha!"},
                () => this.showError()
            );
        } else if ( password !== password_check ){
            this.setState(
                {messageError: "As senhas não coincidem!"},
                () => this.showError()
            );
        } else {
            try {
                const response = await api.put(`/usuarios/reset-password/${token}/`, { password });
                console.log(response)
                this.props.history.push('/login')
                
            } catch (err) {
                this.setState(
                    {messageError: "Houve um problema ao trocar sua senha. W.W"},
                    () => this.showError()
                );
            }
        }
    }

    showError() {
        this.toast.show({severity:'error', summary: 'Error', detail: this.state.messageError , life: 3000});
    }

    render(){


        let render_forgot_password

        if(this.state.submitted){
            render_forgot_password = (
                <div className="text-center mb-5 mt-6">
                    <img src={logo} alt="hyper" height={100} className="mb-3" />
                    <div className="text-300 text-3xl font-medium mb-3">Verifique sua caixa de entrada, e acesse o link que enviamos.</div>
                    <span className="text-200 font-medium line-height-3">Verifique também a caixa de spam!</span>
                </div>
            )
        } else if(!this.state.is_token_valid){
            render_forgot_password = (
                <div className="text-center mb-5 mt-6">
                    <img src={logo} alt="hyper" height={100} className="mb-3" />
                    <div className="text-300 text-3xl font-medium mb-3">Token Expirado.</div>
                    <span className="text-200 font-medium line-height-3">acesse <a href='/recuperar-senha'>aqui</a> e solicite um novo token!</span>
                </div>
            )
        }else if(this.state.token){
            render_forgot_password = (
                <div>
                    <div className="text-center mb-5 mt-6">
                        <img src={logo} alt="hyper" height={100} className="mb-3" />
                        <div className="text-300 text-3xl font-medium mb-3">Digite sua nova senha</div>
                        <span className="text-200 font-medium line-height-3">Ela deve ter no mínimo 8 caractes e não pode conter o seu username!</span>
                    </div>

                    <span className="p-float-label">
                        <InputText id="password" type="password" className="w-full mb-3" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} toggleMask feedback={false} />
                        <label htmlFor="password" className="font-medium mb-2">Senha</label>
                    </span>

                    <span className="p-float-label">
                        <InputText id="password_check" type="password" className="w-full mb-3" value={this.state.password_check} onChange={(e) => this.setState({password_check: e.target.value})} toggleMask feedback={false} />
                        <label htmlFor="password_check" className="font-medium mb-2">Confirmar Senha</label>
                    </span>

                    <Button label="Solicitar Link" icon="pi pi-send" className="w-full" onClick={this.onChangePassword} />
                </div>
            )
        } else {
            render_forgot_password = (
                <div>
                    <div className="text-center mb-5 mt-6">
                        <img src={logo} alt="hyper" height={100} className="mb-3" />
                        <div className="text-300 text-3xl font-medium mb-3">Recuperar Senha</div>
                        <span className="text-200 font-medium line-height-3">Se você já possui um conta, digite o seu e-mail cadastrado e enviaremos um link para você redefinir sua senha.</span>
                    </div>

                    <span className="p-float-label">
                        <InputText id="email" type="email" className="w-full mb-3" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
                        <label htmlFor="email" className="font-medium mb-2">E-mail</label>
                    </span>

                    <div className="flex align-items-center justify-content-between mb-6">
                        <a href="/login" className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Voltar para página de login</a>
                    </div>

                    <Button label="Solicitar Link" icon="pi pi-send" className="w-full" onClick={this.onSendMail} />
                </div>
            )
        }

        return(
            <React.Fragment>
                <div className="layout-main-container">
                    <Toast ref={(el) => this.toast = el} />
                    <div className="layout-main">
                        <div className="grid grid-nogutter text-200" style={{ backgroundColor: '#18283F' }}>
                            
                            <div className="col-12 md:col-6 p-6 mt-6">
                                <section>                                    
                                    

                                    { render_forgot_password }
                                    
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

export default RecuperarSenha;