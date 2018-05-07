class Article
    attr_reader :id, :title, :author, :url, :image_url, :source_name, :date_published, :summary

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
end
