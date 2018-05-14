class Nav extends React.Component{

    render(){
        return <div className=" navbar is-dark nav_container master">


            <h1 className="navbar-brand title1 nav nav1">Chaos_Ordered</h1><br/>

            <div className="navbar-end">
                <a
                className=" navbar-item nav-link active"
                href="#" onClick={()=>this.props.toggleState('homeVisible','myArticlesVisible','loginVisible')}>Home</a>

                <a className=" navbar-item nav-link active"
                href="#" onClick={()=>{this.props.toggleState('myArticlesVisible','homeVisible','loginVisible')}}>MyArticles</a>

                <a className="navbar-item nav-link active" href="#" onClick={()=>this.props.toggleState('loginVisible','homeVisible','myArticlesVisible')}>Login</a>
            </div>
        </div>
    }
}
