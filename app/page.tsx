import Link from "next/link";
import { GitBranch, Users, Shield, Zap, Clock, Sparkles } from "lucide-react";
import { Logo, MootableIcon } from "@/shared/components/Logo";
import { WhiteRabbit, RedPill, BluePill, RabbitHole, PocketWatch, CheshireCatSmile, FallingCards } from "@/shared/components/ThematicIcons";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ink-950">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-radial-honey pointer-events-none" />
      <FallingCards className="opacity-40" />

      {/* Navigation */}
      <nav className="relative z-50 border-b border-ink-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Logo size="md" />
            
            <div className="flex items-center gap-6">
              <Link 
                href="/login" 
                className="text-ink-400 hover:text-ink-50 transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link href="/register" className="btn-primary group">
                <RedPill size={20} className="group-hover:animate-pill" />
                Take the Red Pill
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge with Rabbit */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-ink-900 border border-ink-800 mb-8 animate-fade-up">
              <WhiteRabbit size={24} className="animate-hop" />
              <span className="text-body-sm text-ink-300 italic">&quot;Follow the white rabbit...&quot;</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-display md:text-[5.5rem] font-display font-bold text-ink-50 mb-6 animate-fade-up animate-delay-100">
              How Deep Does the{" "}
              <span className="text-gradient text-glow">Rabbit Hole</span> Go?
            </h1>
            
            {/* Subheading - More thematic */}
            <p className="text-body-lg md:text-xl text-ink-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up animate-delay-200">
              A place for the curious. Where ideas are debated around the 
              <span className="text-honey-500"> Moot Table</span>, tangents lead to 
              <span className="text-honey-500"> Rabbit Holes</span>, and every conversation 
              is a journey down the looking glass.
            </p>

            {/* CTA Buttons - Pills Choice */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-up animate-delay-300">
              <Link href="/register" className="btn-primary text-lg px-8 py-4 group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  <RedPill size={24} />
                  Wake Up
                </span>
              </Link>
              <Link href="/login" className="btn-secondary text-lg px-8 py-4 group">
                <BluePill size={24} className="opacity-70 group-hover:opacity-100" />
                Stay in Wonderland
              </Link>
            </div>

            {/* Morpheus Quote */}
            <div className="mt-12 animate-fade-up animate-delay-400">
              <p className="text-body-sm text-ink-500 italic max-w-lg mx-auto">
                &quot;I&apos;m trying to free your mind. But I can only show you the door. 
                You&apos;re the one that has to walk through it.&quot;
              </p>
            </div>

            {/* Trust Indicators with Clock */}
            <div className="mt-16 pt-8 border-t border-ink-800/50 animate-fade-up animate-delay-500">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-honey-500 animate-tick" />
                <p className="text-caption text-ink-500 uppercase tracking-wider">
                  We&apos;re all mad here
                </p>
              </div>
              <div className="flex items-center justify-center gap-8 text-ink-600 flex-wrap">
                <div className="text-center">
                  <span className="text-h4 font-semibold text-honey-500">2,500+</span>
                  <p className="text-caption text-ink-500">Ships Sailing</p>
                </div>
                <span className="text-ink-700 hidden sm:block">•</span>
                <div className="text-center">
                  <span className="text-h4 font-semibold text-honey-500">50K+</span>
                  <p className="text-caption text-ink-500">Ideas Explored</p>
                </div>
                <span className="text-ink-700 hidden sm:block">•</span>
                <div className="text-center">
                  <span className="text-h4 font-semibold text-honey-500">∞</span>
                  <p className="text-caption text-ink-500">Rabbit Holes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-5">
          <MootableIcon size={600} />
        </div>
        
        {/* Decorative Pills */}
        <div className="absolute top-32 left-10 animate-pill opacity-30 hidden lg:block">
          <RedPill size={40} />
        </div>
        <div className="absolute top-48 right-16 animate-pill opacity-20 hidden lg:block" style={{ animationDelay: '1s' }}>
          <BluePill size={32} />
        </div>
        
        {/* Cheshire Smile */}
        <div className="absolute bottom-20 right-10 animate-cheshire hidden lg:block">
          <CheshireCatSmile size={120} />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 bg-ink-900/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <p className="text-overline text-honey-500 uppercase tracking-widest mb-4">
              &quot;Curiouser and curiouser!&quot;
            </p>
            <h2 className="text-h1 font-display font-bold text-ink-50 mb-4">
              Three Paths, <span className="text-honey-500">Infinite Possibilities</span>
            </h2>
            <p className="text-body-lg text-ink-400 max-w-2xl mx-auto">
              Every great journey needs structure. Here&apos;s how we organize the chaos of brilliant minds.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card group hover-glitch">
              <div className="w-14 h-14 rounded-xl bg-honey-500/10 flex items-center justify-center mb-6 group-hover:bg-honey-500/20 transition-colors relative">
                <Users className="w-7 h-7 text-honey-500" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <h3 className="text-h4 font-semibold text-ink-50 mb-3">Nebuchadnezzar</h3>
              <p className="text-caption text-honey-500/70 mb-2 italic">&quot;The ship. The last free vessel.&quot;</p>
              <p className="text-body text-ink-400 leading-relaxed">
                Your hovercraft in the digital Matrix. Build your crew, establish your 
                sanctuary. The real world awaits those who dare to unplug.
              </p>
            </div>

            <div className="card group hover-glitch">
              <div className="w-14 h-14 rounded-xl bg-honey-500/10 flex items-center justify-center mb-6 group-hover:bg-honey-500/20 transition-colors">
                <MootableIcon size={28} />
              </div>
              <h3 className="text-h4 font-semibold text-ink-50 mb-3">Moot Tables</h3>
              <p className="text-caption text-honey-500/70 mb-2 italic">&quot;Around the table, we are equals.&quot;</p>
              <p className="text-body text-ink-400 leading-relaxed">
                Like the Mad Hatter&apos;s tea party, but with purpose. Every seat has a voice, 
                every voice shapes the narrative. Pass the ideas, not just the tea.
              </p>
            </div>

            <div className="card group hover-glitch relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <RabbitHole size={200} className="absolute -right-10 -bottom-10 animate-spiral" />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-honey-500/10 flex items-center justify-center mb-6 group-hover:bg-honey-500/20 transition-colors">
                  <GitBranch className="w-7 h-7 text-honey-500" />
                </div>
                <h3 className="text-h4 font-semibold text-ink-50 mb-3">Rabbit Holes</h3>
                <p className="text-caption text-honey-500/70 mb-2 italic">&quot;Down, down, down...&quot;</p>
                <p className="text-body text-ink-400 leading-relaxed">
                  When curiosity strikes, follow it. Branch off into tangents without 
                  losing your way back. The best discoveries happen off the beaten path.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div>
              <p className="text-overline text-honey-500 uppercase tracking-widest mb-4">
                &quot;There is no spoon.&quot;
              </p>
              <h2 className="text-h1 font-display font-bold text-ink-50 mb-6">
                Unplug from the Ordinary,{" "}
                <span className="text-honey-500">Connect to Ideas</span>
              </h2>
              <p className="text-body-lg text-ink-400 mb-10">
                The Matrix is everywhere. It is all around us. But here, 
                you write your own code. Here, you shape reality.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ink-900 border-2 border-honey-500 text-honey-500 font-bold flex items-center justify-center group-hover:bg-honey-500 group-hover:text-ink-950 transition-all">
                    <RedPill size={20} />
                  </div>
                  <div>
                    <h4 className="text-h5 font-semibold text-ink-50 mb-1">Take the Red Pill</h4>
                    <p className="text-body text-ink-400">
                      Create your Nebuchadnezzar. Name it. Define its purpose. 
                      This is where your journey begins.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ink-900 border-2 border-honey-500 text-honey-500 font-bold flex items-center justify-center group-hover:bg-honey-500 group-hover:text-ink-950 transition-all">
                    <WhiteRabbit size={20} />
                  </div>
                  <div>
                    <h4 className="text-h5 font-semibold text-ink-50 mb-1">Follow the White Rabbit</h4>
                    <p className="text-body text-ink-400">
                      Invite fellow seekers. Share your unique portal link. 
                      Build a crew of curious minds.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ink-900 border-2 border-honey-500 text-honey-500 font-bold flex items-center justify-center group-hover:bg-honey-500 group-hover:text-ink-950 transition-all">
                    <RabbitHole size={20} />
                  </div>
                  <div>
                    <h4 className="text-h5 font-semibold text-ink-50 mb-1">Dive Down the Rabbit Hole</h4>
                    <p className="text-body text-ink-400">
                      Explore ideas without limits. Every tangent is a new adventure. 
                      Every conversation, a new wonderland.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-ink-900 border border-ink-800 p-8 flex items-center justify-center relative overflow-hidden">
                <MootableIcon size={280} className="animate-float relative z-10" />
                <div className="absolute inset-0 opacity-20">
                  <RabbitHole size={400} className="absolute -right-20 -bottom-20 animate-spiral" />
                </div>
              </div>
              {/* Pocket Watch */}
              <div className="absolute -top-6 -right-6 animate-tick hidden lg:block">
                <PocketWatch size={80} />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-honey-500/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-32 bg-ink-900/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-overline text-honey-500 uppercase tracking-widest mb-4">
              &quot;Free your mind.&quot;
            </p>
            <h2 className="text-h1 font-display font-bold text-ink-50 mb-4">
              Why the Curious Choose <span className="text-honey-500">Mootable</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 group">
              <div className="w-16 h-16 rounded-2xl bg-honey-500/10 flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                <Shield className="w-8 h-8 text-honey-500" />
              </div>
              <h3 className="text-h4 font-semibold text-ink-50 mb-2">The Oracle&apos;s Promise</h3>
              <p className="text-caption text-honey-500/70 italic mb-3">&quot;What happens here, stays here.&quot;</p>
              <p className="text-body text-ink-400">
                Your thoughts are sacred. End-to-end encryption ensures 
                even we can&apos;t read your conversations.
              </p>
            </div>

            <div className="text-center p-8 group">
              <div className="w-16 h-16 rounded-2xl bg-honey-500/10 flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                <Zap className="w-8 h-8 text-honey-500" />
              </div>
              <h3 className="text-h4 font-semibold text-ink-50 mb-2">Bullet Time</h3>
              <p className="text-caption text-honey-500/70 italic mb-3">&quot;Fast. Very fast.&quot;</p>
              <p className="text-body text-ink-400">
                Real-time sync faster than you can blink. 
                Your ideas travel at the speed of thought.
              </p>
            </div>

            <div className="text-center p-8 group">
              <div className="w-16 h-16 rounded-2xl bg-honey-500/10 flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                <Sparkles className="w-8 h-8 text-honey-500" />
              </div>
              <h3 className="text-h4 font-semibold text-ink-50 mb-2">Through the Looking Glass</h3>
              <p className="text-caption text-honey-500/70 italic mb-3">&quot;Things are not what they seem.&quot;</p>
              <p className="text-body text-ink-400">
                An interface that adapts to you. Dark, mysterious, 
                and surprisingly delightful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Rabbit Hole */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <RabbitHole size={800} className="animate-spiral" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <WhiteRabbit size={64} className="mx-auto mb-6 animate-hop" />
          <h2 className="text-h1 md:text-display font-display font-bold text-ink-50 mb-6">
            The Rabbit Hole <span className="text-gradient text-glow">Awaits</span>
          </h2>
          <p className="text-body-lg text-ink-400 mb-4 max-w-2xl mx-auto">
            &quot;You take the red pill... you stay in Wonderland, 
            and I show you how deep the rabbit hole goes.&quot;
          </p>
          <p className="text-body text-ink-500 mb-10 max-w-xl mx-auto">
            Join the curious, the thinkers, the ones who question everything. 
            Your seat at the Moot Table is waiting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="btn-primary text-lg px-10 py-4 group">
              <RedPill size={24} className="group-hover:animate-pill" />
              Enter Wonderland
            </Link>
          </div>
          <p className="mt-8 text-caption text-ink-600 italic">
            &quot;Remember... all I&apos;m offering is the truth. Nothing more.&quot;
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink-800 relative">
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          <CheshireCatSmile size={60} className="opacity-20" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <Logo size="lg" className="mb-4" />
              <p className="text-body text-ink-500 max-w-sm mb-4">
                A place for the curious. Where ideas are explored, 
                debates are civil, and rabbit holes are welcomed.
              </p>
              <p className="text-body-sm text-ink-600 italic mb-6">
                &quot;We&apos;re all mad here. I&apos;m mad. You&apos;re mad.&quot;
              </p>
              <p className="text-caption text-ink-700">
                © 2024 Mootable. Free your mind.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-overline text-ink-400 uppercase mb-4">Product</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-body text-ink-500 hover:text-honey-500 transition-colors">Features</Link></li>
                <li><Link href="#" className="text-body text-ink-500 hover:text-honey-500 transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-body text-ink-500 hover:text-honey-500 transition-colors">Security</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-overline text-ink-400 uppercase mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-body text-ink-500 hover:text-honey-500 transition-colors">About</Link></li>
                <li><Link href="#" className="text-body text-ink-500 hover:text-honey-500 transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-body text-ink-500 hover:text-honey-500 transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
