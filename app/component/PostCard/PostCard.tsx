'use client'
import "./PostCard.scss"
import Image from "next/image"

export default function PostCard( {jobPosting}: any) {

    const { title, description, company, image, about } = jobPosting;

    console.log("jobPosting****", jobPosting);

  return (
    <div className="flex flex-col items-center justify-center">
        <div className="flex post-card w-full">
            <Image
                className="company-logo"
                src={image}
                alt="job post"
                width={60}
                height={60}
            />
            <div className="post-card-content w-full flex flex-col justify-center text-start">
                <h1 className="mb-2 job-title">{title}</h1>
                <div className="job-location">
                    <span className="job-company">{company}</span>
                    <span className="mx-2">•</span>
                    <span className="job-location-text">{about?.location}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                    {description}
                </p>
                <div className="post-card-footer">
                    <button className="btn-location">In Person</button>
                    <span className="btn-span">|</span>
                    <button className="btn-category-1">Education</button>
                    <button className="btn-category-2">IT</button>
                </div>
            </div>
        </div>
    </div>
  )
}
