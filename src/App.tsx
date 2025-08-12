import WeatherDashboard from './components/WeatherDashboard/WeatherDashboard';
import WeatherContextProvider from './contexts/WeatherContext';
import Footer from './components/Footer/Footer';

function App() {
    return (
        <div className='flex flex-col min-h-screen font-default'>
            <main className='flex-1 flex items-center justify-center p-4'>
                <WeatherContextProvider>
                    <WeatherDashboard />
                </WeatherContextProvider>
            </main>
            <Footer />
        </div>
    )
}

export default App;