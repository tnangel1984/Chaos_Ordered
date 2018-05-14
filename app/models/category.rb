class Category
    attr_reader :id, :category_list, :join_id

    if(ENV['DATABASE_URL'])
      uri = URI.parse(ENV['DATABASE_URL'])
      DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
    else
      DB = PG.connect(host: "localhost", port: 5432, dbname: 'chaos_ordered')
    end

    def initialize opts={}
        @id=opts["id"].to_i
        @category_list= opts["category_list"]
        @join_id = opts["join_id"].to_i

    end

    def self.all
        results =DB.exec(
            <<-SQL
                SELECT * FROM categories;
            SQL
        )
        return results.map {|result| Category.new(result)}
    end

    def self.find (id)
        results= DB.exec(
            <<-SQL
                SELECT * FROM categories
                WHERE id=#{id};
            SQL
        )
        return Category.new(results.first)
    end

    def self.create (opts)
        results=DB.exec(
            <<-SQL
                INSERT INTO categories (category_list, join_id )
                VALUES ('#{opts["category_list"]}', #{opts["join_id"]})
                RETURNING id, category_list, join_id;
            SQL
        )
         return Category.new(results.first)
    end

    def self.update(id, opts)
        results= DB.exec(
            <<-SQL
                UPDATE categories
                SET category_list ='#{opts["category_list"]}', join_id= #{opts["join_id"]}
                WHERE id=#{id}
                RETURNING id, category_list, join_id;
            SQL
        )
        return Category.new(results.first)
    end

    def self.delete(id)
        results= DB.exec("DELETE FROM categories WHERE id=#{id};")
        return {deleted:true}
    end

    def self.findusercat(userid)

        $currentuser_id=userid
        # results= DB.exesc(
        #     <<-SQL
        #         SELECT categories.category_list,
        #             categories.join_id  AS catJoin,
        #             joins.join_id,
        #             joins.user_id,
        #             joins.article_id
        #         FROM categories
        #         LEFT JOIN joins
        #             ON categories.join_id=joins.join_id
        #         WHERE user_id =#{userid}
        #     SQL
        # )

    end


        def self.returncats(query)

            results= DB.exec(
                <<-SQL
                    SELECT categories.category_list,
                        categories.join_id  AS catJoin,
                        joins.join_id,
                        joins.user_id,
                        joins.article_id
                    FROM categories
                    LEFT JOIN joins
                        ON categories.join_id=joins.join_id
                    WHERE category_list='#{query}'
                    AND user_id= #{$currentuser_id}

                SQL
            )
            p results
            return results
        end
end
# -- WHERE user_id=#{user_id}
