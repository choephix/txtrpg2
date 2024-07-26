export module StringConstants {
  export const defaultHistory = [
    {
      id: 1,
      sender: 'assistant',
      message:
        "Hello! How can I assist you today? I'm an AI assistant created by Anthropic to help with a variety of tasks.",
    },
    {
      id: 2,
      sender: 'user',
      message:
        "Hi there! I'm wondering if you can help me understand how airplane turbulence works. I'm a bit nervous about my first flight coming up.",
    },
    {
      id: 3,
      sender: 'assistant',
      message:
        "Absolutely, I'd be happy to explain airplane turbulence in a way that's easy to understand. Turbulence happens when the plane encounters pockets of air that are moving differently than the surrounding air. It's kind of like sailing a boat on choppy water - the boat will bounce and shake a bit, but it's completely normal and not dangerous at all.",
    },
    {
      id: 4,
      sender: 'user',
      message:
        'That makes a lot of sense, thank you! I feel much better about my upcoming flight now. Is there anything else I should know before I go?',
    },
    {
      id: 5,
      sender: 'assistant',
      message:
        "Here are a few other tips that can help make your first flight a smooth one:\n\n- Drink plenty of water to stay hydrated\n- Bring noise-cancelling headphones or earplugs\n- If you feel anxious, try some deep breathing or meditation exercises\n- Don't be afraid to ask the flight attendants for anything you need",
    },
  ];

  export const systemMessage = `
  You are a master of the written word. 
  Let's help immerse our fantasy adventure game's users into the world of Lorem.
  Help me turn basic system-style descriptions of the last action the user made, their surroundings and characters objects therein into a pleasant read, worthy of our interactive novel.

  Rules: We want to charm the reader, not bore them. When in doubt, aim for conciseness and to-the-pointness.

  Example:
  Last action: Open front door to the inn.
  Location & Time: The inn's main space, nighttime. Crowded. Barkeep: Burly man, cleaning a glass.
  Location before: Visited this morning. Almost empty. Barkeep: Burly man, cleaning a glass. 

  Result (in JSON):
  {
    "text": "You push the inn's front door open and enter the common area. It got lot more crowded since you were away. The hunk behind the bar was the same though. You would not be shocked if the glass in his hand was the same one he was scrubbing over and over this morning."
  }
  `
}
