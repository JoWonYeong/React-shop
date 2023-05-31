import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { changeName, addAge } from './../store/userSlice.js';
import { addCount, subItem } from './../store.js';

function Cart() {

    let cart = useSelector((state) => { return state.cart })
    let user = useSelector((state) => { return state.user })
    let dispatch = useDispatch()

    return (
        <div>
            <h6>{user.name}({user.age})의 장바구니</h6>
            <button onClick={() => { dispatch(addAge(2)) }}>버튼</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map(function (a, i) {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{a.name}</td>
                                    <td>{a.count}</td>
                                    <td>
                                        <button onClick={() => {
                                            let b = cart.findIndex(e => e.id == a.id)
                                            dispatch(addCount(b))
                                        }}>+</button>
                                        <button onClick={() => {
                                            let b = cart.findIndex(e => e.id == a.id)
                                            dispatch(subItem(b))
                                        }} style={{ margin: '5px', padding: '1px 9px' }}>
                                            -
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div >
    )
}

export default Cart