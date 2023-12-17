import { Router } from 'express';
import livroRoutes from './livroRoutes';
import usuarioRoutes from './usuarioRoutes';
import emprestimoRoutes from './emprestimoRoutes';

const router = Router();

// Redirecionamento para as rotas específicas
router.use(usuarioRoutes);
router.use(livroRoutes);
router.use(emprestimoRoutes);

export default router;
