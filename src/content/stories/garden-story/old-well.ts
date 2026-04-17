export const oldWellContent = {
  old_well: {
    title: "The Well",
    content: ({ readerName }: { readerName: string }) => `Past the gate, a path of cracked flagstones led downhill through knee-high grass to a circle of low stones. A well — dry, open to the sky. No bucket, no rope. Just a dark shaft going down.

${readerName} leaned over the edge. Stone steps spiraled along the inside wall, carved directly into the rock. A tight staircase winding down into shadow. The steps were worn smooth in the middle from years of use, though not recent years. Moss grew in the corners.

Cool air rose from below, smelling of wet earth and something faintly sweet, like the inside of a hollow log.

Most people, ${readerName} thought, would not climb down into a dark hole in the ground just because a map told them to. Then again, most people hadn't spent the last hour wrestling a gate open with a flat rock. She was already committed.

She went down.

The light from above shrank to a bright coin, then a bright star. The steps were slippery and she went slowly, one hand on the wall, testing each step before trusting it. Water dripped somewhere below. Her breathing sounded loud and close in the narrow space.

Halfway down, her fingers touched something that wasn't stone.`,
    choices: [
      { text: "Look closer", action: "well_roots" }
    ]
  }
};
