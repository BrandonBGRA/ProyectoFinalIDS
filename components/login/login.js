import { LitElement, html } from "lit";
import DatosUsuario from "../datosUsuario/datosUsuario.js";
import Movimientos from "../movimientos/movimientos.js";
import Modal from "../modal/modal.js";
import DescripcionMoviento from "../descripcionMovimiento/descripcionMovimiento.js";

customElements.define('movimientos-container', Movimientos);
customElements.define('datos-container', DatosUsuario);
customElements.define('modal-container', Modal);
customElements.define('descripcion-movimiento-container',DescripcionMoviento);

export default class Login extends LitElement{
    constructor(){
        super(); 
        this.lisUsuarios= {
            usuarios: {
                brandon: {nombre: "Brandon", apellidos:"Rosales Almaraz", numeroCliente: "1440401", saldoUtilizado: 4500,
                cuentaNomina: 25000,cuentaCredito: 30000,contraseña: "BrGa2319", numeroTarjeta: "4152 3139 5777 1129",
                numeroCuentaDebito: "0001bg3456",numeroCuentaCredito: "Tc5678",
                movimientos: [
                    { numeroMovimiento: 1, descripcion: "Boletos Cinepolis", monto: 400 },
                    { numeroMovimiento: 2, descripcion: "Pantalon para tiendas", monto: 800 },
                    { numeroMovimiento: 3, descripcion: "Uber* Eats", monto: 311 },
                    { numeroMovimiento: 4, descripcion: "Uber* Trip", monto: 172 },
                ]},
                pedro:  {nombre: "Pedro", apellidos:"Ramirez Baeza", numeroCliente: "1690654", saldoUtilizado: 6500,
                cuentaNomina: 5000,cuentaCredito: 10000,contraseña: "pdRtg23", numeroTarjeta: "3239 5789 3245 8912",
                numeroCuentaDebito: "2031fr1289",numeroCuentaCredito: "Tc1045",
                movimientos: [
                    { numeroMovimiento: 1, descripcion: "Compra Oxxo", monto: 170 },
                    { numeroMovimiento: 2, descripcion: "Mi Att App", monto: 100 },
                    { numeroMovimiento: 3, descripcion: "Merpago*Melimas", monto: 129.39 },
                    { numeroMovimiento: 4, descripcion: "Uber* Trip", monto: 269 },
                ]}
            }}
        this.requestUpdate();
    }

    static get properties() {
        return {
            type: Array,
            lisUsuarios: { attribute: 'list-to-usuarios' }
        };
    }
   
    async connectedCallback() {
        super.connectedCallback();
        await this.updateComplete;
        this.addEventListener('movimiento-clickeado', this.handleMovimientoClickeado);
        this.iniciarSesion();

    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('movimiento-clickeado', this.handleMovimientoClickeado);
    }
    
    async iniciarSesion() {
        await this.updateComplete;
        const login = this.shadowRoot.querySelector(".login");
        const password = this.shadowRoot.getElementById("password");
        const usuario = this.shadowRoot.getElementById("usuario");
        const modalContainer = this.shadowRoot.querySelector('modal-container');
        const modalElement = modalContainer.shadowRoot.querySelector('#modal-contenedor');
        const close = modalContainer.shadowRoot.querySelector('#close');
    
        login.addEventListener('click', async () => {
            const usuarioList = this.lisUsuarios.usuarios[usuario.value];
            const contenedorPrincipal = this.shadowRoot.querySelector(".contenedor-principal");
            const modalContainer = this.shadowRoot.querySelector('modal-container');
            const modalElement = modalContainer.shadowRoot.querySelector('#modal-contenedor');
            const contenidoModal = modalContainer.shadowRoot.querySelector('.text-content');
    
            if (usuarioList) {
                const passwordList = usuarioList.contraseña;
                if (password.value === passwordList) {
                    contenedorPrincipal.style.display = "none";
                    // Enviamos los datos
                    const datosUsuarioComponent = this.shadowRoot.querySelector('datos-container');
                    datosUsuarioComponent.setUserData(usuarioList);
                    const movimientosContainer = this.shadowRoot.querySelector('movimientos-container');
                    movimientosContainer.setUserData(usuarioList);
                } else {
                    modalElement.classList.add('visibility');
                    contenidoModal.textContent = "Contraseña incorrecta, favor de verificar";
                }
            } else {
                modalElement.classList.add('visibility');
                contenidoModal.textContent = "Usuario incorrecto, favor de verificar";
            }
        });
    
        close.addEventListener('click', () => {
            modalElement.classList.remove('visibility');
        });
    }

    async handleMovimientoClickeado(event) {
        await this.updateComplete; // Espera a que se complete la actualización del componente
    
        const movimientoId = event.detail;
        const movimientoInt = Number(movimientoId);
        const usuarioInput = this.shadowRoot.getElementById("usuario");
        const usuario = usuarioInput.value;
        const usuarioList = this.lisUsuarios.usuarios[usuario];
        const descripcionMovimiento = this.shadowRoot.querySelector('descripcion-movimiento-container');
    
        if (usuarioList) {
            const datos = usuarioList.movimientos;
            const datosNuevos = datos.find(movimiento => movimiento.numeroMovimiento === movimientoInt);
            const datosMovimientos = this.shadowRoot.querySelector('descripcion-movimiento-container');
            datosMovimientos.setUserData(datosNuevos);
    
            const contenedorDatos = this.shadowRoot.querySelector("datos-container");
            contenedorDatos.style.display = "none";
            const contenedorMovimientos = this.shadowRoot.querySelector("movimientos-container");
            contenedorMovimientos.style.display = "none";
            descripcionMovimiento.style.display = "block";
        }

              descripcionMovimiento.addEventListener('click', () => {
            const contenedorDatos = this.shadowRoot.querySelector('datos-container');
            const contenedorMovimientos = this.shadowRoot.querySelector('movimientos-container');

            if (contenedorDatos && contenedorMovimientos) {
                contenedorDatos.style.display = "block";
                contenedorMovimientos.style.display = "block";
                descripcionMovimiento.style.display = "none";
            }
        });
    }

    render() {
        return html `
            <style>
                .contenedor-principal{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    min-height: 100vh;
                    width:100%;
                    background: url('../../img/fondo.jpg')no-repeat;
                    background-position: center;
                    background-size: cover;
                }

                .credentials{
                    display:flex;
                    align-items: center
                }
                
                .credentials p img {
                    width: 20px;
                    height:20px;
                }

                .contenedor-login{
                    position: relative;
                    width: 400px;
                    height: 450px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 2px solid rgba(255, 255, 255, 0.5);
                    border-radius: 20px;
                    backdrop-filter: blur(15px);
                    display:flex;
                    justify-content: center;
                    align-items: center;
                }
                h2 {
                    font-size: 2rem;
                    margin: 0;
                    color: white;
                    text-align: center;
                }
                .credentials p{
                    margin: 0;
                    width: 20px;
                    height:20px;
                }
                .credentials{
                    position: relative;
                    margin: 30px 0;
                    width: 310px;
                    border-bottom: 2px solid #fff;
                }
                .credentials label{
                    position: absolute;
                    top: 50%;
                    left: 5px;
                    transform: translateY(-50%);
                    color:white;
                    font-size: 0.8rem;
                    pointer-events: none;
                    transition: .5s;
                }
                input:focus ~ label,
                input:valid ~ label{
                    top: -5px;
                }
                .credentials input {
                    width:100%;
                    height: 50px;
                    background: transparent;
                    border:none;
                    outline: none;
                    font-size: 0.8rem;
                    padding: 0 35px 0 5px;
                    color:white;
                }
                .credentials p{
                    position: absolute;
                    right: 8px;
                    color: white;
                    top: 20px;
                }
                button{
                    width:100%;
                    height: 40px;
                    border-radius: 40px;
                    background: white;
                    border: none;
                    outline:none;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: 600;
                }
                button:hover{
                    background-color: rgba(255, 255, 255, 0.5);
                    color: white;
                }


            </style>
            <div class="contenedor-principal">
                <div class="contenedor-login">
                    <div class="contenedor-form">

                            <h2>Login</h2>
                            <div class="credentials">
                                <p><img src="../../img/account.svg"></p>
                                <input type="text" id="usuario" required>
                                <label>Usuario</label>
                            </div>
                            <div class="credentials">
                                <p><img src="../../img/lock.svg"></p>
                                <input type="text" id="password" required>
                                <label>Contraseña</label>
                            </div>
                            <button class="login">Iniciar Sesion</button>
                    </div>
                </div>
            </div>
            <modal-container></modal-container>
            <datos-container></datos-container>
            <movimientos-container></movimientos-container>
            <descripcion-movimiento-container></descripcion-movimiento-container>
        `;
    }
}