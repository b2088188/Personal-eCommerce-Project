import React, {useEffect, useContext} from 'react';
import UserContext from '../../stores/user/userContext';
import Sidebar from '../../layout/Sidebar';
import UserOrderItem from './UserOrderItem';
import Spinner from '../../utils/Spinner';
import Message from '../../utils/Message';


const UserOrder = () => {
	const {orders, loading, error, getUserOrders} = useContext(UserContext);

	useEffect(() => {
		getUserOrders();
	}, [getUserOrders])

	function renderUserOrders(list) {
		return list.map(function generateItem(order) {
			return <UserOrderItem  key = {order._id} order = {order}/>
		})
	}

	if(loading)
      return <Spinner />
    if(error)
      return <Message severity = 'error' alert = {error} /> 
	return (
		<div className="container">			
		<div className = 'profile-view'>
			<div className="profile-view__nav">
				<Sidebar />
			</div>
 			<div className="profile-view__container">
 				<div className="profile-view__tablebox"> 					
 				<h2 className = 'profile-view__title'>My Orders</h2>
 				<table className = 'profile-view__table'>
 					<tr className = 'profile-view__tr'>
 						<td className = 'profile-view__td'>Id</td>
 						<td className = 'profile-view__td'>Date</td>
 						<td className = 'profile-view__td'>Total</td>
 						<td className = 'profile-view__td'>Paid</td>
 						<td className = 'profile-view__td'>Delivered</td>
 						<th></th>
 					</tr>
 					<tbody>
 						{renderUserOrders(orders)}
 					</tbody>
 				</table>
 				</div>
 			</div>
		</div>
		</div>
		)
}

export default UserOrder;