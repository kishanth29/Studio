import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, isAdmin }) {
    const { isAuthenticated, loading, user } = useSelector(state => state.authState);

    if (loading) {
        return <div>Loading...</div>; // Optionally handle loading state
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (isAdmin && user.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return children;
}
