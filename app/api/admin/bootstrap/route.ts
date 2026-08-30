import { env } from "cloudflare:workers";

const OWNER_EMAIL = "credithubng@gmail.com";
const FIRST_SUPER_ADMIN = "admin@tact.ng";

export async function POST(request: Request) {
  const ownerEmail = request.headers.get("oai-authenticated-user-email")?.trim().toLowerCase();
  if (ownerEmail !== OWNER_EMAIL) return Response.json({ error: "Site owner verification required" }, { status: 403 });
  const now = new Date().toISOString();
  const accountId = crypto.randomUUID();
  await env.DB.prepare("INSERT INTO admin_accounts (id,email,display_name,status,invited_by,created_at,updated_at) VALUES (?,?,?,?,?,?,?) ON CONFLICT(email) DO UPDATE SET status='active', updated_at=excluded.updated_at").bind(accountId, FIRST_SUPER_ADMIN, "DYC Super Admin", "active", ownerEmail, now, now).run();
  const account = await env.DB.prepare("SELECT id FROM admin_accounts WHERE lower(email)=?").bind(FIRST_SUPER_ADMIN).first<{ id: string }>();
  if (!account) return Response.json({ error: "Unable to create administrator" }, { status: 500 });
  await env.DB.prepare("INSERT OR IGNORE INTO admin_account_roles (admin_account_id,role_id,assigned_by,assigned_at) VALUES (?,?,?,?,?)").bind(account.id, "role_super_admin", ownerEmail, now).run();
  await env.DB.prepare("INSERT INTO audit_events (id,event_type,actor_id,details_json,created_at) VALUES (?,?,?,?,?)").bind(crypto.randomUUID(), "super_admin_bootstrapped", ownerEmail, JSON.stringify({ email: FIRST_SUPER_ADMIN }), now).run();
  return Response.json({ status: "active", email: FIRST_SUPER_ADMIN, role: "super_admin", requiresSeparateAdminAuthentication: true });
}
