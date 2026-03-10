import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Send, Phone, HelpCircle, AlertTriangle, ChevronRight, Clock, ExternalLink } from "lucide-react";

const helpTopics = [
  "Balance/Billing Inquiry",
  "Electric Service Inquiry",
  "Electric Vehicle Program Inquiry",
  "Energy Efficiency Inquiry",
  "Gas Service Inquiry",
  "Life Sustaining Medical Equipment Inquiry",
  "Meter Inquiry (including AMI or MyMeter)",
  "Payment Assistance Inquiry",
  "Payment Inquiry",
  "Power Outage Inquiry",
  "Start/Stop/Transfer Service Inquiry",
  "Tree-Trimming Inquiry",
  "Website Assistance",
  "WorryFree Inquiry",
];

const departmentContacts = [
  {
    category: "Outages & Emergencies",
    contacts: [
      { name: "Safety Issues", phone: "1-800-436-7734", altPhone: "1-800-880-7734", altPhoneLabel: "Emergency Line", hours: "Available 24/7", description: "Report downed power lines, gas leaks, and other urgent safety-related issues." },
      { name: "No Heat", phone: "1-800-436-7734", hours: "Available 24/7", description: "Schedule a 'No Heat' appointment. A representative may ask you to check the emergency switch on your furnace, pilot light, and/or thermostat." },
      { name: "Power Outage", phone: "1-800-436-7734", hours: "Available 24/7", description: "Report an outage or check on the status of power restoration through My Account or by phone." },
      { name: "Streetlight Out", phone: "1-800-436-7734", hours: "", description: "Report a broken streetlight through My Account or by phone." },
      { name: "Trees Threatening Power Lines", phone: "", hours: "", description: "Get schedules, details, and contact information regarding PSE&G's tree trimming and vegetation management program." },
    ],
  },
  {
    category: "Billing",
    contacts: [
      { name: "Billing Issues or Questions", phone: "1-800-436-7734", hours: "Representatives: Mon-Fri, 7:00 AM - 8:00 PM", description: "Inquire about your bill, make payments, or view current and previous bills online via My Account (24/7)." },
      { name: "Trouble Paying Your Bill", phone: "1-800-357-2262", hours: "Representatives: Mon-Fri, 7:30 AM - 8:00 PM", description: "Make payment arrangements or speak to a representative about a past due bill or shut-off notice." },
      { name: "Moving In, Away, or Transferring Service", phone: "1-800-436-7734", hours: "Automated 24/7 | Representatives: Mon-Fri, 7:00 AM - 8:00 PM", description: "Start, stop, or transfer service or submit a change of address via My Account or by phone." },
      { name: "Meter Reading", phone: "1-800-436-7734", hours: "", description: "Submit a meter reading through My Account or by phone." },
      { name: "Customer Service Center Locations", phone: "", hours: "", description: "Get locations and hours of operation of PSE&G Customer Service Centers." },
      { name: "Scams, Fraud & Imposters", phone: "1-800-436-7734", hours: "", description: "Contact PSE&G if you have doubts about the legitimacy of calls, emails, or visits from individuals claiming to be PSE&G employees. If there is an emergency or crime in progress, dial 911." },
    ],
  },
  {
    category: "WorryFree Repairs & Protection",
    contacts: [
      { name: "WorryFree Appliance Repair", phone: "1-800-350-7734", hours: "Available anytime", description: "Schedule an appointment through My Account for the repair of gas or electric equipment including heating, cooling, and household appliances." },
      { name: "WorryFree Protection Plans", phone: "1-800-350-7734", hours: "", description: "Sign up through My Account for WorryFree Appliance Service Contracts or ask about your existing WorryFree coverage." },
      { name: "WorryFree Replacement Services", phone: "1-800-539-7734", hours: "", description: "Replace your A/C system, gas furnace, gas boiler, or water heater." },
    ],
  },
  {
    category: "Business & Construction",
    contacts: [
      { name: "Business Solutions Center", phone: "1-855-249-7734", hours: "Representatives: Mon-Fri, 8:00 AM - 5:30 PM (Closed holidays)", description: "PSE&G business customers can contact our Business Solutions Center for energy needs." },
      { name: "Service Upgrades & Installations", phone: "1-800-722-0256", hours: "Representatives: Mon-Fri, 7:00 AM - 3:00 PM (Closed holidays)", description: "Apply for service upgrades and new installations." },
      { name: "Residential & Commercial Demolition", phone: "1-800-817-3366", hours: "Representatives: Mon-Fri, 7:00 AM - 3:00 PM (Closed holidays)", description: "Call before demolishing a building, home, garage, or commercial building to have electric and/or gas removed." },
    ],
  },
  {
    category: "Company Information & Feedback",
    contacts: [
      { name: "Claims for Loss or Injury", phone: "", hours: "", description: "Submit a property damage or personal injury claim." },
      { name: "New Jersey Energy Choice", phone: "1-800-706-7734", hours: "", description: "Learn about electric and gas deregulation in New Jersey." },
    ],
  },
];

const faqCategories = [
  {
    category: "My Service and Bill",
    questions: [
      { q: "How do I transfer my service to my new home?", a: "To transfer service to another property in our service area, you must stop service at your current address and start it at your new address. Please visit our Start, Stop, or Transfer Service page." },
      { q: "How can I pay my bill on time, every time?", a: "Sign up for our free MyAlerts service. You'll receive a text and/or email reminder if there's a payment due so there's no need to leave paper clutter around as a reminder." },
      { q: "How can I view a pdf version of my bill?", a: "You can download your current bill or any of your previous 15 bills on the My Bill page in My Account." },
      { q: "Where can I find more information about my usage?", a: "You can better understand your usage by viewing your energy usage graph in My Account. Not only can you see how much energy you are using on a daily and monthly basis, but you can also see how much your usage costs." },
      { q: "What is in the transaction history?", a: "The transaction history shows past billing statements, payments that have been posted, and recurring charges like Equal Payment Plan, Deferred Payment Arrangements, or WorryFree Plans (if any)." },
      { q: "Where can I view a breakdown of my current charges?", a: "There is a pie chart on the My Bill page in My Account that displays delivery and supply charges for gas and electric as well as WorryFree charges. These charges total the current charges displayed on your bill." },
      { q: "How do I cancel a scheduled payment?", a: 'You can cancel a scheduled payment by visiting our Bill Details page and clicking "Need to cancel this payment?" link. You can also visit our Billing & Payment History page and expand the scheduled payment for more details. Then proceed to cancel by clicking on the Cancel Payment button.' },
      { q: "How do I pay my bill in multiple installments?", a: "For eligible accounts that have a past due balance, you can use our Deferred Payment Arrangement (DPA) to catch up over an agreed-upon-period of several months. To see if you're eligible, call us at 1-800-357-2262 or visit the My Bill page." },
      { q: "What's the difference between Supply and Delivery?", a: "Supply charges refer to the cost of gas or electric supplied by PSE&G. Delivery charges refer to the cost of delivering gas or electric to our customer." },
      { q: "How is electric usage calculated?", a: "Electric usage is calculated by taking the difference between your current month's meter read and previous month's meter read. PSE&G charges for the electric you use in kilowatt hours (kWh). One (1) kilowatt is equal to 1,000 watts." },
      { q: "How is gas usage calculated?", a: "Gas usage is calculated by measuring the amount of therms you use each month. PSE&G measures the volume of gas you use in cubic feet (CCF) by taking the difference between your current month's meter read and previous month's meter read, and then converts it to therms." },
    ],
  },
  {
    category: "Changes to Name on Account",
    questions: [
      { q: "Can I change the name on my account?", a: "Yes, if you were recently married, divorced, or had a legal name change, you can change the name on your account." },
      { q: "How do I change the name on my account?", a: "To request a name change on your account, please contact our Customer Service department at 800-436-7734. A PSE&G representative will provide you with an email address to send your documentation to and will follow up with you when the request is complete." },
      { q: "What documentation is required to change the name on my account?", a: "One of the following documents is required: civil marriage, domestic partnership, or civil union certificate; order of a decree of dissolution or termination (i.e. divorce); court order for legal name change; current Digital New Jersey driver's license; current Digital NJ MVC issued Non-Driver ID; current US Passport; current alien registration card (with photo); or Certificate of Naturalization or Citizenship (with photo)." },
      { q: "What if my spouse has passed away?", a: "A death certificate may be required for the name change on account." },
      { q: "What if I wanted to change the name on my account for another reason?", a: "If a name change is needed and does not qualify for any of the reasons previously listed, a new account must be created under the new desired name." },
    ],
  },
  {
    category: "Paperless Billing",
    questions: [
      { q: "What if I don't like Paperless Billing?", a: "You can discontinue Paperless Billing at any time." },
      { q: "Is there a cost to use Paperless Billing?", a: "There is no cost for Paperless Billing." },
      { q: "Can I still print out my bills?", a: "Sure. You'll still be able to download and print your paper bills. The only thing that changes is that you won't receive a bill in the mail." },
      { q: "What are the benefits of Paperless Billing?", a: "Instead of a paper bill in the mail, you'll get a monthly email notification with your bill amount and due date. The email will include a link that will allow you to view your bill in its entirety." },
      { q: "When will my paper bill stop?", a: "Your paper bill will stop right away, but if you enrolled very close to your bill date, you could receive one more bill in the mail." },
      { q: "How do I change my email address?", a: "To change the email address where you receive your email notifications, edit your contact information under My Profile." },
      { q: "Can I cancel Paperless Billing?", a: "Yes. You can cancel Paperless Billing at any time by using the toggle switch to turn OFF Paperless Billing." },
      { q: "How can I make sure I don't forget about the bill?", a: "Sign up for our free MyAlerts service. You'll receive a text and/or email reminder if there's a payment due so there's no need to leave paper clutter around as a reminder." },
    ],
  },
  {
    category: "Automatic Bill Pay",
    questions: [
      { q: "How do I enroll in Automatic Bill Pay?", a: "You can visit our Automatic Bill Pay page or visit My Profile to sign up. You need to have an eligible checking or savings account on file in order to complete your sign up." },
      { q: "How much does it cost to enroll in Automatic Bill Pay?", a: "It is free to use Automatic Bill Pay." },
      { q: "What if I don't have enough money in my account to cover my bill?", a: "You can pre-select maximum monthly withdrawal limits to avoid possible overdrafts." },
      { q: "What information do I need to sign up?", a: "You will need your bank's routing number and your bank account number." },
      { q: "When is my bill paid?", a: "Your bill amount is deducted from your checking or savings account on your billing due date so you never have to worry about late payments again." },
      { q: "What if I want to stop automatic payments?", a: "You can change your preferences at any time and resume manual payments by going to your My Profile page." },
    ],
  },
  {
    category: "Equal Payment Plan",
    questions: [
      { q: "What is the Equal Payment Plan?", a: "The Equal Payment Plan (EPP) allows you to spread your energy costs over 12 months so you pay about the same amount each month." },
      { q: "When should I provide a meter reading?", a: "If your meter cannot be read by our meter readers, you will be sent a card asking you to read your own meter and submit the reading. You can submit your reading through My Account or by phone." },
    ],
  },
  {
    category: "Energy Choice - Customers",
    questions: [
      { q: "Does switching energy suppliers mean I'll be done with PSE&G entirely?", a: "No. PSE&G will continue to deliver your energy, maintain the wires and pipes, respond to outages, and provide customer service. You will still receive one bill from PSE&G." },
    ],
  },
  {
    category: "Energy Choice - Third-Party Suppliers",
    questions: [
      { q: "How can a TPS obtain historical usage data for a customer?", a: "There are a number of strong consumer protections built into New Jersey energy restructuring. If you feel you have been slammed or have questions about a supplier's license, contact the New Jersey Board of Public Utilities." },
    ],
  },
  {
    category: "WorryFree",
    questions: [
      { q: "How do I sign up for WorryFree?", a: "You can sign up for WorryFree Protection Plans through My Account or by calling 1-800-350-7734." },
      { q: "How do I schedule an appointment for an appliance that needs repair?", a: "Go to My Appointments in your My Account dashboard to schedule a repair appointment." },
      { q: "What do I need to do to prepare for my appointment?", a: "Inform your technician of unusual situations (e.g. loose steps/railings). Make sure walkways are clear of obstructions including snow and debris. Secure all pets outdoors or away from the work area. Ensure safe, unobstructed access to the appliance being serviced, and make sure the area is dry, clear, and well lit." },
      { q: "Can I use one WorryFree plan for all of my appliances?", a: "No, you must enroll each appliance or system separately." },
      { q: "Which appliances are covered?", a: "WorryFree Protection Plans cover: Gas Furnaces/Boilers, Central Air Conditioning, Gas and Electric Water Heaters, Refrigerators, Gas and Electric Ranges/Stoves, Freezers, Cooktops, Wall Ovens, Dishwashers, Washing Machines, Gas and Electric Dryers, Natural Gas Grills, Gas Pool Heaters, Gas Fireplaces, Heat Pumps, and Ductless Heating and Cooling Systems." },
      { q: "What's the difference between WorryFree Repair, Protection, and Replacement Services?", a: "WorryFree Repair Services cover heating, cooling, and appliance repairs — you can make an appointment 24/7. WorryFree Protection Plans let you pay one low monthly fee for repairs with no surprise costs. WorryFree Replacement and Installation helps you choose, install, and dispose of old equipment when it's time for a replacement." },
      { q: "Will I get priority repair service if I have a WorryFree Protection Plan?", a: "No, each appointment is scheduled on a first-come, first-serve basis." },
      { q: "What does PSE&G service?", a: "Our technicians repair: Gas Furnaces/Boilers, Central Air Conditioning, Gas and Electric Water Heaters, Refrigerators, Gas and Electric Ranges/Stoves, Dishwashers, Washing Machines, Gas and Electric Dryers, Natural Gas Grills, Gas Pool Heaters, Gas Outdoor Lamps, Gas Fireplaces, Gas Space Heaters, Heat Pumps, and Ductless Heating and Cooling Systems." },
      { q: "How will I be billed for my WorryFree Plan?", a: "Your PSE&G bill will include the low monthly fee for the plan you've chosen. Plans start at just pennies a day." },
    ],
  },
  {
    category: "MyAlerts",
    questions: [
      { q: "When will I get my first alert?", a: "The timing of your first alert is based on when you registered and your billing cycle. Please allow up to one billing cycle to start receiving alerts." },
      { q: "Can I cancel a payment by text?", a: "No. If the status of a payment is pending, you can cancel it in My Account or by speaking with a PSE&G representative. Call 1-800-436-PSEG (7734)." },
      { q: "How do I manage my communication preferences?", a: "Once registered, you can log in to My Account to manage all of your communication preferences. Choose to receive notifications via email and/or text message, set up Do Not Disturb preferences, add multiple contacts to a single PSE&G account, and add multiple PSE&G accounts to a single mobile phone number or email address." },
      { q: "What is Do Not Disturb?", a: "This setting allows you to suspend alerts during certain times (for example, during your regular commute). Just select a start time and an end time. Each mobile number or email address can have a separate setting. Billing and payment alerts are only sent from 9 a.m. to 5 p.m. You can override Do Not Disturb for power outage alerts." },
      { q: "How do I opt-out of receiving all alerts?", a: "You have two options: Through My Account — toggle the On/Off switch for each alert, or click the trashcan icon to delete a phone number or email address. By phone — text STOP to 4PSEG (47734) from the registered phone." },
      { q: "How much does MyAlerts cost?", a: "MyAlerts is offered at no charge by PSE&G. However, your mobile phone provider may bill you for text messages received and sent with this service. PSE&G is not responsible for these charges." },
      { q: "Can PSE&G guarantee delivery of text messages?", a: "PSE&G cannot guarantee delivery of text messages. Your mobile phone wireless carrier is responsible for delivering text messages. Delivery may be limited by your mobile phone plan or carrier's coverage area. From time to time, MyAlerts may be unavailable." },
      { q: "What if my mobile phone number changes?", a: "Opt out of MyAlerts from your old phone number, then follow the registration instructions to set up MyAlerts for your new phone number." },
      { q: "Can my spouse and I both get alerts about our home's PSE&G account?", a: "Yes, for any of your accounts, you can enroll as many different phone numbers or email addresses as you'd like." },
      { q: "I have multiple accounts. Can I receive alerts for more than one account?", a: "Yes, you can register all of your accounts for MyAlerts. You can add a nickname to each account (such as Home, Mom, LakeHouse) to make it easy to keep track. After registering, text NICK to 4PSEG (47734) to create a nickname." },
      { q: "Can I report a power outage for my neighbor via text?", a: "No. You can only report a power outage via text for the locations associated with your mobile phone. Your neighbor can register by texting REG to 4PSEG (47734)." },
      { q: "I texted OUT to 4PSEG (47734), but I have power. Now what?", a: "Please let us know by calling 1-800-436-7734. We'll cancel it." },
      { q: "What happens during widespread outage situations?", a: "MyAlerts is intended for use during normal weather and operating conditions. During widespread outages or emergency situations (hurricanes, ice storms, etc.), PSE&G focuses on power restoration. MyAlerts messages may be limited, delayed, or both." },
      { q: "How exact are the power restoration times provided?", a: "Power restoration times are only estimates based on the best information available at the time. We generally know how long different types of outages take to restore, but each may have unique circumstances." },
      { q: "Can I be alerted when my payment is posted or confirmed?", a: "Yes. Click on My Profile under the My Account tab. Select your account, proceed to the Payment Posted alert, then click Add a Contact and fill in the corresponding fields (phone number or email address) and click Save Changes." },
      { q: "When I receive a Payment Posted message, can a payment still be returned?", a: "Yes. A Payment Posted message simply means PSE&G has received your payment and applied it to your account. The payment could still be returned by the financial institution, in which case you will receive a call to the phone number on file." },
      { q: "What is a payment reminder?", a: "A payment reminder is a text and/or email sent five days prior to your PSE&G bill due date. If your balance is paid in full, you will not receive a message. If you're enrolled in Automatic Bill Pay, the alert will remind you that a payment is scheduled." },
      { q: "What if I received a text saying my power was restored, but my lights are still out?", a: "First check your circuit breaker box for any breakers in the OFF position and flip them ON. If power is still not restored, text OUT to 4PSEG (47734) to report the outage again. There may be additional damage at your location. If you see downed wires or damaged poles, call 1-800-436-7734." },
      { q: "What are the supported cell carriers for MyAlerts?", a: "Major carriers include AT&T, Verizon Wireless, Sprint, T-Mobile, U.S. Cellular, Alltel, Boost Mobile, and Virgin Mobile. Many minor carriers are also supported." },
    ],
  },
  {
    category: "My Profile",
    questions: [
      { q: "I forgot my password. How do I log in?", a: "Click on the Forgot Username/Password link underneath the login box to reset your password by email or by security questions." },
      { q: "How can I change my password?", a: "Visit the My Profile page, and click on the drop down for Log In Setting and proceed to change your password there. You can also reset your password by clicking the Forgot Username/Password link underneath the login box." },
      { q: "What Is A Landlord Account?", a: "The purpose of a Landlord Account is to ease the transition of utility billing between tenants. When a tenant moves out, the account is transferred from that tenant's name into the landlord's. When a new tenant moves in, the account is then transferred from the landlord's name to the new tenant's." },
    ],
  },
  {
    category: "My Meter Readings",
    questions: [
      { q: "When should I provide a meter reading?", a: "If your meter cannot be read by our meter readers, you will be sent a card asking you to read your own meter and submit the reading. You can submit your reading through My Account or by phone." },
    ],
  },
];

function ContactForm() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    language: "english",
    accountType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    accountNumber: "",
    helpTopic: "",
    subject: "",
    comments: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.accountType || !formData.helpTopic) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to submit");
      toast({ title: "Request submitted", description: "Our team will respond to your inquiry shortly." });
      setFormData({ language: "english", accountType: "", firstName: "", lastName: "", email: "", phone: "", accountNumber: "", helpTopic: "", subject: "", comments: "" });
    } catch {
      toast({ title: "Error", description: "Failed to submit request. Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-foreground mb-2" data-testid="heading-contact-form">Contact Customer Service</h2>
      <p className="text-muted-foreground mb-6">Fill out the form below and our team will respond to your inquiry.</p>

      <div className="bg-amber-50 border border-amber-200 p-4 mb-6" data-testid="card-safety-warning">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm space-y-2">
            <p className="font-semibold text-amber-800">This form is for non-emergency purposes only.</p>
            <p className="text-amber-700">If your request is time sensitive, please call <strong>1-800-436-7734</strong>.</p>
            <p className="text-amber-700">If you smell natural gas, <strong>DO NOT submit this form</strong>. Evacuate immediately, call 911, then call PSE&G at <strong>1-800-880-7734</strong>.</p>
            <p className="text-amber-700">Report a power outage by texting <strong>OUT</strong> to <strong>4PSEG (47734)</strong> or calling <strong>1-800-436-7734</strong>.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-contact">
        <div>
          <Label>Language Preference</Label>
          <Select value={formData.language} onValueChange={v => updateField("language", v)}>
            <SelectTrigger data-testid="select-language"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Account Type <span className="text-red-500">*</span></Label>
          <Select value={formData.accountType} onValueChange={v => updateField("accountType", v)} required>
            <SelectTrigger data-testid="select-account-type"><SelectValue placeholder="Please select" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>First Name <span className="text-red-500">*</span></Label>
            <Input value={formData.firstName} onChange={e => updateField("firstName", e.target.value)} required data-testid="input-first-name" />
          </div>
          <div>
            <Label>Last Name <span className="text-red-500">*</span></Label>
            <Input value={formData.lastName} onChange={e => updateField("lastName", e.target.value)} required data-testid="input-last-name" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Email Address <span className="text-red-500">*</span></Label>
            <Input type="email" value={formData.email} onChange={e => updateField("email", e.target.value)} required data-testid="input-email" />
          </div>
          <div>
            <Label>Phone <span className="text-red-500">*</span></Label>
            <Input type="tel" value={formData.phone} onChange={e => updateField("phone", e.target.value)} required data-testid="input-phone" />
          </div>
        </div>

        <div>
          <Label>Account Number</Label>
          <Input value={formData.accountNumber} onChange={e => updateField("accountNumber", e.target.value)} data-testid="input-account-number" />
        </div>

        <div>
          <Label>I need help with <span className="text-red-500">*</span></Label>
          <Select value={formData.helpTopic} onValueChange={v => updateField("helpTopic", v)} required>
            <SelectTrigger data-testid="select-help-topic"><SelectValue placeholder="Please select" /></SelectTrigger>
            <SelectContent>
              {helpTopics.map(topic => (
                <SelectItem key={topic} value={topic}>{topic}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Subject <span className="text-red-500">*</span></Label>
          <Input value={formData.subject} onChange={e => updateField("subject", e.target.value)} required data-testid="input-subject" />
        </div>

        <div>
          <Label>Comments <span className="text-red-500">*</span></Label>
          <Textarea value={formData.comments} onChange={e => updateField("comments", e.target.value)} required rows={5} data-testid="input-comments" />
        </div>

        <p className="text-sm text-muted-foreground">All fields marked with an asterisk (<span className="text-red-500">*</span>) are required.</p>

        <Button type="submit" disabled={submitting} className="bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white" data-testid="button-submit-request">
          <Send className="w-4 h-4 mr-2" />
          {submitting ? "Submitting..." : "Submit Request"}
        </Button>
      </form>
    </div>
  );
}

function DepartmentContacts() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Outages & Emergencies");

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-foreground mb-2" data-testid="heading-departments">Department Contacts</h2>
      <p className="text-muted-foreground mb-6">Find the right department for your needs.</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {departmentContacts.map(dept => (
          <Button
            key={dept.category}
            variant={expandedCategory === dept.category ? "default" : "outline"}
            size="sm"
            onClick={() => setExpandedCategory(dept.category)}
            data-testid={`button-dept-category-${dept.category.replace(/\s+/g, "-").toLowerCase()}`}
          >
            {dept.category}
          </Button>
        ))}
      </div>

      {departmentContacts
        .filter(dept => dept.category === expandedCategory)
        .map(dept => (
          <div key={dept.category} className="space-y-3" data-testid={`section-dept-${dept.category.replace(/\s+/g, "-").toLowerCase()}`}>
            {dept.contacts.map((contact, idx) => (
              <div key={idx} className="bg-card border border-border/50 p-5 hover:shadow-sm transition-shadow" data-testid={`card-contact-${idx}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{contact.description}</p>
                    <div className="flex flex-wrap items-center gap-4">
                      {contact.phone && (
                        <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--brand-orange))] hover:underline">
                          <Phone className="w-3.5 h-3.5" />
                          {contact.phone}
                        </a>
                      )}
                      {"altPhone" in contact && (contact as any).altPhone && (
                        <a href={`tel:${(contact as any).altPhone}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:underline">
                          <Phone className="w-3.5 h-3.5" />
                          {(contact as any).altPhone} ({(contact as any).altPhoneLabel})
                        </a>
                      )}
                      {contact.hours && (
                        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          {contact.hours}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

function FAQSection() {
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].category);

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-foreground mb-2" data-testid="heading-faq">Frequently Asked Questions</h2>
      <p className="text-muted-foreground mb-6">Find answers to common questions about PSE&G services.</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {faqCategories.map(cat => (
          <Button
            key={cat.category}
            variant={activeCategory === cat.category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat.category)}
            data-testid={`button-faq-category-${cat.category.replace(/\s+/g, "-").toLowerCase()}`}
          >
            {cat.category}
          </Button>
        ))}
      </div>

      {faqCategories
        .filter(cat => cat.category === activeCategory)
        .map(cat => (
          <Accordion key={cat.category} type="single" collapsible className="bg-card border border-border/50" data-testid="accordion-faq">
            {cat.questions.map((item, idx) => (
              <AccordionItem key={idx} value={`q-${idx}`} className="border-b border-border/30 last:border-0">
                <AccordionTrigger className="px-5 text-left hover:no-underline" data-testid={`trigger-faq-${idx}`}>
                  <span className="text-sm font-medium">{item.q}</span>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4" data-testid={`content-faq-${idx}`}>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ))}

      <div className="bg-card border border-border/50 p-6 mt-6 text-center" data-testid="card-faq-help">
        <h3 className="font-heading text-lg font-bold text-foreground mb-2">Still need help?</h3>
        <p className="text-sm text-muted-foreground mb-4">For general questions, call us at 1-800-436-PSEG (7734).</p>
        <a href="tel:1-800-436-7734">
          <Button className="bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white">
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </Button>
        </a>
      </div>
    </div>
  );
}

export default function SupportCenter() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-3" data-testid="heading-support">How Can We Help You?</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Submit a request, find department contacts, or browse frequently asked questions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-auto">
              <TabsTrigger value="contact" className="py-3 text-sm font-medium" data-testid="tab-contact">
                <Send className="w-4 h-4 mr-2" />
                Submit Request
              </TabsTrigger>
              <TabsTrigger value="departments" className="py-3 text-sm font-medium" data-testid="tab-departments">
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </TabsTrigger>
              <TabsTrigger value="faq" className="py-3 text-sm font-medium" data-testid="tab-faq">
                <HelpCircle className="w-4 h-4 mr-2" />
                FAQ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contact" data-testid="content-contact">
              <div className="bg-card border border-border/50 p-6 md:p-8">
                <ContactForm />
              </div>
            </TabsContent>

            <TabsContent value="departments" data-testid="content-departments">
              <DepartmentContacts />
            </TabsContent>

            <TabsContent value="faq" data-testid="content-faq">
              <FAQSection />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
