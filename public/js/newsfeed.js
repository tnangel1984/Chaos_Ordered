
class Newsfeed extends React.Component{
    render(){
        return <div>
        <h1>Newsfeed</h1>
        {/* map articles starts here*/}
            <div className = "article_container">
                <div className="Headline">Article Headline</div>
                <div className ="image">article image</div>
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


        </div>
    }
}
