import { ComponentConfig } from "@measured/puck";

interface ProductDescriptionProps {
  description: string;
}

function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <div className="mb-8">
      <p className="text-slate-400 text-lg leading-relaxed">{description}</p>
    </div>
  );
}

export const productDescriptionConfig: ComponentConfig<ProductDescriptionProps> = {
  fields: {
    description: {
      type: "textarea",
    },
  },
  defaultProps: {
    description: "This is a breif course description for this course asldkja laksj laj laksd akladsd.",
  },
  render: ({ description }) => <ProductDescription description={description} />,
};
