import React from "react";

export default function FormTitle({ text = "Form Title" }) {
  return (
    <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] text-center md:text-start">
      {text}
    </h3>
  );
}
