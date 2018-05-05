class Article
    attr_reader :id, :title, :author, :url, :image_url, :source_name, :date_published, :summary

    DB = PG.connect(host:"localhost", port:5432, dbname: 'chaos_ordered')

    def initialize (opts)
        @title = opts["title"]
        @author =opts["author"]
        @url= opts["url"]
        @url_image =opts["url"]
        @source_name=opts["source_name"]
        @date_published=opts["date_published"]
        @summary=opts["summary"]
    end

    def self.all
        results = DB.exec("SELECT * FROM articles;")

        return results.map{|result| Article.new(result)}

    end

end
