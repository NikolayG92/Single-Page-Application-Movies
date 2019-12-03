import { getHome } from './controllers/homeController.js';
import { getLogin, postLogin, getRegister, postRegister, logoutUser } from './controllers/userController.js';
import { getCreate, postCreate, getDetails, getMovies, getMyMovies, buyTicket, getEdit, postEdit, getDelete, postDelete } 
from './controllers/movieController.js'


const app = Sammy('body', function(){
   this.use('Handlebars', 'hbs');
   this.get('#/home', getHome);

   this.get('#/login', getLogin);
   this.post('#/login', postLogin);

   this.get('#/register', getRegister);
   this.post('#/register', postRegister);
   this.get('#/logout', logoutUser);

   this.get('#/create', getCreate);
   this.post('#/create', postCreate);
   this.get('#/details/:id', getDetails);
   this.get('#/cinema', getMovies);
   this.get('#/myMovies', getMyMovies);
   this.get('#/buy/:id', buyTicket);
   this.get('#/edit/:id', getEdit);
   this.post('#/edit/:id', postEdit);
   this.get('#/delete/:id', getDelete);
   this.post('#/delete/:id', postDelete);

});
app.run('#/home');