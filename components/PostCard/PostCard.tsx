'use client'
import { JobPosting } from "@/lib/services/jobPostingsService";
import "./PostCard.scss"
import Image from "next/image"
import TagButton from "../TagButton/TagButton"
import Link from "next/link";

type PostCardProps = {
    jobPosting: JobPosting
}

export default function PostCard({ jobPosting }: PostCardProps) {

    const logoUrl = jobPosting?.logoUrl || "https://placehold.co/400x400/000000/F00.png";

  return (
    <div className="flex flex-col items-center justify-center">
        <div className="flex post-card w-full">
            <Image
                className="company-logo"
                src={logoUrl}
                alt="job post"
                width={60}
                height={60}
            />
            <div className="post-card-content w-full flex flex-col justify-center text-start">
                
                <h1 className="mb-2 job-title"> 
                    <Link className="no-underline text-[#25324B]" href={`/PostDetails/${jobPosting?.id}`}>
                        {jobPosting?.title}
                    </Link>
                </h1>
                <div className="job-location">
                    <span className="job-company">{jobPosting?.orgName}</span>
                    <span className="mx-2">•</span>
                    <span className="job-location-text">{jobPosting?.location[0]}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed post-card-description">
                    {jobPosting?.description}
                </p>
        
                <div className="post-card-footer">
                    <TagButton variant="location">{jobPosting?.opType === "inPerson" ? "In Person" : "Virtual"}</TagButton>
                    <span className="btn-span">|</span>
                        {jobPosting?.categories?.map((category: string, index: number) => {
                            let tagNumber = null;
                            if (index % 2 == 0) {
                                tagNumber = 1;
                            } else {
                                tagNumber = 2;
                            }
                            return (
                                <TagButton key={index} variant={`category-${tagNumber}`}>{category}</TagButton>
                            )
                        })}
                </div>
            </div>
        </div>
    </div>
  )
}
