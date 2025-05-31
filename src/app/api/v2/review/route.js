import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/(back-end)/auth";
import { z } from "zod";

export const dynamic = "force-dynamic";

// Validasi body pakai Zod
const reviewSchema = z.object({
  id_project: z.string().min(1, "id_project wajib diisi"),
  score: z.number().min(0, "Nilai minimal 0").max(5, "Nilai maksimal 5"),
});

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");
    const user = verifyToken(authHeader);

    const body = await request.json();
    const parsed = reviewSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          code: 400,
          message: "Validasi gagal",
          errors: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { id_project, score } = parsed.data;

    const project = await prisma.resultProject.findUnique({
      where: { id_project },
    });

    if (!project) {
      return Response.json(
        { code: 404, message: "Project tidak ditemukan" },
        { status: 404 }
      );
    }

    // Cek apakah review sudah pernah dibuat
    const existingReview = await prisma.reviewProject.findFirst({
      where: {
        id_project,
        reviewer_id: user.userId,
      },
    });

    let review;

    if (existingReview) {
      // Update review
      review = await prisma.reviewProject.update({
        where: {
          id_review: existingReview.id_review,
        },
        data: {
          score,
          reviewed_at: new Date(),
        },
      });
    } else {
      // Buat review baru
      review = await prisma.reviewProject.create({
        data: {
          id_project,
          reviewer_id: user.userId,
          score,
        },
      });
    }

    // Hitung ulang skor rata-rata & total review
    const reviews = await prisma.reviewProject.findMany({
      where: { id_project },
      select: { score: true },
    });

    const total = reviews.length;
    const sum = reviews.reduce((acc, cur) => acc + cur.score, 0);

    // Bulatkan rata-rata ke 2 digit di belakang koma
    const average = Math.round((sum / total) * 100) / 100;

    await prisma.resultProject.update({
      where: { id_project },
      data: {
        total_reviews: total,
        average_score: average,
      },
    });

    return Response.json(
      {
        code: 200,
        message: existingReview
          ? "Review berhasil diperbarui"
          : "Review berhasil ditambahkan",
        data: review,
      },
      { status: 200 }
    );
  } catch (error) {
    const status =
      error.message.includes("Unauthorized") ||
      error.message.includes("Invalid or expired token")
        ? 401
        : 500;

    return Response.json({ code: status, message: error.message }, { status });
  }
}
