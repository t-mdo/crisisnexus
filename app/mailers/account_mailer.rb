class AccountMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.account_mailer.activation_needed_email.subject
  #
  def activation_needed_email(account)
    @account = account
    @url = activate_account_url(id: @account.activation_token)

    mail to: @account.email, subject: 'Activate your CrisisNexus account'
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.account_mailer.activation_success_email.subject
  #
  def activation_success_email(account)
    @account = account
    @url = login_url

    mail to: @account.email, subject: 'Your CrisisNexus account is now activated'
  end
end
