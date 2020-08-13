import confg from '../confg';

const URL = `${confg.URL}/categorias`;
function getAllWithVideos() {
  return fetch(`${URL}?_embed=videos`).then(async (response) => {
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw new Error('Não foi possivel pegar os dados');
  });
}

function getAll() {
  return fetch(`${URL}`).then(async (response) => {
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw new Error('Não foi possivel pegar os dados');
  });
}

export default { getAllWithVideos, getAll };
