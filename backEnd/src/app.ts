import express from 'express';
import cors from "cors";
import cargaRoutes from './routes/carga.routes';
import caminhoneiroRoutes from './routes/caminhoneiro.routes';
import empresaRoutes from './routes/empresa.routes';
import imagemCargaRoutes from './routes/imagem_carga.routes';
import imagemEmpresaRoutes from './routes/imagem_empresa.routes';
import imagemUsuarioRoutes from './routes/imagem_usuario.routes';
import usuarioRoutes from './routes/usuario.routes';
import veiculoRoutes from './routes/veiculo.routes';
import tipoCargaRoutes from './routes/tipo_carga.routes';
import fretesRoutes from "./routes/frete.routes";
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import login from './routes/login.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => { res.send("Hello World!"); });
app.use('/api', cargaRoutes);
app.use('/api', caminhoneiroRoutes);
app.use('/api', empresaRoutes);
app.use('/api', imagemCargaRoutes);
app.use('/api', imagemEmpresaRoutes);
app.use('/api', imagemUsuarioRoutes);
app.use('/api', fretesRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', veiculoRoutes);
app.use('/api', tipoCargaRoutes);
app.use('/api', login);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

const swaggerDocument = YAML.load('./src/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;