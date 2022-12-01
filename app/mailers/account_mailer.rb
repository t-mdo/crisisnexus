class AccountMailer < ApplicationMailer
  def activation_needed_email(account)
    @account = account
    @url = account_activation_url(key: @account.activation_token)

    mail to: @account.email, subject: 'Activate your CrisisNexus account'
  end

  def activation_success_email(account)
    @account = account
    @url = login_url

    mail to: @account.email, subject: 'Your CrisisNexus account is now activated'
  end

  def reset_password_email(account)
    @account = account
    @url = edit_password_reset_url(token: @account.reset_password_token)

    mail to: @account.email, subject: 'Reset your CrisisNexus account password'
  end
end
