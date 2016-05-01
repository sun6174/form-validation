var TA = {

	// Initializing the function for form 
	formValidator: function(form, fields) {
		var that =  this;
		form.onsubmit = function() {
			if(!that.validateAll(form, fields)) {
				that.showMessages(that.errors);
				that.reset();		
				return false;
			}
			else {
				alert('form filled successfully');
			}
		};
	},
	// Reset the errrors to empty
	reset: function() {
		this.errors = [];
	},

	// function for capturing the fields by name 
	getElementByName: function(field) {
		return document.getElementsByName(field.name)[0];
	},
	// Validate function where all the validations get checked
	validateAll: function(form, fields) {
		var error = 0;
		for(var i = 0; i < fields.length; i++) {
			if(fields[i].email) {
				if( !this.validateEmailField(fields[i]) ) {
					error++;
				}
			}
			if(fields[i].phone) {
				if(!this.validatePhoneField(fields[i]));
				error++;
			}
			if(fields[i].dl) {
				if(!this.validateDrivingLicenseField(fields[i]));
				error++;
			}
			if(fields[i].address) {
				if(!this.validateAddressField(fields[i]));
				error++;
			}
			if(fields[i].city) {
				if(!this.validateCityField(fields[i]));
				error++;
			}
			if(fields[i].zip) {
				if(!this.validateZipField(fields[i]));
				error++;
			}
		}
		if(error > 0) {
			return false;
		}
		else
			return true;
	},

	// Validate Email function for Email input field
	validateEmailField: function(field) {
		var ele = this.getElementByName(field);
		var eleDataRequire = ele.getAttribute("data-require");
		if(eleDataRequire == "true"){
			if( this.isEmpty(ele, field) ) return false;
		
			if( !this.validateEmail(ele.value) ) {
				this.pushError(ele, this.messages.email);
				return false;
			}
			if( !this.isRangeValid(ele, field, field.range[0], field.range[1]) ) return false;
			if(!this.validateRange(ele.value,field.range[0], field.range[1])) return false;
			return true;
		} else return false;
		
	},
	validateEmail: function(email) {
		return ( regex.email.test(email) ) ? true : false;
	},
	validateRange: function(eleValue,starting, ending) {
		var valid = (eleValue.length > starting && eleValue.length <= ending)
		return valid;
	},
	// Validations for Contact number
	validatePhoneField: function(field) {
		var ele = this.getElementByName(field);
		var eleDataRequire = ele.getAttribute("data-require");
		if(eleDataRequire == "true"){
			if( this.isEmpty(ele, field) ) return false;
			if(field.trim == true ){
				removeSpaceAndHyphens = ele.value.replace(/-|\s/g,"");	
			}
			else removeSpaceAndHyphens = ele.value;
			if( !this.validatePhone(removeSpaceAndHyphens) ) {
				this.pushError(ele, this.messages.phone);
				return false;
			}
			if( !this.isRangeValid(ele, field, field.range[0], field.range[1]) ) return false;
			if(!this.validateRange(ele.value,field.range[0], field.range[1])) return false;
			return true;
		} else return false;
	},
	validatePhone: function(phone) {
		return ( regex.phone.test(phone) ) ? true : false;
	},
	// Validations for Driving License
	validateDrivingLicenseField: function(field) {
		var ele = this.getElementByName(field);
		var eleDataRequire = ele.getAttribute("data-require");
		if(eleDataRequire == "true"){
			if( this.isEmpty(ele, field) ) return false;
			if(field.trim == true ){
				var removeSpaceAndHyphens = ele.value.replace(/-|\s/g,"");	
			}
			else var removeSpaceAndHyphens = ele.value;
			if( !this.validateDrivingLicense(removeSpaceAndHyphens) ) {
				this.pushError(ele, this.messages.dl);
				return false;
			}
			if( !this.isRangeValid(ele, field, field.range[0], field.range[1]) ) return false;
			if(!this.validateRange(ele.value,field.range[0], field.range[1])) return false;
			return true;
		} else return false;
	},
	validateDrivingLicense: function(dl) {
		return ( regex.dl.test(dl) ) ? true : false;
	},
	// Validations for Address fields
	validateAddressField: function(field) {
		var ele = this.getElementByName(field);
		var eleDataRequire = ele.getAttribute("data-require");
		if(eleDataRequire == "true"){
			if( this.isEmpty(ele, field) ) return false;
			if( !this.validateAddress(ele.value) ) {
				this.pushError(ele, this.messages.address);
				return false;
			}
			if( !this.isRangeValid(ele, field, field.range[0], field.range[1]) ) return false;
			if(!this.validateRange(ele.value,field.range[0], field.range[1])) return false;
			return true;
		} else return false;
	},
	validateAddress: function(address) {
		return ( regex.address.test(address) ) ? true : false;
	},
	// Validations for city fields
	validateCityField: function(field) {
		var ele = this.getElementByName(field);
		var eleDataRequire = ele.getAttribute("data-require");
		if(eleDataRequire == "true"){
			if( this.isEmpty(ele, field) ) return false;
			if( !this.validateCity(ele.value) )  {
				this.pushError(ele, this.messages.city);
				return false;
			}
			if( !this.isRangeValid(ele, field, field.range[0], field.range[1]) ) return false;
			if(!this.validateRange(ele.value,field.range[0], field.range[1])) return false;
			return true;
		} else return false;
	},
	validateCity: function(city) {
		return ( regex.city.test(city) ) ? true : false;
	},
	// Validations for Zip/postal code
	validateZipField: function(field) {
		var ele = this.getElementByName(field);
		var eleDataRequire = ele.getAttribute("data-require");
		if(eleDataRequire == "true"){
			if( this.isEmpty(ele, field) ) return false;
			if( !this.validateZip(ele.value) ) {
				this.pushError(ele, this.messages.zip);
				return false;
			}
			if( !this.isRangeValid(ele, field, field.range[0], field.range[1]) ) return false;
			if(!this.validateRange(ele.value,field.range[0], field.range[1])) return false;
			return true;
		} else return false;
	},
	validateZip: function(zip) {
		return ( regex.zip.test(zip) ) ? true : false;
	},
	// function to check range with starting and ending values defined in fields array
	isRangeValid: function(element, field, s, e) {
		var valid = (element.value.length > s && element.value.length <= e)
		if( !valid ) this.pushError(element, this.messages.range(field.range[0], field.range[1]));
		return valid;
	},
	// function to check whether the field is empty or not
	isEmpty: function(ele, field) {
		var value = ele.value.trim();
		if( value == "" ) this.pushError(ele, this.messages.required(field.name));
		return (value == "");
	},
	// function for pushing errors
	pushError: function(element, message) {
		this.errors.push({field: element, message: message});
	},

	// Error Messages 
	messages: {
		required: function(name){
			return "This " + name + " is required."
		},
		range: function(s ,e){
			return "range should be between " + s + " and " + e ;
		},
		email: "This email is not valid",
		phone: "This contact number is not valid",
		dl:    "This drving license is not valid",
		address: "This Address is not valid",
		city: "City name is not valid",
		zip: "zip/postal code is not valid"

	},
	errors: [],
	showMessages: function(errors) {
		var errorListStr = "<ul>";
		for (var i = 0; i < errors.length; i++) {
			errorListStr += '<li>' + errors[i]['message'] + '</li>';
		}
		errorListStr += "</ul>";
		document.getElementById('validationErrors').innerHTML = errorListStr;		
	}
};

// regex for all the fields 
var regex = {
	email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	phone: /^\d([- ]*\d){1,21}$/,
	dl: /^[0-9a-zA-Z/ -]+$/,
	address : /^[a-zA-Z0-9\s,'-]*$/,
	city: /^(?:[a-zA-Z]+(?:[.'\-,])?\s?)+$/,
	zip: /^([a-zA-Z0-9_-]){1,11}$/
}
