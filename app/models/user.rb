class User
    attr_reader  :id, :username, :password

      DB= PG.connect(host:"localhost", port:5432, dbname:'chaos_ordered')

    def initialize (opts={})
        @id = opts["id"].to_i
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
        return results.map { |result| User.new(result)}
    end


    def self.find(id)
        results = DB.exec(
            <<-SQL
                SELECT * FROM users
                WHERE id=#{id};
            SQL
        )
        return User.new(results.first)
    end

    def self.create opts
        results = DB.exec(
            <<-SQL
                INSERT INTO users (username, password)
                VALUES('#{opts["username"]}', '#{opts["password"]}')
                RETURNING id, username, password;
            SQL
        )
        return User.new(results.first)
    end

    def self.update(id, opts)
        results=DB.exec(
            <<-SQL
                UPDATE users
                SET username='#{opts["username"]}', password = '#{opts["password"]}'
                WHERE id = #{id}
                RETURNING id, username, password;
            SQL
        )
        return User.new(results.first)
    end

    def self.delete id
        results = DB.exec(
            <<-SQL
                DELETE FROM users
                WHERE id=#{id}
            SQL
        )
        return {deleted:true}
    end
end
