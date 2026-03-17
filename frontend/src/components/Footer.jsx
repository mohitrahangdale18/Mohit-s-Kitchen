import React from 'react';
import { ChefHat, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div>
            <div className="logo-container" style={{ marginBottom: '1.5rem' }}>
              <div className="logo-icon">
                <ChefHat size={20} strokeWidth={2.5} />
              </div>
              <span className="logo-text" style={{ fontSize: '1.5rem' }}>Mohit's Kitchen</span>
            </div>
            <p style={{ color: 'var(--brand-gray)', maxWidth: '320px', lineHeight: '1.6', fontSize: '0.875rem' }}>
              Transforming the way you cook with the power of AI. Discover amazing recipes using the ingredients you already have at home.
            </p>
            <div className="social-links">
              <a href="#" className="social-btn"><Twitter size={18} /></a>
              <a href="#" className="social-btn"><Instagram size={18} /></a>
              <a href="#" className="social-btn"><Github size={18} /></a>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>Platform</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><a href="#" className="nav-link" style={{ fontSize: '0.875rem' }}>Generate</a></li>
              <li><a href="#" className="nav-link" style={{ fontSize: '0.875rem' }}>Saved Recipes</a></li>
              <li><a href="#" className="nav-link" style={{ fontSize: '0.875rem' }}>Chef Community</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><a href="#" className="nav-link" style={{ fontSize: '0.875rem' }}>Help Center</a></li>
              <li><a href="#" className="nav-link" style={{ fontSize: '0.875rem' }}>Terms of Service</a></li>
              <li><a href="#" className="nav-link" style={{ fontSize: '0.875rem' }}>Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p style={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-gray)' }}>
            © {new Date().getFullYear()} Mohit's Kitchen AI • All Rights Reserved
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--brand-gray)', fontWeight: '500' }}>
            <span>Powered by</span>
            <span style={{ color: 'var(--brand-green)', fontWeight: '700' }}>Groq AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
