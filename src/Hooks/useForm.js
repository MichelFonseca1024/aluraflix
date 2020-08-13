import { useState } from 'react';

function useForm(valoresIniciais) {
  const [Valores, setValores] = useState(valoresIniciais);

  function setValor(chave, valor) {
    setValores({ ...Valores, [chave]: valor });
  }

  function handleChange(infosDoEvento) {
    setValor(
      infosDoEvento.target.getAttribute('name'),
      infosDoEvento.target.value,

    );
  }
  function clearForm() {
    setValores(valoresIniciais);
  }
  return {
    handleChange,
    Valores,
    clearForm,
  };
}

export default useForm;
