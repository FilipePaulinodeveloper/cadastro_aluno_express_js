import { listaralunos, criaraluno, validarCampos, atualizaraluno,getaluno, deletaraluno} from '../services/alunoService.js';

export const getalunos = (req, res) => {
  const alunos = listaralunos();
  res.json(alunos);
};

export const postaluno = (req, res) => {
  try {
    
    validarCampos(req.body);
    const aluno = criaraluno(req.body);
    res.status(201).json({ mensagem: 'Usuário criado', aluno });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

export const putaluno = (req, res) => {
  try {
    validarCampos(req.body, req.params.id);    
    atualizaraluno(req.params.id, req.body);
    res.json({ mensagem: 'Usuário atualizado' }); 
  }catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

export const getalunoById = (req, res) => {
  try {
    const aluno = getaluno(req.params.id);
    res.json(aluno);
  } catch (error) {
    res.status(404).json({ erro: error.message });
  }
};

export const deletealuno = (req, res) => {
  try {    
    deletaraluno(req.params.id);
    
    res.json({ mensagem: 'Usuário deletado' });
  } catch (error) {
    res.status(404).json({ erro: error.message });
  }
};