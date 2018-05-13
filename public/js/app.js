


class APImethods extends React.Component{
    constructor(props){
        super(props)
        this.getHeadLines=this.getHeadLines.bind(this)
        this.getArticles=this.getArticles.bind(this)
        this.getArticle=this.getArticle.bind(this)
        this.duplicateArticles=this.duplicateArticles.bind(this)
        this.createArticle=this.createArticle.bind(this)
        this.appendArticle=this.appendArticle.bind(this)
        this.addArticleDB=this.addArticleDB.bind(this)
        this.updateFormSubmit=this.updateFormSubmit.bind(this)
        this.updateArticleDB=this.updateArticleDB.bind(this)
        this.deleteArticle=this.deleteArticle.bind(this)
        this.createJoin=this.createJoin.bind(this)
        this.addJoin=this.addJoin.bind(this)
        this.toggleState =this.toggleState.bind(this)
        this.state = {headlines:[], duplicate:{}, articlesDB:[], selectedArticle:{},  userID:{},
            homeVisible:true, myArticlesVisible:false,
            oneArticleVisible:false,
            userRegVisible:false, loginVisible:false, userRegVisible:false,
            article:{
                title:"",
                author:"",
                url:"",
                image_url:"",
                source_name:"",
                summary:"",
                date_published:""
            },
            userArticle:{
                user_id:2,
                article_id:0
            }
        }
    }

    componentDidMount(){
        // this.getArticles()
        this.getHeadLines()
    }

// ===============================================
        //EXTERNAL API NEWS
// ===============================================

getHeadLines(){
    fetch('https://newsapi.org/v2/top-headlines?country='+'us'+'&apiKey=ebdd27ee86ff489793262b41ca8b1b23')
    .then(response=>response.json())
    .then(headlines=>{this.setState({headlines:headlines.articles}); console.log(this.state.headlines);})

    .catch(error=>console.log(error))
}





// ===============================================
            //CUSTOM API ARTICLES
// ===============================================
    getArticles(){
        fetch('/articles')
        .then(response=>response.json())
        .then(data=>{this.setState({articles:data})})
        .catch(error=>console.log(error))
    }

    getArticle(article){
        console.log("getArticle executed");
        this.setState({article:article})

    }
//==========================================================================
//          CREATE  ARTICLES FOR CUSTOM API
//==========================================================================
//0.Check if duplicate article 1.Capture Inputs into setState 2. Fetch send POST httlp request & capture response (data) 3. PUSH data onto articles array
            // checks first whether article title already exists in database. True: returns article ID, False: creates new article and returns article ID
    duplicateArticles(title, article){
        console.log("duplicateArticles executed");
        fetch('/articleduplicates/'+ title)
        .then(response=>response.json())
        .then(response=>{
            this.setState({duplicate:response});

            if(response == "add article"){
                this.createArticle(article)
            }else{
                this.createJoin(this.state.duplicate[0]);
            }
                // console.log(this.state.duplicate);
        })
        .catch(error=>console.log(error))
    }

    createArticle(article){
        console.log("createArticle executed");
        this.setState({
            article:{
                title:article.title? article.title.replace(/\'/g, ""):"",
                author:article.author? article.author.replace(/\'/g, ""):"",
                url:article.url? article.url.replace(/\'/g, ""):"",
                image_url:article.urlToImage? article.urlToImage.replace(/\'/g, ""):"",
                source_name:article.source.name? article.source.name.replace(/\'/g, ""):"",
                summary:article.description? article.description.replace(/\'/g, ""):"",
                date_published:article.publishedAt? article.publishedAt.replace(/\'/g, ""):"",
            }
        }, ()=>{
                console.log(this.state.article);
                this.addArticleDB(this.state.article);
                // this.setState({duplicate:this.state.article.id});
                // console.log(this.state.duplicate);

            }
        )
    }

    appendArticle(article){
        console.log("appendArticle executed");
        const appendedArticles = this.state.articlesDB
        appendedArticles.unshift(article)
        this.setState({articlesDB: appendedArticles})
    }

    addArticleDB(article){
        console.log("addArticleDB executed");
        fetch('/articles',{
            body: JSON.stringify(article),
            method:'POST',
            headers:{
                 'Accept': 'application/json, text/plain. */*',
                 'Content-Type': 'application/json'
             }
        })
        .then(response=>response.json())
        .then(newArticle=>{
            console.log(newArticle.id);
            this.setState({duplicate:newArticle.id})
            console.log(this.state.duplicate);
            this.appendArticle(newArticle)
            this.createJoin(newArticle.id)

        })
        .catch(error=>{console.log(error)})
        // newArticles=this.state.articles
        // newArticles.push(newArticle)
        // this.setState({articles:newArticles})
    }

// -----------------------------------------------------------------
    updateFormSubmit(event){
        event.preventDefault();
        this.updateArticleDB(this.state.article)
    }

    updateArticleDB(article){
        fetch('/articles/'+ article.id,{
            body:JSON.stringify(article),
            method:'PUT',
            headers:{
                'Accept':'application/json, text/plain, */*',
                'Content-Type':'application/json'
            }
        })
        .then(response=>response.json())
        .then(updatedArticle=>{this.getArticles()})
        .catch(error=>console.log(error))
    }

// -----------------------------------------------------------------
    deleteArticle(index, article){
        fetch('/articles/' + article.id, {method:'DELETE'})
        .then(response.json())
        .then(data=>{
            this.setState({
                articles:[
                    ...this.state.articles.slice(0,index), ...this.state.articles.slice(index + 1)
                ]
            })
        })
    }

// ================================================================
//                       JOINS (USER_ARTICLES)
// ================================================================
//  Create records in Join table and Delete records from join table (no update no show)

createJoin(articleID){
    console.log("createJoin executed");

    this.setState({userArticle:{
        user_id: this.state.userArticle.user_id,
        article_id: articleID
    }})
    this.addJoin(this.state.userArticle)
}

addJoin(userArticle){
    console.log("addJoin executed");

    fetch('/joins', {
        body: JSON.stringify(userArticle),
        method:'POST',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    .then(response=>response.json())
    .then(response=>{console.log(response); console.log("new join created")})
    .catch(error=>console.log(error))
}


// ===============================================
//              CATEGORIES
// ===============================================







toggleState(str1, str2, str3){
    str1 = true
    str2 = false
    str3 = false
}

// ===============================================
                // RENDER
// ===============================================
    render(){
        // console.log(this.state.articles);

        return<div className="master">
            <Nav toggleState={this.toggleState}/>
            <Newsfeed
                headlines={this.state.headlines}
                createArticle={this.createArticle}
                duplicateArticles={this.duplicateArticles}
            />


            {this.state.myArticlesVisible ?
                 <MyArticles
                 articles={this.state.articles}
                 getArticle={this.getArticle}
                 />
             : ""}
         </div>
    }
}


ReactDOM.render(
    <div className="master">
        <APImethods/>
    </div>,
    document.querySelector('main')
);
