async function generateImage(prompt, size) {
  const payload = {
    prompt,
    n: 1,
    size,
  };

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (response.status !== 200) {
    throw new Error(`Failed to generate image (status ${response.status})`);
  }

  const image = await response.json();

  return image.data[0].url;
}

export default async function handler(req, res) {
  const { prompt, size } = req.body;

  try {
    const imageUrl = await generateImage(prompt, size);
    console.log(imageUrl);

    res.json({ url: imageUrl });
  } catch (error) {
    console.error(`Failed to generate image: ${error}`);
    res.status(500).json({ error });
  }
}
