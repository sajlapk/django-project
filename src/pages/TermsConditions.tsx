import React from "react";

const TermsConditions: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <div className="w-full m-0 p-0 overflow-x-hidden">
        <img
          src="/Tremsandcondition.png"
          alt="Terms and Conditions Banner"
          className="w-[100vw] max-w-none h-64 sm:h-80 md:h-[400px] lg:h-[500px] object-cover object-center block"
        />
      </div>
      <main className="w-full max-w-7xl bg-white text-black text-sm pt-6 pb-12 px-4 sm:px-6 lg:px-16 leading-relaxed">
        <article className="max-w-4xl mx-auto">
          {/* Header */}
        <header className="mb-10">
          <h1 className="text-xl md:text-3xl font-bold mb-6">TERMS & CONDITIONS (T&amp;C)</h1>
          <p className="text-xs md:text-sm">Effective Date: 24.10.2025</p>
          <p>Entity:Habitoz Private Limited (“we,” “our,” “us”)</p>
          <p>Brand: Discipl</p>
          <p>Applicable in: India</p>
        </header>

        {/* 1. INTRODUCTION */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-2">Inroduction</h2>
          <p>
            Welcome to <strong>Discipl</strong>, an integrated fitness ecosystem consisting of:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <p>
              Welcome to <strong>Discipl</strong>, an integrated fitness ecosystem designed to connect fitness centers, trainers,
              members, fitness enthusiasts, brands, and advertisers through a unified platform. The Discipl ecosystem
              consists of the <strong>Discipl Mentor App</strong>, designed for fitness centers and trainers; the <strong>Discipl User App</strong>, designed for
              members and fitness enthusiasts; the <strong>Discipl Sponsor App</strong>, designed for brands and advertisers; and the Discipl
              Website, which provides public information, platform-related details, and event registration facilities.
            </p><p>
              By accessing, registering for, or using any of our applications,
              website, features, or services, you acknowledge that you have read,
              understood, and agree to be bound by these Terms & Conditions (“Terms”).
              These Terms apply to all users of the Discipl ecosystem, including Users, Mentors,
              Fitness Centers, Sponsors, and other participating parties.
            </p><p>
              If you do not agree with any part of these Terms, please do not access or use Discipl or any of its services.
            </p>
          </ul>
          <p className="mt-2">
            By accessing or using any of our apps, website, or services, you agree to be bound by
            these Terms & Conditions (“Terms”).<br />
            If you do not agree, please do not use Discipl.
          </p>
        </section>

        {/* 2. ELIGIBILITY */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-2"> Eligibility </h2>
          <p>You must be at <strong>least 16 years of age</strong> to use Discipl.</p>
          <p>If you are under 18, you may use the platform only under parental or guardian supervision.</p>
          <p className="mt-2">By registering, you confirm that:</p>
          <ul className="list-disc pl-6 space-y-1 mt-1">
            <p><strong>-</strong> The information you provide is accurate and complete.</p>
            <p><strong>-</strong> You are not barred under any law from receiving our services.</p>
          </ul>
        </section>

        {/* 3. SERVICES OFFERED */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-2"> Services Offered </h2>
          <p>Discipl provides:</p>
          <ol className="list-decimal pl-6 space-y-1 mt-2">
            <li>  Mentor App - Tools for fitness centers and trainers to manage members, payments, attendance, and plans.</li>
            <li>  User App - Platform for individuals to discover centers, subscribe to plans (including EMI options), track workouts, and participate in challenges.</li>
            <li>  Sponsor App - Platform for businesses to advertise, run campaigns, and sponsor fitness challenges.</li>
            <li>  Website - Public portal for information, event registration, and gym listings.</li>
          </ol>
          <p className="mt-2">We may update or modify these services at any time.</p>
        </section>

        {/* 4. USER ACCOUNTS */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-2"> User Account
          </h2>
          <p>To access certain Discipl services, you may be required to register and maintain an account.
            Users may register using Mobile OTP or Google Login, while Mentors and Sponsors may be required
            to complete business KYC verification before accessing relevant features or services. By creating an account,
            you agree to provide information that is accurate, complete, and up to date.
          </p>
          <p>
            You are responsible for maintaining the confidentiality and security of your login credentials
            and for all activities that occur under your account. You must not share your account credentials
            with others or allow unauthorized persons to access your account. You are also responsible for ensuring
            that the information associated with your account remains accurate and current.
          </p>
          <p>
            If you become aware of any unauthorized access, suspicious activity, or misuse of your account,
            you should notify Discipl as soon as possible. Discipl will not be responsible for any loss, damage,
            or unauthorized activity resulting from your failure to maintain the security of your account or login credentials.
          </p>
        </section>

        {/* 5. PAYMENTS AND SUBSCRIPTIONS */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-2"> Payment and Subscription
          </h2>
          <p>Discipl enables:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <p> <strong>-</strong>  Fitness center memberships through subscription or EMI models.</p>
            <p> <strong>-</strong>  Mentor App premium planson a monthly or yearly basis.</p>
            <p> <strong>-</strong>  Ad payments for sponsors on a duration or subscription basis.</p>
          </ul>
          <p className="mt-2">
            All payments are processed securely through our payment gateway partner (e.g., Razorpay).
            Refunds, if applicable, are governed by the respective fitness center or advertiser policies.
            <strong> Discipl </strong> is not responsible for disputes between users, fitness centers, or sponsors regarding refunds, cancellations,
            or service quality.</p>
        </section>

        {/* 6. SPONSOR ADVERTISEMENTS */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-2"> Sponsor Advertisements </h2>
          <ul className="list-disc pl-6 space-y-1">
            <p> Sponsors are responsible for ensuring that all advertisements submitted through
              Discipl are accurate, lawful, clear, and not misleading. Sponsors are solely responsible for the content,
              claims, products, services, offers, and representations made in their advertisements. By submitting an advertisement,
              the Sponsor confirms that they have the necessary rights and authorization to promote the advertised product or
              service.
            </p>
            <p>
              Discipl provides advertising space as a platform and does not endorse, guarantee, certify,
              or independently verify the products, services, claims, or offers promoted by Sponsors.
              Users should make their own decisions and verify any information before purchasing or using a product or
              service advertised through Discipl.
            </p>
            <p>
              Advertisements may be displayed across different parts of the Discipl ecosystem, including the Mentor,
              User, and Sponsor applications, as well as supported TV or display platforms.
            </p>
            <p>
              If Discipl determines that an advertisement contains false, misleading, unlawful, deceptive,
              or inappropriate information, we may remove or restrict the advertisement and may suspend or terminate the Sponsor's
              account, depending on the nature and seriousness of the violation.
            </p>
          </ul>
        </section>

        {/* 7. USER-GENERATED CONTENT */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-2"> User-Generated Content </h2>
          <p>Users and trainers may post workout logs, images, videos, or comments. You agree that:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>You own or have rights to the content you share.</li>
            <li>You will not post content that is defamatory, abusive, obscene, or infringes any copyright or privacy rights.</li>
            <li>You grant Discipl a non-exclusive, worldwide license to display such content within our ecosystem.</li>
          </ul>
          <p className="mt-2">Discipl reserves the right to remove any inappropriate content.</p>
        </section>

        {/* 8. HEALTH DISCLAIMER */}
        <section className="mb-8">
          <h2 className="text-lg font-bold"> Health Disclaimer </h2>
          <p>
            Discipl provides tools and information for fitness and wellness purposes only.
            It does not replace professional medical advice.
            Users must consult qualified health professionals before starting any fitness program.
            Discipl, its affiliates, and partners are not liable for injuries, health issues, or damages resulting from workouts or
            activities tracked on the app.
          </p>
        </section>

        {/* 9. DATA & PRIVACY */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-2"> Data & Privacy</h2>
          <p>
            Discipl collects and processes personal and fitness-related data as per our Privacy Policy. We ensure compliance with
            the Information Technology Act, 2000, IT (Reasonable Security Practices and Procedures) Rules, 2011, and the Digital
            Personal Data Protection (DPDP) Act, 2023.
          </p>
          <p className="mt-2">
            You consent to our collection and processing of your information as described in the Privacy Policy.
          </p>
        </section>

        {/* 10. THIRD-PARTY INTEGRATIONS */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-2"> Third-Party Integrations </h2>
          <p>Discipl may integrate with various third-party devices, services,
            and technologies to provide and improve certain features of the platform. T
            hese may include biometric devices used for attendance tracking, payment gateways used
            to process transactions, and third-party APIs used for analytics, automation, or AI-based
            suggestions and recommendations.
          </p>
          <p>
            These third-party integrations may be subject to their own terms,
            policies, availability, and technical limitations. Discipl does not control the
            operation of third-party services and therefore cannot guarantee their continuous availability,
            accuracy, reliability, or performance. To the extent permitted by applicable law, Discipl will
            not be responsible for failures, interruptions, errors, or issues caused by third-party integrations or services.
          </p>
        </section>

        {/* 11. TERMINATION */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-2"> Termination</h2>
          <p>We may suspend or terminate your account if:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <p><strong>-</strong> You violate these Terms</p>
            <p><strong>-</strong> Provide false information</p>
            <p><strong>-</strong> Engage in fraudulent or abusive behavior</p>
          </ul>
          <p className="mt-2">
            You may delete your account anytime by contacting{" "}
            <a href="mailto:info@thediscipl.com" className="text-red-500 hover:underline font-bold">
              info@thediscipl.com
            </a>.
          </p>
        </section>


        {/* 12. INTELLECTUAL PROPERTY */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-2"> Intellectual Property</h2>
          <p>
            All content, software, UI designs, logos, and trademarks belong to <strong>Habitoz Pvt. Ltd.</strong> You may not copy, modify, or reuse
            them without prior written consent.
          </p>
        </section>

        {/* 13. LIMITATION OF LIABILITY */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-2">Limitation Of Liability </h2>
          <ul className="list-disc pl-6 space-y-1">
            <p>
              To the maximum extent permitted by applicable law, Discipl shall not be liable for any direct,
              indirect, incidental, consequential, or other damages arising from or related to your use of the platform,
              including losses resulting from app errors, service interruptions, technical issues, or temporary unavailability
              of any feature or service.
            </p><p>
              Discipl shall also not be responsible for financial disputes or losses arising between users,
              fitness centers, gyms, Mentors, Sponsors, or other third-party service providers, including disputes
              relating to memberships, payments, services, products, or advertisements.
            </p><p>
              Fitness activities involve inherent risks, and Discipl does not guarantee any particular fitness,
              performance, or health outcome. Any workout, exercise, fitness recommendation, or related activity
              available through the platform is undertaken at your own discretion and risk. You are responsible for
              determining whether an activity is suitable for you and should seek appropriate professional or medical advice
              when necessary.
            </p><p>
              By using Discipl, you acknowledge these limitations and agree that you use the platform and its services at your
              own risk, subject to your rights under applicable law.
            </p>
          </ul>
          <p className="mt-2">You use the platform at your own risk.</p>
        </section>

        {/* 14. INDEMNITY */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-2">Identity</h2>
          <p>
            You agree to indemnify and hold harmless <strong>Habitoz Pvt. Ltd.</strong>, its directors, employees, and partners from any claim, loss,
            or damage arising from:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <p>
              You agree to indemnify, defend, and hold harmless Habitoz Pvt. Ltd., its directors, employees, partners,
              affiliates, and representatives from and against any claims, liabilities, losses, damages, costs,
              or expenses arising out of or relating to your use of the Discipl platform.
            </p><p>
              This includes any claim or loss resulting from your violation of these Terms & Conditions,
              misuse of the platform, unauthorized or unlawful activities, or any content, information,
              or data that you submit, upload, publish, or otherwise share through Discipl.
            </p><p>
              You are responsible for ensuring that your use of the platform and the content you provide
              do not violate applicable laws, these Terms & Conditions, or the rights of any other person or organization.
            </p>
          </ul>
        </section>

        {/* 15. GOVERNING LAW */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-2"> Governing Low & Dispute Resolution  </h2>
          <p>
            These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts
            in Kozhikode, Kerala.
          </p>
        </section>

        {/* 16. CONTACT INFORMATION */}
        <section>
          <h2 className="text-lg font-bold mb-2"> Contact </h2>
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
    </div>
  );
};

export default TermsConditions;
