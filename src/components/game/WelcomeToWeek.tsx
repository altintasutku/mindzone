import React from "react";

type Props = Readonly<{
  week: string;
}>;

const WelcomeToWeek = ({ week }: Props) => {
  return (
    <div className="text-center">
      <strong>{week}</strong> hoşgeldiniz!
      <br />
      Aşağıdan kaldığınız yerden devam edebilirsiniz.
    </div>
  );
};

export default WelcomeToWeek;
