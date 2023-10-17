import nodemailer from 'nodemailer';

export const recover = async (req, res) => {
  res.status(201).json('Password recovery successful!');
  // TODO Pendiente implementar envio de correo para reiniciar contraseña
  //
  // const testAccount = await nodemailer.createTestAccount();
  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.ethereal.email',
  //   port: 587,
  //   secure: false,
  //   auth: {
  //     user: testAccount.user,
  //     password: testAccount.password,
  //   },
  // });
  // const message = {
  //   from: '"Fred Foo 👻" <foo@example.com>',
  //   to: 'bar@example.com, baz@example.com',
  //   subject: 'Recupera tu constraseña',
  //   text: 'Recupera tu constraseña',
  // };
  // transporter
  //   .sendMail(message)
  //   .then((info) => {
  //     return res.status(201).json({
  //       msg: 'Debes recibir un email',
  //       info: info.messageId,
  //       preview: nodemailer.getTestMessageUrl(info),
  //     });
  //   })
  //   .catch((error) => {
  //     return res.status(500).json({ error });
  //   });
};

export const confirmation = async (req, res) => {
  //  res.status(201).json('Confirmation Successful!');

  const { email } = req.params;
  const appointmentDate = '2023-10-20T15:00:00.000Z'; // TODO agregar llamado para traer la fecha de la cita medica

  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    secureConnection: false,
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      ciphers: 'SSLv3',
    },
  });

  const message = {
    from: `Consultorio Virtual ${process.env.EMAIL}`,
    to: email,
    subject: 'Confirmación de pago',
    text: `Tu cita médica del ${appointmentDate} quedó pagada y confirmada.`,
  };
  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: 'Recibirás un email confirmando tu cita.',
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
