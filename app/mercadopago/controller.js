import mercadopago from "mercadopago";

export const createOrder = async (req, res, next) => {
  mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
  });

  try {
    const result = await mercadopago.preferences.create({
      items: [
        {
          title: "Cita",
          unit_price: 10000,
          currency_id: "COL",
          quantity: 1,
        },
      ],
      back_urls: {
        success: "http://localhost:3000/api/mercadopago/successpurchase",
        failure: "http://localhost:3000/api/mercadopago/failurepurchase",
        pending: "http://localhost:3000/api/mercadopago/pendingpurchase",
      },
      notification_url:
        "https://ffd3-181-71-24-54.ngrok.io/api/mercadopago/webhook",
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
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log(data);
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const successPurchase = (req, res) => res.send("Success Purchase");
export const failurePurchase = (req, res) => res.send("Failure Purchase");
export const pendingPurchase = (req, res) => res.send("Pending Purchase");
