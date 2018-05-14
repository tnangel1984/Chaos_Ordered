class User
    attr_reader  :id, :username, :password, :saved_articles, :category_list, :categories

    if(ENV['DATABASE_URL'])
      uri = URI.parse(ENV['DATABASE_URL'])
      DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
    else
      DB = PG.connect(host: "localhost", port: 5432, dbname: 'chaos_ordered')
    end

    def initialize (opts={})
        @id = opts["id"].to_i
        @username = opts["username"]
        @password = opts["password"]
        if opts["saved_articles"]
            @saved_articles = opts["saved_articles"]
        end
        # @category_list = opts["category_list"]
        # @join_id=opts["join_id"]
        # @categories=opts["categories"]
        # @articles = opts["article-id"].to_i
        # @custom_categories = opts["custom_categories"]
        # @category_id = opts["category_id"].to_i

    end

    def self.all
        results= DB.exec(
                  <<-SQL
                    SELECT users. *,
                    joins.join_id,
                    joins.article_id,
                    joins.user_id,
                    articles.title,
                    articles.author,
                    articles.url,
                    articles.image_url,
                    articles.source_name,
                    articles.summary,
                    articles.date_published,
                    categories.category_list
                    FROM users
                    LEFT JOIN joins
                        ON users.id=joins.user_id
                    LEFT JOIN articles
                        ON articles.id=joins.article_id
                    LEFT JOIN categories
                        ON categories.join_id=joins.join_id
                    ORDER BY users.id, articles.id;
                  SQL
        )
        # return results
        #added ORDER BY because the last_user_id if statement depends on consistent order

  # ONE LOCATION MANY PEOPLE
        # results.map { |result| User.new(result)}


        saved_articles = []
        categories= []
        users=[]
        last_user_id = nil
        last_article_id=nil

    #this first block re-creates an array of user objects, rather than using map.
    #BECAUSE we need to embed a mechanism (IF stmt) to eliminate duplicates
        results.each do |result|
                if last_user_id != result["id"]  #comparison to eliminate duplicate users, if its a duplicate it won't be added to the array a second time.
                    users.push User.new(
                        "id"=>result["id"],
                        "username" => result["username"],
                        "password"=> result["password"],
                        "saved_articles" => []
                    )
                    last_user_id=result["id"]
                end

                # creates the MANY objects only if their id exists,
                if result["article_id"]
                            if last_article_id != result["article_id"]

                            new_article =Article.new({
                                "id"=>result["article_id"],
                                "title"=>result["title"],
                                "author"=>result["author"],
                                "url"=>result["url"],
                                "image_url"=>result["image_url"],
                                "source_name"=>result["source_name"],
                                "summary"=>result["summary"],
                                "date_published"=>result["date_published"],
                                "categories" => [],
                                "join_id"=>result["join_id"]
                            })

                            last_article_id=result["article_id"]
                            users.last.saved_articles.push(new_article)
                            end

                #         #PUSHES the new many object onto the last item in the user array
                #         # #REMEMBER still in the each do loop, so the array is changing with every iteration, and the articles always belong to the last item added the the array, because they are take from the same record the user is on, otherwise a userid doesn't exist.

                            if result["category_list"]
                                new_category =Category.new({
                                    "id"=>result["id"],
                                    "category_list"=>result["category_list"],
                                    "join_id"=>result["join_id"]
                                })

                                users.last.saved_articles[saved_articles.length-1].categories.push(new_category)
                            end
                end
        end
        return users
end



    def self.find(id)
        results = DB.exec(
            <<-SQL
            SELECT users. *,
            joins.join_id,
            joins.article_id,
            joins.user_id,
            articles.title,
            articles.author,
            articles.url,
            articles.image_url,
            articles.source_name,
            articles.summary,
            articles.date_published,
            categories.category_list
            FROM users
            LEFT JOIN joins
                ON users.id=joins.user_id
            LEFT JOIN articles
                ON articles.id=joins.article_id
            LEFT JOIN categories
                ON categories.join_id=joins.join_id
            WHERE users.id=#{id}
            ORDER BY users.id, articles.id;

            SQL
        )

        saved_articles= []
        categories= []
        last_article_id=nil

    #In the show case you only loop over the MANY, then push them into and array
        results.each do |result|
            if result["article_id"]
                    if result["article_id"] != last_article_id
                            saved_articles.push Article.new({
                                "id"=>result["article_id"],
                                "title"=>result["title"],
                                "author"=>result["author"],
                                "url"=>result["url"],
                                "image_url"=>result["image_url"],
                                "source_name"=>result["source_name"],
                                "summary"=>result["summary"],
                                "date_published"=>result["date_published"],
                                "categories" =>[],
                                "join_id"=>result["join_id"]
                            })
                        last_article_id = result["article_id"]
                    end

                    if result["category_list"]
                        new_category =Category.new({
                            "id"=>result["id"],
                            "category_list"=>result["category_list"],
                            "join_id"=>result["join_id"]
                        })

                        saved_articles[saved_articles.length-1].categories.push(new_category)
                    end
            else
                saved_articles=nil
            end
        end


     # return saved_articles
    #Array of many is appended here
        return User.new({
            "id"=>results.first["id"],
            "username" => results.first["username"],
            "password"=> results.first["password"],
            "saved_articles" => saved_articles
        })
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
