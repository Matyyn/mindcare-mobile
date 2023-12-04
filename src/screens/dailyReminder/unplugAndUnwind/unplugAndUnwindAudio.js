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
      title:'Unplug & Unwind Audio',
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
  let link = 'https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/Therapist%2FRescue%20Session%20Audios%2Fgrounding%20techniques.mp3?alt=media&token=fbd8c6d2-dd09-45df-9a2d-5d2d5ca7a4e0';
  let text = "Sometimes when you're feeling stressed or anxious, you may start to ruminate on negative thoughts and become lost in them. Today, we're going to do a quick grounding technique to help activate your five senses and stay in the present moment.Let's start with what you can see. Look around you and name five things you can see. It could be a bird, a pencil, a tree, or even a scratch on the ceiling. Pay attention to their colors and textures, and linger your eyes on them for a moment.Now, let's move on to what you can touch. Identify four things you can touch around you. It could be your phone, your hair, your table, and so on. Notice what each item feels like as you touch it. Is it soft or rough? Is it hot or cold? Take a moment to appreciate how it feels.When you're ready, name three things you can hear. Turn your attention to your surroundings and focus on the ambient noises you can hear, such as a ticking clock, birdsong, or a car engine.Now, try to identify two things you can smell. You could walk around and pick up something, like fresh laundry, a scented candle, or perfume. Is it a strong or a weak smell? Is the scent pleasant?Lastly, notice one thing you can taste. If you don't taste anything, you could chew on a piece of gum or sip some coffee. What is its flavor? Is it sweet or bitter?When you're done, take a moment to thank yourself for giving yourself these few minutes to reset and take care of yourself.";
  
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
          navigation.navigate("UnwindLast");
        }}
        >
          <Ionicons name="chevron-back" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: 'white',borderRadius:50,paddingRight:2,paddingLeft:2 }}
          onPress={() => {
            navigation.navigate("unplugunwindlast tip");
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
