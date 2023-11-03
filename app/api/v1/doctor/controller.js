import { prisma } from "../../../database.js";
import { parseOrderParams, parsePaginationParams } from "../../../utils.js";
import { DoctorSchema, fields } from "./model.js";

export const create = async (req, res, next) => {
  const { body = {} } = req; // Desestructurar los datos del cuerpo de la solicitud

  try {
    const { success, data, error } = await DoctorSchema.safeParseAsync(body);
    if (!success) {
      return next({
        message: "Validator error",
        status: 400,
        error,
      });
    }
    const result = await prisma.doctor.create({
      data,
    });
    res.status(201);
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }

  // Devolver los datos recibidos en la respuesta
};

export const all = async (req, res, next) => {
  const { query, params } = req;
  const { centerId, specialtyId } = params;
  const { limit, offset } = parsePaginationParams(query);
  const { orderBy, direction } = parseOrderParams({
    fields,
    ...query,
  });
  const currentPage = Math.floor(offset / limit) + 1;

  try {
    const [result, total] = await Promise.all([
      prisma.doctor.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction, // esto es si por ejemplo orderBy tiene el valor de id el lo traduce como: id: direction
        },
        where: {
          centerId,
          specialtyId,
        },
      }),
      prisma.doctor.count(),
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
    const result = await prisma.doctor.findUnique({
      where: {
        id: params.id,
      },
      include: {
        _count: {
          select: {
            Appointment: true,
          },
        },
      },
    });

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleFavorite = async (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;
  const { favorite } = body;

  try {
    await prisma.doctor.update({
      where: {
        id: id,
      },
      data: {
        favorite,
      },
    });
    res.json({
      id,
      favorite,
    });
  } catch (error) {
    next(error);
  }
};

export const getFavoriteDoctors = async (req, res, next) => {
  try {
    const favoriteDoctors = await prisma.doctor.findMany({
      where: {
        favorite: true, // Filtrar por los doctores favoritos
      },
    });

    res.status(200).json({ doctors: favoriteDoctors });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;

  try {
    const { success, data, error } =
      await DoctorSchema.partial().safeParseAsync(body);
    if (!success) {
      return next({
        message: "Validation error",
        status: 400,
        error,
      });
    }
    const result = await prisma.doctor.update({
      where: {
        id: id,
      },
      data: {
        ...data,
        updatedAt: new Date().toISOString(),
      },
    });
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const appointmentsToday = async (req, res, next) => {
  const { doctorId } = req.params;

  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0); // Establece la hora a 00:00:00 del día actual
    console.log(startOfToday);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999); // Establece la hora a 23:59:59 del día actual

    const citasHoyDoctor = await prisma.appointment.findMany({
      where: {
        doctorId,
        appointmentDate: {
          gte: startOfToday,
          lt: endOfToday,
        },
      },
      // Otras configuraciones de búsqueda si es necesario
    });

    res.json({
      citas: citasHoyDoctor,
      doctorId, // Agrega el ID del doctor si lo necesitas en la respuesta
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    await prisma.doctor.delete({
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
