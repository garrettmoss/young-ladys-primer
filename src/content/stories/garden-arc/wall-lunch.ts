export const wallLunchContent = {
  wall_lunch: {
    title: "Bread, Cheese, and a Beetle",
    content: ({ readerName }: { readerName: string }) => `${readerName} sat on the wall. Her hands were dirty and stinging and she was enormously pleased with herself.

She ate the bread and cheese she'd packed — plain brown bread, hard cheese, an apple that was bruised on one side. She ate the bruised part first, the way her grandmother had taught her. Everything tasted better when you'd earned it, and she had definitely earned it. Her sleeve was torn in two places now. She wore this like a badge.

From her spot on the wall she could see the garden stretching out below — wilder than the map had suggested, greener, more tangled. Things moved in the undergrowth. Water ran somewhere she couldn't see.

The beetle was still on the wall. It picked up a small pebble in its mandibles — pale, round, no bigger than a peppercorn — and walked three inches to the left. Set the pebble down carefully. Turned around. Walked back to where it had started. Stood still for a moment, as if thinking very hard about something.

Then it walked back to the pebble, picked it up, carried it three inches to the left, and set it down again. In exactly the same spot.

${readerName} watched it do this four more times.

The beetle did not appear to be making progress on whatever it was trying to accomplish. But it did not appear to be discouraged, either. She respected that.`,
    choices: [
      { text: "Look more closely at the wall", action: "lichen_grid" }
    ]
  }
};
