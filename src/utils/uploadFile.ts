export const uploadFile = async ({
  values,
  fileFieldName,
}: {
  values: any;
  fileFieldName: string;
}) => {
  const files = values[fileFieldName];

  const formData = new FormData();
  formData.append("file", files[0] as any);
  const res = await fetch(
    process.env.NEXT_PUBLIC_UPLOAD_URL ?? "http://localhost:3000/api/upload1",
    {
      method: "POST",
      body: formData,
    }
  );
  const data: { filename: string } = await res.json();
  return data.filename;
};
