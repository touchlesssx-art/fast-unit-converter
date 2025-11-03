import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import botImage from '@/assets/bot-mascot.png';

export default function CreatorMessageBot() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('converterx_bot_seen');
    if (!seen) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleRead = () => {
    setModalOpen(true);
  };

  const handleNext = () => {
    setModalOpen(false);
    setShowFireworks(true);
    
    setTimeout(() => {
      setShowFireworks(false);
      setShowWelcome(true);
      
      setTimeout(() => {
        setShowWelcome(false);
        setVisible(false);
        localStorage.setItem('converterx_bot_seen', 'true');
      }, 3000);
    }, 2500);
  };

  const handleClose = () => {
    setModalOpen(false);
    setVisible(false);
    localStorage.setItem('converterx_bot_seen', 'true');
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    setSending(true);
    
    // Simulate sending - integrate with EmailJS or Formspree here
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Thank you for your message! 💙');
    setMessage('');
    setSending(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Floating Bot */}
      {!modalOpen && !showFireworks && !showWelcome && (
        <div className="fixed top-16 right-4 md:right-8 z-50 animate-fade-in">
          <div className="flex flex-col items-center gap-3">
            {/* Bot Image - Now on top */}
            <div className="w-24 h-24 md:w-28 md:h-28 animate-[bounce_2s_ease-in-out_infinite] drop-shadow-[0_0_25px_rgba(79,70,229,0.6)]">
              <img 
                src={botImage} 
                alt="Welcome Bot" 
                className="w-full h-full"
              />
            </div>
            
            {/* Message Bubble - Below bot */}
            <div className="w-64 md:w-72 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(79,70,229,0.3)] border-2 border-primary/30 p-5 animate-scale-in relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white/95 border-l-2 border-t-2 border-primary/30 rotate-45 backdrop-blur-xl" />
              <p className="text-sm font-semibold text-foreground mb-4 text-center leading-relaxed">
                👋 Hey! Creator has a message for you!
              </p>
              <Button
                onClick={handleRead}
                className="w-full bg-gradient-to-r from-primary via-blue-500 to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] hover:shadow-xl hover:shadow-primary/50 transition-all duration-500 font-semibold text-base py-6 rounded-xl"
              >
                ✨ Read Message
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          <div className="relative max-w-lg w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-primary/30 p-6 md:p-8 animate-scale-in">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="flex justify-center mb-6">
              <img src={botImage} alt="Bot" className="w-20 h-20 drop-shadow-[0_0_20px_rgba(79,70,229,0.5)]" />
            </div>

            <div className="text-center space-y-4 mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                A Message from the Creator
              </h2>
              
              <div className="text-sm md:text-base text-gray-700 space-y-3 text-left bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border border-primary/10">
                <p>Hey, this is my first website and maybe my first income source.</p>
                <p>With this website, I've just started my business and my journey.</p>
                <p>I will continue with other projects and we'll be able to keep in touch on social media.</p>
                <p>I'd be grateful if you support and become part of my first journey.</p>
                <p className="font-semibold">Thank you very much for reading this message, great person! 🤍</p>
                <p className="text-xs text-gray-600 italic">
                  (By the way, please turn off AdBlock — I need some pennies to cover my hosting costs 🤗😅)
                </p>
              </div>
            </div>

            {/* Message Box */}
            <div className="space-y-3 mb-6">
              <label className="text-sm font-medium text-gray-700">💬 Send me a message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your thoughts, feedback, or just say hi..."
                className="resize-none h-24 border-2 border-primary/20 focus:border-primary/40"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || sending}
                variant="outline"
                className="w-full"
              >
                {sending ? 'Sending...' : 'Send'}
              </Button>
            </div>

            <Button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-base font-semibold py-6"
            >
              NEXT
            </Button>
          </div>
        </div>
      )}

      {/* Fireworks Animation */}
      {showFireworks && (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
          <div className="fireworks-container">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="firework"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Welcome Message */}
      {showWelcome && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent animate-scale-in drop-shadow-2xl">
            Welcome to the journey 🚀
          </div>
        </div>
      )}

      <style>{`
        .fireworks-container {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .firework {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: firework-explode 2s ease-out forwards;
        }
        
        .firework:nth-child(5n+1) { background: #4F46E5; }
        .firework:nth-child(5n+2) { background: #60A5FA; }
        .firework:nth-child(5n+3) { background: #A78BFA; }
        .firework:nth-child(5n+4) { background: #F472B6; }
        .firework:nth-child(5n) { background: #FBBF24; }
        
        @keyframes firework-explode {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(
              calc((var(--x, 0) - 50) * 2px),
              calc((var(--y, 0) - 50) * 2px)
            ) scale(1);
            opacity: 0;
          }
        }
        
        .firework:nth-child(20n+1) { --x: 10; --y: 20; }
        .firework:nth-child(20n+2) { --x: 90; --y: 15; }
        .firework:nth-child(20n+3) { --x: 50; --y: 80; }
        .firework:nth-child(20n+4) { --x: 70; --y: 40; }
        .firework:nth-child(20n+5) { --x: 30; --y: 60; }
        .firework:nth-child(20n+6) { --x: 80; --y: 70; }
        .firework:nth-child(20n+7) { --x: 20; --y: 85; }
        .firework:nth-child(20n+8) { --x: 95; --y: 50; }
        .firework:nth-child(20n+9) { --x: 45; --y: 25; }
        .firework:nth-child(20n+10) { --x: 65; --y: 90; }
        .firework:nth-child(20n+11) { --x: 15; --y: 45; }
        .firework:nth-child(20n+12) { --x: 85; --y: 30; }
        .firework:nth-child(20n+13) { --x: 40; --y: 75; }
        .firework:nth-child(20n+14) { --x: 75; --y: 55; }
        .firework:nth-child(20n+15) { --x: 25; --y: 35; }
        .firework:nth-child(20n+16) { --x: 55; --y: 65; }
        .firework:nth-child(20n+17) { --x: 35; --y: 10; }
        .firework:nth-child(20n+18) { --x: 60; --y: 95; }
        .firework:nth-child(20n+19) { --x: 5; --y: 70; }
        .firework:nth-child(20n) { --x: 100; --y: 5; }
      `}</style>
    </>
  );
}
