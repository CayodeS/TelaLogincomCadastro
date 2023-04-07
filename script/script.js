class Validator{
    constructor(){
        this.validations = [
            'data-min-length',
            'data-required',
        ]
    }

    //iniciar a validação dos campos

    validate(form){

        // resgata todas as validações 
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0){
            this.cleanValidations(currentValidations);
        }

        // pegar inputs
        let inputs = form.getElementsByTagName('input');


        let inputsArray = [...inputs];

        inputsArray.forEach(function(input){
            for(let i = 0; this.validations.length > i; i++) {
                if(input.getAttribute(this.validations[i]) != null) {

                    let method = this.validations[i].replace('data-','').replace('-','');

                    // valor do input
                    let value = input.getAttribute(this.validations[i])
  
                    // invoca o método
                    this[method](input,value);
                  
        
                }
              }

        }, this);
    }

    minlength(input, minValue) {

        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if (inputLength < minValue){
            this.printMenssage(input,errorMessage);
        }

    } 
    
    // metado para imprimir o erro na tela
    printMenssage(input,msg){

        // quantidade de erros 
        let errorQty = input.parentNode.querySelector('.error-validation');

        if (errorQty === null){
           let template = document.querySelector('.error-validation').cloneNode(true);

           template.textContent = msg;

           let inputParent = input.parentNode;

           template.classList.remove('template');

           inputParent.appendChild(template);

        }
    }

    // verifica se o input é requirido
    required(input) {

        let inputValue = input.value;

        if (inputValue === ''){
            let errorMessage=`Este campo é obrigatório`

            this.printMenssage(input, errorMessage);
        }

    }

    // limpa as validações na tela 
    cleanValidations(validations){
        validations.forEach(el => el.remove());
    }
}

  
   
let form = document.getElementById('form-login');
let submit = document.getElementById('login-btn');
  
let validator = new Validator();

// evento de envio do form, que valida os inputs
submit.addEventListener('click', function(e) {
    
    e.preventDefault();
  
    validator.validate(form);
});