import { Container} from 'react-bootstrap';

import Header from './components/Header'
import Footer from './components/Footer'
import './App.css';

import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomeScreen from './components/screens/HomeScreen';
import CourseScreen from './components/screens/CourseScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import UserListScreen from './components/screens/UserListScreen';
import UserEditScreen from './components/screens/UserEditScreen';
import CourseListScreen from './components/screens/CourseListScreen';
import CourseEditScreen from './components/screens/CourseEditScreen';

import AuthorListScreen from './components/screens/AuthorListScreen';
import AuthorEditScreen from './components/screens/AuthorEditScreen';
import AuthorCreateScreen from './components/screens/AuthorCreateScreen';

function App() {
  return (
    <Router>
      <Header/>
        <main className="py-5">
          <Container>
            <Route path="/register" component={RegisterScreen}/>
            <Route path="/login" component={LoginScreen}/>
            <Route path="/profile" component={ProfileScreen}/>
            <Route path="/" component={HomeScreen} exact/>
            <Route path="/course/:id" component={CourseScreen} />

            <Route path="/admin/userList" component={UserListScreen}/>
            <Route path="/admin/user/:id/edit" component={UserEditScreen}/>

            <Route path="/admin/courseList" component={CourseListScreen}/>
            <Route path="/admin/course/:id/edit" component={CourseEditScreen}/>

            <Route path="/admin/addAuthor" component={AuthorCreateScreen}/>
            <Route path="/admin/authorList" component={AuthorListScreen}/>
            <Route path="/admin/author/:id/edit" component={AuthorEditScreen}/>
          </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
