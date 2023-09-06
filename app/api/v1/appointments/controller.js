import { prisma } from "../../../database.js";
import { parsePaginationParams } from "../../../utils.js";

export const create = async (req, res, next) => {
  const { body = {} } = req; // Desestructurar los datos del cuerpo de la solicitud

  try {
    const result = await prisma.appointment.create({
      data: body,
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
  const { query } = req;
  const { limit, offset } = parsePaginationParams(query);
  const currentPage = Math.floor(offset / limit) + 1;

  try {
    const [result, total] = await Promise.all([
      prisma.appointment.findMany({
        skip: offset,
        take: limit,
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
    const result = await prisma.appointment.update({
      where: {
        id: id,
      },
      data: body,
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
