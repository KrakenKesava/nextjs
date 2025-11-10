import ClientChangePassword from "@/app/changepassword/clientchangepassword";

export default function Page({ searchParams }: { searchParams?: { token?: string | string[] } }) {
  const raw = searchParams?.token;
  const token = Array.isArray(raw) ? raw[0] : raw ?? null;
  return <ClientChangePassword token={token} />;
}