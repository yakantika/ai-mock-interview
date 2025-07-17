import { cookies } from "next/headers";
import { auth } from "@/firebase/admin";

export async function isAuthenticated() {
  const cookieStore = await cookies(); // FIX: Await cookies()
  const session = cookieStore.get("session")?.value;
  console.log("SESSION COOKIE VALUE:", session); // Debug log
  if (!session) {
    console.log("NO SESSION COOKIE FOUND");
    return false;
  }
  try {
    const decoded = await auth.verifySessionCookie(session, true);
    console.log("SESSION COOKIE VERIFIED:", decoded); // Debug log
    return true;
  } catch (err) {
    console.log("SESSION COOKIE VERIFY FAILED:", err); // Debug log
    return false;
  }
}