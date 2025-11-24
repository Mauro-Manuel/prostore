import { Metadata } from 'next';
import { notFound} from 'next/navigation';
//import { ShippingAddress } from '@/types';
import { getOrderById } from '@/lib/actions/order.actions';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Order Details',
};

const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {

  const { id } = await props.params;

  const order = await getOrderById(id);
  if (!order) notFound();

  const session = await auth();

  return <>Details {order.totalPrice}</>;
}
 
export default OrderDetailsPage;