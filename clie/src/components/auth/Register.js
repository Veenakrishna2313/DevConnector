import React, { Component } from 'react'

 class Register extends Component {

constructor(){

super();

// local state
this.state={
name:'',
email:'',
password:'',
password2:'',
errors:{}

};
this.onChange=this.onChange.bind (this);
}

onChange(e){

  this.setState({[e.target.name]:e.target.value})
}

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form action="create-profile.html">
                <div className="form-group">
                  <input
                    type="text"
                    value={this.state.name}
                    onChange={this.onChange}
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                  />
                  <small classNameName="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="password2"
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;