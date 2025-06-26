
import React from 'react';
import { Button } from '@/components/ui/button';

interface OrderItem {
  quantity: number;
  price: number;
  products: {
    name: string;
  };
}

interface Order {
  id: string;
  user_id?: string;
  created_at: string;
  total_amount: number;
  status: string;
  order_items?: OrderItem[];
}

interface RecentOrdersTableProps {
  orders: Order[];
  onViewAllClick: () => void;
}

const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({ orders, onViewAllClick }) => {
  const getStatusClass = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return `₹${price.toFixed(2)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-100">
        <h3 className="font-semibold text-lg">Recent Orders</h3>
      </div>
      <div className="p-6">
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No orders found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-700 bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 font-medium">Order ID</th>
                    <th className="px-4 py-2 font-medium">Date</th>
                    <th className="px-4 py-2 font-medium">Items</th>
                    <th className="px-4 py-2 font-medium">Amount</th>
                    <th className="px-4 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="px-4 py-2 font-medium text-gray-900">#{order.id.slice(0, 8)}</td>
                      <td className="px-4 py-2">{formatDate(order.created_at)}</td>
                      <td className="px-4 py-2">{order.order_items?.length || 0} item(s)</td>
                      <td className="px-4 py-2">{formatPrice(order.total_amount)}</td>
                      <td className="px-4 py-2">
                        <span className={`text-xs px-2 py-0.5 rounded capitalize ${getStatusClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-indigo hover:text-indigo-700"
                onClick={onViewAllClick}
              >
                View All Orders
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecentOrdersTable;
