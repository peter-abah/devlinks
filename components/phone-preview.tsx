import PreviewFrame from "./phone-preview/preview-frame";

export default function PhonePreview() {
  return (
    <div className="p-6 w-full max-w-[560px] bg-white rounded-xl grid place-items-center">
      <PreviewFrame />
    </div>
  );
}
