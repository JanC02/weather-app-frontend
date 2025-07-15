import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainContainer from './components/MainContainer/MainContainer';

function App() {
  return (
    <div className='flex flex-col min-h-screen font-default'>
      <Header />
        <MainContainer />
      <Footer />
    </div>
  )
}

export default App;