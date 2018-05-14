class Join
    attr_reader :join_id, :user_id, :article_id, :category_id

    DB = PG.connect(host:"localhost", port:5432, dbname: 'chaos_ordered')

    def initialize (opts={})
        @join_id = opts["join_id"].to_i
        @user_id = opts["user_id"].to_i
        @article_id=opts["article_id"].to_i


    end

    def self.all
        results= DB.exec(
            <<-SQL
                SELECT * FROM joins;
            SQL
        )
        return results.map {|result| Join.new(result)}
    end


    def self.find(id)
        results = DB.exec(
             <<-SQL
                SELECT *
                FROM joins
                WHERE join_id=#{id};
            SQL
        )
        return Join.new(results.first)
    end


    def self.create(opts)
        results = DB.exec(
            <<-SQL
                INSERT INTO joins (user_id, article_id)
                VALUES (#{opts["user_id"]}, #{opts["article_id"]})
                RETURNING join_id, user_id, article_id;
            SQL
        )
        return Join.new(results.first)
    end

    def self.update(id, opts)
        results = DB.exec(
            <<-SQL
                UPDATE joins
                SET user_id= #{opts["user_id"]}, article_id= #{opts["article_id"]}
                WHERE join_id=#{id}
                RETURNING join_id, user_id, article_id;
            SQL
        )
        return Join.new(results.first)
    end

    def self.delete(id)
        results= DB.exec(
            <<-SQL
                DELETE FROM joins
                WHERE join_id = #{id}
            SQL
        )
        return {deleted:true}
    end

    # def self.duplicates(id1, id2)
    #     results= DB.exec(
    #         <<-SQL
    #             SELECT *
    #             FROM joins
    #             WHERE id1 = #{user_id}
    #             AND id2 =#{article_id}
    #         SQL
    #     )
    #     results.first["join_id"]
    # end
end
