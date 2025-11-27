import { Layout } from "@/components/layout/Layout";
import { usePortfolio } from "@/context/PortfolioContext";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Camera, Palette, Monitor, Aperture } from "lucide-react";

const Skills = () => {
  const { photographer } = usePortfolio();

  if (!photographer) return null;

  const items = [
    {
      title: "Portrait Photography",
      description: "Capturing the essence of individuals through lighting and composition.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />,
      icon: <Camera className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-2",
    },
    {
      title: "Photo Editing",
      description: "Professional retouching and color grading using industry standard tools.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />,
      icon: <Palette className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Technical Skills",
      description: "Adobe Lightroom, Photoshop, Capture One, and more.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />,
      icon: <Monitor className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Event Coverage",
      description: "Documenting moments as they happen with a documentary approach.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />,
      icon: <Aperture className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-2",
    },



  ];

  return (
    <Layout>
      <div className="w-full h-full flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-8 text-center">Skills & Expertise</h1>
        <BentoGrid className="w-full">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </div>
    </Layout>
  );
};

export default Skills;
