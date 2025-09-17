import WeatherDashboard from './components/WeatherDashboard/WeatherDashboard.tsx';
import WeatherContextProvider from './contexts/WeatherContext.tsx';
import Footer from './components/Footer/Footer.tsx';
import ThemeProvider from './contexts/ThemeContext.tsx';

function App() {
    return (
        <div className='flex flex-col min-h-screen font-default'>
            <ThemeProvider>
                <main className='flex-1 flex items-center justify-center p-4'>
                    <WeatherContextProvider>
                        <WeatherDashboard />
                    </WeatherContextProvider>
                </main>
                <Footer />
            </ThemeProvider>
        </div>
    )
}

export default App;