import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <main className="bg-white text-black py-12 px-4 sm:px-6 lg:px-16 leading-relaxed">
      <article className="max-w-4xl mx-auto lg:mt-16">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">PRIVACY POLICY</h1>
          <p className="text-sm md:text-base font-medium">
            <strong>Effective Date:</strong> 24.10.2025
          </p>
        </header>

        <hr className="border-black my-6" />

        {/* 1. INTRODUCTION */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">1. INTRODUCTION</h2>
          <p>
            This Privacy Policy explains how <strong>Discipl</strong> (operated by <b>Habitoz Pvt. Ltd</b>.)
            collects, uses, shares, and protects your personal data when you use our apps or website.
          </p>
          <p className="mt-2">
            By using our services, you consent to this policy.
          </p>
        </section>

        <hr className="border-black my-6" />

        {/* 2. INFORMATION WE COLLECT */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">2. INFORMATION WE COLLECT</h2>
          <p>We collect:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Personal Information:</strong> Name, mobile number, email, gender, profession, fitness goals</li>
            <li><strong>Usage Data:</strong> App interactions, activity logs, step counts, workout entries</li>
            <li><strong>Payment Data:</strong> Transaction IDs, Razorpay UPI references (handled securely)</li>
            <li><strong>Device Data:</strong> Model, OS version, IP address (for analytics and security)</li>
            <li><strong>Optional Health Data:</strong> Weight, height, sleep hours, medical conditions (if provided voluntarily)</li>
          </ul>
        </section>

        <hr className="border-black my-6" />

        {/* 3. HOW WE USE YOUR DATA */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">3. HOW WE USE YOUR DATA</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Create and manage your account</li>
            <li>Facilitate gym memberships, EMI payments, and subscriptions</li>
            <li>Suggest workout plans and challenges</li>
            <li>Display personalized content and ads</li>
            <li>Improve app experience and analytics</li>
            <li>Send updates, notifications, and marketing (if opted-in)</li>
          </ul>
        </section>

        <hr className="border-black my-6" />

        {/* 4. DATA SHARING */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">4. DATA SHARING</h2>
          <p>We share data only:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>With <b>fitness centers</b> (for your membership and training data)</li>
            <li>With <b>payment gateways</b> (for transactions)</li>
            <li>With <b>advertisers</b> (anonymized, non-identifiable data for ad targeting)</li>
            <li>As required by <b>law or court orders</b></li>
          </ul>
          <p className="mt-2 font-medium">We never sell your personal data.</p>
        </section>

        <hr className="border-black my-6" />

        {/* 5. DATA SECURITY */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">5. DATA SECURITY</h2>
          <p>We follow industry-standard practices to safeguard data, including:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>HTTPS encryption</li>
            <li>Secure cloud storage (India-based servers)</li>
            <li>Regular access audits</li>
            <li>Limited internal access on a need-to-know basis</li>
          </ul>
          <p className="mt-2">
            However, no system is 100% secure. You use Discipl at your own risk.
          </p>
        </section>

        <hr className="border-black my-6" />

        {/* 6. DATA RETENTION */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">6. DATA RETENTION</h2>
          <p>
            Your data is retained as long as your account remains active.<br/> 
            You may request deletion of your account and data at any time by emailing{" "}
            <a
              href="mailto:info@thediscipl.com"
              className="text-red-500 hover:underline font-bold"
            >
              info@thediscipl.com
            </a>.
          </p>
        </section>

        <hr className="border-black my-6" />

        {/* 7. YOUR RIGHTS */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">
            7. YOUR RIGHTS (Under DPDP Act 2023)
          </h2>
          <p>As an Indian user, you have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Access your personal data</li>
            <li>Request correction or deletion</li>
            <li>Withdraw consent for data processing</li>
            <li>Lodge complaints with the Data Protection Board of India</li>
          </ul>
          <p className="mt-2">
            To exercise these rights, contact us at{" "}
            <a
              href="mailto:info@thediscipl.com"
              className="text-red-500 hover:underline font-bold"
            >
              info@thediscipl.com
            </a>.
          </p>
        </section>

        <hr className="border-black my-6" />

        {/* 8. COOKIES */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">8. COOKIES & TRACKING</h2>
          <p>
            We use cookies for analytics, personalization, and remembering preferences.<br/> 
            You may disable cookies in your browser settings, but some features may not function properly.
          </p>
        </section>

        <hr className="border-black my-6" />

        {/* 9. CHILDREN’S PRIVACY */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">9. CHILDREN’S PRIVACY</h2>
          <p>
            We do not knowingly collect data from users under 16 years of age.<br/> 
            If you believe your child has provided us data, please contact us for removal.
          </p>
        </section>

        <hr className="border-black my-6" />

        {/* 10. POLICY UPDATES */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">10. POLICY UPDATES</h2>
          <p>
            We may update this Privacy Policy periodically.<br/> 
            Changes will be notified via the app or website with an updated “Effective Date.”
          </p>
        </section>

        <hr className="border-black my-6" />

        {/* 11. CONTACT */}
        <section>
          <h2 className="text-xl font-bold mb-2">11. CONTACT</h2>
          <p>For data or privacy queries:</p>
          <address className="not-italic space-y-1">
            <p>
              📧{" "}
              <a
                href="mailto:info@thediscipl.com"
                className="text-red-500 hover:underline font-bold"
              >
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

export default PrivacyPolicy;
