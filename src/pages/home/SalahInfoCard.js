import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

// Utility function to format time
const formatTime = (time) => {
  const [hour, minute] = time.split(':').map(Number);
  return { hour, minute };
};

// Countdown Timer Component
const CountdownTimer = ({ countdown }) => {
  const hours = Math.floor(countdown / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);
  const seconds = countdown % 60;

  return (
    <View className="bg-orange-500 rounded-lg p-3 pr-8 pl-8 flex-row items-center">
      <View className="items-center">
        <Text className="text-white font-bold text-sm">{hours < 10 ? `0${hours}` : hours}</Text>
        <Text className="text-white text-xs">HRS</Text>
      </View>
      <Text className="text-white mx-2">|</Text>
      <View className="items-center">
        <Text className="text-white font-bold text-sm">{minutes < 10 ? `0${minutes}` : minutes}</Text>
        <Text className="text-white text-xs">MIN</Text>
      </View>
      <Text className="text-white mx-2">|</Text>
      <View className="items-center">
        <Text className="text-white font-bold text-sm">{seconds < 10 ? `0${seconds}` : seconds}</Text>
        <Text className="text-white text-xs">SEC</Text>
      </View>
    </View>
  );
};

const SalahInfoCard = () => {
  const [selectedCity, setSelectedCity] = useState('Makkah');
  const [salahTimes, setSalahTimes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(0); // Countdown to next Salah in seconds
  const [nextSalah, setNextSalah] = useState(null); // Store the next Salah name
  const [countdownInterval, setCountdownInterval] = useState(null); // For managing countdown interval

  const coordinates = {
    Makkah: { lat: 21.4225, lon: 39.8262 },
    Madina: { lat: 24.4686, lon: 39.6117 },
  };

  // Function to fetch Salah times from API
  const fetchSalahTimes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cityCoords = coordinates[selectedCity];
      const response = await axios.get('http://api.aladhan.com/v1/timings', {
        params: {
          latitude: cityCoords.lat,
          longitude: cityCoords.lon,
          method: 2, // Method for prayer time calculation (ISNA)
          date: 'today', // Get today's prayer times
        },
      });
      setSalahTimes(response.data.data.timings);
      calculateCountdown(response.data.data.timings);
    } catch (error) {
      setError('Error fetching Salah times. Please try again later.');
      console.error('Error fetching Salah times:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCity]);

  // Function to calculate the countdown to the next Salah
  const calculateCountdown = (timings) => {
    const currentTime = new Date();
    const prayerTimes = Object.entries(timings).map(([name, time]) => {
      const { hour, minute } = formatTime(time);
      const prayerTime = new Date(currentTime);
      prayerTime.setHours(hour);
      prayerTime.setMinutes(minute);
      prayerTime.setSeconds(0);
      return { name, time: prayerTime };
    });

    prayerTimes.sort((a, b) => a.time - b.time);
    const nextPrayer = prayerTimes.find((prayer) => prayer.time > currentTime);
    
    if (nextPrayer) {
      setNextSalah(nextPrayer.name);
      const timeRemaining = Math.floor((nextPrayer.time - currentTime) / 1000); // in seconds
      setCountdown(timeRemaining);

      // Clear existing interval before setting a new one
      if (countdownInterval) clearInterval(countdownInterval);

      const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 0) {
            clearInterval(interval); // Stop countdown if it reaches zero
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      setCountdownInterval(interval);
    }
  };

  useEffect(() => {
    fetchSalahTimes();
    return () => clearInterval(countdownInterval); // Cleanup on unmount or city change
  }, [fetchSalahTimes, selectedCity]); // Re-fetch Salah times when city changes

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4CA6FE" />
        <ActivityIndicator size="small" color="#4CA6FE" style={{ marginRight: 20, width:'120px' }} />
                  <Text className="p-4 flex-row items-center">
               
                Loading... The Account Details
              </Text>
        <Text>Loading Salah Times...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  if (!salahTimes || !nextSalah) {
    return null;
  }

  return (
    <View className="bg-white rounded-xl p-4 mx-4 my-2 shadow-lg">
      {/* Salah Name and Timing */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center space-x-2">
          <Text className="text-lg font-bold mr-5 text-[#4CA6FE]">{nextSalah}</Text>
          <Text className="text-lg font-bold text-gray-800">{salahTimes[nextSalah]}</Text>
        </View>
        <TouchableOpacity onPress={() => setSelectedCity(selectedCity === 'Makkah' ? 'Madina' : 'Makkah')}>
          <Text className="text-lg font-semibold text-gray-800">{selectedCity}</Text>
        </TouchableOpacity>
      </View>

      {/* Countdown Timer and Date/Month */}
      <View className="flex-row justify-between items-center">
        <CountdownTimer countdown={countdown} />
        <View className="items-center ml-4">
        <Text className="text-[24px] font-bold text-gray-800 text-right w-full">26</Text>
        <Text className="text-lg text-gray-600">November</Text>
        </View>
      </View>
    </View>
  );
};

export default SalahInfoCard;
