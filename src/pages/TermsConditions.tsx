import React from "react";

const TermsConditions: React.FC = () => {
  return (
    <main className="bg-white text-black py-12 px-4 sm:px-6 lg:px-16 leading-relaxed">
      <article className="max-w-4xl mx-auto lg:mt-16">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">TERMS & CONDITIONS (T&amp;C)</h1>
          <p className="text-sm md:text-base"><strong>Effective Date:</strong> 24.10.2025</p>
          <p><strong>Entity:</strong> Habitoz Private Limited (“we,” “our,” “us”)</p>
          <p><strong>Brand:</strong> Discipl</p>
          <p><strong>Applicable in:</strong> India</p>
        </header>

        <hr className="border-black my-6" />

        {/* 1. INTRODUCTION */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">1. INTRODUCTION</h2>
          <p>
            Welcome to <strong>Discipl</strong>, an integrated fitness ecosystem consisting of:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>Discipl Mentor App</strong> (for fitness centers and trainers)</li>
            <li><strong>Discipl User App</strong> (for members and fitness enthusiasts)</li>
            <li><strong>Discipl Sponsor App</strong> (for brands and advertisers)</li>
            <li><strong>Discipl Website</strong> (for public information and event registrations)</li>
          </ul>
          <p className="mt-2">
            By accessing or using any of our apps, website, or services, you agree to be bound by
            these Terms & Conditions (“Terms”).<br/> 
            If you do not agree, please do not use Discipl.
          </p>
        </section>

        <hr className="border-black my-6" />

        {/* 2. ELIGIBILITY */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">2. ELIGIBILITY</h2>
          <p>You must be at <strong>least 16 years of age</strong> to use Discipl.</p>
          <p>If you are under 18, you may use the platform only under parental or guardian supervision.</p>
          <p className="mt-2">By registering, you confirm that:</p>
          <ul className="list-disc pl-6 space-y-1 mt-1">
            <li>The information you provide is accurate and complete.</li>
            <li>You are not barred under any law from receiving our services.</li>
          </ul>
        </section>

        <hr className="border-black my-6" />

        {/* 3. SERVICES OFFERED */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">3. SERVICES OFFERED</h2>
          <p>Discipl provides:</p>
          <ol className="list-decimal pl-6 space-y-1 mt-2">
            <li><strong>Mentor App</strong> – Tools for fitness centers and trainers to manage members, payments, attendance, and plans.</li>
            <li><strong>User App</strong> – Platform for individuals to discover centers, subscribe to plans (including EMI options), track workouts, and participate in challenges.</li>
            <li><strong>Sponsor App</strong> – Platform for businesses to advertise, run campaigns, and sponsor fitness challenges.</li>
            <li><strong>Website</strong> – Public portal for information, event registration, and gym listings.</li>
          </ol>
          <p className="mt-2">We may update or modify these services at any time.</p>
        </section>

        <hr className="border-black my-6" />

        {/* 4. USER ACCOUNTS */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">4. USER ACCOUNTS</h2>
          <p>You must register an account using:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Mobile OTP or Google login (for Users)</li>
            <li>Business KYC verification (for Mentors and Sponsors)</li>
          </ul>
          <p className="mt-2">You are responsible for:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Maintaining confidentiality of your login credentials.</li>
            <li>All activity occurring under your account.</li>
            <li>Ensuring the information you provide is accurate and up to date.</li>
          </ul>
          <p className="mt-2">
            Discipl is not liable for losses due to unauthorized access caused by your negligence.
          </p>
        </section>

        <hr className="border-black my-6" />

        {/* 5. PAYMENTS AND SUBSCRIPTIONS */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">5. PAYMENTS AND SUBSCRIPTIONS</h2>
          <p>Discipl enables:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>Fitness center memberships</strong> through subscription or EMI models.</li>
            <li><strong>Mentor App premium plans</strong> on a monthly or yearly basis.</li>
            <li><strong>Ad payments</strong> for sponsors on a duration or subscription basis.</li>
          </ul>
          <p className="mt-2">
            All payments are processed securely through our payment gateway partner (e.g., Razorpay).<br/> 
            Refunds, if applicable, are governed by the respective fitness center or advertiser policies.
          </p>
          <p>
            Discipl is <strong>not responsible</strong> for disputes between users, fitness centers, or sponsors regarding refunds, cancellations,
            or service quality.
          </p>
        </section>

        <hr className="border-black my-6" />

        {/* 6. SPONSOR ADVERTISEMENTS */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">6. SPONSOR ADVERTISEMENTS</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Sponsors are solely responsible for the content and legality of their ads.</li>
            <li>Discipl does not endorse, guarantee, or verify any sponsor products or services.</li>
            <li>Ads may appear in various areas of the app ecosystem (Mentor, User, Sponsor apps, and TVs).</li>
            <li>Any false or misleading ad may result in suspension of the sponsor account.</li>
          </ul>
        </section>

        <hr className="border-black my-6" />

        {/* 7. USER-GENERATED CONTENT */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">7. USER-GENERATED CONTENT</h2>
          <p>Users and trainers may post workout logs, images, videos, or comments. You agree that:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>You own or have rights to the content you share.</li>
            <li>You will not post content that is defamatory, abusive, obscene, or infringes any copyright or privacy rights.</li>
            <li>You grant Discipl a non-exclusive, worldwide license to display such content within our ecosystem.</li>
          </ul>
          <p className="mt-2">Discipl reserves the right to remove any inappropriate content.</p>
        </section>

        <hr className="border-black my-6" />

        {/* 8. HEALTH DISCLAIMER */}
        <section className="mb-8">
          <h2 className="text-xl font-bold">8. HEALTH DISCLAIMER</h2>
          <p>
            Discipl provides tools and information for fitness and wellness purposes only.<br/> 
            It does <strong>not</strong> replace professional medical advice.<br/> 
            Users must consult qualified health professionals before starting any fitness program.
          </p>
          <p>
            Discipl, its affiliates, and partners are <strong>not liable</strong> for injuries, health issues, or damages resulting from workouts or
            activities tracked on the app.
          </p>
        </section>

        <hr className="border-black my-6" />

        {/* 9. DATA & PRIVACY */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">9. DATA & PRIVACY</h2>
          <p>
            Discipl collects and processes personal and fitness-related data as per our <strong>Privacy Policy. We ensure compliance with
            the Information Technology Act, 2000, IT (Reasonable Security Practices and Procedures) Rules, 2011, and the Digital
            Personal Data Protection (DPDP) Act, 2023.</strong>
          </p>
          <p className="mt-2">
            You consent to our collection and processing of your information as described in the Privacy Policy.
          </p>
        </section>

        <hr className="border-black my-6" />

        {/* 10. THIRD-PARTY INTEGRATIONS */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">10. THIRD-PARTY INTEGRATIONS</h2>
          <p>Discipl may integrate with:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Biometric devices for attendance tracking</li>
            <li>Payment gateways for transactions</li>
            <li>Third-party APIs for analytics or AI suggestions</li>
          </ul>
          <p className="mt-2">
            These integrations are provided “as-is,” and Discipl is not responsible for their failures or issues.
          </p>
        </section>

        <hr className="border-black my-6" />

        {/* 11. TERMINATION */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">11. TERMINATION</h2>
          <p>We may suspend or terminate your account if:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>You violate these Terms</li>
            <li>Provide false information</li>
            <li>Engage in fraudulent or abusive behavior</li>
          </ul>
          <p className="mt-2">
            You may delete your account anytime by contacting{" "}
            <a href="mailto:info@thediscipl.com" className="text-red-500 hover:underline font-bold">
              info@thediscipl.com
            </a>.
          </p>
        </section>

        <hr className="border-black my-6" />

        {/* 12. INTELLECTUAL PROPERTY */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">12. INTELLECTUAL PROPERTY</h2>
          <p>
            All content, software, UI designs, logos, and trademarks belong to <strong>Habitoz Pvt. Ltd.</strong><br/> You may not copy, modify, or reuse
            them without prior written consent.
          </p>
        </section>

        <hr className="border-black my-6" />

        {/* 13. LIMITATION OF LIABILITY */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">13. LIMITATION OF LIABILITY</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Any direct or indirect damages due to app usage or service interruptions</li>
            <li>Financial disputes between users, gyms, and sponsors</li>
            <li>Health outcomes related to fitness activity</li>
          </ul>
          <p className="mt-2">You use the platform at your own risk.</p>
        </section>

        <hr className="border-black my-6" />

        {/* 14. INDEMNITY */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">14. IDENTITY</h2>
          <p>
            You agree to indemnify and hold harmless <strong>Habitoz Pvt. Ltd.</strong>, its directors, employees, and partners from any claim, loss,
            or damage arising from:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Violation of these Terms</li>
            <li>Misuse of the platform</li>
            <li>Content or data you share</li>
          </ul>
        </section>

        <hr className="border-black my-6" />

        {/* 15. GOVERNING LAW */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">15. GOVERNING LAW & DISPUTE RESOLUTION</h2>
          <p>
            These Terms are governed by <strong>the laws of India.</strong><br/> Any disputes shall be subject to the <strong>exclusive jurisdiction of the courts
            in Kozhikode, Kerala.</strong>
          </p>
        </section>

        <hr className="border-black my-6" />

        {/* 16. CONTACT INFORMATION */}
        <section>
          <h2 className="text-xl font-bold mb-2">16. CONTACT INFORMATION</h2>
          <p>For support, queries, or legal notices:</p>
          <address className="not-italic space-y-1">
            <p>
              📧{" "}
              <a href="mailto:info@thediscipl.com" className="text-red-500 hover:underline font-bold">
                info@thediscipl.com
              </a>
            </p>
            <p>📍 Vankannayullathi, Near Block Office, Balussery, Kozhikode - 673612</p>
          </address>
        </section>
      </article>
    </main>
  );
};

export default TermsConditions;
