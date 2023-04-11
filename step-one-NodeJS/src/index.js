const express = require("express");

const app =express();

app.use(express.json());

/** METODOS
 
 * GET - Buscar uma informação dentro do servidor
 * POST - Inserir uma informação no servidor
 * PUT - Alterar uma informação no servidor
 * PATCH - Alterar uma informação especifica
 * DELETE - Deletar uma informação no servidor
 */

/** TIPOS DE PARAMETROS
 
 * Route Params (/:params) => identificar recurso para poder editar / deletar / buscar
 * Query Params (/?params) => Paginação / Filtros
 * Body Params ({"key": "value", "key1": "value1"}) => Objetos inserção / alteração (JSON)
 */

app.get("/courses", (request, response) => {
    return response.json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.post("/courses", (request, response) => {
    return response.json(["Curso 1", "Curso 2", "Curso 3","Curso 4"]);
});

app.put('/courses/:id', (request, response) => {
    return response.json(["Curso 5", "Curso 2", "Curso 3", "Curso 4"]);
});

app.patch("/courses/:id", (request, response) => {
    return response.json(["Curso 5", "Curso 7", "Curso 3", "Curso 4"]);
});

app.delete("/courses/:id", (request, response) => {
    return response.json(["Curso 5", "Curso 3", "Curso 4"]);
});

app.listen(3333);