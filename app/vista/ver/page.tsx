"use client";
import grapesjs from "grapesjs";
import React, { useEffect } from "react";

export default function page() {
  useEffect(() => {
    const editor = grapesjs.init({
      container: '',
      fromElement: true,
      height: "100%",
      
      storageManager: {
        type: "local",
        autosave: true,
        autoload: true,
        stepsBeforeSave: 1,
        options: {
          local: {
            key: "gjsProject",
          },
        },
      },
    });
    const html = editor.getHtml();
    console.log(html);
  }, []);

  // Para obtener el HTML
  return <div></div>;
}
