import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Veiculo extends Model {
    id_veiculo: number | undefined;
    marca: string | undefined;
    modelo: string | undefined;
    placa?: string | undefined;
    quilometragem?: number | undefined;
    ano?: number | undefined;
    capacidade: number | undefined;
}

Veiculo.init({
    id_veiculo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ano: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    capacidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    eixos: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    peso_bruto: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    altura: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    comprimento: {
        type: DataTypes.INTEGER,
        allowNull: true,    
    },
}, {
    sequelize,
    tableName: 'VEICULO',
    timestamps: false,
});


export default Veiculo;