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

ActiveRecord::Schema[7.0].define(version: 2022_12_13_114448) do
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
    t.text "display_name"
    t.string "reset_password_token"
    t.datetime "reset_password_token_expires_at"
    t.datetime "reset_password_email_sent_at"
    t.integer "access_count_to_reset_password_page", default: 0
    t.index ["activation_token"], name: "index_accounts_on_activation_token"
    t.index ["email"], name: "index_accounts_on_email", unique: true
    t.index ["organization_id"], name: "index_accounts_on_organization_id"
    t.index ["reset_password_token"], name: "index_accounts_on_reset_password_token"
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

  create_table "minutes", force: :cascade do |t|
    t.text "who"
    t.text "what"
    t.bigint "incident_id", null: false
    t.bigint "recorded_by_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["incident_id"], name: "index_minutes_on_incident_id"
    t.index ["recorded_by_id"], name: "index_minutes_on_recorded_by_id"
  end

  create_table "next_step_actions", force: :cascade do |t|
    t.text "name", null: false
    t.bigint "postmortem_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "assigned_to_id"
    t.datetime "due_at"
    t.datetime "completed_at"
    t.index ["assigned_to_id"], name: "index_next_step_actions_on_assigned_to_id"
    t.index ["postmortem_id"], name: "index_next_step_actions_on_postmortem_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "war_room_url"
    t.string "identifier", null: false
    t.boolean "welcome_message_displayed"
    t.index ["identifier"], name: "index_organizations_on_identifier", unique: true
  end

  create_table "postmortems", force: :cascade do |t|
    t.bigint "assigned_to_id", null: false
    t.bigint "incident_id", null: false
    t.text "summary"
    t.text "impact_who"
    t.text "impact_what"
    t.datetime "incident_impact_started_at"
    t.datetime "incident_impact_ended_at"
    t.text "timeline_text"
    t.text "lucky_text"
    t.text "unlucky_text"
    t.string "five_whys_text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status", default: "draft"
    t.index ["assigned_to_id"], name: "index_postmortems_on_assigned_to_id"
    t.index ["incident_id"], name: "index_postmortems_on_incident_id"
  end

  create_table "role_enrollments", force: :cascade do |t|
    t.bigint "role_id", null: false
    t.bigint "account_id", null: false
    t.bigint "organization_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "last_exercised_at"
    t.index ["account_id"], name: "index_role_enrollments_on_account_id"
    t.index ["organization_id"], name: "index_role_enrollments_on_organization_id"
    t.index ["role_id", "account_id"], name: "index_role_enrollments_on_role_id_and_account_id", unique: true
    t.index ["role_id"], name: "index_role_enrollments_on_role_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_roles_on_name", unique: true
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

  create_table "tracking_events", force: :cascade do |t|
    t.text "ssid"
    t.bigint "account_id"
    t.text "name"
    t.jsonb "properties", default: {}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_tracking_events_on_account_id"
  end

  add_foreign_key "accounts", "organizations"
  add_foreign_key "incidents", "accounts", column: "closer_id"
  add_foreign_key "incidents", "accounts", column: "communication_manager_id"
  add_foreign_key "incidents", "accounts", column: "creator_id"
  add_foreign_key "incidents", "accounts", column: "incident_manager_id"
  add_foreign_key "incidents", "accounts", column: "incident_manager_sidekick_id"
  add_foreign_key "incidents", "accounts", column: "scribe_id"
  add_foreign_key "incidents", "organizations"
  add_foreign_key "minutes", "accounts", column: "recorded_by_id"
  add_foreign_key "minutes", "incidents"
  add_foreign_key "next_step_actions", "accounts", column: "assigned_to_id"
  add_foreign_key "next_step_actions", "postmortems"
  add_foreign_key "postmortems", "accounts", column: "assigned_to_id"
  add_foreign_key "postmortems", "incidents"
  add_foreign_key "role_enrollments", "accounts"
  add_foreign_key "role_enrollments", "organizations"
  add_foreign_key "role_enrollments", "roles"
  add_foreign_key "sms_notifications", "accounts"
  add_foreign_key "sms_notifications", "incidents"
  add_foreign_key "sms_notifications", "organizations"
  add_foreign_key "tracking_events", "accounts"
end
