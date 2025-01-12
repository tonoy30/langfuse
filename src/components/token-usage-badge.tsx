import { Badge } from "@/src/components/ui/badge";
import { type Observation } from "@prisma/client";

export const TraceAggUsageBadge = (props: { observations: Observation[] }) => {
  const usage = {
    promptTokens: props.observations
      .map((o) => o.promptTokens)
      .reduce((a, b) => a + b, 0),
    completionTokens: props.observations
      .map((o) => o.completionTokens)
      .reduce((a, b) => a + b, 0),
    totalTokens: props.observations
      .map((o) => o.totalTokens)
      .reduce((a, b) => a + b, 0),
  };
  return <TokenUsageBadge {...usage} />;
};

export const TokenUsageBadge = (
  props:
    | {
        observation: Observation;
      }
    | {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
      }
) => {
  const usage =
    "observation" in props
      ? {
          promptTokens: props.observation.promptTokens,
          completionTokens: props.observation.completionTokens,
          totalTokens: props.observation.totalTokens,
        }
      : props;

  return (
    <Badge variant="outline">
      {usage.promptTokens} → {usage.completionTokens} (∑ {usage.totalTokens})
    </Badge>
  );
};
