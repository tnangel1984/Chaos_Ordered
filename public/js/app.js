


class APImethods extends React.Component{
    constructor(props){
        super(props)
        this.getArticles=this.getArticles.bind(this)
        this.getArticle=this.getArticle.bind(this)
        this.addArticleDB=this.addArticleDB.bind(this)
        this.updateFormSubmit=this.updateFormSubmit.bind(this)
        this.updateArticleDB=this.updateArticleDB.bind(this)
        this.deleteArticle=this.deleteArticle.bind(this)
        this.toggleState =this.toggleState.bind(this)
        this.state = {articles:[], article:{},
            homeVisible:true, myArticlesVisible:false, oneArticleVisible:false,
            userRegVisible:false, loginVisible:false, userRegVisible:false
        }
    }

    componentDidMount(){
        this.getArticles()
    }

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
//CREATE METHOD

//1.Capture Inputs into setState 2. Fetch send POST httlp request & capture response (data) 3. PUSH data onto articles array
    addArticleDB(content){
        fetch('/articles',{
            body: JSON.stringify(content),
            method:'POST',
            headers:{
                 'Accept': 'application/json, text/plain. */*',
                 'Content-Type': 'application/json'
             }
        })
        .then(response=>respons.json())
        .then(newArticle=>{
                        newArticles=this.state.articles
                        newArticles.push(newArticle)
                        this.setState({articles:newArticles})
        })
        .catch(error=>{console.log(error)})
    }

    updateFormSubmit(event){
        event.preventDefault();
        this.updateArticleDB(this.state.article)
    }

    updateArticleDB(article){
        fetch('/articles'+id,{
            body:JSON.stringify(article),
            method:'PUT',
            headers:{
                'Accept':'application/json, text/plain, */*',
                'Content-Type':'application/json'
            }
        })
        .then(response=>respnse.json())
        .then(updatedArticle=>{this.getArticles()})
        .catch(error=>console.log(error))
    }


    deleteArticle(id, article){
        fetch('/articles' + id, {method:'DELETE'})
        .then(response.json())
        .then(data=>{
            this.setState({
                articles:[
                    ...this.state.articles.slice(0,index), ...this.state.articles.slice(index + 1)
                ]
            })
        })
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
        console.log(this.state.articles);

        return<div>
            <h1>testAPI</h1>
            <Newsfeed/>
            <Category/>
            <Discussion/>

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
    <div>
        <h1>testing</h1>
        <APImethods/>
    </div>,
    document.querySelector('main')
);
