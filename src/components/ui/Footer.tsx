import React from "react";
import { Text } from "./Text";

export function Footer() {
  return (
    <footer className="mt-24 pt-16 pb-8 text-center border-t-4 border-black w-full">
      <div className="max-w-4xl mx-auto px-6">
        <Text variant="p" className="font-bold text-black">
          @sophorndara
        </Text>
      </div>
    </footer>
  );
}
