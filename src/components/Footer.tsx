import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Produkt",
    links: [
      { 
        label: "Features", 
        href: "/#features",
        onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          document.getElementById('features')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      },
      { 
        label: "Templates", 
        href: "/#",
        onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          window.scrollTo({ 
            top: 0,
            behavior: 'smooth'
          });
        }
      },
      { label: "Preise", href: "/pricing" },
    ]
  },
  {
    title: "Ressourcen",
    links: [
      
     
      
      { label: "FAQ", href: "/contact" },
      { label: "Support Center", href: "/contact" },
    ]
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Über uns", href: "/about" },
     
      { label: "Kontakt", href: "/contact" },
     
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Datenschutz", onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          // Datenschutzerklärung als Textdatei herunterladen
          const text = `Datenschutzerklärung\n1. Verantwortlicher\nVerantwortlich für die Datenverarbeitung auf dieser Website ist:\nMax Sonnenschein\nWebBuilder.de\nHüttkahlen 15\n23866 Nahe\nDeutschland\nE-Mail: Webbuilder.kontakt@gmail.com\n2. Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck von deren Verwendung\nBeim Besuch der Website www.WebBuilder.de werden keine personenbezogenen Daten automatisch erhoben.\nWenn Sie sich registrieren, erfassen wir ausschließlich Ihre E-Mail-Adresse und Ihr Passwort. Diese Daten dienen ausschließlich dem Zweck der Benutzerverwaltung und Authentifizierung.\n3. Hosting und Backend-Dienste\nUnsere Website nutzt die Plattform Supabase für Hosting, Datenbank und Authentifizierung. Supabase speichert Ihre E-Mail-Adresse und Ihr Passwort in verschlüsselter Form. Die Datenverarbeitung erfolgt gemäß den europäischen Datenschutzstandards, soweit Supabase in der EU gehostet wird.\n4. Versand von System-E-Mails\nFür den Versand von System-E-Mails (z. B. zur Registrierung oder Passwortzurücksetzung) nutzen wir den Dienstleister Resend. Dabei wird Ihre E-Mail-Adresse an Resend übermittelt. Die Nutzung erfolgt auf Grundlage eines berechtigten Interesses an einer zuverlässigen Kommunikation (Art. 6 Abs. 1 lit. f DSGVO).\n5. Weitergabe von Daten\nEine Weitergabe Ihrer personenbezogenen Daten an Dritte erfolgt nicht, außer an die in dieser Erklärung genannten Dienstleister.\n6. Ihre Rechte als betroffene Person\nSie haben das Recht auf:\n- Auskunft über Ihre gespeicherten Daten,\n- Berichtigung unrichtiger Daten,\n- Löschung Ihrer Daten,\n- Einschränkung der Verarbeitung,\n- Widerspruch gegen die Verarbeitung,\n- Datenübertragbarkeit,\n- Beschwerde bei einer Aufsichtsbehörde.\n7. Datensicherheit\nWir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird.\n8. Änderungen dieser Datenschutzerklärung\nDiese Datenschutzerklärung ist vorläufig. Sie wird angepasst, sobald das Unternehmen gegründet wurde oder sich Änderungen in der Datenverarbeitung ergeben.`;
          const blob = new Blob([text], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'privacy.txt';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      },
      { label: "AGB", onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          // AGB als Textdatei herunterladen
          const text = `Allgemeine Geschäftsbedingungen (AGB)\n1. Geltungsbereich\nDiese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen dem Anbieter (nachfolgend "wir" oder "WebBuilder.de") und dem Kunden (nachfolgend "Sie") über die Erstellung von Webseiten.\n2. Vertragsgegenstand\nVertragsgegenstand ist die individuelle Gestaltung und Entwicklung einer Website nach den Vorgaben des Kunden. Ein Vertragsverhältnis kommt zustande, wenn Sie ein Angebot von uns annehmen.\n3. Leistungen\nUnsere Leistungen umfassen die Konzeption, Gestaltung, technische Umsetzung und ggf. Pflege der Website. Der genaue Leistungsumfang wird im jeweiligen Angebot definiert.\n4. Preise und Zahlungsbedingungen\nAlle Preise werden individuell im Angebot festgelegt. Eine Zahlung ist erst fällig, nachdem die Website fertiggestellt und dem Kunden übergeben wurde.\n5. Mitwirkungspflichten des Kunden\nSie sind verpflichtet, alle zur Auftragserfüllung notwendigen Inhalte (Texte, Bilder, Zugangsdaten etc.) rechtzeitig bereitzustellen. Verzögerungen durch fehlende Mitwirkung verlängern die Lieferzeit entsprechend.\n6. Urheberrecht und Nutzungsrechte\nNach vollständiger Bezahlung erhalten Sie das einfache, nicht übertragbare Nutzungsrecht an der erstellten Website. Das Urheberrecht verbleibt bei uns, sofern nicht anders vereinbart.\n7. Haftung\nWir haften nur für vorsätzliche und grob fahrlässige Pflichtverletzungen. Für Inhalte, die vom Kunden bereitgestellt werden, übernehmen wir keine Verantwortung.\n8. Gewährleistung\nWir gewährleisten die vertragsgemäße Funktion der erstellten Website. Etwaige Mängel müssen unverzüglich gemeldet werden. Die Nachbesserung erfolgt innerhalb angemessener Frist.\n9. Vertragskündigung\nDer Vertrag kann von beiden Seiten aus wichtigem Grund gekündigt werden. Bereits erbrachte Leistungen sind in diesem Fall anteilig zu vergüten.\n10. Schlussbestimmungen\nEs gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz des Anbieters. Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.`;
          const blob = new Blob([text], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'agb.txt';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      },
      { label: "Impressum", onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          // Impressum als Textdatei herunterladen
          const text = `Impressum\nAngaben gemäß § 5 TMG\nMax Sonnenschein\nWebBuilder.de\nHüttkahlen 15\n23866 Nahe\nDeutschland\n\nKontakt\nTelefon: 01783169433\nE-Mail: Webbuilder.kontakt@gmail.com\n\nVerantwortlich für den Inhalt nach § 55 Abs. 2 RStV\nMax Sonnenschein\nHüttkahlen 15\n23866 Nahe\n\nPlattform der EU-Kommission zur Online-Streitbeilegung\nhttps://ec.europa.eu/consumers/odr/\n\nHaftungsausschluss:\nTrotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.\n\nHinweis\nDa dieses Projekt sich derzeit im Aufbau befindet und kein aktives Gewerbe angemeldet ist, dient dieses Impressum als Platzhalter. Es wird angepasst, sobald ein Unternehmen offiziell registriert ist.`;
          const blob = new Blob([text], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'impressum.txt';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      },
      { label: "Cookie-Einstellungen", onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          // Cookie-Richtlinie als Textdatei herunterladen
          const text = `📄 Cookie-Richtlinie\nLetzte Aktualisierung: [TT.MM.JJJJ]\n\n1. Einleitung\nDiese Cookie-Richtlinie gilt für die Website www.WebBuilder.de. Wir verwenden ausschließlich technisch notwendige Cookies, die für den sicheren Betrieb und die grundlegende Funktion dieser Website erforderlich sind.\n\n2. Was sind Cookies?\nCookies sind kleine Textdateien, die von einer Website im Browser des Nutzers gespeichert werden. Sie ermöglichen es der Website, sich bestimmte Informationen über den Nutzer zu merken – entweder für die Dauer eines Besuchs (Session-Cookie) oder für wiederholte Besuche (permanente Cookies).\n\n3. Welche Cookies wir verwenden\nUnsere Website nutzt nur essenzielle Cookies. Diese sind erforderlich, um grundlegende Funktionen wie z. B. die Authentifizierung (Login mit E-Mail und Passwort) und Sitzungssteuerung bereitzustellen.\n\nDiese Cookies:\n\nwerden automatisch beim Besuch bestimmter Seiten gesetzt,\nspeichern keine personenbezogenen Daten über das technisch notwendige Maß hinaus,\nerfordern keine aktive Zustimmung nach Art. 6 Abs. 1 lit. f DSGVO.\n\n4. Drittanbieter-Cookies\nWir verwenden keine Analyse- oder Marketing-Cookies.\nAllerdings können unsere technischen Dienstleister – wie:\n\nSupabase (für Datenbank und Benutzeranmeldung),\nResend (für E-Mail-Versanddienste),\n\nnotwendige Cookies zur Bereitstellung ihrer Dienste setzen. Diese fallen unter die Kategorie der technisch erforderlichen Cookies.\n\n5. Verwaltung Ihrer Cookie-Einstellungen\nDa wir keine zustimmungspflichtigen Cookies einsetzen, wird kein Cookie-Banner angezeigt.\nSie können Cookies jedoch jederzeit über die Einstellungen Ihres Browsers löschen oder blockieren. Bitte beachten Sie, dass dies die Funktionalität der Website einschränken kann.\n\n6. Weitere Informationen\nMehr Informationen zur Verarbeitung personenbezogener Daten und zu Ihren Rechten finden Sie in unserer Datenschutzerklärung.`;
          const blob = new Blob([text], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'cookie-richtlinie.txt';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      },
   
    ]
  }
];

export const Footer = () => {
  return (
    <footer className="bg-primary/10 border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-neutral">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={link.onClick}
                      className="text-sm text-gray-600 hover:text-primary transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-xl font-bold">WebBuilder</Link>
              <span className="text-sm text-gray-600">© 2024 Alle Rechte vorbehalten</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/newsletter" className="text-gray-600 hover:text-primary">Newsletter</Link>
              <Link to="/status" className="text-gray-600 hover:text-primary">System Status</Link>
              <Link to="/sitemap" className="text-gray-600 hover:text-primary">Sitemap</Link>
            </div>
            <div className="flex space-x-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                Twitter
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};