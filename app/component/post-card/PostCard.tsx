import "./PostCard.scss"

import Image from "next/image"

export default function PostCard( {jobPost}: any) {

    const { title, description, company, image, about } = jobPost;

    console.log("jobPost****", jobPost);

  return (
    <div className="post-card-container">
        <div className="post-card">
            <Image
                className="company-logo"
                src={image}
                alt="job post"
                width={60}
                height={60}
            />
            <div className="post-card-content">
                <h1 className="text-xl font-bold text-gray-800 mb-2">{title}</h1>
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
