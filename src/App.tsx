import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import WeatherCard from './components/WeatherCard/WeatherCard';
import WeatherContextProvider from './contexts/WeatherContext';

function App() {
  return (
    <div className='flex flex-col min-h-screen font-default'>
      <Header />
        <main className='flex-1 m-10'>
          <WeatherContextProvider>
            <WeatherCard />
          </WeatherContextProvider>
        </main>
      <Footer />
    </div>
  )
}

export default App;