var prefix = 'http://fipeapi.appspot.com/api/1/carros/';

var loadMotors = function() {	
	React.render(
	        React.createElement(brandsBox, {url: prefix + 'marcas.json'}),
	        document.getElementById("mainHead")
	);	
}

var brandsBox = React.createClass({displayName: "BrandsBox",
	    getInitialState: function () {
	        return {data: []};
	    },
	    componentDidMount: function () {
	    	fetch(this.props.url, {  
	    	    method: 'GET'
	    	  }) 
	    	  .then((response) => {
	    		console.log('Request succeeded with JSON response', response);  		    	    
		        return response.json()
		      })
		      .then((data) => {
		        this.setState({ data: data })
		      })
	    	  ;
	    },
	    render: function () {
	    	if (typeof(this.state.data.error) != 'undefined' && this.state.data.error != null) {
	    		return (
			            React.createElement("div", {className: "brandBox"},
			            	React.createElement("label", {className: "labelForm"}, this.state.data.error)
			            	)
		        );  
	    	} else {
		        return (
			            React.createElement("div", {className: "brandBox"}, 
			                React.createElement("h1", null, "Marcas"), 
			                React.createElement(BrandList, {data: this.state.data})
			                )	
		        );
	    	}
	    }
});

var BrandList = React.createClass({displayName: "BrandList",
	getInitialState: function () {
        return {selected: ''};
    },
    onChange: function(event) {
      this.setState({selected: event.target.value});
    },
    render: function () {
    	   	
        var brandNodes = this.props.data.map(function (brand, index) {
            return (            		
                React.createElement(Brand, {brand: brand, key: index})
            );
        });
        return (
            React.createElement("select", {id: 'brands' , className: "brandList", onChange: findCarsByBrand },
                    React.createElement("option", {value: ''}, '-- Choose an Option --'),
            		brandNodes
            )
        );
    }
});

var Brand = React.createClass({displayName: "Brand",	
    render: function () {   	   	
        return (
            React.createElement("option", {className: "brand", value: this.props.brand.id }, this.props.brand.name)	               
            );
    }
});

var findCarsByBrand = function (selected){	
	React.render(
	        React.createElement(CarsBox, {url: prefix + 'veiculos/' + selected.target.value + '.json'}),
	        document.getElementById("carsHead")
	);	
}


var CarsBox = React.createClass({displayName: "CarsBox",
	    getInitialState: function () {
	        return {data: []};
	    },
	    componentDidMount: function () {
	    	fetch(this.props.url, {  
	    	    method: 'GET'
	    	  }) 
	    	  .then((response) => {
	    		console.log('Request succeeded with JSON response', response);  		    	    
		        return response.json()
		      })
		      .then((data) => {
		        this.setState({ data: data , url :  this.props.url})
		      });
	    },
	    shouldComponentUpdate: function(nextProps, nextState) {
	    	if (nextProps.url != nextState.url) {
	    		fetch(nextProps.url, {  
		    	    method: 'GET'
		    	  }) 
		    	  .then((response) => {		    	    
			        return response.json()
			      })
			      .then((data) => {
			        this.setState({ data: data , url :  this.props.url})
			      });
	    	}
	    	return true;
	    },
	    render: function () {
	    	if (typeof(this.state.data.error) != 'undefined' && this.state.data.error != null) {
	    		return (
			            React.createElement("div", {className: "CarsBox"},
			            	React.createElement("label", {className: "labelForm"}, this.state.data.error)
			            	)
		        );  
	    	} else {
		        return (
			            React.createElement("div", {className: "CarsBox"}, 
			                React.createElement("h1", null, "Veiculos"), 
			                React.createElement(CarList, {data: this.state.data})
			                )	
		        );
	    	}
	    }
});

var CarList = React.createClass({displayName: "CarList",
	render: function () {
    	   	
        var brandNodes = this.props.data.map(function (car, index) {
            return (            		
                React.createElement(Car, {car: car, key: index})
            );
        });
        return (
        	React.createElement("div", {className: "datagrid" }, 
	            React.createElement("table", {id: 'cars'},
	            		 React.createElement("thead", null,   
	            	    		React.createElement("th", null, 'Marca'),
	                    	    React.createElement("th", null, 'Modelo'),
	                            React.createElement("th", null, 'Codigo')            	             	    
	            	     ),
	            	    React.createElement("tbody", {key: Math.random()}, '', 
	            		brandNodes
	            		)
	            )
	        )
        );
    }
});


var Car = React.createClass({displayName: "Car",	
    render: function () {   	   	
        return (
	            React.createElement("tr", {id: this.props.car.id, name: this.props.car.key },
		                React.createElement("td", null, this.props.car.marca),
		                React.createElement("td", null, this.props.car.name),
		                React.createElement("td", null, this.props.car.fipe_name)
	            )	               
            );
    }
}); 