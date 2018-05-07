


class API extends React.Component{
    constructor(props){
        super(props)

        this.state = { articles:[], article:{}}
    }


    getArticles(){
        fetch('/articles')
        .then(response=>response.json())
        .then(data=>this.setState({articles:data}))
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
        getArticles()
        console.log(this.state);
        return<div>
            <h1>testAPI</h1>

         </div>
    }
}


ReactDOM.render(
    <div>
        <h1>testing</h1>
        <API/>
        <Newsfeed/>
        <Category/>
        <Discussion/>
    </div>,
    document.querySelector('main')
);
