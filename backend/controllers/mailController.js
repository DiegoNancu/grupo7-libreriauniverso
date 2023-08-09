const Email = require('../models/email');
const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
  const { nombreProducto,nombre, emailUsuario, rut, quantity } = req.body;
  const to = emailUsuario; // Usar el emailUsuario como destinatario
  const subject = 'Gracias por tu compra'; // Asunto del correo

  try {

    const text = `Hola ${nombre},\n\nGracias por tu compra. Has adquirido ${quantity} de ${nombreProducto} con el siguiente rut: ${rut}.\n\n¡Esperamos que disfrutes tus productos!\n\nSaludos,\nLibrería Universo`;

    const email = new Email({ to, subject, text });
    await email.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'libreriauniverso.tiendaonline@gmail.com',
        pass: 'ifgopbnkcklkxxvj',
      },
    });

    const mailOptions = {
      from: 'libreriauniverso.tiendaonline@gmail.com', // Cambiar a tu correo
      to,
      subject,
      text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error al enviar el correo');
      } else {
        res.status(200).send('Correo enviado');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = { sendEmail };
