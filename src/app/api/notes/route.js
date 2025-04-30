import prisma from "@/lib/prisma";
import {
  createNoteSchema,
  deleteNoteSchema,
  updateNoteSchema,
} from "@/lib/validation/notes";
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const notes = await prisma.notes.findMany();
    return Response.json(
      {
        code: 200,
        message: "Anda Berhasil Mengakses API Notes",
        data: { notes },
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { code: 500, message: "Anda Gagal Mengakses API Notes" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const validate = createNoteSchema.safeParse(body);

    if (!validate.success) {
      const messages = validate.error.errors.map((error) => ({
        field: error.path.join("."),
        message: error.message,
      }));
      return Response.json({ code: 400, errors: messages }, { status: 400 });
    }

    const note = await prisma.notes.create({
      data: {
        id_user: body.id_user,
        title: body.title,
        content: body.content,
      },
    });

    if (!note) {
      return Response.json(
        { code: 500, message: "Anda Gagal Membuat Notes Notes" },
        { status: 500 }
      );
    }

    return Response.json(
      { code: 200, message: "Anda Berhasil Mengakses API Notes", data: note },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { code: 500, message: "Anda Gagal Mengakses API Notes" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const validate = updateNoteSchema.safeParse(body);

    if (!validate.success) {
      const messages = validate.error.errors.map((error) => ({
        field: error.path.join("."),
        message: error.message,
      }));
      return Response.json({ code: 400, errors: messages }, { status: 400 });
    }

    const existingNote = await prisma.notes.findUnique({
      where: {
        id_notes: validate.data.id_notes,
      },
    });

    if (!existingNote) {
      return Response.json(
        { code: 404, message: "Notes not found" },
        { status: 404 }
      );
    }

    const updatedNote = await prisma.notes.update({
      where: {
        id_notes: validate.data.id_notes,
      },
      data: {
        id_user: validate.data.id_user,
        title: validate.data.title,
        content: validate.data.content,
        updated_at: new Date(),
      },
    });

    return Response.json(
      { code: 200, message: "Anda Berhasil Update Notes", data: updatedNote },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { code: 500, message: "Anda Gagal Update Notes" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const validate = deleteNoteSchema.safeParse(body);

    if (!validate.success) {
      const messages = validate.error.errors.map((error) => ({
        field: error.path.join("."),
        message: error.message,
      }));
      return Response.json({ code: 400, errors: messages }, { status: 400 });
    }

    const deleteNotes = await prisma.notes.delete({
      where: {
        id_notes: validate.data.id_notes,
      },
    });

    if (!deleteNotes) {
      return Response.json(
        { code: 404, message: "Notes not found" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        code: 200,
        message: "Anda Berhasil Menghapus Notes",
        data: { deleteNotes },
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { code: 500, message: "Anda Gagal Mengakses API Notes" },
      { status: 500 }
    );
  }
}
