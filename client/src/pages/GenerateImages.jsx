import React, { useState } from "react";
import { Image, Sparkles } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import axios from "axios";

const GenerateImages = () => {
  const style = [
    { text: "Realistic Style" },
    { text: "Ghibli Style" },
    { text: "Anime Style" },
    { text: "Cartoon Style" },
    { text: "Fantasy Style" },
    { text: "3D Style" },
    { text: "Portrait Style" },
  ];

  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

  const [selectedStyle, setSelectedStyle] = useState(style[0]);
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Give an image of ${input} with ${selectedStyle.text}`;
      const { data } = await axios.post(
        "/api/ai/generate-image",
        {
          prompt,
          publish,
        },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 text-[#00AD25]" />
            <h1 className="text-xl font-semibold">AI Image Generation</h1>
          </div>
          <p className="mt-6 text-sm font-medium">Describe your Image</p>

          <textarea
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            value={input}
            className="w-full p-2 px-3 mt-2 h-40 outline-none text-sm rounded-md border border-gray-300"
            placeholder="Give an image of apple falling on Issac Newton"
            required
          />
          <p className="mt-4 text-sm font-medium">Style</p>
          <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
            {style.map((item, index) => {
              return (
                <span
                  key={index}
                  onClick={() => setSelectedStyle(item)}
                  className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                    selectedStyle.text === item.text
                      ? "bg-green-100 text-green-700"
                      : "text-gray-500 border-gray-300"
                  }`}
                >
                  {item.text}
                </span>
              );
            })}
          </div>
          <div className="my-6 flex items-center gap-2">
            <label className="relative cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) => setPublish(e.target.checked)}
                checked={publish}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>
              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
            </label>
            <p className="text-sm">Make this image Public</p>
          </div>

          <button
            disabled={loading}
            className="flex w-full justify-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 mt-6 text-sm rounded-lg cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Image className="w-5" />
            )}
            Genearte Image
          </button>
        </form>
        <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h[600px]">
          <div className="flex items-center gap-3">
            <Image className="w-5 h-5 text-[#00AD25]" />
            <h1 className="text-xl font-semibold">Generated Image</h1>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <Image className="w-9 h-9" />
                <p>
                  Describe an Image and click "Generate Image" to get started
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-3 h-full">
              <img
                src={content}
                alt="image generated"
                className="w-full h-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;
