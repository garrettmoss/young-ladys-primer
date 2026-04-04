export const gardenEntrance = {
  garden_entrance: {
    title: "The Map Inside the Primer",
    content: ({ readerName }: { readerName: string }) => `Between two pages ${readerName} had read a dozen times before, something new appeared: a folded piece of paper, brown at the edges, soft from years of being pressed flat.

She unfolded it carefully. It was a map.

Not a proper map — not the kind with neat borders and compass roses. This one was hand-drawn in dark ink on paper that smelled like soil. It showed a walled garden on the kingdom's edge, surrounded by wild country, with the walls drawn thick and sure. Inside the walls, things got strange. Arrows curved between trees. Dotted lines ran underground. Tiny numbers sat next to flower beds, crossed out and rewritten. Someone had spent a very long time on this map, and had not quite finished it.

In the bottom margin, in handwriting so small ${readerName} had to squint, a note read:

*If you are reading this, the garden has been waiting long enough.*

${readerName} turned the map over. On the back was a rough sketch of the garden's layout — a crumbling western wall half-buried in brambles, an eastern grove of old oaks, and at the center, a clearing marked with a single word: *heart.*

She folded the map and put it in her pocket. The garden wasn't far.`,
    choices: [
      { text: "Start at the crumbling western wall", action: "western_wall" },
      { text: "Follow the map's path to the eastern grove", action: "eastern_grove" },
      { text: "Study the map's margins for clues", action: "study_map" }
    ]
  }
};
