import { Hono } from 'hono'
import { raw } from 'hono/html'
import type { Bindings } from '../types'
import Layout from '../templates/Layout'

const app = new Hono<{ Bindings: Bindings }>()

app.get('/join', (c) => {
  return c.html(
    <Layout title="Join">
      <h1>Join the ring</h1>
      <p>webring.ca is a community of Canadian builders sharing their work on the open web. Add the widget to your site and open a pull request to join.</p>

      <h2>Requirements</h2>
      <ul>
        <li>A personal site or project by a Canadian builder</li>
        <li>Real content (not a placeholder)</li>
        <li>The webring widget installed on your site</li>
      </ul>

      <h2>1. Add the widget</h2>
      <p>The script embed works with any framework:</p>
      <pre><code>{raw(`&lt;div data-webring="ca" data-member="your-slug"&gt;&lt;/div&gt;
&lt;script src="https://webring.ca/embed.js" defer&gt;&lt;/script&gt;`)}</code></pre>
      <p>For static sites that don't load external scripts:</p>
      <pre><code>{raw(`&lt;a href="https://webring.ca/prev/your-slug"&gt;&amp;larr; prev&lt;/a&gt;
&lt;a href="https://webring.ca/random"&gt;\ud83c\udf41 webring.ca&lt;/a&gt;
&lt;a href="https://webring.ca/next/your-slug"&gt;next &amp;rarr;&lt;/a&gt;`)}</code></pre>

      <h2>2. Add yourself to members.json</h2>
      <p>Fork the repo and append your entry to the bottom of the array:</p>
      <pre><code>{raw(`{
  "slug": "your-name",
  "name": "Your Name",
  "url": "https://yoursite.ca",
  "city": "Toronto",
  "type": "developer",
  "active": true
}`)}</code></pre>
      <p><code>type</code> is one of: <code>developer</code>, <code>designer</code>, <code>founder</code>, <code>other</code></p>

      <h2>3. Open a pull request</h2>
      <p>CI will verify your site is reachable and we'll merge you in.</p>
      <p><a href="https://github.com/stanleypangg/webring.ca">{raw('Fork on GitHub &rarr;')}</a></p>
    </Layout>
  )
})

export default app
