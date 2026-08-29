-- DYC canonical contact model. Existing source data never creates users or consent.
CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  date_of_birth TEXT,
  sex TEXT,
  occupation TEXT,
  annual_income TEXT,
  lga_lcda TEXT,
  record_type TEXT NOT NULL DEFAULT 'contact_applicant',
  user_account_status TEXT NOT NULL DEFAULT 'not_created',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email) WHERE email IS NOT NULL AND email <> '';
CREATE UNIQUE INDEX IF NOT EXISTS idx_contacts_phone ON contacts(phone) WHERE phone IS NOT NULL AND phone <> '';

CREATE TABLE IF NOT EXISTS source_records (
  id TEXT PRIMARY KEY,
  contact_id TEXT NOT NULL REFERENCES contacts(id),
  source_file TEXT NOT NULL,
  source_row_reference TEXT,
  original_lga TEXT,
  imported_at TEXT NOT NULL,
  UNIQUE(contact_id, source_file, source_row_reference)
);

CREATE TABLE IF NOT EXISTS programme_participation (
  id TEXT PRIMARY KEY,
  contact_id TEXT NOT NULL REFERENCES contacts(id),
  programme_name TEXT NOT NULL,
  application_date TEXT,
  source_record_id TEXT REFERENCES source_records(id),
  verification_status TEXT NOT NULL DEFAULT 'unverified'
);

CREATE TABLE IF NOT EXISTS consent_records (
  id TEXT PRIMARY KEY,
  contact_id TEXT NOT NULL REFERENCES contacts(id),
  purpose TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'not_collected',
  wording_version TEXT,
  captured_at TEXT,
  source TEXT
);

CREATE TABLE IF NOT EXISTS audit_events (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  actor_id TEXT,
  batch_reference TEXT,
  contact_id TEXT REFERENCES contacts(id),
  details_json TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_source_records_contact ON source_records(contact_id);
CREATE INDEX IF NOT EXISTS idx_participation_contact ON programme_participation(contact_id);
CREATE INDEX IF NOT EXISTS idx_consent_contact_purpose ON consent_records(contact_id, purpose);
CREATE INDEX IF NOT EXISTS idx_audit_batch ON audit_events(batch_reference);
