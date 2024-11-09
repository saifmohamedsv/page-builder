import { useState } from "react";
import { Puck, Data, Render } from "@measured/puck";
import { puckConfig } from "../lib/puck/config";

const initialData: Data = {
  content: [
    {
      type: "ProductCarousel",
      props: {
        id: "ProductCarouselId",
        images: [
          { url: "https://picsum.photos/800/600?random=1" },
          { url: "https://picsum.photos/800/600?random=2" },
          { url: "https://picsum.photos/800/600?random=3" },
        ],
        alt: "Product Image",
        isBestseller: false,
        aspectRatio: "16:9",
      },
    },
    {
      type: "ProductStatistics",
      props: {
        id: "ProductStatisticslId",
        stats: [
          { label: "Dwonloads in the last month", value: "+1200" },
          { label: "Registered Users", value: "+2400" },
          { label: "Got a job", value: "+1200" },
          { label: "Hours of experience", value: "+1200" },
          { label: "Course", value: "+1200" },
          { label: "Hours to complete the course", value: "+1200" },
        ],
      },
    },
    {
      type: "ProductDescritpion",
      props: {
        id: "ProductDescritpionlId",
        description: "This is a breif course description for this course asldkja laksj laj laksd akladsd.",
      },
    },
    {
      type: "ProductObjectives",
      props: {
        id: "ProductObjectiveslId",
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
    },
    {
      type: "ProductStudentSuccess",
      props: {
        id: "ProductStudentSuccessId",
        title: "Student Success",
      },
    },
  ],
  root: {},
};

export default function EditorPage() {
  const [data, setData] = useState<Data>(initialData);
  const [showPreview, setShowPreview] = useState(false);

  const handlePublish = async (newData: Data) => {
    setData(newData);
    setShowPreview(true);
  };

  if (showPreview) {
    return (
      <div className="min-h-screen">
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setShowPreview(false)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Editor
          </button>
        </div>
        <div className="max-w-3xl p-4 m-auto flex flex-col gap-4">
          <Render data={data} config={puckConfig} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <Puck config={puckConfig} data={data} onPublish={handlePublish} />
    </div>
  );
}
