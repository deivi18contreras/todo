import mongoose from "mongoose";

const ordenSchema = new mongoose.Schema({
    comprador_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    productos: [{
        producto_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Producto',
            required: true
        },
        cantidad: { type: Number, required: true, min: 1},
        precio_unitario: { type: Number, required: true },
        subtotal: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    estado: {
        type: String,
        enum: ["pendiente", "pagado", "enviado", "cancelado", "entregado"],
        default: "pendiente"
    }
}, {
    timestamps: true
});

export default mongoose.model("Orden", ordenSchema);