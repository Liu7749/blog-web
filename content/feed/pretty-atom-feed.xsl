<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <xsl:output method="html" doctype-system="about:legacy-compat" encoding="utf-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>RSS Feed · <xsl:value-of select="/atom:feed/atom:title"/></title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 720px; margin: 2rem auto; padding: 0 1rem; background: #fefefe; color: #1a1a2e; line-height: 1.6; }
          h1 { font-size: 1.5rem; margin-bottom: 0.25rem; }
          .subtitle { color: #555; margin-bottom: 2rem; }
          .entry { padding: 1rem 0; border-bottom: 1px solid #e5e7eb; }
          .entry a { color: #2563eb; font-weight: 600; text-decoration: none; }
          .entry a:hover { text-decoration: underline; }
          .entry time { color: #888; font-size: 0.9rem; }
          @media (prefers-color-scheme: dark) {
            body { background: #0f172a; color: #e2e8f0; }
            .subtitle { color: #cbd5e1; }
            .entry { border-color: #334155; }
            .entry a { color: #60a5fa; }
            .entry time { color: #94a3b8; }
          }
        </style>
      </head>
      <body>
        <h1><xsl:value-of select="/atom:feed/atom:title"/> — RSS Feed</h1>
        <p class="subtitle"><xsl:value-of select="/atom:feed/atom:subtitle"/></p>
        <xsl:for-each select="/atom:feed/atom:entry">
          <div class="entry">
            <a href="{atom:link[@rel='alternate']/@href}"><xsl:value-of select="atom:title"/></a><br/>
            <time><xsl:value-of select="atom:updated"/></time>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
