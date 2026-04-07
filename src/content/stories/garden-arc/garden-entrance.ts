export const gardenEntrance = {
  garden_entrance: {
    title: "The Map Inside the Primer",
    content: ({ readerName }: { readerName: string }) => `Between two pages ${readerName} had read a dozen times before, something new appeared: a folded piece of paper, brown at the edges, soft as cloth from years of being pressed flat.

It smelled like soil. That was the first strange thing — a page that smelled like outside.

She unfolded it and her heart did something odd. A little jump, like when you miss a step going downstairs, except she was sitting perfectly still. It was a map. Hand-drawn in dark ink, covered in tiny arrows and dotted lines and numbers that someone had crossed out and rewritten, crossed out and rewritten, crossed out and rewritten. Whoever made this had been very determined and not quite finished.

In the bottom margin, in handwriting so small she had to squint:

*If you are reading this, the garden has been waiting long enough.*

${readerName} read that twice. She had the strangest feeling — not that she'd found the map, but that the map had found her. Which was ridiculous, obviously. Maps don't find people. They just sit there, being maps, until someone picks them up.

She picked it up anyway.`,
    choices: [
      { text: "Start at the crumbling western wall", action: "western_wall" },
      { text: "Follow the map to the eastern grove", action: "eastern_grove" },
      { text: "Study the map's strange margins", action: "study_map" }
    ]
  }
};
