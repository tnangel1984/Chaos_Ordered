class MyArticles extends React.Component {
    render(){
        console.log(this.props.myArticles);
        console.log(this.props.showFormVisible);
        return <div>
            <h1>test myApp</h1>

            {this.props.myArticles.map((article,index)=>{
                return <div >
                <h3>{article.title}</h3>
                <a href="#" onClick={this.props.showForm}>Categorize</a>
                {this.props.showFormVisible ?
                    <form onSubmit={()=>{this.props.submitForm(event)}}>
                        <input type="text" placeholder="Category 1" id="category1" value={this.props.category1}
                        onChange={()=>{this.props.createCategory(event)}}
                        />
                        <input type="text" placeholder="Category 2"  id="category2" value={this.props.category2}
                        onChange={()=>{this.props.createCategory(event)}}
                        />
                        <input type="text" placeholder="Category 3"  id="category3" value={this.props.category3}
                        onChange={()=>{this.props.createCategory(event)}}
                        />
                        <button type="submit"> Categorize</button>
                    </form>
                :""}
                <img onClick={()=>this.props.getArticle(article)} src={article.image_url} className="thumbnail"></img>
                </div>
            })}

        </div>
    }
}

// onclick push form values into Create
// pass joinID
//categories with 3 separate categories
//push values into...

    // {this.props.myArticles.saved_articles[0].title}
