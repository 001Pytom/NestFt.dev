"use client";
import React, { useState } from "react";
import { Cookie, Settings, Shield, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast, useToast } from "@/components/ui/toast";

function CookiesPage() {
  const { addToast } = useToast();

  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    functional: true,
    marketing: false,
  });

  const handlePreferenceChange = (type: keyof typeof preferences) => {
    if (type === "necessary") return; // Necessary cookies cannot be disabled

    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const savePreferences = () => {
    // Save cookie preferences
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    // Show success message
    addToast(toast.success("Cookie preferences saved successfully!"));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 hero-gradient">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Cookie className="h-12 w-12 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn about how we use cookies and similar technologies to improve
              your experience.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: January 15, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Cookie Preferences */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Cookie Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Manage your cookie preferences below. You can change these
                  settings at any time.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-success" />
                        <h3 className="font-semibold">Necessary Cookies</h3>
                        <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">
                          Required
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Essential for the website to function properly. These
                        cookies enable core functionality such as security,
                        network management, and accessibility.
                      </p>
                    </div>
                    <div className="ml-4">
                      <div className="w-12 h-6 bg-success rounded-full flex items-center justify-end px-1">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">Analytics Cookies</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Help us understand how visitors interact with our
                        website by collecting and reporting information
                        anonymously.
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => handlePreferenceChange("analytics")}
                        className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                          preferences.analytics
                            ? "bg-primary justify-end"
                            : "bg-muted justify-start"
                        }`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Settings className="h-5 w-5 text-secondary" />
                        <h3 className="font-semibold">Functional Cookies</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Enable enhanced functionality and personalization, such
                        as remembering your preferences and settings.
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => handlePreferenceChange("functional")}
                        className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                          preferences.functional
                            ? "bg-secondary justify-end"
                            : "bg-muted justify-start"
                        }`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-5 w-5 text-accent" />
                        <h3 className="font-semibold">Marketing Cookies</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Used to track visitors across websites to display
                        relevant and engaging advertisements.
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => handlePreferenceChange("marketing")}
                        className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                          preferences.marketing
                            ? "bg-accent justify-end"
                            : "bg-muted justify-start"
                        }`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button onClick={savePreferences}>Save Preferences</Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setPreferences({
                        necessary: true,
                        analytics: true,
                        functional: true,
                        marketing: false,
                      })
                    }
                  >
                    Accept Recommended
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-background rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">What Are Cookies?</h2>

              <p className="text-muted-foreground mb-6">
                Cookies are small text files that are placed on your computer or
                mobile device when you visit a website. They are widely used to
                make websites work more efficiently and provide information to
                website owners.
              </p>

              <h2 className="text-2xl font-bold mb-6">How We Use Cookies</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Essential Cookies
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    These cookies are necessary for the website to function and
                    cannot be switched off. They include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Authentication cookies to keep you logged in</li>
                    <li>Security cookies to protect against fraud</li>
                    <li>
                      Session cookies to maintain your preferences during your
                      visit
                    </li>
                    <li>
                      Load balancing cookies to ensure optimal performance
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Analytics Cookies
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    We use analytics cookies to understand how you use our
                    website so we can improve it. These cookies collect
                    information such as:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      Which pages you visit and how long you spend on them
                    </li>
                    <li>How you arrived at our website</li>
                    <li>What device and browser you&quot;re using</li>
                    <li>General location information (country/city level)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Functional Cookies
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    These cookies enable enhanced functionality and
                    personalization:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Remembering your language and region preferences</li>
                    <li>Storing your IDE settings and preferences</li>
                    <li>Maintaining your project workspace state</li>
                    <li>Personalizing content recommendations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Marketing Cookies
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    These cookies are used to deliver relevant advertisements:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Tracking which ads you&quot;ve seen</li>
                    <li>
                      Measuring the effectiveness of advertising campaigns
                    </li>
                    <li>Providing relevant content based on your interests</li>
                    <li>Limiting the number of times you see an ad</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-12">
                Third-Party Cookies
              </h2>

              <p className="text-muted-foreground mb-4">
                We may use third-party services that set their own cookies.
                These include:
              </p>

              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>
                  <strong>Google Analytics:</strong> For website analytics and
                  performance monitoring
                </li>
                <li>
                  <strong>GitHub:</strong> For authentication and repository
                  integration
                </li>
                <li>
                  <strong>Supabase:</strong> For backend services and
                  authentication
                </li>
                <li>
                  <strong>Netlify:</strong> For deployment and hosting services
                </li>
              </ul>

              <h2 className="text-2xl font-bold mb-6 mt-12">
                Managing Cookies
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Browser Settings
                  </h3>
                  <p className="text-muted-foreground">
                    You can control and delete cookies through your browser
                    settings. However, please note that disabling certain
                    cookies may affect the functionality of our website.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Our Cookie Preference Center
                  </h3>
                  <p className="text-muted-foreground">
                    Use the preference center above to control which types of
                    cookies we can use. Your preferences will be saved and
                    respected across your visits.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Opt-Out Links</h3>
                  <p className="text-muted-foreground mb-4">
                    You can opt out of certain third-party cookies:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      <a
                        href="https://tools.google.com/dlpage/gaoptout"
                        className="text-primary hover:underline"
                      >
                        Google Analytics Opt-out
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://optout.aboutads.info/"
                        className="text-primary hover:underline"
                      >
                        Digital Advertising Alliance Opt-out
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.youronlinechoices.eu/"
                        className="text-primary hover:underline"
                      >
                        European Interactive Digital Advertising Alliance
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-12">
                Updates to This Policy
              </h2>

              <p className="text-muted-foreground">
                We may update this Cookie Policy from time to time to reflect
                changes in our practices or for other operational, legal, or
                regulatory reasons. We will notify you of any material changes
                by posting the updated policy on this page.
              </p>

              <h2 className="text-2xl font-bold mb-6 mt-12">Contact Us</h2>

              <p className="text-muted-foreground mb-4">
                If you have any questions about our use of cookies, please
                contact us:
              </p>

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm">
                  <strong>Email:</strong> privacy@NestFt.dev.dev
                  <br />
                  <strong>Address:</strong> 123 Tech Street, San Francisco, CA
                  94105
                  <br />
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
export default CookiesPage;
