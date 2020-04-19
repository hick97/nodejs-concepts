const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositoryIndex = repositories.findIndex((r) => r.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  const repository_to_update = repositories[repositoryIndex];

  repository_to_update.title = title;
  repository_to_update.url = url;
  repository_to_update.techs = techs;

  return response.json(repository_to_update);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex((r) => r.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex((r) => r.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  repositories[repositoryIndex].likes += 1;

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
