class MyArticles extends React.Component {
    render(){
        return <div>
            <h1>test myApp</h1>
            {this.props.articles.map((article)=>{
                return <div>{article.title}</div>
            })}

        </div>
    }
}
