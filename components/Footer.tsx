import Button from "@/components/ui/Button";

export default function Footer() {
  return (
    <footer className="bg-purple-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand & Description */}
          <div>
            <div className="text-3xl font-bold mb-6">ROTAGI</div>
            <p className="text-gray-300 mb-6">
              Empowering young African girls and women with AI literacy, digital confidence, and leadership skills.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-pink-400">FB</a>
              <a href="#" className="text-gray-300 hover:text-pink-400">IG</a>
              <a href="#" className="text-gray-300 hover:text-pink-400">X</a>
              <a href="#" className="text-gray-300 hover:text-pink-400">LN</a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Navigation</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-pink-400">Impact</a></li>
              <li><a href="#" className="hover:text-pink-400">Programs</a></li>
              <li><a href="#" className="hover:text-pink-400">Donate</a></li>
              <li><a href="#" className="hover:text-pink-400">Mentor</a></li>
              <li><a href="#" className="hover:text-pink-400">Events</a></li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Get Involved</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-pink-400">Donate</a></li>
              <li><a href="#" className="hover:text-pink-400">Partner With Us</a></li>
              <li><a href="#" className="hover:text-pink-400">About Us</a></li>
              <li><a href="#" className="hover:text-pink-400">Resources</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-300">
              <li>No 1 Mbagar Close,<br />Off Eagle Billed Estate,<br />Federal Capital Territory,<br />Abuja, Nigeria</li>
              <li>
                <a href="mailto:info@rotagi.org" className="hover:text-pink-400">
                  info@rotagi.org
                </a>
              </li>
              <li>
                <a href="tel:+23480332368560" className="hover:text-pink-400">
                  +234 (0) 803 323 68560 (WhatsApp)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-800 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} All rights reserved ROTAGI</p>
          <p className="mt-2">
            <a href="#" className="hover:text-pink-400">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
}