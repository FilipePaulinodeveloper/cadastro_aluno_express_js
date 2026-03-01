import express from 'express';
import alunoRoutes from './routes/alunoRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/alunos', alunoRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando com ES Modules!');
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));