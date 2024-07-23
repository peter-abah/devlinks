import PreviewFrame from "./phone-preview/preview-frame";

export default function PhonePreview() {
  return (
    <div className="p-6 w-full hidden lg:grid max-w-[40%] xl:max-w-[560px] bg-white rounded-xl place-items-center">
      <PreviewFrame />
    </div>
  );
}
