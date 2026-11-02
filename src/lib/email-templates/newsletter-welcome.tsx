import * as React from 'react'
import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_URL = 'https://wanderinglens.in'

const NewsletterWelcome = () => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Thanks for subscribing to Letters from the road</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>LETTERS FROM THE ROAD</Text>
        <Heading style={h1}>Welcome aboard.</Heading>
        <Text style={text}>
          Thanks for subscribing to Wandering Lens. Once a month you'll get a short note from
          wherever I am, plus the one guide worth reading that month.
        </Text>
        <Text style={text}>No spam, no affiliate noise — just slow travel stories.</Text>
        <Text style={text}>
          While you wait for the first letter, have a look around the{' '}
          <Link href={`${SITE_URL}/blog`} style={link}>latest stories</Link>.
        </Text>
        <Hr style={hr} />
        <Text style={signoff}>See you on the road,<br />Wandering Lens</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: NewsletterWelcome,
  subject: 'Welcome to Letters from the road',
  displayName: 'Newsletter welcome',
  previewData: {},
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const eyebrow = { fontFamily: 'Arial, sans-serif', fontSize: '11px', letterSpacing: '2px', color: '#a5532f', margin: '0 0 12px' }
const h1 = { fontSize: '32px', fontStyle: 'italic' as const, fontWeight: 400, color: '#1c1c1c', margin: '0 0 20px' }
const text = { fontSize: '16px', lineHeight: '1.7', color: '#333333', margin: '0 0 16px' }
const link = { color: '#a5532f', textDecoration: 'underline' }
const hr = { borderColor: '#e6e2da', margin: '28px 0' }
const signoff = { fontSize: '15px', fontStyle: 'italic' as const, color: '#555555' }
