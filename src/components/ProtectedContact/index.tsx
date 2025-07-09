import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface ProtectedEmailProps {
  user: string;
  domain: string;
}

export function ProtectedEmail({ user, domain }: ProtectedEmailProps) {
  const [revealed, setRevealed] = useState(false);
  const email = `${user}@${domain}`;
  
  if (!revealed) {
    return (
      <span className={styles.protectedWrapper}>
        <span 
          className={styles.distortedText}
          onClick={() => setRevealed(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setRevealed(true)}
          aria-label="Click to reveal email address"
        >
          <span className={styles.layer1}>████@█████████.███</span>
          <span className={styles.layer2}>user@domain.com</span>
          <span className={styles.layer3}>▓▓▓▓@▓▓▓▓▓▓▓▓▓.▓▓▓</span>
        </span>
        <span className={styles.hoverHint}>Click to reveal</span>
      </span>
    );
  }
  
  return <a href={`mailto:${email}`} className={styles.revealedLink}>{email}</a>;
}

interface ProtectedPhoneProps {
  countryCode: string;
  number: string;
}

export function ProtectedPhone({ countryCode, number }: ProtectedPhoneProps) {
  const [revealed, setRevealed] = useState(false);
  const fullNumber = `${countryCode} ${number}`;
  const telNumber = `${countryCode}${number.replace(/\s/g, '')}`;
  
  if (!revealed) {
    return (
      <span className={styles.protectedWrapper}>
        <span 
          className={styles.distortedText}
          onClick={() => setRevealed(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setRevealed(true)}
          aria-label="Click to reveal phone number"
        >
          <span className={styles.layer1}>+██ ███ ███ ███</span>
          <span className={styles.layer2}>+00 000 000 000</span>
          <span className={styles.layer3}>+▓▓ ▓▓▓ ▓▓▓ ▓▓▓</span>
        </span>
        <span className={styles.hoverHint}>Click to reveal</span>
      </span>
    );
  }
  
  return <a href={`tel:${telNumber}`} className={styles.revealedLink}>{fullNumber}</a>;
}

export function NoIndexHead() {
  useEffect(() => {
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);
    
    return () => {
      document.head.removeChild(metaRobots);
    };
  }, []);
  
  return null;
}