export const westernWallPath = {
  western_wall: {
    title: "The Overgrown Wall",
    content: ({ readerName }: { readerName: string }) => `The western wall was easy to find and hard to reach. Brambles had swallowed it whole — a century of thorns growing over and through the old sandstone until the wall was more plant than stone. ${readerName} had to push sideways through the last stretch, arms up to protect her face, feet catching on roots she couldn't see.

She came through scratched and breathing hard, with a long tear in her sleeve and a leaf stuck in her hair.

The wall was taller than she'd expected. Warm sandstone, golden in the afternoon light, crumbling at the top where rain and roots had worked it loose. Lichen covered the lower half in patches — pale green and silver, growing in oddly regular patterns she didn't have time to think about yet.

A fat black beetle sat on the wall at eye level, perfectly still. It watched her. She was fairly certain beetles didn't watch people, but this one was doing it anyway.

Behind the thickest knot of brambles, half-hidden by ivy, she could make out the shape of an iron gate. Rusted shut. The hinges had fused into single lumps of orange metal.

${readerName} looked at the gate. She looked at the brambles. She pushed her sleeves up, which was optimistic given the thorns, and got to work.`,
    choices: [
      { text: "Clear the brambles and force the gate open", action: "clearing_path" }
    ]
  }
};
