// No longer needed as a separate route or page,
// its functionality is now integrated into Reports.tsx
// by passing `selectedReport` to SingleReportView.
// This file can be removed or its content made minimal if a direct link is still desired.
// For now, I'll update it to redirect to /reports
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function SingleReport() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/reports', { replace: true });
  }, [navigate]);

  return null; // Or a loading spinner if needed during redirect
}