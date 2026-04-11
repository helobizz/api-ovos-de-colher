import Order from "../models/Orders.js";

class orderService {
    async getAll() {
        try {
            const orders = await Order.find();
            return orders;
        } catch (error) {
            console.log(error);
        }
    }

    async Create(usuarioId, itens, total, status, dataRetirada, pagamento, observacoesAdmin) {
        try {
            const newOrder = new Order({
                usuarioId,
                itens,
                total,
                status,
                dataRetirada,
                pagamento,
                observacoesAdmin
            });
            await newOrder.save();
        } catch (error) {
            console.log(error);
        }
    }

    async Delete(id) {
        try {
            await Order.findByIdAndDelete(id);
            console.log(`Pedido com id: ${id} foi deletado.`);
        } catch (error) {
            console.log(error);
        }
    }

    async Update(id, usuarioId, itens, total, status, dataRetirada, pagamento, observacoesAdmin) {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(id, {
                usuarioId,
                itens,
                total,
                status,
                dataRetirada,
                pagamento,
                observacoesAdmin
            },
                { new: true, runValidators: true }
            );
            console.log(`O pedido com a id: ${id} foi alterado.`);
            return updatedOrder;
        } catch (error) {
            console.log(error);
        }
    }

    async getOne(id) {
        try {
            const order = await Order.findOne({ _id: id });
            return order;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new orderService();