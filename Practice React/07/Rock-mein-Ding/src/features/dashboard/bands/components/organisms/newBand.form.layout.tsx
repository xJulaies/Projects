import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { Label, ListBox, Select, toast } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { newBandSchema } from "../../schemas/newBand.schema";
import { FormError } from "../atoms/formError.atm";
import { BandStatusBadge } from "../atoms/bandStatusBadge.atm";
import { useBands } from "../../../../bands/context/hooks/useBands";
import type {
  TAdminNewBandForm,
  TSelectFieldParams,
} from "../../types/admin.band.types";
import type { IBand } from "../../../../bands/types/band.types";
import type { TFormErrors } from "../../types/form.types";

const inputClasses =
  "rounded-md border border-border bg-field-background px-3 py-2 text-field-foreground";
const labelClasses = "grid gap-2 text-sm font-medium";

const timeOptions = Array.from({ length: 52 }, (_, index) => {
  const totalMinutes = 11 * 60 + index * 15;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
});

export function NewBandFormLayout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TAdminNewBandForm>({
    name: "",
    genre: "",
    members: "",
    stage: "Apollo North",
    day: "Friday",
    startTime: "",
    endTime: "",
    description: "",
    status: "pending",
  });

  const { addBand } = useBands();
  const [errors, setErrors] = useState<TFormErrors>({});

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSelectChange({ field, key }: TSelectFieldParams) {
    if (key === null) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [field]: String(key),
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = newBandSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors;
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    const bandId = result.data.name.trim().toLowerCase().replaceAll(" ", "-");
    const memberList = result.data.members
      .split(",")
      .map((member) => member.trim())
      .filter(Boolean);
    const newBand: IBand = {
      id: bandId,
      name: result.data.name,
      genre: result.data.genre,
      members: memberList,
      stage: result.data.stage,
      day: result.data.day,
      startTime: result.data.startTime,
      endTime: result.data.endTime,
      description: result.data.description,
      status: result.data.status,
    };

    addBand(newBand);
    await navigate({ to: "/dashboard/bands" });
    toast.success(`${newBand.name} was added successfully.`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto grid w-full max-w-xl gap-5 rounded-md border border-border bg-surface p-6 text-surface-foreground"
    >
      <div>
        <h2 className="text-2xl font-semibold">Add new band</h2>
        <p className="mt-1 text-sm text-muted">
          Enter the information for the new band.
        </p>
      </div>

      <label className={labelClasses} htmlFor="name">
        Name
        <input
          value={formData.name}
          onChange={handleChange}
          id="name"
          name="name"
          type="text"
          className={inputClasses}
          placeholder="Band"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        <FormError id="name-error" message={errors.name?.[0]} />
      </label>

      <label className={labelClasses} htmlFor="genre">
        Genre
        <input
          value={formData.genre}
          onChange={handleChange}
          id="genre"
          name="genre"
          type="text"
          className={inputClasses}
          placeholder="Thrash Metal"
          aria-invalid={Boolean(errors.genre)}
          aria-describedby={errors.genre ? "genre-error" : undefined}
        />
        <FormError id="genre-error" message={errors.genre?.[0]} />
      </label>

      <label className={labelClasses} htmlFor="members">
        Members
        <input
          value={formData.members}
          onChange={handleChange}
          id="members"
          name="members"
          type="text"
          className={inputClasses}
          placeholder="Separate members with commas"
          aria-invalid={Boolean(errors.members)}
          aria-describedby={errors.members ? "members-error" : undefined}
        />
        <FormError id="members-error" message={errors.members?.[0]} />
      </label>

      <Select
        fullWidth
        value={formData.stage}
        onChange={(key) => handleSelectChange({ field: "stage", key })}
      >
        <Label>Stage</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {(["Apollo North", "Grand X", "Side West"] as const).map(
              (stageOption) => (
                <ListBox.Item
                  key={stageOption}
                  id={stageOption}
                  textValue={stageOption}
                >
                  {stageOption}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ),
            )}
          </ListBox>
        </Select.Popover>
      </Select>

      <Select
        fullWidth
        value={formData.day}
        onChange={(key) => handleSelectChange({ field: "day", key })}
      >
        <Label>Day</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {(["Friday", "Saturday", "Sunday"] as const).map((dayOption) => (
              <ListBox.Item
                key={dayOption}
                id={dayOption}
                textValue={dayOption}
              >
                {dayOption}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          fullWidth
          name="startTime"
          placeholder="Select a time"
          value={formData.startTime || null}
          onChange={(key) => handleSelectChange({ field: "startTime", key })}
          isInvalid={Boolean(errors.startTime)}
          aria-describedby={errors.startTime ? "startTime-error" : undefined}
        >
          <Label>Start time</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {timeOptions.map((timeOption) => (
                <ListBox.Item
                  key={timeOption}
                  id={timeOption}
                  textValue={timeOption}
                >
                  {timeOption}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
          <FormError id="startTime-error" message={errors.startTime?.[0]} />
        </Select>

        <Select
          fullWidth
          name="endTime"
          placeholder="Select a time"
          value={formData.endTime || null}
          onChange={(key) => handleSelectChange({ field: "endTime", key })}
          isInvalid={Boolean(errors.endTime)}
          aria-describedby={errors.endTime ? "endTime-error" : undefined}
        >
          <Label>End time</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {timeOptions.map((timeOption) => (
                <ListBox.Item
                  key={timeOption}
                  id={timeOption}
                  textValue={timeOption}
                >
                  {timeOption}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
          <FormError id="endTime-error" message={errors.endTime?.[0]} />
        </Select>
      </div>

      <label className={labelClasses} htmlFor="description">
        Description
        <textarea
          value={formData.description}
          onChange={handleChange}
          id="description"
          name="description"
          rows={4}
          className={inputClasses}
          placeholder="Short description of the band"
          aria-invalid={Boolean(errors.description)}
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
        />
        <FormError id="description-error" message={errors.description?.[0]} />
      </label>

      <Select
        fullWidth
        value={formData.status}
        onChange={(key) => handleSelectChange({ field: "status", key })}
      >
        <Label>Status</Label>
        <Select.Trigger>
          <Select.Value className="capitalize" />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {(["confirmed", "pending", "rejected", "cancelled"] as const).map(
              (statusOption) => (
                <ListBox.Item
                  key={statusOption}
                  id={statusOption}
                  textValue={statusOption}
                >
                  <BandStatusBadge status={statusOption} />
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ),
            )}
          </ListBox>
        </Select.Popover>
      </Select>

      <button
        type="submit"
        className="w-fit cursor-pointer rounded-md bg-accent px-4 py-2 font-medium text-accent-foreground transition-opacity hover:opacity-90"
      >
        Add band
      </button>
    </form>
  );
}
