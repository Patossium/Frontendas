import {jwtDecode} from "jwt-decode";

export const useAuth = () => {
    const refreshTask = useState('refreshTask', () => null);

    const register = async (userDetails) => {
        try {
            const response = await fetch("http://localhost:5079/api/register", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userDetails),
            });

            if (response.ok) {
                return { status: response.status, message: 'Registration successful.' };
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    };

    const login = async (credentials) => {
        try {
            const response = await fetch("http://localhost:5079/api/login", {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const { accessToken: token } = await response.json();
                localStorage.setItem('AccessToken', token);

                const decoded = jwtDecode(token);
                const roles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || [];

                localStorage.setItem('Roles', JSON.stringify(roles));

                return { status: response.status, message: 'Login successful.' };
            } else if (response.status === 422) {
                return { status: response.status, message: 'Incorrect username or password.' };
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    };

    const logout = async () => {

        try {
            const response = await fetch(urlLogout, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok && response.status !== 422) {
                console.error('Logout failed:', await response.json());
            }
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            clearTokens();
        }
    };

    const clearTokens = () => {
        localStorage.removeItem('AccessToken');
        if (refreshTask.value) {
            clearTimeout(refreshTask.value);
            refreshTask.value = null;
            window.location.href = '/';
        }

    };

    return {
        register,
        login,
        logout,
        clearTokens,
    };
};