import {
  CareInput,
  CUBE_MOISTURE_OPTIONS,
  DOME_CONDENSATION_OPTIONS,
  DRYBACK_OPTIONS,
  LEAF_TURGOR_OPTIONS,
  ROOTING_STAGE_OPTIONS,
  TRAY_UNIFORMITY_OPTIONS,
} from '../types';

interface Props {
  value: CareInput;
  onChange: (next: CareInput) => void;
}

function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (next: T) => void;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value as T)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function InputForm({ value, onChange }: Props) {
  return (
    <div className="form-grid">
      <label className="field">
        <span>Day since sticking</span>
        <input
          type="number"
          min={1}
          max={30}
          value={value.daySinceSticking}
          onChange={(e) => onChange({ ...value, daySinceSticking: Number(e.target.value) })}
        />
      </label>

      <SelectField
        label="Cube moisture"
        value={value.cubeMoisture}
        options={CUBE_MOISTURE_OPTIONS}
        onChange={(cubeMoisture) => onChange({ ...value, cubeMoisture })}
      />
      <SelectField
        label="Rooting stage"
        value={value.rootingStage}
        options={ROOTING_STAGE_OPTIONS}
        onChange={(rootingStage) => onChange({ ...value, rootingStage })}
      />
      <SelectField
        label="Dryback pace"
        value={value.drybackPace}
        options={DRYBACK_OPTIONS}
        onChange={(drybackPace) => onChange({ ...value, drybackPace })}
      />
      <SelectField
        label="Leaf turgor"
        value={value.leafTurgor}
        options={LEAF_TURGOR_OPTIONS}
        onChange={(leafTurgor) => onChange({ ...value, leafTurgor })}
      />
      <SelectField
        label="Dome condensation"
        value={value.domeCondensation}
        options={DOME_CONDENSATION_OPTIONS}
        onChange={(domeCondensation) => onChange({ ...value, domeCondensation })}
      />
      <SelectField
        label="Tray uniformity"
        value={value.trayUniformity}
        options={TRAY_UNIFORMITY_OPTIONS}
        onChange={(trayUniformity) => onChange({ ...value, trayUniformity })}
      />
    </div>
  );
}
