import User from "../models/Users.js";

class userService {
    async Create(name, email, password, whatsapp, role) {
        try {
            const newUser = new User({
                name,
                email,
                password,
                whatsapp,
                role
            });
            await newUser.save();
        } catch (error) {
            console.log(error);
        }
    }

    async getOne(email) {
        try {
            const user = await User.findOne({ email: email });
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async Delete(id) {
        try {
            await User.findByIdAndDelete(id);
            console.log(`Usuário com id: ${id} foi deletado.`);
        } catch (error) {
            console.log(error);
        }
    }

    async Update(id, name, email, password, whatsapp, role) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                id,
                {
                    name,
                    email,
                    password,
                    whatsapp,
                    role
                },
                { new: true }
            );
            console.log(`O usuário com a id: ${id} foi alterado.`);
            return updatedUser;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new userService();