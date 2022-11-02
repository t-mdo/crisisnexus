class Api::AccountsController < ApiController
  def index
    query = params[:q]
    limit = params[:limit]
    @accounts = current_organization.accounts
    @accounts = @accounts.where('email ILIKE ?', "%#{query}%") if query.present?
    @accounts = @accounts.limit(limit) if limit.present?
  end
end
