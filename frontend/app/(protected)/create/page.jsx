"use client";
import React, { useState } from "react";
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

function page() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ caption, image });
  };
  return (
    <div className="p-6 w-full">
      <h1 className=" text-2xl font-web3 font-bold mb-4">Create Post</h1>
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
              onChange={(e) => setCaption(e.target.value)}
              className="mb-4"
            />

            <CardTitle className="text-xl mt-4">Image</CardTitle>
            <CardDescription className="text-xs mb-4">
              Upload an image for your post.
            </CardDescription>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="mb-4"
            />

            <CardFooter className="border-t p-0  py-4">
              <Button type="submit" className="mt-4">
                Post Now
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default page;
