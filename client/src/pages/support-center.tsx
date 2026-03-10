import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, MessageCircle, Phone, Mail } from "lucide-react";

export default function SupportCenter() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-6">Support Center</h1>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input className="pl-12 h-12 text-lg" placeholder="Search for answers (e.g., 'how to read bill')" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card p-6 rounded-none border text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Chat with Us</h3>
            <p className="text-sm text-muted-foreground mb-4">Available Mon-Fri, 7am-8pm</p>
            <Button variant="outline" className="w-full">Start Chat</Button>
          </div>
          
          <div className="bg-card p-6 rounded-none border text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Call Us</h3>
            <p className="text-sm text-muted-foreground mb-4">1-800-436-PSEG (7734)</p>
            <Button variant="outline" className="w-full">View Wait Times</Button>
          </div>

          <div className="bg-card p-6 rounded-none border text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-4">Response within 24 hours</p>
            <Button variant="outline" className="w-full">Send Message</Button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="bg-card rounded-none border px-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I report a power outage?</AccordionTrigger>
              <AccordionContent>
                You can report an outage online through our Outage Center, via our mobile app, or by texting OUT to 4PSEG (47734).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Where can I pay my bill in person?</AccordionTrigger>
              <AccordionContent>
                We have authorized payment centers located throughout our service territory. Use our Payment Center Locator to find one near you.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I apply for energy assistance?</AccordionTrigger>
              <AccordionContent>
                Visit our Payment Assistance page to learn about programs like LIHEAP, USF, and PAGE. You can check eligibility and apply directly online.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I change my due date?</AccordionTrigger>
              <AccordionContent>
                Yes, eligible customers can enroll in our Due Date Plan to choose a bill due date that works better for their budget. Log in to My Account to enroll.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
}
