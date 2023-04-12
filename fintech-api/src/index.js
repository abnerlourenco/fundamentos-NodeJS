const express = require("express");
const { v4: uuidv4 } = require("uuid")

const app =express();

app.use(express.json());

const customers = [];

// Middleware para verificar se é uma conta existente
function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers;

    const custumer = custumer.find((custumer) => custumer.cpf === cpf);

    // nao permitir para conta nao existente
    if (!custumer) {
        return response.status(400).json({ error: "Customer not found"});
    }

    request.custumer = custumer;

    return next();
}

// cadastrar uma conta bancaria
/**
 * cpf - string
 * name - string
 * id - uuid
 * statement - array
 */
app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    // nao permitir criar conta para cpf existente
    const customersAlreadyExists = customers.some(
        (custumer) => customers.cpf === cpf
    );

    if (customersAlreadyExists) {
        return response.status(400).json({ error: "Customer already exists!"});
    }
    
    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: [],
    })
});

// buscar extrato bancario
app.get("/statement/", (request, response) => {
    const { custumer } = request

    return response.json(custumer.statement);
});

app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
    const { description, amount } = request.body;

    const { custumer } = request;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }

    custumer.statement.push(statementOperation);

    return response.status(201).send();
})

app.listen(3333);