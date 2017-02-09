
var loadServer = function (titles) {
    var data = Java.from(titles);
    return React.renderToString(
        React.createElement(ForumTitle, {data: data})
    );
};

var ForumTitle = React.createClass({displayName: "ForumTitle",
	getInitialState: function () {
        return {data: this.props.data};
    },
	render: function () {
        return (
            React.createElement("div", {className: "ForumTitle"}, 
            		React.createElement("ul", null, 
            				this.state.data.map(function(item){
                 	            return React.createElement("li", null, item.title + ": " + item.current);
                 	          }))          		 
                )
        );
    }
});

var loadClient = function (forums) {
    var data = forums || [];
    React.render(
        React.createElement(ForumBox, {data: data, url: "forums.json", pollInterval: 20000}),
        document.getElementById("contentSibling")
    );
};

var ForumBox = React.createClass({displayName: "ForumBox",
   
    loadForumsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {data: this.props.data};
    },
    componentDidMount: function () {
        this.loadForumsFromServer();
        setInterval(this.loadForumsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            React.createElement("div", {className: "forumBox"}, 
                React.createElement("h1", null, "Forums"), 
                React.createElement(FoumList, {data: this.state.data})
                )
        );
    }
});

var FoumList = React.createClass({displayName: "FoumList",
    render: function () {
    	    	
        var forumNodes = this.props.data.map(function (forum, index) {
            return (
                React.createElement(Forum, {forum: forum, key: index}
                )
            );
        });
        return (
            React.createElement("div", {className: "foumList"}, 
            		forumNodes
            )
        );
    }
});

var Forum = React.createClass({displayName: "Forum",	
    render: function () {   	   	
        return (
            React.createElement("div", {className: "forum"}, 
                React.createElement("h2", null, this.props.forum.category),   
                React.createElement("ul", null, 
                		this.props.forum.issues.map(function(item){
             	            return React.createElement("li", null, item);
             	          }))	               
            )
        );
    }
});
