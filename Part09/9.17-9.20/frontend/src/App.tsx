// src/App.tsx
import React, { useEffect, useState } from 'react';
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      const diariesData = await getAllDiaries();
      setDiaries(diariesData);
    };

    fetchDiaries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const newDiary: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    try {
      const addedDiary = await createDiary(newDiary);
      setDiaries(diaries.concat(addedDiary));

      setDate('');
      setWeather(Weather.Sunny);
      setVisibility(Visibility.Great);
      setComment('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
    }
  };

  return (
    <div>
      <h1>Ilari's Flight Diaries</h1>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label><strong>Date:</strong></label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label><strong>Visibility:</strong></label>
          {Object.values(Visibility).map((v) => (
            <label key={v} style={{ marginLeft: '8px' }}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
        </div>

        <div>
          <label><strong>Weather:</strong></label>
          {Object.values(Weather).map((w) => (
            <label key={w} style={{ marginLeft: '8px' }}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </div>

        <div>
          <label><strong>Comment:</strong></label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button type="submit">Add</button>
      </form>

      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p><strong>Visibility:</strong> {diary.visibility}</p>
          <p><strong>Weather:</strong> {diary.weather}</p>
          {diary.comment && <p><strong>Comment:</strong> {diary.comment}</p>}
        </div>
      ))}
    </div>
  );
};

export default App;
