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
                    LEFT JOIN categories
                        ON users.id=categories.user_id
                    LEFT JOIN articles
                        ON articles.id=categories.article_id;
                  SQL
        )
# ONE USER  MANY ARTICLES,  ONE LOCATION MANY PEOPLE
        # results.map { |result| User.new(result)}


        saved_articles = []

        users=[]
        last_user_id = nil

    #this first block re-creates an array of user objects, rather than using map.
    #BECAUSE we need to embed a mechanism (IF stmt) to eliminate duplicates
        results.each do |result|
            if last_user_id != result["id"]  #comparison to eliminate duplicate users, if its a duplicate it won't be added to the array a second time.
                users.push User.new(
                    "username" => result["username"],
                    "password"=> result["password"],
                    "saved_articles" => []
                )
                last_user_id=result["id"]
            end

    # creates the MANY objects only if their id exists,
            if result["article_id"]
                new_article =Article.new({
                    "title"=>result["title"],
                    "author"=>result["author"],
                    "url"=>result["url"],
                    "image_url"=>result["image_url"],
                    "source_name"=>result["source_name"],
                    "summary"=>result["summary"],
                    "date_published"=>result["date_published"]
                })
    #PUSHES the new many object onto the last item in the user array
    #REMEMBER still in the each do loop, so the array is changing with every iteration, and the articles always belong to the last item added the the array, because they are take from the same record the user is on, otherwise a userid doesn't exist.
                users.last.saved_articles.push(new_article)
            end
        end

        return users

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
