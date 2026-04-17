export const westernWallPath = {
  western_wall: {
    title: "The Overgrown Wall",
    content: ({ readerName }: { readerName: string }) => `The western wall was easy to find and hard to reach.

Brambles had swallowed it — a century of thorns growing over and through the old sandstone until the wall was more plant than stone. ${readerName} had to turn sideways and push through the last stretch with her arms over her head, which meant the thorns got her ribs instead of her hands. A fair trade, she decided, though her ribs disagreed.

She came through scratched and breathing hard, with a tear in her sleeve and a leaf stuck in her hair that she wouldn't discover until much later.

The wall itself was beautiful, in the way that old things left alone are beautiful. Warm golden sandstone, taller than she'd expected, crumbling where rain and roots had loosened it over the years. Pale lichen covered the lower half in patches of silver and green.

A fat black beetle sat on the wall at eye level, perfectly still. It watched her. She was fairly certain beetles didn't watch people, but this one hadn't gotten the message.

Behind the thickest knot of brambles, she could just make out the shape of an iron gate. Rusted completely shut. The hinges had fused into solid lumps of orange.

She looked at the gate. She looked at the brambles. She pushed her sleeves up, which was optimistic given the thorns, and got to work.`,
    choices: [
      { text: "Clear the brambles and open the gate", action: "clearing_path" }
    ]
  }
};
