import { useState } from "react";
import { Puck, Data, Render } from "@measured/puck";
import { puckConfig } from "../lib/puck/config";

const initialData: Data = {
  content: [],
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
        <div className="max-w-xl p-4 m-auto flex flex-col gap-12">
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
