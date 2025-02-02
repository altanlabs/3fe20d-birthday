import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

export default function HomePage() {
  const birthDate = new Date('2000-02-02');
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - birthDate.getTime();

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 30.44); // Average month length
      const years = Math.floor(days / 365.25); // Account for leap years

      setTimeElapsed({
        years,
        months,
        weeks,
        days,
        hours,
        minutes,
        seconds
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          ¡Muchas Felicidades!
        </h1>
        
        <p className="text-center mb-8 text-lg">
          Naciste el 2 de Febrero del 2000
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-6 text-center">
            <h3 className="text-2xl font-bold text-purple-600">{timeElapsed.years}</h3>
            <p className="text-gray-600 dark:text-gray-400">Años</p>
          </Card>

          <Card className="p-6 text-center">
            <h3 className="text-2xl font-bold text-purple-600">{timeElapsed.months}</h3>
            <p className="text-gray-600 dark:text-gray-400">Meses</p>
          </Card>

          <Card className="p-6 text-center">
            <h3 className="text-2xl font-bold text-purple-600">{timeElapsed.weeks}</h3>
            <p className="text-gray-600 dark:text-gray-400">Semanas</p>
          </Card>

          <Card className="p-6 text-center">
            <h3 className="text-2xl font-bold text-purple-600">{timeElapsed.days}</h3>
            <p className="text-gray-600 dark:text-gray-400">Días</p>
          </Card>

          <Card className="p-6 text-center">
            <h3 className="text-2xl font-bold text-purple-600">{timeElapsed.hours}</h3>
            <p className="text-gray-600 dark:text-gray-400">Horas</p>
          </Card>

          <Card className="p-6 text-center">
            <h3 className="text-2xl font-bold text-purple-600">{timeElapsed.minutes}</h3>
            <p className="text-gray-600 dark:text-gray-400">Minutos</p>
          </Card>

          <Card className="p-6 text-center col-span-1 md:col-span-2 lg:col-span-3">
            <h3 className="text-2xl font-bold text-purple-600">{timeElapsed.seconds}</h3>
            <p className="text-gray-600 dark:text-gray-400">Segundos</p>
          </Card>
        </div>
      </div>
    </div>
  );
}