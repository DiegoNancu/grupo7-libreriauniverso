const user = require("../models/users");
const bcrypt = require("bcrypt");

const sign_up = async (req, res) => {
    const { name, rut , email, number} = req.body;
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = new user({
        name,
        password,
        rut,
        email,
        number,
        });
        newUser.save((error, Newperson) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ message: "Error al registrarse." });
            }
            try {
                return res.status(201).send(Newperson);
                } catch (error) {
                console.log(error)
            }
        });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    user.findOne({ email: email }, (error, person) => {
        if (error) {
            return res.status(400).send({ message: 'Error al iniciar sesion' });
        }
        if (!person) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }
        bcrypt.compare(password, person.password, (error, result) =>{
            if(error){
                return res.status(400).send({ message: 'Error al iniciar sesión'})
            }
            if(!result){
                return res.status(404).send({ mesagge: 'Contraseña incorrecta.'})
            }
            return res.status(201).send({ message: 'Se ha iniciado sesion correctamente.', person: email});
        });
    });
}
    const getUsers = (req, res) => {

        user.find({}, (error, person) => {
          if (error) {
            return res.status(400).send({ message: "Error al buscar el usuario." });
          }
          if (!person) {
            return res.status(404).send({ message: "Usuario no encontrado." });
          }
        });
      };

      const getUsersAll = (req, res) => {
        user.find({}, (error, person) => {
          if (error) {
            return res.status(400).send({ message: "Error al buscar el usuario." });
          }
          if (person.length === 0) {
            return res.status(404).send({ message: "Usuario no encontrado." });
          }
          return res.status(201).send(person);
        })
      };

    const deleteUser = (req, res) => {
        const { id } = req.params;
            user.findByIdAndDelete(id, (error, userd) => {
              if (error) {
                return res.status(400).send({ message: "Error al eliminar el usuario." });
              }
              if (!userd) {
                return res.status(404).send({ message: "Usuario no encontrado." });
              }
              return res.status(201).send({ message: "Usuario eliminado." });
            });
        };

    const getUserByEmail = (req, res) => {
      const { email } = req.params;
      user.findOne({ email: email }, (err, person) => {
        if (err) {
          return res.status(400).send({ message: 'Error al buscar rut' });
        }
        if (!person) {
          return res.status(404).send({ message: 'Usuario no encontrado' });
        }
        return res.status(201).send(person);
      })
    };


module.exports = {
    sign_up,
    login,
    getUsers,
    getUsersAll,
    deleteUser,
    getUserByEmail,
};