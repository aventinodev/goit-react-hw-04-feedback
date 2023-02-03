import React from 'react';
import { useState } from 'react';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Notification from './Notification/Notification';
import Statistics from './Statistics/Statistics';

const App = () => {
  const [optionsName, setOptionsName] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleClickBtn = option =>
    setOptionsName(prevState => ({
      ...prevState,
      [option]: prevState[option] + 1,
    }));

  const total = optionsName.good + optionsName.neutral + optionsName.bad;

  const countPositiveFeedbackPersentage = () => {
    const { good } = optionsName;
    if (!total) {
      return 0;
    }
    if (total) {
      return Math.round((good / total) * 100);
    }
  };

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(optionsName)}
          onLeaveFeedback={handleClickBtn}
        />
      </Section>
      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={optionsName.good}
            neutral={optionsName.neutral}
            bad={optionsName.bad}
            total={total}
            positivePercentage={countPositiveFeedbackPersentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
};

export default App;
