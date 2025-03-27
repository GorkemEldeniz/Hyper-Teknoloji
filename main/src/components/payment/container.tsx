import PaymentForm from "./form";
import ItemList from "./item-list";

export default function PaymentContainer() {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
			<div className='lg:col-span-2 order-2 lg:order-1'>
				<PaymentForm />
			</div>
			<div className='order-1 lg:order-2'>
				<ItemList />
			</div>
		</div>
	);
}
