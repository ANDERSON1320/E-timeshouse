import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <!-- Company Info -->
          <div class="footer-section">
            <h3>TimesHouse</h3>
            <p>Découvrez de belles montres ,et accessoires a des prix aordables et imbattables .</p>
          </div>

          <!-- Quick Links -->
          <div class="footer-section">
            <h4>Liens Rapides</h4>
            <ul>
              <li><a routerLink="/watches">Catalogue</a></li>
              <li><a routerLink="/watches" [queryParams]="{category: 'Homme'}">Montres Homme</a></li>
              <li><a routerLink="/watches" [queryParams]="{category: 'Femme'}">Montres Femme</a></li>
            </ul>
          </div>

          <!-- Customer Service -->
          <div class="footer-section">
            <h4>Service Client</h4>
            <ul>
              <li><a href="mailto:contact@timeshouse.com">Contact</a></li>
              <li><a>À propos</a></li>
              <li><a>Politique de retour</a></li>
              <li><a>Livraison</a></li>
            </ul>
          </div>

          <!-- Legal -->
          <div class="footer-section">
            <h4>Informations Légales</h4>
            <ul>
              <li><a>CGV</a></li>
              <li><a>Politique de confidentialité</a></li>
              <li><a>Mentions légales</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2024 CeejayVision. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--color-primary);
      color: var(--color-text-inverse);
      padding: 60px 0 20px;
      margin-top: 80px;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 40px;
      margin-bottom: 40px;
    }

    .footer-section h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      margin-bottom: 15px;
      background: linear-gradient(135deg, white 0%, var(--color-secondary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .footer-section h4 {
      font-size: 1.1rem;
      margin-bottom: 15px;
      color: var(--color-secondary);
      font-weight: 600;
    }

    .footer-section p {
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.6;
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-section ul li {
      margin-bottom: 10px;
    }

    .footer-section ul li a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: all var(--transition-base);
      cursor: pointer;
    }

    .footer-section ul li a:hover {
      color: var(--color-secondary);
      padding-left: 5px;
    }

    .footer-bottom {
      text-align: center;
      padding-top: 30px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.6);
    }

    @media (max-width: 768px) {
      .footer {
        padding: 40px 0 20px;
      }

      .footer-content {
        grid-template-columns: 1fr;
        gap: 30px;
      }
    }
  `]
})
export class FooterComponent { }
