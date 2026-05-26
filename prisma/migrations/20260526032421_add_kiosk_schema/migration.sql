-- CreateEnum
CREATE TYPE "Badge" AS ENUM ('ready', 'indent', 'hot');

-- CreateEnum
CREATE TYPE "UnitStatus" AS ENUM ('available', 'indent', 'sold');

-- CreateEnum
CREATE TYPE "PriceDisplayMode" AS ENUM ('fixed', 'free', 'contact_sales');

-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('text', 'tel', 'email', 'textarea', 'select', 'radio', 'checkbox');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('KPR Bank', 'Cash Keras', 'Cash Bertahap');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('new', 'contacted', 'negotiating', 'booked', 'cancelled');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('superadmin', 'admin', 'viewer');

-- CreateTable
CREATE TABLE "media_library" (
    "id" SERIAL NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "mime_type" VARCHAR(100) NOT NULL,
    "file_size_kb" INTEGER NOT NULL,
    "alt_text" VARCHAR(255),
    "uploaded_by_id" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kiosk_config" (
    "id" SERIAL NOT NULL,
    "kiosk_id" VARCHAR(50) NOT NULL,
    "site_name" VARCHAR(100) NOT NULL,
    "tagline" VARCHAR(200),
    "logo_media_id" INTEGER,
    "hero_media_id" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "kiosk_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kiosk_stats" (
    "id" SERIAL NOT NULL,
    "kiosk_config_id" INTEGER NOT NULL,
    "value" VARCHAR(20) NOT NULL,
    "label" VARCHAR(50) NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "kiosk_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_sections" (
    "id" SERIAL NOT NULL,
    "kiosk_config_id" INTEGER NOT NULL,
    "page_slug" VARCHAR(50) NOT NULL,
    "section_key" VARCHAR(100) NOT NULL,
    "title" VARCHAR(255),
    "subtitle" TEXT,
    "media_id" INTEGER,
    "extra_content" JSONB,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_visible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "page_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "house_types" (
    "id" SERIAL NOT NULL,
    "card_media_id" INTEGER,
    "cluster" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "building_area" INTEGER NOT NULL,
    "land_area" INTEGER NOT NULL,
    "floors" INTEGER NOT NULL DEFAULT 1,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "base_price" BIGINT NOT NULL,
    "badge" "Badge" NOT NULL,
    "badge_label" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "house_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wall_colors" (
    "id" SERIAL NOT NULL,
    "house_type_id" INTEGER NOT NULL,
    "hex" VARCHAR(7) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "wall_colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "house_facilities" (
    "id" SERIAL NOT NULL,
    "house_type_id" INTEGER NOT NULL,
    "label" VARCHAR(100) NOT NULL,
    "icon_media_id" INTEGER,

    CONSTRAINT "house_facilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "units" (
    "id" SERIAL NOT NULL,
    "house_type_id" INTEGER NOT NULL,
    "card_media_id" INTEGER,
    "code" VARCHAR(20) NOT NULL,
    "block" VARCHAR(100) NOT NULL,
    "facing" VARCHAR(20),
    "status" "UnitStatus" NOT NULL DEFAULT 'available',
    "price" BIGINT NOT NULL,
    "notes" VARCHAR(200),
    "is_featured" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addon_options" (
    "id" SERIAL NOT NULL,
    "icon_media_id" INTEGER,
    "option_key" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "price" BIGINT NOT NULL DEFAULT 0,
    "price_display_mode" "PriceDisplayMode" NOT NULL DEFAULT 'fixed',
    "contact_label" VARCHAR(100),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "addon_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_schema" (
    "id" SERIAL NOT NULL,
    "kiosk_config_id" INTEGER NOT NULL,
    "form_key" VARCHAR(50) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "subtitle" VARCHAR(255),
    "disclaimer_text" TEXT,
    "cta_label" VARCHAR(50) NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "form_schema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_fields" (
    "id" SERIAL NOT NULL,
    "form_schema_id" INTEGER NOT NULL,
    "field_key" VARCHAR(50) NOT NULL,
    "label" VARCHAR(100) NOT NULL,
    "placeholder" VARCHAR(150),
    "field_type" "FieldType" NOT NULL,
    "is_required" BOOLEAN NOT NULL DEFAULT false,
    "options" JSONB,
    "validation_rules" JSONB,
    "col_span" INTEGER NOT NULL DEFAULT 1,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "form_fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agents" (
    "id" SERIAL NOT NULL,
    "photo_media_id" INTEGER,
    "name" VARCHAR(100) NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "phone" VARCHAR(30),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_walkin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "agents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" SERIAL NOT NULL,
    "booking_code" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "kiosk_config_id" INTEGER,
    "full_name" VARCHAR(200) NOT NULL,
    "phone" VARCHAR(30) NOT NULL,
    "email" VARCHAR(200),
    "agent_id" INTEGER,
    "domicile" VARCHAR(100),
    "unit_id" INTEGER NOT NULL,
    "base_price" BIGINT NOT NULL,
    "extra_price" BIGINT NOT NULL DEFAULT 0,
    "total_price" BIGINT NOT NULL,
    "payment_method" "PaymentMethod" NOT NULL,
    "form_answers" JSONB NOT NULL DEFAULT '{}',
    "status" "LeadStatus" NOT NULL DEFAULT 'new',
    "notes" TEXT,
    "contacted_at" TIMESTAMPTZ,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lead_addons" (
    "id" SERIAL NOT NULL,
    "lead_id" INTEGER NOT NULL,
    "addon_option_id" INTEGER NOT NULL,
    "price_snapshot" BIGINT NOT NULL,

    CONSTRAINT "lead_addons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kiosk_sessions" (
    "id" SERIAL NOT NULL,
    "kiosk_config_id" INTEGER NOT NULL,
    "session_token" VARCHAR(100) NOT NULL,
    "selection_state" JSONB NOT NULL DEFAULT '{}',
    "step_reached" INTEGER NOT NULL DEFAULT 1,
    "started_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_active_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "kiosk_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "full_name" VARCHAR(100) NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'admin',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_login_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" SERIAL NOT NULL,
    "admin_user_id" INTEGER NOT NULL,
    "action" VARCHAR(50) NOT NULL,
    "entity_type" VARCHAR(50) NOT NULL,
    "entity_id" INTEGER NOT NULL,
    "before_state" JSONB,
    "after_state" JSONB,
    "ip_address" VARCHAR(45),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "kiosk_config_kiosk_id_key" ON "kiosk_config"("kiosk_id");

-- CreateIndex
CREATE INDEX "page_sections_kiosk_config_id_page_slug_idx" ON "page_sections"("kiosk_config_id", "page_slug");

-- CreateIndex
CREATE UNIQUE INDEX "page_sections_kiosk_config_id_page_slug_section_key_key" ON "page_sections"("kiosk_config_id", "page_slug", "section_key");

-- CreateIndex
CREATE INDEX "house_types_is_active_sort_order_idx" ON "house_types"("is_active", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "units_code_key" ON "units"("code");

-- CreateIndex
CREATE INDEX "units_house_type_id_idx" ON "units"("house_type_id");

-- CreateIndex
CREATE INDEX "units_status_idx" ON "units"("status");

-- CreateIndex
CREATE UNIQUE INDEX "addon_options_option_key_key" ON "addon_options"("option_key");

-- CreateIndex
CREATE INDEX "addon_options_is_active_sort_order_idx" ON "addon_options"("is_active", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "form_schema_form_key_key" ON "form_schema"("form_key");

-- CreateIndex
CREATE UNIQUE INDEX "form_fields_form_schema_id_field_key_key" ON "form_fields"("form_schema_id", "field_key");

-- CreateIndex
CREATE UNIQUE INDEX "agents_code_key" ON "agents"("code");

-- CreateIndex
CREATE UNIQUE INDEX "leads_booking_code_key" ON "leads"("booking_code");

-- CreateIndex
CREATE INDEX "leads_booking_code_idx" ON "leads"("booking_code");

-- CreateIndex
CREATE INDEX "leads_status_idx" ON "leads"("status");

-- CreateIndex
CREATE INDEX "leads_agent_id_idx" ON "leads"("agent_id");

-- CreateIndex
CREATE INDEX "leads_unit_id_idx" ON "leads"("unit_id");

-- CreateIndex
CREATE INDEX "leads_kiosk_config_id_idx" ON "leads"("kiosk_config_id");

-- CreateIndex
CREATE INDEX "leads_created_at_idx" ON "leads"("created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "lead_addons_lead_id_addon_option_id_key" ON "lead_addons"("lead_id", "addon_option_id");

-- CreateIndex
CREATE UNIQUE INDEX "kiosk_sessions_session_token_key" ON "kiosk_sessions"("session_token");

-- CreateIndex
CREATE INDEX "kiosk_sessions_kiosk_config_id_idx" ON "kiosk_sessions"("kiosk_config_id");

-- CreateIndex
CREATE INDEX "kiosk_sessions_last_active_at_idx" ON "kiosk_sessions"("last_active_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- CreateIndex
CREATE INDEX "audit_logs_admin_user_id_idx" ON "audit_logs"("admin_user_id");

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_entity_id_idx" ON "audit_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs"("created_at" DESC);

-- AddForeignKey
ALTER TABLE "media_library" ADD CONSTRAINT "media_library_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kiosk_config" ADD CONSTRAINT "kiosk_config_logo_media_id_fkey" FOREIGN KEY ("logo_media_id") REFERENCES "media_library"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kiosk_config" ADD CONSTRAINT "kiosk_config_hero_media_id_fkey" FOREIGN KEY ("hero_media_id") REFERENCES "media_library"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kiosk_stats" ADD CONSTRAINT "kiosk_stats_kiosk_config_id_fkey" FOREIGN KEY ("kiosk_config_id") REFERENCES "kiosk_config"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_sections" ADD CONSTRAINT "page_sections_kiosk_config_id_fkey" FOREIGN KEY ("kiosk_config_id") REFERENCES "kiosk_config"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_sections" ADD CONSTRAINT "page_sections_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media_library"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "house_types" ADD CONSTRAINT "house_types_card_media_id_fkey" FOREIGN KEY ("card_media_id") REFERENCES "media_library"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wall_colors" ADD CONSTRAINT "wall_colors_house_type_id_fkey" FOREIGN KEY ("house_type_id") REFERENCES "house_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "house_facilities" ADD CONSTRAINT "house_facilities_house_type_id_fkey" FOREIGN KEY ("house_type_id") REFERENCES "house_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "house_facilities" ADD CONSTRAINT "house_facilities_icon_media_id_fkey" FOREIGN KEY ("icon_media_id") REFERENCES "media_library"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_house_type_id_fkey" FOREIGN KEY ("house_type_id") REFERENCES "house_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_card_media_id_fkey" FOREIGN KEY ("card_media_id") REFERENCES "media_library"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addon_options" ADD CONSTRAINT "addon_options_icon_media_id_fkey" FOREIGN KEY ("icon_media_id") REFERENCES "media_library"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_schema" ADD CONSTRAINT "form_schema_kiosk_config_id_fkey" FOREIGN KEY ("kiosk_config_id") REFERENCES "kiosk_config"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_fields" ADD CONSTRAINT "form_fields_form_schema_id_fkey" FOREIGN KEY ("form_schema_id") REFERENCES "form_schema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agents" ADD CONSTRAINT "agents_photo_media_id_fkey" FOREIGN KEY ("photo_media_id") REFERENCES "media_library"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_kiosk_config_id_fkey" FOREIGN KEY ("kiosk_config_id") REFERENCES "kiosk_config"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_addons" ADD CONSTRAINT "lead_addons_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_addons" ADD CONSTRAINT "lead_addons_addon_option_id_fkey" FOREIGN KEY ("addon_option_id") REFERENCES "addon_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kiosk_sessions" ADD CONSTRAINT "kiosk_sessions_kiosk_config_id_fkey" FOREIGN KEY ("kiosk_config_id") REFERENCES "kiosk_config"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_admin_user_id_fkey" FOREIGN KEY ("admin_user_id") REFERENCES "admin_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
