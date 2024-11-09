import { ComponentConfig } from "@measured/puck";

interface HeadingProps {
  title: string;
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

function HeadingComponent({ title, level: Tag, className }: HeadingProps) {
  return <Tag className={className}>{title}</Tag>;
}

export const headingConfig: ComponentConfig<HeadingProps> = {
  fields: {
    title: { type: "text" },
    level: {
      type: "select",
      options: [
        {
          label: "h1",
          value: "h1",
        },
        {
          label: "h2",
          value: "h2",
        },
      ],
    },
    className: { type: "text" },
  },
  defaultProps: {
    title: "Default Heading",
    level: "h2",
    className: "text-2xl font-bold",
  },
  render: ({ title, level, className }) => <HeadingComponent className={className} title={title} level={level} />,
};
