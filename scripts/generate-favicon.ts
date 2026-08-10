import sharp from "sharp";
import { resolve } from "path";

const inputPath = resolve(__dirname, "../public/accounts/official.png");
const outputPath = resolve(__dirname, "../app/favicon.ico");

async function generateFavicon() {
  // Create multiple sizes for the ICO file
  const sizes = [16, 32, 48];

  const buffers = await Promise.all(
    sizes.map((size) =>
      sharp(inputPath)
        .resize(size, size, { fit: "cover", position: "center" })
        .png()
        .toBuffer()
    )
  );

  // Create ICO file manually
  // ICO header: 6 bytes
  // Each image entry: 16 bytes
  // Image data: PNG buffers

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type: ICO
  header.writeUInt16LE(sizes.length, 4); // Number of images

  let dataOffset = 6 + sizes.length * 16; // Header + entries

  const entries: Buffer[] = [];
  const imageData: Buffer[] = [];

  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i];
    const buffer = buffers[i];

    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // Width
    entry.writeUInt8(size === 256 ? 0 : size, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // Image data size
    entry.writeUInt32LE(dataOffset, 12); // Image data offset

    entries.push(entry);
    imageData.push(buffer);

    dataOffset += buffer.length;
  }

  const ico = Buffer.concat([header, ...entries, ...imageData]);

  const { writeFileSync } = await import("fs");
  writeFileSync(outputPath, ico);

  console.log(`✅ Favicon generated: ${outputPath}`);
  console.log(`   Sizes: ${sizes.join(", ")}`);
  console.log(`   Total size: ${ico.length} bytes`);
}

generateFavicon().catch(console.error);
