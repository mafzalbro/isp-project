"use client";

import { motion } from "framer-motion";

const Marquee = ({ children, speed = 20 }: { children: React.ReactNode, speed?: number }) => {
    return (
      <div className="relative flex w-full overflow-hidden">
        <motion.div
          className="flex min-w-full shrink-0 items-center justify-around gap-12"
          animate={{ x: ['0%', '-100%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: speed,
              ease: 'linear',
            },
          }}
        >
          {children}
        </motion.div>
         <motion.div
          className="absolute top-0 flex min-w-full shrink-0 items-center justify-around gap-12"
          animate={{ x: ['100%', '0%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: speed,
              ease: 'linear',
            },
          }}
        >
          {children}
        </motion.div>
      </div>
    );
};

const CiscoLogo = () => (
    <svg height="40" viewBox="0 0 120 40" fill="currentColor" className="text-muted-foreground/60">
      <path d="M0 16.5v7h2.5v-7zm5.6 0v7h2.5v-7zm5.6 0v7h2.5v-7zm5.6 0v7h2.5v-7zm5.6 0v7h2.5v-7zm5.6 0v7h2.5v-7z" />
      <path d="M30.4 16.5v1h-2.5v6h2.5v1h-6.5v-1h2.5v-2.5h-2.5v-1h2.5v-2.5h-2.5v-1z" />
      <path d="M37.5 16.5c2.5 0 4.4 2.2 4.4 5s-1.9 5-4.4 5h-4v-10zm0 7c.8 0 1.9-1.1 1.9-2s-1.1-2-1.9-2h-1.5v4z" />
      <path d="M49.3 16.5c2.5 0 4.4 2.2 4.4 5s-1.9 5-4.4 5h-4v-10zm0 7c.8 0 1.9-1.1 1.9-2s-1.1-2-1.9-2h-1.5v4z" />
      <path d="M61.1 16.5c2.5 0 4.4 2.2 4.4 5s-1.9 5-4.4 5h-4v-10zm0 7c.8 0 1.9-1.1 1.9-2s-1.1-2-1.9-2h-1.5v4z" />
      <path d="M72.2 16.5v10h-2.5l-3.1-5.1v5.1h-1.9v-10h2.5l3.1 5.1v-5.1z" />
      <path d="M78.8 16.5v10h-1.9v-10z" />
      <path d="M89.4 16.5c1.8 0 3.3 1.5 3.3 3.3s-1.5 3.3-3.3 3.3h-1.9v3.4h-1.9v-10zm0 4.8c.8 0 1.4-.6 1.4-1.5s-.6-1.5-1.4-1.5h-1.9v3z" />
    </svg>
);

const JuniperLogo = () => (
    <svg height="24" viewBox="0 0 200 40" fill="currentColor" className="text-muted-foreground/60">
        <path d="M12.9 29.8c-.8 0-1.5-.2-2-.5s-.9-.8-1.2-1.5-.4-1.4-.4-2.4V14.1h2.9v11c0 .8.1 1.4.4 1.8s.7.6 1.3.6c.6 0 1.1-.2 1.5-.6s.6-1 .6-1.8V14.1h2.9v11.3c0 1-.1 1.8-.4 2.4s-.7.9-1.2 1.5c-.5.5-1.2.8-2 .8zm15.7-1.1V14.1h2.9v14.6h-2.9zM42.2 29.8c-.9 0-1.7-.2-2.4-.5s-1.2-1-1.6-1.7l2.2-1.4c.2.4.5.7.9.9s.8.3 1.3.3c.7 0 1.2-.2 1.6-.5s.6-.8.6-1.4c0-.4-.1-.8-.4-1s-.7-.5-1.2-.7l-2-.5c-1.2-.3-2.1-.7-2.7-1.3s-.9-1.4-.9-2.5c0-.9.2-1.7.7-2.4s1.1-1.1 1.9-1.4c.8-.3 1.6-.5 2.5-.5.8 0 1.5.1 2.2.4s1.2.7 1.6 1.2l-2.1 1.5c-.3-.4-.7-.6-1.1-.8s-.9-.2-1.4-.2c-.6 0-1.1.1-1.4.4s-.5.7-.5 1.2c0 .4.1.7.4.9s.7.5 1.2.7l2 .5c1.2.3 2.1.7 2.7 1.3s.9 1.4.9 2.5c0 1-.2 1.7-.7 2.5s-1.1 1.2-1.9 1.5c-.8.3-1.6.5-2.6.5zM56 28.7l-1.3-3.2h-5.2l-1.2 3.2h-3.2L51.8 14h3.2l6.7 14.7H56zm-1.8-5.6l-2.1-5.3-2.1 5.3h4.2zM71 28.7V14.1h9.3v2.4h-6.4v4.4h5.7v2.4h-5.7v5.4h-2.9zM83.8 29.8c-.8 0-1.5-.2-2-.5s-.9-.8-1.2-1.5-.4-1.4-.4-2.4V14.1h2.9v11c0 .8.1 1.4.4 1.8s.7.6 1.3.6c.6 0 1.1-.2 1.5-.6s.6-1 .6-1.8V14.1h2.9v11.3c0 1-.1 1.8-.4 2.4s-.7.9-1.2 1.5c-.5.5-1.2.8-2 .8zm15.6-1.1V14.1h2.9v14.6h-2.9zm13.1-14.6h2.9v14.6h-2.9V14.1zM126.7 26l-3-6.1h-.1v6.1h-2.7V14.1h2.8l3 6h.1v-6h2.7v14.6h-2.8zM140.4 28.7V14.1h9.3v2.4h-6.4v4.4h5.7v2.4h-5.7v5.4h-2.9zM153 28.7l-1.3-3.2h-5.2l-1.2 3.2h-3.2l6.7-14.7h3.2l6.7 14.7h-3.3zm-1.8-5.6l-2.1-5.3-2.1 5.3h4.2zM167.3 28.7V14.1h2.9v12.2h5.7v2.4h-8.6zM181.7 28.7V14.1h2.9v12.2h5.7v2.4h-8.6z"/>
    </svg>
);

const AristaLogo = () => (
    <svg height="20" viewBox="0 0 128 24" fill="currentColor" className="text-muted-foreground/60">
        <path d="M12.7.9L0 23.1h5.1l2.4-4.2h9.9l2.4 4.2h5.1L12.7.9zm-.1 13.9L15.9 8l3.3 6.8H12.6zM32.8.9h5.1v22.2h-5.1zM44.4 14.2c0-3.3 2.1-5.1 4.8-5.1s4.8 1.8 4.8 5.1c0 3.3-2.1 5.1-4.8 5.1s-4.8-1.8-4.8-5.1zm5.1 0c0-1.3-.9-2.1-2.4-2.1s-2.4.8-2.4 2.1.9 2.1 2.4 2.1 2.4-.8 2.4-2.1zM65.4.9l-8 22.2h5.3l1.5-4.2h8.2l1.5 4.2h5.3l-8-22.2h-5.8zm-.1 13.9l1.9-5.4 1.9 5.4h-3.8zM80.4.9h5.1v22.2h-5.1zM92.1.9l-8 22.2h5.3l1.5-4.2h8.2l1.5 4.2h5.3l-8-22.2h-5.8zm-.1 13.9l1.9-5.4 1.9 5.4h-3.8zM113.8.9l-8 22.2h5.3l1.5-4.2h8.2l1.5 4.2h5.3l-8-22.2h-5.8zm-.1 13.9l1.9-5.4 1.9 5.4h-3.8z"/>
    </svg>
);

const FortinetLogo = () => (
    <svg height="24" viewBox="0 0 160 30" fill="currentColor" className="text-muted-foreground/60">
        <path d="M0 5.4h11.8v3.6H3.8v4.9h7.4v3.6H3.8v5.4h8v3.6H0V5.4zM24 5.4c3.6 0 6.5 2.9 6.5 6.5s-2.9 6.5-6.5 6.5h-5.9V5.4H24zm0 9.4c1.6 0 2.9-1.3 2.9-2.9s-1.3-2.9-2.9-2.9h-2.1v5.8h2.1zM40.2 5.4h3.8v18.1h-3.8V5.4zM53.1 5.4h4.1l5.4 9.1v-9.1h3.8v18.1h-3.6l-5.7-9.6v9.6h-3.9V5.4zM77.2 5.4h3.8v18.1h-3.8V5.4zM87.5 5.4h11.8v3.6h-8v4.9h7.4v3.6h-7.4v5.4h8v3.6H87.5V5.4zM108.5 5.4h3.9l6.3 18.1h-4.1l-1.5-4.5h-7.1l-1.5 4.5h-4.1l6.1-18.1zm-1.1 10.9h6.1l-3-9-3.1 9zM128.5 5.4h3.8v14.4h7.9v3.7h-11.7V5.4zM149.3 5.4h3.8v18.1h-3.8V5.4z"/>
    </svg>
);

const PaloAltoLogo = () => (
    <svg height="20" viewBox="0 0 170 24" fill="currentColor" className="text-muted-foreground/60">
        <path d="M.2 1.3h6.3v21.4H.2zm11.3 0H24l5.3 8.3V1.3h6.3v21.4h-5.7L24.6 12v10.7h-6.3L11.5 1.3zm31.8 0h12.5v5.3h-6.2v3.7h5.3v5.3h-5.3v3.7h6.2v5.4H43.3zm18.8 0h6.3v21.4h-6.3zm11.3 0h12.5v5.3h-6.2v16.1h-6.3V1.3zm18.8 0h6.3v21.4h-6.3zm11.2 0h12.5v5.3h-6.2v3.7h5.3v5.3h-5.3v3.7h6.2v5.4H114.6zm18.8 0h12.5v5.3H139v16.1h-6.3V1.3zm18.8 0h6.3v21.4h-6.3z"/>
    </svg>
);


const logos = [
    <CiscoLogo key="cisco" />,
    <JuniperLogo key="juniper" />,
    <AristaLogo key="arista" />,
    <FortinetLogo key="fortinet" />,
    <PaloAltoLogo key="paloalto" />,
];

export default function LogoMarquee() {
    return (
        <Marquee speed={30}>
            {logos.map((logo, index) => <div key={index}>{logo}</div>)}
        </Marquee>
    );
}
