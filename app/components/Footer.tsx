import "~/styles/components/Footer.scss";

export const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-logo">
              Любашівська <span>лікарня</span>
            </h3>
            <p>
              Ми забезпечуємо професійну медичну допомогу, використовуючи
              сучасні технології та багаторічний досвід наших фахівців.
            </p>
          </div>

          <div className="footer-col">
            <h4>Навігація</h4>
            <ul>
              <li>
                <a href="/about">Про нас</a>
              </li>
              <li>
                <a href="/services">Наші послуги</a>
              </li>
              <li>
                <a href="/contact">Контакти</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Графік роботи</h4>
            <p>Пн – Пт: 08:00 — 20:00</p>
            <p>Сб: 09:00 — 18:00</p>
            <p>Нд: Вихідний</p>
          </div>

          <div className="footer-col">
            <h4>Зв'яжіться з нами</h4>
            <p>📍 м. Любашівка, пр. Любомира Гузара, 1</p>
            <p>📞 +38 (044) 123-45-67</p>
            <p>✉️ info@hospital.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Любашівська лікарня. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
};
