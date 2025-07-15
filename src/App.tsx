import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className='flex flex-col min-h-screen font-default'>
      <Header />
      <main className='flex-1 flex items-center justify-center'>
        <p className='text-9xl font-semibold'>Weather app</p>
      </main>
      <Footer />
    </div>
  )
}

export default App;