const express = require('express');
const app = express();
const clientesRoutes = require('./src/routes/clientes.js');
const produtosRoutes = require('./src/routes/produtos.js');
const pedidosRoutes = require('./src/routes/pedidos.js');

app.use(express.json());

app.use('/clientes', clientesRoutes);
app.use('/produtos', produtosRoutes);
app.use('/pedidos', pedidosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});