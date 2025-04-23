import { getJobPosting } from "@/lib/services/jobPostingsService";
import PostDetails from "./PostDetails";

interface PostDetailsPageProps {
    params: {
        id: string;
    };
}

export default async function PostDetailsPage({params}: PostDetailsPageProps) {

    const { id } = await params;

    const jobPosting = await getJobPosting(id);

    if (!jobPosting) return null;

    return (
        <div>
            <PostDetails {...jobPosting} />
        </div>
    );
}