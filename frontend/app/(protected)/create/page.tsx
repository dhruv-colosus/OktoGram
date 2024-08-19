"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createGiveaway } from "@/actions/post";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createPost } from "@/lib/contract";

function Page() {
  const [caption, setCaption] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [nooflikes, setNooflikes] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuthStore();

  const handleCaptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };
  const handleLikeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNooflikes(Number(e.target.value));
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      // @ts-ignore
      setImages(fileList);
    }
  };
  //@ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    if (!user) {
      setError("User not logged in");
      setIsLoading(false);
      return;
    }

    try {
      const encodedImages = await Promise.all(
        images.map((file) => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        })
      );
      var postId;
      if (nooflikes) {
        postId = await createGiveaway(
          caption,
          user.user_id,
          encodedImages,
          nooflikes
        );
        toast.success("Giveaway has been created.");
      } else {
        await createPost(
          caption,
          "https://www.ie.edu/insights/wp-content/uploads/2022/01/San-Jose-Feature.jpg"
        );
        // postId = await createPost(caption, user.user_id, encodedImages);
        toast.success("Post has been created.");
      }

      console.log("Post created with ID:", postId);
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again.");

      setError("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
      // router.push("/");
    }

    console.log({ caption, images });
  };
  return (
    <div className="p-6 w-full">
      <h1 className=" text-2xl font-web3 font-bold mb-4">Create Post</h1>
      <Tabs defaultValue="post">
        <TabsList>
          <TabsTrigger value="post">Post</TabsTrigger>
          <TabsTrigger value="giveaway">Giveaway</TabsTrigger>
        </TabsList>
        <TabsContent value="post">
          <Card x-chunk="dashboard-04-chunk-1" className="w-full">
            {/* <CardHeader>
          <CardTitle className="text-xl">Caption</CardTitle>
          <CardDescription className="text-xs">
            Used as a description for your post.
          </CardDescription>
        </CardHeader> */}
            <CardContent className="mt-4">
              <form onSubmit={handleSubmit}>
                <CardTitle className="text-xl">Caption</CardTitle>
                <CardDescription className="text-xs mb-4">
                  Used as a description for your post.
                </CardDescription>
                <Textarea
                  placeholder="Type your Caption here."
                  name="caption"
                  value={caption}
                  onChange={handleCaptionChange}
                  className="mb-4"
                />

                <CardTitle className="text-xl mt-4">Image</CardTitle>
                <CardDescription className="text-xs mb-4">
                  Upload an image for your post.
                </CardDescription>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-4"
                />

                <CardFooter className="border-t p-0  py-4">
                  <Button type="submit" className="mt-4" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Post Now"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="giveaway">
          <Card x-chunk="dashboard-04-chunk-1" className="w-full">
            <CardContent className="mt-4">
              <form onSubmit={handleSubmit}>
                <CardTitle className="text-xl">Caption</CardTitle>
                <CardDescription className="text-xs mb-4">
                  Used as a description for your post.
                </CardDescription>
                <Textarea
                  placeholder="Type your Caption here."
                  name="caption"
                  value={caption}
                  onChange={handleCaptionChange}
                  className="mb-4"
                />

                <CardTitle className="text-xl mt-4">Image</CardTitle>
                <CardDescription className="text-xs mb-4">
                  Upload an image for your post.
                </CardDescription>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-4"
                />

                <CardTitle className="text-xl mt-4">Target Likes</CardTitle>
                <CardDescription className="text-xs mb-4">
                  At how many likes the giveaway should occur
                </CardDescription>
                <Input
                  type="number"
                  className="mb-4"
                  onChange={handleLikeChange}
                  value={nooflikes}
                />

                <CardFooter className="border-t p-0  py-4">
                  <Button type="submit" className="mt-4" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Post Now"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Page;
