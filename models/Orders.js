import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    produtoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    titulo: String,
    sabor: String,
    casca: String,
    tamanho: String,
    precoUnitario: Number,
    quantidade: {
        type: Number,
        default: 1
    }
});

const pagamentoSchema = new mongoose.Schema({
    metodo: {
        type: String,
        enum: ['PIX', 'CARTAO', 'DINHEIRO']
    },
    comprovanteUrl: String,
    sinalPago: {
        type: Boolean,
        default: false
    }
});

const orderSchema = new mongoose.Schema({
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    itens: [itemSchema],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: [
            'AGUARDANDO_APROVACAO',
            'APROVADO_PARA_PAGAMENTO',
            'RECUSADO',
            'PAGO_SINAL',
            'CONFIRMADO',
            'EM_PRODUCAO',
            'PRONTO_PARA_RETIRADA',
            'ENTREGUE'
        ],
        default: 'AGUARDANDO_APROVACAO'
    },
    dataRetirada: {
        type: Date,
        required: true
    },
    pagamento: pagamentoSchema,
    observacoesAdmin: String
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;