# Preview all emails at /rails/mailers/account_mailer
class AccountMailerPreview < ActionMailer::Preview
  def activation_needed_email
    @account = Account.where(activation_state: 'pending').sample
    AccountMailer.activation_needed_email(@account)
  end

  def activation_success_email
    @account = Account.where(activation_state: 'pending').sample
    AccountMailer.activation_success_email(@account)
  end

  def reset_password_email
    @account = Account.all.sample
    @account.generate_reset_password_token!
    AccountMailer.reset_password_email(@account)
  end
end
