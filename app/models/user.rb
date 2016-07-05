class User < ActiveRecord::Base
  attr_reader :password
  # Associations
  belongs_to :house
  has_many :lists
  has_many :messages
  has_many :events
  has_many :user_bills, inverse_of: :user
  has_many :bills, through: :user_bills
  # Validations
  after_initialize :ensure_session_token
  # Methods
  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
		@password = password
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(:username => username)
    return nil unless user
    user.password_is?(password) ? user : nil
  end

  def password_is?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    puts "reset session token"
    self.session_token = SecureRandom.base64
    self.save!
    self.session_token
  end


  private
  def ensure_session_token
    self.session_token ||= SecureRandom.base64
  end
end
