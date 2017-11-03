<?xml version="1.0" encoding="us-ascii" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
  <xsl:output method="html"/>
  <xsl:template match="/">
    <xsl:apply-templates select="/rss/channel"/>
  </xsl:template>
  <xsl:template match="/rss/channel">
    <h3><xsl:value-of select="title"/></h3>
    <ul><xsl:apply-templates select="item"/></ul>
  </xsl:template>
  <xsl:template match="/rss/channel/item">
    <li>
      <a href="{link}"><xsl:value-of select="title"/></a>
      <p><xsl:value-of select="description" disable-output-escaping="yes" /></p>
    </li>
  </xsl:template>
</xsl:stylesheet>