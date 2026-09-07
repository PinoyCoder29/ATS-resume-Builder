"use client";

import { useResume } from "@/context/ResumeContext";
import FormNav from "@/components/FormNav";
import { HasExperience } from "@/types/resume";

export default function ExperienceQuestion() {
  const { data, setHasExperience, goNext, goBack } = useResume();

  const choose = (value: HasExperience) => setHasExperience(value);

  return (
    <div className="panel">
      <h2 className="panel-title">May Trabaho Ka Na Ba Dati?</h2>
      <p className="panel-subtitle">
        Ito ang magdedesisyon kung anong mga section ang ipapakita sa susunod. Walang mali
        o tamang sagot — may template na angkop sa dalawang sitwasyon.
      </p>

      <div className="row g-3">
        <div className="col-md-6">
          <div
            role="button"
            className={`choice-card ${data.hasExperience === "yes" ? "is-selected" : ""}`}
            onClick={() => choose("yes")}
          >
            <div className="choice-title">Meron akong work experience</div>
            <div className="choice-desc">
              Kasama ang mga dating trabaho, part-time, freelance, o internship. Magdadagdag
              ka ng isa o higit pang entry sa susunod na hakbang.
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div
            role="button"
            className={`choice-card ${data.hasExperience === "no" ? "is-selected" : ""}`}
            onClick={() => choose("no")}
          >
            <div className="choice-title">Wala pa akong work experience</div>
            <div className="choice-desc">
              Fresh graduate o unang trabaho pa lang ang hinahanap. Lalaktawan natin ang
              work history at bibigyang-diin ang education, skills, at training.
            </div>
          </div>
        </div>
      </div>

      <FormNav onBack={goBack} onNext={goNext} nextDisabled={data.hasExperience === null} />
    </div>
  );
}
