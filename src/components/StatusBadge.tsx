
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'ok' | 'pending' | 'tbd' | 'consult';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusLabels: Record<StatusType, string> = {
  ok: 'OK',
  pending: 'Pending',
  tbd: 'TBD',
  consult: 'Consult',
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        'status-badge',
        {
          'status-ok': status === 'ok',
          'status-pending': status === 'pending',
          'status-tbd': status === 'tbd',
          'status-consult': status === 'consult',
        },
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
};

export default StatusBadge;
