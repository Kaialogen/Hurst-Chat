import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert('Signup successful! Redirecting...');
        navigate('/');
      } else {
        alert(data.message || 'Signup failed.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Something went wrong. Please try again.');
    }
  }

  return (
    <div className='flex justify-center p-4'>
      <div id='content' className='w-full max-w-3xl'>
        <h2 className='text-center text-3xl font-bold mb-6 text-gray-900'>Sign up</h2>
        <form
          name='Register'
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div className='w-full'>
            <label htmlFor='email' className='block text-gray-700 font-semibold mb-2'>
              Email:
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div className='w-full'>
            <label htmlFor='password2' className='block text-gray-700 font-semibold mb-2'>
              Confirm Password:
            </label>
            <input
              type='password'
              id='password2'
              name='password2'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition'
          >
            Submit
          </button>
          <Link to='/terms' className='text-center text-blue-600 p-6 w-full'>
            Terms and Conditions
          </Link>
        </form>
      </div>
    </div>
  );
}
