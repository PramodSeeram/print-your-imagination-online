
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AdminStatCardProps {
  title: string;
  value: string;
  trend?: string;
  trendValue?: string;
  trendIsPositive?: boolean;
  icon: LucideIcon;
  iconBgClass: string;
  iconColorClass: string;
}

const AdminStatCard: React.FC<AdminStatCardProps> = ({
  title,
  value,
  trend,
  trendValue,
  trendIsPositive = true,
  icon: Icon,
  iconBgClass,
  iconColorClass
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          {trendValue && (
            <p className={`text-xs mt-1 ${trendIsPositive ? 'text-green-500' : 'text-red-500'}`}>
              {trendIsPositive ? '+' : '-'}{trendValue} {trend}
            </p>
          )}
        </div>
        <div className={`${iconBgClass} p-3 rounded-full`}>
          <Icon className={`h-6 w-6 ${iconColorClass}`} />
        </div>
      </div>
    </div>
  );
};

export default AdminStatCard;
