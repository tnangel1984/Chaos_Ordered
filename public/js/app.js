


class APImethods extends React.Component{
    constructor(props){
        super(props)
        this.getArticles=this.getArticles
        this.getArticle=this.getArticle
        this.addArticle=this.addArticle
        this.updateArticle=this.updateArticle
        this.deleteArticle=this.deleteArticle
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
        this.setState({article:article})
    }

    createArticle(){

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
