const categoriaSchema = require("../models/categoria");

const createCategory = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({
      message: "Todos los campos son obligatorios"
    });
  }

  const newCategory = new categoriaSchema({
    name
  });

  newCategory.save((err, categorySaved) => {

    if (err) {
      return res.status(400).send({ message: "Error al guardar la categoria" });
    }

    return res.status(201).send({
      message: "Categoria guardada",
      categorySaved
    })
  });
}

const getCategories = (req, res) => {
  categoriaSchema.find({}, (err, categories) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener las categorias" });
    }

    return res.status(200).send({ categories });
  });
}


module.exports = {
  createCategory,
  getCategories
}