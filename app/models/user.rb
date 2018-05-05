class User
  attr_reader  :username, :password

  DB= PG.connect(host:"localhost", port:5432, dbname:'chaos_ordered')

  def initialize (opts={})
      @username = opts["username"]
      @password = opts["password"]
      # @articles = opts["article-id"].to_i
      # @custom_categories = opts["custom_categories"]
      # @category_id = opts["category_id"].to_i

  end

  def self.all
    results= DB.exec(
              <<-SQL
                SELECT *
                FROM users;
              SQL
    )

    return results.map { |result| User.new(result)
   } end


end
