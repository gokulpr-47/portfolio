import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import useEmblaCarousel from "embla-carousel-react";
import { Karla, Prompt } from "next/font/google";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const prompt = Prompt({ weight: "600", subsets: ["latin"] });
const prompt_light = Prompt({ weight: "400", subsets: ["latin"] });
const karla = Karla({ weight: "200", subsets: ["latin"] });

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  // Debug logging
  console.log("EmblaCarousel rendered with:", {
    slides,
    options,
    selectedIndex,
    scrollSnaps,
  });

  // Check if loop is enabled
  React.useEffect(() => {
    if (emblaApi) {
      console.log("Carousel initialized with options:", options);
      console.log("Loop enabled:", options?.loop);
      console.log("Total slides:", emblaApi.slideNodes().length);
      console.log("Can scroll next:", emblaApi.canScrollNext());
      console.log("Can scroll prev:", emblaApi.canScrollPrev());
    }
  }, [emblaApi, options]);

  // Auto-scroll functionality with infinite loop
  React.useEffect(() => {
    if (!emblaApi) return;

    let autoScroll: NodeJS.Timeout;
    let isPaused = false;

    const startAutoScroll = () => {
      autoScroll = setInterval(() => {
        if (!isPaused && emblaApi) {
          const currentIndex = emblaApi.selectedScrollSnap();
          const totalSlides = emblaApi.slideNodes().length;
          console.log(`Current slide: ${currentIndex + 1}/${totalSlides}`);
          console.log("Can scroll next:", emblaApi.canScrollNext());

          if (emblaApi.canScrollNext()) {
            emblaApi.scrollNext();
          } else {
            // If we can't scroll next, try to scroll to the first slide
            console.log(
              "Cannot scroll next, attempting to loop to first slide"
            );
            emblaApi.scrollTo(0);
          }

          // Log the new index after scrolling
          setTimeout(() => {
            const newIndex = emblaApi.selectedScrollSnap();
            console.log(`Scrolled to slide: ${newIndex + 1}/${totalSlides}`);
          }, 100);
        }
      }, 4000); // Auto-scroll every 4 seconds
    };

    const pauseAutoScroll = () => {
      console.log("Auto-scroll paused");
      isPaused = true;
    };

    const resumeAutoScroll = () => {
      console.log("Auto-scroll resumed");
      isPaused = false;
    };

    // Start auto-scroll after a brief delay
    const startDelay = setTimeout(() => {
      startAutoScroll();
    }, 1000);

    // Pause on user interaction
    emblaApi.on("pointerDown", pauseAutoScroll);
    emblaApi.on("pointerUp", resumeAutoScroll);
    emblaApi.on("select", () => {
      const currentIndex = emblaApi.selectedScrollSnap();
      const totalSlides = emblaApi.slideNodes().length;
      console.log(`Slide selected: ${currentIndex + 1}/${totalSlides}`);

      // Brief pause when slide changes
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
      }, 1000);
    });

    return () => {
      clearTimeout(startDelay);
      clearInterval(autoScroll);
      if (emblaApi) {
        emblaApi.off("pointerDown", pauseAutoScroll);
        emblaApi.off("pointerUp", resumeAutoScroll);
      }
    };
  }, [emblaApi]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <div
                  className={`shadow-custom w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto min-h-[200px] rounded-2xl px-4 sm:px-8 md:px-10 py-6 sm:py-8 flex flex-col justify-evenly border transition-all duration-300 ${
                    index === selectedIndex
                      ? "bg-blue-500/20 backdrop-blur-sm border-blue-400/40 shadow-lg shadow-blue-500/25"
                      : "bg-white/10 backdrop-blur-sm border-white/20"
                  }`}
                >
                  <div className={`card-header ${prompt.className} text-white`}>
                    <h1 className="text-lg font-bold">
                      {index === selectedIndex ? "⭐ " : ""}Job Position{" "}
                      {index + 1}
                    </h1>
                    <h1 className="text-lg font-bold">Company Name</h1>
                  </div>

                  <div
                    className={`timeline ${karla.className} tracking-wider text-blue-300`}
                  >
                    <p>DATA STARTED - PRESENT</p>
                  </div>

                  <div className={`card-body ${prompt_light.className}`}>
                    <ul className="list-disc text-xs text-white/80">
                      <li>
                        Leverage agile frameworks to provide a robust synopsis
                        for high level overviews.
                      </li>
                      <li>
                        Iterative approaches to corporate strategy foster.
                      </li>
                      <li>
                        <p>
                          Bring to the table win-win survival strategies to
                          ensure proactive domination.
                        </p>
                      </li>
                      <li>
                        At the end of the day, going forward, a new normal that
                        has evolved.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
