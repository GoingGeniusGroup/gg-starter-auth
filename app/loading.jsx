export default function Loading() {
  return (
    <div className='fixed inset-0 z-40 flex items-center justify-center bg-black'>
      <div className='size-16 animate-spin rounded-full border-4 border-blue-400 border-t-blue-600'></div>
    </div>
  )
}
