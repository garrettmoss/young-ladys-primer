export const gardenEntrance = {
  garden_entrance: {
    title: {
      seed: "A Map in the Book",
      sprout: "A Map in the Primer",
      bloom: "The Map Inside the Primer",
      fruit: "The Map Inside the Primer",
    },
    beat: "A folded map appears between pages of the Primer she's read before, smelling of soil, with a note saying the garden has been waiting long enough.",
    feeling: "Some invitations find you before you know you were looking for them.",
    adaptiveContent: {
      seed: ({ readerName }: { readerName: string }) => `Something new was tucked between the pages. A folded paper map.

It smelled like dirt — like outside.

Tiny words in the corner said: *The garden has been waiting long enough.*

${readerName} felt funny, like the map had been waiting for her. That was silly. Maps don't wait.

She picked it up anyway.`,
      fruit: ({ readerName }: { readerName: string }) => `Between two pages ${readerName} had read a dozen times before, something new appeared: a folded piece of paper, brown at the edges, soft as cloth from years of being pressed flat.

It smelled like soil. That was the first strange thing — a page that smelled like outside.

She unfolded it and her heart did something odd. A little jump, like when you miss a step going downstairs, except she was sitting perfectly still. It was a map. Hand-drawn in dark ink, covered in tiny arrows and dotted lines and numbers that someone had crossed out and rewritten, crossed out and rewritten, crossed out and rewritten. Whoever made this had been very determined and not quite finished.

In the bottom margin, in handwriting so small she had to squint:

*If you are reading this, the garden has been waiting long enough.*

${readerName} read that twice. She had the strangest feeling — not that she'd found the map, but that the map had found her. Which was ridiculous, obviously. Maps don't find people. They just sit there, being maps, until someone picks them up.

She picked it up anyway.`
    },
    choices: [
      { text: "Start at the crumbling western wall", action: "western_wall" },
      { text: "Follow the map to the eastern grove", action: "eastern_grove" },
      { text: "Study the map's strange margins", action: "study_map" }
    ]
  }
};
