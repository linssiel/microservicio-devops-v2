const express = require('express');
const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ message: "Microservicio activo en entorno Cloud simulado" });
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: "UP" });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor ejecutandose en el puerto ${PORT}`);
    });
}

module.exports = app;
