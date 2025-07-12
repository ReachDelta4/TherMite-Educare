import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Bot, BookOpen, Sparkles, KeyRound, BarChartHorizontalBig, Send, Users, Paintbrush, Cpu, ArrowRight, Mail, Phone, Clock, TrendingUp, Shield, Star, CheckCircle, AlertTriangle, Heart,
  FileText, PieChart, MessageSquare, Workflow, Lock, Database, BarChart4, FileBarChart
} from "lucide-react";
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const FeatureCard = ({ icon, title, description, badge, impact }: { icon: React.ElementType, title: string, description: string, badge?: string, impact?: string }) => (
  <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card/90 to-card/60 flex flex-col border-2 border-transparent hover:border-primary/50 h-full relative overflow-hidden">
    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
    <CardHeader className="relative">
      <div className="flex items-center justify-between">
        <div className="bg-gradient-to-br from-primary/15 to-primary/5 p-3 rounded-xl">
          {React.createElement(icon, { className: "w-7 h-7 text-primary" })}
        </div>
        {badge && <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 font-medium">{badge}</Badge>}
      </div>
      <CardTitle className="pt-4 text-xl font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow relative">
      <p className="text-muted-foreground mb-4">{description}</p>
      {impact && (
        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-sm font-medium text-green-700 dark:text-green-300">✨ {impact}</p>
        </div>
      )}
    </CardContent>
  </Card>
);

export const OverviewPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 bg-background">
      {/* Hero Section */}
      <header className="text-center mb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-primary/3 rounded-2xl"></div>
        <div className="relative z-10 py-8">
          <Badge className="mb-4 bg-gradient-to-r from-accent/90 to-accent/80 text-white border-accent/20 px-4 py-2 text-sm hover:from-accent hover:to-accent/90 transition-all duration-300">
            <Heart className="w-4 h-4 mr-2" />
            Made with love for TherMite Educare
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Hey <span className="text-accent">Barath Anthony</span>,<br />
            We Built This For You
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We know you're juggling thousands of leads in Google Sheets. We know your team is drowning in manual certificate work. We know you're losing sleep over processes that should be automatic by now.
          </p>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            So we built something that actually gets it. Something that feels like it was made just for TherMite Educare. Because it was.
          </p>
        </div>
      </header>
      
      {/* Pain Point Section */}
      <section className="mb-16">
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 border-orange-200 dark:border-orange-800 text-center p-8">
          <CardTitle className="text-2xl text-orange-800 dark:text-orange-200 mb-4">
            <AlertTriangle className="inline mr-2 h-6 w-6" />
            We Get It, Barath
          </CardTitle>
          <CardContent className="pt-4">
            <p className="text-orange-700 dark:text-orange-300 text-lg max-w-4xl mx-auto leading-relaxed">
              Right now, someone on your team is probably copying data from one Google Sheet to another. Someone else is manually typing names into certificate templates. And you're thinking about all those leads you can't even reach because there just aren't enough hours in the day.
            </p>
            <p className="text-orange-700 dark:text-orange-300 text-lg max-w-4xl mx-auto mt-4 leading-relaxed">
              <strong>This isn't how a company like TherMite Educare should be running.</strong> You deserve systems that work as hard as you do.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Solution Reveal */}
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 px-4 py-2 text-sm">
          ✨ Your Solution Is Here
        </Badge>
        <h2 className="text-3xl font-bold mb-4">
          Three Things That Will Change Everything
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          We focused on the three biggest headaches you face every single day. Here's how we're going to fix them.
        </p>
      </div>

      {/* Main Solutions */}
      <section className="mb-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <FeatureCard 
          icon={Bot}
          title="Your WhatsApp Lead Catcher"
          description="Never let another lead slip through the cracks. This smart bot talks to prospects 24/7, asks the right questions, and makes sure every single person who shows interest gets the attention they deserve. Plus, we'll help you get that green tick verification so parents know you're the real deal."
          badge="No More Lost Leads"
          impact="Every lead that comes in gets handled, even at 2 AM"
        />
        <FeatureCard 
          icon={BookOpen}
          title="The Certificate Magic Machine"
          description="Remember spending hours creating certificates one by one? Those days are over. Design your template once, and watch this system create beautiful, personalized certificates for entire batches in seconds. It even sends them out automatically."
          badge="Time Saver"
          impact="What takes your team 4 hours now happens in 30 seconds"
        />
        <FeatureCard 
          icon={Sparkles}
          title="Your AI Calling Assistant"
          description="Imagine having someone who never gets tired, never forgets to follow up, and always says exactly what you want them to say. This AI assistant handles welcome calls, follow-ups, and basic questions so your team can focus on what they do best."
          badge="Scale Without Stress"
          impact="Handle 10x more calls without hiring anyone new"
        />
      </section>

      {/* Emotional Connection */}
      <section className="mb-16">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200 dark:border-green-800 p-8 text-center">
          <CardTitle className="text-2xl mb-4">Why This Matters</CardTitle>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            You started TherMite Educare to change lives through education. But instead of focusing on creating amazing courses, you're stuck managing spreadsheets and manual processes. This system gives you your time back so you can do what you love: teaching and growing your business.
          </p>
        </Card>
      </section>

      <Separator className="my-16" />

      {/* Comprehensive Features */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-4">
          Everything Else You Need
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-12">
          Beyond the big three, we've thought of all the little things that make your day easier.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Workflow}
            title="Visual WhatsApp Flow Builder"
            description="Design complex conversation flows with our drag-and-drop builder. Create branching paths, decision points, and personalized responses without writing a single line of code."
          />
          <FeatureCard 
            icon={MessageSquare}
            title="AI Call Script Builder"
            description="Create intelligent call scripts that adapt to customer responses. Our AI helps craft the perfect script based on your best sales calls, ensuring consistency across your team."
            badge="AI Powered"
          />
          <FeatureCard 
            icon={Lock}
            title="Role-Based Access Control"
            description="Protect sensitive information with granular permissions. Assign specific roles to team members and control exactly what they can see and do within the system."
          />
          <FeatureCard 
            icon={Clock}
            title="Scheduled Reports Delivery"
            description="Get critical business insights delivered automatically to your WhatsApp and email inbox. Morning briefings, weekly summaries, and custom reports sent right when you need them."
          />
          <FeatureCard 
            icon={FileBarChart}
            title="Advanced MIS Reporting"
            description="Make better business decisions with comprehensive analytics. Track conversion rates, student progress, revenue forecasts, and more in easy-to-understand visualizations."
          />
          <FeatureCard 
            icon={Database}
            title="Central Management System"
            description="Say goodbye to scattered spreadsheets. All your data lives in one secure place, accessible to the right people at the right time. Your entire business operation, centralized."
          />
          <FeatureCard 
            icon={KeyRound}
            title="Smart Access Control"
            description="Give your team exactly the access they need, nothing more, nothing less. New intern? They see what they need to see. Senior manager? They get the full picture. You stay in complete control."
          />
          <FeatureCard 
            icon={BarChartHorizontalBig}
            title="Reports That Actually Help"
            description="Forget confusing spreadsheets. Get clear, simple reports that tell you exactly what's working and what isn't. Which courses are popular? Where are leads coming from? You'll know."
          />
          <FeatureCard 
            icon={Send}
            title="Morning Briefings"
            description="Start each day knowing exactly where things stand. Important updates delivered right to your WhatsApp every morning. No hunting through systems for the numbers you need."
          />
          <FeatureCard 
            icon={Users}
            title="WhatsApp Command Center"
            description="All your WhatsApp communications in one place. Send announcements, run campaigns, follow up with leads. Everything organized and trackable."
          />
          <FeatureCard 
            icon={Paintbrush}
            title="Certificate Designer"
            description="Create certificates that look as professional as your courses. Full design control means every certificate reflects the quality TherMite Educare is known for."
          />
          <FeatureCard 
            icon={Cpu}
            title="Your Personal Dashboard"
            description="One screen that shows you everything that matters. No more jumping between different systems. Just open this and see your entire business at a glance."
          />
        </div>
      </section>

      {/* The Offer */}
      <Card className="mt-12 text-center bg-gradient-to-br from-primary/5 via-primary/3 to-emerald-500/5 border-2 border-primary/20 shadow-lg relative overflow-hidden">
        <CardHeader className="pb-4">
          <Badge className="mb-4 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-200 px-4 py-2 text-sm mx-auto">
            🏆 This Is Different
          </Badge>
          <CardTitle className="text-3xl font-bold mb-4">
            You Don't Rent This. You Own It.
          </CardTitle>
          <CardDescription className="pt-2 text-xl text-muted-foreground">
            One payment. Yours forever.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center justify-center space-x-2 bg-background/70 p-4 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">Complete Source Code</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-background/70 p-4 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">100% Ownership</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-background/70 p-4 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">No Monthly Fees</span>
            </div>
          </div>
          
          <p className="text-muted-foreground max-w-4xl mx-auto text-lg leading-relaxed">
            <strong className="text-foreground">Here's what makes this special:</strong> We're not trying to trap you in a subscription. We want to give you something that's actually yours. Pay once, own it forever. Install it on your servers. Modify it however you want. It's your business asset, not our recurring revenue.
          </p>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800 mb-6">
            <p className="text-green-700 dark:text-green-300 text-lg">
              <strong>Think about it:</strong> While other companies are paying monthly fees forever, you'll own your growth engine. While they're stuck with vendor limitations, you'll have complete freedom to grow and change as you need.
            </p>
          </div>
          
          <div className="pt-6">
            <Button size="lg" className="bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-lg px-8">
              Let's Talk About Making This Happen <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Personal Touch Footer */}
      <footer className="text-center mt-16 pt-8 border-t">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">A Note from Our Team</h3>
          <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
            We're not a big corporation trying to sell you something you don't need. We're a small team that believes in building things the right way. When we heard about TherMite Educare's challenges, we knew we had to help.
          </p>
          
          <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-xl mb-6">
            <p className="text-lg font-semibold text-primary mb-2">Built with care by</p>
            <p className="text-xl font-bold text-foreground">Dikshith Podhila</p>
            <p className="text-muted-foreground mb-2">Lead Engineer & Founder, Delta IV Team</p>
          </div>
          
          <div className="flex justify-center items-center gap-8 text-muted-foreground">
            <a href="mailto:dikshith2004@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors text-lg">
              <Mail className="h-5 w-5" />
              dikshith2004@gmail.com
            </a>
            <span className="flex items-center gap-2 text-lg">
              <Phone className="h-5 w-5" />
              +91 9515131859
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OverviewPage;