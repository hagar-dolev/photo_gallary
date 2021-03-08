export type caption = {
  text: string;
  confidence: number;
};

export type VisionDescribeResponse = {
  description?: {
    tags?: Array<string>;
    captions?: Array<caption>;
  };
  requestId: string;
  metadata: {
    width: number;
    height: number;
    format: string;
  };
};
