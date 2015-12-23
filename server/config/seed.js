/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
//import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Template from '../api/template/template.model';
//import Category from '../api/category/category.model';
/*
Thing.find({}).removeAsync()
  .then(function() {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });
*/

//If no admins exist, be sure to create one on restart.
User.find({'role':'admin'}, function(err, users){
if(users.length ==0){
    User.createAsync({
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@thisdomain.com',
      password: 'itsas3cret'
    })
}
});
//Populate the main template as well as the others with default values.
Template.find({'site':'hudiefly'}, function(err, templates){
if(templates.length==0){
	Template.createAsync({
		 name: "default main template",
	     content: "<div class='jumbotron'><h1> Welcome to Hudiefly!</h1></div>",
  	 	 path: "maincontent",
 	 	 site: "hudiefly"
	})
	Template.createAsync({
		 name: "default header template",
	     content: "<img src='assets/images/logo.png' alt='Hudiefly'>",
  	 	 path: "headercontent",
 	 	 site: "hudiefly"
	})

}
});

/*User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'itsas3cret'
    })
    .then(function() {
      console.log('finished populating users');
    });
    
  });*/
