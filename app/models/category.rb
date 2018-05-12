class Category
    attr_reader :id, :category_list, :join_id

    DB = PG.connect(host:'localhost', port:5432, dbname:'chaos_ordered')

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
end
