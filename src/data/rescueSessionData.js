const openJournal = require("../../assets/images/open-journal.png");
const gratitudeJournal = require("../../assets/images/gratitude-journal.png");
const reflectionJournal = require("../../assets/images/reflection-journal.png");
const problemSolvingJournal = require("../../assets/images/problem-solving-journal.png");
const goalSettingJournal = require("../../assets/images/goal-setting-journal.png");
const sleepJournal = require("../../assets/images/sleep-journal.png");
const selfAffirmationJournal = require("../../assets/images/self-affirmation-journal.png");
const anxietyJournal = require("../../assets/images/anxiety-journal.png");
// const selfCareJournal = require("../../assets/images/self-care-journal.png");
// const challengingNegativeThoughtsJournal = require("../../assets/images/challenging-negative-thoughts-journal.png");

const journalingData = [
  {
    id: 1,
    title: "Overcoming Distraction",
    imgUrl: openJournal,
  },
  { id: 2, title: "Disappointment", imgUrl: gratitudeJournal },
  { id: 3, title: "Anger & Frustration", imgUrl: reflectionJournal },
  { id: 4, title: "Regaining Motivation", imgUrl: problemSolvingJournal },
  { id: 5, title: "Sleep", imgUrl: goalSettingJournal },
  { id: 6, title: "Low Mood", imgUrl: sleepJournal },
  { id: 7, title: "Critism", imgUrl: selfAffirmationJournal },
  { id: 8, title: "Relationships", imgUrl: anxietyJournal },
];

export default journalingData;
