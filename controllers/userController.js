import userService from "../services/userService.js";
import { ObjectId } from "mongodb";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const JWTSecret = process.env.JWTSECRET;

const createUser = async (req, res) => {
    try {
        const { name, email, password, whatsapp, role } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        await userService.Create(name, email, hash, whatsapp, role);

        res.status(201).json({ message: 'O usuário foi cadastrado com sucesso!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno do servidor. Não foi possível cadastrar o usuário.' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email != undefined) {
            const user = await userService.getOne(email);
            if (user != undefined) {
                const correct = bcrypt.compareSync(password, user.password);
                if (correct) {
                    jwt.sign(
                        { id: user._id, email: user.email },
                        JWTSecret,
                        { expiresIn: '48h' },
                        (error, token) => {
                            if (error) {
                                res.status(400).json({ error: "Não foi possível gerar o token de autenticação." });
                            } else {
                                res.status(200).json({ message: "Login realizado com sucesso", token: token });
                            }
                        }
                    );
                } else {
                    res.status(401).json({ error: "Suas credenciais são inválidas. Acesso negado. Tente novamente." });
                }
            } else {
                res.status(404).json({ error: "O usuário não foi encontrado." });
            }
        } else {
            res.status(404).json({ error: "E-mail inválido ou não informado." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Não foi possível realizar o login. Erro interno do servidor" });
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (ObjectId.isValid(id)) {
            await userService.Delete(id);
            res.status(204).json({ message: "O usuário foi excluído com sucesso!" });
        } else {
            res.status(400).json({ error: 'Ocorreu um erro na validação do ID.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (ObjectId.isValid(id)) {
            const { name, email, password, whatsapp, role } = req.body;
            const user = await userService.Update(id, name, email, password, whatsapp, role);
            res.status(200).json({ message: 'Usuário atualizado com sucesso!', user: user });
        } else {
            res.status(400).json({ error: 'Ocorreu um erro na validação da ID.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export default { createUser, loginUser, deleteUser, updateUser, JWTSecret };