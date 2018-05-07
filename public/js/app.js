


class APImethods extends React.Component{
    constructor(props){
        super(props)
        this.getArticles=this.getArticles.bind(this)
        this.getArticle=this.getArticle.bind(this)
        this.addArticle=this.addArticle.bind(this)
        this.updateArticle=this.updateArticle.bind(this)
        this.deleteArticle=this.deleteArticle.bind(this)
        this.state = { articles:[], article:{}}
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

    addArticle(){

    }

    updateArticle(){

    }

    deleteArticle(id, article){

    }


    render(){
        console.log(this.state.articles);

        return<div>
            <h1>testAPI</h1>
            <Newsfeed/>
            <Category/>
            <Discussion/>
            <MyArticles
             articles={this.state.articles}
             getArticle={this.getArticle}
             />
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
