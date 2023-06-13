const download = (url, fileName) => {
  const link = document.createElement("a");
  link.download = fileName;
  link.style.display = "none";
  link.href = url;
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
};

export default download;
