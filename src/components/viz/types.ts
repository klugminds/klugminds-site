/** One selectable mark's copy and its effect on the readout row. */
export type VizItem = {
  title?: string;
  text?: string;
  /** Key/value chips under the detail copy. */
  kv?: string[];
  /** Other mark keys that stay lit while this one is active. */
  with?: string[];
  /** [data-el name, value] pairs written into the readout row. */
  stats?: Array<[string, string]>;
};

export type VizConfig = {
  initial: string;
  items: Record<string, VizItem>;
};

/** One cell of the readout row. `el` matches the stats keys in VizItem. */
export type VizStat = {
  el: string;
  label: string;
  tone?: 'accent' | 'signal';
};
