import { ComponentConfig } from "@measured/puck";

type Props = {
  objectives: { text: string }[] | null;
};

function ProductObjectives({ objectives }: Props) {
  if (!objectives || objectives.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-semibold mb-4">What you will learn in this course</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {objectives.map((objective, index) => (
          <div key={index} className="flex items-center gap-4">
            <p>✅</p>
            <p className="text-sm md:text-base text-gray-600">{objective.text}</p>
          </div>
        ))}
      </div>
      <a href="#" className="text-primary-500 text-md mt-4 block">
        Read More
      </a>
    </div>
  );
}

export const productObjectivesConfig: ComponentConfig<Props> = {
  fields: {
    objectives: {
      type: "array",
      arrayFields: {
        text: {
          type: "text",
        },
      },
    },
  },
  defaultProps: {
    objectives: [
      { text: "First Objective" },
      { text: "Second Objective" },
      { text: "Third Objective" },
      { text: "Foruth Objective" },
      { text: "Fifth Objective" },
      { text: "Sizth Objective" },
      { text: "Seveth Objective" },
      { text: "Eigths Objective" },
      { text: "Ninth Objective" },
    ],
  },
  render: ({ objectives }) => <ProductObjectives objectives={objectives} />,
};
