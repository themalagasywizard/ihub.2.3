import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const PasswordAuth = ({ onAuthenticated }: { onAuthenticated: () => void }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const correctPassword = 'trumbletv25';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      localStorage.setItem('isAuthenticated', 'true');
      onAuthenticated();
    } else {
      toast({
        title: "Incorrect password",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed inset-0 bg-[#141414] flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] p-8 rounded-lg max-w-md w-full border border-[#2a2a2a] shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <img 
            src="/lovable-uploads/279b9304-fed6-4bfe-9cb8-3906fe8f74d1.png" 
            alt="iHUB" 
            className="h-16 mb-6"
          />
          <h2 className="text-2xl font-bold text-white">Welcome to iHUB</h2>
          <p className="text-gray-400 mt-2 text-center">Enter password to access premium content</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-[#2a2a2a] border-[#3a3a3a] text-white pr-10"
              autoFocus
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#ea384c] hover:bg-[#ff4d63] transition-colors"
          >
            Access iHUB
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordAuth;