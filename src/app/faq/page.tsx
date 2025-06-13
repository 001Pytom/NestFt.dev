"use client";
import React from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'What is NestFt.dev?',
    answer: 'NestFt.dev is a collaborative platform where developers can work on real-world projects together, build their portfolios, and advance their careers. We provide a browser-based IDE, project templates, and a community of developers to learn and grow with.',
    category: 'General'
  },
  {
    id: '2',
    question: 'Is NestFt.dev free to use?',
    answer: 'Yes! NestFt.dev offers a free tier that includes access to basic projects, the collaborative IDE, and community features. We also offer premium plans with additional features like advanced projects, priority support, and enhanced collaboration tools.',
    category: 'Pricing'
  },
  {
    id: '3',
    question: 'What skill level do I need to get started?',
    answer: 'NestFt.dev welcomes developers of all skill levels! We have projects ranging from beginner-friendly tutorials to advanced challenges. Our onboarding process helps you choose projects that match your current skill level and learning goals.',
    category: 'Getting Started'
  },
  {
    id: '4',
    question: 'How does real-time collaboration work?',
    answer: 'Our platform uses advanced real-time synchronization technology that allows multiple developers to code together simultaneously. You can see live cursors, share code changes instantly, and communicate through built-in chat and video calls.',
    category: 'Collaboration'
  },
  {
    id: '5',
    question: 'Can I work on projects alone?',
    answer: 'Absolutely! While we encourage collaboration, you can work on any project individually. You\'ll still have access to our IDE, deployment tools, and the ability to get feedback from the community when you\'re ready.',
    category: 'Projects'
  },
  {
    id: '6',
    question: 'What technologies and frameworks are supported?',
    answer: 'We support a wide range of technologies including HTML/CSS, JavaScript, TypeScript, React, Vue, Angular, Node.js, Python, and many more. Our IDE comes pre-configured with popular development tools and can be customized for your specific needs.',
    category: 'Technical'
  },
  {
    id: '7',
    question: 'How do I deploy my projects?',
    answer: 'NestFt.dev offers one-click deployment to popular hosting platforms. Once your project is complete, you can deploy it instantly and get a live URL to share with potential employers or add to your portfolio.',
    category: 'Deployment'
  },
  {
    id: '8',
    question: 'Can I use my own GitHub repository?',
    answer: 'Yes! You can connect your GitHub account and either import existing repositories or automatically create new ones for your NestFt.dev projects. All your work is saved and version-controlled through Git.',
    category: 'Technical'
  },
  {
    id: '9',
    question: 'How does the portfolio feature work?',
    answer: 'As you complete projects, they\'re automatically added to your NestFt.dev portfolio. You can customize your portfolio with themes, descriptions, and showcase your best work. Your portfolio gets a unique URL that you can share with employers.',
    category: 'Portfolio'
  },
  {
    id: '10',
    question: 'Is there a mobile app?',
    answer: 'Currently, NestFt.dev is a web-based platform optimized for desktop and tablet use. While you can access it on mobile devices, we recommend using a desktop or laptop for the best coding experience.',
    category: 'Technical'
  },
  {
    id: '11',
    question: 'How do I get help if I\'m stuck on a project?',
    answer: 'We offer multiple support channels: community forums, real-time chat with other developers, code review requests, and comprehensive documentation. Premium users also get access to mentor sessions and priority support.',
    category: 'Support'
  },
  {
    id: '12',
    question: 'Can I invite friends to collaborate on projects?',
    answer: 'Yes! You can invite anyone to collaborate on your projects by sharing a project link. They can join as collaborators and work with you in real-time, even if they don\'t have a NestFt.dev account initially.',
    category: 'Collaboration'
  }
];

const categories = ['All', 'General', 'Getting Started', 'Projects', 'Collaboration', 'Technical', 'Pricing', 'Support'];
 function FAQPage() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [openItems, setOpenItems] = React.useState<string[]>([]);

  const filteredFAQs = selectedCategory === 'All' 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen px-12">
      {/* Hero Section */}
      <section className="py-16 md:py-24 hero-gradient">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <HelpCircle className="h-12 w-12 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about NestFt.dev and how to get the most out of our platform.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 border-b">
        <div className="container px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {filteredFAQs.map(faq => (
                <Card key={faq.id} className="overflow-hidden">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg pr-4">
                        {faq.question}
                      </h3>
                      {openItems.includes(faq.id) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  </button>
                  {openItems.includes(faq.id) && (
                    <CardContent className="px-6 pb-6 pt-0">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <Card className="max-w-2xl mx-auto p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can&quot;t find what you&quot;re looking for? Our support team is here to help you get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button>
                  Contact Support
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline">
                  View Documentation
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Quick Start CTA */}
      <section className="py-16">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers building real projects and advancing their careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg">
                Start Building Now
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline">
                Browse Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQPage;