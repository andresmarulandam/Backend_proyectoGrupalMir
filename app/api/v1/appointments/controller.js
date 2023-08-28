import { v4 as uuidv4 } from "uuid";

const appointments = [];

export const create = (req, res, next) => {
  const { center, name, doctor, specialty } = req.body; // Desestructurar los datos del cuerpo de la solicitud
  const id = uuidv4();
  const newAppointment = { id, center, name, doctor, specialty };

  appointments.push(newAppointment);

  res.status(201);
  res.json({
    data: newAppointment, // Devolver los datos recibidos en la respuesta
  });
};

export const all = (req, res) => {
  res.json({
    data: appointments,
  });
};

export const read = (req, res) => {
  const { id } = req.params;
  const appointment = appointments.find((a) => a.id === id);

  if (!appointment) {
    res.status(404);
    res.json({
      error: {
        message: "Cita not found",
        status: 404,
      },
    });
    return;
  }

  res.json({
    data: appointment,
  });
};

export const update = (req, res) => {
  const { id } = req.params;
  const fieldsToUpdate = req.body;
  const appointmentIndex = appointments.findIndex((a) => a.id === id);

  if (appointmentIndex === -1) {
    res.status(404);
    res.json({
      error: {
        message: "Cita not found",
        status: 404,
      },
    });
    return;
  }

  appointments[appointmentIndex] = {
    ...appointments[appointmentIndex],
    ...fieldsToUpdate,
  };

  res.json({
    data: appointments[appointmentIndex],
  });
};

export const remove = (req, res) => {
  const { id } = req.params;
  const appointmentIndex = appointments.findIndex((a) => a.id === id);

  if (appointmentIndex === -1) {
    res.status(404);
    res.json({
      error: {
        message: "Cita not found",
        status: 404,
      },
    });
    return;
  }

  appointments.splice(appointmentIndex, 1);

  res.status(204);
  res.end();
};
