class Modal {
    constructor() {
        this._modal = document.querySelector('#modal');
        this._modalBtn = document.querySelector('#modal-btn');
        this.addEventListeners();
    };

    addEventListeners() {
        this._modalBtn.addEventListener('click', this.open.bind(this));
        this._modal.addEventListener('click', this.outsideClick.bind(this));
        document.addEventListener('closemodal', () => this.close());
    }

    open() {       
        this._modal.style.display = 'block';
    }
    outsideClick(e) {
        if (e.target.id === 'modal') {
            this.close();
        }
    }
    close(){
        this._modal.style.display = 'none';
    }
}
export default Modal;