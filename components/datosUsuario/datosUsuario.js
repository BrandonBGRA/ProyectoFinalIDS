import { LitElement, html } from "lit";

export default class DatosUsuario extends LitElement{
    constructor(){
        super(); // Call the superclass constructor
        this.userData = null;
        this.fecha = new Date();
        this.horaActual = this.fecha.getHours();
    }

    static get properties() {
        return {
            userData: { type: Object }
        };
    }

    setUserData(userData) {
    this.userData = userData;
    }



    render() {  

        const horaActual = (horaActual) => {
            if(horaActual < 12){
                return "Buenos dias";
            } else if(  horaActual < 19){
                return "Buenas tardes";
            } else {
                return "Buenas noches";
            }
        }
        const saludo = horaActual(this.horaActual);

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
                    background-color:white;
                }
                p {
                    font-size: 20px;
                }
                h1 {
                    text-align:center;
                }
                .cuenta {
                    color: #77B82B;
                    font-weight: 600;
                    font-size: 20px;
                }
                .contenedor-tarjeta{
                    display:grid;
                    grid-template-columns: 50% 50%;
                }

                .border{
                    border-bottom: 1px solid rgb(197 195 195 / 50%);
                }

                .direction-right{
                    text-align: right
                }

                .cuenta-tipo{
                    font-style: italic;
                    color: #9a9a9a;
                    font-weight:300;
                }
                .credit-sald{
                    color: #9a9a9a;
                }

                .img-dc{
                    width: 30px;
                    height: 30px;
                }
                .img-tarjeta{
                    width: 40px;
                    height: 40px;
                }
                .tarjeta-contenedor{
                    background: radial-gradient(ellipse at center, rgb(167,207,223) 0%,rgb(35,83,138) 100%);
                    padding: 15px;
                    border-radius: 8px;
                    max-width: 450px;
                    margin: auto;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .chip{
                    display: flex;
                    gap: 10px;
                }
                .right{
                    text-align: right;
                    border: 0;
                    margin: 0;
                }
                .right img{
                    width: 60px;
                    height: 60px;
                }
                h3{
                    font-size: 35px;
                    font-weight: 500;
                    margin: 15px 0;
                    color: white;
                }
                #numero-cuenta{
                    font-size: 27px;
                    color: white;
                    margin: auto 0;
                    margin-bottom: 28px;
                    letter-spacing: 3px;
                }


            </style>
            <div class="contenedor-datos">
                <h1>${saludo} ${this.userData.nombre}</h1>
                <p>${this.userData.nombre} ${this.userData.apellidos}</p>
                <p class="cuenta"> ${this.userData.numeroCliente}</p>
            </div>

            <div class="contenedor-datos">
                <p>TARJETAS</p>
                <div class="contenedor-tarjeta border">
                    <div>
                        <p class="cuenta">${this.userData.numeroCuentaDebito}</p>
                        <p><img src="../../img/debito.png" class="img-dc"></p>
                        <p class="cuenta-tipo">Debito</p>
                    </div>
                    <div class="direction-right">
                        <p>$${this.userData.cuentaNomina.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                        <p class="credit-sald">Saldo disponible</p>
                    </div>
                </div>
                <div class="contenedor-tarjeta">
                    <div>
                        <p class="cuenta">${this.userData.numeroCuentaCredito} </p>
                        <p><img src="../../img/credito.png" class="img-dc"></p>
                        <p class="cuenta-tipo">Credito</p>
                    </div>
                    <div class="direction-right">
                        <p>$${this.userData.cuentaCredito.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                        <p class="credit-sald">Credito disponible</p>
                        <p>$${this.userData.saldoUtilizado.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                        <p class="credit-sald">Saldo Utilizado</p>
                    </div>
                </div>
            </div>
            <div>
            <div class="contenedor-datos">
                <div class="tarjeta-contenedor">
                    <h3>BBVA</h3>
                    <div class="chip">
                        <p><img src="../../img/chip.png" class="img-tarjeta"></p>
                        <p><img src="../../img/nfc.png" class="img-tarjeta"></p>
                        <p id="numero-cuenta">${this.userData.numeroTarjeta}</p>
                    </div>
                    <p class="right"><img src="../../img/visa.png"></p>
                </div>
            </div>
        `;
    }
}