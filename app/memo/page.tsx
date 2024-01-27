'use client';

import TimeTable from '@/components/TimeTable';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const players = Number(searchParams.get('players'));
  const days = Number(searchParams.get('days'));
  const startTime = Number(searchParams.get('startTime'));
  const endTime = Number(searchParams.get('endTime'));
  const intervalTime = Number(searchParams.get('intervalTime'));

  if (isNaN(players) || isNaN(days) || isNaN(startTime) || isNaN(endTime) || isNaN(intervalTime))
    return <div>予期せぬエラーが発生しました</div>;

  const getTimes = (values: { days: number; startTime: number; endTime: number; interval: number }): string[] => {
    const times = [];

    for (let day = 1; day <= values.days; day++) {
      const startHour = day === 1 ? values.startTime : 0;
      const endHour = day === values.days ? values.endTime : 24;

      for (let h = startHour; h < endHour; h++) {
        for (let i = 0; i < 60 / values.interval; i++) {
          const minutes = values.interval !== 60 ? values.interval * i : 0;
          const time = `${h.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
          times.push(time);
        }
      }

      if (endHour !== 24) times.push(`${endHour.toString().padStart(2, '0')}:00`);
    }

    return times;
  };

  const getPlayerNames = (players: number) => {
    const newPlayers = [];
    for (let i = 1; i <= players; i++) {
      newPlayers.push(`player${i}`);
    }
    return newPlayers;
  };

  const times = getTimes({ days, startTime, endTime, interval: intervalTime });
  const playerNames = getPlayerNames(players);

  return <TimeTable times={times} playerNames={playerNames} />;
}
