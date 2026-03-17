import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="font-chivo text-5xl md:text-7xl font-extrabold tracking-tight text-kagnew-gold mb-4">
          KAGNEW
        </h1>
        <p className="font-playfair text-2xl md:text-3xl text-foreground mb-3">
          Terms and Conditions
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
            <LegalBlock>
              PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE USING THIS
              WEBSITE. BY ACCESSING OR USING THE SITE, YOU AGREE TO BE BOUND BY
              THESE TERMS. IF YOU DO NOT AGREE, DO NOT USE THE SITE.
            </LegalBlock>
          </header>

          <GoldRule />

          {/* Section 1 */}
          <Section number="1" title="ACCEPTANCE OF TERMS">
            <p className="mb-4">
              These Terms and Conditions ("Terms") govern your access to and use of
              the website located at kagnewfilm.com (the "Site"), owned and operated
              by Bem LLC, a California limited liability company ("Bem LLC," "we,"
              "us," or "our"). These Terms apply to all visitors, donors, newsletter
              subscribers, merchandise purchasers, and anyone who interacts with
              the Site.
            </p>
            <p>
              These Terms constitute a legally binding agreement between you and
              Bem LLC. By using the Site, you represent that you are at least 18
              years of age (or the age of majority in your jurisdiction) and have
              the legal capacity to enter into this agreement.
            </p>
          </Section>

          <GoldRule />

          {/* Section 2 */}
          <Section number="2" title="ABOUT THE SITE AND THE PROJECT">
            <p className="mb-4">
              The Site is the official online home of KAGNEW, a feature documentary
              film produced by Bem LLC. The Site is used for presenting the project,
              accepting donations, selling merchandise, communicating production
              updates, and building community around the film.
            </p>
            <p>
              Nothing on the Site constitutes an offer of securities, investment in
              a partnership, or any financial instrument. Donations made through the
              Site are contributions to the production of the film and, depending on
              fiscal sponsorship arrangements, may or may not be tax-deductible.
              See Section 5 for details.
            </p>
          </Section>

          <GoldRule />

          {/* Section 3 */}
          <Section number="3" title="INTELLECTUAL PROPERTY">
            <SubHeading>3.1 Our Content</SubHeading>
            <p className="mb-4">
              All content on the Site — including the KAGNEW name and title, all
              film-related materials, documentary footage, photographs, graphics,
              trailers, artwork, scripts, stills, logos, text, design elements, and
              the overall look and feel of the Site — is the exclusive intellectual
              property of Bem LLC or is used by us under license, and is protected
              by United States and international copyright, trademark, and other
              intellectual property laws.
            </p>
            <p className="mb-6">
              You may not copy, reproduce, republish, upload, post, transmit,
              distribute, modify, create derivative works from, or otherwise exploit
              any content from the Site without our express prior written permission.
            </p>

            <SubHeading>3.2 Limited License to Users</SubHeading>
            <p className="mb-3">
              We grant you a limited, non-exclusive, non-transferable, revocable
              license to access and use the Site for personal, non-commercial
              purposes only. This license does not include the right to:
            </p>
            <GoldList items={[
              'Download or copy account information for the benefit of another party',
              'Use data mining, robots, scrapers, or similar data gathering tools',
              'Reproduce, duplicate, copy, sell, resell, or exploit any portion of the Site',
              'Frame or use framing techniques to enclose any trademark, logo, or other proprietary content',
            ]} />

            <SubHeading>3.3 User-Submitted Content</SubHeading>
            <p className="mb-4">
              When you submit content to us — including Donor Wall messages, contact
              form submissions, or social media mentions we may share — you grant
              Bem LLC a non-exclusive, royalty-free, worldwide, perpetual license to
              use, display, reproduce, and distribute that content in connection with
              the promotion and marketing of the KAGNEW documentary and website, in
              all media now known or hereafter developed.
            </p>
            <p>
              You represent and warrant that you own or have the necessary rights to
              any content you submit, and that it does not infringe any third-party
              rights or violate any applicable laws.
            </p>
          </Section>

          <GoldRule />

          {/* Section 4 */}
          <Section number="4" title="THE DONOR WALL">
            <p className="mb-3">
              By opting in to appear on the Donor Wall during the donation process,
              you:
            </p>
            <GoldList items={[
              'Consent to the display of your chosen name on the publicly accessible Donor Wall',
              'Consent, if separately elected, to the display of your donation amount alongside your name',
              'Acknowledge that this information will be visible to all visitors to the Site',
              'Grant us the right to use your name and any message you submit in connection with promotional materials for the film, online and offline',
            ]} />
            <p className="mb-4">
              We reserve the right to moderate Donor Wall content and to decline to
              display any message we determine to be offensive, defamatory, misleading,
              or otherwise inappropriate. You may request removal from the Donor Wall
              at any time by contacting{' '}
              <a href="mailto:info@kagnewfilm.com" className="text-kagnew-gold hover:underline">info@kagnewfilm.com</a>.
              Removal requests will be processed within 14 days.
            </p>
          </Section>

          <GoldRule />

          {/* Section 5 */}
          <Section number="5" title="DONATIONS">
            <SubHeading>5.1 Nature of Donations</SubHeading>
            <p className="mb-3">
              Donations made through the Site are voluntary financial contributions
              to support the production of the KAGNEW documentary. By making a
              donation, you acknowledge and agree that:
            </p>
            <GoldList items={[
              'Donations are final and non-refundable unless required by applicable law or at our sole discretion in exceptional circumstances.',
              'Donations do not entitle you to any ownership interest, equity, profit participation, or creative control over the film.',
              'Donations do not guarantee any particular outcome for the production, release, or distribution of the film.',
              'Tier names (Supporter, Advocate, Producer, Executive) are honorific designations only and do not confer any rights, credits, or involvement in production.',
            ]} />

            <SubHeading>5.2 Tax Deductibility</SubHeading>
            <p className="mb-4">
              Bem LLC is a for-profit limited liability company. Donations made
              directly to Bem LLC are generally not tax-deductible as charitable
              contributions.
            </p>
            <p className="mb-4">
              We are currently in discussions with a fiscal sponsor. If and when a
              fiscal sponsorship arrangement is established, donations processed
              through that fiscal sponsor may be tax-deductible to the extent
              permitted by law. We will update this section and notify donors when
              such arrangements are in place.
            </p>
            <p className="mb-6">
              We strongly recommend you consult your tax advisor regarding the
              deductibility of any donation.
            </p>

            <SubHeading>5.3 Recurring Donations</SubHeading>
            <p className="mb-6">
              If you elect to make monthly recurring donations, your payment method
              will be charged automatically each month on approximately the same day
              as your initial donation. You may cancel your recurring donation at any
              time by contacting{' '}
              <a href="mailto:info@kagnewfilm.com" className="text-kagnew-gold hover:underline">info@kagnewfilm.com</a>.
              Cancellations will take effect before the next scheduled charge and will
              not result in refunds of amounts already processed.
            </p>

            <SubHeading>5.4 Payment Processing</SubHeading>
            <p>
              All payments are processed securely by Stripe, Inc. By making a
              donation or purchase, you agree to Stripe's Terms of Service
              (<a href="https://stripe.com/legal" target="_blank" rel="noopener noreferrer" className="text-kagnew-gold hover:underline">stripe.com/legal</a>)
              and Privacy Policy
              (<a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-kagnew-gold hover:underline">stripe.com/privacy</a>).
              We are not responsible for any errors or failures in payment processing
              caused by Stripe or your financial institution.
            </p>
          </Section>

          <GoldRule />

          {/* Section 6 */}
          <Section number="6" title="MERCHANDISE AND PHYSICAL PRODUCTS">
            <SubHeading>6.1 Orders and Fulfillment</SubHeading>
            <p className="mb-6">
              When you purchase merchandise through the Site, you agree to provide
              accurate shipping and payment information. We reserve the right to
              cancel any order at our discretion and will issue a full refund in
              such cases. Estimated shipping times are estimates only and are not
              guaranteed.
            </p>

            <SubHeading>6.2 Returns and Refunds</SubHeading>
            <p className="mb-4">
              Defective or damaged merchandise may be returned within 30 days of
              delivery for a full refund or replacement. Items must be in their
              original condition. To initiate a return, contact{' '}
              <a href="mailto:info@kagnewfilm.com" className="text-kagnew-gold hover:underline">info@kagnewfilm.com</a>.
              We are not responsible for merchandise lost or damaged in transit due
              to incorrect shipping information provided by you.
            </p>
            <p className="mb-6">
              Digital products are non-refundable once delivered.
            </p>

            <SubHeading>6.3 Shipping</SubHeading>
            <p>
              We ship to the United States and select international destinations.
              International orders may be subject to customs duties, taxes, or import
              fees in the destination country. These charges are the sole responsibility
              of the recipient. We are not responsible for delays caused by customs
              processes or international postal services.
            </p>
          </Section>

          <GoldRule />

          {/* Section 7 */}
          <Section number="7" title="USER CONDUCT">
            <p className="mb-3">By using the Site, you agree not to:</p>
            <GoldList items={[
              'Use the Site for any unlawful purpose or in violation of any applicable laws',
              'Impersonate any person or entity or falsely represent your affiliation',
              'Interfere with or disrupt the integrity or performance of the Site',
              'Attempt to gain unauthorized access to any portion of the Site or connected systems',
              'Transmit any malware, viruses, or other harmful code',
              'Collect or harvest any personal information of other users',
              'Use the Site to send unsolicited commercial communications (spam)',
              'Post or submit any content that is defamatory, harassing, abusive, obscene, or that infringes any third-party rights',
            ]} />
          </Section>

          <GoldRule />

          {/* Section 8 */}
          <Section number="8" title="DISCLAIMER OF WARRANTIES">
            <LegalBlock>
              THE SITE AND ALL CONTENT, PRODUCTS, AND SERVICES AVAILABLE THROUGH
              THE SITE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT
              ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. BEM LLC
              EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO
              IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              TITLE, AND NON-INFRINGEMENT.
            </LegalBlock>
            <LegalBlock>
              BEM LLC DOES NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED,
              ERROR-FREE, SECURE, OR FREE FROM VIRUSES OR OTHER HARMFUL COMPONENTS.
            </LegalBlock>
          </Section>

          <GoldRule />

          {/* Section 9 */}
          <Section number="9" title="LIMITATION OF LIABILITY">
            <LegalBlock>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL
              BEM LLC, ITS MEMBERS, MANAGERS, OFFICERS, EMPLOYEES, AGENTS, OR
              LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES ARISING OUT OF OR
              RELATED TO YOUR USE OF (OR INABILITY TO USE) THE SITE, EVEN IF WE
              HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </LegalBlock>
            <LegalBlock>
              OUR TOTAL AGGREGATE LIABILITY TO YOU SHALL NOT EXCEED THE GREATER OF
              (A) THE TOTAL AMOUNT YOU HAVE PAID TO US IN THE TWELVE (12) MONTHS
              PRECEDING THE CLAIM, OR (B) ONE HUNDRED US DOLLARS ($100).
            </LegalBlock>
          </Section>

          <GoldRule />

          {/* Section 10 */}
          <Section number="10" title="INDEMNIFICATION">
            <p>
              You agree to defend, indemnify, and hold harmless Bem LLC, its members,
              managers, officers, employees, and agents from and against any and all
              claims, damages, losses, liabilities, costs, and expenses (including
              reasonable attorneys' fees) arising out of or related to: (a) your use
              of the Site; (b) any content you submit; (c) your violation of these
              Terms; or (d) your violation of any rights of a third party.
            </p>
          </Section>

          <GoldRule />

          {/* Section 11 */}
          <Section number="11" title="THIRD-PARTY SERVICES AND LINKS">
            <p>
              The Site may contain links to third-party websites and integrates with
              third-party services including Stripe and Lovable. We are not responsible
              for the content, privacy practices, or terms of service of any
              third-party sites or services.
            </p>
          </Section>

          <GoldRule />

          {/* Section 12 */}
          <Section number="12" title="FILM PRODUCTION DISCLAIMER">
            <p className="mb-4">
              The KAGNEW documentary is an independent film production. Completion
              and release of the film are subject to numerous factors including
              available funding, production schedules, access to subjects and
              archival materials, distribution arrangements, and post-production
              requirements. We make no guarantee of any particular release date,
              distribution platform, format, or screening availability.
            </p>
            <p>
              We are not responsible for any reliance placed by donors or supporters
              on the film being completed, released, or distributed in any particular
              manner or timeframe.
            </p>
          </Section>

          <GoldRule />

          {/* Section 13 */}
          <Section number="13" title="PRIVACY">
            <p>
              Your use of the Site is also governed by our Privacy Policy,
              incorporated into these Terms by reference. Please review our Privacy
              Policy at{' '}
              <a href="/privacy" className="text-kagnew-gold hover:underline">
                kagnewfilm.com/privacy
              </a>.
            </p>
          </Section>

          <GoldRule />

          {/* Section 14 */}
          <Section number="14" title="MODIFICATIONS TO THE SITE AND THESE TERMS">
            <p>
              We reserve the right to modify, suspend, or discontinue the Site at
              any time, with or without notice. We also reserve the right to modify
              these Terms at any time. Your continued use of the Site after any
              modifications constitutes your acceptance of the revised Terms.
            </p>
          </Section>

          <GoldRule />

          {/* Section 15 */}
          <Section number="15" title="GOVERNING LAW AND DISPUTE RESOLUTION">
            <SubHeading>15.1 Governing Law</SubHeading>
            <p className="mb-6">
              These Terms shall be governed by the laws of the State of California,
              USA, without regard to its conflict of laws principles.
            </p>

            <SubHeading>15.2 Informal Resolution</SubHeading>
            <p className="mb-6">
              Before initiating any formal dispute, you agree to contact us at{' '}
              <a href="mailto:info@kagnewfilm.com" className="text-kagnew-gold hover:underline">info@kagnewfilm.com</a>{' '}
              and attempt to resolve the dispute informally. We will attempt to resolve
              the matter within 30 days.
            </p>

            <SubHeading>15.3 Binding Arbitration</SubHeading>
            <p className="mb-6">
              If informal resolution fails, any dispute arising out of or relating
              to these Terms shall be resolved by binding arbitration administered
              by JAMS under its Streamlined Arbitration Rules, conducted in
              Los Angeles County, California. The decision of the arbitrator shall
              be final and binding.
            </p>

            <SubHeading>15.4 Class Action Waiver</SubHeading>
            <LegalBlock>
              YOU AND BEM LLC EACH AGREE THAT ANY CLAIMS SHALL BE BROUGHT ONLY IN
              YOUR INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN
              ANY PURPORTED CLASS OR REPRESENTATIVE ACTION.
            </LegalBlock>

            <SubHeading>15.5 Small Claims Exception</SubHeading>
            <p className="mb-6">
              Either party may bring an individual claim in small claims court if
              the claim qualifies.
            </p>

            <SubHeading>15.6 International Users</SubHeading>
            <p>
              We make no representation that the Site is appropriate or available
              for use in all jurisdictions. Users who access the Site from outside
              the United States do so on their own initiative and are responsible
              for compliance with local laws.
            </p>
          </Section>

          <GoldRule />

          {/* Section 16 */}
          <Section number="16" title="DMCA — COPYRIGHT INFRINGEMENT">
            <p className="mb-4">
              If you believe content on the Site infringes your copyright,
              please send a DMCA notice to:
            </p>
            <p className="mb-1">Bem LLC — DMCA Agent</p>
            <p className="mb-4">
              Email:{' '}
              <a href="mailto:info@kagnewfilm.com" className="text-kagnew-gold hover:underline">info@kagnewfilm.com</a>
            </p>
            <p>
              Your notice must include: (1) identification of the copyrighted work;
              (2) identification of the infringing material and its location;
              (3) your contact information; (4) a statement of good faith belief;
              (5) a statement under penalty of perjury of accuracy; and
              (6) your signature.
            </p>
          </Section>

          <GoldRule />

          {/* Section 17 */}
          <Section number="17" title="GENERAL PROVISIONS">
            <SubHeading>17.1 Entire Agreement:</SubHeading>
            <p className="mb-6">
              These Terms, together with our Privacy Policy,
              constitute the entire agreement between you and Bem LLC with respect
              to the Site.
            </p>

            <SubHeading>17.2 Severability:</SubHeading>
            <p className="mb-6">
              If any provision of these Terms is found to be
              invalid or unenforceable, the remaining provisions remain in full
              force and effect.
            </p>

            <SubHeading>17.3 No Waiver:</SubHeading>
            <p className="mb-6">
              Our failure to enforce any right or provision will
              not be considered a waiver of those rights.
            </p>

            <SubHeading>17.4 Assignment:</SubHeading>
            <p className="mb-6">
              You may not assign these Terms without our prior
              written consent. We may assign these Terms without restriction.
            </p>

            <SubHeading>17.5 Force Majeure:</SubHeading>
            <p>
              Bem LLC shall not be liable for any failure or
              delay in performance resulting from causes beyond our reasonable
              control, including acts of God, pandemic, war, governmental actions,
              or internet or power failures.
            </p>
          </Section>

          <GoldRule />

          {/* Section 18 */}
          <Section number="18" title="CONTACT INFORMATION">
            <p className="mb-1">Bem LLC</p>
            <p className="mb-1">Film: KAGNEW</p>
            <p className="mb-1">
              Website:{' '}
              <a href="https://kagnewfilm.com" className="text-kagnew-gold hover:underline">kagnewfilm.com</a>
            </p>
            <p>
              Email:{' '}
              <a href="mailto:info@kagnewfilm.com" className="text-kagnew-gold hover:underline">info@kagnewfilm.com</a>
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

function LegalBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-kagnew-gold/50 pl-5 py-3 mb-4 font-space-mono text-[13px] leading-[1.8] tracking-wide text-[#DDDDDD]">
      {children}
    </div>
  );
}
