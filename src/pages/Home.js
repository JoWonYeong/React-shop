import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Home(props) {

    useEffect(() => {
        sessionStorage.setItem('num', '1')
    }, [])
    let [click, setClick] = useState(parseInt(sessionStorage.getItem('num')))

    return (
        <>
            <div className='main-bg' style={{ backgroundImage: 'url(' + props.backImg + ')' }}></div>
            <Container>
                <Row>
                    {
                        props.clothes.map(function (a, i) {
                            return (
                                <Card key={i} clothes={props.clothes[i]} i={i} />
                            )
                        })
                    }
                </Row>
            </Container>
            {
                click < 3 ?
                    <button onClick={() => {
                        sessionStorage.setItem('num', ++click)
                        setClick(parseInt(sessionStorage.getItem('num')))
                        // setClick(++click);
                        axios.get('https://codingapple1.github.io/shop/data' + click + '.json')
                            .then((result) => {
                                // let arr = [...props.clothes, ...result.data];
                                let arr = props.clothes.concat(result.data);
                                props.setClothes(arr);
                            })
                            .catch(() => {
                                console.log('실패');
                            })
                    }}>더보기</button> : null
            }

        </>
    )
}

function Card(props) {
    let navigate = useNavigate();
    return (
        <Col md={4} onClick={() => { navigate('/detail/' + props.clothes.id) }}>
            <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} alt="없음" width='80%' />
            <h4>{props.clothes.title}</h4>
            <p>
                {props.clothes.content} <br />
                ₩{props.clothes.price}
            </p>
        </Col>
    )
}
export { Home }