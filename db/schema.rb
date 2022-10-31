# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_10_30_233814) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "email", null: false
    t.string "crypted_password"
    t.string "salt"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "organization_id"
    t.string "phone_number"
    t.boolean "onboarding_completed", default: false, null: false
    t.string "activation_state"
    t.string "activation_token"
    t.datetime "activation_token_expires_at"
    t.index ["activation_token"], name: "index_accounts_on_activation_token"
    t.index ["email"], name: "index_accounts_on_email", unique: true
    t.index ["organization_id"], name: "index_accounts_on_organization_id"
  end

  create_table "incidents", force: :cascade do |t|
    t.integer "local_id"
    t.string "name", null: false
    t.text "summary"
    t.string "status", null: false
    t.datetime "started_at", null: false
    t.datetime "ended_at"
    t.bigint "creator_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "organization_id", null: false
    t.bigint "closer_id"
    t.bigint "incident_manager_id"
    t.bigint "incident_manager_sidekick_id"
    t.bigint "scribe_id"
    t.bigint "communication_manager_id"
    t.index ["closer_id"], name: "index_incidents_on_closer_id"
    t.index ["communication_manager_id"], name: "index_incidents_on_communication_manager_id"
    t.index ["creator_id"], name: "index_incidents_on_creator_id"
    t.index ["incident_manager_id"], name: "index_incidents_on_incident_manager_id"
    t.index ["incident_manager_sidekick_id"], name: "index_incidents_on_incident_manager_sidekick_id"
    t.index ["organization_id"], name: "index_incidents_on_organization_id"
    t.index ["scribe_id"], name: "index_incidents_on_scribe_id"
  end

  create_table "leads", force: :cascade do |t|
    t.string "email"
    t.string "conversion_source"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "war_room_url"
    t.string "identifier", null: false
    t.index ["identifier"], name: "index_organizations_on_identifier", unique: true
  end

  create_table "role_enrollments", force: :cascade do |t|
    t.bigint "role_id", null: false
    t.bigint "account_id", null: false
    t.bigint "organization_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_role_enrollments_on_account_id"
    t.index ["organization_id"], name: "index_role_enrollments_on_organization_id"
    t.index ["role_id", "account_id"], name: "index_role_enrollments_on_role_id_and_account_id", unique: true
    t.index ["role_id"], name: "index_role_enrollments_on_role_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sms_notifications", force: :cascade do |t|
    t.bigint "organization_id", null: false
    t.bigint "account_id", null: false
    t.bigint "incident_id", null: false
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "success"
    t.string "error_message"
    t.index ["account_id"], name: "index_sms_notifications_on_account_id"
    t.index ["incident_id"], name: "index_sms_notifications_on_incident_id"
    t.index ["organization_id"], name: "index_sms_notifications_on_organization_id"
  end

  add_foreign_key "accounts", "organizations"
  add_foreign_key "incidents", "accounts", column: "closer_id"
  add_foreign_key "incidents", "accounts", column: "communication_manager_id"
  add_foreign_key "incidents", "accounts", column: "creator_id"
  add_foreign_key "incidents", "accounts", column: "incident_manager_id"
  add_foreign_key "incidents", "accounts", column: "incident_manager_sidekick_id"
  add_foreign_key "incidents", "accounts", column: "scribe_id"
  add_foreign_key "incidents", "organizations"
  add_foreign_key "role_enrollments", "accounts"
  add_foreign_key "role_enrollments", "organizations"
  add_foreign_key "role_enrollments", "roles"
  add_foreign_key "sms_notifications", "accounts"
  add_foreign_key "sms_notifications", "incidents"
  add_foreign_key "sms_notifications", "organizations"
end
