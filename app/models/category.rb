class Category
    attr_reader :id, :article_id, :user_id, :categories, :category_id

    DB = PG.connect(host:'localhost', port:5432, dbname:'chaos_ordered')

    def initialize opts={}
        @id=opts["id"].to_i
        @article_id = opts["article_id"].to_i
        @user_id = opts["user_id"].to_i
        @categories =opts["categories"]
        @category_id=opts["category_id"].to_i
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
                INSERT INTO categories (article_id, user_id, categories, category_id)
                VALUES (#{opts["article_id"]}, #{opts["user_id"]}, '#{opts["categories"]}',#{opts["category_id"]})
                RETURNING id, article_id, user_id, categories, category_id;
            SQL
        )
    end

    def self.update(id, opts)
        results= DB.exec(
            <<-SQL
                UPDATE categories
                SET article_id =#{opts["article_id"]}, user_id= #{opts["user_id"]}, categories = '#{opts["categories"]}', category_id=#{opts["category_id"]}
                WHERE id=#{id}
                RETURNING id, article_id, user_id, categories, category_id;
            SQL
        )
        return Category.new(results.first)
    end

    def self.delete(id)
        results= DB.exec("DELETE FROM categories WHERE id=#{id};")
        return {deleted:true}
    end
end
