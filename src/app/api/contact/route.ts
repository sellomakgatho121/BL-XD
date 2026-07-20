import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/db/store";
import { sendEmail, renderContactNotification } from "@/lib/email/service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, businessName, businessType, budgetRange, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const submission = {
      id: store.generateId(),
      name,
      email,
      businessName: businessName || "",
      businessType: businessType || "",
      budgetRange: budgetRange || "",
      message,
      status: "new" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.contacts.set(submission.id, submission);

    // Create notification for admins
    const admin = Array.from(store.profiles.values()).find(
      (p) => p.role === "superadmin" || p.role === "admin"
    );
    if (admin) {
      const notif = {
        id: store.generateId(),
        userId: admin.id,
        type: "lead" as const,
        title: "New Lead",
        message: `New contact form submission from ${name}`,
        data: { leadId: submission.id, name, email },
        read: false,
        createdAt: new Date(),
      };
      store.notifications.set(notif.id, notif);
    }

    // Send email notification
    const { subject, html } = renderContactNotification(name, email, message, businessName);
    await sendEmail({
      to: "sellomakgatho121@gmail.com",
      subject,
      html,
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch (e) {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}

export async function GET() {
  const submissions = Array.from(store.contacts.values())
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return NextResponse.json(submissions);
}
