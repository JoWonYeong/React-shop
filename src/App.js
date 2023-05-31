import './App.css';
import { Button, Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { useState, createContext } from 'react';
import data from './data.js';
import backImg from './img/bg.png';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import { Home } from './pages/Home.js'
import Detail from './pages/Detail.js'
import Cart from './pages/Cart.js'
import { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

function App() {

  useEffect(() => {
    if (!localStorage.getItem('watched')) {
      localStorage.setItem('watched', JSON.stringify([]))
    }
  }, [])

  let [clothes, setClothes] = useState(data);
  let navigate = useNavigate();

  let result = useQuery(['작명'], () => {
    return axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
      // console.log('요청됨')
      return a.data
    })
  })
  // console.log(result.data)

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Clothing Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail/0') }}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/about') }}>About</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {result.isLoading ? '로딩중' : result.data.name}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<Home clothes={clothes} setClothes={setClothes} backImg={backImg} />} />
        <Route path='/detail/:id' element={<Detail clothes={clothes} />} />
        <Route path='/about' element={<About />}>
          <Route path='member' element={<h5>멤버임</h5>} />
          <Route path='location' element={<h5>위치정보임</h5>} />
        </Route>
        <Route path='cart' element={<Cart />} />
        <Route path='*' element={<div>존재하지 않는 페이지입니다.</div>}></Route>
      </Routes>


    </div >
  );
}

function About() {
  return (
    <>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
      <div>우리회사 많이 사랑해주세요</div>
    </>
  )
}

export default App;
