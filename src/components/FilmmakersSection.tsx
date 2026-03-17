import aidaPhoto from '@/assets/aida-bekele.jpg';
import bemnetPhoto from '@/assets/bemnet-yemesgen.jpg';

const filmmakers = [
  {
    photo: aidaPhoto,
    initials: 'AB',
    name: 'Aida Bekele',
    title: 'Executive Producer',
    bio: 'An Ethiopian educator, organizer, and humanitarian — and daughter of Major Bekele Abebe, a Kagnew Battalion soldier. Aida teaches at the International Community School in Ethiopia and is fluent in English, Amharic, French, and Spanish. Her lived connection to this history ensures the film is grounded, authentic, and driven by truth and human dignity.',
  },
  {
    photo: bemnetPhoto,
    initials: 'BY',
    name: 'Bemnet Yemesgen',
    title: 'Director & Producer',
    bio: 'A filmmaker, photographer, and creative director who has worked with Adidas, USA Today, and the Nike Foundation. When Bemnet discovered that two of his uncles had served in the Korean War, he realized he knew almost nothing about Ethiopia\'s role — and that almost no one else did either. That discovery became the catalyst for this film.',
    email: 'bem@thebem.net',
  },
];

export function FilmmakersSection() {
  return (
    <section id="filmmakers" className="bg-background py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="scroll-fade font-space-mono text-xs uppercase tracking-[0.3em] text-primary mb-12 text-center">
          The Filmmakers
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filmmakers.map((person) => (
            <div
              key={person.initials}
              className="scroll-fade bg-kagnew-card border border-primary/20 p-8 md:p-10"
            >
              {/* Header: photo + name/title */}
              <div className="flex items-center gap-5 mb-6">
                <img
                  src={person.photo}
                  alt={person.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-primary flex-shrink-0"
                />
                <div>
                  <h3 className="font-playfair text-xl font-bold text-foreground">{person.name}</h3>
                  <p className="font-space-mono text-xs uppercase tracking-[0.2em] text-primary">
                    {person.title}
                  </p>
                </div>
              </div>
              <p className="font-source-serif text-sm text-foreground/70 leading-relaxed">
                {person.bio}
              </p>
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  className="inline-block mt-4 font-space-mono text-xs text-primary hover:underline"
                >
                  {person.email}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}