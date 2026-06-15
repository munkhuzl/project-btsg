import mongoose from "mongoose";
// Relative imports (not the "@/" alias) so this standalone script runs under
// ts-node without needing baseUrl / tsconfig-paths configured.
import { connectDb } from "../utils/connect-db";
import { RequestModel, CounterModel } from "../models";

// One-time migration: assign stable, global, sequential numbers to requests
// that were ALREADY accepted before the requestNumber field existed. Ordered by
// createdAt ascending — the closest available proxy for "first of all time = 1".
// Idempotent: skips requests that already have a requestNumber, and seeds the
// "requestNumber" counter so newly accepted requests continue from the max.
//
// Run from the backend/ directory (MONGO_URI must be set, e.g. in .env):
//   TS_NODE_COMPILER_OPTIONS='{"module":"commonjs"}' \
//     npx ts-node src/scripts/backfill-request-numbers.ts
const backfill = async () => {
  await connectDb();

  const toNumber = await RequestModel.find({
    result: "accepted",
    $or: [{ requestNumber: { $exists: false } }, { requestNumber: null }],
  })
    .sort({ createdAt: 1 })
    .select("_id");

  // Continue from the highest number already assigned (if any prior run / accept).
  const highest = await RequestModel.findOne({ requestNumber: { $ne: null } })
    .sort({ requestNumber: -1 })
    .select("requestNumber");
  let next = (highest?.requestNumber ?? 0) + 1;

  if (toNumber.length === 0) {
    console.log("No accepted requests need a number. Nothing to backfill.");
  } else {
    const ops = toNumber.map((doc) => ({
      updateOne: {
        filter: { _id: doc._id },
        update: { $set: { requestNumber: next++ } },
      },
    }));
    await RequestModel.bulkWrite(ops);
    console.log(`Backfilled ${ops.length} accepted requests (numbers up to ${next - 1}).`);
  }

  // Seed the counter so getNextSequence("requestNumber") continues from the max.
  const maxAssigned = next - 1;
  await CounterModel.updateOne(
    { _id: "requestNumber" },
    { $set: { seq: maxAssigned } },
    { upsert: true }
  );
  console.log(`Counter "requestNumber" seeded at ${maxAssigned}.`);

  await mongoose.disconnect();
  console.log("Done.");
};

backfill().catch((err) => {
  console.error("Backfill failed:", err);
  process.exit(1);
});
