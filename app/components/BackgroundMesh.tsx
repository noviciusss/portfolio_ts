"use client";

export default function BackgroundMesh() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]" />
        <div className="absolute left-80 right-0 top-80 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]" />
        <div className="absolute left-20 right-0 top-60 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-400 opacity-20 blur-[100px]" />
      </div>
    </div>
  );
}