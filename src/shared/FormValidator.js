class FormValidator {

    validateInputs(inputData) {
      let errorMsg = "";
      if(!inputData.title) {
        errorMsg +="Please enter title.\n"
      }
      if(!inputData.description) {
        errorMsg +="Please enter description.\n"
      }
      if(!inputData.price) {
        errorMsg +="Please enter price.\n"
      }
      
      
      if(errorMsg.length === 0){
        return true;
      } else {
        alert(errorMsg);
        return false;
      }
    }
  }
  
  export default FormValidator;