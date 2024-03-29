const productoSchema = require('../models/productos');
const categoriaSchema = require('../models/categoria');

const createProduct = (req, res) => {
  const { nombre, costo, precio_venta, stock, categoria } = req.body;

  if (!costo || !precio_venta || !nombre || !stock || !categoria) {
    return res.status(400).send({
      message: "Todos los campos son obligatorios"
    });
  }

  if (costo <= 0 || precio_venta <= 0 || stock < 0) {
    return res.status(400).send({
      message: "Los valores deben ser mayores a 0"
    });
  }

  const newProduct = new productoSchema({
    nombre,
    costo,
    precio_venta,
    stock,
    categoria
  });

  newProduct.save((err, productSaved) => {

    if (err) {
      return res.status(400).send({ message: "Error al guardar el producto" });
    }

    return res.status(201).send({
      message: "Producto guardado",
      productSaved
    })
  });
}

const getProducts = (req, res) => {
  productoSchema.find({}, (err, products) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener los productos" });
    }

    res.status(200).send({ products });
  });
};

const updateProducts = (req, res) => {
  const { id } = req.params;

  productoSchema.findByIdAndUpdate(id, req.body, (err, productUpdated) => {
    if (err) {
      return res.status(400).send({ message: "Error al actualizar el producto" });
    }
    if (!productUpdated) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }
    return res.status(200).send({ message: "Producto actualizado" });
  });
}

const deleteProducts = (req, res) => {
  const { id } = req.params;

  productoSchema.findByIdAndDelete(id, (err, productDeleted) => {
    if (err) {
      return res.status(400).send({ message: "Error al eliminar el producto" });
    }
    if (!productDeleted) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }
    return res.status(200).send({ message: "Producto eliminado" });
  });
}

module.exports = {
  createProduct,
  getProducts,
  updateProducts,
  deleteProducts
};