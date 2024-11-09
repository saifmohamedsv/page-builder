import { ComponentConfig } from "@measured/puck";
import ClockIcon from "../../../assets/video-time.svg";

interface Option {
  value: string;
  label: string;
}

interface InsightsProps {
  stats: Option[];
}

function StatCard({ value, label }: Option) {
  return (
    <div className="bg-white rounded-md border border-gray-100 p-4 flex flex-col items-start shadow-sm">
      <div className="flex items-center mb-2 w-full">
        <div className={`flex items-center justify-center rounded-full bg-indigo-50 p-1 mr-3 w-9 h-9`}>
          <img src={ClockIcon} className="w-5 h-5" />
        </div>
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <p className="text-gray-500 text-xs sm:text-sm">{label}</p>
    </div>
  );
}

function ProductInsights({ stats }: InsightsProps) {
  return (
    <div className="py-8">
      <h2 className="text-xl font-bold mb-6">Numbers that tells our story</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
}

export const productInsightsConfig: ComponentConfig<InsightsProps> = {
  fields: {
    stats: {
      type: "array",
      arrayFields: {
        label: {
          type: "text",
        },
        value: {
          type: "text",
        },
      },
    },
  },
  defaultProps: {
    stats: [
      { label: "Dwonloads in the last month", value: "+1200" },
      { label: "Registered Users", value: "+2400" },
      { label: "Got a job", value: "+1200" },
      { label: "Hours of experience", value: "+1200" },
      { label: "Course", value: "+1200" },
      { label: "Hours to complete the course", value: "+1200" },
    ],
  },
  render: ({ stats }) => <ProductInsights stats={stats} />,
};
