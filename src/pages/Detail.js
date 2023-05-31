import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Nav } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { addCount, addItem } from './../store.js'

function Detail(props) {

    let { id } = useParams();
    let clothes = props.clothes.find(e => e.id == id);
    let [fade, setFade] = useState('')
    let [alert, setAlert] = useState(true)
    let [num, setNum] = useState('');
    let [tab, setTab] = useState(0);
    let dispatch = useDispatch();
    let cart = useSelector((state) => { return state.cart })

    useEffect(() => {
        let nowArr = JSON.parse(localStorage.getItem('watched'))
        nowArr = [...nowArr, id]
        let set = new Set(nowArr)
        let watched = [...set]
        localStorage.setItem('watched', JSON.stringify(watched))
    }, [])

    useEffect(() => {
        setFade('end')

        // setTimeout(() => { setFade('end') }, 10);
        // return ()=>{
        //     setFade('')
        // }
    }, [])

    useEffect(() => {
        let timer = setTimeout(() => { setAlert(false); }, 2000);

        return () => {
            clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        if (isNaN(num)) {
            // 숫자가 아닐 때
            window.alert('숫자만 입력해 주세요');
        }
    }, [num])

    return (
        <div className={`container start ${fade}`}>
            {
                alert ?
                    <div className="alert alert-warning">
                        2초 이내 구매시 할인
                    </div> : null
            }
            <div className="row">
                <div className="col-md-6">
                    <img src={'https://codingapple1.github.io/shop/shoes' + (clothes.id + 1) + '.jpg'} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{clothes.title}</h4>
                    <p>
                        {clothes.content} <br />
                        ₩{clothes.price}
                    </p>
                    <input type="text" onChange={(e) => { setNum(e.target.value) }} />
                    <button className="btn btn-danger" onClick={() => {
                        let check = cart.find(cart => cart.id == clothes.id)
                        if (check) {
                            // cart에 존재한다면
                            let b = cart.findIndex(e => e.id == clothes.id)
                            dispatch(addCount(b))
                            window.alert('장바구니에 이미 존재하는 상품으로 수량이 추가되었습니다.')
                        } else {
                            let item = { id: clothes.id, name: clothes.title, count: 1 }
                            dispatch(addItem(item))
                            window.alert('장바구니에 추가되었습니다.')
                        }
                    }} style={{ margin: '5px' }}>주문하기</button>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={() => { setTab(0); }}>버튼 0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={() => { setTab(1); }}>버튼 1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={() => { setTab(2); }}>버튼 2</Nav.Link>
                </Nav.Item>
            </Nav>

            <TabContent tab={tab} />

        </div >
    )
}

function TabContent({ tab }) {
    // if (tab == 0) {
    //     return <div>내용0</div>
    // }
    // if (tab == 1) {
    //     return <div>내용1</div>
    // }
    // if (tab == 2) {
    //     return <div>내용2</div>
    // }

    let [fade, setFade] = useState('')
    useEffect(() => {
        setTimeout(() => { setFade('end'); }, 10);
        return () => {
            setFade('')
        }
    }, [tab])

    return <div className={`start ${fade}`}>
        {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
}

export default Detail