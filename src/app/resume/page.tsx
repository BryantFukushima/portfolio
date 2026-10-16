import type { Metadata } from "next";
import { EducationList } from "@/components/education-list";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { PromptHeading } from "@/components/prompt-heading";
import { ResumeSection } from "@/components/resume-section";
import { SkillList } from "@/components/skill-list";
import { education, experience, profile, site, skills } from "@/content";
import type { CSSVars } from "@/lib/css";

export const metadata: Metadata = {
  title: "Resume",
};

export default function ResumePage() {
  const { path, command, download, sections } = site.pages.resume;
  // The reveal waits for the title's command to finish typing, so it needs the command's length.
  const style: CSSVars = { "--chars": command.length };

  return (
    <div style={style}>
      <PromptHeading path={path} command={command} />
      <div className="motion-safe:animate-reveal">
        {/* A plain <a>, not <Link>: it's a file, not a page. `download` saves it instead of opening it. */}
        <a
          href={download.href}
          download
          className="mt-8 inline-block border border-teal px-4 py-2 text-teal hover:bg-teal hover:text-bg"
        >
          {download.label} <span aria-hidden="true">↓</span>
        </a>

        <ResumeSection heading={sections.summary}>
          <p className="max-w-[65ch] leading-relaxed">{profile.summary}</p>
        </ResumeSection>
        <ResumeSection heading={sections.experience}>
          <ExperienceTimeline roles={experience} />
        </ResumeSection>
        <ResumeSection heading={sections.skills}>
          <SkillList groups={skills} />
        </ResumeSection>
        <ResumeSection heading={sections.education}>
          <EducationList entries={education} />
        </ResumeSection>
      </div>
    </div>
  );
}
