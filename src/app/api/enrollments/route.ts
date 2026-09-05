
import { NextResponse } from "next/server";

import { siteConfig } from "@/config/site";
import {
  createClient,
  isSupabaseConfigured,
} from "@/lib/supabase/client";

type EnrollmentPayload = {
  courseSlug?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  education?: string;
  skillLevel?: string;
  learningGoal?: string;
  learningMode?: string;
  message?: string;
  termsAccepted?: boolean;

  // Honeypot field for basic bot protection.
  website?: string;
};

function clean(value: unknown, maxLength = 2000) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  if (!from) {
    throw new Error("EMAIL_FROM is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Resend request failed: ${response.status} ${errorText}`,
    );
  }

  return response.json();
}

export async function POST(request: Request) {
  try {
    /*
     * ---------------------------------------------------------
     * 1. Check Supabase configuration
     * ---------------------------------------------------------
     */

    if (!isSupabaseConfigured()) {
      console.error(
        "Enrollment API: Supabase environment variables are missing.",
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "The enrollment system is not configured correctly. Please contact support.",
        },
        { status: 500 },
      );
    }

    /*
     * ---------------------------------------------------------
     * 2. Parse request body
     * ---------------------------------------------------------
     */

    let body: EnrollmentPayload;

    try {
      body = (await request.json()) as EnrollmentPayload;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid enrollment request.",
        },
        { status: 400 },
      );
    }

    /*
     * ---------------------------------------------------------
     * 3. Honeypot protection
     * ---------------------------------------------------------
     */

    if (clean(body.website, 200)) {
      // Pretend the request succeeded so bots do not learn
      // that they triggered the honeypot.
      return NextResponse.json({
        success: true,
        message: "Enrollment request received.",
      });
    }

    /*
     * ---------------------------------------------------------
     * 4. Clean incoming data
     * ---------------------------------------------------------
     */

    const courseSlug = clean(body.courseSlug, 100);

    const fullName = clean(body.fullName, 120);

    const email = clean(body.email, 160).toLowerCase();

    const phone = clean(body.phone, 40);

    const education = clean(body.education, 500);

    const skillLevel = clean(body.skillLevel, 40);

    const learningGoal = clean(body.learningGoal, 2000);

    const learningMode = clean(body.learningMode, 80);

    const message = clean(body.message, 2000);

    const termsAccepted = body.termsAccepted === true;

    /*
     * ---------------------------------------------------------
     * 5. Validate course
     * ---------------------------------------------------------
     */

    if (!courseSlug) {
      return NextResponse.json(
        {
          success: false,
          message: "Course is required.",
        },
        { status: 400 },
      );
    }

    const course = siteConfig.courses.find(
      (item) => item.id === courseSlug,
    );

    if (!course) {
      return NextResponse.json(
        {
          success: false,
          message: "Selected course was not found.",
        },
        { status: 404 },
      );
    }

    /*
     * ---------------------------------------------------------
     * 6. Validate student information
     * ---------------------------------------------------------
     */

    if (fullName.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter your full name.",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    if (phone.length < 7) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid phone or WhatsApp number.",
        },
        { status: 400 },
      );
    }

    if (!education) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter your education/background.",
        },
        { status: 400 },
      );
    }

    if (!learningGoal) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please tell us your learning goal.",
        },
        { status: 400 },
      );
    }

    if (!termsAccepted) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please accept the terms before submitting.",
        },
        { status: 400 },
      );
    }

    /*
     * ---------------------------------------------------------
     * 7. Create Supabase client
     * ---------------------------------------------------------
     *
     * IMPORTANT:
     *
     * We intentionally DO NOT use:
     *
     *   .select("id").single()
     *
     * after the insert.
     *
     * Public anonymous users are allowed to INSERT enrollment
     * requests but should NOT need SELECT access to the
     * enrollments table.
     * ---------------------------------------------------------
     */

    const supabase = createClient();

    const { error: enrollmentError } = await supabase
      .from("enrollments")
      .insert({
        user_id: null,
        course_id: null,
        course_slug: course.id,

        full_name: fullName,
        email,
        phone,
        education,
        skill_level: skillLevel || null,
        learning_goal: learningGoal,
        learning_mode: learningMode || null,
        message: message || null,

        terms_accepted: true,
        status: "PENDING",
      });

    /*
     * ---------------------------------------------------------
     * 8. Handle database error
     * ---------------------------------------------------------
     */

    if (enrollmentError) {
      console.error(
        "==================================================",
      );
      console.error("MELVORIX ENROLLMENT DATABASE ERROR");
      console.error(
        "==================================================",
      );
      console.error("Message:", enrollmentError.message);
      console.error("Details:", enrollmentError.details);
      console.error("Hint:", enrollmentError.hint);
      console.error("Code:", enrollmentError.code);
      console.error(
        "Full error:",
        enrollmentError,
      );
      console.error(
        "==================================================",
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "We could not save your enrollment request. Please try again.",
        },
        { status: 500 },
      );
    }

    /*
     * ---------------------------------------------------------
     * 9. Prepare safe values for email HTML
     * ---------------------------------------------------------
     */

    const safeName = escapeHtml(fullName);

    const safeEmail = escapeHtml(email);

    const safePhone = escapeHtml(phone);

    const safeEducation = escapeHtml(education);

    const safeSkillLevel = escapeHtml(
      skillLevel || "Not specified",
    );

    const safeLearningGoal = escapeHtml(
      learningGoal,
    );

    const safeLearningMode = escapeHtml(
      learningMode || "Not specified",
    );

    const safeMessage = escapeHtml(
      message || "No message provided.",
    );

    const safeCourseName = escapeHtml(
      course.title,
    );

    /*
     * ---------------------------------------------------------
     * 10. Email configuration
     * ---------------------------------------------------------
     */

    const emailFrom = process.env.EMAIL_FROM;

    const notificationEmail =
      process.env.ENROLLMENT_NOTIFICATION_EMAIL;

    let studentEmailSent = false;

    let teamEmailSent = false;

    /*
     * ---------------------------------------------------------
     * 11. Send confirmation email to student
     * ---------------------------------------------------------
     *
     * IMPORTANT:
     * Email failure does NOT cancel the enrollment.
     * The enrollment has already been safely stored.
     * ---------------------------------------------------------
     */

    if (emailFrom) {
      try {
        await sendEmail({
          to: email,

          subject: `Enrollment Received — ${course.title}`,

          html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>Enrollment Received</title>
  </head>

  <body
    style="
      margin:0;
      padding:0;
      background:#f4f7fb;
      font-family:Arial,Helvetica,sans-serif;
    "
  >
    <div
      style="
        max-width:640px;
        margin:40px auto;
        background:#ffffff;
        border-radius:16px;
        padding:40px;
        box-sizing:border-box;
      "
    >
      <h1
        style="
          margin:0 0 16px;
          font-size:28px;
          line-height:1.2;
          color:#111827;
        "
      >
        Enrollment Request Received
      </h1>

      <p
        style="
          font-size:16px;
          line-height:1.7;
          color:#4b5563;
        "
      >
        Hi ${safeName},
      </p>

      <p
        style="
          font-size:16px;
          line-height:1.7;
          color:#4b5563;
        "
      >
        Thank you for your interest in
        <strong>${safeCourseName}</strong>
        at Melvorix Institute.
      </p>

      <div
        style="
          margin:28px 0;
          padding:20px;
          background:#f8fafc;
          border-radius:12px;
        "
      >
        <p
          style="
            margin:0 0 8px;
            color:#6b7280;
            font-size:13px;
            font-weight:600;
            letter-spacing:0.08em;
          "
        >
          COURSE
        </p>

        <p
          style="
            margin:0;
            font-size:18px;
            font-weight:700;
            color:#111827;
          "
        >
          ${safeCourseName}
        </p>
      </div>

      <p
        style="
          font-size:16px;
          line-height:1.7;
          color:#4b5563;
        "
      >
        Your enrollment request has been successfully
        received. Our team will review your information
        and contact you with the next steps.
      </p>

      <p
        style="
          font-size:16px;
          line-height:1.7;
          color:#4b5563;
        "
      >
        No account or registration is required at this stage.
      </p>

      <hr
        style="
          border:none;
          border-top:1px solid #e5e7eb;
          margin:32px 0;
        "
      />

      <p
        style="
          margin:0;
          font-size:14px;
          color:#6b7280;
        "
      >
        Melvorix Institute
      </p>
    </div>
  </body>
</html>
          `,
        });

        studentEmailSent = true;
      } catch (error) {
        console.error(
          "Student confirmation email failed:",
          error,
        );
      }
    }

    /*
     * ---------------------------------------------------------
     * 12. Send notification email to Melvorix team
     * ---------------------------------------------------------
     */

    if (notificationEmail && emailFrom) {
      try {
        await sendEmail({
          to: notificationEmail,

          subject: `New Enrollment — ${course.title}`,

          html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>New Enrollment</title>
  </head>

  <body
    style="
      margin:0;
      padding:0;
      background:#f4f7fb;
      font-family:Arial,Helvetica,sans-serif;
    "
  >
    <div
      style="
        max-width:700px;
        margin:40px auto;
        background:#ffffff;
        border-radius:16px;
        padding:40px;
        box-sizing:border-box;
      "
    >
      <h1
        style="
          margin:0 0 8px;
          font-size:28px;
          line-height:1.2;
          color:#111827;
        "
      >
        New Enrollment Request
      </h1>

      <p
        style="
          margin:0 0 30px;
          color:#6b7280;
          font-size:15px;
        "
      >
        A new public enrollment form has been submitted.
      </p>

      <div style="margin-bottom:28px;">
        <h2
          style="
            margin:0 0 8px;
            font-size:18px;
            color:#111827;
          "
        >
          Course
        </h2>

        <p
          style="
            margin:0;
            font-size:16px;
            color:#4b5563;
          "
        >
          ${safeCourseName}
        </p>
      </div>

      <div style="margin-bottom:28px;">
        <h2
          style="
            margin:0 0 12px;
            font-size:18px;
            color:#111827;
          "
        >
          Student Information
        </h2>

        <p
          style="
            margin:0;
            line-height:1.9;
            color:#4b5563;
            font-size:15px;
          "
        >
          <strong>Name:</strong>
          ${safeName}
          <br />

          <strong>Email:</strong>
          ${safeEmail}
          <br />

          <strong>Phone / WhatsApp:</strong>
          ${safePhone}
          <br />

          <strong>Education:</strong>
          ${safeEducation}
          <br />

          <strong>Skill Level:</strong>
          ${safeSkillLevel}
          <br />

          <strong>Learning Goal:</strong>
          ${safeLearningGoal}
          <br />

          <strong>Learning Mode:</strong>
          ${safeLearningMode}
        </p>
      </div>

      <div>
        <h2
          style="
            margin:0 0 12px;
            font-size:18px;
            color:#111827;
          "
        >
          Message
        </h2>

        <p
          style="
            margin:0;
            line-height:1.8;
            color:#4b5563;
            font-size:15px;
          "
        >
          ${safeMessage}
        </p>
      </div>

      <hr
        style="
          border:none;
          border-top:1px solid #e5e7eb;
          margin:32px 0;
        "
      />

      <p
        style="
          margin:0;
          font-size:13px;
          color:#9ca3af;
        "
      >
        Public enrollment submitted through
        Melvorix Institute website.
      </p>
    </div>
  </body>
</html>
          `,
        });

        teamEmailSent = true;
      } catch (error) {
        console.error(
          "Team notification email failed:",
          error,
        );
      }
    }

    /*
     * ---------------------------------------------------------
     * 13. Successful response
     * ---------------------------------------------------------
     */

    return NextResponse.json({
      success: true,

      message:
        "Enrollment request received successfully.",

      emails: {
        student: studentEmailSent,
        team: teamEmailSent,
      },
    });
  } catch (error) {
    /*
     * ---------------------------------------------------------
     * Unexpected API error
     * ---------------------------------------------------------
     */

    console.error(
      "==================================================",
    );
    console.error("MELVORIX ENROLLMENT API ERROR");
    console.error(
      "==================================================",
    );
    console.error(error);
    console.error(
      "==================================================",
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while processing your enrollment.",
      },
      { status: 500 },
    );
  }
}

