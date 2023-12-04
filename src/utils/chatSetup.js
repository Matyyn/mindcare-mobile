import QB from "quickblox-react-native-sdk";
const appId = '101708'
const authKey = 'NQsMJJMtk2jgQ8Z'
const authSecret = 'Y-RcZ55EM8aMD6W'
const accountKey = 'M49DqtmXT5oGt-eii4t5'
QB.init(appId, authKey, authSecret, accountKey);

QB.users.createSession(userId, () => {
  QB.chat.connect(() => {
    QB.chat.createDialog("My Dialog", (dialogId) => {
      QB.chat.sendMessage(dialogId, "Hello world!");

      QB.chat.on("messageReceived", (message) => {
        console.log("Message received: " + message);
      });
    });
  });
});
