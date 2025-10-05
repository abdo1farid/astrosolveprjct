import { ButtonPrimary } from "./Button";

const sitemap = [
  {
    label: 'Home',
    href: '#home'
  },
  {
    label: 'About',
    href: '#about'
  },
  {
    label: 'Features',
    href: '#features'
  },
  {
    label: 'Team',
    href: '#team'
  }
];

const socials = [
  {
    label: 'GitHub',
    href: 'https://www.github.com/'
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/'
  },
  {
    label: 'Twitter X',
    href: 'https://x.com/'
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/'
  }
];


const Footer = () => {
  return (
    <footer className="section">
        <div className="container">
            <div className="lg:grid lg:grid-cols-2">
                <div className="mb-10">
                    <h2 className="headline-1 mb-8 max-w-[12ch]">
                        AstroSolve — Discover the Universe
                    </h2>

                    <ButtonPrimary href="mailto:astrosolve@gmail.com" label="Mail Us" icon="chevron_right"/>
                </div>

                <div className="grid grid-cols-2 gap-4 lg:px-20">
                    <div>
                        <p className="mb-2">Sitemap</p>
                        <ul>
                            {sitemap.map(({ label,href }, key) =>(
                                <li key={key}>
                                    <a href={href} className="block text-sm text-sky-300 py-1 transition-all hover:text-sky-200">
                                        {label}
                                        </a>
                                    </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="mb-2">Socials</p>
                        <ul>
                            {socials.map(({ label,href }, key) =>(
                                <li key={key}>
                                    <a href={href} target="_blank" className="block text-sm text-sky-300 py-1 transition-all hover:text-sky-200">
                                        {label}
                                        </a>
                                    </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between pt-10 mb-8">
        <p className="text-slate-200 text-sm">
          &copy; 2025 <span className="text-slate-50">AstroSolve</span>
        </p>
            </div>
        </div>
    </footer>
  )
}

export default Footer
