import { redirect } from "next/navigation";

// Redirect to the default view (Today's Schedule)
export default function InstructorPage() {
  redirect("/instructor/schedule");
}
