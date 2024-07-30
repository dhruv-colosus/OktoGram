import React from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import Link from "next/link";

function RightBar() {
  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <Link href="/create">
            <div className="flex flex-col items-center gap-1 text-center p-4">
              <h3 className="text-lg font-bold tracking-tight text-foreground ">
                Create a Post
              </h3>
              <ImagePlus className="mb-4 mt-4 cursor-pointer" />

              <p className="text-xs text-muted-foreground">
                Create Posts or Giveaways to share with your followers
              </p>
            </div>
          </Link>
        </div>
      </main>
    </>
  );
}

export default RightBar;
