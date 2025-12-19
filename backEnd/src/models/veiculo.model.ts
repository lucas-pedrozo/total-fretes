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
	eixos: number | undefined;
	peso_bruto: number | undefined
	altura: number | undefined;
	comprimento: number | undefined;
}

Veiculo.init({
	id_veiculo: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
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
		allowNull: false,
	},
	ano: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	capacidade: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	eixos: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	peso_bruto: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	altura: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	comprimento: {
		type: DataTypes.INTEGER,
		allowNull: false,
	}
}, {
	sequelize,
	tableName: 'VEICULO',
	timestamps: false,
});

export default Veiculo;