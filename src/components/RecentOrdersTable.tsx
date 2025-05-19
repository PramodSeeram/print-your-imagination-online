
import React from 'react';
import { Button } from '@/components/ui/button';

interface Order {
  id: string;
  customer: string;
  amount: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  date: string;
}

interface RecentOrdersTableProps {
  orders: Order[];
  onViewAllClick: () => void;
}

const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({ orders, onViewAllClick }) => {
  const getStatusClass = (status: string) => {
    switch(status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-100">
        <h3 className="font-semibold text-lg">Recent Orders</h3>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-700 bg-gray-50">
              <tr>
                <th className="px-4 py-2 font-medium">Order ID</th>
                <th className="px-4 py-2 font-medium">Customer</th>
                <th className="px-4 py-2 font-medium">Amount</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="px-4 py-2 font-medium text-gray-900">{order.id}</td>
                  <td className="px-4 py-2">{order.customer}</td>
                  <td className="px-4 py-2">{order.amount}</td>
                  <td className="px-4 py-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{order.date}</td>
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
      </div>
    </div>
  );
};

export default RecentOrdersTable;
