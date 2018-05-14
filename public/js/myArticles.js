class MyArticles extends React.Component {
    render(){
        console.log(this.props.myArticles);
        return <div>
            <h1>test myApp</h1>

            {this.props.myArticles.map((article,index)=>{
                return <div >
                {article.title}
                <img onClick={()=>this.props.getArticle(article)} src={article.image_url} className="thumbnail"></img>
                </div>
            })} 

        </div>
    }
}

    // {this.props.myArticles.saved_articles[0].title}
