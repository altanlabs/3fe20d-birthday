import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('es-ES').format(num);
};

export default function HomePage() {
  // Obtener el parámetro name de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  
  console.log('URL Params:', window.location.search); // Debug log
  console.log('Name param:', name); // Debug log

  const birthDate = new Date('2000-02-02');
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - birthDate.getTime();

      const milliseconds = diff % 1000;
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 30.44);
      const years = Math.floor(days / 365.25);

      setTimeElapsed({
        years,
        months,
        weeks,
        days,
        hours,
        minutes,
        seconds,
        milliseconds
      });
    };

    const interval = setInterval(calculateTime, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ¡Muchas Felicidades!
          </h1>
          {name && (
            <h2 className="text-3xl font-bold text-purple-500 animate-fade-in">
              {name}
            </h2>
          )}
        </div>
        
        <p className="text-center mb-8 text-lg">
          Naciste el 2 de Febrero del 2000
        </p>

        <Card className="p-8 text-center mb-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-6xl md:text-7xl lg:text-8xl font-bold text-purple-400 font-mono tracking-tight">
              {formatNumber(timeElapsed.seconds)}
              <span className="text-3xl md:text-4xl lg:text-5xl text-pink-500">.{String(timeElapsed.milliseconds).padStart(3, '0')}</span>
            </h3>
            <p className="text-xl text-gray-400 mt-2">Segundos</p>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="p-6 text-center bg-gray-900/50">
            <h3 className="text-2xl font-bold text-purple-400 font-mono">{formatNumber(timeElapsed.years)}</h3>
            <p className="text-gray-400">Años</p>
          </Card>

          <Card className="p-6 text-center bg-gray-900/50">
            <h3 className="text-2xl font-bold text-purple-400 font-mono">{formatNumber(timeElapsed.months)}</h3>
            <p className="text-gray-400">Meses</p>
          </Card>

          <Card className="p-6 text-center bg-gray-900/50">
            <h3 className="text-2xl font-bold text-purple-400 font-mono">{formatNumber(timeElapsed.weeks)}</h3>
            <p className="text-gray-400">Semanas</p>
          </Card>

          <Card className="p-6 text-center bg-gray-900/50">
            <h3 className="text-2xl font-bold text-purple-400 font-mono">{formatNumber(timeElapsed.days)}</h3>
            <p className="text-gray-400">Días</p>
          </Card>

          <Card className="p-6 text-center bg-gray-900/50">
            <h3 className="text-2xl font-bold text-purple-400 font-mono">{formatNumber(timeElapsed.hours)}</h3>
            <p className="text-gray-400">Horas</p>
          </Card>

          <Card className="p-6 text-center bg-gray-900/50">
            <h3 className="text-2xl font-bold text-purple-400 font-mono">{formatNumber(timeElapsed.minutes)}</h3>
            <p className="text-gray-400">Minutos</p>
          </Card>
        </div>
      </div>
    </div>
  );
}