import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/(back-end)/auth";
export const dynamic = "force-dynamic";

import {
  createProjectSchema,
  updateProjectSchema,
  deleteProjectSchema,
} from "@/lib/validation/resultProject";

export async function GET(request) {
  try {
    let userId = null;

    const authHeader = request.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      try {
        const user = verifyToken(authHeader);
        userId = user.userId;
      } catch {
        // Token invalid → anggap sebagai user publik
      }
    }

    // Query resultProject tanpa include reviewProject detail
    const projects = await prisma.resultProject.findMany();

    if (!userId) {
      // User publik, langsung return semua projects tanpa review info
      const projectsPublic = projects.map((p) => ({
        ...p,
        userReview: null,
      }));

      return Response.json(
        {
          code: 200,
          message: "Berhasil mendapatkan data project",
          data: { projects: projectsPublic },
        },
        { status: 200 }
      );
    }

    // Jika user login, ambil review user untuk semua project sekaligus
    const userReviews = await prisma.reviewProject.findMany({
      where: { reviewer_id: userId },
      select: { id_project: true, score: true },
    });

    // Buat map id_project -> score agar mudah lookup
    const reviewMap = new Map(userReviews.map((r) => [r.id_project, r.score]));

    // Gabungkan data project dengan info review user
    const projectsWithReviewFlag = projects.map((project) => ({
      ...project,
      userReview: reviewMap.has(project.id_project)
        ? { reviewed: true, score: reviewMap.get(project.id_project) }
        : { reviewed: false },
    }));

    return Response.json(
      {
        code: 200,
        message: "Berhasil mendapatkan data project",
        data: { projects: projectsWithReviewFlag },
      },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { code: 500, message: "Gagal mendapatkan data project" },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");
    const user = verifyToken(authHeader);

    const body = await request.json();
    const validate = createProjectSchema.safeParse(body);

    if (!validate.success) {
      const messages = validate.error.errors.map((error) => ({
        field: error.path.join("."),
        message: error.message,
      }));
      return Response.json({ code: 400, errors: messages }, { status: 400 });
    }

    const existingProject = await prisma.resultProject.findUnique({
      where: { nim_mhs: validate.data.nim },
    });

    if (existingProject) {
      return Response.json(
        { code: 409, message: "Project dengan NIM ini sudah ada" },
        { status: 409 }
      );
    }

    const project = await prisma.resultProject.create({
      data: {
        id_user: user.userId,
        name_mhs: validate.data.name,
        nim_mhs: validate.data.nim,
        status: validate.data.status,
        profile_link: validate.data.profileLink,
        project_link: validate.data.websiteLink,
        image_project_link: validate.data.imageUrl,
      },
    });

    return Response.json(
      { code: 200, message: "Berhasil membuat project", data: project },
      { status: 200 }
    );
  } catch (error) {
    const status = error.message.includes("Unauthorized") ? 401 : 500;
    return Response.json({ code: status, message: error.message }, { status });
  }
}



export async function PUT(request) {
  try {
    const authHeader = request.headers.get("authorization");
    const user = verifyToken(authHeader);

    const body = await request.json();
    const validate = updateProjectSchema.safeParse(body);

    if (!validate.success) {
      const messages = validate.error.errors.map((error) => ({
        field: error.path.join("."),
        message: error.message,
      }));
      return Response.json({ code: 400, errors: messages }, { status: 400 });
    }

    const existing = await prisma.resultProject.findUnique({
      where: { id_project: validate.data.id_project },
    });

    if (!existing) {
      return Response.json(
        { code: 404, message: "Project tidak ditemukan" },
        { status: 404 }
      );
    }

    if (existing.id_user !== user.userId) {
      return Response.json(
        { code: 403, message: "Forbidden: Anda tidak memiliki akses" },
        { status: 403 }
      );
    }

    const updated = await prisma.resultProject.update({
      where: { id_project: validate.data.id_project },
      data: {
        name_mhs: validate.data.name,
        nim_mhs: validate.data.nim,
        status: validate.data.status,
        profile_link: validate.data.profileLink,
        project_link: validate.data.websiteLink,
        image_project_link: validate.data.imageUrl,
      },
    });

    return Response.json(
      { code: 200, message: "Berhasil update project", data: updated },
      { status: 200 }
    );
  } catch (error) {
    const status = error.message.includes("Unauthorized") ? 401 : 500;
    return Response.json({ code: status, message: error.message }, { status });
  }
}

export async function DELETE(request) {
  try {
    const authHeader = request.headers.get("authorization");
    const user = verifyToken(authHeader);

    const body = await request.json();
    const validate = deleteProjectSchema.safeParse(body);

    if (!validate.success) {
      const messages = validate.error.errors.map((error) => ({
        field: error.path.join("."),
        message: error.message,
      }));
      return Response.json({ code: 400, errors: messages }, { status: 400 });
    }

    const existing = await prisma.resultProject.findUnique({
      where: { id_project: validate.data.id_project },
    });

    if (!existing) {
      return Response.json(
        { code: 404, message: "Project tidak ditemukan" },
        { status: 404 }
      );
    }

    if (existing.id_user !== user.userId) {
      return Response.json(
        { code: 403, message: "Forbidden: Anda tidak memiliki akses" },
        { status: 403 }
      );
    }

    await prisma.resultProject.delete({
      where: { id_project: validate.data.id_project },
    });

    return Response.json(
      { code: 200, message: "Berhasil menghapus project" },
      { status: 200 }
    );
  } catch (error) {
    const status = error.message.includes("Unauthorized") ? 401 : 500;
    return Response.json({ code: status, message: error.message }, { status });
  }
}
