import type { AppLanguage } from './types';

export type Copy = {
  home: {
    title: string;
    subtitle: string;
    chooseLanguage: string;
    stars: string;
    /** Shown when you have no stars yet. */
    starsEarn: string;
    /** Shown when you already have some stars. */
    starsKeepGoing: string;
    play: string;
    feedback: string;
  };
  game: {
    cardConnector: string;
    step: string;
    listen: string;
    sayIt: string;
    stop: string;
    listeningHint: string;
    heardPrefix: string;
    nice: string;
    tryAgain: string;
    noVoiceTitle: string;
    noVoiceBodyBefore: string;
    noVoiceBodyMono: string;
    noVoiceBodyAfter: string;
    permTitle: string;
    permBody: string;
    alertNextWord: string;
    alertTryAgain: string;
    swipeNextHint: string;
    swipePrevHint: string;
  };
  eval: {
    titleCorrect: string;
    titleTryAgain: string;
    msgGreat: string;
    msgListenAgain: (word: string) => string;
  };
  feedback: {
    title: string;
    body: string;
    openButton: string;
    linkErrorTitle: string;
    linkErrorBody: string;
    notConfiguredTitle: string;
    notConfiguredBody: string;
  };
};

export const COPY: Record<AppLanguage, Copy> = {
  en: {
    home: {
      title: 'Tiny Talkers',
      subtitle: 'Listen, then say the word!',
      chooseLanguage: 'Language',
      stars: 'Stars',
      starsEarn: 'Earn stars in Play!',
      starsKeepGoing: 'Keep earning stars!',
      play: 'Play',
      feedback: 'Feedback',
    },
    game: {
      cardConnector: 'for',
      step: 'Listen & say the word — we check for you. Swipe right for next, left to go back.',
      listen: 'Listen',
      sayIt: 'Say it!',
      stop: 'Stop',
      listeningHint: 'When you’re done, we’ll check your pronunciation.',
      heardPrefix: 'Heard:',
      nice: 'Nice!',
      tryAgain: 'Try again!',
      noVoiceTitle: 'Speaking mode is off here',
      noVoiceBodyBefore:
        'This preview can’t hear you. A grown-up can open the real app with ',
      noVoiceBodyMono: ' or ',
      noVoiceBodyAfter: '. You can still tap Listen!',
      permTitle: 'Almost!',
      permBody: 'We need the microphone to hear you.',
      alertNextWord: 'Next word!',
      alertTryAgain: 'OK, try again',
      swipeNextHint: 'NEXT →',
      swipePrevHint: '← PREV',
    },
    eval: {
      titleCorrect: 'Correct!',
      titleTryAgain: 'Try again',
      msgGreat: 'Great job!',
      msgListenAgain: (word) => `Listen again, then say “${word}”.`,
    },
    feedback: {
      title: 'We love feedback',
      body: 'Tell us your name, phone (optional), and what you think. The form opens in your browser.',
      openButton: 'Open feedback form',
      linkErrorTitle: 'Cannot open link',
      linkErrorBody:
        'We could not open the browser. Check expo.extra.feedbackFormUrl in app.json.',
      notConfiguredTitle: 'Form not set up yet',
      notConfiguredBody:
        'Add your Google Form link to expo.extra.feedbackFormUrl in app.json (the “Send” link from Google Forms), then rebuild the app.',
    },
  },
  hi: {
    home: {
      title: 'टाइनी टॉकर्स',
      subtitle: 'सुनो, फिर शब्द बोलो!',
      chooseLanguage: 'भाषा',
      stars: 'सितारे',
      starsEarn: 'खेल में सितारे कमाओ!',
      starsKeepGoing: 'और सितारे कमाओ!',
      play: 'खेलें',
      feedback: 'प्रतिक्रिया',
    },
    game: {
      cardConnector: 'से',
      step:
        'अक्षर सुनो और शब्द बोलो — हम जाँच करेंगे। अगला: बाएँ स्वाइप, पीछे: दाएँ।',
      listen: 'सुनो',
      sayIt: 'बोलो!',
      stop: 'रुको',
      listeningHint: 'जब बोल लो, हम उच्चारण देखेंगे।',
      heardPrefix: 'सुना:',
      nice: 'बहुत अच्छे!',
      tryAgain: 'फिर कोशिश!',
      noVoiceTitle: 'यहाँ बोलने का मोड बंद है',
      noVoiceBodyBefore:
        'इस झलक में हम आपकी आवाज़ नहीं सुन सकते। बड़े असली ऐप के लिए ',
      noVoiceBodyMono: ' या ',
      noVoiceBodyAfter: ' चला सकते हैं। “सुनो” दबाओ!',
      permTitle: 'लगभग तैयार!',
      permBody: 'आपकी आवाज़ सुनने के लिए माइक की ज़रूरत है।',
      alertNextWord: 'अगला शब्द!',
      alertTryAgain: 'ठीक है, फिर कोशिश',
      swipeNextHint: '← आगे',
      swipePrevHint: 'पीछे →',
    },
    eval: {
      titleCorrect: 'सही!',
      titleTryAgain: 'फिर कोशिश',
      msgGreat: 'शाबाश!',
      msgListenAgain: (word) => `फिर सुनो, फिर “${word}” बोलो।`,
    },
    feedback: {
      title: 'आपकी राय हमें अच्छी लगेगी',
      body: 'अपना नाम, फ़ोन (ज़रूरी नहीं) और विचार लिखें। फ़ॉर्म ब्राउज़र में खुलेगा।',
      openButton: 'फ़ॉर्म खोलें',
      linkErrorTitle: 'लिंक नहीं खुल सका',
      linkErrorBody:
        'ब्राउज़र नहीं खुल सका। app.json में expo.extra.feedbackFormUrl जाँचें।',
      notConfiguredTitle: 'फ़ॉर्म अभी सेट नहीं',
      notConfiguredBody:
        'Google Form का “भेजें” लिंक app.json में expo.extra.feedbackFormUrl में डालें, फिर ऐप दोबारा बनाएँ।',
    },
  },
  mr: {
    home: {
      title: 'टायनी टॉकर्स',
      subtitle: 'ऐका, मग शब्द बोला!',
      chooseLanguage: 'भाषा',
      stars: 'तारे',
      starsEarn: 'खेळात तारे मिळवा!',
      starsKeepGoing: 'आणखी तारे मिळवा!',
      play: 'खेळा',
      feedback: 'अभिप्राय',
    },
    game: {
      cardConnector: 'आणि',
      step:
        'अक्षर ऐका आणि शब्द बोला — आम्ही तपासू. पुढे: डावीकडे स्वाइप, मागे: उजवीकडे.',
      listen: 'ऐका',
      sayIt: 'बोला!',
      stop: 'थांबा',
      listeningHint: 'बोलून झाल्यावर आम्ही उच्चार पाहू.',
      heardPrefix: 'ऐकले:',
      nice: 'छान!',
      tryAgain: 'पुन्हा प्रयत्न!',
      noVoiceTitle: 'येथे बोलणे चालू नाही',
      noVoiceBodyBefore:
        'या झलकीत आम्ही ऐकू शकत नाही. मोठ्यांनी खरी अॅपसाठी ',
      noVoiceBodyMono: ' किंवा ',
      noVoiceBodyAfter: ' चालवावे. “ऐका” दाबा!',
      permTitle: 'जवळजवळ!',
      permBody: 'आम्हाला ऐकण्यासाठी मायक्रोफोन हवा.',
      alertNextWord: 'पुढचा शब्द!',
      alertTryAgain: 'ठीक, पुन्हा प्रयत्न',
      swipeNextHint: '← पुढे',
      swipePrevHint: 'मागे →',
    },
    eval: {
      titleCorrect: 'बरोबर!',
      titleTryAgain: 'पुन्हा प्रयत्न',
      msgGreat: 'खूप छान!',
      msgListenAgain: (word) => `पुन्हा ऐका, मग “${word}” बोला.`,
    },
    feedback: {
      title: 'तुमचा अभिप्राय महत्त्वाचा',
      body: 'नाव, फोन (पर्यायी) आणि मत लिहा. फॉर्म ब्राउझरमध्ये उघडेल.',
      openButton: 'फॉर्म उघडा',
      linkErrorTitle: 'लिंक उघडू शकत नाही',
      linkErrorBody:
        'ब्राउझर उघडला नाही. app.json मधील expo.extra.feedbackFormUrl तपासा.',
      notConfiguredTitle: 'फॉर्म अजून सेट नाही',
      notConfiguredBody:
        'Google Form चा “पाठवा” लिंक app.json मधील expo.extra.feedbackFormUrl मध्ये टाका, मग अॅप पुन्हा बिल्ड करा.',
    },
  },
};

export function getCopy(lang: AppLanguage): Copy {
  return COPY[lang];
}
