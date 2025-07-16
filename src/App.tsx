import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainContainer from './components/MainContainer/MainContainer';
import WeatherCard from './components/WeatherCard/WeatherCard';

function App() {
  return (
    <div className='flex flex-col min-h-screen font-default'>
      <Header />
        <MainContainer>
          <WeatherCard />
        </MainContainer>
      <Footer />
    </div>
  )
}

export default App;