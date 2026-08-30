-- Administrative identity and least-privilege access model.
-- This migration does not create any ordinary user accounts from imported contacts.
CREATE TABLE IF NOT EXISTS admin_accounts (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT,
  status TEXT NOT NULL DEFAULT 'invited' CHECK (status IN ('invited','active','suspended','revoked')),
  invited_by TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_roles (
  id TEXT PRIMARY KEY,
  role_key TEXT NOT NULL UNIQUE CHECK (role_key IN ('super_admin','administrator','moderator','benefits_officer','read_only')),
  description TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_account_roles (
  admin_account_id TEXT NOT NULL REFERENCES admin_accounts(id),
  role_id TEXT NOT NULL REFERENCES admin_roles(id),
  assigned_by TEXT NOT NULL,
  assigned_at TEXT NOT NULL,
  revoked_at TEXT,
  PRIMARY KEY (admin_account_id, role_id)
);

CREATE TABLE IF NOT EXISTS admin_permissions (
  permission_key TEXT PRIMARY KEY,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_role_permissions (
  role_id TEXT NOT NULL REFERENCES admin_roles(id),
  permission_key TEXT NOT NULL REFERENCES admin_permissions(permission_key),
  PRIMARY KEY (role_id, permission_key)
);

CREATE INDEX IF NOT EXISTS idx_admin_account_roles_account ON admin_account_roles(admin_account_id);
CREATE INDEX IF NOT EXISTS idx_admin_role_permissions_role ON admin_role_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_admin_accounts_status ON admin_accounts(status);

INSERT OR IGNORE INTO admin_roles (id, role_key, description, created_at) VALUES
  ('role_super_admin','super_admin','Full platform control, uploaded data, role management, exports, and audit review.',datetime('now')),
  ('role_administrator','administrator','Operational approvals, moderation, stewardship, benefits, and assigned records.',datetime('now')),
  ('role_moderator','moderator','Youth Voice, comments, stories, and public content moderation.',datetime('now')),
  ('role_benefits_officer','benefits_officer','Voucher applications and benefit fulfilment fields only.',datetime('now')),
  ('role_read_only','read_only','Approved reports and dashboards without editing or exporting.',datetime('now'));

INSERT OR IGNORE INTO admin_permissions (permission_key, description) VALUES
  ('uploaded_data.view','View uploaded contact/applicant records'),
  ('uploaded_data.edit','Correct uploaded contact/applicant records'),
  ('uploaded_data.merge','Merge duplicate contact records'),
  ('uploaded_data.export','Export uploaded records with a recorded reason'),
  ('roles.manage','Create, suspend, and assign administrative roles'),
  ('audit.view','View administrative audit events'),
  ('content.moderate','Moderate Youth Voice, stories, and comments'),
  ('benefits.review','Review benefit and voucher applications'),
  ('reports.view','View operational reports');

INSERT OR IGNORE INTO admin_role_permissions (role_id, permission_key) VALUES
  ('role_super_admin','uploaded_data.view'),('role_super_admin','uploaded_data.edit'),('role_super_admin','uploaded_data.merge'),('role_super_admin','uploaded_data.export'),('role_super_admin','roles.manage'),('role_super_admin','audit.view'),('role_super_admin','content.moderate'),('role_super_admin','benefits.review'),('role_super_admin','reports.view'),
  ('role_administrator','content.moderate'),('role_administrator','benefits.review'),('role_administrator','reports.view'),
  ('role_moderator','content.moderate'),('role_moderator','reports.view'),
  ('role_benefits_officer','benefits.review'),('role_benefits_officer','reports.view'),
  ('role_read_only','reports.view');
