export const deleteFile = async ({ filename }: { filename: string }) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_UPLOAD_URL ?? "http://localhost:3000/api/upload";
  const res = await fetch(baseUrl + "/delete?filename=" + filename, {
    method: "DELETE",
  });
  const data: { filename: string } = await res.json();
  return data.filename;
};
