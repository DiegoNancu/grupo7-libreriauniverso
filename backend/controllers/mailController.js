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

const sendEmailSingUp = async (req, res) => {
  const { name, email, password} = req.body;
  const to = email; // Usar el email como destinatario
  const subject = '¡Gracias por Registrarte en nuestra página web!'; // Asunto del correo

  try {

    const text = `Hola ${name},\n\nGracias por registrarte en nuestra página web. compra. No olvides que tu contraseña es ${password}. Si no te has registrado tú, ingresa a la página y contacta con la tienda.\n\n¡Te esperamos!\n\nSaludos,\nLibrería Universo`;

    const email1 = new Email({ to, subject, text });
    await email1.save();

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

module.exports = { sendEmail, sendEmailSingUp };
