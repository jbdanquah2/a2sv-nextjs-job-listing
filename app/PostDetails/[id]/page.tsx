import { getJobPosting } from "@/app/services/jobsService";
import PostDetails from "./PostDetails";

export default async function PostDetailsPage({ params }: { params: { id: string } }) {
    const jobPosting = await getJobPosting(await (params.id));

    console.log("###jobPosting###", jobPosting);

    return (
        <div>
            <PostDetails {...jobPosting} />
        </div>
    )
}