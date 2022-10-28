# Preview all emails at /rails/mailers/account_mailer
class AccountMailerPreview < ActionMailer::Preview
  # Preview this email at /rails/mailers/account_mailer/activation_needed_email
  def activation_needed_email
    @account = Account.all.sample
    AccountMailer.activation_needed_email(@account)
  end

  # Preview this email at /rails/mailers/account_mailer/activation_success_email
  def activation_success_email
    @account = Account.all.sample
    AccountMailer.activation_success_email(@account)
  end
end
