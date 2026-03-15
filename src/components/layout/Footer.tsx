import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">LIM Studio</div>
          <div className="footer__links">
            <a
              href="https://github.com/mmporong"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
        <p className="footer__copy">&copy; 2025 mmporong</p>
      </div>
    </footer>
  )
}
