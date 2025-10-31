import { MessageCircle, Mail, Phone, FileQuestion, Book, Video, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';

const faqs = [
  {
    question: 'How do I place a buy or sell order?',
    answer: 'Select a stock from the Market Watch, click on it to open the Order Panel, choose BUY or SELL, enter your quantity and price, then click Place Order.',
  },
  {
    question: 'What are the different order types?',
    answer: 'LIMIT: Order executes at your specified price or better. MARKET: Order executes immediately at current market price. SL (Stop Loss): Order triggers when price reaches your stop loss level.',
  },
  {
    question: 'How can I add stocks to my watchlist?',
    answer: 'Use the search bar at the top to find stocks, then click the star icon next to any stock to add it to your Market Watch.',
  },
  {
    question: 'What is the difference between Holdings and Positions?',
    answer: 'Holdings are your long-term investments (CNC - delivery). Positions are your intraday trades (MIS) that must be squared off before market close.',
  },
  {
    question: 'How do I check my available funds?',
    answer: 'Navigate to the Funds page from the sidebar to view your available margin, used funds, and total balance.',
  },
];

export default function Support() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Support ticket submitted successfully. We\'ll get back to you soon!');
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Support Center</h1>
        <p className="text-muted-foreground">Get help with your trading account</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Contact Options */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Live Chat</CardTitle>
                <CardDescription>Available 24/7</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Start Chat</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Email Support</CardTitle>
                <CardDescription>Response in 24 hours</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">support@tradepro.com</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Phone Support</CardTitle>
                <CardDescription>Mon-Fri, 9AM-6PM</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">1-800-TRADEPRO</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Submit a Ticket</CardTitle>
            <CardDescription>We'll respond within 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Brief description of your issue" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Please describe your issue in detail..."
                  className="min-h-32"
                  required
                />
              </div>
              <Button type="submit" className="w-full">Submit Ticket</Button>
            </form>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileQuestion className="h-5 w-5" />
              <CardTitle>Frequently Asked Questions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* Resources */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Learning Resources</CardTitle>
          <CardDescription>Explore our guides and tutorials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto flex-col items-start p-4 gap-2">
              <Book className="h-5 w-5" />
              <div className="text-left">
                <p className="font-medium">Trading Guide</p>
                <p className="text-xs text-muted-foreground">Learn the basics</p>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
            <Button variant="outline" className="h-auto flex-col items-start p-4 gap-2">
              <Video className="h-5 w-5" />
              <div className="text-left">
                <p className="font-medium">Video Tutorials</p>
                <p className="text-xs text-muted-foreground">Step-by-step guides</p>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
            <Button variant="outline" className="h-auto flex-col items-start p-4 gap-2">
              <FileQuestion className="h-5 w-5" />
              <div className="text-left">
                <p className="font-medium">Help Center</p>
                <p className="text-xs text-muted-foreground">Browse all articles</p>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
