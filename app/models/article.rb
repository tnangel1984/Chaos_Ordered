class Article
    attr_reader :id, :title, :author, :url, :image_url, :source_name, :date_published, :summary, :categories, :join_id

    DB = PG.connect(host:"localhost", port:5432, dbname: 'chaos_ordered')

    def initialize (opts={})
        @id=opts["id"].to_i
        @title = opts["title"]
        @author =opts["author"]
        @url= opts["url"]
        @image_url =opts["image_url"]
        @source_name=opts["source_name"]
        @date_published=opts["date_published"]
        @summary=opts["summary"]
        @categories=opts["categories"]
        @join_id=opts["join_id"]
    end


    def self.all
        results = DB.exec("SELECT * FROM articles;")

        return results.map{|result| Article.new(result)}

    end


    def self.find(id)
        results = DB.exec(
            <<-SQL
                SELECT * FROM articles
                WHERE id=#{id};
            SQL
        )
        return Article.new(results.first)
    end


    def self.create(opts)
        results = DB.exec(
            <<-SQL
                INSERT INTO articles (title, author, url, image_url,source_name, date_published, summary)
                VALUES('#{opts["title"]}', '#{opts["author"]}', '#{opts["url"]}', '#{opts["image_url"]}', '#{opts["source_name"]}', '#{opts["date_published"]}', '#{opts["summary"]}')
                RETURNING id, title, author, url, image_url, source_name, date_published, summary;
            SQL
        )
        return Article.new(results.first)
    end


    def self.update(id, opts)
        results = DB.exec(
            <<-SQL
                UPDATE articles
                SET title='#{opts["title"]}', author='#{opts["author"]}', url='#{opts["url"]}', image_url='#{opts["image_url"]}', source_name='#{opts["source_name"]}', date_published='#{opts["date_published"]}', summary='#{opts["summary"]}'
                WHERE id = #{id}
                RETURNING id, title, author, url, image_url, source_name, date_published, summary;

            SQL
        )
        return Article.new(results.first)
    end


    def self.delete(id)
        results = DB.exec(
            <<-SQL
                DELETE FROM articles
                WHERE id=#{id};
            SQL
        )
        return {deleted: true}
    end

    def self.duplicates(title)
        results= DB.exec(
            <<-SQL
                SELECT *
                FROM articles
                WHERE title = '#{title}'
            SQL
        )
        p title

    # return results
    # concat_ws(',', title, author)='#{title}'
    # results[0]["concat_ws"]
        response=[]
        resArray=[]
        results.map{|result| resArray.push(result)}
 p resArray.length
        if resArray.length == 0
            p "add article"
            response.push("add article")
            return response
        else
            p results.first["id"]
             response.push(results.first["id"])
             return response
        end
    return results
    end
end
