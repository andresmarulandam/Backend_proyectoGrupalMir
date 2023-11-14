import { prisma } from "../../../database.js";
import { parseOrderParams, parsePaginationParams } from "../../../utils.js";
import { fields, AppointmentSchema } from "./model.js";

export const create = async (req, res, next) => {
  const { body = {}, decoded = {} } = req; // Desestructurar los datos del cuerpo de la solicitud
  const { id: userId } = decoded;

  try {
    const { success, data, error } = await AppointmentSchema.safeParseAsync(
      body
    );
    if (!success) {
      return next({
        message: "Validator error",
        status: 400,
        error,
      });
    }
    const result = await prisma.appointment.create({
      data: {
        ...data,
        userId,
      },
    });
    res.status(201);
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const all = async (req, res, next) => {
  const { query, params } = req;
  const { userId, centerId, doctorId } = params;
  const { limit, offset } = parsePaginationParams(query);
  const { orderBy, direction } = parseOrderParams({
    fields,
    ...query,
  });
  const currentPage = Math.floor(offset / limit) + 1;

  try {
    const [result, total] = await Promise.all([
      prisma.appointment.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction, // esto es si por ejemplo orderBy tiene el valor de id el lo traduce como: id: direction
        },
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
            },
          },
          center: {
            select: {
              centerName: true,
            },
          },
          doctor: {
            select: {
              fullName: true,
            },
          },
        },
        where: {
          userId,
          centerId,
          doctorId,
        },
      }),
      prisma.appointment.count(),
    ]);
    res.json({
      data: result,
      meta: {
        limit, // El número máximo de registros por página
        offset, // El número de registros que se han omitido en la paginación.
        total, // El número total de registros en la base de datos
        pages: Math.ceil(total / limit), // El número total de páginas basado en la división total / límite,
        currentPage,
        orderBy,
        direction,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const read = async (req, res, next) => {
  const { params = {} } = req;

  try {
    const result = await prisma.appointment.findUnique({
      where: {
        id: params.id,
      },
    });

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;

  try {
    const { success, data, error } =
      await AppointmentSchema.partial().safeParseAsync(body);
    if (!success) {
      return next({
        message: "Validator error",
        status: 400,
        error,
      });
    }
    const result = await prisma.appointment.update({
      where: {
        id: id,
      },
      data: { ...data, updatedAt: new Date().toISOString() },
    });
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    await prisma.appointment.delete({
      where: {
        id: id,
      },
    });
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};

export const appointmentsByDate = async (req, res, next) => {
  const { doctorId, date } = req.params;
  try {
    const startDate = new Date(`${date}T00:00:00`);
    console.log(startDate);

    const endDate = new Date(`${date}T23:59:00`);
    console.log(endDate);

    const data = await prisma.appointment.findMany({
      where: {
        doctorId,
        appointmentDate: {
          gte: startDate,
          lt: endDate,
        },
      },
      // Otras configuraciones de búsqueda si es necesario
    });

    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
