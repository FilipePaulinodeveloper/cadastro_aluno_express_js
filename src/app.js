import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando com ES Modules!');
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));