export const molecularCommunication = {
  molecular_talk: {
    title: "The Language of Atoms",
    content: ({ readerName }: { readerName: string }) => `"To speak to molecules," the Primer explains, "one must first understand that they are always listening, always dancing, always responding to the world around them.

In ${readerName}'s kingdom, the artificers discovered that molecules respond to three kinds of messages:

HEAT - making them dance faster or slower, like playing different tempos on a drum. When water molecules dance slowly, they lock arms and become ice. When they dance wildly, they fly apart as steam.

LIGHT - certain colors of light are like songs that only specific molecules can hear. Green plants listen to red and blue light, transforming it into the energy of life itself.

ELECTRICITY - the most precise language of all. With tiny electrical whispers, one can ask a single molecule to fold into a new shape, like origami made of atoms.

But here's the secret the ancients discovered: molecules don't just listen - they also speak. Every chemical reaction is a conversation, every crystal that forms tells a story of how its atoms prefer to arrange themselves.

The mechanical dragon's scales, for instance, are made of carbon atoms holding hands in perfect hexagons, whispering strength to each other in bonds harder than diamond.

Understanding these principles was how Princess Elara created her transformation - speaking to molecules in their own languages until they rearranged themselves from flesh to living metal.`,
    choices: [
      { text: "Understand how the dragon's scales work", action: "dragon_pattern" },
      { text: "Apply this to the transformation chamber", action: "queens_workshop" },
      { text: "Continue investigating Elara's story", action: "elara_revealed" }
    ]
  }
};