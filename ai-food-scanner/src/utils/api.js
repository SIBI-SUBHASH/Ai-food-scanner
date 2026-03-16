/**
 * analyzeIngredients — sends ingredient data to Claude AI via the Anthropic API
 * and returns a structured health analysis report.
 *
 * @param {string|File} input  - Either a plain text ingredient list or a File object (image)
 * @param {'text'|'image'} mode
 * @returns {Promise<ScanResult>}
 */

const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY

export async function analyzeIngredients(input, mode = 'text') {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('Anthropic API key not found. Please add VITE_ANTHROPIC_API_KEY to your .env file.')
  }

  let messages

  if (mode === 'text') {
    messages = [
      {
        role: 'user',
        content: buildTextPrompt(input),
      },
    ]
  } else {
    // Convert image to base64
    const base64 = await fileToBase64(input)
    const mediaType = input.type || 'image/jpeg'
    messages = [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: mediaType, data: base64 },
          },
          {
            type: 'text',
            text: buildImagePrompt(),
          },
        ],
      },
    ]
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-5',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API error: ${response.status}`)
  }

  const data = await response.json()
  const rawText = data.content?.[0]?.text || ''

  return parseResponse(rawText)
}

// ─── Prompts ────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a food safety and nutrition expert AI. When given a list of food ingredients (or an image of a food label), you analyze each ingredient for health impacts and return a structured JSON report.

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
  return `Please analyze the following food ingredients for health impacts:\n\n${text}\n\nReturn ONLY valid JSON as specified.`
}

function buildImagePrompt() {
  return `This image shows a food product label. Please read the ingredients list and analyze each ingredient for health impacts. Return ONLY valid JSON as specified.`
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function parseResponse(text) {
  // Strip possible markdown fences
  const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
  try {
    return JSON.parse(clean)
  } catch {
    throw new Error('Could not parse AI response. Please try again.')
  }
}
