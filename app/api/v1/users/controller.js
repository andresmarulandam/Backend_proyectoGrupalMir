import { prisma } from '../../../database.js';
import { parseOrderParams, parsePaginationParams } from '../../../utils.js';
import { signToken } from '../auth.js';
import {
  LoginSchema,
  UserSchema,
  encryptPassword,
  fields,
  verifyPassword,
} from './model.js';

export const signup = async (req, res, next) => {
  const { body = {} } = req; // Desestructurar los datos del cuerpo de la solicitud

  try {
    const { success, data, error } = await UserSchema.safeParseAsync(body);
    if (!success) {
      return next({
        message: 'Validator error',
        status: 400,
        error,
      });
    }

    const password = await encryptPassword(data.password);
    const user = await prisma.user.create({
      data: {
        ...data,
        password,
      },
      select: {
        fullName: true,
        email: true,
        createdAt: true,
      },
    });
    res.status(201);
    res.json({
      data: user,
    });
  } catch (error) {
    next(error);
  }

  // Devolver los datos recibidos en la respuesta
};
export const signin = async (req, res, next) => {
  const { body } = req;

  try {
    const { success, data, error } = await LoginSchema.safeParseAsync(body);
    if (!success) {
      return next({
        message: 'Validator error',
        status: 400,
        error,
      });
    }
    const { email, password } = data;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
        password: true,
        userType: true,
      },
    });

    if (user === null) {
      return next({
        message: 'Invalid email or password',
        status: 401,
      });
    }

    const passwordMatch = await verifyPassword(password, user.password);

    if (!passwordMatch) {
      return next({
        message: 'Invalid email or password',
        status: 401,
      });
    }
    const token = signToken({ id: user.id });

    res.json({
      message: 'Has iniciado sesión satisfactoriamente',
      data: {
        ...user,
        password: undefined,
      },
      meta: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
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
      prisma.user.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction, // esto es si por ejemplo orderBy tiene el valor de id el lo traduce como: id: direction
        },
        select: {
          fullName: true,
          email: true,
          createdAt: true,
        },
      }),
      prisma.user.count(),
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
  const { id } = params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },

      include: {
        _count: {
          select: {
            appointments: true,
          },
        },
      },
    });

    res.json({
      data: {
        ...user,
        id: undefined,
        password: undefined,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const update = async (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;

  try {
    const { success, data, error } = await UserSchema.partial().safeParseAsync(
      body,
    );
    if (!success) {
      return next({
        message: 'Validator error',
        status: 400,
        error,
      });
    }
    const result = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...data,
        updatedAt: new Date().toISOString(),
      },
      select: {
        fullName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
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
    await prisma.user.delete({
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
