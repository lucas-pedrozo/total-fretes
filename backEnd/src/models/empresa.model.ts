import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import ImagemEmpresa from './imagem_empresa.model';

class Empresa extends Model {
    id_empresa: number | undefined;
    nome: string | undefined;
    cnpj: string | undefined;
    tipo: string | undefined;
    avaliacao?: number | undefined;
    estado: string | undefined;
    cidade: string | undefined;
    rua: string | undefined;
    numero: string | undefined;
    imagemEmpresa_id?: number | undefined;
}

Empresa.init({
    id_empresa: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rua: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagemEmpresa_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'EMPRESA',
    timestamps: false,
});

Empresa.belongsTo(ImagemEmpresa, { foreignKey: 'imagemEmpresa_id', as: 'imagemEmpresa' })

export default Empresa;