class Nav extends React.Component{

    render(){
        return <div>
        <a onClick={()=>this.props.toggleState('homeVisible','myArticlesVisible','loginVisible')}>Home</a>
        <a onClick={()=>this.props.toggleState('myArticlesVisible','homeVisible','loginVisible'))}>MyArticles</a>
        <a onClick={()=>this.props.toggleState('loginVisible','homeVisible','myArticlesVisible')}>Login</a>
        </div>
    }
}
