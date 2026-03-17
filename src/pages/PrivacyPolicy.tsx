import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="font-chivo text-5xl md:text-7xl font-extrabold tracking-tight text-kagnew-gold mb-4">
          KAGNEW
        </h1>
        <p className="font-playfair text-2xl md:text-3xl text-foreground mb-3">
          Privacy Policy
        </p>
        <p className="font-space-mono text-xs tracking-widest text-kagnew-muted uppercase">
          Effective Date: March 17, 2026 · Last Updated: March 2026
        </p>
      </section>

      {/* Content */}
      <main className="px-6 pb-24">
        <div className="max-w-[760px] mx-auto font-source-serif text-[15px] leading-[1.7] text-[#EEEEEE]">

          {/* Intro */}
          <header className="mb-12">
            <p className="font-space-mono text-xs tracking-widest text-kagnew-muted uppercase mb-6">
              Bem LLC · kagnewfilm.com
            </p>

            <SectionHeading>INTRODUCTION AND WHO WE ARE</SectionHeading>

            <p className="mb-4">
              Bem LLC ("we," "us," or "our") operates the website located at kagnewfilm.com
              (the "Site"), the official website for KAGNEW, a feature documentary film. This
              Privacy Policy explains how we collect, use, disclose, and protect personal
              information from visitors to our Site, donors, newsletter subscribers, and anyone
              who contacts us.
            </p>
            <p className="mb-4">
              By using our Site, making a donation, or submitting any information to us, you
              agree to the practices described in this Privacy Policy. If you do not agree,
              please do not use our Site.
            </p>
            <p>
              For questions about this policy, contact us at:{' '}
              <a href="mailto:info@kagnewfilm.com" className="text-kagnew-gold hover:underline">
                info@kagnewfilm.com
              </a>
            </p>
          </header>

          <GoldRule />

          {/* Section 1 */}
          <Section number="1" title="INFORMATION WE COLLECT">
            <SubHeading>1.1 Information You Provide Directly</SubHeading>
            <p className="mb-3">We collect information you voluntarily provide when you:</p>
            <GoldList items={[
              'Make a donation (name, email address, billing address, payment information)',
              'Subscribe to our newsletter or mailing list (name and email address)',
              'Submit a contact form (name, email address, and message content)',
              'Opt in to our public Donor Wall (display name, donation amount, and any message you choose to share)',
              'Purchase merchandise or physical products (name, email, shipping address, billing address, payment information)',
            ]} />

            <SubHeading>1.2 Information Collected Automatically</SubHeading>
            <p className="mb-3">When you visit our Site, we and our service providers may automatically collect:</p>
            <GoldList items={[
              'IP address and approximate geographic location (country/region level)',
              'Browser type and version, operating system, and device type',
              'Pages visited, time spent on each page, and referring URLs',
              'Technical performance data collected through Lovable (our website platform)',
            ]} />
            <p className="mb-6">
              We currently use Lovable as our website platform. Lovable may collect certain
              technical and usage data as part of site operation. Please refer to Lovable's
              privacy documentation for their specific data practices.
            </p>

            <SubHeading>1.3 Payment Information</SubHeading>
            <p>
              All payment processing is handled by Stripe, Inc. We do not store your full
              credit card number, CVV, or complete payment details on our servers. Stripe
              processes payments on our behalf and is subject to the Payment Card Industry
              Data Security Standard (PCI-DSS). You can review Stripe's privacy policy at{' '}
              <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-kagnew-gold hover:underline">
                stripe.com/privacy
              </a>.
            </p>
          </Section>

          <GoldRule />

          {/* Section 2 */}
          <Section number="2" title="HOW WE USE YOUR INFORMATION">
            <p className="mb-3">We use the information we collect for the following purposes:</p>
            <GoldList items={[
              'Processing donations and sending donation receipts and confirmations',
              'Fulfilling merchandise orders and managing shipping',
              'Displaying your name and/or donation amount on our public Donor Wall, if you have explicitly opted in',
              'Sending production updates, newsletters, and film news — only if you have subscribed',
              'Responding to your inquiries submitted through our contact form',
              'Improving our website, diagnosing technical issues, and analyzing usage patterns',
              'Complying with legal obligations, including financial record-keeping and tax reporting',
              'Protecting the security and integrity of our Site and systems',
            ]} />
            <p>
              We will not use your personal information for any purpose materially different
              from those listed above without first obtaining your consent.
            </p>
          </Section>

          <GoldRule />

          {/* Section 3 */}
          <Section number="3" title="THE PUBLIC DONOR WALL — SPECIAL NOTICE">
            <p className="mb-3">
              Our Site features a public Donor Wall that displays the names and, where elected,
              donation amounts of supporters who have explicitly opted in. This is governed by
              the following:
            </p>
            <GoldList items={[
              'Your name and/or donation amount will only appear on the Donor Wall if you actively check the opt-in boxes during the donation process.',
              'Opting in to display your donation amount requires that you have also opted in to display your name.',
              'If you opt in to the Donor Wall as anonymous, your donation will be counted in the total donor count but no identifying information will be displayed.',
              'You may request removal of your name from the Donor Wall at any time by contacting us at info@kagnewfilm.com. We will process removal requests within 14 days.',
              'Any message you leave during donation is subject to moderation. We reserve the right to decline to display messages that contain offensive, defamatory, or inappropriate content.',
            ]} />
          </Section>

          <GoldRule />

          {/* Section 4 */}
          <Section number="4" title="LEGAL BASES FOR PROCESSING (GDPR)">
            <p className="mb-3">
              If you are located in the European Economic Area (EEA), United Kingdom, or
              Switzerland, we process your personal data under the following legal bases:
            </p>
            <GoldList items={[
              'Contractual necessity: Processing your donation payment, fulfilling merchandise orders, and sending transaction receipts.',
              'Legitimate interests: Improving our website, preventing fraud, and understanding how our content is used.',
              'Consent: Sending newsletters and marketing communications; displaying your name or amount on the Donor Wall. You may withdraw consent at any time.',
              'Legal obligation: Maintaining financial records and complying with applicable tax and anti-money-laundering laws.',
            ]} />
          </Section>

          <GoldRule />

          {/* Section 5 */}
          <Section number="5" title="INTERNATIONAL DATA TRANSFERS">
            <p className="mb-4">
              Bem LLC is based in California, USA. If you are accessing our Site from outside
              the United States — including from Ethiopia, South Korea, or the European Economic
              Area — please be aware that your information will be transferred to, stored, and
              processed in the United States.
            </p>
            <p className="mb-4">
              For users in the EEA, UK, or Switzerland: where we transfer your data to the
              United States or other countries without an adequacy decision, we rely on Standard
              Contractual Clauses (SCCs) adopted by the European Commission, or other appropriate
              safeguards under applicable data protection law.
            </p>
            <p>
              For users in South Korea: data transfers to the United States are subject to
              applicable Korean privacy law (PIPA). By using our Site, you consent to this transfer.
            </p>
          </Section>

          <GoldRule />

          {/* Section 6 */}
          <Section number="6" title="SHARING AND DISCLOSURE">
            <p className="mb-4">
              We do not sell, rent, or trade your personal information. We share your information
              only with:
            </p>

            <SubHeading>Service Providers (contractually bound to use data only as directed by us):</SubHeading>
            <GoldList items={[
              'Stripe, Inc. — payment processing and fraud prevention',
              'Supabase — secure database storage for donation records',
              'Resend — transactional email delivery (receipts, confirmations)',
              'Lovable — website hosting and platform services',
              'Shipping and fulfillment partners — for merchandise orders only',
            ]} />

            <SubHeading>Fiscal Sponsor:</SubHeading>
            <p className="mb-4">
              We are in the process of establishing a fiscal sponsorship
              arrangement. If and when a fiscal sponsor is in place, we may share donation
              records with them as required for tax-deductibility processing and reporting.
            </p>

            <SubHeading>Legal Requirements:</SubHeading>
            <p className="mb-4">
              We may disclose your information if required to do so by
              law or to protect the rights, property, or safety of Bem LLC, our users, or
              the public.
            </p>

            <SubHeading>Business Transfers:</SubHeading>
            <p>
              In the event of a merger, acquisition, or sale of assets,
              personal information may be transferred. We will provide notice before any such
              transfer.
            </p>
          </Section>

          <GoldRule />

          {/* Section 7 */}
          <Section number="7" title="COOKIES AND TRACKING">
            <p className="mb-3">Our Site and Lovable may use cookies for:</p>
            <GoldList items={[
              'Essential / functional cookies: Required for the Site to function.',
              'Analytics cookies: Used to understand how visitors interact with our Site.',
              'Preference cookies: Used to remember your settings.',
            ]} />
            <p className="mb-4">
              You can control or disable cookies through your browser settings. For EEA/UK
              users: we will seek your consent before placing any non-essential cookies on
              your device.
            </p>
            <p>
              We do not currently use Meta Pixel, Google Ads, or advertising-based tracking.
            </p>
          </Section>

          <GoldRule />

          {/* Section 8 */}
          <Section number="8" title="YOUR RIGHTS">
            <SubHeading>For All Users:</SubHeading>
            <GoldList items={[
              'Unsubscribe from marketing emails at any time',
              'Request removal from our Donor Wall by contacting info@kagnewfilm.com',
              'Contact us with questions about how we handle your data',
            ]} />

            <SubHeading>For California Residents (CCPA/CPRA):</SubHeading>
            <GoldList items={[
              'Know what personal information we collect, use, and disclose',
              'Delete your personal information, subject to certain exceptions',
              'Correct inaccurate personal information',
              'Non-discrimination for exercising any of these rights',
            ]} />
            <p className="mb-6">We will respond to California rights requests within 45 days.</p>

            <SubHeading>For EEA / UK / Swiss Residents (GDPR):</SubHeading>
            <GoldList items={[
              'Access, rectify, or erase your personal data',
              'Restrict or object to processing',
              'Data portability',
              'Withdraw consent at any time',
              'Lodge a complaint with your local supervisory authority',
            ]} />
            <p className="mb-6">We will respond to GDPR rights requests within 30 days.</p>

            <SubHeading>For South Korean Residents (PIPA):</SubHeading>
            <p className="mb-4">
              You have rights of access, correction, deletion, and suspension of processing
              under the Personal Information Protection Act.
            </p>

            <p>
              To exercise any rights, contact us at:{' '}
              <a href="mailto:info@kagnewfilm.com" className="text-kagnew-gold hover:underline">
                info@kagnewfilm.com
              </a>
            </p>
          </Section>

          <GoldRule />

          {/* Section 9 */}
          <Section number="9" title="DATA RETENTION">
            <GoldList items={[
              'Donation records: 7 years (required by US tax law)',
              'Merchandise order records: 7 years',
              'Donor Wall data: Until you request removal',
              'Newsletter subscriber data: Until you unsubscribe',
              'Contact form submissions: 2 years',
              'Technical logs: 90 days',
            ]} />
          </Section>

          <GoldRule />

          {/* Section 10 */}
          <Section number="10" title="CHILDREN\'S PRIVACY">
            <p>
              Our Site is not directed to children under 13 (or 16 in the EEA). We do not
              knowingly collect personal information from children. If you believe we may
              have information from a child, contact us at{' '}
              <a href="mailto:info@kagnewfilm.com" className="text-kagnew-gold hover:underline">
                info@kagnewfilm.com
              </a>.
            </p>
          </Section>

          <GoldRule />

          {/* Section 11 */}
          <Section number="11" title="SECURITY">
            <p>
              We implement reasonable technical and organizational measures to protect your
              personal information, including encrypted data transmission (TLS/HTTPS), access
              controls, and secure payment processing via Stripe. No method of transmission
              is 100% secure.
            </p>
          </Section>

          <GoldRule />

          {/* Section 12 */}
          <Section number="12" title="CHANGES TO THIS POLICY">
            <p>
              We may update this Privacy Policy from time to time. When we make material
              changes, we will update the effective date above and provide notice on our Site
              or by email.
            </p>
          </Section>

          <GoldRule />

          {/* Section 13 */}
          <Section number="13" title="CONTACT US">
            <p className="mb-1">Bem LLC</p>
            <p className="mb-1">Film: KAGNEW</p>
            <p className="mb-1">
              Website:{' '}
              <a href="https://kagnewfilm.com" className="text-kagnew-gold hover:underline">
                kagnewfilm.com
              </a>
            </p>
            <p>
              Email:{' '}
              <a href="mailto:info@kagnewfilm.com" className="text-kagnew-gold hover:underline">
                info@kagnewfilm.com
              </a>
            </p>
          </Section>

          <GoldRule />

          <p className="text-center text-kagnew-muted text-sm mt-12">
            © 2026 Bem LLC. All rights reserved.
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ── Helper components ── */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-chivo text-xl md:text-2xl font-extrabold text-kagnew-gold tracking-wide mb-4">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-chivo text-base md:text-lg font-bold text-foreground tracking-wide mb-2 mt-6">
      {children}
    </h3>
  );
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <SectionHeading>{number}. {title}</SectionHeading>
      {children}
    </section>
  );
}

function GoldRule() {
  return <hr className="border-0 h-px bg-kagnew-gold/30 my-10" />;
}

function GoldList({ items }: { items: string[] }) {
  return (
    <ul className="mb-6 space-y-2 pl-5">
      {items.map((item, i) => (
        <li key={i} className="relative pl-4 before:content-['·'] before:absolute before:left-0 before:text-kagnew-gold before:font-bold">
          {item}
        </li>
      ))}
    </ul>
  );
}
