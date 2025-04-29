'use client'
import { JobPosting } from "@/lib/services/jobPostingsService";
import "./PostCard.scss"
import Image from "next/image"
import TagButton from "../TagButton/TagButton"
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setJobPostings } from "@/features/jobPostings/jobPostingSlice";
import { createBookmark, removeBookmark } from "@/lib/services/bookmarkService";
import { useState } from "react";

type PostCardProps = {
    jobPosting: JobPosting
}

export default function PostCard({ jobPosting }: PostCardProps) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const logoUrl = jobPosting?.logoUrl || "https://placehold.co/400x400/000000/F00.png";

    const handleBookmarkToggle = async () => {
        try {
            setIsLoading(true);
            if (jobPosting.isBookmarked) {
                await removeBookmark(jobPosting.id);
            } else {
                await createBookmark(jobPosting.id);
            }
            
            const updatedJobPosting = {
                ...jobPosting,
                isBookmarked: !jobPosting.isBookmarked
            };
            dispatch(setJobPostings([updatedJobPosting]));
        } catch (error) {
            console.error('Error toggling bookmark:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex post-card w-full relative">
                <button 
                    onClick={handleBookmarkToggle}
                    className="bookmark-btn"
                    disabled={isLoading}
                    aria-label={jobPosting.isBookmarked ? "Remove bookmark" : "Add bookmark"}
                >
                    <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill={jobPosting.isBookmarked ? "#26A4FF" : "none"} 
                        stroke="#26A4FF" 
                        strokeWidth="2"
                    >
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                    </svg>
                </button>
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
