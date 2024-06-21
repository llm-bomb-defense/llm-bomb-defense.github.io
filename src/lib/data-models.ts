export type TranscriptWithLabels = {
  data_hash: string;
  data: {
    user_input: string;
    assistant_response: string;
  };
  labels: Record<string, string>; // key: user, value: label
};
