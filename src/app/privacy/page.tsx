import React from 'react';
import { Shield, Eye, Lock, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

 function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 hero-gradient">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: January 15, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Overview */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center p-6">
                <Eye className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  We&quot;re clear about what data we collect and how we use it.
                </p>
              </Card>
              
              <Card className="text-center p-6">
                <Lock className="h-8 w-8 text-secondary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Security</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is protected with industry-standard security measures.
                </p>
              </Card>
              
              <Card className="text-center p-6">
                <Users className="h-8 w-8 text-accent mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Control</h3>
                <p className="text-sm text-muted-foreground">
                  You have control over your personal information and privacy settings.
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
              <h2 className="text-2xl font-bold mb-6">Information We Collect</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Account Information</h3>
                  <p className="text-muted-foreground mb-4">
                    When you create an account, we collect:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Name and email address</li>
                    <li>Profile information (avatar, bio, skill level)</li>
                    <li>Authentication data (encrypted passwords, OAuth tokens)</li>
                    <li>Account preferences and settings</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Project and Code Data</h3>
                  <p className="text-muted-foreground mb-4">
                    To provide our collaborative coding platform, we store:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Code files and project content you create</li>
                    <li>Collaboration history and comments</li>
                    <li>Project metadata and settings</li>
                    <li>Deployment configurations and logs</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Usage Information</h3>
                  <p className="text-muted-foreground mb-4">
                    We automatically collect certain information about how you use our service:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Device information (browser type, operating system)</li>
                    <li>IP address and general location</li>
                    <li>Usage patterns and feature interactions</li>
                    <li>Performance and error logs</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-12">How We Use Your Information</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Service Provision</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Provide and maintain our collaborative coding platform</li>
                    <li>Enable real-time collaboration features</li>
                    <li>Process and store your code and projects</li>
                    <li>Facilitate deployment and hosting services</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Communication</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Send important service updates and notifications</li>
                    <li>Respond to your support requests and inquiries</li>
                    <li>Share educational content and platform updates (with your consent)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Improvement and Analytics</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Analyze usage patterns to improve our service</li>
                    <li>Develop new features and functionality</li>
                    <li>Monitor and improve platform performance</li>
                    <li>Ensure security and prevent abuse</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-12">Information Sharing</h2>
              
              <p className="text-muted-foreground mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">With Your Consent</h3>
                  <p className="text-muted-foreground">
                    When you explicitly agree to share information, such as making your projects public or collaborating with other users.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Service Providers</h3>
                  <p className="text-muted-foreground">
                    We work with trusted third-party service providers who help us operate our platform (hosting, analytics, customer support). These providers are bound by strict confidentiality agreements.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Legal Requirements</h3>
                  <p className="text-muted-foreground">
                    We may disclose information if required by law, court order, or to protect our rights, property, or safety, or that of our users or the public.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-12">Data Security</h2>
              
              <p className="text-muted-foreground mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Secure backup and disaster recovery procedures</li>
                <li>Employee training on data protection and privacy</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6 mt-12">Your Rights and Choices</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Access and Portability</h3>
                  <p className="text-muted-foreground">
                    You can access, download, and export your personal data and project files at any time through your account settings.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Correction and Updates</h3>
                  <p className="text-muted-foreground">
                    You can update your profile information and account settings directly through our platform.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Deletion</h3>
                  <p className="text-muted-foreground">
                    You can delete your account and associated data at any time. Some information may be retained for legal or operational purposes as outlined in our Terms of Service.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Communication Preferences</h3>
                  <p className="text-muted-foreground">
                    You can opt out of non-essential communications through your account settings or by following unsubscribe links in our emails.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-12">Cookies and Tracking</h2>
              
              <p className="text-muted-foreground mb-4">
                We use cookies and similar technologies to:
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li>Maintain your login session and preferences</li>
                <li>Analyze usage patterns and improve our service</li>
                <li>Provide personalized content and recommendations</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
              
              <p className="text-muted-foreground">
                You can control cookie settings through your browser preferences. Note that disabling certain cookies may affect the functionality of our platform.
              </p>

              <h2 className="text-2xl font-bold mb-6 mt-12">Children&quot;s Privacy</h2>
              
              <p className="text-muted-foreground">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>

              <h2 className="text-2xl font-bold mb-6 mt-12">International Data Transfers</h2>
              
              <p className="text-muted-foreground">
                Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
              </p>

              <h2 className="text-2xl font-bold mb-6 mt-12">Changes to This Policy</h2>
              
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the  &quot;Last updated&quot; date. We encourage you to review this policy periodically.
              </p>

              <h2 className="text-2xl font-bold mb-6 mt-12">Contact Us</h2>
              
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm">
                  <strong>Email:</strong> privacy@buildtogether.dev<br />
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

export default PrivacyPage;