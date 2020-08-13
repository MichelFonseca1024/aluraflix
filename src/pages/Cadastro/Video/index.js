import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import useForm from '../../../Hooks/useForm';
import Button from '../../../components/Button';
import VideosRepository from '../../../repositories/Videos';
import categoriasRepository from '../../../repositories/Categorias';

function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const { handleChange, Valores } = useForm({
    titulo: '',
    url: '',
    categoria: '',
    categoriaId: 1,
  });

  useEffect(() => {
    categoriasRepository.getAll().then((categoriasResponse) => {
      setCategorias(categoriasResponse);
    });
  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Videos</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const categoriaEscolhida = categorias.find(
            (categoria) => categoria.titulo === Valores.titulo,
          );
          await VideosRepository.Create(Valores).then(() => {
            history.push('/');
          });
        }}
      >
        <FormField
          type="input"
          name="titulo"
          value={Valores.titulo}
          onChange={handleChange}
        >
          Titulo do Video
        </FormField>

        <FormField
          type="url"
          name="url"
          value={Valores.url}
          onChange={handleChange}
        >
          URL do Video
        </FormField>

        <FormField
          type="input"
          name="categoria"
          value={Valores.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        >
          Categoria
        </FormField>

        <Button type="submit">Cadastrar</Button>
      </form>
      <Link to="/cadastro/categoria">Cadastrar Categoria</Link>
    </PageDefault>
  );
}

export default CadastroVideo;
