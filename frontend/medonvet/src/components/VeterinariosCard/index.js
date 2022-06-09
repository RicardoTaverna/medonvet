import React, { Component } from 'react';

import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';

const VeterinariosCard = (props) => {

    const id = props.id;
    const first_name = props.first_name;
    const last_name = props.last_name;


    return(
        <div class="card">
            <div class="flex card-container blue-container overflow-hidden">
                <div class="flex-none flex align-items-center justify-content-center border-round">
                    <Avatar label="V" className="mr-2" size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />
                </div>
                <div class="flex-grow-1 flex align-items-right justify-content-right m-2 px-5 py-3 border-round">
                    <div>
                        <div className="font-medium text-xl text-900">{first_name} {last_name}</div>
                            <div className="flex align-items-center text-700 flex-wrap">
                                <div className="mr-5">
                                    <small>Clinico Geral</small>
                                </div>
                            </div>
                        </div>
                    </div>
                <div class="flex-none flex align-items-center justify-content-center m-2 px-5 py-3 border-round">
                    <Button icon="pi pi-facebook" className="p-button-rounded p-button-text p-button-plain"/>
                    <Button icon="pi pi-linkedin" className="p-button-rounded p-button-text p-button-plain"/>
                </div>
            </div>
        </div>
    )

}

export default VeterinariosCard;