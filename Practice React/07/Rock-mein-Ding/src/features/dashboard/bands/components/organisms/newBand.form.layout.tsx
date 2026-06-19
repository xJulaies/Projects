import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { z } from "zod";
import { newBandSchema } from "../../schemas/newBand.schema";
import { FormError } from "../atoms/formError.atm";
import type {
  TAdminNewBandForm,
  TFormErrors,
} from "../../types/admin.band.types";
import type { IBand } from "../../../../bands/types/band.types";

const inputClasses =
  "rounded-md border border-border bg-field-background px-3 py-2 text-field-foreground";
const labelClasses = "grid gap-2 text-sm font-medium";

export function NewBandFormLayout() {
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
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
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

    console.log(newBand);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto grid w-full max-w-xl gap-5 rounded-md border border-border bg-surface p-6 text-surface-foreground"
    >
      <div>
        <h1 className="text-2xl font-semibold">Add new band</h1>
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
        />
        <FormError message={errors.name?.[0]} />
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
        />
        <FormError message={errors.genre?.[0]} />
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
        />
        <FormError message={errors.members?.[0]} />
      </label>

      <label className={labelClasses} htmlFor="stage">
        Stage
        <select
          value={formData.stage}
          onChange={handleChange}
          id="stage"
          name="stage"
          className={inputClasses}
        >
          <option value="Apollo North">Apollo North</option>
          <option value="Grand X">Grand X</option>
          <option value="Side West">Side West</option>
        </select>
      </label>

      <label className={labelClasses} htmlFor="day">
        Day
        <select
          value={formData.day}
          onChange={handleChange}
          id="day"
          name="day"
          className={inputClasses}
        >
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClasses} htmlFor="startTime">
          Start time
          <input
            value={formData.startTime}
            onClick={(event) => event.currentTarget.showPicker()}
            onChange={handleChange}
            id="startTime"
            name="startTime"
            type="time"
            className={`${inputClasses} cursor-pointer`}
          />
          <FormError message={errors.startTime?.[0]} />
        </label>

        <label className={labelClasses} htmlFor="endTime">
          End time
          <input
            value={formData.endTime}
            onClick={(event) => event.currentTarget.showPicker()}
            onChange={handleChange}
            id="endTime"
            name="endTime"
            type="time"
            className={`${inputClasses} cursor-pointer`}
          />
          <FormError message={errors.endTime?.[0]} />
        </label>
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
        />
        <FormError message={errors.description?.[0]} />
      </label>

      <label className={labelClasses} htmlFor="status">
        Status
        <select
          value={formData.status}
          onChange={handleChange}
          id="status"
          name="status"
          className={`capitalize ${inputClasses}`}
        >
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </label>

      <button
        type="submit"
        className="w-fit rounded-md bg-accent px-4 py-2 font-medium text-accent-foreground"
      >
        Add band
      </button>
    </form>
  );
}
