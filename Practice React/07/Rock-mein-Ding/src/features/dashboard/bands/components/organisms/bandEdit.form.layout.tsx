import { useState, type SubmitEvent } from "react";
import { Label, ListBox, Select, toast } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import { BandStatusBadge } from "../atoms/bandStatusBadge.atm";
import { useBands } from "../../../../bands/context/hooks/useBands";
import type { IBand } from "../../../../bands/types/band.types";

type TBandEditFormProps = {
  band: IBand;
};

const statusOptions: IBand["status"][] = [
  "confirmed",
  "pending",
  "rejected",
  "cancelled",
];

const stageOptions: IBand["stage"][] = ["Apollo North", "Grand X", "Side West"];

export function BandEditForm({ band }: TBandEditFormProps) {
  const navigate = useNavigate();
  const [status, setStatus] = useState<IBand["status"]>(band.status);
  const [stage, setStage] = useState<IBand["stage"]>(band.stage);
  const { updateBand } = useBands();

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    updateBand(band.id, {
      status,
      stage,
    });
    await navigate({ to: "/dashboard/bands" });
    toast.success(`Changes to ${band.name} were saved successfully.`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-xl flex-col gap-6 rounded-md border border-border bg-surface p-6 text-surface-foreground"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">{band.name}</h2>
          <p className="text-sm text-muted">{band.genre}</p>
        </div>

        <BandStatusBadge status={status} />
      </div>

      <div className="grid gap-4">
        <Select
          fullWidth
          value={status}
          onChange={(key) => {
            if (key !== null) {
              setStatus(key as IBand["status"]);
            }
          }}
        >
          <Label>Status</Label>
          <Select.Trigger>
            <Select.Value className="capitalize" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {statusOptions.map((statusOption) => (
                <ListBox.Item
                  key={statusOption}
                  id={statusOption}
                  textValue={statusOption}
                >
                  <BandStatusBadge status={statusOption} />
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <Select
          fullWidth
          value={stage}
          onChange={(key) => {
            if (key !== null) {
              setStage(key as IBand["stage"]);
            }
          }}
        >
          <Label>Stage</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {stageOptions.map((stageOption) => (
                <ListBox.Item
                  key={stageOption}
                  id={stageOption}
                  textValue={stageOption}
                >
                  {stageOption}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
      <button
        type="submit"
        className="w-fit cursor-pointer rounded-md bg-accent px-4 py-2 font-medium text-accent-foreground transition-opacity hover:opacity-90"
      >
        Save changes
      </button>
    </form>
  );
}
