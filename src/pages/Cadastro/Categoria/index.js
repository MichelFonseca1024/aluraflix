import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../Hooks/useForm';
import Loading from '../../../components/Loading';

function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '#000000',
  };
  const [Categorias, setCategoria] = useState([]);
  const { handleChange, Valores, clearForm } = useForm(valoresIniciais);

  useEffect(() => {
    const URL = 'http://localhost:8080/categorias';
    fetch(URL)
      .then(async (response) => {
        const json = await response.json();
        setCategoria([
          ...json,
        ]);
      });
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categorias:
        {Valores.titulo}
      </h1>
      <form
        onSubmit={async function handleSubmit(event) {
          event.preventDefault();
          await fetch('http://localhost:8080/categorias', {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'post',
            body: JSON.stringify(Valores),
          });
          setCategoria([...Categorias, Valores]);
          clearForm();
        }}
      >
        <FormField
          type="input"
          name="titulo"
          value={Valores.titulo}
          onChange={handleChange}
        >
          Nome da Categoria:
        </FormField>

        <FormField
          type="textarea"
          name="descricao"
          value={Valores.descricao}
          onChange={handleChange}
        >
          Descrição:
        </FormField>

        <FormField
          type="color"
          name="cor"
          value={Valores.cor}
          onChange={handleChange}
        >
          Cor:
        </FormField>
        <Button type="submit">Cadastrar</Button>
        {Categorias.length === 0 && <Loading />}
      </form>
      <ul>
        {Categorias.map((categoria) => (
          <li key={`${categoria.id}}`}>{categoria.titulo}</li>
        ))}
      </ul>
      <Link to="/">Ir para Home</Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
