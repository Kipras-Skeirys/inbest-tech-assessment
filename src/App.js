import NavBar from './common/NavBar'
import PostcodeLookUp from './postcodeLookUp'

function App() {
  return (
    <div className='App bg-lightGray min-h-full flex justify-center'>
      <NavBar />
      <main className='pt-16 sm:pt-24 mx-2 max-w-4xl w-full'>
        <PostcodeLookUp />
      </main>
    </div>
  )
}

export default App