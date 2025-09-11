"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Page = ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = use(params);
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestionLoading, setSuggestionLoading] = useState<boolean>(false);
  const [randomSuggestion, setRandomSuggestion] = useState<string[]>([]);

  const suggestions = [
    "Enhance your teaching skills",
    "Learn new languages",
    "Improve your communication skills",
    "Develop your leadership skills",
    "Enhance your problem solving skills",
    "Improve your time management skills",
    "Enhance your decision making skills",
    "Improve your emotional intelligence",
    "Enhance your creativity",
    "Improve your critical thinking skills",
    "Enhance your problem solving skills",
    "Improve your time management skills",
    "Enhance your decision making skills",
    "Improve your emotional intelligence",
    "Enhance your creativity",
    "Improve your critical thinking skills",
    "Enhance your problem solving skills",
    "Improve your time management skills",
    "Enhance your decision making skills",
  ];

  const handleSendMessage = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/send-message", {
        username,
        content,
      });

      setContent("");
      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse<null>>;
      toast.error(
        axiosError.response?.data.message || "Failed to send message"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestMessages = async () => {
    setSuggestionLoading(true);
    try {
      // const response = await axios.post('/api/suggest-messages')
      // console.log(response.data)
      const random1 = suggestions[Math.floor(Math.random() * suggestions.length)];
      const random2 = suggestions[Math.floor(Math.random() * suggestions.length)];
      const random3 = suggestions[Math.floor(Math.random() * suggestions.length)];
      const randomSuggestion = [random1, random2, random3];
      setRandomSuggestion(randomSuggestion);

    } catch (error) {
      toast.error("Failed to suggest messages")
      // const axiosError = error as AxiosError<ApiResponse<null>>
      // toast.error(axiosError.response?.data.message || "Failed to suggest messages")
    } finally {
      setSuggestionLoading(false);
    }
  };

  useEffect(()=>{
    handleSuggestMessages();
  }, [])

  const handleSelectSuggestion = (suggestion: string)=>{
    setContent(suggestion);
    toast.success("Suggestion selected")
  }

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto py-6 px-20 bg-white rounded w-full max-w-6xl">
      <h1 className="text-center text-4xl font-bold mt-12 mb-12">
        Public Profile Link
      </h1>

      <h1 className=" mx-auto font-semibold mb-1">
        Send Anonymous message to @{username}
      </h1>
      <div className="flex flex-col items-center gap-4">
        <Input
          className="py-6 mx-auto"
          type="text"
          placeholder="Write your anonymous message here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button className="cursor-pointer" onClick={handleSendMessage}>
          {isLoading ? <Loader2 className="animate-spin" /> : "Send It"}
        </Button>
      </div>

      <div className="SuggestMessages mt-14">
        <Button className="cursor-pointer mb-5" onClick={handleSuggestMessages}>
          {suggestionLoading ? <Loader2 className="animate-spin" /> : "Suggest Messages"}
        </Button>
        <h1>Click on any message below to select it.</h1>
        <div className="buttons mt-4 border rounded-md py-6 px-8">
          <h1 className="text-2xl font-bold mb-3">Messages</h1>
          <div className="flex flex-col gap-5 justify-center items-center">
            {randomSuggestion?.map((suggestion, index) => {
              return (
                  <Button key={index} onClick={()=>handleSelectSuggestion(suggestion)} className="bg-transparent truncate text-black w-full border-2 cursor-pointer hover:bg-gray-100">
                    {suggestion}
                  </Button>

              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
