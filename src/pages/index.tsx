import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('es-ES').format(num);
};

const parseBirthDate = (dateStr: string | null): Date => {
  if (!dateStr) return new Date('2000-02-02'); // fecha por defecto

  // Soporta formatos: DD/MM/YYYY o DD-MM-YYYY
  const parts = dateStr.split(/[/-]/);
  if (parts.length === 3) {
    const [day, month, year] = parts;
    // Mes - 1 porque en JavaScript los meses van de 0-11
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  
  return new Date('2000-02-02'); // fecha por defecto si el formato no es válido
};

const formatDisplayDate = (date: Date): string => {
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export default function HomePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  const birthDateParam = urlParams.get('birthdate');
  const birthDate = parseBirthDate(birthDateParam);
  
  console.log('Birth date param:', birthDateParam);
  console.log('Parsed birth date:', birthDate);

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
  }, [birthDate]);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-6">
      <div className="max-w-lg mx-auto">
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ¡Muchas Felicidades!
          </h1>
          {name && (
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-400 animate-fade-in">
              {name}
            </h2>
          )}
        </div>
        
        <p className="text-center mb-6 text-base sm:text-lg text-gray-300">
          Naciste el {formatDisplayDate(birthDate)}
        </p>

        <Card className="p-4 sm:p-6 text-center mb-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-700/50">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-4xl sm:text-6xl font-bold text-purple-400 font-mono tracking-tight break-all">
              {formatNumber(timeElapsed.seconds)}
              <span className="text-xl sm:text-3xl text-pink-400">.{String(timeElapsed.milliseconds).padStart(3, '0')}</span>
            </h3>
            <p className="text-base sm:text-lg text-gray-300 mt-2">Segundos</p>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <TimeCard value={timeElapsed.years} label="Años" />
          <TimeCard value={timeElapsed.months} label="Meses" />
          <TimeCard value={timeElapsed.weeks} label="Semanas" />
          <TimeCard value={timeElapsed.days} label="Días" />
          <TimeCard value={timeElapsed.hours} label="Horas" />
          <TimeCard value={timeElapsed.minutes} label="Minutos" />
        </div>
      </div>
    </div>
  );
}

const TimeCard = ({ value, label }: { value: number; label: string }) => (
  <Card className="p-3 sm:p-4 text-center bg-gray-900/50 border-purple-700/30">
    <h3 className="text-lg sm:text-xl font-bold text-purple-400 font-mono">
      {formatNumber(value)}
    </h3>
    <p className="text-sm sm:text-base text-gray-400">{label}</p>
  </Card>
);