import { prisma } from "../../../database.js";
import { parseOrderParams, parsePaginationParams } from "../../../utils.js";
import { PaymentSchema, fields } from "./model.js";

export const create = async (req, res, next) => {
  const { body = {} } = req; // Desestructurar los datos del cuerpo de la solicitud

  try {
    const { success, data, error } = await PaymentSchema.safeParseAsync(body);
    if (!success) {
      return next({
        message: "Validation error",
        status: 400,
        error,
      });
    }
    const result = await prisma.payment.create({
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
  const { query } = req;
  const { limit, offset } = parsePaginationParams(query);
  const { orderBy, direction } = parseOrderParams({
    fields,
    ...query,
  });
  const currentPage = Math.floor(offset / limit) + 1;

  try {
    const [result, total] = await Promise.all([
      prisma.payment.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction, // esto es si por ejemplo orderBy tiene el valor de id el lo traduce como: id: direction
        },
      }),
      prisma.payment.count(),
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
    const result = await prisma.payment.findUnique({
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
      await PaymentSchema.partial().safeParseAsync(body);
    if (!success) {
      return next({
        message: "Validation error",
        status: 400,
        error,
      });
    }
    const result = await prisma.payment.update({
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

export const remove = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    await prisma.payment.delete({
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
