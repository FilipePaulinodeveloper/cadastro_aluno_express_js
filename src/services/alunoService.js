import { getalunosFromFile, savealunosToFile,updatealunoInFile, getalunoById, deletealunoInFile } from '../models/alunoModel.js';
import crypto from 'crypto';
const camposObrigatorios = ['nome', 'email', 'data_nascimento', 'curso', 'matricula'];
export const validarCampos = (dados, idalunoAtualizar = null) => {
  
  for (const campo of camposObrigatorios) {
    validarCampoObrigatorio(dados[campo], campo);
  }
  validarEmail(dados.email);
  validarDataNascimento(dados.data_nascimento);
  
  validarEmailExistente(dados.email, idalunoAtualizar);
  validarMatriculaExistente(dados.matricula, idalunoAtualizar);
}

const validarCampoObrigatorio = (campo, nomeCampo) => {
  if (!campo) {
    throw new Error(`${nomeCampo} é obrigatório`);
  }
};
const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    throw new Error('Email inválido');
  }
};

const validarMatriculaExistente = (matricula, idalunoAtualizar = null) => {
  const alunos = getalunosFromFile();
  const alunoExistente = alunos.find(u => u.matricula === matricula && u.id !== idalunoAtualizar);
  if (alunoExistente) {
    throw new Error('Matrícula já cadastrada');
  }
}

const validarEmailExistente = (email, idalunoAtualizar = null) => {
  const alunos = getalunosFromFile();
  const alunoExistente = alunos.find(u => u.email === email && u.id !== idalunoAtualizar);
  if (alunoExistente) {
    throw new Error('Email já cadastrado');
  }
}

const validarDataNascimento = (data) => {
  const dataNascimento = new Date(data);
  const hoje = new Date();
  if (isNaN(dataNascimento.getTime()) || dataNascimento >= hoje) {
    throw new Error('Data de nascimento inválida');
  }  
};

export const listaralunos = () => {
  return getalunosFromFile();
};

export const criaraluno = (aluno) => { 
  aluno.id = crypto.randomUUID();  
  return savealunosToFile(aluno);
};


export const atualizaraluno = (id, dadosAtualizados) => {
  const alunoExistente = getalunoById(id);  
  if (!alunoExistente) {
    throw new Error('Usuário não encontrado');
  }
  validarEmailExistente(dadosAtualizados.email, id);
  updatealunoInFile(id, dadosAtualizados);
};

export const getaluno = (id) => {
  const aluno = getalunoById(id);
  if (!aluno) {
    throw new Error('Usuário não encontrado');
  }
  return aluno;
};

export const deletaraluno = (id) => {
  const alunoExistente = getalunoById(id);
  if (!alunoExistente) {
    throw new Error('Usuário não encontrado');
  }
  deletealunoInFile(id);
}