import React from 'react';


function AboutPage() {
  return (
    <div className="aboutpage">
        <p id="pleft">
          This app is here to help you keep up with your daily expenses.
          You are able to set your Monthly Budget, and input expenses that you accumulate over the month.
        </p>
        <p id="pright">
          The way the app works is it will take your Monthly Budget and any expenses you have,
          then will give you a summary of how much you have spent, and how much you have left to spend.
        </p>
        <p id="pleft">
          The app will also provide you with some informative charts, so that you will be better informed.
          This will help you to be able to make decisions on if you have enough left in the budget
          to make more purchases. 
        </p>
        <p id="pright">
          You will be able to create a profile that will keep track of your budget.
          This will make it a lot more user friendly, by keeping your data stored and easily accessible.
        </p>
    </div>
  );
}

export default AboutPage;