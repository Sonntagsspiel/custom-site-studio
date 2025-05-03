import { useRef, useEffect } from "react";

const testimonials = [
  {
    name: "Minem",
    role: "Freelancer",
    content: "Real-time Smart notifications ensure we're always on top of our sales activities. Highly recommend!",
    rating: 4
  },
  {
    name: "Lepard",
    role: "Freelancer",
    content: "Binai intuitive design has significantly improved our efficiency in monitoring and organizing sales prospects.",
    rating: 4
  },
  {
    name: "Desya",
    role: "Freelancer",
    content: "The user-friendly interface of Binai has greatly enhanced our ability to track and manage sales leads.",
    rating: 4
  },
  {
    name: "Sarah",
    role: "Freelancer",
    content: "AI-powered analytics provide us with deep insights, enabling us to make data-driven decisions swiftly.",
    rating: 4
  },
  {
    name: "Lina",
    role: "Freelance Designer",
    content: "I was amazed at how easy it was to customize my dream website and place the order in just a few steps.",
    rating: 5
  },
  {
    name: "Marko",
    role: "Startup Founder",
    content: "The flexibility to personalize every aspect of my site before ordering is a total game-changer.",
    rating: 5
  },
  {
    name: "Selin",
    role: "Online Store Owner",
    content: "Finally, a platform that lets me build a website exactly how I want — without needing any coding skills.",
    rating: 5
  },
  {
    name: "Tobias",
    role: "Marketing Consultant",
    content: "Very intuitive to use and perfect for anyone who wants to skip the back-and-forth with web agencies.",
    rating: 4
  },
  {
    name: "Mara",
    role: "Photographer",
    content: "The live preview feature is excellent — I knew exactly what I was getting before I placed the order.",
    rating: 5
  },
  {
    name: "Jannis",
    role: "Blogger",
    content: "I was able to fully design my site the way I envisioned it and have it delivered quickly. Super smooth process!",
    rating: 5
  },
  {
    name: "Elif",
    role: "E-commerce Seller",
    content: "The customization options are straightforward, and the final site looks totally professional.",
    rating: 4
  },
  {
    name: "Rafael",
    role: "Musician",
    content: "I've never seen a simpler way to create and order a custom website. Everything just works!",
    rating: 5
  },
  {
    name: "Nina",
    role: "Content Creator",
    content: "With real-time editing and fast delivery, this service beats anything I've used before.",
    rating: 5
  },
  {
    name: "Paul",
    role: "Coach",
    content: "I customized my entire site — colors, fonts, layout — and it turned out even better than I expected.",
    rating: 5
  },
  {
    name: "Vivien",
    role: "Therapist",
    content: "This platform saved me hours of time. I had a ready-to-go website in under an hour.",
    rating: 4
  },
  {
    name: "Leo",
    role: "Fitness Trainer",
    content: "Easy to use, looks clean, and everything is done in just a few clicks. Love it!",
    rating: 5
  },
  {
    name: "Kira",
    role: "Illustrator",
    content: "I was skeptical at first, but the result looks polished and completely reflects my personal style.",
    rating: 5
  },
  {
    name: "Ben",
    role: "Tech Entrepreneur",
    content: "Super fast process with great design flexibility — highly recommend for startups!",
    rating: 5
  },
  {
    name: "Anja",
    role: "Event Organizer",
    content: "The drag-and-drop editor made it easy for me to create a professional event website in no time.",
    rating: 4
  },
  {
    name: "Noah",
    role: "Digital Nomad",
    content: "Being able to design and order my website from anywhere is a huge plus for me.",
    rating: 5
  },
  {
    name: "Sven",
    role: "Small Business Owner",
    content: "I didn't need to hire a developer or spend days figuring things out — just customize and click order.",
    rating: 4
  },
  {
    name: "Lena",
    role: "Makeup Artist",
    content: "Great templates and total freedom to tweak everything. My site finally feels like me.",
    rating: 5
  },
  {
    name: "Akira",
    role: "Game Streamer",
    content: "Designing my own site was actually fun. The platform is fast, flexible, and looks modern.",
    rating: 5
  },
  {
    name: "Val",
    role: "Author",
    content: "This service made building and ordering a personal website incredibly simple and stress-free.",
    rating: 4
  },
  {
    name: "Jonas",
    role: "Graphic Designer",
    content: "The design freedom I had on this platform was amazing — and the final product matched exactly what I created.",
    rating: 5
  },
  {
    name: "Maya",
    role: "Yoga Instructor",
    content: "I loved being able to build my own site that reflects my brand, without relying on a developer.",
    rating: 5
  },
  {
    name: "Dario",
    role: "Freelance Writer",
    content: "Everything from templates to ordering was simple and stress-free. Highly recommended!",
    rating: 4
  },
  {
    name: "Liya",
    role: "Fashion Blogger",
    content: "Being able to customize the look and feel of my site made all the difference. I love the result!",
    rating: 5
  },
  {
    name: "Julian",
    role: "Podcast Host",
    content: "Finally, a quick and easy way to launch a personal website that still looks super professional.",
    rating: 5
  },
  {
    name: "Emily",
    role: "Nonprofit Coordinator",
    content: "Our small team created a custom website for our organization in under a day. Huge time-saver.",
    rating: 4
  },
  {
    name: "Ahmad",
    role: "Real Estate Agent",
    content: "Super flexible builder. I adjusted everything to fit my brand and had a working site within hours.",
    rating: 5
  },
  {
    name: "Nora",
    role: "Interior Designer",
    content: "The customization tools are top-notch and the live preview was incredibly helpful.",
    rating: 5
  },
  {
    name: "Tim",
    role: "Music Producer",
    content: "It was refreshing to actually enjoy creating my website instead of dreading it.",
    rating: 4
  },
  {
    name: "Chloe",
    role: "Social Media Manager",
    content: "The templates are stylish and modern, but you can still make them completely your own.",
    rating: 5
  },
  {
    name: "Harun",
    role: "Teacher",
    content: "I needed a personal portfolio site quickly, and this platform delivered perfectly.",
    rating: 5
  },
  {
    name: "Sophie",
    role: "Handmade Shop Owner",
    content: "Loved the ability to preview and tweak everything live before ordering. So easy to use!",
    rating: 5
  },
  {
    name: "Max",
    role: "Software Developer",
    content: "Even though I can code, it was faster and cleaner to just build and order here.",
    rating: 4
  },
  {
    name: "Rina",
    role: "Travel Blogger",
    content: "Beautiful layouts and full customization — my website finally feels personal.",
    rating: 5
  },
  {
    name: "Alex",
    role: "Consultant",
    content: "No tech headaches, just simple design tools and a great final product.",
    rating: 5
  },
  {
    name: "Greta",
    role: "Wedding Planner",
    content: "It's rare to find a service that combines creative freedom with actual usability. This one does.",
    rating: 4
  },
  {
    name: "Oliver",
    role: "Food Critic",
    content: "Customizing my site layout and ordering was so smooth. Everything works as expected.",
    rating: 5
  },
  {
    name: "Milan",
    role: "Fitness Coach",
    content: "Looks great on mobile, easy to edit, and fast turnaround — I'm impressed.",
    rating: 5
  },
  {
    name: "Tessa",
    role: "Art Student",
    content: "This was the perfect platform to showcase my portfolio without spending a fortune.",
    rating: 5
  },
  {
    name: "Isaac",
    role: "DJ",
    content: "Finally a way to create a site that matches my style without hiring a designer.",
    rating: 4
  }
];

export const Testimonials = () => {
  const visibleCount = 3; // Wie viele Testimonials gleichzeitig sichtbar sind
  const testimonialWidth = 350; // px, sollte zu minWidth/maxWidth passen
  const totalSlides = testimonials.length;
  const extendedTestimonials = [...testimonials, ...testimonials.slice(0, visibleCount)];
  const carouselRef = useRef<HTMLDivElement>(null);

  // CSS Keyframes für kontinuierliche Animation
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes testimonial-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${testimonialWidth * totalSlides}px); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [testimonialWidth, totalSlides]);

  // Dauer der Animation (z.B. 5s pro Slide)
  const duration = totalSlides * 3.5; // 3.5s pro Slide

  return (
    <section className="relative py-12 bg-[#F8F9FF] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">What Our Customers Are Saying</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            
          </p>
        </div>
        <div className="relative w-full overflow-hidden">
          <div
            ref={carouselRef}
            className="flex"
            style={{
              width: `${extendedTestimonials.length * testimonialWidth}px`,
              animation: `testimonial-scroll ${duration}s linear infinite`,
            }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 p-8 rounded-2xl bg-white shadow-lg border border-purple-100 mx-3"
                style={{
                  width: `${testimonialWidth}px`,
                  minWidth: `${testimonialWidth}px`,
                  maxWidth: `${testimonialWidth}px`,
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-100 to-purple-200 flex items-center justify-center">
                    <span className="text-lg font-semibold text-purple-700">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-purple-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};