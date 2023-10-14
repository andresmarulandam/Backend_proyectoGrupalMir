import nodemailer from "nodemailer";

export const recoverPassword = async (req, res) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      password: testAccount.password,
    },
  });

  const message = {
    from: '"Fred Foo 👻" <foo@example.com>',
    to: "bar@example.com, baz@example.com",
    subject: "Recupera tu constraseña",
    text: "Recupera tu constraseña",
  };
  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "Debes recibir un email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
