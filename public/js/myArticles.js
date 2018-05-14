class MyArticles extends React.Component {
    render(){
        console.log(this.props.myArticles);
        console.log(this.props.showFormVisible);
        return <div>
            <h1>MY ARTICLES</h1>
            <form onSubmit={()=>{this.props.sendUserId(event)}}>
                <label>Filter My Articles: </label><input type="text"  placeholder="Search By Category"></input>
                <button type="submit">Find</button>
            </form>

            {this.props.myArticles.map((article,index)=>{
                return <div >
                <h3>{article.title}</h3>
                <a href="#" onClick={this.props.showForm}>Categorize</a>
                {this.props.showFormVisible ?
                    <section>
                    <form onSubmit={()=>{this.props.submitForm(event, article.join_id)}}>
                        <input type="text" placeholder="Category 1" id="category1" value={this.props.category1}
                        onChange={()=>{this.props.createCategory(event)}}
                        />
                        <button type="submit">+</button>
                    </form >
                    <form onSubmit={()=>{this.props.submitForm(event, article.join_id)}}>
                        <input type="text" placeholder="Category 2"  id="category2" value={this.props.category2}
                        onChange={()=>{this.props.createCategory(event)}}
                        />
                        <button type="submit">+</button>
                    </form>
                    <form  onSubmit={()=>{this.props.submitForm(event, article.join_id)}}>
                        <input type="text" placeholder="Category 3"  id="category3" value={this.props.category3}
                        onChange={()=>{this.props.createCategory(event)}}
                        />
                        <button type="submit">+</button>
                    </form>
                    </section>

                :""}
                <img onClick={()=>this.props.getArticle(article)} src={article.image_url} className="thumbnail"></img>
                </div>
            })}

        </div>
    }
}
// pass joinID
// onclick push form values into Create
//cate search in cat table, by join id & user new append
//categories with 3 separate categories
//push values into...

    // {this.props.myArticles.saved_articles[0].title}
