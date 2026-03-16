/**
 * analyzeIngredients — sends ingredient data to Groq AI (FREE)
 * and returns a structured health analysis report.
 *
 * @param {string|File} input  - Either a plain text ingredient list or a File object (image)
 * @param {'text'|'image'} mode
 * @returns {Promise<ScanResult>}
 */

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY

export async function analyzeIngredients(input, mode = 'text') {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API key not found. Please add VITE_GROQ_API_KEY to your .env file.')
  }

  let userMessage

  if (mode === 'text') {
    userMessage = buildTextPrompt(input)
  } else {
    const base64 = await fileToBase64(input)
    userMessage = buildImagePrompt(base64, input.type)
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 4096,
      temperature: 0.3,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user',   content: userMessage },
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Groq API error: ${response.status}`)
  }

  const data = await response.json()
  const rawText = data.choices?.[0]?.message?.content || ''

  return parseResponse(rawText)
}

// ─── Prompts ────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a food safety and nutrition expert AI. When given a list of food ingredients, you analyze each ingredient for health impacts and return a structured JSON report.

Your analysis must be:
- Evidence-based and accurate
- Impartial and science-backed
- Actionable with specific concerns and alternatives

Return ONLY valid JSON. No markdown. No prose before or after the JSON.

The JSON schema:
{
  "productName": "string (infer from ingredients or use 'Food Product')",
  "overallScore": number (0-100, health score — 100 = perfectly healthy),
  "summary": "string (2-3 sentence plain-English summary of the overall health profile)",
  "recommendation": "string (1-2 sentence actionable advice)",
  "ingredients": [
    {
      "name": "string (ingredient name as listed)",
      "e_number": "string or null (EU additive code if applicable)",
      "status": "safe | caution | warning | critical",
      "shortDesc": "string (one line description)",
      "details": "string (2-3 sentences explaining what this ingredient is and its health impact)",
      "concerns": ["array of specific health concerns, or empty array"],
      "alternatives": ["array of healthier alternatives, or empty array"],
      "sources": ["array of reference sources like WHO, FDA, EFSA, etc."]
    }
  ]
}

Status definitions:
- safe: Natural, generally recognized as safe, beneficial
- caution: Acceptable in moderation but worth watching
- warning: Linked to health issues; avoid when possible
- critical: Strong evidence of harm; should be avoided`

function buildTextPrompt(text) {
  return `Please analyze the following food ingredients for health impacts:\n\n${text}\n\nReturn ONLY valid JSON as specified. No extra text.`
}

function buildImagePrompt(base64, mediaType) {
  return `I have a food product label image. Since vision is not supported, please return this JSON exactly:
{
  "productName": "Image Upload",
  "overallScore": 0,
  "summary": "Unable to read image directly. Please use the Type Ingredients mode and paste the ingredients list manually for accurate analysis.",
  "recommendation": "Switch to text mode and type the ingredients for best results.",
  "ingredients": []
}
Return ONLY valid JSON.`
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload  = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function parseResponse(text) {
  const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
  try {
    return JSON.parse(clean)
  } catch {
    throw new Error('Could not parse AI response. Please try again.')
  }
}
