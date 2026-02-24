import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault(); // Stop the form from reloading the page
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        alert('Login successful! Redirecting...');
        navigate('/');
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Something went wrong. Please try again.');
    }
  }

  return (
    <div className='flex justify-center p-4'>
      <div id='content' className='w-full max-w-3xl'>
        <h2 className='text-center text-3xl font-bold mb-6 text-gray-900'>Log in</h2>
        <form
          name='Login'
          onSubmit={handleSubmit}
          className='flex flex-col gap-4 bg-white p-5 border border-gray-200 rounded-2xl shadow-sm'
        >
          <div className='w-full'>
            <label htmlFor='username' className='block text-gray-700 font-semibold mb-2'>
              Username:
            </label>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div className='w-full'>
            <label htmlFor='password' className='block text-gray-700 font-semibold mb-2'>
              Password:
            </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition'
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
