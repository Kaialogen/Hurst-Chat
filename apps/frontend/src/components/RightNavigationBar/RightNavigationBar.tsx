export default function RightNavigationBar() {
  return (
    <nav className='w-full flex flex-col justify-between p-2 h-screen'>
      <div className='bg-zinc-900 rounded-xl p-4 h-1/2'>
        <h3 className='text-white text-center pb-4 font-bold'>Popular Communities</h3>
        <ul className='text-white text-center'>
          <li>Example 1</li>
          <li>Example 2</li>
        </ul>
      </div>
      <div className='bg-zinc-900 rounded-xl p-4 h-32 mt-32'></div>
    </nav>
  );
}
