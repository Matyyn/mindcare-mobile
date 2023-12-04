import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Audio } from 'expo-av';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

function SoundPlayer({ route,navigation}) {

  React.useLayoutEffect(() => {
    navigation.setOptions({

      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Daily Tasks")}>
          <Ionicons
            name="close"
            size={30}
            color="black"
            style={{marginRight:10}}
          />
        </TouchableOpacity>
      ),     
    });
  }, [navigation]);

  //check for the link and text
  let link = 'https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/Therapist%2FRescue%20Session%20Audios%2FDeep%20Breathing%20Exercises.mp3?alt=media&token=ff025d3a-e0e5-4048-abcd-240d7de27ded';
  let text = "Inhale slowly and deeply through your nose for 3 seconds. Your shoulders should be relaxed. Your stomach should be pushed out, and your chest should slightly rise.Exhale slowly through your mouth for 3 seconds.As you blow the air out, purse your lips slightly, but keep your jawrelaxed. You may hear a soft whooshing sound as you exhale.";
  
  const sound = useRef(new Audio.Sound());
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const isUserPaused = useRef(false);
  const [isTextMode, setIsTextMode] = useState(false);

  useEffect(() => {
    return () => {
      sound.current.unloadAsync();
    };
  }, []);

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(currentTime + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const loadAudio = async () => {
    try {
      const result = await sound.current.loadAsync({ uri: link }, {}, true);
      if (!result.isLoaded) {
        console.log('Error in Loading Audio');
      } else {
        setDuration(result.durationMillis);
        await playSound();
      }
    } catch (error) {
      console.log('Error in Loading Audio');
    }
  };

  const playSound = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (!result.isPlaying && !isUserPaused.current) {
          await sound.current.playAsync();
          setIsPlaying(true);
        }
      } else {
        await loadAudio();
      }
    } catch (error) {
      console.log('Error in Playing Audio');
    }
  };

  const stopSound = async () => {
    try {
      if (isPlaying) {
        await sound.current.stopAsync();
        setIsPlaying(false);
        setPosition(0);
      }
    } catch (error) {
      console.log('Error in Stopping Audio');
    }
  };

  const forward10Seconds = async () => {
    try {
      if (isPlaying) {
        const newPosition = position + 10000;
        await sound.current.setPositionAsync(newPosition);
        setPosition(newPosition);
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Error in Forwarding 10 Seconds', error);
    }
  };

  const backward10Seconds = async () => {
    try {
      if (isPlaying) {
        const newPosition = Math.max(0, position - 10000);
        await sound.current.setPositionAsync(newPosition);
        setPosition(newPosition);
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Error in Rewinding 10 Seconds', error);
    }
  };

  const togglePause = async () => {
    try {
      if (isPlaying) {
        await sound.current.pauseAsync();
        setIsPlaying(false);
        isUserPaused.current = true;
      } else {
        await playSound();
        isUserPaused.current = false;
      }
    } catch (error) {
      console.log('Error in Toggling Pause', error);
    }
  };

  const onPlaybackStatusUpdate = async (status) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      setPosition(status.positionMillis);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {isTextMode ? (
          <>
            <ScrollView style={{ height: '40%', width: '90%' }}>
            <Text style={{ fontWeight: '700', fontSize: 22,marginBottom:30 }}>Overview</Text>
              <Text style={{ fontWeight: '500', fontSize: 20, }}>{text}</Text>
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 100,
                marginBottom: 10,                
              }}>
              <TouchableOpacity
                onPress={() => setIsTextMode(false)}
                style={styles.exitTextModeButton}>
                <MaterialCommunityIcons
                  name="play-circle"
                  size={30}
                  color="black"
                />
                <Text style={{ fontSize: 18, fontWeight: '700' ,marginLeft:10}}>
                  Audio Mode
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>            
            <TouchableOpacity
              onPress={togglePause}
              style={{ marginBottom: 50, marginTop:150 }}>
              {isPlaying && !isUserPaused.current ? (
                <MaterialCommunityIcons
                  name="pause-circle"
                  size={100}
                  color="black"
                />
              ) : (
                <MaterialCommunityIcons
                  name="play-circle"
                  size={100}
                  color="black"
                />
              )}
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                gap: 55,
                borderRadius: 5,
              }}>
              <TouchableOpacity
                onPress={backward10Seconds}
                style={styles.iconButton}>
                <MaterialCommunityIcons
                  name="rewind-10"
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={forward10Seconds}
                style={styles.iconButton}>
                <MaterialCommunityIcons
                  name="fast-forward-10"
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                borderRadius: 5,
                marginTop: 30,
              }}>
              <TouchableOpacity
                onPress={() => setIsTextMode(true)}
                style={styles.iconButton}>
                <MaterialCommunityIcons
                  name="book-open-variant"
                  size={30}
                  color="black"
                />
                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                  Text Mode
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: 'lightgreen',
          padding:15,          
        }}>
        <TouchableOpacity style={{ backgroundColor: 'white',borderRadius:50,paddingRight:2,paddingLeft:2 }}  
         onPress={() => {
          navigation.navigate("Breathing Exercises Tips");
        }}
        >
          <Ionicons name="chevron-back" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: 'white',borderRadius:50,paddingRight:2,paddingLeft:2 }}
          onPress={() => {
            navigation.navigate("Deep Breathing Exercise Tip");
          }}>        
        {/* <TouchableOpacity style={{ backgroundColor: 'white',borderRadius:50,paddingRight:2,paddingLeft:2 }}> */}
          <Ionicons name="chevron-forward-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop:'10%',
    justifyContent: 'flex-start',
    backgroundColor: 'lightgreen',
    flexDirection: 'column',    
  },
  iconButton: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },  
  exitTextModeButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 30,
    padding: 10,
    alignItems: 'center',
  },
});

export default SoundPlayer;
