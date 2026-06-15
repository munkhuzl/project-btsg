import { Schema, model, models } from "mongoose";

// A Counter holds a named, monotonically increasing sequence. Used to assign
// stable, global, sequential request numbers (1, 2, 3, …) the moment a request
// is accepted. The _id is the sequence name (e.g. "requestNumber").
export type Counter = {
  _id: string;
  seq: number;
};

const CounterSchema = new Schema<Counter>({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

export const CounterModel = models.Counter || model<Counter>("Counter", CounterSchema);

// Atomically increments and returns the next value of the named sequence.
// Upserts the counter on first use, so callers never need to seed it.
export const getNextSequence = async (name: string): Promise<number> => {
  const doc = await CounterModel.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return doc.seq;
};
