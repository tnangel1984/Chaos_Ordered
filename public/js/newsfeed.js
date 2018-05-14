
class Newsfeed extends React.Component{
    render(){
        // console.log(this.props.headlines)
        return <div>
                <div className="columns box row ">

                    <div className="column box" >
                        <Discussion className="col-3"/>
                    </div>

                    <div className="column is-three-fifths  box col-6 headline_containter">
                        {this.props.headlines.map((headline, index)=>{
                            return <div className = "box card article_container ">



                                        <a href={headline.url}>
                                            <h2 className=" card-header-title headline">{headline.title}</h2>
                                        </a>
                            
                                <div>
                                        <div className ="img_container">
                                           <img className="card-image is-horizontal-center img-fluid text-center img" alt="Reponsive image" src={headline.urlToImage}></img>
                                        </div>

                                        <div className="card-content summary">{headline.description}
                                        </div>

                                        <div className ="action_bar">
                                           <button>like</button>
                                           <button>share</button>
                                           <button>comment</button>
                                           <button onClick={()=>{this.props.duplicateArticles(headline.title, headline)}}>save</button>
                                        </div>

                                </div>
                            </div>
                        })}
                    </div>

                    <div className="column box">
                        <Category className="col-3"/>
                    </div>
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
//
//
// <div className ="category_bar">
//     <p>Economics</p>
//        <p>Poverty</p>
//        <p>Custom</p>
// </div>
