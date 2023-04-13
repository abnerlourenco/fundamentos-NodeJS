const express = require("express");
const { v4: uuidv4 } = require("uuid")

const app =express();

app.use(express.json());

const customers = [];

// Middleware para verificar se é uma conta existente
function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers;

    const customer = customers.find((customer) => customer.cpf === cpf);

    // nao permitir para conta nao existente
    if (!customer) {
        return response.status(400).json({ error: "Customer not found"});
    }

    request.customer = customer;

    return next();
}

// calcular o saldo da conta
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
        (customer) => customer.cpf === cpf
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

    return response.status(201).send();
});

// buscar extrato bancario
app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request

    return response.json(customer.statement);
});

// realizar um deposito 
app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
    const { description, amount } = request.body;

    const { customer } = request;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }

    customer.statement.push(statementOperation);

    return response.status(201).send();
});

// realizar um saque
app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
    const { amount } = request.body;

    const { customer } = request;

    const balance = getBalance(customer.statement);

    // verificar se tem saldo
    if(balance < amount) {
        return response.status(400).json({ error: "Insufficient funds"})
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debit"
    }

    customer.statement.push(statementOperation);

    return response.status(201).send();
});

// buscar extrato bancario por data
app.get("/statement/data", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request
    const { date } = request.query;

    const dateFormat = new Date(date + " 00:00");

    const statement = customer.statement.filter(
        (statement) => statement.created_at.toDateString() === 
        new Date(dateFormat).toDateString())

    return response.json(customer.statement);
});

// alterar informações da conta
app.put("/account", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    const { name } = request.body;

    customer.name = name;

    return response.status(201).send();
});

// buscar informações da conta
app.get("/account", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    return response.json(customer);
});

// deletar uma conta
app.delete("/account", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    const indexCustomer = customers.indexOf(customer);

    customers.splice(indexCustomer, 1);

    return response.status(200).json(customers);
});

// buscar saldo da conta
app.get("/balance", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    const balance = getBalance(customer.statement);
    return response.json({
        "balance": balance
    });
});

app.listen(3333);