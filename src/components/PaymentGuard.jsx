import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PaymentGuard = () => {
    const { user, isPaid, loading } = useAuth();

    if (loading) return <div className="font-mono p-8">核查中……</div>

    if (!user) {
        return <Navigate to="/" replace />
    }

    if (!isPaid) {
        return <Navigate to="/activate" replace />
    }

    return <Outlet />
};

export default PaymentGuard