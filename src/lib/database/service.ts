import { prisma } from "./init";
import * as bcrypt from "bcrypt";

export async function daftar(data: {
  fullname: string;
  phone: string;
  email: string;
  password: string;
}) {
  const checkUser = await prisma.users.count({
    where: {
      email: data.email,
    },
  });

  if (checkUser > 0) {
    return { status: false, statusCode: 400, message: "Email already Exist!" };
  } else {
    data.password = await bcrypt.hash(data.password, 10);

    try {
      await prisma.users.create({
        data,
      });
      return { status: true, statusCode: 200, message: "Register Success" };
    } catch (error) {
      return { status: false, statusCode: 400, message: "Register Failed" };
    }
  }
}

export async function login(data: { email: string }) {
  const user = await prisma.users.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    return user;
  } else {
    return null;
  }
}

export async function loginWithGoogle(data: any, callback: any) {
  const user = await prisma.users.findUnique({
    where: {
      email: data.email,
    }
  });

  if (user) {
    await prisma.users
      .update({
        where: {
          id: user.id,
        },
        data: data,
      })
      .then(() => {
        // Jika pengguna sudah memiliki nomor telepon, tambahkan ke data
        if (user.phone) {
          data.phone = user.phone || '';
        }
        callback({ status: true, data: data });
      });
  } else {
    await prisma.users
      .create({
        data,
      })
      .then(() => {
        callback({ status: true, data: data });
      });
  }
}

export async function addPhoneNumber(data: { phone: string; email: string }) {
  const user = await prisma.users.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    await prisma.users.update({
      where: {
        email: data.email,
      },
      data: {
        phone: data.phone,
      },
    });
    return { status: true, statusCode: 200, message: "Add Phone Success" };
  } else {
    return { status: false, statusCode: 400, message: "Add Phone Failed" };
  }
}
