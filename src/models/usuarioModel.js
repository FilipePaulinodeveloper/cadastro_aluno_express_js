import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, '..', 'data', 'usuarios.json');


export const getUsuariosFromFile = () => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

export const saveUsuariosToFile = (novoUsuario) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    const usuarios = JSON.parse(data || '[]');    
    usuarios.push(novoUsuario);    
    fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));  
};

export const getUsuarioById = (id) => {
  const usuarios = getUsuariosFromFile();
  return usuarios.find(usuario => usuario.id === id);
};

export const updateUsuarioInFile = (id, dadosAtualizados) => {
    const usuario  = getUsuarioById(id);   
    const usuarioAtualizado = {...usuario,...dadosAtualizados } 
    const usuarios = getUsuariosFromFile();
    const usuariosAtualizados = usuarios.map(u => u.id === id ? usuarioAtualizado : u);
    fs.writeFileSync(filePath, JSON.stringify(usuariosAtualizados, null, 2));  
}

export const deleteUsuarioInFile = (id) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    const usuarios = JSON.parse(data || '[]');    
    const usuariosAtualizados = usuarios.filter(usuario => usuario.id !== id);    
    fs.writeFileSync(filePath, JSON.stringify(usuariosAtualizados, null, 2));  
};
