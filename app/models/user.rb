class User
    attr_reader  :id, :username, :password, :saved_articles

      DB= PG.connect(host:"localhost", port:5432, dbname:'chaos_ordered')

    def initialize (opts={})
        @id = opts["id"].to_i
        @username = opts["username"]
        @password = opts["password"]
        @saved_articles = opts["saved_articles"]
        # @articles = opts["article-id"].to_i
        # @custom_categories = opts["custom_categories"]
        # @category_id = opts["category_id"].to_i

    end

    def self.all
        results= DB.exec(
                  <<-SQL
                    SELECT users. *,
                    categories.article_id,
                    categories.user_id,
                    categories.categories,
                    articles.title,
                    articles.author,
                    articles.url,
                    articles.image_url,
                    articles.source_name,
                    articles.summary,
                    articles.date_published
                    FROM users
                     JOIN categories
                        ON users.id=categories.user_id
                    JOIN articles
                        ON articles.id=categories.article_id;
                  SQL
        )
        return results
        # results.map { |result| User.new(result)}
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
