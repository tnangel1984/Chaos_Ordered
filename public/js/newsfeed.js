
class Newsfeed extends React.Component{
    render(){
        // console.log(this.props.headlines)
        return <div className="container-fluid master master_container">
                <div className="row ">
                    <Discussion className="col-3"/>

                    <div className="col-6 headline_containter">
                        {this.props.headlines.map((headline, index)=>{
                            return <div className = "article_container ">

                                <div className="headline_container">

                                <a href={headline.url}>
                                    <h3 className="headline">{headline.title}</h3>
                                </a>

                                <div className ="img_container">
                                   <img className="img-fluid text-center img" alt="Reponsive image" src={headline.urlToImage}></img>
                                </div>

                                <div className="summary">{headline.description}
                                </div>

                                <div className ="category_bar">
                                    <form>
                                        <input type="text" placeholder="Category 1" value={this.props.category1}/>
                                        <input type="text" placeholder="Category 2" value={this.props.category2}/>
                                        <input type="text" placeholder="Category 3" value={this.props.category3}/>
                                        <button type="submit"> Categorize</button>
                                    </form>
                                    <p>Economics</p>
                                       <p>Poverty</p>
                                       <p>Custom</p>

                                </div>



                                    <div className ="action_bar">
                                       <button>bump</button>
                                       <button>store</button>
                                       <button>comment</button>
                                       <button onClick={()=>{this.props.duplicateArticles(headline.title, headline)}}>share</button>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>

                    <Category className="col-3"/>

                </div>


        </div>
    }
}

// <div>
// {this.props.headlines.map((headline, index)=>{
//         return <div className = "article_container">
//             <h1>testmap</h1>
//         </div>
//     })}
// </div>

// <div className="Headline">Article Headline</div>
// <div className ="image">article image</div>
// <div className ="category_bar">
//     <p>Economics</p>
//     <p>Poverty</p>
//     <p>Custom</p>
// </div>
// <div className ="action_bar">
//     <button>bump</button>
//     <button>store</button>
//     <button>comment</button>
//     <button>share</button>
// </div>

// this.props.createArticle(headline),
