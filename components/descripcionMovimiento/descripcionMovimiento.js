import { LitElement, html } from "lit";

export default class DescripcionMoviento extends LitElement {
    constructor(){
        super();
        this.userData = null;
    }

    static get properties() {
        return {
            userData: { type: Object }
        };
    }

    setUserData(userData) {
        this.userData = userData;
        }
    
    // handleRegresar() {
    //     this.dispatchEvent(new CustomEvent('regresar-click'));
    // }

    render(){
        
        if (!this.userData) {
            return html`
                <style> div {display:none}</style>
                <div>No se han proporcionado datos de usuario.</div>`;
            } 

            return html `

            <style>
                .contenedor-datos{
                    margin: 15px 60px;
                    border: 2px solid rgba(255, 255, 255, 0.5);
                    padding: 15px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    border-radius: 5px;
                    background-color: white;
                }
                h1 {
                    font-size: 25px;
                    font-weight: bold;
                    text-align: center;

                }
                .monto{
                    text-align: center;
                    font-weight: bold;
                    font-size: 20px;
                    color: #77B82B;
                }

                button{
                    background: #146B83;
                    border: none;
                    border-radius: 40px;
                    cursor: pointer;
                    height: 40px;
                    outline:none;
                    font-size: 1rem;
                    font-weight: 600;
                    display: block;
                    width: 30%;
                    min-width: 30%;
                    margin: 0 auto;
                    padding: 10px;
                    font-size: 18px;
                    color: white;
                }
                button:hover{
                    background-color: rgba(20, 107, 131, 0.7);
                    color: black;
                }
            </style>

                <div class="contenedor-datos" id="${this.userData.numeroMovimiento}">
                    <h1>Movimiento: ${this.userData.numeroMovimiento} </h1>
                    <p class="descripcion">Descripcion: ${this.userData.descripcion}</p>
                    <p class="monto">$${this.userData.monto.toFixed(2)}</p>
                    <button class="regresar">Regresar</button>
                </div>
            `;
        }

}