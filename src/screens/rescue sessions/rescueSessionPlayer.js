import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,Icon,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Audio } from 'expo-av';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

function SoundPlayer({ route,navigation}) {
  
  const { journalTitle } = route.params;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: journalTitle,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate("rescue sessions main")}>
          <Ionicons
            name="close"
            size={30}
            color="black"
            style={{marginRight:10}}
          />
        </TouchableOpacity>
      ),
      // headerRight: () => (
      //   <TouchableOpacity onPress={() => navigation.navigate('RescueSessionsTab')}>
      //     <Icon name="clipboard-list" size={30} color="black" style={styles.copyIcon} />
      //   </TouchableOpacity>
      // ),
    });
  }, [navigation, journalTitle]);

  //check for the link and text
  let link = '';
  let text = '';
  
  if (journalTitle === 'Overcoming Distraction') {
    link = 'https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/Therapist%2FRescue%20Session%20Audios%2FOvercoming%20distraction%20session.mp3?alt=media&token=fcc4b25e-adde-4005-9a76-9fd18ca4f6b4';
    
    text = "Welcome to the Overcoming Distraction Rescue Session! In today's fast-paced world, staying focused can be a challenge. Distractions are everywhere, from the buzz of notifications to wandering thoughts. But here's the good news: you have the power to overcome them and regain control of your attention. In this session, we'll explore the psychology of distraction, helping you understand why your mind tends to drift and what triggers it. Knowledge is your first step toward conquering distractions. Next, we'll introduce mindfulness techniques. By practicing mindfulness, you'll learn to be fully present in the moment, which can significantly improve your ability to resist distractions. We'll provide practical exercises to incorporate mindfulness into your daily routine. Digital overload is a common problem in the digital age. We'll share effective strategies for managing your digital life, striking a balance between staying connected and taking essential breaks. Effective time management is another key aspect. You'll discover techniques for setting priorities, defining clear goals, and creating a workable schedule. Say goodbye to procrastination and hello to enhanced productivity. A cluttered workspace can contribute to distraction. We'll guide you in decluttering and optimizing your environment for maximum focus and creativity. Stress often fuels distractions. We'll offer stress-reduction techniques that you can easily integrate into your daily life, ensuring that external pressures don't derail your progress. But you won't be alone on this journey. Our supportive community is here to share experiences, gain insights, and celebrate successes together. By the end of this session, you'll have a toolkit of practical strategies and newfound confidence. Distractions may still arise, but they won't control you. It's time to take charge, boost your productivity, and lead a more focused and fulfilling life. Let's get started!";
  }
  else if (journalTitle === 'Disappointment') {
    link = 'https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/Therapist%2FRescue%20Session%20Audios%2FDissappointment.mp3?alt=media&token=5ac834c1-8f4c-423a-8edd-f9c10d8c0a37';
    
    text = "Welcome to the Disappointment Rescue Session! Life is full of unexpected twists and turns, and sometimes, it doesn't go the way we planned or hoped. Disappointment can leave us feeling lost and overwhelmed, but the good news is that you have the power to navigate through it and emerge stronger on the other side.Our journey begins with understanding disappointment itself. We'll explore the psychology behind this complex emotion, shedding light on why it occurs and its various forms. This knowledge will be your compass as we navigate through the session.Disappointment often comes with a surge of emotions, from sadness and frustration to anger and confusion. It's essential to acknowledge and express these feelings. Our safe and supportive environment encourages you to share your emotions, promoting healing and clarity.What triggers your disappointment? Is it unmet expectations, external circumstances, or societal pressures? Through guided discussions and self-reflection, you'll identify the specific triggers that affect you. This awareness is a significant step toward managing disappointment.Resilience is your armor against disappointment. We'll introduce you to practical exercises and techniques to enhance your resilience, enabling you to bounce back from setbacks with renewed strength and determination.Disappointment can be a catalyst for personal growth and self-discovery. We'll explore how these moments can lead to profound insights and positive changes in your life. Finding meaning in disappointment is a powerful way to transform it into an opportunity.Our ultimate goal is to empower you to move forward from disappointment with newfound wisdom and resilience. By developing emotional intelligence, coping skills, and a supportive community, you'll be better equipped to face life's disappointments and emerge stronger.Just like any journey, overcoming disappointment takes time and effort, but you won't be alone on this path. Our community is here to share experiences, offer insights, and celebrate your progress. By the end of this rescue session, you'll have a toolkit of practical strategies, a deeper understanding of disappointment, and the confidence to tackle it head-on.Disappointment may still cross your path, but it won't define you. It's time to take charge, embrace the lessons it offers, and lead a more resilient and fulfilling life. Let's embark on this journey together!";
  }
  else if(journalTitle === 'Anger & Frustration'){
    link = 'https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/Therapist%2FRescue%20Session%20Audios%2FAnger.mp3?alt=media&token=5bc874d8-08fe-4ba2-9920-7ffb3ee1165a'
    text = "Welcome to Anger and Frustration Rescue SessionAnger and frustration are natural human emotions, but they can be overwhelming and destructive if we don't learn to manage them effectively. This session will help you understand the psychology of these emotions, develop coping mechanisms, and build resilience.We'll explore the root causes of your anger and frustration through introspection and open discussions. Identifying these triggers is essential for developing effective coping strategies.Suppressed anger and unresolved frustrations can harm your mental and physical health. This session will guide you in expressing and processing these emotions in healthy ways. Mindfulness techniques will play a significant role in this process. By practicing mindfulness, you'll learn to acknowledge your emotions without judgment, helping you gain better control over them.Effective communication is another key component of managing anger and frustration. You'll learn how to express your feelings assertively and constructively,fostering better relationships and reducing conflicts.Strategies for stress management will also be explored. High stress levels can exacerbate anger and frustration, so we'll equip you with tools to keep stress in check.Finally, we'll explore how anger and frustration can be transformed into motivation and positive change. These emotions can serve as catalysts for personal growth, empowerment, and problem-solving. Harnessing their energy can lead to profound transformations in your life.By the end of this session, you'll have a comprehensive toolkit of practical strategies for managing anger and frustration. These emotions may still arise, but you'll be better equipped to recognize, understand, and channel them constructively. It's time to take charge of your emotional well-being, build healthier relationships, and lead a more balanced and fulfilling life. Let's embark on this transformative journey together!"
  }
  else if(journalTitle === 'Regaining Motivation'){
    link = 'https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/Therapist%2FRescue%20Session%20Audios%2Fregaining%20motivation.mp3?alt=media&token=fb4e45e0-f4f2-415e-b15b-50f5e9ff346c'
    text = "Welcome to the Regaining Motivation Rescue Session! We all have moments when our motivation wanes, and it can feel like an uphill battle to regain our drive and enthusiasm. But the good news is that motivation is a skill that can be nurtured and revitalized. In this session, we'll delve into the psychology of motivation, helping you understand why it ebbs and flows. Knowledge is the first step toward rekindling your inner spark. We'll begin by exploring the sources of your motivation. What drives you? What are your passions and goals? Identifying these factors will help you reconnect with your core values and rediscover your sense of purpose. Lack of motivation often stems from feeling overwhelmed or stuck. We'll provide practical tools for breaking tasks into manageable steps, setting achievable goals, and creating a roadmap for success. You'll learn to overcome procrastination and build a sense of accomplishment. Mindfulness techniques will play a significant role in this session. By practicing mindfulness, you'll learn to be fully present in the moment, quieting the distractions and self-doubt that can hinder motivation. We'll provide exercises to help you incorporate mindfulness into your daily life. Motivation is closely tied to self-belief and confidence. We'll explore strategies for building self-esteem and silencing your inner critic. When you believe in your abilities, you're more likely to pursue your goals with enthusiasm. Maintaining a healthy work-life balance is essential for sustaining motivation. We'll guide you in setting boundaries and avoiding burnout, ensuring that you have the energy and focus to pursue your passions. We'll also discuss the importance of celebrating small victories. Recognizing your progress, no matter how incremental, can provide a significant boost in motivation. We'll help you create a positive feedback loop of achievement. Motivation can be contagious when you're part of a supportive community. We encourage you to share your experiences, setbacks, and successes with others in this session. Together, we can inspire and uplift one another. By the end of this session, you'll have a toolkit of practical strategies for regaining and sustaining your motivation. Motivational slumps may still occur, but you'll be better equipped to navigate them and emerge stronger on the other side. It's time to reignite your passion, pursue your dreams, and lead a more motivated and fulfilling life. Let's embark on this journey of rediscovery and empowerment together!"
  }
  else if(journalTitle === 'Sleep'){
    link = 'https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/Therapist%2FRescue%20Session%20Audios%2Fsleep.mp3?alt=media&token=c718ef13-52fd-41f4-9c8c-70e7b3886c11'
    text = "Welcome to the Sleep Rescue Session! Quality sleep is essential for your physical and mental well-being, but it's not always easy to achieve in today's fast-paced world. If you're struggling with sleep issues, you're not alone, and there are practical steps you can take to improve your sleep patterns. In this session, we'll explore the science of sleep and its critical role in your life. Understanding the importance of sleep is the first step toward developing healthier sleep habits. We'll begin by addressing common sleep problems such as insomnia, sleep apnea, and restless legs syndrome. You'll learn about their causes and potential solutions, empowering you to make informed decisions about your sleep health. Establishing a sleep routine is vital. We'll guide you in creating a personalized bedtime ritual that signals to your body that it's time to wind down. This can include relaxation exercises, breathing techniques, or reading a book. Your sleep environment plays a significant role in the quality of your rest. We'll provide tips for optimizing your bedroom, such as adjusting the lighting, managing noise, and selecting a comfortable mattress and pillows. The impact of technology on sleep cannot be underestimated. We'll discuss the effects of screen time, blue light, and late-night browsing on your sleep quality. You'll learn strategies for reducing your exposure to sleep-disrupting stimuli. Diet and exercise also influence your sleep patterns. We'll explore the connection between nutrition, physical activity, and sleep, helping you make choices that promote better rest. Stress and anxiety often contribute to sleepless nights. We'll introduce relaxation and stress-reduction techniques that can calm your mind and prepare your body for restorative sleep. Mindfulness practices will be integrated into this session. Mindfulness can help you stay present, ease racing thoughts, and improve your sleep quality. We'll offer mindfulness exercises to incorporate into your daily life. As part of our supportive community, you'll have the opportunity to share your sleep experiences and learn from others. Sleep challenges can be isolating, but together, we can work towards healthier sleep habits. By the end of this session, you'll have a comprehensive toolkit for improving your sleep. While occasional sleep disturbances may still occur, you'll be better equipped to address them and enjoy more restful nights. It's time to prioritize your sleep, boost your energy, and enhance your overall well-being. Let's embark on this journey towards better sleep together!"
  }
  else if(journalTitle === 'Low Mood'){
    link = 'https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/Therapist%2FRescue%20Session%20Audios%2Flow%20mood.mp3?alt=media&token=65f79f0d-4081-41c3-a80d-d6d9e682aa5d'
    text = "Welcome to the Low Mood Rescue Session! At times, life can throw challenges our way that leave us feeling down and demotivated. While it's natural to experience low moods occasionally, it's essential to address them and find ways to lift your spirits. In this session, we'll delve into the factors that can contribute to low mood. Understanding the root causes of your feelings is a crucial step towards managing and improving them. We'll explore various techniques to help you cope with and alleviate low mood. These include mindfulness and relaxation exercises, which can bring a sense of calm and balance to your emotions. Physical well-being is closely connected to your mental state. We'll discuss the importance of regular exercise, a balanced diet, and quality sleep in promoting a more positive mood. Negative thought patterns often accompany low mood. We'll introduce cognitive-behavioral techniques to help you identify and challenge these thoughts, replacing them with more constructive and optimistic ones. Creative expression, such as art or journaling, can be a powerful tool for processing emotions and boosting your mood. We'll encourage you to explore these creative outlets as a means of self-expression. Social connections are vital for emotional well-being. We'll discuss the importance of maintaining relationships and seeking support from friends and loved ones when you're feeling low. Stress management strategies will also be a focus. Learning to manage stress effectively can prevent it from exacerbating low mood and help you regain a sense of control. Our community is here to provide support, share experiences, and offer encouragement. You're not alone in your journey towards lifting your mood and finding greater happiness. By the end of this session, you'll have a toolbox of strategies to combat low mood and cultivate a more positive outlook on life. While it's okay to have low moments, you can learn to navigate them and emerge stronger and happier. Let's begin the journey towards a brighter and more uplifted mood together!Welcome to the Low Mood Rescue Session! At times, life can throw challenges our way that leave us feeling down and demotivated. While it's natural to experience low moods occasionally, it's essential to address them and find ways to lift your spirits. In this session, we'll delve into the factors that can contribute to low mood. Understanding the root causes of your feelings is a crucial step towards managing and improving them. We'll explore various techniques to help you cope with and alleviate low mood. These include mindfulness and relaxation exercises, which can bring a sense of calm and balance to your emotions. Physical well-being is closely connected to your mental state. We'll discuss the importance of regular exercise, a balanced diet, and quality sleep in promoting a more positive mood. Negative thought patterns often accompany low mood. We'll introduce cognitive-behavioral techniques to help you identify and challenge these thoughts, replacing them with more constructive and optimistic ones. Creative expression, such as art or journaling, can be a powerful tool for processing emotions and boosting your mood. We'll encourage you to explore these creative outlets as a means of self-expression. Social connections are vital for emotional well-being. We'll discuss the importance of maintaining relationships and seeking support from friends and loved ones when you're feeling low. Stress management strategies will also be a focus. Learning to manage stress effectively can prevent it from exacerbating low mood and help you regain a sense of control. Our community is here to provide support, share experiences, and offer encouragement. You're not alone in your journey towards lifting your mood and finding greater happiness. By the end of this session, you'll have a toolbox of strategies to combat low mood and cultivate a more positive outlook on life. While it's okay to have low moments, you can learn to navigate them and emerge stronger and happier. Let's begin the journey towards a brighter and more uplifted mood together!"
  }
  else if(journalTitle === 'Critism'){
    link = 'https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/Therapist%2FRescue%20Session%20Audios%2Fcritism.mp3?alt=media&token=02bfd3ec-b8df-4634-bba6-fc1809af2d12'
    text = "Welcome to the Coping with Criticism Session! Dealing with criticism is a common part of life, but it can often be challenging and emotionally taxing. Whether it's feedback at work, comments from loved ones, or even self-criticism, understanding how to handle criticism constructively is a valuable skill. In this session, we'll explore the psychology behind criticism and why it affects us the way it does. Understanding the dynamics of criticism can help you develop resilience and maintain better emotional well-being. We'll delve into strategies for managing and responding to criticism effectively. You'll learn how to differentiate between constructive criticism that can be used for personal growth and unhelpful negativity that should be disregarded. Self-compassion is a key aspect of handling criticism. We'll introduce techniques to enhance your self-esteem and self-worth, allowing you to better withstand external criticism and maintain a positive self-image. Communication skills play a vital role in managing criticism, both when giving and receiving it. You'll gain insights into effective communication techniques that can foster understanding and resolve conflicts. Reframing your perspective on criticism is another essential part of this session. You'll discover how to reframe criticism as an opportunity for growth and learning rather than as a personal attack. Stress management techniques will be discussed to help you cope with the emotional impact of criticism. Learning to manage stress can prevent criticism from affecting your mental and physical well-being. Our supportive community is here to share experiences, offer guidance, and provide a safe space for discussing the challenges associated with criticism. By the end of this session, you'll have a toolkit of strategies to navigate criticism gracefully, whether it comes from others or from within. Criticism may never be entirely avoidable, but you can develop the skills to face it with confidence and resilience. Let's start working towards a healthier relationship with criticism today!"
  }
  else if(journalTitle === 'Relationships'){
    link = 'https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/Therapist%2FRescue%20Session%20Audios%2Frelationship.mp3?alt=media&token=b7aebc54-4983-4563-bf2d-7bfd2a7764d6'
    text = "Welcome to the Relationship Enrichment Session! Relationships are an integral part of our lives, shaping our happiness and well-being. Whether you're looking to strengthen a current relationship or improve your approach to future ones, this session is designed to provide you with valuable insights and strategies. Throughout this session, we'll explore the dynamics of relationships, from friendships and family connections to romantic partnerships. Understanding the psychology behind relationships is the first step in fostering healthier, more fulfilling connections. Effective communication is at the heart of any successful relationship. You'll learn essential communication skills, including active listening, assertiveness, and conflict resolution. These skills can help you express yourself better, understand others more deeply, and navigate conflicts constructively. Building and maintaining trust is crucial for any relationship's longevity. We'll discuss strategies for establishing trust and mending it when it's been damaged. Trust forms the foundation upon which all healthy relationships are built. Emotional intelligence is another key aspect we'll explore. By enhancing your emotional intelligence, you'll gain a better understanding of your own emotions and those of others, leading to more empathetic and harmonious relationships. Boundaries are essential for maintaining healthy relationships. You'll discover how to set and communicate boundaries effectively, ensuring your needs are met while respecting the needs of others. For those in romantic relationships, we'll delve into techniques for keeping the romance alive, reigniting passion, and navigating the challenges that often arise in long-term partnerships. Self-care is an often-overlooked aspect of relationship health. We'll emphasize the importance of self-care and how taking care of your own well-being positively impacts your ability to nurture and sustain meaningful relationships. Our community is here to provide support, share experiences, and offer guidance throughout your journey to improve your relationships. By the end of this session, you'll have a toolkit of valuable skills and insights to enrich and strengthen your connections with others. Whether you're seeking to enhance existing relationships or build new ones, these tools will empower you to foster more meaningful and satisfying relationships in your life. Let's embark on this journey of relationship enrichment together!"
  }
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
              <Text style={{ fontWeight: '500', fontSize: 20, }}>{text}</Text>
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 5,
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
            <Text style={{fontSize:22,marginTop:150,fontWeight:'600'}}>{journalTitle}</Text>
            <TouchableOpacity
              onPress={togglePause}
              style={{ marginBottom: 50, marginTop: 40 }}>
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
          navigation.navigate("rescue sessions tips2", { journalTitle });
        }}
        >
          <Ionicons name="chevron-back" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: 'white',borderRadius:50,paddingRight:2,paddingLeft:2 }}
          onPress={() => {
            navigation.navigate("questions", { journalTitle });
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
