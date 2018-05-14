class Nav extends React.Component{

    render(){
        return <div className="nav_container master">

            <ul className="nav nav-pills">
            <h1 className="nav nav1">Chaos_Ordered</h1>
            <h1 className="nav nav1">POWEREDBY</h1>
            <li className="nav nav2">
                <li className="nav-item">
                        <a
                        className="nav-link active"
                        href="#" onClick={()=>this.props.toggleState('homeVisible','myArticlesVisible','loginVisible')}>Home</a>
                </li>
                <li className="nav-item">
                        <a className="nav-link active" href="#"

                         onClick={()=>{this.props.toggleState('myArticlesVisible','homeVisible','loginVisible')}}>MyArticles</a>
                </li>
                <li className="nav-item">
                        <a className="nav-link active" href="#" onClick={()=>this.props.toggleState('loginVisible','homeVisible','myArticlesVisible')}>Login</a>
                </li>
            </li>
            </ul>
        </div>
    }
}
// this.props.getMyArticles();
