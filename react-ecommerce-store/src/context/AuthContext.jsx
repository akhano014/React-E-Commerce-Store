import { createContext, useState, useEffect } from 'react';

// Create Context
export const AuthContext = createContext();

// Provider Component
export function AuthProvider({ children }) {
  // State: currentUser is the logged-in user (or null if not logged in)
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('shophub-user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
    setLoading(false);
  }, []);

  // Function 1: Signup - Create new user account
  const signup = (name, email, password) => {
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('shophub-users') || '[]');
    
    // Check if email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return { success: false, message: 'Email already registered' };
    }

    // Create new user object
    const newUser = {
      id: Date.now(), // Simple ID generation
      name,
      email,
      password, // WARNING: Never store plain passwords in real apps!
      createdAt: new Date().toISOString()
    };

    // Add to users array and save
    users.push(newUser);
    localStorage.setItem('shophub-users', JSON.stringify(users));

    // Log the user in automatically
    const userToSave = { id: newUser.id, name: newUser.name, email: newUser.email };
    setCurrentUser(userToSave);
    localStorage.setItem('shophub-user', JSON.stringify(userToSave));

    return { success: true, message: 'Account created successfully!' };
  };

  // Function 2: Login - Authenticate existing user
  const login = (email, password) => {
    // Get all users
    const users = JSON.parse(localStorage.getItem('shophub-users') || '[]');
    
    // Find user with matching email and password
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Set current user (don't include password)
    const userToSave = { id: user.id, name: user.name, email: user.email };
    setCurrentUser(userToSave);
    localStorage.setItem('shophub-user', JSON.stringify(userToSave));

    return { success: true, message: 'Login successful!' };
  };

  // Function 3: Logout - Clear current user
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('shophub-user');
  };

  // Function 4: Check if user is logged in
  const isLoggedIn = () => {
    return currentUser !== null;
  };

  // Value object: everything we want to share
  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    isLoggedIn
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
