import { useEffect, useState } from "react";
import { useJobStatus } from "./useJobStatus";

export const useJobProgress = (jobId: string | null | undefined) => {
    const { data: jobStatus } = useJobStatus(jobId);
    const [progressPercent, setProgressPercent] = useState(0);
    const [statusMessage, setStatusMessage] = useState("");

    useEffect(() => {
        if (!jobStatus) return;

        // Update progress
        if (jobStatus.progress) {
            setProgressPercent(jobStatus.progress.percent);
        }

        // Update status message
        if (jobStatus.message) {
            setStatusMessage(jobStatus.message);
        } else {
            // Fallback messages
            switch (jobStatus.status) {
                case "queued":
                    setStatusMessage("Queued...");
                    break;
                case "starting":
                    setStatusMessage("Initializing...");
                    break;
                case "progress":
                    setStatusMessage("Processing...");
                    break;
                case "success":
                    setStatusMessage("Complete!");
                    setProgressPercent(100);
                    break;
                case "failure":
                    setStatusMessage(`Failed: ${jobStatus.error || "Unknown error"}`);
                    break;
                case "retry":
                    setStatusMessage(`Retrying (${jobStatus.retryCount}/${jobStatus.maxRetries})...`);
                    break;
                default:
                    setStatusMessage("Pending...");
            }
        }
    }, [jobStatus]);

    return {
        jobStatus,
        progressPercent,
        statusMessage,
        isComplete: jobStatus?.isTerminal ?? false,
        isRunning: jobStatus?.isRunning ?? false
    };
};