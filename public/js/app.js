


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
        this.addJoinDB=this.addJoinDB.bind(this)
        this.createCategory = this.createCategory.bind(this)
        this.addCategoryDB=this.addCategoryDB.bind(this)
        this.deleteCategory=this.deleteCategory.bind(this)

        this.getMyArticles=this.getMyArticles.bind(this)
        this.showForm=this.showForm.bind(this)
        this.submitForm=this.submitForm.bind(this)
        this.sendUserId=this.sendUserId.bind(this)
        this.sendQuery=this.sendQuery.bind(this)

        this.toggleState =this.toggleState.bind(this)
        this.state = {headlines:[], duplicate:{}, articlesDB:[], selectedArticle:{},  userID:2, recordJoinID:0, myArticles:{},
            homeVisible:true, myArticlesVisible:false, showFormVisible:false,
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
            },

            category1:"",
            category2:"",
            category3:"",
            categories:[],
            category:{
                category_list:"",
                join_id:0
            }
        }
    }

    componentDidMount(){
        // this.getArticles()
        this.getHeadLines();
        if (this.state.userID !=0) {
            this.getMyArticles()}
        else{""};
        console.log(this.state.myArticles);
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

addJoinDB(userArticle){
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
    .then(response=>{
        console.log(response);
        this.setState({recordJoinID:response.join_id})
        console.log("new join created");
        console.log(this.state.recordJoinID);
    })
    .catch(error=>console.log(error))
}


// ===============================================
//              CATEGORIES
// ===============================================
//  adds categories to SPECIFIC articles based on JOIN ID in When joins record is created.
//
    // DETERMING FLOW THROUGH OF JOIN ID ... AND HOW/WHERE IT'S SET... try to associate with individual article.

createCategory(event){

    this.setState({[event.target.id]: event.target.value},()=>{
        console.log(this.state.category1);
        console.log(this.state.category2);
        console.log(this.state.category3);
    })
    console.log(this.state.category1);
    console.log(this.state.category2);
    console.log(this.state.category3);

}

submitForm(event, joinid){
 event.preventDefault();

console.log(event.srcElement[0].value);
 this.setState({category:{
     category_list: event.srcElement[0].value,
     join_id:joinid
 }}, ()=>{this.addCategoryDB(this.state.category)})

console.log(this.state.category);


 // })

// console.log(this.state.category1, this.state.category2, this.state.category3);
//     console.log(joinid);
//     event.preventDefault();
//     const catArr = this.state.categories
//     catArr.push(this.state.category1, this.state.category2, this.state.category3)
//     console.log(this.state.categories);
//
//
//         this.setState({category:{category:this.state.category1, join_id: joinid}},()=>{console.log(this.state.category)})
//         this.setState({category:{category:this.state.category2, join_id: joinid}},()=>{console.log(this.state.category)})
//         this.setState({category:{category:this.state.category3, join_id: joinid}},()=>{console.log(this.state.category)})
}

addCategoryDB(category){

    console.log(category);
     fetch('/categories', {
         body: JSON.stringify(category),
         method: 'POST',
         headers: {
             'Accept':'application/json, text/plain,  */*',
             'Content-Type':'application/json'
         }
     })
     .then(response=>response.json())
     .then(response=>console.log(response))
     .catch(error=>console.log(error))
 }


deleteCategory(){
console.log("delete");
}

// ===============================================
//              USERS
// ===============================================


setMyArticles(foundArticles){
     this.setState(
         {myArticles: foundArticles.saved_articles},
         ()=>{console.log(this.state.myArticles)}
    )
}

getMyArticles(){
    console.log("getMyArticles executed");
  fetch('/users/'+this.state.userID)
  .then(response=>response.json())
  .then(foundArticles=>{this.setMyArticles(foundArticles)})
  .catch(error=>console.log(error))
}

showForm(){
    console.log("showForm executed");
    this.setState({showFormVisible: !this.state.showFormVisible})
}


// ===============================================
//              SEARCH
// ===============================================

sendUserId(event){
    console.log("sendUserId executed");
    console.log(event.srcElement[0].value);
    fetch('/categoriesusercat/'+ this.state.userID)
    .then(response=>response.json())
    .then(response=>{console.log("userId passed"); this.sendQuery(event.srcElement[0].value)})
    .catch(error=>console.log(error))
}

sendQuery(query){
    console.log("sendQuery executed");
    console.log(query);
    fetch('/categoriesquery/'+ query)
    .then(response=>response.json())
    .then(response=>console.log(response))
    .catch(error=>console.log(error))
}

toggleState(str1, str2, str3){
    console.log("toggleState executed");
    this.setState({
    [str1]: true,
    [str2]: false,
    [str3]: false
    })
}

// ===============================================
                // RENDER
// ===============================================
    render(){
        // console.log(this.state.articles);

        return<div>
            <Nav
            getMyArticles={this.getMyArticles}
            toggleState={this.toggleState}

            />
            {this.state.homeVisible ?
                <Newsfeed
                    headlines={this.state.headlines}
                    createArticle={this.createArticle}
                    duplicateArticles={this.duplicateArticles}
                />
            : ""
            }


            {this.state.myArticlesVisible ?
                 <MyArticles
                 myArticles={this.state.myArticles}
                 showForm={this.showForm}
                 showFormVisible={this.state.showFormVisible}
                 createCategory={this.createCategory}
                 submitForm={this.submitForm}
                 sendUserId={this.sendUserId}

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
