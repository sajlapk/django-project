import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="w-full bg-white text-black">
      {/* Privacy Policy Banner */}
      <div className="w-full m-0 p-0 overflow-hidden">
        <img
          src="/privacypolicy.png"
          alt="Privacy Policy Security Banner"
          className="w-[100vw] max-w-none h-64 sm:h-80 md:h-[400px] lg:h-[500px] object-cover object-center block"
        />
      </div>

      <main className="py-12 px-4 sm:px-6 lg:px-16 leading-relaxed text-sm text-gray-800">
        <article className="max-w-4xl mx-auto">

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-xl md:text-3xl font-bold mb-2">
              PRIVACY POLICY
            </h1>

            <p className="text-sm md:text-base font-medium">
              Effective Date: 24.10.2025
            </p>
          </header>

          {/* <hr className="border-black my-6" /> */}

          {/* 1. INTRODUCTION */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2">
              Introduction
            </h2>
            <p>
              At <strong>Discipl</strong> we value your privacy and are committed to protecting and processing your personal information responsibly.
            </p>
            <p>
              This Privacy Policy explains how <strong>Discipl</strong>{" "}
              (operated by <strong>Habitoz Pvt. Ltd.</strong>) collects,
              uses, shares, and protects your personal data when you use
              our apps or website.
            </p>

            <p className="mt-2">
              By using our services, you consent to this policy.
            </p>
          </section>


          {/* 2. INFORMATION WE COLLECT */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2">
              Information We Collect
            </h2>

            <p>We may collect the following types of information:</p>

            <ul className="list-disc pl-6 space-y-2 mt-2">
              <p>
                Personal Information: Name, mobile number,
                email, gender, profession, fitness goals
              </p>

              <p>
                Usage Data: App interactions, activity
                logs, step counts, workout entries
              </p>

              <p>
                Payment Data: Transaction IDs, Razorpay
                UPI references (handled securely)
              </p>

              <p>
                Device Data:Model, OS version, IP address
                (for analytics and security)
              </p>

              <p>
                Optional Health Data:Weight, height,
                sleep hours, medical conditions (if provided voluntarily)
              </p>
            </ul>
          </section>

          {/* 3. HOW WE USE YOUR DATA */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2">
              How We Use Your Data
            </h2>

            <p>We use your information to:</p>
            <p>
              We use your information to create and manage your account, facilitate gym memberships,
              EMI payments, and subscriptions, suggest workout plans and challenges, display personalized content and advertisements,
              improve our app experience and analytics, and send updates, notifications,
              and marketing communications where you have opted in.
            </p>
          </section>

          {/* 4. DATA SHARING */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2">
              Data Sharing
            </h2>
            <p>
              We may share your information with fitness centers when required for membership and training services,
              with payment gateways to process transactions, with advertisers using anonymized
              and non-identifiable information for advertising purposes, and with authorities where disclosure is
              required by law or court order. We do not sell your personal data.
            </p>
          </section>

          {/* 5. DATA SECURITY */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2">
              Data Security
            </h2>

            <p>
              We follow industry-standard practices to safeguard data,
              including:
            </p>

            <ul className="list-disc pl-6 space-y-2 mt-2">
              <p><strong>-</strong> HTTPS encryption</p>
              <p><strong>-</strong> Secure cloud storage (India-based servers).</p>
              <p><strong>-</strong> Regular access audits.</p>
              <p><strong>-</strong> Limited internal access on a need-to-know basis.</p>
            </ul>

            <p className="mt-2">
              However, no system is 100% secure. You use Discipl at your
              own risk.
            </p>
          </section>

          {/* 6. DATA RETENTION */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2">
              Data Rentention
            </h2>

            <p>
              Your data is retained as long as your account remains active.
              You may request deletion of your account and data at any time by emailing{" "}
              <a
                href="mailto:info@thediscipl.com"
                className="text-red-500 hover:underline font-bold"
              >
                info@thediscipl.com
              </a>
              .
            </p>
          </section>

          {/* 7. YOUR RIGHTS */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2">
              Your Rights (Under DPDP Act 2023)
            </h2>

            <p>As an Indian user, you have the right to:</p>

            <ul className="list-disc pl-6 space-y-2 mt-2">
              <p><strong>-</strong> Access your personal data.</p>
              <p><strong>-</strong> Request correction or deletion.</p>
              <p><strong>-</strong> Withdraw consent for data processing.</p>
              <p><strong>-</strong> Lodge complaints with the Data Protection Board of India. </p>
            </ul>

            <p className="mt-2">
              To exercise these rights, contact us at{" "}
              <a
                href="mailto:info@thediscipl.com"
                className="text-red-500 hover:underline font-bold"
              >
                info@thediscipl.com
              </a>
              .
            </p>
          </section>

          {/* 8. COOKIES */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2">
              Cookies & Tracking
            </h2>

            <p>
              We use cookies for analytics, personalization, and remembering
              preferences.You may disable cookies in your browser settings, but some
              features may not function properly.
            </p>
          </section>

          {/* 9. CHILDREN'S PRIVACY */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2">
              Children&apos;s Privacy
            </h2>

            <p>
              We do not knowingly collect personal information from users under 16 years of age.
              If you believe that a child has provided personal information to us,
              please contact us so that we can review and take appropriate steps to remove the information where applicable.
            </p>
          </section>

          {/* 10. POLICY UPDATES */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2">
              Updates to This Policy
            </h2>

            <p>
              We may update this Privacy Policy periodically. Changes will be notified via the app or website with an
              updated “Effective Date.”
            </p>
          </section>

          {/* 11. CONTACT */}
          <section>
            <h2 className="text-lg font-bold mb-2">
              Contact
            </h2>

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

              <p>
                📍 Vankannayullathi, Near Block Office, Balussery,
                Kozhikode - 673612
              </p>
            </address>
          </section>

        </article>
      </main>
    </div>
  );
};

export default PrivacyPolicy;