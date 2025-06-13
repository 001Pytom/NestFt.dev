import React from 'react';
import { FileText, Scale, Shield, AlertTriangle } from 'lucide-react';
import { Card} from '@/components/ui/card';

function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 hero-gradient">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FileText className="h-12 w-12 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground">
              Please read these terms carefully before using NestFt.dev.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: January 15, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center p-6">
                <Scale className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Fair Use</h3>
                <p className="text-sm text-muted-foreground">
                  Use our platform responsibly and respect other users.
                </p>
              </Card>
              
              <Card className="text-center p-6">
                <Shield className="h-8 w-8 text-secondary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Your Rights</h3>
                <p className="text-sm text-muted-foreground">
                  You retain ownership of your code and intellectual property.
                </p>
              </Card>
              
              <Card className="text-center p-6">
                <AlertTriangle className="h-8 w-8 text-accent mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Limitations</h3>
                <p className="text-sm text-muted-foreground">
                  Understand our service limitations and liability terms.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-background rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">1. Acceptance of Terms</h2>
              
              <p className="text-muted-foreground mb-6">
                By accessing and using NestFt.dev ( &quot;the Service &quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2 className="text-2xl font-bold mb-6">2. Description of Service</h2>
              
              <p className="text-muted-foreground mb-4">
                NestFt.dev is a collaborative development platform that provides:
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Browser-based integrated development environment (IDE)</li>
                <li>Real-time collaborative coding capabilities</li>
                <li>Project templates and learning resources</li>
                <li>Code deployment and hosting services</li>
                <li>Portfolio generation and showcase features</li>
                <li>Community features and developer networking</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6">3. User Accounts</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Account Creation</h3>
                  <p className="text-muted-foreground mb-4">
                    To use certain features of the Service, you must create an account. You agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and update your account information</li>
                    <li>Keep your password secure and confidential</li>
                    <li>Accept responsibility for all activities under your account</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Account Termination</h3>
                  <p className="text-muted-foreground">
                    You may terminate your account at any time. We reserve the right to suspend or terminate accounts that violate these terms or engage in harmful activities.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-12">4. Acceptable Use</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Permitted Uses</h3>
                  <p className="text-muted-foreground mb-4">
                    You may use the Service for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Learning and practicing programming skills</li>
                    <li>Collaborating on educational and personal projects</li>
                    <li>Building and showcasing your portfolio</li>
                    <li>Participating in the developer community</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Prohibited Activities</h3>
                  <p className="text-muted-foreground mb-4">
                    You agree not to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Use the Service for any illegal or unauthorized purpose</li>
                    <li>Upload malicious code, viruses, or harmful content</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>Violate intellectual property rights</li>
                    <li>Spam or send unsolicited communications</li>
                    <li>Use the Service to compete with or replicate our business</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-12">5. Intellectual Property</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Your Content</h3>
                  <p className="text-muted-foreground">
                    You retain ownership of all code, content, and intellectual property you create using our Service. By using the Service, you grant us a limited license to host, store, and display your content as necessary to provide the Service.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Our Content</h3>
                  <p className="text-muted-foreground">
                    The Service, including its design, functionality, and educational content, is owned by NestFt.dev and protected by intellectual property laws. You may not copy, modify, or distribute our proprietary content without permission.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Open Source</h3>
                  <p className="text-muted-foreground">
                    When you make projects public or contribute to open-source projects through our platform, you agree to license your contributions under the applicable open-source license.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-12">6. Privacy and Data</h2>
              
              <p className="text-muted-foreground mb-4">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information. By using the Service, you agree to our Privacy Policy.
              </p>
              
              <p className="text-muted-foreground">
                You are responsible for maintaining the confidentiality of any sensitive information in your projects. We recommend not storing passwords, API keys, or other sensitive data in your code.
              </p>

              <h2 className="text-2xl font-bold mb-6 mt-12">7. Service Availability</h2>
              
              <p className="text-muted-foreground mb-4">
                We strive to maintain high availability of our Service, but we cannot guarantee uninterrupted access. The Service may be temporarily unavailable due to:
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li>Scheduled maintenance and updates</li>
                <li>Technical difficulties or system failures</li>
                <li>Circumstances beyond our reasonable control</li>
              </ul>
              
              <p className="text-muted-foreground">
                We will make reasonable efforts to provide advance notice of scheduled maintenance.
              </p>

              <h2 className="text-2xl font-bold mb-6 mt-12">8. Payment and Billing</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Free and Paid Services</h3>
                  <p className="text-muted-foreground">
                    We offer both free and paid tiers of service. Paid features are clearly marked, and you will be informed of any charges before they are incurred.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Billing</h3>
                  <p className="text-muted-foreground">
                    Paid subscriptions are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law or as specified in our refund policy.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Changes to Pricing</h3>
                  <p className="text-muted-foreground">
                    We may change our pricing with 30 days&quot;  notice. Price changes will not affect your current billing cycle.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-12">9. Limitation of Liability</h2>
              
              <p className="text-muted-foreground mb-4">
                To the maximum extent permitted by law, NestFt.dev shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li>Loss of data or code</li>
                <li>Loss of profits or business opportunities</li>
                <li>Service interruptions or downtime</li>
                <li>Third-party actions or content</li>
              </ul>
              
              <p className="text-muted-foreground">
                Our total liability for any claims related to the Service shall not exceed the amount you paid us in the 12 months preceding the claim.
              </p>

              <h2 className="text-2xl font-bold mb-6 mt-12">10. Indemnification</h2>
              
              <p className="text-muted-foreground">
                You agree to indemnify and hold harmless NestFt.dev from any claims, damages, or expenses arising from your use of the Service, violation of these terms, or infringement of any rights of another party.
              </p>

              <h2 className="text-2xl font-bold mb-6 mt-12">11. Termination</h2>
              
              <p className="text-muted-foreground mb-4">
                Either party may terminate this agreement at any time. Upon termination:
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li>Your access to the Service will be discontinued</li>
                <li>You may download your data for a limited time</li>
                <li>We may delete your account and data after a reasonable period</li>
                <li>Provisions regarding intellectual property and liability shall survive</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6 mt-12">12. Governing Law</h2>
              
              <p className="text-muted-foreground">
                These terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of San Francisco County, California.
              </p>

              <h2 className="text-2xl font-bold mb-6 mt-12">13. Changes to Terms</h2>
              
              <p className="text-muted-foreground">
                We may modify these terms at any time. We will notify users of material changes via email or through the Service. Continued use of the Service after changes constitutes acceptance of the new terms.
              </p>

              <h2 className="text-2xl font-bold mb-6 mt-12">14. Contact Information</h2>
              
              <p className="text-muted-foreground mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm">
                  <strong>Email:</strong> legal@NestFt.dev.dev<br />
                  <strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105<br />
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default TermsPage;