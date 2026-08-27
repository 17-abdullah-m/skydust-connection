import { redirect } from "next/navigation";

export default function ManagerLoginRedirect() {
  redirect("/login");
}
