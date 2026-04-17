export const lichenGridContent = {
  lichen_grid: {
    title: "The Pattern on the Wall",
    content: ({ readerName }: { readerName: string }) => `While the beetle worked on its mysterious pebble project, ${readerName} looked at the lichen more carefully.

It wasn't random. The patches grew in rows. In columns. Silver, green, silver, green — alternating, evenly spaced, like someone had planted each one with a ruler and a plan. Or like the lichen itself had decided to grow in a grid, which lichen definitely did not do on its own.

She ran her fingers over the pattern. The silver patches were dry and rough. The green ones were slightly damp and softer. Rough, soft, rough, soft. A pattern you could read with your eyes closed.

Like a map legend, she thought suddenly. A key for reading something she hadn't learned to read yet. The cartographer hadn't just mapped this garden — she'd built instructions into its walls. Directions for anyone patient enough to notice.

${readerName} brushed the crumbs off her lap and pulled a thorn out of her thumb. One last look at the beetle — still going, still undiscouraged — and she went through the gate.`,
    choices: [
      { text: "See what the gate has been hiding", action: "old_well" }
    ]
  }
};
