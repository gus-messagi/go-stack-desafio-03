import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(({ data }) => {
      setRepositories(data);
    });
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post('repositories', {
      title: 'Awesome Repo',
      url: 'https://github.com/gus-messagi/go-stack-desafio-03',
      techs: [
        'NodeJS',
        'JavaScript'
      ]
    });

    setRepositories([ ...repositories, data ]);
  }

  async function handleRemoveRepository(id) {

    const index = repositories.findIndex(repository => repository.id === id);

    if (index < 0) return;

    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={`repository-${repository.id}`}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
