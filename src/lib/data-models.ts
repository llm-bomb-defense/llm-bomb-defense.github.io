import { mean } from 'mathjs';

export type TranscriptWithLabels = {
  data_hash: string;
  data: {
    user_input: string;
    assistant_response: string;
  };
  labels: Record<string, string>; // key: user, value: label
};

export const getAvgRating = (labels: Record<string, string>) => {
  const ratings = Object.values(labels).map((label) => parseInt(label));
  return mean(ratings);
}
