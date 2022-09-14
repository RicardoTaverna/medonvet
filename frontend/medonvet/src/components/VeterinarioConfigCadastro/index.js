import React, { Component } from 'react';
import {v4 as uuidv4} from 'uuid';

import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';
import { FileUpload } from 'primereact/fileupload';
import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { mask, unMask} from "remask";

import { api, imgApi } from '../../services/api';

class VeterinarioConfigCadastro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            crmv: "",
            avatar: "",
            descricao: "",
            capaa: "",
            cpf_cnpj: "",
            cpf_cnpjMascarado: "",
            inicioAtendimento: "",
            fimAtendimento: "",
            groupname: "veterinario",
            messageError: "",
        }
        this.onMask = this.onMask.bind(this);
        this.onGetMask = this.onGetMask.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount(){
        this.onEnter();
    }

    onEnter = async e => {
        try {
            api.get('/prestadores/veterinario/').then((response) => {
                console.log(response);
                this.setState({
                    cpf_cnpj: response.data.cpf_cnpj,
                    crmv: response.data.crmv,
                    descricao: response.data.descricao,
                    avatar: response.data.avatar,
                    capa: response.data.capa,
                    fimAtendimento: response.data.fimAtendimento,
                    inicioAtendimento: response.data.inicioAtendimento
                });
            this.onGetMask(this.state.cpf_cnpj)
            });
        } catch (err) {
            console.log(`Erro: ${err}`)
        }
        
    }

    onUpdate = async e => {
        const { cpf_cnpj, crmv, descricao } = this.state
        const cpfOrCnpj = require('js-cpf-cnpj-validation'); 
        if(cpfOrCnpj.isCPForCNPJ(cpf_cnpj)){
            try {
                const response = await api.put("/prestadores/veterinario/", { cpf_cnpj, crmv, descricao });
                console.log(response)    
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Cadastro atualizado', life: 3000 });        
            } catch (err) {

                this.toast.show({ severity: 'error', summary: 'Erro', detail: "Houve um problema com a atalização, verifique seus os dados inseridos. T.T", life: 3000 });
            }
        }else{
            this.toast.show({ severity: 'error', summary: 'Erro', detail: "Houve um problema com seu cadastro. CPF ou CNPJ não existente. x.x", life: 3000 });
                
        }
    }

    onMask = (event) => {
        const valorOriginal = unMask(event.target.value)
        const valorMascarado = mask(valorOriginal,[
            '999.999.999-99', 
            '99.999.999/9999-99'
        ]);
        this.setState({cpf_cnpj: unMask(valorMascarado)})
        return valorMascarado;
    };

    onGetMask = async e => {
        const valorOriginal = unMask(e)
        console.log(valorOriginal)
        const valorMascarado = mask(valorOriginal,[
            '999.999.999-99', 
            '99.999.999/9999-99'
        ]);
        this.setState({cpf_cnpjMascarado: valorMascarado})
        return valorMascarado;
    };

    async onUploadImage(event){
        const file = event.files[0];
        let blob = await fetch(file.objectURL).then(r => r.blob()); //blob:url
        let in_file = blob
        let userid = 1
        let uid = uuidv4()

        const formData = new FormData()
        formData.append('userid', userid)
        formData.append('in_file', in_file)
        formData.append('uid', uid)

        try{
            await imgApi.post('/image/', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then((response) => {
                console.log(response)
                let avatar = `http://127.0.0.1:8001${response.data.data[0].image_url}`
                api.put(`/prestadores/veterinario/`, { avatar })
            })
        } catch (err) {
            console.log(`Erro: ${err}`)
        }
    }


    render(){
        return(
            <React.Fragment>
                <Toast ref={(el) => this.toast = el} />

                    
                    <div className="text-3xl font-mediumtext-900 mb-3">Cadastro</div>
                    <div className="p-fluid grid">
                        <div className="field col-12 md:col-6">
                            <div className="font-medium text-500 mb-3">Alterar foto de perfil.</div>
                            
                            <Avatar image={this.state.avatar} className="mr-2" size="xlarge" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />
                            
                            <FileUpload chooseLabel="Imagem" mode="basic" name="demo[]" accept="image/*" maxFileSize={1000000} customUpload uploadHandler={this.onUploadImage} />
                        </div>
                        <Divider></Divider>

                        <div className="field col-12 md:col-6">
                            <div className="font-medium text-500 mb-3">Alterar foto da capa.</div>
                                <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt="Image" width="200" height="100" />
                        </div>
                        <Divider></Divider>
                        <div className="field col-12 md:col-12">
                            <div className="font-medium text-500 mb-3">Atualize suas informações cadastrais.</div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <InputText id="cpf_cnpj" type="text" className="w-full mb-3" value={this.state.cpf_cnpjMascarado} onChange={(e) => this.setState({cpf_cnpjMascarado: this.onMask(e)})}/>
                                <label htmlFor="cpf_cnpj" className="font-medium mb-2">CPF/CNPJ</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <InputText id="crmv" type="text" className="w-full mb-3" value={this.state.crmv} onChange={(e) => this.setState({crmv: e.target.value})} />
                                <label htmlFor="crmv" className="font-medium mb-2">CRMV</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-12">
                            <span className="p-float-label">
                                <InputTextarea  id="descricao" className="w-full mb-3" rows={5} value={this.state.descricao} onChange={(e) => this.setState({descricao: e.target.value})} />
                                <label htmlFor="descricao" className="font-medium mb-2">Biografia</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <Calendar id="inicioAtendimento" value={this.state.inicioAtendimento} onChange={(e) => this.setState({ inicioAtendimento: e.value })} timeOnly hourFormat="12"  />
                                <label htmlFor="inicioAtendimento" className="font-medium mb-2">inicioAtendimento</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <Calendar id="fimAtendimento" value={this.state.fimAtendimento} onChange={(e) => this.setState({ fimAtendimento: e.value })} timeOnly hourFormat="12"  />
                                <label htmlFor="fimAtendimento" className="font-medium mb-2">fimAtendimento</label>
                            </span>
                        </div>
                    </div>
                    <Button label="Atualizar" onClick={this.onUpdate}  />
    
                        

            </React.Fragment>
        )
    }
}

export default VeterinarioConfigCadastro;