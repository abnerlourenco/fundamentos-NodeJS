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

// calcula o saldo da conta
function getBalance(statement) {
    const balance = statement.reduce((acc, operation) => {
        if (operation.type === 'credit') {
            return acc + operation.amount;
        }else {
            return acc - operation.amount;
        }
    }, 0);

    return balance;
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
        (custumer) => custumer.cpf === cpf
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

// realizar um deposito
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
});

// realizar um saque
app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
    const { amount } = request.body;

    const { custumer } = request;

    const balance = getBalance(custumer.statement);

    // verificar se tem saldo
    if(balance < amount) {
        return response.status(400).json({ error: "insufficient funds"})
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debit"
    }

    custumer.statement.push(statementOperation);

    return response.status(201).send();
});

app.listen(3333);