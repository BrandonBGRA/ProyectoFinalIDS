import { LitElement, html } from "lit";

export default class Movimientos extends LitElement {
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
    
        handleClick(movimientoId) {
            this.dispatchEvent(new CustomEvent('movimiento-clickeado', {
                detail: movimientoId,
                bubbles: true,
                composed: true
            }));
        }
        
        updated() {
            const contenedores = this.shadowRoot.querySelectorAll(".contenedor-datos");
        
            contenedores.forEach((contenedor) => {
                contenedor.addEventListener("click", () => {
                    const movimientoId = contenedor.id;
                    console.log("Detalles del movimiento:", movimientoId);
                    this.handleClick(movimientoId);
                });
            });
        }
        

        render(){
        
            if (!this.userData) {
                return html`
                    <style> div {display:none}</style>
                    <div>No se han proporcionado datos de usuario.</div>`;
            } 
             
            const htmlIndice = this.userData.movimientos.map((element) => {
                return html`
                    <div class="contenedor-datos" id="${element.numeroMovimiento}">
                        <div>
                            <p class="descripcion">${element.descripcion}</p>
                            <p>Movimiento: ${element.numeroMovimiento} </p>
                        </div>
                        <div class="right">
                            <p>$${element.monto.toFixed(2)}</p>
                        </div>
                    </div>

                `;
            });

            return html `

            <style>
                .contenedor{
                    margin: 15px 60px;
                    border: 2px solid rgba(255, 255, 255, 0.5);
                    padding: 15px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    border-radius: 5px;
                    background-color:white;
                }
                .contenedor-datos{
                    display:grid;
                    grid-template-columns: 50% 50%;
                    border-bottom: 1px solid rgb(197 195 195 / 50%);
                }
                .contenedor-datos:hover{
                    background-color:rgb(197 195 195 / 20%);
                    cursor:pointer;
                    border-radius: 5px;
                    border: 0;
                }
                .right{
                    text-align: right;
                    display: grid;
                    align-content: center;
                    font-weight: bold;
                    padding-right: 5px;
                }

                p{
                    font-size: 20px;
                }
                .descripcion{
                    font-style: italic;
                    color: #77B82B;
                }
            </style>

                <div class="contenedor">
                    ${htmlIndice}
                </div>
            `;
        }
}