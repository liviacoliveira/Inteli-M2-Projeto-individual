// index.js
const express = require('express');
const router = express.Router();

// Controllers
const EventoController = require('../controllers/EventoController');
const UsuarioController = require('../controllers/UsuarioController');
const InscricaoController = require('../controllers/InscricaoController');
const CategoriaController = require('../controllers/CategoriaController');

// Rotas de usuários
router.post('/usuarios', UsuarioController.criarUsuario);
router.get('/usuarios', UsuarioController.listarUsuarios);
router.get('/usuarios/:id', UsuarioController.buscarUsuarioPorId);
router.put('/usuarios/:id', UsuarioController.atualizarUsuario);
router.delete('/usuarios/:id', UsuarioController.deletarUsuario);

// Rotas de eventos
router.post('/eventos', EventoController.criarEvento);
router.get('/eventos', EventoController.listarEventos);
router.put('/eventos/:id', EventoController.editarEvento);
router.delete('/eventos/:id', EventoController.excluirEvento);

// Rotas de inscrições
router.post('/inscricoes', InscricaoController.inscreverUsuario);
router.get('/inscricoes', InscricaoController.listarInscricoes);
router.get('/inscricoes/usuario/:idUsuario', InscricaoController.listarInscricoesPorUsuario);
router.get('/inscricoes/evento/:idEvento', InscricaoController.listarInscricoesPorEvento);
router.put('/inscricoes/:id', InscricaoController.atualizarPresenca);
router.delete('/inscricoes/:id', InscricaoController.cancelarInscricao);

// Rotas de categorias
router.post('/categorias', CategoriaController.criarCategoria);
router.get('/categorias', CategoriaController.listarCategorias);
router.put('/categorias/:id', CategoriaController.atualizarCategoria);
router.delete('/categorias/:id', CategoriaController.deletarCategoria);

module.exports = router;
