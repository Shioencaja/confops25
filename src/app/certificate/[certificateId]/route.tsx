import PdfCertificate from "@/components/pdfCertitficate";
import { renderToStream } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import { client } from "@/app/api/client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ certificateId: string }> }
) {
  const { certificateId } = await params;

  try {
    console.log("Looking for participant with code:", certificateId);

    // Check environment variables
    if (!process.env.SUPABASEURL || !process.env.SUPABASEKEY) {
      console.error("Missing Supabase environment variables");
      return new NextResponse("Server configuration error", { status: 500 });
    }

    // Fetch participant from Supabase using the certificateId as the code
    const { data: participants, error } = await client
      .from("participants")
      .select("*")
      .eq("code", certificateId);

    console.log("Query result:", { participants, error });

    if (error) {
      console.error("Supabase error:", error);
      return new NextResponse(`Database error: ${error.message}`, {
        status: 500,
      });
    }

    if (!participants || participants.length === 0) {
      console.log("No participant found with code:", certificateId);

      // Debug: Check what participants exist
      const { data: allParticipants } = await client
        .from("participants")
        .select("id, name, code, type")
        .limit(5);

      console.log("Available participants:", allParticipants);

      return new NextResponse("Participant not found", { status: 404 });
    }

    // If multiple participants found, take the first one
    const participant = participants[0];
    console.log("Found participant:", participant);

    // Render the PDF certificate with the participant's data
    console.log("Rendering PDF for participant:", {
      name: participant.name,
      type: participant.type,
      code: participant.code,
    });

    try {
      const stream = await renderToStream(
        <PdfCertificate
          name={participant.name || "Unknown"}
          type={participant.type || "confops25"}
          code={participant.code || ""}
          subtype={participant.subtype || ""}
        />
      );

      console.log("PDF rendered successfully");

      return new NextResponse(stream as unknown as ReadableStream, {
        headers: {
          "Content-Type": "application/pdf",
        },
      });
    } catch (pdfError) {
      console.error("Error rendering PDF:", pdfError);
      return new NextResponse(
        `PDF rendering error: ${
          pdfError instanceof Error ? pdfError.message : String(pdfError)
        }`,
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error("Error in certificate route:", error);
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : undefined
    );
    return new NextResponse(
      `Internal server error: ${
        error instanceof Error ? error.message : String(error)
      }`,
      {
        status: 500,
      }
    );
  }
}
