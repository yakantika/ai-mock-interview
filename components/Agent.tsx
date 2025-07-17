import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

const Agent = ({ userName }: AgentProps) => {
    const status = CallStatus.FINISHED;
    const isSpeaking = true;
    const message = [
        'Whats your name?',
        'My name is Isha, nice to meet you'
    ];
    const lastMessage = message[message.length - 1];

  return (
    <>
    <div className="flex flex-col sm:flex-row gap-8 justify-center items-center min-h-[320px] w-full mb-8 sm:mb-0">
      {/* AI Interviewer Card */}
      <div className="w-[260px] h-[260px] bg-gradient-to-b from-[#23243a] to-[#181926] border border-[#363759] rounded-xl flex flex-col items-center justify-center relative shadow-lg">
        <div className="relative flex flex-col items-center justify-center">
          {/* Animated Glowing Ring */}
          <span className="ai-glow-ring absolute inset-0 z-0" />
          <div className="w-20 h-20 rounded-full bg-[#23243a] flex items-center justify-center overflow-hidden relative z-10 border-2 border-[#363759]">
            <Image src="/ai-avatar.png" alt="AI Interviewer" width={60} height={60} className="object-cover" />
          </div>
        </div>
        <div className="absolute left-0 right-0 bottom-6 text-center text-base font-semibold text-white tracking-wide z-10">AI Interviewer</div>
      </div>

      {/* User Card */}
      <div className="w-[260px] h-[260px] bg-gradient-to-b from-[#23243a] to-[#181926] border border-[#363759] rounded-xl flex flex-col items-center justify-center relative shadow-lg">
        <div className="w-20 h-20 rounded-full bg-[#23243a] flex items-center justify-center overflow-hidden border-2 border-[#363759]">
          <Image src="/user-avatar.png" alt="User Avatar" width={60} height={60} className="object-cover" />
        </div>
        <div className="absolute left-0 right-0 bottom-6 text-center text-base font-semibold text-white tracking-wide">You</div>
      </div>
    </div>
    {message.length > 0 && (
      <div className="w-full flex justify-center">
        <div className="bg-[#181926]/80 border border-[#363759] rounded-full px-6 py-3 text-white text-center max-w-[540px] w-full mx-auto mb-6">
          <span key={lastMessage} className={cn(
            "animate-fadeIn"
          )}>
            {lastMessage}
          </span>
        </div>
      </div>
    )}
    <div>
        <div className="w-full flex justify-center">
        {status !== CallStatus.ACTIVE ? (
            <button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2 font-semibold shadow transition-colors duration-150 mt-8">
                <span className={cn('absolute animate-ping rounded-full opacity-75', status !== CallStatus.CONNECTING && 'hidden')} />
<span>
  {status === CallStatus.FINISHED ? 'Call' : status === CallStatus.INACTIVE ? 'Call' : '...'}
</span>
            </button>
        ) : (
            <button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-2 font-semibold shadow transition-colors duration-150 mt-8">
                End
            </button>
        )}
        </div>
    </div>
    </>
   );
};

export default Agent;