import { Card } from "@heroui/react";
import type { TStatCardProps } from "../../types/dashboard.types";

export function DisplayStatCard({ title, content }: TStatCardProps) {
  return (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Content>{content}</Card.Content>
    </Card>
  );
}
