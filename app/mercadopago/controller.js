import mercadopago from 'mercadopago';

export const createOrder = async (req, res, next) => {
  mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
  });

  try {
    const result = await mercadopago.preferences.create({
      items: [
        {
          title: 'Cita',
          unit_price: 10000,
          currency_id: 'COL',
          quantity: 1,
        },
      ],
      back_urls: {
        success: `${process.env.FRONTEND_URL}/api/mercadopago/successpurchase`,
        failure: `${process.env.FRONTEND_URL}/api/mercadopago/failurepurchase`,
        pending: `${process.env.FRONTEND_URL}/api/mercadopago/pendingpurchase`,
      },
      notification_url:
        'https://ffd3-181-71-24-54.ngrok.io/api/mercadopago/webhook',
    });
    console.log(result);
    res.json(result.body);
  } catch (error) {
    next(error);
  }
};

export const receiveWebhook = async (req, res, next) => {
  const payment = req.query;
  try {
    if (payment.type === 'payment') {
      const data = await mercadopago.payment.findById(payment['data.id']);
      console.log(data);
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
