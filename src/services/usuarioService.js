import { getUsuariosFromFile, saveUsuariosToFile,updateUsuarioInFile, getUsuarioById, deleteUsuarioInFile } from '../models/usuarioModel.js';
import crypto from 'crypto';
const camposObrigatorios = ['nome', 'email', 'data_nascimento', 'curso', 'matricula'];
export const validarCampos = (dados, idUsuarioAtualizar = null) => {
  
  for (const campo of camposObrigatorios) {
    validarCampoObrigatorio(dados[campo], campo);
  }
  validarEmail(dados.email);
  validarDataNascimento(dados.data_nascimento);
  
  validarEmailExistente(dados.email, idUsuarioAtualizar);
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

const validarEmailExistente = (email, idUsuarioAtualizar = null) => {
  const usuarios = getUsuariosFromFile();
  const usuarioExistente = usuarios.find(u => u.email === email && u.id !== idUsuarioAtualizar);
  if (usuarioExistente) {
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

export const listarUsuarios = () => {
  return getUsuariosFromFile();
};

export const criarUsuario = (usuario) => { 
  usuario.id = crypto.randomUUID();  
  return saveUsuariosToFile(usuario);
};


export const atualizarUsuario = (id, dadosAtualizados) => {
  const usuarioExistente = getUsuarioById(id);  
  if (!usuarioExistente) {
    throw new Error('Usuário não encontrado');
  }
  validarEmailExistente(dadosAtualizados.email, id);
  updateUsuarioInFile(id, dadosAtualizados);
};

export const getUsuario = (id) => {
  const usuario = getUsuarioById(id);
  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }
  return usuario;
};

export const deletarUsuario = (id) => {
  const usuarioExistente = getUsuarioById(id);
  if (!usuarioExistente) {
    throw new Error('Usuário não encontrado');
  }
  deleteUsuarioInFile(id);
}