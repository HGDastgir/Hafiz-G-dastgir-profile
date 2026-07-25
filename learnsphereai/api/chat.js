// LearnSphere AI — Anthropic API proxy
//
// The frontend (index.html) calls this endpoint instead of api.anthropic.com
// directly. That keeps the real Anthropic API key on the server, where it
// belongs, instead of exposed in client-side JavaScript.
//
// SETUP: In the Vercel dashboard, open this project -> Settings ->
// Environment Variables -> add a variable named ANTHROPIC_API_KEY with your
// Anthropic API key as the value, then redeploy so the function picks it up.
//
// WEB SEARCH: this proxy gives every AI feature access to Claude's native
// web search tool. Claude decides for itself, per-request, whether a
// question actually needs a live search (e.g. "who is the current..." or
// "latest...") versus answering from its own knowledge — most homework,
// math, and grammar requests won't trigger a search at all.
// This requires web search to be enabled for your Anthropic organization in
// the Claude Console (Settings -> Web search). If it isn't enabled yet, this
// proxy automatically retries the request without the search tool so the
// site keeps working rather than erroring out.

const ANTHROPIC_VERSION = '2023-06-01';
const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 1500;
const WEB_SEARCH_TOOL = { type: 'web_search_20250305', name: 'web_search', max_uses: 3 };

async function callAnthropic(apiKey, payload) {
  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': ANTHROPIC_VERSION,
    },
    body: JSON.stringify(payload),
  });
  const data = await upstream.json();
  return { ok: upstream.ok, status: upstream.status, data };
}

module.exports = async function handler(req, res) {
  // Same-origin in production; open CORS is safe here since no secrets are
  // ever sent to the client (the API key never leaves this function).
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: 'Server is missing ANTHROPIC_API_KEY. Add it in Vercel → Project → Settings → Environment Variables, then redeploy.',
    });
    return;
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (e) {
    res.status(400).json({ error: 'Invalid JSON body' });
    return;
  }

  const { system, messages } = body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: '"messages" is required' });
    return;
  }

  const basePayload = { model: MODEL, max_tokens: MAX_TOKENS, system: system || undefined, messages };

  try {
    let result = await callAnthropic(apiKey, { ...basePayload, tools: [WEB_SEARCH_TOOL] });

    // If web search isn't enabled for this Anthropic organization yet, fall
    // back to a plain request so the feature still works without search.
    const errMsg = !result.ok && result.data && result.data.error && result.data.error.message;
    if (!result.ok && errMsg && /web search/i.test(errMsg)) {
      result = await callAnthropic(apiKey, basePayload);
    }

    if (!result.ok) {
      res.status(result.status).json({ error: (result.data && result.data.error && result.data.error.message) || 'Upstream API error' });
      return;
    }
    res.status(200).json(result.data);
  } catch (err) {
    res.status(502).json({ error: 'Failed to reach the Anthropic API' });
  }
};
