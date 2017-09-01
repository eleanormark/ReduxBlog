import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

  renderField(field) {

    const { meta : { touched, error }} = field;
    const className = `form-group ${touched && error ? 'has-danger': ''}`
    
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          // onChange = {field.input.onChange }
          // onFocus = { field.input.onFocus }
          // onBlur = { field.input.onBlur }
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    // added bind so this === component
    console.log(values);
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });

  }

  render() {
    
    // handleSubmitis is a redux form property
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <Field label="Title" name="title" component={this.renderField} />
        <Field label="Categories" name="categories" component={this.renderField} />
        <Field label="Content" name="content" component={this.renderField} />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  console.log("In validate function with return values:", values);
  //console.log(values)  -->  {nameTitle: 'test01', nameCategories: 'test02', nameContent: 'test03'}
  
  //start with an empty obj
  const errors = {};

  //Validate the inputs from the 'values' obj
  if (!values.title) {
    errors.title = 'Enter a username';
  }
  if (!values.categories) {
    errors.categories = 'Enter categories';
  }
  if(!values.content) {
    errors.content = 'Enter some content';
  }

  // if errors is empty, the form is fine to ubmit
  // if errors has *any* prperties, redux-form assumes form is invalid
  return errors;
}


// connect and Reduxform helpers
// ReduxForm is only responsible for handling state and validation of our form
// ReduxForm is a helper that allow redux form to communicate
// directly from the component to the reducer we set up.
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, {createPost})(PostsNew) //returns react component
);
