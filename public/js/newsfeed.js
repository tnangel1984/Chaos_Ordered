
class Newsfeed extends React.Component{
    render(){
        console.log(this.props.headlines)
        return <div>
            <h1>Newsfeed</h1>
            <div>

        {this.props.headlines.map((headline, index)=>{
            return <div className = "article_container">
            <div className="Headline">{headline.title}</div>
            <div className="summary">{headline.description}</div>
                   <div className ="image">
                       <img className="image" src={headline.urlToImage}></img>
                   </div>
                   <div className ="category_bar">
                       <p>Economics</p>
                       <p>Poverty</p>
                       <p>Custom</p>
                   </div>
                   <div className ="action_bar">
                       <button>bump</button>
                       <button>store</button>
                       <button>comment</button>
                       <button>share</button>
                   </div>

                   </div>
                })}
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
