import { listarUsuarios, criarUsuario, validarCampos, atualizarUsuario,getUsuario, deletarUsuario} from '../services/usuarioService.js';

export const getUsuarios = (req, res) => {
  const usuarios = listarUsuarios();
  res.json(usuarios);
};

export const postUsuario = (req, res) => {
  try {
    
    validarCampos(req.body);
    const usuario = criarUsuario(req.body);
    res.status(201).json({ mensagem: 'Usuário criado', usuario });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

export const putUsuario = (req, res) => {
  try {
    validarCampos(req.body, req.params.id);    
    atualizarUsuario(req.params.id, req.body);
    res.json({ mensagem: 'Usuário atualizado' }); 
  }catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

export const getUsuarioById = (req, res) => {
  try {
    const usuario = getUsuario(req.params.id);
    res.json(usuario);
  } catch (error) {
    res.status(404).json({ erro: error.message });
  }
};

export const deleteUsuario = (req, res) => {
  try {    
    deletarUsuario(req.params.id);
    
    res.json({ mensagem: 'Usuário deletado' });
  } catch (error) {
    res.status(404).json({ erro: error.message });
  }
};