import confg from '../confg';

const URL = `${confg.URL}/videos`;
function Create(body) {
  return fetch(`${URL}?_embed=videos`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(async (response) => {
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw new Error('Não foi possivel cadastrar os dados');
  });
}

export default { Create };
