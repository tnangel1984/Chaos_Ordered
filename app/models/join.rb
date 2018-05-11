class Join
    attr_reader :id, :user_id, :article_id, :category_id

    DB = PG.connect(host:"localhost", port:5432, dbname: "chaos_ordered")

    def initialize (opts)
        @id = opts["id"].to_i
        @user_id = opts["user_id"]
        @article_id=opts["article_id"]
        @category_id=opts["category_list"]

    end

    def self.all
        results= DB.exec(
            <<-SQL
                SELECT * FROM joins
                RETURNING id, user_id, article_id, category_id;
            SQL
        )
        return results.map {|result| Join.new(result)}
    end


    def self.find(id)
        results = DB.exec(
             <<-SQL
                SELECT *
                FROM joins
                WHERE id=#{id}
                RETURNING id, user_id, article_id, category_id;
            SQL
        )
        return Join.new(results.first)
    end


    def self.create(opts)
        results = DB.exec(
            <<-SQL
                INSERT INTO joins (user_id, article_id, category_id)
                VALUES (#{opts["user_id"]}, #{opts["article_id"]}, #{opts["category_id"]})
                RETURNING id, user_id, article_id, category_id;
            SQL
        )
        return Join.new(results.first)
    end

    def update(id, opts)
        results =DB.exec(
            <<-SQL
                UPDATE joins
                SET user_id= #{opts["user_id"]}, article_id=#{opts["article_id"]}, category_id= #{opts["category_id"]}
                WHERE id =#{id}
                RETURNING id, user_id, article_id, category_id;
            SQL
        )
        return Join.new(results.first)
    end

    def self.delete(id)
        results= DB.exec(
            <<-SQL
                DELETE FROM joins
                WHERE id = #{id}
            SQL
        )
        return {deleted:true}
    end
end
