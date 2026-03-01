import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, '..', 'data', 'alunos.json');


export const getalunosFromFile = () => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

export const savealunosToFile = (novoaluno) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    const alunos = JSON.parse(data || '[]');    
    alunos.push(novoaluno);    
    fs.writeFileSync(filePath, JSON.stringify(alunos, null, 2));  
};

export const getalunoById = (id) => {
  const alunos = getalunosFromFile();
  return alunos.find(aluno => aluno.id === id);
};

export const updatealunoInFile = (id, dadosAtualizados) => {
    const aluno  = getalunoById(id);   
    const alunoAtualizado = {...aluno,...dadosAtualizados } 
    const alunos = getalunosFromFile();
    const alunosAtualizados = alunos.map(u => u.id === id ? alunoAtualizado : u);
    fs.writeFileSync(filePath, JSON.stringify(alunosAtualizados, null, 2));  
}

export const deletealunoInFile = (id) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    const alunos = JSON.parse(data || '[]');    
    const alunosAtualizados = alunos.filter(aluno => aluno.id !== id);    
    fs.writeFileSync(filePath, JSON.stringify(alunosAtualizados, null, 2));  
};
