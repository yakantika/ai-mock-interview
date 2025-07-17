import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";

import { cn, getRandomInterviewCover } from "@/lib/utils";
// import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({
          interviewId,
          userId,
        })
      : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeColor =
    {
      Behavioral: "bg-light-400",
      Mixed: "bg-light-600",
      Technical: "bg-light-800",
    }[normalizedType] || "bg-light-600";

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-[420px] max-h-[420px] overflow-hidden flex flex-col p-6">
      <div className="card-interview flex flex-col h-full w-full relative">
        <div>
          {/* Type Badge */}
          

          {/* Cover Image */}
          <Image
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />

          {/* Interview Role */}
          <h3 className="mt-5 capitalize w-full truncate">{role} Interview</h3>

          {/* Date & Score */}
          <div className="flex flex-row gap-4 mt-5">
            <div className="flex flex-row gap-3 items-center">
              <Image
                src="/calendar.svg"
                width={22}
                height={22}
                alt="calendar"
              />
              <p>{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-3 items-center">
              <Image src="/star.svg" width={22} height={22} alt="star" />
              <p>{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>

          {/* Feedback or Placeholder Text */}
          <p className="line-clamp-2 mt-5 break-words w-full">
            {feedback?.finalAssessment ||
              "You haven't taken this interview yet. Take it now to improve your skills."}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between gap-2 pt-4 w-full flex-wrap">
  <div className={cn("absolute top-0 right-0 m-3 z-10 px-4 py-2 rounded-bl-lg badge-text text-xs", badgeColor)}>
  {normalizedType === 'Technical' ? 'Technical Round' :
    normalizedType === 'Mixed' ? 'Mixed Round' :
    normalizedType}
</div>
<div className="flex flex-row items-center gap-2 min-w-0">
  <DisplayTechIcons techStack={techstack} />
</div>
  <Button className="btn-primary w-full sm:w-auto mt-2 sm:mt-0" asChild>
    <Link
      href={
        feedback
          ? `/interview/${interviewId}/feedback`
          : `/interview/${interviewId}`
      }
    >
      {feedback ? "Check Feedback" : "View Interview"}
    </Link>
  </Button>
</div>
      </div>
    </div>
  );
};

export default InterviewCard;