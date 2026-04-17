import '@vercel/routing-utils';
import nodePath from 'node:path';
import colors from 'piccolore';
import { parse as parse$1, stringify as stringify$1, unflatten as unflatten$1 } from 'devalue';
import 'es-module-lexer';
import { r as removeTrailingForwardSlash, R as ROUTE_TYPE_HEADER, a as REROUTE_DIRECTIVE_HEADER, s as shouldAppendForwardSlash, b as appendForwardSlash, A as AstroError, i as i18nNoLocaleFoundInPath, c as ResponseSentError, p as pipelineSymbol, d as ActionNotFoundError, e as REDIRECT_STATUS_CODES, f as ActionsReturnedInvalidDataError, E as EndpointDidNotReturnAResponse, g as REROUTABLE_STATUS_CODES, M as MissingMediaQueryDirective, N as NoMatchingImport, h as escapeHTML, j as isHeadAndContent, k as isRenderTemplateResult, O as OnlyResponseCanBeReturned, l as isPromise, m as promiseWithResolvers, n as encoder, o as chunkToByteArray, q as chunkToString, t as chunkToByteArrayOrString, u as toAttributeString, v as markHTMLString, w as renderSlotToString, x as maybeRenderHead, y as containsServerDirective, z as isAstroComponentFactory, F as Fragment, B as renderSlots, S as ServerIslandComponent, C as createAstroComponentInstance, D as Renderer, G as NoMatchingRenderer, H as formatList, I as NoClientOnlyHint, J as internalSpreadAttributes, K as voidElementNames, L as renderTemplate, P as createRenderInstruction, Q as renderElement$1, T as SlotString, U as mergeSlotInstructions, V as HTMLString, W as isHTMLString, X as isRenderInstruction, Y as isAstroComponentInstance, Z as isAPropagatingComponent, _ as isRenderInstance, $ as renderCspContent, a0 as isNode, a1 as isDeno, a2 as addAttribute, a3 as MiddlewareNoDataOrNextCalled, a4 as MiddlewareNotAResponse, a5 as CacheNotEnabled, a6 as defineMiddleware, a7 as NOOP_MIDDLEWARE_HEADER, a8 as decryptString, a9 as createSlotValueFromString, aa as DEFAULT_404_COMPONENT, ab as DEFAULT_404_ROUTE, ac as default404Instance, ad as decodeKey, ae as RouteCache, af as sequence, ag as ReservedSlotName, ah as getRouteGenerator, ai as isRoute404, aj as isRoute500, ak as removeLeadingForwardSlash, al as SessionStorageInitError, am as SessionStorageSaveError, an as getParams, ao as collapseDuplicateSlashes, ap as setOriginPathname, aq as getProps, ar as ForbiddenRewrite, as as copyRequest, at as ASTRO_GENERATOR, au as getOriginPathname, av as LocalsReassigned, aw as generateCspDigest, ax as PrerenderClientAddressNotAvailable, ay as ClientAddressNotAvailable, az as StaticClientAddressNotAvailable, aA as REWRITE_DIRECTIVE_HEADER_KEY, aB as REWRITE_DIRECTIVE_HEADER_VALUE, aC as AstroResponseHeadersReassigned, aD as responseSentSymbol$1, aE as prependForwardSlash, aF as collapseDuplicateLeadingSlashes, aG as joinPaths, aH as isInternalPath, aI as collapseDuplicateTrailingSlashes, aJ as hasFileExtension, aK as LocalsNotAnObject, aL as routeHasHtmlExtension, aM as clientAddressSymbol, aN as fileExtension, aO as slash, aP as routeIsRedirect, aQ as routeIsFallback, aR as getFallbackRoute, aS as findRouteToRewrite } from './sequence_D8ekMvs6.mjs';
import { clsx } from 'clsx';
import { serialize, parse } from 'cookie';
import { createStorage } from 'unstorage';

function matchPattern(url, remotePattern) {
  return matchProtocol(url, remotePattern.protocol) && matchHostname(url, remotePattern.hostname, true) && matchPort(url, remotePattern.port) && matchPathname(url, remotePattern.pathname, true);
}
function matchPort(url, port) {
  return !port || port === url.port;
}
function matchProtocol(url, protocol) {
  return !protocol || protocol === url.protocol.slice(0, -1);
}
function matchHostname(url, hostname, allowWildcard = false) {
  if (!hostname) {
    return true;
  } else if (!allowWildcard || !hostname.startsWith("*")) {
    return hostname === url.hostname;
  } else if (hostname.startsWith("**.")) {
    const slicedHostname = hostname.slice(2);
    return slicedHostname !== url.hostname && url.hostname.endsWith(slicedHostname);
  } else if (hostname.startsWith("*.")) {
    const slicedHostname = hostname.slice(1);
    if (!url.hostname.endsWith(slicedHostname)) {
      return false;
    }
    const subdomainWithDot = url.hostname.slice(0, -(slicedHostname.length - 1));
    return subdomainWithDot.endsWith(".") && !subdomainWithDot.slice(0, -1).includes(".");
  }
  return false;
}
function matchPathname(url, pathname, allowWildcard = false) {
  if (!pathname) {
    return true;
  } else if (!allowWildcard || !pathname.endsWith("*")) {
    return pathname === url.pathname;
  } else if (pathname.endsWith("/**")) {
    const slicedPathname = pathname.slice(0, -2);
    return slicedPathname !== url.pathname && url.pathname.startsWith(slicedPathname);
  } else if (pathname.endsWith("/*")) {
    const slicedPathname = pathname.slice(0, -1);
    if (!url.pathname.startsWith(slicedPathname)) {
      return false;
    }
    const additionalPathChunks = url.pathname.slice(slicedPathname.length).split("/").filter(Boolean);
    return additionalPathChunks.length === 1;
  }
  return false;
}
function isRemoteAllowed(src, {
  domains,
  remotePatterns
}) {
  if (!URL.canParse(src)) {
    return false;
  }
  const url = new URL(src);
  if (!["http:", "https:", "data:"].includes(url.protocol)) {
    return false;
  }
  return domains.some((domain) => matchHostname(url, domain)) || remotePatterns.some((remotePattern) => matchPattern(url, remotePattern));
}

const decoder = new TextDecoder();
const toUTF8String = (input, start = 0, end = input.length) => decoder.decode(input.slice(start, end));
const toHexString = (input, start = 0, end = input.length) => input.slice(start, end).reduce((memo, i) => memo + `0${i.toString(16)}`.slice(-2), "");
const getView = (input, offset) => new DataView(input.buffer, input.byteOffset + offset);
const readInt16LE = (input, offset = 0) => getView(input, offset).getInt16(0, true);
const readUInt16BE = (input, offset = 0) => getView(input, offset).getUint16(0, false);
const readUInt16LE = (input, offset = 0) => getView(input, offset).getUint16(0, true);
const readUInt24LE = (input, offset = 0) => {
  const view = getView(input, offset);
  return view.getUint16(0, true) + (view.getUint8(2) << 16);
};
const readInt32LE = (input, offset = 0) => getView(input, offset).getInt32(0, true);
const readUInt32BE = (input, offset = 0) => getView(input, offset).getUint32(0, false);
const readUInt32LE = (input, offset = 0) => getView(input, offset).getUint32(0, true);
const readUInt64 = (input, offset, isBigEndian) => getView(input, offset).getBigUint64(0, !isBigEndian);
const methods = {
  readUInt16BE,
  readUInt16LE,
  readUInt32BE,
  readUInt32LE
};
function readUInt(input, bits, offset = 0, isBigEndian = false) {
  const endian = isBigEndian ? "BE" : "LE";
  const methodName = `readUInt${bits}${endian}`;
  return methods[methodName](input, offset);
}
function readBox(input, offset) {
  if (input.length - offset < 4) return;
  const boxSize = readUInt32BE(input, offset);
  if (input.length - offset < boxSize) return;
  return {
    name: toUTF8String(input, 4 + offset, 8 + offset),
    offset,
    size: boxSize
  };
}
function findBox(input, boxName, currentOffset) {
  while (currentOffset < input.length) {
    const box = readBox(input, currentOffset);
    if (!box) break;
    if (box.name === boxName) return box;
    currentOffset += box.size > 0 ? box.size : 8;
  }
}

const BMP = {
  validate: (input) => toUTF8String(input, 0, 2) === "BM",
  calculate: (input) => ({
    height: Math.abs(readInt32LE(input, 22)),
    width: readUInt32LE(input, 18)
  })
};

const TYPE_ICON = 1;
const SIZE_HEADER$1 = 2 + 2 + 2;
const SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4;
function getSizeFromOffset(input, offset) {
  const value = input[offset];
  return value === 0 ? 256 : value;
}
function getImageSize$1(input, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(input, offset + 1),
    width: getSizeFromOffset(input, offset)
  };
}
const ICO = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_ICON;
  },
  calculate(input) {
    const nbImages = readUInt16LE(input, 4);
    const imageSize = getImageSize$1(input, 0);
    if (nbImages === 1) return imageSize;
    const images = [];
    for (let imageIndex = 0; imageIndex < nbImages; imageIndex += 1) {
      images.push(getImageSize$1(input, imageIndex));
    }
    return {
      width: imageSize.width,
      height: imageSize.height,
      images
    };
  }
};

const TYPE_CURSOR = 2;
const CUR = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_CURSOR;
  },
  calculate: (input) => ICO.calculate(input)
};

const DDS = {
  validate: (input) => readUInt32LE(input, 0) === 542327876,
  calculate: (input) => ({
    height: readUInt32LE(input, 12),
    width: readUInt32LE(input, 16)
  })
};

const gifRegexp = /^GIF8[79]a/;
const GIF = {
  validate: (input) => gifRegexp.test(toUTF8String(input, 0, 6)),
  calculate: (input) => ({
    height: readUInt16LE(input, 8),
    width: readUInt16LE(input, 6)
  })
};

const brandMap = {
  avif: "avif",
  avis: "avif",
  // avif-sequence
  mif1: "heif",
  msf1: "heif",
  // heif-sequence
  heic: "heic",
  heix: "heic",
  hevc: "heic",
  // heic-sequence
  hevx: "heic"
  // heic-sequence
};
function detectType(input, start, end) {
  let hasAvif = false;
  let hasHeic = false;
  let hasHeif = false;
  for (let i = start; i <= end; i += 4) {
    const brand = toUTF8String(input, i, i + 4);
    if (brand === "avif" || brand === "avis") hasAvif = true;
    else if (brand === "heic" || brand === "heix" || brand === "hevc" || brand === "hevx") hasHeic = true;
    else if (brand === "mif1" || brand === "msf1") hasHeif = true;
  }
  if (hasAvif) return "avif";
  if (hasHeic) return "heic";
  if (hasHeif) return "heif";
}
const HEIF = {
  validate(input) {
    const boxType = toUTF8String(input, 4, 8);
    if (boxType !== "ftyp") return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox) return false;
    const brand = toUTF8String(input, ftypBox.offset + 8, ftypBox.offset + 12);
    return brand in brandMap;
  },
  calculate(input) {
    const metaBox = findBox(input, "meta", 0);
    const iprpBox = metaBox && findBox(input, "iprp", metaBox.offset + 12);
    const ipcoBox = iprpBox && findBox(input, "ipco", iprpBox.offset + 8);
    if (!ipcoBox) {
      throw new TypeError("Invalid HEIF, no ipco box found");
    }
    const type = detectType(input, 8, metaBox.offset);
    const images = [];
    let currentOffset = ipcoBox.offset + 8;
    while (currentOffset < ipcoBox.offset + ipcoBox.size) {
      const ispeBox = findBox(input, "ispe", currentOffset);
      if (!ispeBox) break;
      const rawWidth = readUInt32BE(input, ispeBox.offset + 12);
      const rawHeight = readUInt32BE(input, ispeBox.offset + 16);
      const clapBox = findBox(input, "clap", currentOffset);
      let width = rawWidth;
      let height = rawHeight;
      if (clapBox && clapBox.offset < ipcoBox.offset + ipcoBox.size) {
        const cropRight = readUInt32BE(input, clapBox.offset + 12);
        width = rawWidth - cropRight;
      }
      images.push({ height, width });
      currentOffset = ispeBox.offset + ispeBox.size;
    }
    if (images.length === 0) {
      throw new TypeError("Invalid HEIF, no sizes found");
    }
    return {
      width: images[0].width,
      height: images[0].height,
      type,
      ...images.length > 1 ? { images } : {}
    };
  }
};

const SIZE_HEADER = 4 + 4;
const FILE_LENGTH_OFFSET = 4;
const ENTRY_LENGTH_OFFSET = 4;
const ICON_TYPE_SIZE = {
  ICON: 32,
  "ICN#": 32,
  // m => 16 x 16
  "icm#": 16,
  icm4: 16,
  icm8: 16,
  // s => 16 x 16
  "ics#": 16,
  ics4: 16,
  ics8: 16,
  is32: 16,
  s8mk: 16,
  icp4: 16,
  // l => 32 x 32
  icl4: 32,
  icl8: 32,
  il32: 32,
  l8mk: 32,
  icp5: 32,
  ic11: 32,
  // h => 48 x 48
  ich4: 48,
  ich8: 48,
  ih32: 48,
  h8mk: 48,
  // . => 64 x 64
  icp6: 64,
  ic12: 32,
  // t => 128 x 128
  it32: 128,
  t8mk: 128,
  ic07: 128,
  // . => 256 x 256
  ic08: 256,
  ic13: 256,
  // . => 512 x 512
  ic09: 512,
  ic14: 512,
  // . => 1024 x 1024
  ic10: 1024
};
function readImageHeader(input, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [
    toUTF8String(input, imageOffset, imageLengthOffset),
    readUInt32BE(input, imageLengthOffset)
  ];
}
function getImageSize(type) {
  const size = ICON_TYPE_SIZE[type];
  return { width: size, height: size, type };
}
const ICNS = {
  validate: (input) => toUTF8String(input, 0, 4) === "icns",
  calculate(input) {
    const inputLength = input.length;
    const fileLength = readUInt32BE(input, FILE_LENGTH_OFFSET);
    let imageOffset = SIZE_HEADER;
    const images = [];
    while (imageOffset < fileLength && imageOffset < inputLength) {
      const imageHeader = readImageHeader(input, imageOffset);
      const imageSize = getImageSize(imageHeader[0]);
      images.push(imageSize);
      imageOffset += imageHeader[1];
    }
    if (images.length === 0) {
      throw new TypeError("Invalid ICNS, no sizes found");
    }
    return {
      width: images[0].width,
      height: images[0].height,
      ...images.length > 1 ? { images } : {}
    };
  }
};

const J2C = {
  // TODO: this doesn't seem right. SIZ marker doesn't have to be right after the SOC
  validate: (input) => readUInt32BE(input, 0) === 4283432785,
  calculate: (input) => ({
    height: readUInt32BE(input, 12),
    width: readUInt32BE(input, 8)
  })
};

const JP2 = {
  validate(input) {
    const boxType = toUTF8String(input, 4, 8);
    if (boxType !== "jP  ") return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox) return false;
    const brand = toUTF8String(input, ftypBox.offset + 8, ftypBox.offset + 12);
    return brand === "jp2 ";
  },
  calculate(input) {
    const jp2hBox = findBox(input, "jp2h", 0);
    const ihdrBox = jp2hBox && findBox(input, "ihdr", jp2hBox.offset + 8);
    if (ihdrBox) {
      return {
        height: readUInt32BE(input, ihdrBox.offset + 8),
        width: readUInt32BE(input, ihdrBox.offset + 12)
      };
    }
    throw new TypeError("Unsupported JPEG 2000 format");
  }
};

const EXIF_MARKER = "45786966";
const APP1_DATA_SIZE_BYTES = 2;
const EXIF_HEADER_BYTES = 6;
const TIFF_BYTE_ALIGN_BYTES = 2;
const BIG_ENDIAN_BYTE_ALIGN = "4d4d";
const LITTLE_ENDIAN_BYTE_ALIGN = "4949";
const IDF_ENTRY_BYTES = 12;
const NUM_DIRECTORY_ENTRIES_BYTES = 2;
function isEXIF(input) {
  return toHexString(input, 2, 6) === EXIF_MARKER;
}
function extractSize(input, index) {
  return {
    height: readUInt16BE(input, index),
    width: readUInt16BE(input, index + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfOffset = 8;
  const offset = EXIF_HEADER_BYTES + idfOffset;
  const idfDirectoryEntries = readUInt(exifBlock, 16, offset, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start + IDF_ENTRY_BYTES;
    if (start > exifBlock.length) {
      return;
    }
    const block = exifBlock.slice(start, end);
    const tagNumber = readUInt(block, 16, 0, isBigEndian);
    if (tagNumber === 274) {
      const dataFormat = readUInt(block, 16, 2, isBigEndian);
      if (dataFormat !== 3) {
        return;
      }
      const numberOfComponents = readUInt(block, 32, 4, isBigEndian);
      if (numberOfComponents !== 1) {
        return;
      }
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(input, index) {
  const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
  const byteAlign = toHexString(
    exifBlock,
    EXIF_HEADER_BYTES,
    EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES
  );
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || isLittleEndian) {
    return extractOrientation(exifBlock, isBigEndian);
  }
}
function validateInput(input, index) {
  if (index > input.length) {
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  }
}
const JPG = {
  validate: (input) => toHexString(input, 0, 2) === "ffd8",
  calculate(_input) {
    let input = _input.slice(4);
    let orientation;
    let next;
    while (input.length) {
      const i = readUInt16BE(input, 0);
      validateInput(input, i);
      if (input[i] !== 255) {
        input = input.slice(1);
        continue;
      }
      if (isEXIF(input)) {
        orientation = validateExifBlock(input, i);
      }
      next = input[i + 1];
      if (next === 192 || next === 193 || next === 194) {
        const size = extractSize(input, i + 5);
        if (!orientation) {
          return size;
        }
        return {
          height: size.height,
          orientation,
          width: size.width
        };
      }
      input = input.slice(i + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
};

class BitReader {
  constructor(input, endianness) {
    this.input = input;
    this.endianness = endianness;
  }
  // Skip the first 16 bits (2 bytes) of signature
  byteOffset = 2;
  bitOffset = 0;
  /** Reads a specified number of bits, and move the offset */
  getBits(length = 1) {
    let result = 0;
    let bitsRead = 0;
    while (bitsRead < length) {
      if (this.byteOffset >= this.input.length) {
        throw new Error("Reached end of input");
      }
      const currentByte = this.input[this.byteOffset];
      const bitsLeft = 8 - this.bitOffset;
      const bitsToRead = Math.min(length - bitsRead, bitsLeft);
      if (this.endianness === "little-endian") {
        const mask = (1 << bitsToRead) - 1;
        const bits = currentByte >> this.bitOffset & mask;
        result |= bits << bitsRead;
      } else {
        const mask = (1 << bitsToRead) - 1 << 8 - this.bitOffset - bitsToRead;
        const bits = (currentByte & mask) >> 8 - this.bitOffset - bitsToRead;
        result = result << bitsToRead | bits;
      }
      bitsRead += bitsToRead;
      this.bitOffset += bitsToRead;
      if (this.bitOffset === 8) {
        this.byteOffset++;
        this.bitOffset = 0;
      }
    }
    return result;
  }
}

function calculateImageDimension(reader, isSmallImage) {
  if (isSmallImage) {
    return 8 * (1 + reader.getBits(5));
  }
  const sizeClass = reader.getBits(2);
  const extraBits = [9, 13, 18, 30][sizeClass];
  return 1 + reader.getBits(extraBits);
}
function calculateImageWidth(reader, isSmallImage, widthMode, height) {
  if (isSmallImage && widthMode === 0) {
    return 8 * (1 + reader.getBits(5));
  }
  if (widthMode === 0) {
    return calculateImageDimension(reader, false);
  }
  const aspectRatios = [1, 1.2, 4 / 3, 1.5, 16 / 9, 5 / 4, 2];
  return Math.floor(height * aspectRatios[widthMode - 1]);
}
const JXLStream = {
  validate: (input) => {
    return toHexString(input, 0, 2) === "ff0a";
  },
  calculate(input) {
    const reader = new BitReader(input, "little-endian");
    const isSmallImage = reader.getBits(1) === 1;
    const height = calculateImageDimension(reader, isSmallImage);
    const widthMode = reader.getBits(3);
    const width = calculateImageWidth(reader, isSmallImage, widthMode, height);
    return { width, height };
  }
};

function extractCodestream(input) {
  const jxlcBox = findBox(input, "jxlc", 0);
  if (jxlcBox) {
    return input.slice(jxlcBox.offset + 8, jxlcBox.offset + jxlcBox.size);
  }
  const partialStreams = extractPartialStreams(input);
  if (partialStreams.length > 0) {
    return concatenateCodestreams(partialStreams);
  }
  return void 0;
}
function extractPartialStreams(input) {
  const partialStreams = [];
  let offset = 0;
  while (offset < input.length) {
    const jxlpBox = findBox(input, "jxlp", offset);
    if (!jxlpBox) break;
    partialStreams.push(
      input.slice(jxlpBox.offset + 12, jxlpBox.offset + jxlpBox.size)
    );
    offset = jxlpBox.offset + jxlpBox.size;
  }
  return partialStreams;
}
function concatenateCodestreams(partialCodestreams) {
  const totalLength = partialCodestreams.reduce(
    (acc, curr) => acc + curr.length,
    0
  );
  const codestream = new Uint8Array(totalLength);
  let position = 0;
  for (const partial of partialCodestreams) {
    codestream.set(partial, position);
    position += partial.length;
  }
  return codestream;
}
const JXL = {
  validate: (input) => {
    const boxType = toUTF8String(input, 4, 8);
    if (boxType !== "JXL ") return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox) return false;
    const brand = toUTF8String(input, ftypBox.offset + 8, ftypBox.offset + 12);
    return brand === "jxl ";
  },
  calculate(input) {
    const codestream = extractCodestream(input);
    if (codestream) return JXLStream.calculate(codestream);
    throw new Error("No codestream found in JXL container");
  }
};

const KTX = {
  validate: (input) => {
    const signature = toUTF8String(input, 1, 7);
    return ["KTX 11", "KTX 20"].includes(signature);
  },
  calculate: (input) => {
    const type = input[5] === 49 ? "ktx" : "ktx2";
    const offset = type === "ktx" ? 36 : 20;
    return {
      height: readUInt32LE(input, offset + 4),
      width: readUInt32LE(input, offset),
      type
    };
  }
};

const pngSignature = "PNG\r\n\n";
const pngImageHeaderChunkName = "IHDR";
const pngFriedChunkName = "CgBI";
const PNG = {
  validate(input) {
    if (pngSignature === toUTF8String(input, 1, 8)) {
      let chunkName = toUTF8String(input, 12, 16);
      if (chunkName === pngFriedChunkName) {
        chunkName = toUTF8String(input, 28, 32);
      }
      if (chunkName !== pngImageHeaderChunkName) {
        throw new TypeError("Invalid PNG");
      }
      return true;
    }
    return false;
  },
  calculate(input) {
    if (toUTF8String(input, 12, 16) === pngFriedChunkName) {
      return {
        height: readUInt32BE(input, 36),
        width: readUInt32BE(input, 32)
      };
    }
    return {
      height: readUInt32BE(input, 20),
      width: readUInt32BE(input, 16)
    };
  }
};

const PNMTypes = {
  P1: "pbm/ascii",
  P2: "pgm/ascii",
  P3: "ppm/ascii",
  P4: "pbm",
  P5: "pgm",
  P6: "ppm",
  P7: "pam",
  PF: "pfm"
};
const handlers = {
  default: (lines) => {
    let dimensions = [];
    while (lines.length > 0) {
      const line = lines.shift();
      if (line[0] === "#") {
        continue;
      }
      dimensions = line.split(" ");
      break;
    }
    if (dimensions.length === 2) {
      return {
        height: Number.parseInt(dimensions[1], 10),
        width: Number.parseInt(dimensions[0], 10)
      };
    }
    throw new TypeError("Invalid PNM");
  },
  pam: (lines) => {
    const size = {};
    while (lines.length > 0) {
      const line = lines.shift();
      if (line.length > 16 || line.charCodeAt(0) > 128) {
        continue;
      }
      const [key, value] = line.split(" ");
      if (key && value) {
        size[key.toLowerCase()] = Number.parseInt(value, 10);
      }
      if (size.height && size.width) {
        break;
      }
    }
    if (size.height && size.width) {
      return {
        height: size.height,
        width: size.width
      };
    }
    throw new TypeError("Invalid PAM");
  }
};
const PNM = {
  validate: (input) => toUTF8String(input, 0, 2) in PNMTypes,
  calculate(input) {
    const signature = toUTF8String(input, 0, 2);
    const type = PNMTypes[signature];
    const lines = toUTF8String(input, 3).split(/[\r\n]+/);
    const handler = handlers[type] || handlers.default;
    return handler(lines);
  }
};

const PSD = {
  validate: (input) => toUTF8String(input, 0, 4) === "8BPS",
  calculate: (input) => ({
    height: readUInt32BE(input, 14),
    width: readUInt32BE(input, 18)
  })
};

const svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
const extractorRegExps = {
  height: /\sheight=(['"])([^%]+?)\1/,
  root: svgReg,
  viewbox: /\sviewBox=(['"])(.+?)\1/i,
  width: /\swidth=(['"])([^%]+?)\1/
};
const INCH_CM = 2.54;
const units = {
  in: 96,
  cm: 96 / INCH_CM,
  em: 16,
  ex: 8,
  m: 96 / INCH_CM * 100,
  mm: 96 / INCH_CM / 10,
  pc: 96 / 72 / 12,
  pt: 96 / 72,
  px: 1
};
const unitsReg = new RegExp(
  `^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`
);
function parseLength(len) {
  const m = unitsReg.exec(len);
  if (!m) {
    return void 0;
  }
  return Math.round(Number(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = extractorRegExps.width.exec(root);
  const height = extractorRegExps.height.exec(root);
  const viewbox = extractorRegExps.viewbox.exec(root);
  return {
    height: height && parseLength(height[2]),
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) {
    return {
      height: Math.floor(attrs.width / ratio),
      width: attrs.width
    };
  }
  if (attrs.height) {
    return {
      height: attrs.height,
      width: Math.floor(attrs.height * ratio)
    };
  }
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
const SVG = {
  // Scan only the first kilo-byte to speed up the check on larger files
  validate: (input) => svgReg.test(toUTF8String(input, 0, 1e3)),
  calculate(input) {
    const root = extractorRegExps.root.exec(toUTF8String(input));
    if (root) {
      const attrs = parseAttributes(root[0]);
      if (attrs.width && attrs.height) {
        return calculateByDimensions(attrs);
      }
      if (attrs.viewbox) {
        return calculateByViewbox(attrs, attrs.viewbox);
      }
    }
    throw new TypeError("Invalid SVG");
  }
};

const TGA = {
  validate(input) {
    return readUInt16LE(input, 0) === 0 && readUInt16LE(input, 4) === 0;
  },
  calculate(input) {
    return {
      height: readUInt16LE(input, 14),
      width: readUInt16LE(input, 12)
    };
  }
};

const CONSTANTS = {
  TAG: {
    WIDTH: 256,
    HEIGHT: 257,
    COMPRESSION: 259
  },
  TYPE: {
    SHORT: 3,
    LONG: 4,
    LONG8: 16
  },
  ENTRY_SIZE: {
    STANDARD: 12,
    BIG: 20
  },
  COUNT_SIZE: {
    STANDARD: 2,
    BIG: 8
  }
};
function readIFD(input, { isBigEndian, isBigTiff }) {
  const ifdOffset = isBigTiff ? Number(readUInt64(input, 8, isBigEndian)) : readUInt(input, 32, 4, isBigEndian);
  const entryCountSize = isBigTiff ? CONSTANTS.COUNT_SIZE.BIG : CONSTANTS.COUNT_SIZE.STANDARD;
  return input.slice(ifdOffset + entryCountSize);
}
function readTagValue(input, type, offset, isBigEndian) {
  switch (type) {
    case CONSTANTS.TYPE.SHORT:
      return readUInt(input, 16, offset, isBigEndian);
    case CONSTANTS.TYPE.LONG:
      return readUInt(input, 32, offset, isBigEndian);
    case CONSTANTS.TYPE.LONG8: {
      const value = Number(readUInt64(input, offset, isBigEndian));
      if (value > Number.MAX_SAFE_INTEGER) {
        throw new TypeError("Value too large");
      }
      return value;
    }
    default:
      return 0;
  }
}
function nextTag(input, isBigTiff) {
  const entrySize = isBigTiff ? CONSTANTS.ENTRY_SIZE.BIG : CONSTANTS.ENTRY_SIZE.STANDARD;
  if (input.length > entrySize) {
    return input.slice(entrySize);
  }
}
function extractTags(input, { isBigEndian, isBigTiff }) {
  const tags = {};
  let temp = input;
  while (temp?.length) {
    const code = readUInt(temp, 16, 0, isBigEndian);
    const type = readUInt(temp, 16, 2, isBigEndian);
    const length = isBigTiff ? Number(readUInt64(temp, 4, isBigEndian)) : readUInt(temp, 32, 4, isBigEndian);
    if (code === 0) break;
    if (length === 1 && (type === CONSTANTS.TYPE.SHORT || type === CONSTANTS.TYPE.LONG || isBigTiff && type === CONSTANTS.TYPE.LONG8)) {
      const valueOffset = isBigTiff ? 12 : 8;
      tags[code] = readTagValue(temp, type, valueOffset, isBigEndian);
    }
    temp = nextTag(temp, isBigTiff);
  }
  return tags;
}
function determineFormat(input) {
  const signature = toUTF8String(input, 0, 2);
  const version = readUInt(input, 16, 2, signature === "MM");
  return {
    isBigEndian: signature === "MM",
    isBigTiff: version === 43
  };
}
function validateBigTIFFHeader(input, isBigEndian) {
  const byteSize = readUInt(input, 16, 4, isBigEndian);
  const reserved = readUInt(input, 16, 6, isBigEndian);
  if (byteSize !== 8 || reserved !== 0) {
    throw new TypeError("Invalid BigTIFF header");
  }
}
const signatures = /* @__PURE__ */ new Set([
  "49492a00",
  // Little Endian
  "4d4d002a",
  // Big Endian
  "49492b00",
  // BigTIFF Little Endian
  "4d4d002b"
  // BigTIFF Big Endian
]);
const TIFF = {
  validate: (input) => {
    const signature = toHexString(input, 0, 4);
    return signatures.has(signature);
  },
  calculate(input) {
    const format = determineFormat(input);
    if (format.isBigTiff) {
      validateBigTIFFHeader(input, format.isBigEndian);
    }
    const ifdBuffer = readIFD(input, format);
    const tags = extractTags(ifdBuffer, format);
    const info = {
      height: tags[CONSTANTS.TAG.HEIGHT],
      width: tags[CONSTANTS.TAG.WIDTH],
      type: format.isBigTiff ? "bigtiff" : "tiff"
    };
    if (tags[CONSTANTS.TAG.COMPRESSION]) {
      info.compression = tags[CONSTANTS.TAG.COMPRESSION];
    }
    if (!info.width || !info.height) {
      throw new TypeError("Invalid Tiff. Missing tags");
    }
    return info;
  }
};

function calculateExtended(input) {
  return {
    height: 1 + readUInt24LE(input, 7),
    width: 1 + readUInt24LE(input, 4)
  };
}
function calculateLossless(input) {
  return {
    height: 1 + ((input[4] & 15) << 10 | input[3] << 2 | (input[2] & 192) >> 6),
    width: 1 + ((input[2] & 63) << 8 | input[1])
  };
}
function calculateLossy(input) {
  return {
    height: readInt16LE(input, 8) & 16383,
    width: readInt16LE(input, 6) & 16383
  };
}
const WEBP = {
  validate(input) {
    const riffHeader = "RIFF" === toUTF8String(input, 0, 4);
    const webpHeader = "WEBP" === toUTF8String(input, 8, 12);
    const vp8Header = "VP8" === toUTF8String(input, 12, 15);
    return riffHeader && webpHeader && vp8Header;
  },
  calculate(_input) {
    const chunkHeader = toUTF8String(_input, 12, 16);
    const input = _input.slice(20, 30);
    if (chunkHeader === "VP8X") {
      const extendedHeader = input[0];
      const validStart = (extendedHeader & 192) === 0;
      const validEnd = (extendedHeader & 1) === 0;
      if (validStart && validEnd) {
        return calculateExtended(input);
      }
      throw new TypeError("Invalid WebP");
    }
    if (chunkHeader === "VP8 " && input[0] !== 47) {
      return calculateLossy(input);
    }
    const signature = toHexString(input, 3, 6);
    if (chunkHeader === "VP8L" && signature !== "9d012a") {
      return calculateLossless(input);
    }
    throw new TypeError("Invalid WebP");
  }
};

const typeHandlers = /* @__PURE__ */ new Map([
  ["bmp", BMP],
  ["cur", CUR],
  ["dds", DDS],
  ["gif", GIF],
  ["heif", HEIF],
  ["icns", ICNS],
  ["ico", ICO],
  ["j2c", J2C],
  ["jp2", JP2],
  ["jpg", JPG],
  ["jxl", JXL],
  ["jxl-stream", JXLStream],
  ["ktx", KTX],
  ["png", PNG],
  ["pnm", PNM],
  ["psd", PSD],
  ["svg", SVG],
  ["tga", TGA],
  ["tiff", TIFF],
  ["webp", WEBP]
]);
const types = Array.from(typeHandlers.keys());

nodePath.posix.join;

const ASTRO_PATH_HEADER = "x-astro-path";
const ASTRO_PATH_PARAM = "x_astro_path";
const ASTRO_LOCALS_HEADER = "x-astro-locals";
const ASTRO_MIDDLEWARE_SECRET_HEADER = "x-astro-middleware-secret";

const middlewareSecret = "ae420318-9bdb-4975-8f9b-03ee682cb561";

function computeFallbackRoute(options) {
  const {
    pathname,
    responseStatus,
    fallback,
    fallbackType,
    locales,
    defaultLocale,
    strategy,
    base
  } = options;
  if (responseStatus !== 404) {
    return { type: "none" };
  }
  if (!fallback || Object.keys(fallback).length === 0) {
    return { type: "none" };
  }
  const segments = pathname.split("/");
  const urlLocale = segments.find((segment) => {
    for (const locale of locales) {
      if (typeof locale === "string") {
        if (locale === segment) {
          return true;
        }
      } else if (locale.path === segment) {
        return true;
      }
    }
    return false;
  });
  if (!urlLocale) {
    return { type: "none" };
  }
  const fallbackKeys = Object.keys(fallback);
  if (!fallbackKeys.includes(urlLocale)) {
    return { type: "none" };
  }
  const fallbackLocale = fallback[urlLocale];
  const pathFallbackLocale = getPathByLocale(fallbackLocale, locales);
  let newPathname;
  if (pathFallbackLocale === defaultLocale && strategy === "pathname-prefix-other-locales") {
    if (pathname.includes(`${base}`)) {
      newPathname = pathname.replace(`/${urlLocale}`, ``);
    } else {
      newPathname = pathname.replace(`/${urlLocale}`, `/`);
    }
  } else {
    newPathname = pathname.replace(`/${urlLocale}`, `/${pathFallbackLocale}`);
  }
  return {
    type: fallbackType,
    pathname: newPathname
  };
}

class I18nRouter {
  #strategy;
  #defaultLocale;
  #locales;
  #base;
  #domains;
  constructor(options) {
    this.#strategy = options.strategy;
    this.#defaultLocale = options.defaultLocale;
    this.#locales = options.locales;
    this.#base = options.base === "/" ? "/" : removeTrailingForwardSlash(options.base || "");
    this.#domains = options.domains;
  }
  /**
   * Evaluate routing strategy for a pathname.
   * Returns decision object (not HTTP Response).
   */
  match(pathname, context) {
    if (this.shouldSkipProcessing(pathname, context)) {
      return { type: "continue" };
    }
    switch (this.#strategy) {
      case "manual":
        return { type: "continue" };
      case "pathname-prefix-always":
        return this.matchPrefixAlways(pathname, context);
      case "domains-prefix-always":
        if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) {
          return { type: "continue" };
        }
        return this.matchPrefixAlways(pathname, context);
      case "pathname-prefix-other-locales":
        return this.matchPrefixOtherLocales(pathname, context);
      case "domains-prefix-other-locales":
        if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) {
          return { type: "continue" };
        }
        return this.matchPrefixOtherLocales(pathname, context);
      case "pathname-prefix-always-no-redirect":
        return this.matchPrefixAlwaysNoRedirect(pathname, context);
      case "domains-prefix-always-no-redirect":
        if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) {
          return { type: "continue" };
        }
        return this.matchPrefixAlwaysNoRedirect(pathname, context);
      default:
        return { type: "continue" };
    }
  }
  /**
   * Check if i18n processing should be skipped for this request
   */
  shouldSkipProcessing(pathname, context) {
    if (pathname.includes("/404") || pathname.includes("/500")) {
      return true;
    }
    if (pathname.includes("/_server-islands/")) {
      return true;
    }
    if (context.isReroute) {
      return true;
    }
    if (context.routeType && context.routeType !== "page" && context.routeType !== "fallback") {
      return true;
    }
    return false;
  }
  /**
   * Strategy: pathname-prefix-always
   * All locales must have a prefix, including the default locale.
   */
  matchPrefixAlways(pathname, _context) {
    const isRoot = pathname === this.#base + "/" || pathname === this.#base;
    if (isRoot) {
      const basePrefix = this.#base === "/" ? "" : this.#base;
      return {
        type: "redirect",
        location: `${basePrefix}/${this.#defaultLocale}`
      };
    }
    if (!pathHasLocale(pathname, this.#locales)) {
      return { type: "notFound" };
    }
    return { type: "continue" };
  }
  /**
   * Strategy: pathname-prefix-other-locales
   * Default locale has no prefix, other locales must have a prefix.
   */
  matchPrefixOtherLocales(pathname, _context) {
    let pathnameContainsDefaultLocale = false;
    for (const segment of pathname.split("/")) {
      if (normalizeTheLocale(segment) === normalizeTheLocale(this.#defaultLocale)) {
        pathnameContainsDefaultLocale = true;
        break;
      }
    }
    if (pathnameContainsDefaultLocale) {
      const newLocation = pathname.replace(`/${this.#defaultLocale}`, "");
      return {
        type: "notFound",
        location: newLocation
      };
    }
    return { type: "continue" };
  }
  /**
   * Strategy: pathname-prefix-always-no-redirect
   * Like prefix-always but allows root to serve instead of redirecting
   */
  matchPrefixAlwaysNoRedirect(pathname, _context) {
    const isRoot = pathname === this.#base + "/" || pathname === this.#base;
    if (isRoot) {
      return { type: "continue" };
    }
    if (!pathHasLocale(pathname, this.#locales)) {
      return { type: "notFound" };
    }
    return { type: "continue" };
  }
  /**
   * Check if the current locale doesn't belong to the configured domain.
   * Used for domain-based routing strategies.
   */
  localeHasntDomain(currentLocale, currentDomain) {
    if (!this.#domains || !currentDomain) {
      return false;
    }
    if (!currentLocale) {
      return false;
    }
    const localesForDomain = this.#domains[currentDomain];
    if (!localesForDomain) {
      return true;
    }
    return !localesForDomain.includes(currentLocale);
  }
}

function createI18nMiddleware(i18n, base, trailingSlash, format) {
  if (!i18n) return (_, next) => next();
  const i18nRouter = new I18nRouter({
    strategy: i18n.strategy,
    defaultLocale: i18n.defaultLocale,
    locales: i18n.locales,
    base,
    domains: i18n.domainLookupTable ? Object.keys(i18n.domainLookupTable).reduce(
      (acc, domain) => {
        const locale = i18n.domainLookupTable[domain];
        if (!acc[domain]) {
          acc[domain] = [];
        }
        acc[domain].push(locale);
        return acc;
      },
      {}
    ) : void 0
  });
  return async (context, next) => {
    const response = await next();
    const typeHeader = response.headers.get(ROUTE_TYPE_HEADER);
    const isReroute = response.headers.get(REROUTE_DIRECTIVE_HEADER);
    if (isReroute === "no" && typeof i18n.fallback === "undefined") {
      return response;
    }
    if (typeHeader !== "page" && typeHeader !== "fallback") {
      return response;
    }
    const routerContext = {
      currentLocale: context.currentLocale,
      currentDomain: context.url.hostname,
      routeType: typeHeader,
      isReroute: isReroute === "yes"
    };
    const routeDecision = i18nRouter.match(context.url.pathname, routerContext);
    switch (routeDecision.type) {
      case "redirect": {
        let location = routeDecision.location;
        if (shouldAppendForwardSlash(trailingSlash, format)) {
          location = appendForwardSlash(location);
        }
        return context.redirect(location, routeDecision.status);
      }
      case "notFound": {
        if (context.isPrerendered) {
          const prerenderedRes = new Response(response.body, {
            status: 404,
            headers: response.headers
          });
          prerenderedRes.headers.set(REROUTE_DIRECTIVE_HEADER, "no");
          if (routeDecision.location) {
            prerenderedRes.headers.set("Location", routeDecision.location);
          }
          return prerenderedRes;
        }
        const headers = new Headers();
        if (routeDecision.location) {
          headers.set("Location", routeDecision.location);
        }
        return new Response(null, { status: 404, headers });
      }
    }
    if (i18n.fallback && i18n.fallbackType) {
      const fallbackDecision = computeFallbackRoute({
        pathname: context.url.pathname,
        responseStatus: response.status,
        currentLocale: context.currentLocale,
        fallback: i18n.fallback,
        fallbackType: i18n.fallbackType,
        locales: i18n.locales,
        defaultLocale: i18n.defaultLocale,
        strategy: i18n.strategy,
        base
      });
      switch (fallbackDecision.type) {
        case "redirect":
          return context.redirect(fallbackDecision.pathname + context.url.search);
        case "rewrite":
          return await context.rewrite(fallbackDecision.pathname + context.url.search);
      }
    }
    return response;
  };
}

function pathHasLocale(path, locales) {
  const segments = path.split("/").map(normalizeThePath);
  for (const segment of segments) {
    for (const locale of locales) {
      if (typeof locale === "string") {
        if (normalizeTheLocale(segment) === normalizeTheLocale(locale)) {
          return true;
        }
      } else if (segment === locale.path) {
        return true;
      }
    }
  }
  return false;
}
function getPathByLocale(locale, locales) {
  for (const loopLocale of locales) {
    if (typeof loopLocale === "string") {
      if (loopLocale === locale) {
        return loopLocale;
      }
    } else {
      for (const code of loopLocale.codes) {
        if (code === locale) {
          return loopLocale.path;
        }
      }
    }
  }
  throw new AstroError(i18nNoLocaleFoundInPath);
}
function normalizeTheLocale(locale) {
  return locale.replaceAll("_", "-").toLowerCase();
}
function normalizeThePath(path) {
  return path.endsWith(".html") ? path.slice(0, -5) : path;
}
function getAllCodes(locales) {
  const result = [];
  for (const loopLocale of locales) {
    if (typeof loopLocale === "string") {
      result.push(loopLocale);
    } else {
      result.push(...loopLocale.codes);
    }
  }
  return result;
}

const DELETED_EXPIRATION = /* @__PURE__ */ new Date(0);
const DELETED_VALUE = "deleted";
const responseSentSymbol = /* @__PURE__ */ Symbol.for("astro.responseSent");
const identity = (value) => value;
class AstroCookie {
  constructor(value) {
    this.value = value;
  }
  json() {
    if (this.value === void 0) {
      throw new Error(`Cannot convert undefined to an object.`);
    }
    return JSON.parse(this.value);
  }
  number() {
    return Number(this.value);
  }
  boolean() {
    if (this.value === "false") return false;
    if (this.value === "0") return false;
    return Boolean(this.value);
  }
}
class AstroCookies {
  #request;
  #requestValues;
  #outgoing;
  #consumed;
  constructor(request) {
    this.#request = request;
    this.#requestValues = null;
    this.#outgoing = null;
    this.#consumed = false;
  }
  /**
   * Astro.cookies.delete(key) is used to delete a cookie. Using this method will result
   * in a Set-Cookie header added to the response.
   * @param key The cookie to delete
   * @param options Options related to this deletion, such as the path of the cookie.
   */
  delete(key, options) {
    const {
      // @ts-expect-error
      maxAge: _ignoredMaxAge,
      // @ts-expect-error
      expires: _ignoredExpires,
      ...sanitizedOptions
    } = options || {};
    const serializeOptions = {
      expires: DELETED_EXPIRATION,
      ...sanitizedOptions
    };
    this.#ensureOutgoingMap().set(key, [
      DELETED_VALUE,
      serialize(key, DELETED_VALUE, serializeOptions),
      false
    ]);
  }
  /**
   * Astro.cookies.get(key) is used to get a cookie value. The cookie value is read from the
   * request. If you have set a cookie via Astro.cookies.set(key, value), the value will be taken
   * from that set call, overriding any values already part of the request.
   * @param key The cookie to get.
   * @returns An object containing the cookie value as well as convenience methods for converting its value.
   */
  get(key, options = void 0) {
    if (this.#outgoing?.has(key)) {
      let [serializedValue, , isSetValue] = this.#outgoing.get(key);
      if (isSetValue) {
        return new AstroCookie(serializedValue);
      } else {
        return void 0;
      }
    }
    const decode = options?.decode ?? decodeURIComponent;
    const values = this.#ensureParsed();
    if (key in values) {
      const value = values[key];
      if (value) {
        let decodedValue;
        try {
          decodedValue = decode(value);
        } catch (_error) {
          decodedValue = value;
        }
        return new AstroCookie(decodedValue);
      }
    }
  }
  /**
   * Astro.cookies.has(key) returns a boolean indicating whether this cookie is either
   * part of the initial request or set via Astro.cookies.set(key)
   * @param key The cookie to check for.
   * @param _options This parameter is no longer used.
   * @returns
   */
  has(key, _options) {
    if (this.#outgoing?.has(key)) {
      let [, , isSetValue] = this.#outgoing.get(key);
      return isSetValue;
    }
    const values = this.#ensureParsed();
    return values[key] !== void 0;
  }
  /**
   * Astro.cookies.set(key, value) is used to set a cookie's value. If provided
   * an object it will be stringified via JSON.stringify(value). Additionally you
   * can provide options customizing how this cookie will be set, such as setting httpOnly
   * in order to prevent the cookie from being read in client-side JavaScript.
   * @param key The name of the cookie to set.
   * @param value A value, either a string or other primitive or an object.
   * @param options Options for the cookie, such as the path and security settings.
   */
  set(key, value, options) {
    if (this.#consumed) {
      const warning = new Error(
        "Astro.cookies.set() was called after the cookies had already been sent to the browser.\nThis may have happened if this method was called in an imported component.\nPlease make sure that Astro.cookies.set() is only called in the frontmatter of the main page."
      );
      warning.name = "Warning";
      console.warn(warning);
    }
    let serializedValue;
    if (typeof value === "string") {
      serializedValue = value;
    } else {
      let toStringValue = value.toString();
      if (toStringValue === Object.prototype.toString.call(value)) {
        serializedValue = JSON.stringify(value);
      } else {
        serializedValue = toStringValue;
      }
    }
    const serializeOptions = {};
    if (options) {
      Object.assign(serializeOptions, options);
    }
    this.#ensureOutgoingMap().set(key, [
      serializedValue,
      serialize(key, serializedValue, serializeOptions),
      true
    ]);
    if (this.#request[responseSentSymbol]) {
      throw new AstroError({
        ...ResponseSentError
      });
    }
  }
  /**
   * Merges a new AstroCookies instance into the current instance. Any new cookies
   * will be added to the current instance, overwriting any existing cookies with the same name.
   */
  merge(cookies) {
    const outgoing = cookies.#outgoing;
    if (outgoing) {
      for (const [key, value] of outgoing) {
        this.#ensureOutgoingMap().set(key, value);
      }
    }
  }
  /**
   * Astro.cookies.header() returns an iterator for the cookies that have previously
   * been set by either Astro.cookies.set() or Astro.cookies.delete().
   * This method is primarily used by adapters to set the header on outgoing responses.
   * @returns
   */
  *headers() {
    if (this.#outgoing == null) return;
    for (const [, value] of this.#outgoing) {
      yield value[1];
    }
  }
  /**
   * Behaves the same as AstroCookies.prototype.headers(),
   * but allows a warning when cookies are set after the instance is consumed.
   */
  static consume(cookies) {
    cookies.#consumed = true;
    return cookies.headers();
  }
  #ensureParsed() {
    if (!this.#requestValues) {
      this.#parse();
    }
    if (!this.#requestValues) {
      this.#requestValues = /* @__PURE__ */ Object.create(null);
    }
    return this.#requestValues;
  }
  #ensureOutgoingMap() {
    if (!this.#outgoing) {
      this.#outgoing = /* @__PURE__ */ new Map();
    }
    return this.#outgoing;
  }
  #parse() {
    const raw = this.#request.headers.get("cookie");
    if (!raw) {
      return;
    }
    this.#requestValues = parse(raw, { decode: identity });
  }
}

const astroCookiesSymbol = /* @__PURE__ */ Symbol.for("astro.cookies");
function attachCookiesToResponse(response, cookies) {
  Reflect.set(response, astroCookiesSymbol, cookies);
}
function getCookiesFromResponse(response) {
  let cookies = Reflect.get(response, astroCookiesSymbol);
  if (cookies != null) {
    return cookies;
  } else {
    return void 0;
  }
}
function* getSetCookiesFromResponse(response) {
  const cookies = getCookiesFromResponse(response);
  if (!cookies) {
    return [];
  }
  for (const headerValue of AstroCookies.consume(cookies)) {
    yield headerValue;
  }
  return [];
}

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(colors.bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return colors.red(prefix.join(" "));
  }
  if (level === "warn") {
    return colors.yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return colors.dim(prefix[0]);
  }
  return colors.dim(prefix[0]) + " " + colors.blue(prefix.splice(1).join(" "));
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

const consoleLogDestination = {
  write(event) {
    let dest = console.error;
    if (levels[event.level] < levels["error"]) {
      dest = console.info;
    }
    if (event.label === "SKIP_FORMAT") {
      dest(event.message);
    } else {
      dest(getEventPrefix(event) + " " + event.message);
    }
    return true;
  }
};

const ACTION_QUERY_PARAMS = {
  actionName: "_action"};
const ACTION_RPC_ROUTE_PATTERN = "/_actions/[...path]";

const __vite_import_meta_env__$1 = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
const statusToCodeMap = Object.fromEntries(
  Object.entries(codeToStatusMap).map(([key, value]) => [value, key])
);
class ActionError extends Error {
  type = "AstroActionError";
  code = "INTERNAL_SERVER_ERROR";
  status = 500;
  constructor(params) {
    super(params.message);
    this.code = params.code;
    this.status = ActionError.codeToStatus(params.code);
    if (params.stack) {
      this.stack = params.stack;
    }
  }
  static codeToStatus(code) {
    return codeToStatusMap[code];
  }
  static statusToCode(status) {
    return statusToCodeMap[status] ?? "INTERNAL_SERVER_ERROR";
  }
  static fromJson(body) {
    if (isInputError(body)) {
      return new ActionInputError(body.issues);
    }
    if (isActionError(body)) {
      return new ActionError(body);
    }
    return new ActionError({
      code: "INTERNAL_SERVER_ERROR"
    });
  }
}
function isActionError(error) {
  return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionError";
}
function isInputError(error) {
  return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionInputError" && "issues" in error && Array.isArray(error.issues);
}
class ActionInputError extends ActionError {
  type = "AstroActionInputError";
  // We don't expose all ZodError properties.
  // Not all properties will serialize from server to client,
  // and we don't want to import the full ZodError object into the client.
  issues;
  fields;
  constructor(issues) {
    super({
      message: `Failed to validate: ${JSON.stringify(issues, null, 2)}`,
      code: "BAD_REQUEST"
    });
    this.issues = issues;
    this.fields = {};
    for (const issue of issues) {
      if (issue.path.length > 0) {
        const key = issue.path[0].toString();
        this.fields[key] ??= [];
        this.fields[key]?.push(issue.message);
      }
    }
  }
}
function deserializeActionResult(res) {
  if (res.type === "error") {
    let json;
    try {
      json = JSON.parse(res.body);
    } catch {
      return {
        data: void 0,
        error: new ActionError({
          message: res.body,
          code: "INTERNAL_SERVER_ERROR"
        })
      };
    }
    if (Object.assign(__vite_import_meta_env__$1, { _: "/Users/sam/.openclaw/workspace/waldorf-website/node_modules/.bin/astro" })?.PROD) {
      return { error: ActionError.fromJson(json), data: void 0 };
    } else {
      const error = ActionError.fromJson(json);
      error.stack = actionResultErrorStack.get();
      return {
        error,
        data: void 0
      };
    }
  }
  if (res.type === "empty") {
    return { data: void 0, error: void 0 };
  }
  return {
    data: parse$1(res.body, {
      URL: (href) => new URL(href)
    }),
    error: void 0
  };
}
const actionResultErrorStack = /* @__PURE__ */ (function actionResultErrorStackFn() {
  let errorStack;
  return {
    set(stack) {
      errorStack = stack;
    },
    get() {
      return errorStack;
    }
  };
})();
function getActionQueryString(name) {
  const searchParams = new URLSearchParams({ [ACTION_QUERY_PARAMS.actionName]: name });
  return `?${searchParams.toString()}`;
}

async function readBodyWithLimit(request, limit) {
  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader) {
    const contentLength = Number.parseInt(contentLengthHeader, 10);
    if (Number.isFinite(contentLength) && contentLength > limit) {
      throw new BodySizeLimitError(limit);
    }
  }
  if (!request.body) return new Uint8Array();
  const reader = request.body.getReader();
  const chunks = [];
  let received = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      received += value.byteLength;
      if (received > limit) {
        throw new BodySizeLimitError(limit);
      }
      chunks.push(value);
    }
  }
  const buffer = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return buffer;
}
class BodySizeLimitError extends Error {
  limit;
  constructor(limit) {
    super(`Request body exceeds the configured limit of ${limit} bytes`);
    this.name = "BodySizeLimitError";
    this.limit = limit;
  }
}

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
function getActionContext(context) {
  const callerInfo = getCallerInfo(context);
  const actionResultAlreadySet = Boolean(context.locals._actionPayload);
  let action = void 0;
  if (callerInfo && context.request.method === "POST" && !actionResultAlreadySet) {
    action = {
      calledFrom: callerInfo.from,
      name: callerInfo.name,
      handler: async () => {
        const pipeline = Reflect.get(context, pipelineSymbol);
        const callerInfoName = shouldAppendForwardSlash(
          pipeline.manifest.trailingSlash,
          pipeline.manifest.buildFormat
        ) ? removeTrailingForwardSlash(callerInfo.name) : callerInfo.name;
        let baseAction;
        try {
          baseAction = await pipeline.getAction(callerInfoName);
        } catch (error) {
          if (error instanceof Error && "name" in error && typeof error.name === "string" && error.name === ActionNotFoundError.name) {
            return { data: void 0, error: new ActionError({ code: "NOT_FOUND" }) };
          }
          throw error;
        }
        const bodySizeLimit = pipeline.manifest.actionBodySizeLimit;
        let input;
        try {
          input = await parseRequestBody(context.request, bodySizeLimit);
        } catch (e) {
          if (e instanceof ActionError) {
            return { data: void 0, error: e };
          }
          if (e instanceof TypeError) {
            return { data: void 0, error: new ActionError({ code: "UNSUPPORTED_MEDIA_TYPE" }) };
          }
          throw e;
        }
        const omitKeys = ["props", "getActionResult", "callAction", "redirect"];
        const actionAPIContext = Object.create(
          Object.getPrototypeOf(context),
          Object.fromEntries(
            Object.entries(Object.getOwnPropertyDescriptors(context)).filter(
              ([key]) => !omitKeys.includes(key)
            )
          )
        );
        Reflect.set(actionAPIContext, ACTION_API_CONTEXT_SYMBOL, true);
        const handler = baseAction.bind(actionAPIContext);
        return handler(input);
      }
    };
  }
  function setActionResult(actionName, actionResult) {
    context.locals._actionPayload = {
      actionResult,
      actionName
    };
  }
  return {
    action,
    setActionResult,
    serializeActionResult,
    deserializeActionResult
  };
}
function getCallerInfo(ctx) {
  if (ctx.routePattern === ACTION_RPC_ROUTE_PATTERN) {
    return { from: "rpc", name: ctx.url.pathname.replace(/^.*\/_actions\//, "") };
  }
  const queryParam = ctx.url.searchParams.get(ACTION_QUERY_PARAMS.actionName);
  if (queryParam) {
    return { from: "form", name: queryParam };
  }
  return void 0;
}
async function parseRequestBody(request, bodySizeLimit) {
  const contentType = request.headers.get("content-type");
  const contentLengthHeader = request.headers.get("content-length");
  const contentLength = contentLengthHeader ? Number.parseInt(contentLengthHeader, 10) : void 0;
  const hasContentLength = typeof contentLength === "number" && Number.isFinite(contentLength);
  if (!contentType) return void 0;
  if (hasContentLength && contentLength > bodySizeLimit) {
    throw new ActionError({
      code: "CONTENT_TOO_LARGE",
      message: `Request body exceeds ${bodySizeLimit} bytes`
    });
  }
  try {
    if (hasContentType(contentType, formContentTypes)) {
      if (!hasContentLength) {
        const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
        const formRequest = new Request(request.url, {
          method: request.method,
          headers: request.headers,
          body: toArrayBuffer(body)
        });
        return await formRequest.formData();
      }
      return await request.clone().formData();
    }
    if (hasContentType(contentType, ["application/json"])) {
      if (contentLength === 0) return void 0;
      if (!hasContentLength) {
        const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
        if (body.byteLength === 0) return void 0;
        return JSON.parse(new TextDecoder().decode(body));
      }
      return await request.clone().json();
    }
  } catch (e) {
    if (e instanceof BodySizeLimitError) {
      throw new ActionError({
        code: "CONTENT_TOO_LARGE",
        message: `Request body exceeds ${bodySizeLimit} bytes`
      });
    }
    throw e;
  }
  throw new TypeError("Unsupported content type");
}
const ACTION_API_CONTEXT_SYMBOL = /* @__PURE__ */ Symbol.for("astro.actionAPIContext");
const formContentTypes = ["application/x-www-form-urlencoded", "multipart/form-data"];
function hasContentType(contentType, expected) {
  const type = contentType.split(";")[0].toLowerCase();
  return expected.some((t) => type === t);
}
function serializeActionResult(res) {
  if (res.error) {
    if (Object.assign(__vite_import_meta_env__, { _: "/Users/sam/.openclaw/workspace/waldorf-website/node_modules/.bin/astro" })?.DEV) {
      actionResultErrorStack.set(res.error.stack);
    }
    let body2;
    if (res.error instanceof ActionInputError) {
      body2 = {
        type: res.error.type,
        issues: res.error.issues,
        fields: res.error.fields
      };
    } else {
      body2 = {
        ...res.error,
        message: res.error.message
      };
    }
    return {
      type: "error",
      status: res.error.status,
      contentType: "application/json",
      body: JSON.stringify(body2)
    };
  }
  if (res.data === void 0) {
    return {
      type: "empty",
      status: 204
    };
  }
  let body;
  try {
    body = stringify$1(res.data, {
      // Add support for URL objects
      URL: (value) => value instanceof URL && value.href
    });
  } catch (e) {
    let hint = ActionsReturnedInvalidDataError.hint;
    if (res.data instanceof Response) {
      hint = REDIRECT_STATUS_CODES.includes(res.data.status) ? "If you need to redirect when the action succeeds, trigger a redirect where the action is called. See the Actions guide for server and client redirect examples: https://docs.astro.build/en/guides/actions." : "If you need to return a Response object, try using a server endpoint instead. See https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes";
    }
    throw new AstroError({
      ...ActionsReturnedInvalidDataError,
      message: ActionsReturnedInvalidDataError.message(String(e)),
      hint
    });
  }
  return {
    type: "data",
    status: 200,
    contentType: "application/json+devalue",
    body
  };
}
function toArrayBuffer(buffer) {
  const copy = new Uint8Array(buffer.byteLength);
  copy.set(buffer);
  return copy.buffer;
}

function hasActionPayload(locals) {
  return "_actionPayload" in locals;
}
function createGetActionResult(locals) {
  return (actionFn) => {
    if (!hasActionPayload(locals) || actionFn.toString() !== getActionQueryString(locals._actionPayload.actionName)) {
      return void 0;
    }
    return deserializeActionResult(locals._actionPayload.actionResult);
  };
}
function createCallAction(context) {
  return (baseAction, input) => {
    Reflect.set(context, ACTION_API_CONTEXT_SYMBOL, true);
    const action = baseAction.bind(context);
    return action(input);
  };
}

function parseLocale(header) {
  if (header === "*") {
    return [{ locale: header, qualityValue: void 0 }];
  }
  const result = [];
  const localeValues = header.split(",").map((str) => str.trim());
  for (const localeValue of localeValues) {
    const split = localeValue.split(";").map((str) => str.trim());
    const localeName = split[0];
    const qualityValue = split[1];
    if (!split) {
      continue;
    }
    if (qualityValue && qualityValue.startsWith("q=")) {
      const qualityValueAsFloat = Number.parseFloat(qualityValue.slice("q=".length));
      if (Number.isNaN(qualityValueAsFloat) || qualityValueAsFloat > 1) {
        result.push({
          locale: localeName,
          qualityValue: void 0
        });
      } else {
        result.push({
          locale: localeName,
          qualityValue: qualityValueAsFloat
        });
      }
    } else {
      result.push({
        locale: localeName,
        qualityValue: void 0
      });
    }
  }
  return result;
}
function sortAndFilterLocales(browserLocaleList, locales) {
  const normalizedLocales = getAllCodes(locales).map(normalizeTheLocale);
  return browserLocaleList.filter((browserLocale) => {
    if (browserLocale.locale !== "*") {
      return normalizedLocales.includes(normalizeTheLocale(browserLocale.locale));
    }
    return true;
  }).sort((a, b) => {
    if (a.qualityValue && b.qualityValue) {
      return Math.sign(b.qualityValue - a.qualityValue);
    }
    return 0;
  });
}
function computePreferredLocale(request, locales) {
  const acceptHeader = request.headers.get("Accept-Language");
  let result = void 0;
  if (acceptHeader) {
    const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
    const firstResult = browserLocaleList.at(0);
    if (firstResult && firstResult.locale !== "*") {
      for (const currentLocale of locales) {
        if (typeof currentLocale === "string") {
          if (normalizeTheLocale(currentLocale) === normalizeTheLocale(firstResult.locale)) {
            result = currentLocale;
            break;
          }
        } else {
          for (const currentCode of currentLocale.codes) {
            if (normalizeTheLocale(currentCode) === normalizeTheLocale(firstResult.locale)) {
              result = currentCode;
              break;
            }
          }
        }
      }
    }
  }
  return result;
}
function computePreferredLocaleList(request, locales) {
  const acceptHeader = request.headers.get("Accept-Language");
  let result = [];
  if (acceptHeader) {
    const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
    if (browserLocaleList.length === 1 && browserLocaleList.at(0).locale === "*") {
      return getAllCodes(locales);
    } else if (browserLocaleList.length > 0) {
      for (const browserLocale of browserLocaleList) {
        for (const loopLocale of locales) {
          if (typeof loopLocale === "string") {
            if (normalizeTheLocale(loopLocale) === normalizeTheLocale(browserLocale.locale)) {
              result.push(loopLocale);
            }
          } else {
            for (const code of loopLocale.codes) {
              if (code === browserLocale.locale) {
                result.push(code);
              }
            }
          }
        }
      }
    }
  }
  return result;
}
function computeCurrentLocale(pathname, locales, defaultLocale) {
  for (const segment of pathname.split("/").map(normalizeThePath)) {
    for (const locale of locales) {
      if (typeof locale === "string") {
        if (!segment.includes(locale)) continue;
        if (normalizeTheLocale(locale) === normalizeTheLocale(segment)) {
          return locale;
        }
      } else {
        if (locale.path === segment) {
          return locale.codes.at(0);
        } else {
          for (const code of locale.codes) {
            if (normalizeTheLocale(code) === normalizeTheLocale(segment)) {
              return code;
            }
          }
        }
      }
    }
  }
  for (const locale of locales) {
    if (typeof locale === "string") {
      if (locale === defaultLocale) {
        return locale;
      }
    } else {
      if (locale.path === defaultLocale) {
        return locale.codes.at(0);
      }
    }
  }
}
function computeCurrentLocaleFromParams(params, locales) {
  const byNormalizedCode = /* @__PURE__ */ new Map();
  const byPath = /* @__PURE__ */ new Map();
  for (const locale of locales) {
    if (typeof locale === "string") {
      byNormalizedCode.set(normalizeTheLocale(locale), locale);
    } else {
      byPath.set(locale.path, locale.codes[0]);
      for (const code of locale.codes) {
        byNormalizedCode.set(normalizeTheLocale(code), code);
      }
    }
  }
  for (const value of Object.values(params)) {
    if (!value) continue;
    const pathMatch = byPath.get(value);
    if (pathMatch) return pathMatch;
    const codeMatch = byNormalizedCode.get(normalizeTheLocale(value));
    if (codeMatch) return codeMatch;
  }
}

async function renderEndpoint(mod, context, isPrerendered, logger) {
  const { request, url } = context;
  const method = request.method.toUpperCase();
  let handler = mod[method] ?? mod["ALL"];
  if (!handler && method === "HEAD" && mod["GET"]) {
    handler = mod["GET"];
  }
  if (isPrerendered && !["GET", "HEAD"].includes(method)) {
    logger.warn(
      "router",
      `${url.pathname} ${colors.bold(
        method
      )} requests are not available in static endpoints. Mark this page as server-rendered (\`export const prerender = false;\`) or update your config to \`output: 'server'\` to make all your pages server-rendered by default.`
    );
  }
  if (handler === void 0) {
    logger.warn(
      "router",
      `No API Route handler exists for the method "${method}" for the route "${url.pathname}".
Found handlers: ${Object.keys(mod).map((exp) => JSON.stringify(exp)).join(", ")}
` + ("all" in mod ? `One of the exported handlers is "all" (lowercase), did you mean to export 'ALL'?
` : "")
    );
    return new Response(null, { status: 404 });
  }
  if (typeof handler !== "function") {
    logger.error(
      "router",
      `The route "${url.pathname}" exports a value for the method "${method}", but it is of the type ${typeof handler} instead of a function.`
    );
    return new Response(null, { status: 500 });
  }
  let response = await handler.call(mod, context);
  if (!response || response instanceof Response === false) {
    throw new AstroError(EndpointDidNotReturnAResponse);
  }
  if (REROUTABLE_STATUS_CODES.includes(response.status)) {
    try {
      response.headers.set(REROUTE_DIRECTIVE_HEADER, "no");
    } catch (err) {
      if (err.message?.includes("immutable")) {
        response = new Response(response.body, response);
        response.headers.set(REROUTE_DIRECTIVE_HEADER, "no");
      } else {
        throw err;
      }
    }
  }
  if (method === "HEAD") {
    return new Response(null, response);
  }
  return response;
}

const AstroJSX = "astro:jsx";
function isVNode(vnode) {
  return vnode && typeof vnode === "object" && vnode[AstroJSX];
}

const PROP_TYPE = {
  Value: 0,
  JSON: 1,
  // Actually means Array
  RegExp: 2,
  Date: 3,
  Map: 4,
  Set: 5,
  BigInt: 6,
  URL: 7,
  Uint8Array: 8,
  Uint16Array: 9,
  Uint32Array: 10,
  Infinity: 11
};
function serializeArray(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = value.map((v) => {
    return convertToSerializedForm(v, metadata, parents);
  });
  parents.delete(value);
  return serialized;
}
function serializeObject(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      return [k, convertToSerializedForm(v, metadata, parents)];
    })
  );
  parents.delete(value);
  return serialized;
}
function convertToSerializedForm(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  const tag = Object.prototype.toString.call(value);
  switch (tag) {
    case "[object Date]": {
      return [PROP_TYPE.Date, value.toISOString()];
    }
    case "[object RegExp]": {
      return [PROP_TYPE.RegExp, value.source];
    }
    case "[object Map]": {
      return [PROP_TYPE.Map, serializeArray(Array.from(value), metadata, parents)];
    }
    case "[object Set]": {
      return [PROP_TYPE.Set, serializeArray(Array.from(value), metadata, parents)];
    }
    case "[object BigInt]": {
      return [PROP_TYPE.BigInt, value.toString()];
    }
    case "[object URL]": {
      return [PROP_TYPE.URL, value.toString()];
    }
    case "[object Array]": {
      return [PROP_TYPE.JSON, serializeArray(value, metadata, parents)];
    }
    case "[object Uint8Array]": {
      return [PROP_TYPE.Uint8Array, Array.from(value)];
    }
    case "[object Uint16Array]": {
      return [PROP_TYPE.Uint16Array, Array.from(value)];
    }
    case "[object Uint32Array]": {
      return [PROP_TYPE.Uint32Array, Array.from(value)];
    }
    default: {
      if (value !== null && typeof value === "object") {
        return [PROP_TYPE.Value, serializeObject(value, metadata, parents)];
      }
      if (value === Number.POSITIVE_INFINITY) {
        return [PROP_TYPE.Infinity, 1];
      }
      if (value === Number.NEGATIVE_INFINITY) {
        return [PROP_TYPE.Infinity, -1];
      }
      if (value === void 0) {
        return [PROP_TYPE.Value];
      }
      return [PROP_TYPE.Value, value];
    }
  }
}
function serializeProps(props, metadata) {
  const serialized = JSON.stringify(serializeObject(props, metadata));
  return serialized;
}

const transitionDirectivesToCopyOnIsland = Object.freeze([
  "data-astro-transition-scope",
  "data-astro-transition-persist",
  "data-astro-transition-persist-props"
]);
function extractDirectives(inputProps, clientDirectives) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {},
    propsWithoutTransitionAttributes: {}
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("server:")) {
      if (key === "server:root") {
        extracted.isPage = true;
      }
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        // This is a special prop added to prove that the client hydration method
        // was added statically.
        case "client:component-hydration": {
          break;
        }
        case "client:display-name": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (!clientDirectives.has(extracted.hydration.directive)) {
            const hydrationMethods = Array.from(clientDirectives.keys()).map((d) => `client:${d}`).join(", ");
            throw new Error(
              `Error: invalid hydration directive "${key}". Supported hydration methods: ${hydrationMethods}`
            );
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new AstroError(MissingMediaQueryDirective);
          }
          break;
        }
      }
    } else {
      extracted.props[key] = value;
      if (!transitionDirectivesToCopyOnIsland.includes(key)) {
        extracted.propsWithoutTransitionAttributes[key] = value;
      }
    }
  }
  for (const sym of Object.getOwnPropertySymbols(inputProps)) {
    extracted.props[sym] = inputProps[sym];
    extracted.propsWithoutTransitionAttributes[sym] = inputProps[sym];
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) {
    throw new AstroError({
      ...NoMatchingImport,
      message: NoMatchingImport.message(metadata.displayName)
    });
  }
  const island = {
    children: "",
    props: {
      // This is for HMR, probably can avoid it in prod
      uid: astroId
    }
  };
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      island.props[key] = escapeHTML(value);
    }
  }
  island.props["component-url"] = await result.resolve(decodeURI(componentUrl));
  if (renderer.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(
      decodeURI(renderer.clientEntrypoint.toString())
    );
    island.props["props"] = escapeHTML(serializeProps(props, metadata));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  let beforeHydrationUrl = await result.resolve("astro:scripts/before-hydration.js");
  if (beforeHydrationUrl.length) {
    island.props["before-hydration-url"] = beforeHydrationUrl;
  }
  island.props["opts"] = escapeHTML(
    JSON.stringify({
      name: metadata.displayName,
      value: metadata.hydrateArgs || ""
    })
  );
  transitionDirectivesToCopyOnIsland.forEach((name) => {
    if (typeof props[name] !== "undefined") {
      island.props[name] = props[name];
    }
  });
  return island;
}

/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
const dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
const binary = dictionary.length;
function bitwise(str) {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}

const DOCTYPE_EXP = /<!doctype html/i;
async function renderToString(result, componentFactory, props, children, isPage = false, route) {
  const templateResult = await callComponentAsTemplateResultOrResponse(
    result,
    componentFactory,
    props,
    children,
    route
  );
  if (templateResult instanceof Response) return templateResult;
  let str = "";
  let renderedFirstPageChunk = false;
  if (isPage) {
    await bufferHeadContent(result);
  }
  const destination = {
    write(chunk) {
      if (isPage && !renderedFirstPageChunk) {
        renderedFirstPageChunk = true;
        if (!result.partial && !DOCTYPE_EXP.test(String(chunk))) {
          const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
          str += doctype;
        }
      }
      if (chunk instanceof Response) return;
      str += chunkToString(result, chunk);
    }
  };
  await templateResult.render(destination);
  return str;
}
async function renderToReadableStream(result, componentFactory, props, children, isPage = false, route) {
  const templateResult = await callComponentAsTemplateResultOrResponse(
    result,
    componentFactory,
    props,
    children,
    route
  );
  if (templateResult instanceof Response) return templateResult;
  let renderedFirstPageChunk = false;
  if (isPage) {
    await bufferHeadContent(result);
  }
  return new ReadableStream({
    start(controller) {
      const destination = {
        write(chunk) {
          if (isPage && !renderedFirstPageChunk) {
            renderedFirstPageChunk = true;
            if (!result.partial && !DOCTYPE_EXP.test(String(chunk))) {
              const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
              controller.enqueue(encoder.encode(doctype));
            }
          }
          if (chunk instanceof Response) {
            throw new AstroError({
              ...ResponseSentError
            });
          }
          const bytes = chunkToByteArray(result, chunk);
          controller.enqueue(bytes);
        }
      };
      (async () => {
        try {
          await templateResult.render(destination);
          controller.close();
        } catch (e) {
          if (AstroError.is(e) && !e.loc) {
            e.setLocation({
              file: route?.component
            });
          }
          setTimeout(() => controller.error(e), 0);
        }
      })();
    },
    cancel() {
      result.cancelled = true;
    }
  });
}
async function callComponentAsTemplateResultOrResponse(result, componentFactory, props, children, route) {
  const factoryResult = await componentFactory(result, props, children);
  if (factoryResult instanceof Response) {
    return factoryResult;
  } else if (isHeadAndContent(factoryResult)) {
    if (!isRenderTemplateResult(factoryResult.content)) {
      throw new AstroError({
        ...OnlyResponseCanBeReturned,
        message: OnlyResponseCanBeReturned.message(
          route?.route,
          typeof factoryResult
        ),
        location: {
          file: route?.component
        }
      });
    }
    return factoryResult.content;
  } else if (!isRenderTemplateResult(factoryResult)) {
    throw new AstroError({
      ...OnlyResponseCanBeReturned,
      message: OnlyResponseCanBeReturned.message(route?.route, typeof factoryResult),
      location: {
        file: route?.component
      }
    });
  }
  return factoryResult;
}
async function bufferHeadContent(result) {
  const iterator = result._metadata.propagators.values();
  while (true) {
    const { value, done } = iterator.next();
    if (done) {
      break;
    }
    const returnValue = await value.init(result);
    if (isHeadAndContent(returnValue) && returnValue.head) {
      result._metadata.extraHead.push(returnValue.head);
    }
  }
}
async function renderToAsyncIterable(result, componentFactory, props, children, isPage = false, route) {
  const templateResult = await callComponentAsTemplateResultOrResponse(
    result,
    componentFactory,
    props,
    children,
    route
  );
  if (templateResult instanceof Response) return templateResult;
  let renderedFirstPageChunk = false;
  if (isPage) {
    await bufferHeadContent(result);
  }
  let error = null;
  let next = null;
  const buffer = [];
  let renderingComplete = false;
  const iterator = {
    async next() {
      if (result.cancelled) return { done: true, value: void 0 };
      if (next !== null) {
        await next.promise;
      } else if (!renderingComplete && !buffer.length) {
        next = promiseWithResolvers();
        await next.promise;
      }
      if (!renderingComplete) {
        next = promiseWithResolvers();
      }
      if (error) {
        throw error;
      }
      let length = 0;
      let stringToEncode = "";
      for (let i = 0, len = buffer.length; i < len; i++) {
        const bufferEntry = buffer[i];
        if (typeof bufferEntry === "string") {
          const nextIsString = i + 1 < len && typeof buffer[i + 1] === "string";
          stringToEncode += bufferEntry;
          if (!nextIsString) {
            const encoded = encoder.encode(stringToEncode);
            length += encoded.length;
            stringToEncode = "";
            buffer[i] = encoded;
          } else {
            buffer[i] = "";
          }
        } else {
          length += bufferEntry.length;
        }
      }
      let mergedArray = new Uint8Array(length);
      let offset = 0;
      for (let i = 0, len = buffer.length; i < len; i++) {
        const item = buffer[i];
        if (item === "") {
          continue;
        }
        mergedArray.set(item, offset);
        offset += item.length;
      }
      buffer.length = 0;
      const returnValue = {
        // The iterator is done when rendering has finished
        // and there are no more chunks to return.
        done: length === 0 && renderingComplete,
        value: mergedArray
      };
      return returnValue;
    },
    async return() {
      result.cancelled = true;
      return { done: true, value: void 0 };
    }
  };
  const destination = {
    write(chunk) {
      if (isPage && !renderedFirstPageChunk) {
        renderedFirstPageChunk = true;
        if (!result.partial && !DOCTYPE_EXP.test(String(chunk))) {
          const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
          buffer.push(encoder.encode(doctype));
        }
      }
      if (chunk instanceof Response) {
        throw new AstroError(ResponseSentError);
      }
      const bytes = chunkToByteArrayOrString(result, chunk);
      if (bytes.length > 0) {
        buffer.push(bytes);
        next?.resolve();
      } else if (buffer.length > 0) {
        next?.resolve();
      }
    }
  };
  const renderResult = toPromise(() => templateResult.render(destination));
  renderResult.catch((err) => {
    error = err;
  }).finally(() => {
    renderingComplete = true;
    next?.resolve();
  });
  return {
    [Symbol.asyncIterator]() {
      return iterator;
    }
  };
}
function toPromise(fn) {
  try {
    const result = fn();
    return isPromise(result) ? result : Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}

function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement$1(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(
    `<${name}${attrHTML}>${await renderSlotToString(result, slots?.default)}</${name}>`
  );
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName) return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}

const needsHeadRenderingSymbol = /* @__PURE__ */ Symbol.for("astro.needsHeadRendering");
const rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
const clientOnlyValues = /* @__PURE__ */ new Set(["solid-js", "react", "preact", "vue", "svelte"]);
function guessRenderers(componentUrl) {
  const extname = componentUrl?.split(".").pop();
  switch (extname) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/solid-js", "@astrojs/vue (jsx)"];
    case void 0:
    default:
      return [
        "@astrojs/react",
        "@astrojs/preact",
        "@astrojs/solid-js",
        "@astrojs/vue",
        "@astrojs/svelte"
      ];
  }
}
function isFragmentComponent(Component) {
  return Component === Fragment;
}
function isHTMLComponent(Component) {
  return Component && Component["astro:html"] === true;
}
const ASTRO_SLOT_EXP = /<\/?astro-slot\b[^>]*>/g;
const ASTRO_STATIC_SLOT_EXP = /<\/?astro-static-slot\b[^>]*>/g;
function removeStaticAstroSlot(html, supportsAstroStaticSlot = true) {
  const exp = supportsAstroStaticSlot ? ASTRO_STATIC_SLOT_EXP : ASTRO_SLOT_EXP;
  return html.replace(exp, "");
}
async function renderFrameworkComponent(result, displayName, Component, _props, slots = {}) {
  if (!Component && "client:only" in _props === false) {
    throw new Error(
      `Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  const { renderers, clientDirectives } = result;
  const metadata = {
    astroStaticSlot: true,
    displayName
  };
  const { hydration, isPage, props, propsWithoutTransitionAttributes } = extractDirectives(
    _props,
    clientDirectives
  );
  let html = "";
  let attrs = void 0;
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  const validRenderers = renderers.filter((r) => r.name !== "astro:jsx");
  const { children, slotInstructions } = await renderSlots(result, slots);
  let renderer;
  if (metadata.hydrate !== "only") {
    let isTagged = false;
    try {
      isTagged = Component && Component[Renderer];
    } catch {
    }
    if (isTagged) {
      const rendererName = Component[Renderer];
      renderer = renderers.find(({ name }) => name === rendererName);
    }
    if (!renderer) {
      let error;
      for (const r of renderers) {
        try {
          if (await r.ssr.check.call({ result }, Component, props, children, metadata)) {
            renderer = r;
            break;
          }
        } catch (e) {
          error ??= e;
        }
      }
      if (!renderer && error) {
        throw error;
      }
    }
    if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = await renderHTMLElement$1(
        result,
        Component,
        _props,
        slots
      );
      return {
        render(destination) {
          destination.write(output);
        }
      };
    }
  } else {
    if (metadata.hydrateArgs) {
      const rendererName = rendererAliases.has(metadata.hydrateArgs) ? rendererAliases.get(metadata.hydrateArgs) : metadata.hydrateArgs;
      if (clientOnlyValues.has(rendererName)) {
        renderer = renderers.find(
          ({ name }) => name === `@astrojs/${rendererName}` || name === rendererName
        );
      }
    }
    if (!renderer && validRenderers.length === 1) {
      renderer = validRenderers[0];
    }
    if (!renderer) {
      const extname = metadata.componentUrl?.split(".").pop();
      renderer = renderers.find(({ name }) => name === `@astrojs/${extname}` || name === extname);
    }
    if (!renderer && metadata.hydrateArgs) {
      const rendererName = metadata.hydrateArgs;
      if (typeof rendererName === "string") {
        renderer = renderers.find(({ name }) => name === rendererName);
      }
    }
  }
  let componentServerRenderEndTime;
  if (!renderer) {
    if (metadata.hydrate === "only") {
      const rendererName = rendererAliases.has(metadata.hydrateArgs) ? rendererAliases.get(metadata.hydrateArgs) : metadata.hydrateArgs;
      if (clientOnlyValues.has(rendererName)) {
        const plural = validRenderers.length > 1;
        throw new AstroError({
          ...NoMatchingRenderer,
          message: NoMatchingRenderer.message(
            metadata.displayName,
            metadata?.componentUrl?.split(".").pop(),
            plural,
            validRenderers.length
          ),
          hint: NoMatchingRenderer.hint(
            formatList(probableRendererNames.map((r) => "`" + r + "`"))
          )
        });
      } else {
        throw new AstroError({
          ...NoClientOnlyHint,
          message: NoClientOnlyHint.message(metadata.displayName),
          hint: NoClientOnlyHint.hint(
            probableRendererNames.map((r) => r.replace("@astrojs/", "")).join("|")
          )
        });
      }
    } else if (typeof Component !== "string") {
      const matchingRenderers = validRenderers.filter(
        (r) => probableRendererNames.includes(r.name)
      );
      const plural = validRenderers.length > 1;
      if (matchingRenderers.length === 0) {
        throw new AstroError({
          ...NoMatchingRenderer,
          message: NoMatchingRenderer.message(
            metadata.displayName,
            metadata?.componentUrl?.split(".").pop(),
            plural,
            validRenderers.length
          ),
          hint: NoMatchingRenderer.hint(
            formatList(probableRendererNames.map((r) => "`" + r + "`"))
          )
        });
      } else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
          { result },
          Component,
          propsWithoutTransitionAttributes,
          children,
          metadata
        ));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.
3. If using multiple JSX frameworks at the same time (e.g. React + Preact), pass the correct \`include\`/\`exclude\` options to integrations.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      html = await renderSlotToString(result, slots?.fallback);
    } else {
      const componentRenderStartTime = performance.now();
      ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
        { result },
        Component,
        propsWithoutTransitionAttributes,
        children,
        metadata
      ));
      if (process.env.NODE_ENV === "development")
        componentServerRenderEndTime = performance.now() - componentRenderStartTime;
    }
  }
  if (!html && typeof Component === "string") {
    const Tag = sanitizeElementName(Component);
    const childSlots = Object.values(children).join("");
    const renderTemplateResult = renderTemplate`<${Tag}${internalSpreadAttributes(
      props,
      true,
      Tag
    )}${markHTMLString(
      childSlots === "" && voidElementNames.test(Tag) ? `/>` : `>${childSlots}</${Tag}>`
    )}`;
    html = "";
    const destination = {
      write(chunk) {
        if (chunk instanceof Response) return;
        html += chunkToString(result, chunk);
      }
    };
    await renderTemplateResult.render(destination);
  }
  if (!hydration) {
    return {
      render(destination) {
        if (slotInstructions) {
          for (const instruction of slotInstructions) {
            destination.write(instruction);
          }
        }
        if (isPage || renderer?.name === "astro:jsx") {
          destination.write(html);
        } else if (html && html.length > 0) {
          destination.write(
            markHTMLString(removeStaticAstroSlot(html, renderer?.ssr?.supportsAstroStaticSlot))
          );
        }
      }
    };
  }
  const astroId = shorthash(
    `<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}
${serializeProps(
      props,
      metadata
    )}`
  );
  const island = await generateHydrateScript(
    { renderer, result, astroId, props, attrs },
    metadata
  );
  if (componentServerRenderEndTime && process.env.NODE_ENV === "development")
    island.props["server-render-time"] = componentServerRenderEndTime;
  let unrenderedSlots = [];
  if (html) {
    if (Object.keys(children).length > 0) {
      for (const key of Object.keys(children)) {
        let tagName = renderer?.ssr?.supportsAstroStaticSlot ? !!metadata.hydrate ? "astro-slot" : "astro-static-slot" : "astro-slot";
        let expectedHTML = key === "default" ? `<${tagName}>` : `<${tagName} name="${key}">`;
        if (!html.includes(expectedHTML)) {
          unrenderedSlots.push(key);
        }
      }
    }
  } else {
    unrenderedSlots = Object.keys(children);
  }
  const template = unrenderedSlots.length > 0 ? unrenderedSlots.map(
    (key) => `<template data-astro-template${key !== "default" ? `="${key}"` : ""}>${children[key]}</template>`
  ).join("") : "";
  island.children = `${html ?? ""}${template}`;
  if (island.children) {
    island.props["await-children"] = "";
    island.children += `<!--astro:end-->`;
  }
  return {
    render(destination) {
      if (slotInstructions) {
        for (const instruction of slotInstructions) {
          destination.write(instruction);
        }
      }
      destination.write(createRenderInstruction({ type: "directive", hydration }));
      if (hydration.directive !== "only" && renderer?.ssr.renderHydrationScript) {
        destination.write(
          createRenderInstruction({
            type: "renderer-hydration-script",
            rendererName: renderer.name,
            render: renderer.ssr.renderHydrationScript
          })
        );
      }
      const renderedElement = renderElement$1("astro-island", island, false);
      destination.write(markHTMLString(renderedElement));
    }
  };
}
function sanitizeElementName(tag) {
  const unsafe = /[&<>'"\s]+/;
  if (!unsafe.test(tag)) return tag;
  return tag.trim().split(unsafe)[0].trim();
}
async function renderFragmentComponent(result, slots = {}) {
  const children = await renderSlotToString(result, slots?.default);
  return {
    render(destination) {
      if (children == null) return;
      destination.write(children);
    }
  };
}
async function renderHTMLComponent(result, Component, _props, slots = {}) {
  const { slotInstructions, children } = await renderSlots(result, slots);
  const html = Component({ slots: children });
  const hydrationHtml = slotInstructions ? slotInstructions.map((instr) => chunkToString(result, instr)).join("") : "";
  return {
    render(destination) {
      destination.write(markHTMLString(hydrationHtml + html));
    }
  };
}
function renderAstroComponent(result, displayName, Component, props, slots = {}) {
  if (containsServerDirective(props)) {
    const serverIslandComponent = new ServerIslandComponent(result, props, slots, displayName);
    result._metadata.propagators.add(serverIslandComponent);
    return serverIslandComponent;
  }
  const instance = createAstroComponentInstance(result, displayName, Component, props, slots);
  return {
    render(destination) {
      return instance.render(destination);
    }
  };
}
function renderComponent(result, displayName, Component, props, slots = {}) {
  if (isPromise(Component)) {
    return Component.catch(handleCancellation).then((x) => {
      return renderComponent(result, displayName, x, props, slots);
    });
  }
  if (isFragmentComponent(Component)) {
    return renderFragmentComponent(result, slots).catch(handleCancellation);
  }
  props = normalizeProps(props);
  if (isHTMLComponent(Component)) {
    return renderHTMLComponent(result, Component, props, slots).catch(handleCancellation);
  }
  if (isAstroComponentFactory(Component)) {
    return renderAstroComponent(result, displayName, Component, props, slots);
  }
  return renderFrameworkComponent(result, displayName, Component, props, slots).catch(
    handleCancellation
  );
  function handleCancellation(e) {
    if (result.cancelled)
      return {
        render() {
        }
      };
    throw e;
  }
}
function normalizeProps(props) {
  if (props["class:list"] !== void 0) {
    const value = props["class:list"];
    delete props["class:list"];
    props["class"] = clsx(props["class"], value);
    if (props["class"] === "") {
      delete props["class"];
    }
  }
  return props;
}
async function renderComponentToString(result, displayName, Component, props, slots = {}, isPage = false, route) {
  let str = "";
  let renderedFirstPageChunk = false;
  let head = "";
  if (isPage && !result.partial && nonAstroPageNeedsHeadInjection(Component)) {
    head += chunkToString(result, maybeRenderHead());
  }
  try {
    const destination = {
      write(chunk) {
        if (isPage && !result.partial && !renderedFirstPageChunk) {
          renderedFirstPageChunk = true;
          if (!/<!doctype html/i.test(String(chunk))) {
            const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
            str += doctype + head;
          }
        }
        if (chunk instanceof Response) return;
        str += chunkToString(result, chunk);
      }
    };
    const renderInstance = await renderComponent(result, displayName, Component, props, slots);
    if (containsServerDirective(props)) {
      await bufferHeadContent(result);
    }
    await renderInstance.render(destination);
  } catch (e) {
    if (AstroError.is(e) && !e.loc) {
      e.setLocation({
        file: route?.component
      });
    }
    throw e;
  }
  return str;
}
function nonAstroPageNeedsHeadInjection(pageComponent) {
  return !!pageComponent?.[needsHeadRenderingSymbol];
}

const ClientOnlyPlaceholder$1 = "astro-client-only";
const hasTriedRenderComponentSymbol = /* @__PURE__ */ Symbol("hasTriedRenderComponent");
async function renderJSX(result, vnode) {
  switch (true) {
    case vnode instanceof HTMLString:
      if (vnode.toString().trim() === "") {
        return "";
      }
      return vnode;
    case typeof vnode === "string":
      return markHTMLString(escapeHTML(vnode));
    case typeof vnode === "function":
      return vnode;
    case (!vnode && vnode !== 0):
      return "";
    case Array.isArray(vnode): {
      const renderedItems = await Promise.all(vnode.map((v) => renderJSX(result, v)));
      let instructions = null;
      let content = "";
      for (const item of renderedItems) {
        if (item instanceof SlotString) {
          content += item;
          instructions = mergeSlotInstructions(instructions, item);
        } else {
          content += item;
        }
      }
      if (instructions) {
        return markHTMLString(new SlotString(content, instructions));
      }
      return markHTMLString(content);
    }
  }
  return renderJSXVNode(result, vnode);
}
async function renderJSXVNode(result, vnode) {
  if (isVNode(vnode)) {
    switch (true) {
      case !vnode.type: {
        throw new Error(`Unable to render ${result.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      }
      case vnode.type === /* @__PURE__ */ Symbol.for("astro:fragment"):
        return renderJSX(result, vnode.props.children);
      case isAstroComponentFactory(vnode.type): {
        let props = {};
        let slots = {};
        for (const [key, value] of Object.entries(vnode.props ?? {})) {
          if (key === "children" || value && typeof value === "object" && value["$$slot"]) {
            slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
          } else {
            props[key] = value;
          }
        }
        const str = await renderComponentToString(
          result,
          vnode.type.name,
          vnode.type,
          props,
          slots
        );
        const html = markHTMLString(str);
        return html;
      }
      case (!vnode.type && vnode.type !== 0):
        return "";
      case (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder$1):
        return markHTMLString(await renderElement(result, vnode.type, vnode.props ?? {}));
    }
    if (vnode.type) {
      let extractSlots2 = function(child) {
        if (Array.isArray(child)) {
          return child.map((c) => extractSlots2(c));
        }
        if (!isVNode(child)) {
          _slots.default.push(child);
          return;
        }
        if ("slot" in child.props) {
          _slots[child.props.slot] = [..._slots[child.props.slot] ?? [], child];
          delete child.props.slot;
          return;
        }
        _slots.default.push(child);
      };
      if (typeof vnode.type === "function" && vnode.props["server:root"]) {
        const output2 = await vnode.type(vnode.props ?? {});
        return await renderJSX(result, output2);
      }
      if (typeof vnode.type === "function") {
        if (vnode.props[hasTriedRenderComponentSymbol]) {
          delete vnode.props[hasTriedRenderComponentSymbol];
          const output2 = await vnode.type(vnode.props ?? {});
          if (output2?.[AstroJSX] || !output2) {
            return await renderJSXVNode(result, output2);
          } else {
            return;
          }
        } else {
          vnode.props[hasTriedRenderComponentSymbol] = true;
        }
      }
      const { children = null, ...props } = vnode.props ?? {};
      const _slots = {
        default: []
      };
      extractSlots2(children);
      for (const [key, value] of Object.entries(props)) {
        if (value?.["$$slot"]) {
          _slots[key] = value;
          delete props[key];
        }
      }
      const slotPromises = [];
      const slots = {};
      for (const [key, value] of Object.entries(_slots)) {
        slotPromises.push(
          renderJSX(result, value).then((output2) => {
            if (output2.toString().trim().length === 0) return;
            slots[key] = () => output2;
          })
        );
      }
      await Promise.all(slotPromises);
      let output;
      if (vnode.type === ClientOnlyPlaceholder$1 && vnode.props["client:only"]) {
        output = await renderComponentToString(
          result,
          vnode.props["client:display-name"] ?? "",
          null,
          props,
          slots
        );
      } else {
        output = await renderComponentToString(
          result,
          typeof vnode.type === "function" ? vnode.type.name : vnode.type,
          vnode.type,
          props,
          slots
        );
      }
      return markHTMLString(output);
    }
  }
  return markHTMLString(`${vnode}`);
}
async function renderElement(result, tag, { children, ...props }) {
  return markHTMLString(
    `<${tag}${spreadAttributes(props)}${markHTMLString(
      (children == null || children === "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : await renderJSX(result, prerenderElementChildren$1(tag, children))}</${tag}>`
    )}`
  );
}
function prerenderElementChildren$1(tag, children) {
  if (typeof children === "string" && (tag === "style" || tag === "script")) {
    return markHTMLString(children);
  } else {
    return children;
  }
}

const ClientOnlyPlaceholder = "astro-client-only";
function renderJSXToQueue(vnode, result, queue, pool, stack, parent, metadata) {
  if (vnode instanceof HTMLString) {
    const html = vnode.toString();
    if (html.trim() === "") return;
    const node = pool.acquire("html-string", html);
    node.html = html;
    queue.nodes.push(node);
    return;
  }
  if (typeof vnode === "string") {
    const node = pool.acquire("text", vnode);
    node.content = vnode;
    queue.nodes.push(node);
    return;
  }
  if (typeof vnode === "number" || typeof vnode === "boolean") {
    const str = String(vnode);
    const node = pool.acquire("text", str);
    node.content = str;
    queue.nodes.push(node);
    return;
  }
  if (vnode == null || vnode === false) {
    return;
  }
  if (Array.isArray(vnode)) {
    for (let i = vnode.length - 1; i >= 0; i = i - 1) {
      stack.push({ node: vnode[i], parent, metadata });
    }
    return;
  }
  if (!isVNode(vnode)) {
    const str = String(vnode);
    const node = pool.acquire("text", str);
    node.content = str;
    queue.nodes.push(node);
    return;
  }
  handleVNode(vnode, result, queue, pool, stack, parent, metadata);
}
function handleVNode(vnode, result, queue, pool, stack, parent, metadata) {
  if (!vnode.type) {
    throw new Error(
      `Unable to render ${result.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  if (vnode.type === /* @__PURE__ */ Symbol.for("astro:fragment")) {
    stack.push({ node: vnode.props?.children, parent, metadata });
    return;
  }
  if (isAstroComponentFactory(vnode.type)) {
    const factory = vnode.type;
    let props = {};
    let slots = {};
    for (const [key, value] of Object.entries(vnode.props ?? {})) {
      if (key === "children" || value && typeof value === "object" && value["$$slot"]) {
        slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
      } else {
        props[key] = value;
      }
    }
    const displayName = metadata?.displayName || factory.name || "Anonymous";
    const instance = createAstroComponentInstance(result, displayName, factory, props, slots);
    const queueNode = pool.acquire("component");
    queueNode.instance = instance;
    queue.nodes.push(queueNode);
    return;
  }
  if (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder) {
    renderHTMLElement(vnode, result, queue, pool, stack, parent, metadata);
    return;
  }
  if (typeof vnode.type === "function") {
    if (vnode.props?.["server:root"]) {
      const output3 = vnode.type(vnode.props ?? {});
      stack.push({ node: output3, parent, metadata });
      return;
    }
    const output2 = vnode.type(vnode.props ?? {});
    stack.push({ node: output2, parent, metadata });
    return;
  }
  const output = renderJSX(result, vnode);
  stack.push({ node: output, parent, metadata });
}
function renderHTMLElement(vnode, _result, queue, pool, stack, parent, metadata) {
  const tag = vnode.type;
  const { children, ...props } = vnode.props ?? {};
  const attrs = spreadAttributes(props);
  const isVoidElement = (children == null || children === "") && voidElementNames.test(tag);
  if (isVoidElement) {
    const html = `<${tag}${attrs}/>`;
    const node = pool.acquire("html-string", html);
    node.html = html;
    queue.nodes.push(node);
    return;
  }
  const openTag = `<${tag}${attrs}>`;
  const openTagHtml = queue.htmlStringCache ? queue.htmlStringCache.getOrCreate(openTag) : markHTMLString(openTag);
  stack.push({ node: openTagHtml, parent, metadata });
  if (children != null && children !== "") {
    const processedChildren = prerenderElementChildren(tag, children, queue.htmlStringCache);
    stack.push({ node: processedChildren, parent, metadata });
  }
  const closeTag = `</${tag}>`;
  const closeTagHtml = queue.htmlStringCache ? queue.htmlStringCache.getOrCreate(closeTag) : markHTMLString(closeTag);
  stack.push({ node: closeTagHtml, parent, metadata });
}
function prerenderElementChildren(tag, children, htmlStringCache) {
  if (typeof children === "string" && (tag === "style" || tag === "script")) {
    return htmlStringCache ? htmlStringCache.getOrCreate(children) : markHTMLString(children);
  }
  return children;
}

async function buildRenderQueue(root, result, pool) {
  const queue = {
    nodes: [],
    result,
    pool,
    htmlStringCache: result._experimentalQueuedRendering?.htmlStringCache
  };
  const stack = [{ node: root, parent: null }];
  while (stack.length > 0) {
    const item = stack.pop();
    if (!item) {
      continue;
    }
    let { node, parent } = item;
    if (isPromise(node)) {
      try {
        const resolved = await node;
        stack.push({ node: resolved, parent, metadata: item.metadata });
      } catch (error) {
        throw error;
      }
      continue;
    }
    if (node == null || node === false) {
      continue;
    }
    if (typeof node === "string") {
      const queueNode = pool.acquire("text", node);
      queueNode.content = node;
      queue.nodes.push(queueNode);
      continue;
    }
    if (typeof node === "number" || typeof node === "boolean") {
      const str = String(node);
      const queueNode = pool.acquire("text", str);
      queueNode.content = str;
      queue.nodes.push(queueNode);
      continue;
    }
    if (isHTMLString(node)) {
      const html = node.toString();
      const queueNode = pool.acquire("html-string", html);
      queueNode.html = html;
      queue.nodes.push(queueNode);
      continue;
    }
    if (node instanceof SlotString) {
      const html = node.toString();
      const queueNode = pool.acquire("html-string", html);
      queueNode.html = html;
      queue.nodes.push(queueNode);
      continue;
    }
    if (isVNode(node)) {
      renderJSXToQueue(node, result, queue, pool, stack, parent, item.metadata);
      continue;
    }
    if (Array.isArray(node)) {
      for (const n of node) {
        stack.push({ node: n, parent, metadata: item.metadata });
      }
      continue;
    }
    if (isRenderInstruction(node)) {
      const queueNode = pool.acquire("instruction");
      queueNode.instruction = node;
      queue.nodes.push(queueNode);
      continue;
    }
    if (isRenderTemplateResult(node)) {
      const htmlParts = node["htmlParts"];
      const expressions = node["expressions"];
      if (htmlParts[0]) {
        const htmlString = queue.htmlStringCache ? queue.htmlStringCache.getOrCreate(htmlParts[0]) : markHTMLString(htmlParts[0]);
        stack.push({
          node: htmlString,
          parent,
          metadata: item.metadata
        });
      }
      for (let i = 0; i < expressions.length; i = i + 1) {
        stack.push({ node: expressions[i], parent, metadata: item.metadata });
        if (htmlParts[i + 1]) {
          const htmlString = queue.htmlStringCache ? queue.htmlStringCache.getOrCreate(htmlParts[i + 1]) : markHTMLString(htmlParts[i + 1]);
          stack.push({
            node: htmlString,
            parent,
            metadata: item.metadata
          });
        }
      }
      continue;
    }
    if (isAstroComponentInstance(node)) {
      const queueNode = pool.acquire("component");
      queueNode.instance = node;
      queue.nodes.push(queueNode);
      continue;
    }
    if (isAstroComponentFactory(node)) {
      const factory = node;
      const props = item.metadata?.props || {};
      const slots = item.metadata?.slots || {};
      const displayName = item.metadata?.displayName || factory.name || "Anonymous";
      const instance = createAstroComponentInstance(result, displayName, factory, props, slots);
      const queueNode = pool.acquire("component");
      queueNode.instance = instance;
      if (isAPropagatingComponent(result, factory)) {
        try {
          const returnValue = await instance.init(result);
          if (isHeadAndContent(returnValue) && returnValue.head) {
            result._metadata.extraHead.push(returnValue.head);
          }
        } catch (error) {
          throw error;
        }
      }
      queue.nodes.push(queueNode);
      continue;
    }
    if (isRenderInstance(node)) {
      const queueNode = pool.acquire("component");
      queueNode.instance = node;
      queue.nodes.push(queueNode);
      continue;
    }
    if (typeof node === "object" && Symbol.iterator in node) {
      const items = Array.from(node);
      for (const iterItem of items) {
        stack.push({ node: iterItem, parent, metadata: item.metadata });
      }
      continue;
    }
    if (typeof node === "object" && Symbol.asyncIterator in node) {
      try {
        const items = [];
        for await (const asyncItem of node) {
          items.push(asyncItem);
        }
        for (const iterItem of items) {
          stack.push({ node: iterItem, parent, metadata: item.metadata });
        }
      } catch (error) {
        throw error;
      }
      continue;
    }
    if (node instanceof Response) {
      const queueNode = pool.acquire("html-string", "");
      queueNode.html = "";
      queue.nodes.push(queueNode);
      continue;
    }
    if (isHTMLString(node)) {
      const html = String(node);
      const queueNode = pool.acquire("html-string", html);
      queueNode.html = html;
      queue.nodes.push(queueNode);
    } else {
      const str = String(node);
      const queueNode = pool.acquire("text", str);
      queueNode.content = str;
      queue.nodes.push(queueNode);
    }
  }
  queue.nodes.reverse();
  return queue;
}

async function renderQueue(queue, destination) {
  const result = queue.result;
  const pool = queue.pool;
  const cache = queue.htmlStringCache;
  let batchBuffer = "";
  let i = 0;
  while (i < queue.nodes.length) {
    const node = queue.nodes[i];
    try {
      if (canBatch(node)) {
        const batchStart = i;
        while (i < queue.nodes.length && canBatch(queue.nodes[i])) {
          batchBuffer += renderNodeToString(queue.nodes[i]);
          i = i + 1;
        }
        if (batchBuffer) {
          const htmlString = cache ? cache.getOrCreate(batchBuffer) : markHTMLString(batchBuffer);
          destination.write(htmlString);
          batchBuffer = "";
        }
        if (pool) {
          for (let j = batchStart; j < i; j++) {
            pool.release(queue.nodes[j]);
          }
        }
      } else {
        await renderNode(node, destination, result);
        if (pool) {
          pool.release(node);
        }
        i = i + 1;
      }
    } catch (error) {
      throw error;
    }
  }
  if (batchBuffer) {
    const htmlString = cache ? cache.getOrCreate(batchBuffer) : markHTMLString(batchBuffer);
    destination.write(htmlString);
  }
}
function canBatch(node) {
  return node.type === "text" || node.type === "html-string";
}
function renderNodeToString(node) {
  switch (node.type) {
    case "text":
      return node.content ? escapeHTML(node.content) : "";
    case "html-string":
      return node.html || "";
    case "component":
    case "instruction": {
      return "";
    }
  }
}
async function renderNode(node, destination, result) {
  const cache = result._experimentalQueuedRendering?.htmlStringCache;
  switch (node.type) {
    case "text": {
      if (node.content) {
        const escaped = escapeHTML(node.content);
        const htmlString = cache ? cache.getOrCreate(escaped) : markHTMLString(escaped);
        destination.write(htmlString);
      }
      break;
    }
    case "html-string": {
      if (node.html) {
        const htmlString = cache ? cache.getOrCreate(node.html) : markHTMLString(node.html);
        destination.write(htmlString);
      }
      break;
    }
    case "instruction": {
      if (node.instruction) {
        destination.write(node.instruction);
      }
      break;
    }
    case "component": {
      if (node.instance) {
        let componentHtml = "";
        const componentDestination = {
          write(chunk) {
            if (chunk instanceof Response) return;
            componentHtml += chunkToString(result, chunk);
          }
        };
        await node.instance.render(componentDestination);
        if (componentHtml) {
          destination.write(componentHtml);
        }
      }
      break;
    }
  }
}

async function renderPage(result, componentFactory, props, children, streaming, route) {
  if (!isAstroComponentFactory(componentFactory)) {
    result._metadata.headInTree = result.componentMetadata.get(componentFactory.moduleId)?.containsHead ?? false;
    const pageProps = { ...props ?? {}, "server:root": true };
    let str;
    if (result._experimentalQueuedRendering && result._experimentalQueuedRendering.enabled) {
      const vnode = await componentFactory(pageProps);
      const queue = await buildRenderQueue(
        vnode,
        result,
        result._experimentalQueuedRendering.pool
      );
      let html = "";
      let renderedFirst = false;
      const destination = {
        write(chunk) {
          if (chunk instanceof Response) return;
          if (!renderedFirst && !result.partial) {
            renderedFirst = true;
            const chunkStr = String(chunk);
            if (!/<!doctype html/i.test(chunkStr)) {
              const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
              html += doctype;
            }
          }
          html += chunkToString(result, chunk);
        }
      };
      await renderQueue(queue, destination);
      str = html;
    } else {
      str = await renderComponentToString(
        result,
        componentFactory.name,
        componentFactory,
        pageProps,
        {},
        true,
        route
      );
    }
    const bytes = encoder.encode(str);
    const headers2 = new Headers([
      ["Content-Type", "text/html"],
      ["Content-Length", bytes.byteLength.toString()]
    ]);
    if (result.shouldInjectCspMetaTags && (result.cspDestination === "header" || result.cspDestination === "adapter")) {
      headers2.set("content-security-policy", renderCspContent(result));
    }
    return new Response(bytes, {
      headers: headers2,
      status: result.response.status
    });
  }
  result._metadata.headInTree = result.componentMetadata.get(componentFactory.moduleId)?.containsHead ?? false;
  let body;
  if (streaming) {
    if (isNode && !isDeno) {
      const nodeBody = await renderToAsyncIterable(
        result,
        componentFactory,
        props,
        children,
        true,
        route
      );
      body = nodeBody;
    } else {
      body = await renderToReadableStream(result, componentFactory, props, children, true, route);
    }
  } else {
    body = await renderToString(result, componentFactory, props, children, true, route);
  }
  if (body instanceof Response) return body;
  const init = result.response;
  const headers = new Headers(init.headers);
  if (result.shouldInjectCspMetaTags && result.cspDestination === "header" || result.cspDestination === "adapter") {
    headers.set("content-security-policy", renderCspContent(result));
  }
  if (!streaming && typeof body === "string") {
    body = encoder.encode(body);
    headers.set("Content-Length", body.byteLength.toString());
  }
  let status = init.status;
  let statusText = init.statusText;
  if (route?.route === "/404") {
    status = 404;
    if (statusText === "OK") {
      statusText = "Not Found";
    }
  } else if (route?.route === "/500") {
    status = 500;
    if (statusText === "OK") {
      statusText = "Internal Server Error";
    }
  }
  if (status) {
    return new Response(body, { ...init, headers, status, statusText });
  } else {
    return new Response(body, { ...init, headers });
  }
}

function spreadAttributes(values = {}, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") {
      values.class += ` ${scopedClassName}`;
    } else if (typeof values["class:list"] !== "undefined") {
      values["class:list"] = [values["class:list"], scopedClassName];
    } else {
      values.class = scopedClassName;
    }
  }
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, true, _name);
  }
  return markHTMLString(output);
}

function deduplicateDirectiveValues(existingDirective, newDirective) {
  const [directiveName, ...existingValues] = existingDirective.split(/\s+/).filter(Boolean);
  const [newDirectiveName, ...newValues] = newDirective.split(/\s+/).filter(Boolean);
  if (directiveName !== newDirectiveName) {
    return void 0;
  }
  const finalDirectives = Array.from(/* @__PURE__ */ new Set([...existingValues, ...newValues]));
  return `${directiveName} ${finalDirectives.join(" ")}`;
}
function pushDirective(directives, newDirective) {
  let deduplicated = false;
  if (directives.length === 0) {
    return [newDirective];
  }
  const finalDirectives = [];
  for (const directive of directives) {
    if (deduplicated) {
      finalDirectives.push(directive);
      continue;
    }
    const result = deduplicateDirectiveValues(directive, newDirective);
    if (result) {
      finalDirectives.push(result);
      deduplicated = true;
    } else {
      finalDirectives.push(directive);
      finalDirectives.push(newDirective);
    }
  }
  return finalDirectives;
}

async function callMiddleware(onRequest, apiContext, responseFunction) {
  let nextCalled = false;
  let responseFunctionPromise = void 0;
  const next = async (payload) => {
    nextCalled = true;
    responseFunctionPromise = responseFunction(apiContext, payload);
    return responseFunctionPromise;
  };
  const middlewarePromise = onRequest(apiContext, next);
  return await Promise.resolve(middlewarePromise).then(async (value) => {
    if (nextCalled) {
      if (typeof value !== "undefined") {
        if (value instanceof Response === false) {
          throw new AstroError(MiddlewareNotAResponse);
        }
        return value;
      } else {
        if (responseFunctionPromise) {
          return responseFunctionPromise;
        } else {
          throw new AstroError(MiddlewareNotAResponse);
        }
      }
    } else if (typeof value === "undefined") {
      throw new AstroError(MiddlewareNoDataOrNextCalled);
    } else if (value instanceof Response === false) {
      throw new AstroError(MiddlewareNotAResponse);
    } else {
      return value;
    }
  });
}

const EMPTY_OPTIONS = Object.freeze({ tags: [] });
class NoopAstroCache {
  enabled = false;
  set() {
  }
  get tags() {
    return [];
  }
  get options() {
    return EMPTY_OPTIONS;
  }
  async invalidate() {
  }
}
let hasWarned = false;
class DisabledAstroCache {
  enabled = false;
  #logger;
  constructor(logger) {
    this.#logger = logger;
  }
  #warn() {
    if (!hasWarned) {
      hasWarned = true;
      this.#logger?.warn(
        "cache",
        "`cache.set()` was called but caching is not enabled. Configure a cache provider in your Astro config under `experimental.cache` to enable caching."
      );
    }
  }
  set() {
    this.#warn();
  }
  get tags() {
    return [];
  }
  get options() {
    return EMPTY_OPTIONS;
  }
  async invalidate() {
    throw new AstroError(CacheNotEnabled);
  }
}

const NOOP_ACTIONS_MOD = {
  server: {}
};

const FORM_CONTENT_TYPES = [
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
];
const SAFE_METHODS = ["GET", "HEAD", "OPTIONS"];
function createOriginCheckMiddleware() {
  return defineMiddleware((context, next) => {
    const { request, url, isPrerendered } = context;
    if (isPrerendered) {
      return next();
    }
    if (SAFE_METHODS.includes(request.method)) {
      return next();
    }
    const isSameOrigin = request.headers.get("origin") === url.origin;
    const hasContentType = request.headers.has("content-type");
    if (hasContentType) {
      const formLikeHeader = hasFormLikeHeader(request.headers.get("content-type"));
      if (formLikeHeader && !isSameOrigin) {
        return new Response(`Cross-site ${request.method} form submissions are forbidden`, {
          status: 403
        });
      }
    } else {
      if (!isSameOrigin) {
        return new Response(`Cross-site ${request.method} form submissions are forbidden`, {
          status: 403
        });
      }
    }
    return next();
  });
}
function hasFormLikeHeader(contentType) {
  if (contentType) {
    for (const FORM_CONTENT_TYPE of FORM_CONTENT_TYPES) {
      if (contentType.toLowerCase().includes(FORM_CONTENT_TYPE)) {
        return true;
      }
    }
  }
  return false;
}

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const RedirectComponentInstance = {
  default() {
    return new Response(null, {
      status: 301
    });
  }
};
const RedirectSinglePageBuiltModule = {
  page: () => Promise.resolve(RedirectComponentInstance),
  onRequest: (_, next) => next()
};

function getPattern(segments, base, addTrailingSlash) {
  const pathname = segments.map((segment) => {
    if (segment.length === 1 && segment[0].spread) {
      return "(?:\\/(.*?))?";
    } else {
      return "\\/" + segment.map((part) => {
        if (part.spread) {
          return "(.*?)";
        } else if (part.dynamic) {
          return "([^/]+?)";
        } else {
          return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }
      }).join("");
    }
  }).join("");
  const trailing = addTrailingSlash && segments.length ? getTrailingSlashPattern(addTrailingSlash) : "$";
  let initial = "\\/";
  if (addTrailingSlash === "never" && base !== "/") {
    initial = "";
  }
  return new RegExp(`^${pathname || initial}${trailing}`);
}
function getTrailingSlashPattern(addTrailingSlash) {
  if (addTrailingSlash === "always") {
    return "\\/$";
  }
  if (addTrailingSlash === "never") {
    return "$";
  }
  return "\\/?$";
}

const SERVER_ISLAND_ROUTE = "/_server-islands/[name]";
const SERVER_ISLAND_COMPONENT = "_server-islands.astro";
function badRequest(reason) {
  return new Response(null, {
    status: 400,
    statusText: "Bad request: " + reason
  });
}
const DEFAULT_BODY_SIZE_LIMIT = 1024 * 1024;
async function getRequestData(request, bodySizeLimit = DEFAULT_BODY_SIZE_LIMIT) {
  switch (request.method) {
    case "GET": {
      const url = new URL(request.url);
      const params = url.searchParams;
      if (!params.has("s") || !params.has("e") || !params.has("p")) {
        return badRequest("Missing required query parameters.");
      }
      const encryptedSlots = params.get("s");
      return {
        encryptedComponentExport: params.get("e"),
        encryptedProps: params.get("p"),
        encryptedSlots
      };
    }
    case "POST": {
      try {
        const body = await readBodyWithLimit(request, bodySizeLimit);
        const raw = new TextDecoder().decode(body);
        const data = JSON.parse(raw);
        if (Object.hasOwn(data, "slots") && typeof data.slots === "object") {
          return badRequest("Plaintext slots are not allowed. Slots must be encrypted.");
        }
        if (Object.hasOwn(data, "componentExport") && typeof data.componentExport === "string") {
          return badRequest(
            "Plaintext componentExport is not allowed. componentExport must be encrypted."
          );
        }
        return data;
      } catch (e) {
        if (e instanceof BodySizeLimitError) {
          return new Response(null, {
            status: 413,
            statusText: e.message
          });
        }
        if (e instanceof SyntaxError) {
          return badRequest("Request format is invalid.");
        }
        throw e;
      }
    }
    default: {
      return new Response(null, { status: 405 });
    }
  }
}
function createEndpoint(manifest) {
  const page = async (result) => {
    const params = result.params;
    if (!params.name) {
      return new Response(null, {
        status: 400,
        statusText: "Bad request"
      });
    }
    const componentId = params.name;
    const data = await getRequestData(result.request, manifest.serverIslandBodySizeLimit);
    if (data instanceof Response) {
      return data;
    }
    const serverIslandMappings = await manifest.serverIslandMappings?.();
    const serverIslandMap = await serverIslandMappings?.serverIslandMap;
    let imp = serverIslandMap?.get(componentId);
    if (!imp) {
      return new Response(null, {
        status: 404,
        statusText: "Not found"
      });
    }
    const key = await manifest.key;
    let componentExport;
    try {
      componentExport = await decryptString(key, data.encryptedComponentExport);
    } catch (_e) {
      return badRequest("Encrypted componentExport value is invalid.");
    }
    const encryptedProps = data.encryptedProps;
    let props = {};
    if (encryptedProps !== "") {
      try {
        const propString = await decryptString(key, encryptedProps);
        props = JSON.parse(propString);
      } catch (_e) {
        return badRequest("Encrypted props value is invalid.");
      }
    }
    let decryptedSlots = {};
    const encryptedSlots = data.encryptedSlots;
    if (encryptedSlots !== "") {
      try {
        const slotsString = await decryptString(key, encryptedSlots);
        decryptedSlots = JSON.parse(slotsString);
      } catch (_e) {
        return badRequest("Encrypted slots value is invalid.");
      }
    }
    const componentModule = await imp();
    let Component = componentModule[componentExport];
    const slots = {};
    for (const prop in decryptedSlots) {
      slots[prop] = createSlotValueFromString(decryptedSlots[prop]);
    }
    result.response.headers.set("X-Robots-Tag", "noindex");
    if (isAstroComponentFactory(Component)) {
      const ServerIsland = Component;
      Component = function(...args) {
        return ServerIsland.apply(this, args);
      };
      Object.assign(Component, ServerIsland);
      Component.propagation = "self";
    }
    return renderTemplate`${renderComponent(result, "Component", Component, props, slots)}`;
  };
  page.isAstroComponentFactory = true;
  const instance = {
    default: page,
    partial: true
  };
  return instance;
}

function createDefaultRoutes(manifest) {
  const root = new URL(manifest.rootDir);
  return [
    {
      instance: default404Instance,
      matchesComponent: (filePath) => filePath.href === new URL(DEFAULT_404_COMPONENT, root).href,
      route: DEFAULT_404_ROUTE.route,
      component: DEFAULT_404_COMPONENT
    },
    {
      instance: createEndpoint(manifest),
      matchesComponent: (filePath) => filePath.href === new URL(SERVER_ISLAND_COMPONENT, root).href,
      route: SERVER_ISLAND_ROUTE,
      component: SERVER_ISLAND_COMPONENT
    }
  ];
}

function deserializeManifest(serializedManifest, routesList) {
  const routes = [];
  if (serializedManifest.routes) {
    for (const serializedRoute of serializedManifest.routes) {
      routes.push({
        ...serializedRoute,
        routeData: deserializeRouteData(serializedRoute.routeData)
      });
      const route = serializedRoute;
      route.routeData = deserializeRouteData(serializedRoute.routeData);
    }
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    rootDir: new URL(serializedManifest.rootDir),
    srcDir: new URL(serializedManifest.srcDir),
    publicDir: new URL(serializedManifest.publicDir),
    outDir: new URL(serializedManifest.outDir),
    cacheDir: new URL(serializedManifest.cacheDir),
    buildClientDir: new URL(serializedManifest.buildClientDir),
    buildServerDir: new URL(serializedManifest.buildServerDir),
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    key
  };
}
function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin,
    distURL: rawRouteData.distURL
  };
}
function deserializeRouteInfo(rawRouteInfo) {
  return {
    styles: rawRouteInfo.styles,
    file: rawRouteInfo.file,
    links: rawRouteInfo.links,
    scripts: rawRouteInfo.scripts,
    routeData: deserializeRouteData(rawRouteInfo.routeData)
  };
}

class NodePool {
  textPool = [];
  htmlStringPool = [];
  componentPool = [];
  instructionPool = [];
  maxSize;
  enableStats;
  stats = {
    acquireFromPool: 0,
    acquireNew: 0,
    released: 0,
    releasedDropped: 0
  };
  /**
   * Creates a new object pool for queue nodes.
   *
   * @param maxSize - Maximum number of nodes to keep in the pool (default: 1000).
   *   The cap is shared across all typed sub-pools.
   * @param enableStats - Enable statistics tracking (default: false for performance)
   */
  constructor(maxSize = 1e3, enableStats = false) {
    this.maxSize = maxSize;
    this.enableStats = enableStats;
  }
  /**
   * Acquires a queue node from the pool or creates a new one if the pool is empty.
   * Pops from the type-specific sub-pool to reuse an existing object when available.
   *
   * @param type - The type of queue node to acquire
   * @param content - Optional content to set on the node (for text or html-string types)
   * @returns A queue node ready to be populated with data
   */
  acquire(type, content) {
    const pooledNode = this.popFromTypedPool(type);
    if (pooledNode) {
      if (this.enableStats) {
        this.stats.acquireFromPool = this.stats.acquireFromPool + 1;
      }
      this.resetNodeContent(pooledNode, type, content);
      return pooledNode;
    }
    if (this.enableStats) {
      this.stats.acquireNew = this.stats.acquireNew + 1;
    }
    return this.createNode(type, content);
  }
  /**
   * Creates a new node of the specified type with the given content.
   * Helper method to reduce branching in acquire().
   */
  createNode(type, content = "") {
    switch (type) {
      case "text":
        return { type: "text", content };
      case "html-string":
        return { type: "html-string", html: content };
      case "component":
        return { type: "component", instance: void 0 };
      case "instruction":
        return { type: "instruction", instruction: void 0 };
    }
  }
  /**
   * Pops a node from the type-specific sub-pool.
   * Returns undefined if the sub-pool for the requested type is empty.
   */
  popFromTypedPool(type) {
    switch (type) {
      case "text":
        return this.textPool.pop();
      case "html-string":
        return this.htmlStringPool.pop();
      case "component":
        return this.componentPool.pop();
      case "instruction":
        return this.instructionPool.pop();
    }
  }
  /**
   * Resets the content/value field on a reused pooled node.
   * The type discriminant is already correct since we pop from the matching sub-pool.
   */
  resetNodeContent(node, type, content) {
    switch (type) {
      case "text":
        node.content = content ?? "";
        break;
      case "html-string":
        node.html = content ?? "";
        break;
      case "component":
        node.instance = void 0;
        break;
      case "instruction":
        node.instruction = void 0;
        break;
    }
  }
  /**
   * Returns the total number of nodes across all typed sub-pools.
   */
  totalPoolSize() {
    return this.textPool.length + this.htmlStringPool.length + this.componentPool.length + this.instructionPool.length;
  }
  /**
   * Releases a queue node back to the pool for reuse.
   * If the pool is at max capacity, the node is discarded (will be GC'd).
   *
   * @param node - The node to release back to the pool
   */
  release(node) {
    if (this.totalPoolSize() >= this.maxSize) {
      if (this.enableStats) {
        this.stats.releasedDropped = this.stats.releasedDropped + 1;
      }
      return;
    }
    switch (node.type) {
      case "text":
        node.content = "";
        this.textPool.push(node);
        break;
      case "html-string":
        node.html = "";
        this.htmlStringPool.push(node);
        break;
      case "component":
        node.instance = void 0;
        this.componentPool.push(node);
        break;
      case "instruction":
        node.instruction = void 0;
        this.instructionPool.push(node);
        break;
    }
    if (this.enableStats) {
      this.stats.released = this.stats.released + 1;
    }
  }
  /**
   * Releases all nodes in an array back to the pool.
   * This is a convenience method for releasing multiple nodes at once.
   *
   * @param nodes - Array of nodes to release
   */
  releaseAll(nodes) {
    for (const node of nodes) {
      this.release(node);
    }
  }
  /**
   * Clears all typed sub-pools, discarding all cached nodes.
   * This can be useful if you want to free memory after a large render.
   */
  clear() {
    this.textPool.length = 0;
    this.htmlStringPool.length = 0;
    this.componentPool.length = 0;
    this.instructionPool.length = 0;
  }
  /**
   * Gets the current total number of nodes across all typed sub-pools.
   * Useful for monitoring pool usage and tuning maxSize.
   *
   * @returns Number of nodes currently available in the pool
   */
  size() {
    return this.totalPoolSize();
  }
  /**
   * Gets pool statistics for debugging.
   *
   * @returns Pool usage statistics including computed metrics
   */
  getStats() {
    return {
      ...this.stats,
      poolSize: this.totalPoolSize(),
      maxSize: this.maxSize,
      hitRate: this.stats.acquireFromPool + this.stats.acquireNew > 0 ? this.stats.acquireFromPool / (this.stats.acquireFromPool + this.stats.acquireNew) * 100 : 0
    };
  }
  /**
   * Resets pool statistics.
   */
  resetStats() {
    this.stats = {
      acquireFromPool: 0,
      acquireNew: 0,
      released: 0,
      releasedDropped: 0
    };
  }
}

class HTMLStringCache {
  cache = /* @__PURE__ */ new Map();
  maxSize;
  constructor(maxSize = 1e3) {
    this.maxSize = maxSize;
    this.warm(COMMON_HTML_PATTERNS);
  }
  /**
   * Get or create an HTMLString for the given content.
   * If cached, the existing object is returned and moved to end (most recently used).
   * If not cached, a new HTMLString is created, cached, and returned.
   *
   * @param content - The HTML string content
   * @returns HTMLString object (cached or newly created)
   */
  getOrCreate(content) {
    const cached = this.cache.get(content);
    if (cached) {
      this.cache.delete(content);
      this.cache.set(content, cached);
      return cached;
    }
    const htmlString = new HTMLString(content);
    this.cache.set(content, htmlString);
    if (this.cache.size > this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== void 0) {
        this.cache.delete(firstKey);
      }
    }
    return htmlString;
  }
  /**
   * Get current cache size
   */
  size() {
    return this.cache.size;
  }
  /**
   * Pre-warms the cache with common HTML patterns.
   * This ensures first-render cache hits for frequently used tags.
   *
   * @param patterns - Array of HTML strings to pre-cache
   */
  warm(patterns) {
    for (const pattern of patterns) {
      if (!this.cache.has(pattern)) {
        this.cache.set(pattern, new HTMLString(pattern));
      }
    }
  }
  /**
   * Clear the entire cache
   */
  clear() {
    this.cache.clear();
  }
}
const COMMON_HTML_PATTERNS = [
  // Structural elements
  "<div>",
  "</div>",
  "<span>",
  "</span>",
  "<p>",
  "</p>",
  "<section>",
  "</section>",
  "<article>",
  "</article>",
  "<header>",
  "</header>",
  "<footer>",
  "</footer>",
  "<nav>",
  "</nav>",
  "<main>",
  "</main>",
  "<aside>",
  "</aside>",
  // List elements
  "<ul>",
  "</ul>",
  "<ol>",
  "</ol>",
  "<li>",
  "</li>",
  // Void/self-closing elements
  "<br>",
  "<hr>",
  "<br/>",
  "<hr/>",
  // Heading elements
  "<h1>",
  "</h1>",
  "<h2>",
  "</h2>",
  "<h3>",
  "</h3>",
  "<h4>",
  "</h4>",
  // Inline elements
  "<a>",
  "</a>",
  "<strong>",
  "</strong>",
  "<em>",
  "</em>",
  "<code>",
  "</code>",
  // Common whitespace
  " ",
  "\n"
];

class Pipeline {
  constructor(logger, manifest, runtimeMode, renderers, resolve, streaming, adapterName = manifest.adapterName, clientDirectives = manifest.clientDirectives, inlinedScripts = manifest.inlinedScripts, compressHTML = manifest.compressHTML, i18n = manifest.i18n, middleware = manifest.middleware, routeCache = new RouteCache(logger, runtimeMode), site = manifest.site ? new URL(manifest.site) : void 0, defaultRoutes = createDefaultRoutes(manifest), actions = manifest.actions, sessionDriver = manifest.sessionDriver, cacheProvider = manifest.cacheProvider, cacheConfig = manifest.cacheConfig, serverIslands = manifest.serverIslandMappings) {
    this.logger = logger;
    this.manifest = manifest;
    this.runtimeMode = runtimeMode;
    this.renderers = renderers;
    this.resolve = resolve;
    this.streaming = streaming;
    this.adapterName = adapterName;
    this.clientDirectives = clientDirectives;
    this.inlinedScripts = inlinedScripts;
    this.compressHTML = compressHTML;
    this.i18n = i18n;
    this.middleware = middleware;
    this.routeCache = routeCache;
    this.site = site;
    this.defaultRoutes = defaultRoutes;
    this.actions = actions;
    this.sessionDriver = sessionDriver;
    this.cacheProvider = cacheProvider;
    this.cacheConfig = cacheConfig;
    this.serverIslands = serverIslands;
    this.internalMiddleware = [];
    if (i18n?.strategy !== "manual") {
      this.internalMiddleware.push(
        createI18nMiddleware(i18n, manifest.base, manifest.trailingSlash, manifest.buildFormat)
      );
    }
    if (manifest.experimentalQueuedRendering.enabled) {
      this.nodePool = this.createNodePool(
        manifest.experimentalQueuedRendering.poolSize ?? 1e3,
        false
      );
      if (manifest.experimentalQueuedRendering.contentCache) {
        this.htmlStringCache = this.createStringCache();
      }
    }
  }
  internalMiddleware;
  resolvedMiddleware = void 0;
  resolvedActions = void 0;
  resolvedSessionDriver = void 0;
  resolvedCacheProvider = void 0;
  compiledCacheRoutes = void 0;
  nodePool;
  htmlStringCache;
  /**
   * Resolves the middleware from the manifest, and returns the `onRequest` function. If `onRequest` isn't there,
   * it returns a no-op function
   */
  async getMiddleware() {
    if (this.resolvedMiddleware) {
      return this.resolvedMiddleware;
    }
    if (this.middleware) {
      const middlewareInstance = await this.middleware();
      const onRequest = middlewareInstance.onRequest ?? NOOP_MIDDLEWARE_FN;
      const internalMiddlewares = [onRequest];
      if (this.manifest.checkOrigin) {
        internalMiddlewares.unshift(createOriginCheckMiddleware());
      }
      this.resolvedMiddleware = sequence(...internalMiddlewares);
      return this.resolvedMiddleware;
    } else {
      this.resolvedMiddleware = NOOP_MIDDLEWARE_FN;
      return this.resolvedMiddleware;
    }
  }
  async getActions() {
    if (this.resolvedActions) {
      return this.resolvedActions;
    } else if (this.actions) {
      return this.actions();
    }
    return NOOP_ACTIONS_MOD;
  }
  async getSessionDriver() {
    if (this.resolvedSessionDriver !== void 0) {
      return this.resolvedSessionDriver;
    }
    if (this.sessionDriver) {
      const driverModule = await this.sessionDriver();
      this.resolvedSessionDriver = driverModule?.default || null;
      return this.resolvedSessionDriver;
    }
    this.resolvedSessionDriver = null;
    return null;
  }
  async getCacheProvider() {
    if (this.resolvedCacheProvider !== void 0) {
      return this.resolvedCacheProvider;
    }
    if (this.cacheProvider) {
      const mod = await this.cacheProvider();
      const factory = mod?.default || null;
      this.resolvedCacheProvider = factory ? factory(this.cacheConfig?.options) : null;
      return this.resolvedCacheProvider;
    }
    this.resolvedCacheProvider = null;
    return null;
  }
  async getServerIslands() {
    if (this.serverIslands) {
      return this.serverIslands();
    }
    return {
      serverIslandMap: /* @__PURE__ */ new Map(),
      serverIslandNameMap: /* @__PURE__ */ new Map()
    };
  }
  async getAction(path) {
    const pathKeys = path.split(".").map((key) => decodeURIComponent(key));
    let { server } = await this.getActions();
    if (!server || !(typeof server === "object")) {
      throw new TypeError(
        `Expected \`server\` export in actions file to be an object. Received ${typeof server}.`
      );
    }
    for (const key of pathKeys) {
      if (!Object.hasOwn(server, key)) {
        throw new AstroError({
          ...ActionNotFoundError,
          message: ActionNotFoundError.message(pathKeys.join("."))
        });
      }
      server = server[key];
    }
    if (typeof server !== "function") {
      throw new TypeError(
        `Expected handler for action ${pathKeys.join(".")} to be a function. Received ${typeof server}.`
      );
    }
    return server;
  }
  async getModuleForRoute(route) {
    for (const defaultRoute of this.defaultRoutes) {
      if (route.component === defaultRoute.component) {
        return {
          page: () => Promise.resolve(defaultRoute.instance)
        };
      }
    }
    if (route.type === "redirect") {
      return RedirectSinglePageBuiltModule;
    } else {
      if (this.manifest.pageMap) {
        const importComponentInstance = this.manifest.pageMap.get(route.component);
        if (!importComponentInstance) {
          throw new Error(
            `Unexpectedly unable to find a component instance for route ${route.route}`
          );
        }
        return await importComponentInstance();
      } else if (this.manifest.pageModule) {
        return this.manifest.pageModule;
      }
      throw new Error(
        "Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue."
      );
    }
  }
  createNodePool(poolSize, stats) {
    return new NodePool(poolSize, stats);
  }
  createStringCache() {
    return new HTMLStringCache(1e3);
  }
}

function getFunctionExpression(slot) {
  if (!slot) return;
  const expressions = slot?.expressions?.filter((e) => isRenderInstruction(e) === false);
  if (expressions?.length !== 1) return;
  return expressions[0];
}
class Slots {
  #result;
  #slots;
  #logger;
  constructor(result, slots, logger) {
    this.#result = result;
    this.#slots = slots;
    this.#logger = logger;
    if (slots) {
      for (const key of Object.keys(slots)) {
        if (this[key] !== void 0) {
          throw new AstroError({
            ...ReservedSlotName,
            message: ReservedSlotName.message(key)
          });
        }
        Object.defineProperty(this, key, {
          get() {
            return true;
          },
          enumerable: true
        });
      }
    }
  }
  has(name) {
    if (!this.#slots) return false;
    return Boolean(this.#slots[name]);
  }
  async render(name, args = []) {
    if (!this.#slots || !this.has(name)) return;
    const result = this.#result;
    if (!Array.isArray(args)) {
      this.#logger.warn(
        null,
        `Expected second parameter to be an array, received a ${typeof args}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as an item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`
      );
    } else if (args.length > 0) {
      const slotValue = this.#slots[name];
      const component = typeof slotValue === "function" ? await slotValue(result) : await slotValue;
      const expression = getFunctionExpression(component);
      if (expression) {
        const slot = async () => typeof expression === "function" ? expression(...args) : expression;
        return await renderSlotToString(result, slot).then((res) => {
          return res;
        });
      }
      if (typeof component === "function") {
        return await renderJSX(result, component(...args)).then(
          (res) => res != null ? String(res) : res
        );
      }
    }
    const content = await renderSlotToString(result, this.#slots[name]);
    const outHTML = chunkToString(result, content);
    return outHTML;
  }
}

function isExternalURL(url) {
  return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
}
function redirectIsExternal(redirect) {
  if (typeof redirect === "string") {
    return isExternalURL(redirect);
  } else {
    return isExternalURL(redirect.destination);
  }
}
async function renderRedirect(renderContext) {
  const {
    request: { method },
    routeData
  } = renderContext;
  const { redirect, redirectRoute } = routeData;
  const status = redirectRoute && typeof redirect === "object" ? redirect.status : method === "GET" ? 301 : 308;
  const headers = { location: encodeURI(redirectRouteGenerate(renderContext)) };
  if (redirect && redirectIsExternal(redirect)) {
    if (typeof redirect === "string") {
      return Response.redirect(redirect, status);
    } else {
      return Response.redirect(redirect.destination, status);
    }
  }
  return new Response(null, { status, headers });
}
function redirectRouteGenerate(renderContext) {
  const {
    params,
    routeData: { redirect, redirectRoute },
    pipeline
  } = renderContext;
  if (typeof redirectRoute !== "undefined") {
    const generate = getRouteGenerator(redirectRoute.segments, pipeline.manifest.trailingSlash);
    return generate(params);
  } else if (typeof redirect === "string") {
    if (redirectIsExternal(redirect)) {
      return redirect;
    } else {
      let target = redirect;
      for (const param of Object.keys(params)) {
        const paramValue = params[param];
        target = target.replace(`[${param}]`, paramValue).replace(`[...${param}]`, paramValue);
      }
      return target;
    }
  } else if (typeof redirect === "undefined") {
    return "/";
  }
  return redirect.destination;
}

function matchRoute(pathname, manifest) {
  if (isRoute404(pathname)) {
    const errorRoute = manifest.routes.find((route) => isRoute404(route.route));
    if (errorRoute) return errorRoute;
  }
  if (isRoute500(pathname)) {
    const errorRoute = manifest.routes.find((route) => isRoute500(route.route));
    if (errorRoute) return errorRoute;
  }
  return manifest.routes.find((route) => {
    return route.pattern.test(pathname) || route.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
  });
}
function isRoute404or500(route) {
  return isRoute404(route.route) || isRoute500(route.route);
}
function isRouteServerIsland(route) {
  return route.component === SERVER_ISLAND_COMPONENT;
}
function isRouteExternalRedirect(route) {
  return !!(route.type === "redirect" && route.redirect && redirectIsExternal(route.redirect));
}

function defaultSetHeaders(options) {
  const headers = new Headers();
  const directives = [];
  if (options.maxAge !== void 0) {
    directives.push(`max-age=${options.maxAge}`);
  }
  if (options.swr !== void 0) {
    directives.push(`stale-while-revalidate=${options.swr}`);
  }
  if (directives.length > 0) {
    headers.set("CDN-Cache-Control", directives.join(", "));
  }
  if (options.tags && options.tags.length > 0) {
    headers.set("Cache-Tag", options.tags.join(", "));
  }
  if (options.lastModified) {
    headers.set("Last-Modified", options.lastModified.toUTCString());
  }
  if (options.etag) {
    headers.set("ETag", options.etag);
  }
  return headers;
}
function isLiveDataEntry(value) {
  return value != null && typeof value === "object" && "id" in value && "data" in value && "cacheHint" in value;
}

const APPLY_HEADERS = /* @__PURE__ */ Symbol.for("astro:cache:apply");
const IS_ACTIVE = /* @__PURE__ */ Symbol.for("astro:cache:active");
class AstroCache {
  #options = {};
  #tags = /* @__PURE__ */ new Set();
  #disabled = false;
  #provider;
  enabled = true;
  constructor(provider) {
    this.#provider = provider;
  }
  set(input) {
    if (input === false) {
      this.#disabled = true;
      this.#tags.clear();
      this.#options = {};
      return;
    }
    this.#disabled = false;
    let options;
    if (isLiveDataEntry(input)) {
      if (!input.cacheHint) return;
      options = input.cacheHint;
    } else {
      options = input;
    }
    if ("maxAge" in options && options.maxAge !== void 0) this.#options.maxAge = options.maxAge;
    if ("swr" in options && options.swr !== void 0)
      this.#options.swr = options.swr;
    if ("etag" in options && options.etag !== void 0)
      this.#options.etag = options.etag;
    if (options.lastModified !== void 0) {
      if (!this.#options.lastModified || options.lastModified > this.#options.lastModified) {
        this.#options.lastModified = options.lastModified;
      }
    }
    if (options.tags) {
      for (const tag of options.tags) this.#tags.add(tag);
    }
  }
  get tags() {
    return [...this.#tags];
  }
  /**
   * Get the current cache options (read-only snapshot).
   * Includes all accumulated options: maxAge, swr, tags, etag, lastModified.
   */
  get options() {
    return {
      ...this.#options,
      tags: this.tags
    };
  }
  async invalidate(input) {
    if (!this.#provider) {
      throw new AstroError(CacheNotEnabled);
    }
    let options;
    if (isLiveDataEntry(input)) {
      options = { tags: input.cacheHint?.tags ?? [] };
    } else {
      options = input;
    }
    return this.#provider.invalidate(options);
  }
  /** @internal */
  [APPLY_HEADERS](response) {
    if (this.#disabled) return;
    const finalOptions = { ...this.#options, tags: this.tags };
    if (finalOptions.maxAge === void 0 && !finalOptions.tags?.length) return;
    const headers = this.#provider?.setHeaders?.(finalOptions) ?? defaultSetHeaders(finalOptions);
    for (const [key, value] of headers) {
      response.headers.set(key, value);
    }
  }
  /** @internal */
  get [IS_ACTIVE]() {
    return !this.#disabled && (this.#options.maxAge !== void 0 || this.#tags.size > 0);
  }
}
function applyCacheHeaders(cache, response) {
  if (APPLY_HEADERS in cache) {
    cache[APPLY_HEADERS](response);
  }
}

const ROUTE_DYNAMIC_SPLIT = /\[(.+?\(.+?\)|.+?)\]/;
const ROUTE_SPREAD = /^\.{3}.+$/;
function getParts(part, file) {
  const result = [];
  part.split(ROUTE_DYNAMIC_SPLIT).map((str, i) => {
    if (!str) return;
    const dynamic = i % 2 === 1;
    const [, content] = dynamic ? /([^(]+)$/.exec(str) || [null, null] : [null, str];
    if (!content || dynamic && !/^(?:\.\.\.)?[\w$]+$/.test(content)) {
      throw new Error(`Invalid route ${file} \u2014 parameter name must match /^[a-zA-Z0-9_$]+$/`);
    }
    result.push({
      content,
      dynamic,
      spread: dynamic && ROUTE_SPREAD.test(content)
    });
  });
  return result;
}

function routeComparator(a, b) {
  const commonLength = Math.min(a.segments.length, b.segments.length);
  for (let index = 0; index < commonLength; index++) {
    const aSegment = a.segments[index];
    const bSegment = b.segments[index];
    const aIsStatic = aSegment.every((part) => !part.dynamic && !part.spread);
    const bIsStatic = bSegment.every((part) => !part.dynamic && !part.spread);
    if (aIsStatic && bIsStatic) {
      const aContent = aSegment.map((part) => part.content).join("");
      const bContent = bSegment.map((part) => part.content).join("");
      if (aContent !== bContent) {
        return aContent.localeCompare(bContent);
      }
    }
    if (aIsStatic !== bIsStatic) {
      return aIsStatic ? -1 : 1;
    }
    const aAllDynamic = aSegment.every((part) => part.dynamic);
    const bAllDynamic = bSegment.every((part) => part.dynamic);
    if (aAllDynamic !== bAllDynamic) {
      return aAllDynamic ? 1 : -1;
    }
    const aHasSpread = aSegment.some((part) => part.spread);
    const bHasSpread = bSegment.some((part) => part.spread);
    if (aHasSpread !== bHasSpread) {
      return aHasSpread ? 1 : -1;
    }
  }
  const aLength = a.segments.length;
  const bLength = b.segments.length;
  if (aLength !== bLength) {
    const aEndsInRest = a.segments.at(-1)?.some((part) => part.spread);
    const bEndsInRest = b.segments.at(-1)?.some((part) => part.spread);
    if (aEndsInRest !== bEndsInRest && Math.abs(aLength - bLength) === 1) {
      if (aLength > bLength && aEndsInRest) {
        return 1;
      }
      if (bLength > aLength && bEndsInRest) {
        return -1;
      }
    }
    return aLength > bLength ? -1 : 1;
  }
  if (a.type === "endpoint" !== (b.type === "endpoint")) {
    return a.type === "endpoint" ? -1 : 1;
  }
  return a.route.localeCompare(b.route);
}

function compileCacheRoutes(routes, base, trailingSlash) {
  const compiled = Object.entries(routes).map(([path, options]) => {
    const segments = removeLeadingForwardSlash(path).split("/").filter(Boolean).map((s) => getParts(s, path));
    const pattern = getPattern(segments, base, trailingSlash);
    return { pattern, options, segments, route: path };
  });
  compiled.sort(
    (a, b) => routeComparator(
      { segments: a.segments, route: a.route, type: "page" },
      { segments: b.segments, route: b.route, type: "page" }
    )
  );
  return compiled;
}
function matchCacheRoute(pathname, compiledRoutes) {
  for (const route of compiledRoutes) {
    if (route.pattern.test(pathname)) return route.options;
  }
  return null;
}

const PERSIST_SYMBOL = /* @__PURE__ */ Symbol();
const DEFAULT_COOKIE_NAME = "astro-session";
const VALID_COOKIE_REGEX = /^[\w-]+$/;
const unflatten = (parsed, _) => {
  return unflatten$1(parsed, {
    URL: (href) => new URL(href)
  });
};
const stringify = (data, _) => {
  return stringify$1(data, {
    // Support URL objects
    URL: (val) => val instanceof URL && val.href
  });
};
class AstroSession {
  // The cookies object.
  #cookies;
  // The session configuration.
  #config;
  // The cookie config
  #cookieConfig;
  // The cookie name
  #cookieName;
  // The unstorage object for the session driver.
  #storage;
  #data;
  // The session ID. A v4 UUID.
  #sessionID;
  // Sessions to destroy. Needed because we won't have the old session ID after it's destroyed locally.
  #toDestroy = /* @__PURE__ */ new Set();
  // Session keys to delete. Used for partial data sets to avoid overwriting the deleted value.
  #toDelete = /* @__PURE__ */ new Set();
  // Whether the session is dirty and needs to be saved.
  #dirty = false;
  // Whether the session cookie has been set.
  #cookieSet = false;
  // Whether the session ID was sourced from a client cookie rather than freshly generated.
  #sessionIDFromCookie = false;
  // The local data is "partial" if it has not been loaded from storage yet and only
  // contains values that have been set or deleted in-memory locally.
  // We do this to avoid the need to block on loading data when it is only being set.
  // When we load the data from storage, we need to merge it with the local partial data,
  // preserving in-memory changes and deletions.
  #partial = true;
  // The driver factory function provided by the pipeline
  #driverFactory;
  static #sharedStorage = /* @__PURE__ */ new Map();
  constructor({
    cookies,
    config,
    runtimeMode,
    driverFactory,
    mockStorage
  }) {
    if (!config) {
      throw new AstroError({
        ...SessionStorageInitError,
        message: SessionStorageInitError.message(
          "No driver was defined in the session configuration and the adapter did not provide a default driver."
        )
      });
    }
    this.#cookies = cookies;
    this.#driverFactory = driverFactory;
    const { cookie: cookieConfig = DEFAULT_COOKIE_NAME, ...configRest } = config;
    let cookieConfigObject;
    if (typeof cookieConfig === "object") {
      const { name = DEFAULT_COOKIE_NAME, ...rest } = cookieConfig;
      this.#cookieName = name;
      cookieConfigObject = rest;
    } else {
      this.#cookieName = cookieConfig || DEFAULT_COOKIE_NAME;
    }
    this.#cookieConfig = {
      sameSite: "lax",
      secure: runtimeMode === "production",
      path: "/",
      ...cookieConfigObject,
      httpOnly: true
    };
    this.#config = configRest;
    if (mockStorage) {
      this.#storage = mockStorage;
    }
  }
  /**
   * Gets a session value. Returns `undefined` if the session or value does not exist.
   */
  async get(key) {
    return (await this.#ensureData()).get(key)?.data;
  }
  /**
   * Checks if a session value exists.
   */
  async has(key) {
    return (await this.#ensureData()).has(key);
  }
  /**
   * Gets all session values.
   */
  async keys() {
    return (await this.#ensureData()).keys();
  }
  /**
   * Gets all session values.
   */
  async values() {
    return [...(await this.#ensureData()).values()].map((entry) => entry.data);
  }
  /**
   * Gets all session entries.
   */
  async entries() {
    return [...(await this.#ensureData()).entries()].map(([key, entry]) => [key, entry.data]);
  }
  /**
   * Deletes a session value.
   */
  delete(key) {
    this.#data?.delete(key);
    if (this.#partial) {
      this.#toDelete.add(key);
    }
    this.#dirty = true;
  }
  /**
   * Sets a session value. The session is created if it does not exist.
   */
  set(key, value, { ttl } = {}) {
    if (!key) {
      throw new AstroError({
        ...SessionStorageSaveError,
        message: "The session key was not provided."
      });
    }
    let cloned;
    try {
      cloned = unflatten(JSON.parse(stringify(value)));
    } catch (err) {
      throw new AstroError(
        {
          ...SessionStorageSaveError,
          message: `The session data for ${key} could not be serialized.`,
          hint: "See the devalue library for all supported types: https://github.com/rich-harris/devalue"
        },
        { cause: err }
      );
    }
    if (!this.#cookieSet) {
      this.#setCookie();
      this.#cookieSet = true;
    }
    this.#data ??= /* @__PURE__ */ new Map();
    const lifetime = ttl ?? this.#config.ttl;
    const expires = typeof lifetime === "number" ? Date.now() + lifetime * 1e3 : lifetime;
    this.#data.set(key, {
      data: cloned,
      expires
    });
    this.#dirty = true;
  }
  /**
   * Destroys the session, clearing the cookie and storage if it exists.
   */
  destroy() {
    const sessionId = this.#sessionID ?? this.#cookies.get(this.#cookieName)?.value;
    if (sessionId) {
      this.#toDestroy.add(sessionId);
    }
    this.#cookies.delete(this.#cookieName, this.#cookieConfig);
    this.#sessionID = void 0;
    this.#data = void 0;
    this.#dirty = true;
  }
  /**
   * Regenerates the session, creating a new session ID. The existing session data is preserved.
   */
  async regenerate() {
    let data = /* @__PURE__ */ new Map();
    try {
      data = await this.#ensureData();
    } catch (err) {
      console.error("Failed to load session data during regeneration:", err);
    }
    const oldSessionId = this.#sessionID;
    this.#sessionID = crypto.randomUUID();
    this.#sessionIDFromCookie = false;
    this.#data = data;
    this.#dirty = true;
    await this.#setCookie();
    if (oldSessionId && this.#storage) {
      this.#storage.removeItem(oldSessionId).catch((err) => {
        console.error("Failed to remove old session data:", err);
      });
    }
  }
  // Persists the session data to storage.
  // This is called automatically at the end of the request.
  // Uses a symbol to prevent users from calling it directly.
  async [PERSIST_SYMBOL]() {
    if (!this.#dirty && !this.#toDestroy.size) {
      return;
    }
    const storage = await this.#ensureStorage();
    if (this.#dirty && this.#data) {
      const data = await this.#ensureData();
      this.#toDelete.forEach((key2) => data.delete(key2));
      const key = this.#ensureSessionID();
      let serialized;
      try {
        serialized = stringify(data);
      } catch (err) {
        throw new AstroError(
          {
            ...SessionStorageSaveError,
            message: SessionStorageSaveError.message(
              "The session data could not be serialized.",
              this.#config.driver
            )
          },
          { cause: err }
        );
      }
      await storage.setItem(key, serialized);
      this.#dirty = false;
    }
    if (this.#toDestroy.size > 0) {
      const cleanupPromises = [...this.#toDestroy].map(
        (sessionId) => storage.removeItem(sessionId).catch((err) => {
          console.error(`Failed to clean up session ${sessionId}:`, err);
        })
      );
      await Promise.all(cleanupPromises);
      this.#toDestroy.clear();
    }
  }
  get sessionID() {
    return this.#sessionID;
  }
  /**
   * Loads a session from storage with the given ID, and replaces the current session.
   * Any changes made to the current session will be lost.
   * This is not normally needed, as the session is automatically loaded using the cookie.
   * However it can be used to restore a session where the ID has been recorded somewhere
   * else (e.g. in a database).
   */
  async load(sessionID) {
    this.#sessionID = sessionID;
    this.#data = void 0;
    await this.#setCookie();
    await this.#ensureData();
  }
  /**
   * Sets the session cookie.
   */
  async #setCookie() {
    if (!VALID_COOKIE_REGEX.test(this.#cookieName)) {
      throw new AstroError({
        ...SessionStorageSaveError,
        message: "Invalid cookie name. Cookie names can only contain letters, numbers, and dashes."
      });
    }
    const value = this.#ensureSessionID();
    this.#cookies.set(this.#cookieName, value, this.#cookieConfig);
  }
  /**
   * Attempts to load the session data from storage, or creates a new data object if none exists.
   * If there is existing partial data, it will be merged into the new data object.
   */
  async #ensureData() {
    const storage = await this.#ensureStorage();
    if (this.#data && !this.#partial) {
      return this.#data;
    }
    this.#data ??= /* @__PURE__ */ new Map();
    const raw = await storage.get(this.#ensureSessionID());
    if (!raw) {
      if (this.#sessionIDFromCookie) {
        this.#sessionID = crypto.randomUUID();
        this.#sessionIDFromCookie = false;
        if (this.#cookieSet) {
          await this.#setCookie();
        }
      }
      return this.#data;
    }
    try {
      const storedMap = unflatten(raw);
      if (!(storedMap instanceof Map)) {
        await this.destroy();
        throw new AstroError({
          ...SessionStorageInitError,
          message: SessionStorageInitError.message(
            "The session data was an invalid type.",
            this.#config.driver
          )
        });
      }
      const now = Date.now();
      for (const [key, value] of storedMap) {
        const expired = typeof value.expires === "number" && value.expires < now;
        if (!this.#data.has(key) && !this.#toDelete.has(key) && !expired) {
          this.#data.set(key, value);
        }
      }
      this.#partial = false;
      return this.#data;
    } catch (err) {
      await this.destroy();
      if (err instanceof AstroError) {
        throw err;
      }
      throw new AstroError(
        {
          ...SessionStorageInitError,
          message: SessionStorageInitError.message(
            "The session data could not be parsed.",
            this.#config.driver
          )
        },
        { cause: err }
      );
    }
  }
  /**
   * Returns the session ID, generating a new one if it does not exist.
   */
  #ensureSessionID() {
    if (!this.#sessionID) {
      const cookieValue = this.#cookies.get(this.#cookieName)?.value;
      if (cookieValue) {
        this.#sessionID = cookieValue;
        this.#sessionIDFromCookie = true;
      } else {
        this.#sessionID = crypto.randomUUID();
      }
    }
    return this.#sessionID;
  }
  /**
   * Ensures the storage is initialized.
   * This is called automatically when a storage operation is needed.
   */
  async #ensureStorage() {
    if (this.#storage) {
      return this.#storage;
    }
    if (AstroSession.#sharedStorage.has(this.#config.driver)) {
      this.#storage = AstroSession.#sharedStorage.get(this.#config.driver);
      return this.#storage;
    }
    if (!this.#driverFactory) {
      throw new AstroError({
        ...SessionStorageInitError,
        message: SessionStorageInitError.message(
          "Astro could not load the driver correctly. Does it exist?",
          this.#config.driver
        )
      });
    }
    const driver = this.#driverFactory;
    try {
      this.#storage = createStorage({
        driver: {
          ...driver(this.#config.options),
          // Unused methods
          hasItem() {
            return false;
          },
          getKeys() {
            return [];
          }
        }
      });
      AstroSession.#sharedStorage.set(this.#config.driver, this.#storage);
      return this.#storage;
    } catch (err) {
      throw new AstroError(
        {
          ...SessionStorageInitError,
          message: SessionStorageInitError.message("Unknown error", this.#config.driver)
        },
        { cause: err }
      );
    }
  }
}

function validateAndDecodePathname(pathname) {
  let decoded;
  try {
    decoded = decodeURI(pathname);
  } catch (_e) {
    throw new Error("Invalid URL encoding");
  }
  const hasDecoding = decoded !== pathname;
  const decodedStillHasEncoding = /%[0-9a-fA-F]{2}/.test(decoded);
  if (hasDecoding && decodedStillHasEncoding) {
    throw new Error("Multi-level URL encoding is not allowed");
  }
  return decoded;
}

class RenderContext {
  constructor(pipeline, locals, middleware, actions, serverIslands, pathname, request, routeData, status, clientAddress, cookies = new AstroCookies(request), params = getParams(routeData, pathname), url = RenderContext.#createNormalizedUrl(request.url), props = {}, partial = void 0, shouldInjectCspMetaTags = pipeline.manifest.shouldInjectCspMetaTags, session = void 0, cache, skipMiddleware = false) {
    this.pipeline = pipeline;
    this.locals = locals;
    this.middleware = middleware;
    this.actions = actions;
    this.serverIslands = serverIslands;
    this.pathname = pathname;
    this.request = request;
    this.routeData = routeData;
    this.status = status;
    this.clientAddress = clientAddress;
    this.cookies = cookies;
    this.params = params;
    this.url = url;
    this.props = props;
    this.partial = partial;
    this.shouldInjectCspMetaTags = shouldInjectCspMetaTags;
    this.session = session;
    this.cache = cache;
    this.skipMiddleware = skipMiddleware;
  }
  static #createNormalizedUrl(requestUrl) {
    const url = new URL(requestUrl);
    try {
      url.pathname = validateAndDecodePathname(url.pathname);
    } catch {
      try {
        url.pathname = decodeURI(url.pathname);
      } catch {
      }
    }
    url.pathname = collapseDuplicateSlashes(url.pathname);
    return url;
  }
  /**
   * A flag that tells the render content if the rewriting was triggered
   */
  isRewriting = false;
  /**
   * A safety net in case of loops
   */
  counter = 0;
  result = void 0;
  static async create({
    locals = {},
    pathname,
    pipeline,
    request,
    routeData,
    clientAddress,
    status = 200,
    props,
    partial = void 0,
    shouldInjectCspMetaTags,
    skipMiddleware = false
  }) {
    const pipelineMiddleware = await pipeline.getMiddleware();
    const pipelineActions = await pipeline.getActions();
    const pipelineSessionDriver = await pipeline.getSessionDriver();
    const serverIslands = await pipeline.getServerIslands();
    setOriginPathname(
      request,
      pathname,
      pipeline.manifest.trailingSlash,
      pipeline.manifest.buildFormat
    );
    const cookies = new AstroCookies(request);
    const session = pipeline.manifest.sessionConfig && pipelineSessionDriver ? new AstroSession({
      cookies,
      config: pipeline.manifest.sessionConfig,
      runtimeMode: pipeline.runtimeMode,
      driverFactory: pipelineSessionDriver,
      mockStorage: null
    }) : void 0;
    let cache;
    if (!pipeline.cacheConfig) {
      cache = new DisabledAstroCache(pipeline.logger);
    } else if (pipeline.runtimeMode === "development") {
      cache = new NoopAstroCache();
    } else {
      const cacheProvider = await pipeline.getCacheProvider();
      cache = new AstroCache(cacheProvider);
      if (pipeline.cacheConfig?.routes) {
        if (!pipeline.compiledCacheRoutes) {
          pipeline.compiledCacheRoutes = compileCacheRoutes(
            pipeline.cacheConfig.routes,
            pipeline.manifest.base,
            pipeline.manifest.trailingSlash
          );
        }
        const matched = matchCacheRoute(pathname, pipeline.compiledCacheRoutes);
        if (matched) {
          cache.set(matched);
        }
      }
    }
    return new RenderContext(
      pipeline,
      locals,
      sequence(...pipeline.internalMiddleware, pipelineMiddleware),
      pipelineActions,
      serverIslands,
      pathname,
      request,
      routeData,
      status,
      clientAddress,
      cookies,
      void 0,
      void 0,
      props,
      partial,
      shouldInjectCspMetaTags ?? pipeline.manifest.shouldInjectCspMetaTags,
      session,
      cache,
      skipMiddleware
    );
  }
  /**
   * The main function of the RenderContext.
   *
   * Use this function to render any route known to Astro.
   * It attempts to render a route. A route can be a:
   *
   * - page
   * - redirect
   * - endpoint
   * - fallback
   */
  async render(componentInstance, slots = {}) {
    const { middleware, pipeline } = this;
    const { logger, streaming, manifest } = pipeline;
    const props = Object.keys(this.props).length > 0 ? this.props : await getProps({
      mod: componentInstance,
      routeData: this.routeData,
      routeCache: this.pipeline.routeCache,
      pathname: this.pathname,
      logger,
      serverLike: manifest.serverLike,
      base: manifest.base,
      trailingSlash: manifest.trailingSlash
    });
    const actionApiContext = this.createActionAPIContext();
    const apiContext = this.createAPIContext(props, actionApiContext);
    this.counter++;
    if (this.counter === 4) {
      return new Response("Loop Detected", {
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508
        status: 508,
        statusText: "Astro detected a loop where you tried to call the rewriting logic more than four times."
      });
    }
    const lastNext = async (ctx, payload) => {
      if (payload) {
        const oldPathname = this.pathname;
        pipeline.logger.debug("router", "Called rewriting to:", payload);
        const {
          routeData,
          componentInstance: newComponent,
          pathname,
          newUrl
        } = await pipeline.tryRewrite(payload, this.request);
        if (this.pipeline.manifest.serverLike === true && this.routeData.prerender === false && routeData.prerender === true) {
          throw new AstroError({
            ...ForbiddenRewrite,
            message: ForbiddenRewrite.message(this.pathname, pathname, routeData.component),
            hint: ForbiddenRewrite.hint(routeData.component)
          });
        }
        this.routeData = routeData;
        componentInstance = newComponent;
        if (payload instanceof Request) {
          this.request = payload;
        } else {
          this.request = copyRequest(
            newUrl,
            this.request,
            // need to send the flag of the previous routeData
            routeData.prerender,
            this.pipeline.logger,
            this.routeData.route
          );
        }
        this.isRewriting = true;
        this.url = RenderContext.#createNormalizedUrl(this.request.url);
        this.params = getParams(routeData, pathname);
        this.pathname = pathname;
        this.status = 200;
        setOriginPathname(
          this.request,
          oldPathname,
          this.pipeline.manifest.trailingSlash,
          this.pipeline.manifest.buildFormat
        );
      }
      let response2;
      if (!ctx.isPrerendered && !this.skipMiddleware) {
        const { action, setActionResult, serializeActionResult } = getActionContext(ctx);
        if (action?.calledFrom === "form") {
          const actionResult = await action.handler();
          setActionResult(action.name, serializeActionResult(actionResult));
        }
      }
      switch (this.routeData.type) {
        case "endpoint": {
          response2 = await renderEndpoint(
            componentInstance,
            ctx,
            this.routeData.prerender,
            logger
          );
          break;
        }
        case "redirect":
          return renderRedirect(this);
        case "page": {
          this.result = await this.createResult(componentInstance, actionApiContext);
          try {
            response2 = await renderPage(
              this.result,
              componentInstance?.default,
              props,
              slots,
              streaming,
              this.routeData
            );
          } catch (e) {
            this.result.cancelled = true;
            throw e;
          }
          response2.headers.set(ROUTE_TYPE_HEADER, "page");
          if (this.routeData.route === "/404" || this.routeData.route === "/500") {
            response2.headers.set(REROUTE_DIRECTIVE_HEADER, "no");
          }
          if (this.isRewriting) {
            response2.headers.set(REWRITE_DIRECTIVE_HEADER_KEY, REWRITE_DIRECTIVE_HEADER_VALUE);
          }
          break;
        }
        case "fallback": {
          return new Response(null, { status: 500, headers: { [ROUTE_TYPE_HEADER]: "fallback" } });
        }
      }
      const responseCookies = getCookiesFromResponse(response2);
      if (responseCookies) {
        this.cookies.merge(responseCookies);
      }
      return response2;
    };
    if (isRouteExternalRedirect(this.routeData)) {
      return renderRedirect(this);
    }
    const response = this.skipMiddleware ? await lastNext(apiContext) : await callMiddleware(middleware, apiContext, lastNext);
    if (response.headers.get(ROUTE_TYPE_HEADER)) {
      response.headers.delete(ROUTE_TYPE_HEADER);
    }
    attachCookiesToResponse(response, this.cookies);
    return response;
  }
  createAPIContext(props, context) {
    const redirect = (path, status = 302) => new Response(null, { status, headers: { Location: path } });
    const rewrite = async (reroutePayload) => {
      return await this.#executeRewrite(reroutePayload);
    };
    Reflect.set(context, pipelineSymbol, this.pipeline);
    return Object.assign(context, {
      props,
      redirect,
      rewrite,
      getActionResult: createGetActionResult(context.locals),
      callAction: createCallAction(context)
    });
  }
  async #executeRewrite(reroutePayload) {
    this.pipeline.logger.debug("router", "Calling rewrite: ", reroutePayload);
    const oldPathname = this.pathname;
    const { routeData, componentInstance, newUrl, pathname } = await this.pipeline.tryRewrite(
      reroutePayload,
      this.request
    );
    const isI18nFallback = routeData.fallbackRoutes && routeData.fallbackRoutes.length > 0;
    if (this.pipeline.manifest.serverLike && !this.routeData.prerender && routeData.prerender && !isI18nFallback) {
      throw new AstroError({
        ...ForbiddenRewrite,
        message: ForbiddenRewrite.message(this.pathname, pathname, routeData.component),
        hint: ForbiddenRewrite.hint(routeData.component)
      });
    }
    this.routeData = routeData;
    if (reroutePayload instanceof Request) {
      this.request = reroutePayload;
    } else {
      this.request = copyRequest(
        newUrl,
        this.request,
        // need to send the flag of the previous routeData
        routeData.prerender,
        this.pipeline.logger,
        this.routeData.route
      );
    }
    this.url = RenderContext.#createNormalizedUrl(this.request.url);
    const newCookies = new AstroCookies(this.request);
    if (this.cookies) {
      newCookies.merge(this.cookies);
    }
    this.cookies = newCookies;
    this.params = getParams(routeData, pathname);
    this.pathname = pathname;
    this.isRewriting = true;
    this.status = 200;
    setOriginPathname(
      this.request,
      oldPathname,
      this.pipeline.manifest.trailingSlash,
      this.pipeline.manifest.buildFormat
    );
    return await this.render(componentInstance);
  }
  createActionAPIContext() {
    const renderContext = this;
    const { params, pipeline, url } = this;
    return {
      // Don't allow reassignment of cookies because it doesn't work
      get cookies() {
        return renderContext.cookies;
      },
      routePattern: this.routeData.route,
      isPrerendered: this.routeData.prerender,
      get clientAddress() {
        return renderContext.getClientAddress();
      },
      get currentLocale() {
        return renderContext.computeCurrentLocale();
      },
      generator: ASTRO_GENERATOR,
      get locals() {
        return renderContext.locals;
      },
      set locals(_) {
        throw new AstroError(LocalsReassigned);
      },
      params,
      get preferredLocale() {
        return renderContext.computePreferredLocale();
      },
      get preferredLocaleList() {
        return renderContext.computePreferredLocaleList();
      },
      request: this.request,
      site: pipeline.site,
      url,
      get originPathname() {
        return getOriginPathname(renderContext.request);
      },
      get session() {
        if (this.isPrerendered) {
          pipeline.logger.warn(
            "session",
            `context.session was used when rendering the route ${colors.green(this.routePattern)}, but it is not available on prerendered routes. If you need access to sessions, make sure that the route is server-rendered using \`export const prerender = false;\` or by setting \`output\` to \`"server"\` in your Astro config to make all your routes server-rendered by default. For more information, see https://docs.astro.build/en/guides/sessions/`
          );
          return void 0;
        }
        if (!renderContext.session) {
          pipeline.logger.warn(
            "session",
            `context.session was used when rendering the route ${colors.green(this.routePattern)}, but no storage configuration was provided. Either configure the storage manually or use an adapter that provides session storage. For more information, see https://docs.astro.build/en/guides/sessions/`
          );
          return void 0;
        }
        return renderContext.session;
      },
      get cache() {
        return renderContext.cache;
      },
      get csp() {
        if (!pipeline.manifest.csp) {
          if (pipeline.runtimeMode === "production") {
            pipeline.logger.warn(
              "csp",
              `context.csp was used when rendering the route ${colors.green(this.routePattern)}, but CSP was not configured. For more information, see https://docs.astro.build/en/reference/experimental-flags/csp/`
            );
          }
          return void 0;
        }
        return {
          insertDirective(payload) {
            if (renderContext?.result?.directives) {
              renderContext.result.directives = pushDirective(
                renderContext.result.directives,
                payload
              );
            } else {
              renderContext?.result?.directives.push(payload);
            }
          },
          insertScriptResource(resource) {
            renderContext.result?.scriptResources.push(resource);
          },
          insertStyleResource(resource) {
            renderContext.result?.styleResources.push(resource);
          },
          insertStyleHash(hash) {
            renderContext.result?.styleHashes.push(hash);
          },
          insertScriptHash(hash) {
            renderContext.result?.scriptHashes.push(hash);
          }
        };
      }
    };
  }
  async createResult(mod, ctx) {
    const { cookies, pathname, pipeline, routeData, status } = this;
    const { clientDirectives, inlinedScripts, compressHTML, manifest, renderers, resolve } = pipeline;
    const { links, scripts, styles } = await pipeline.headElements(routeData);
    const extraStyleHashes = [];
    const extraScriptHashes = [];
    const shouldInjectCspMetaTags = this.shouldInjectCspMetaTags;
    const cspAlgorithm = manifest.csp?.algorithm ?? "SHA-256";
    if (shouldInjectCspMetaTags) {
      for (const style of styles) {
        extraStyleHashes.push(await generateCspDigest(style.children, cspAlgorithm));
      }
      for (const script of scripts) {
        extraScriptHashes.push(await generateCspDigest(script.children, cspAlgorithm));
      }
    }
    const componentMetadata = await pipeline.componentMetadata(routeData) ?? manifest.componentMetadata;
    const headers = new Headers({ "Content-Type": "text/html" });
    const partial = typeof this.partial === "boolean" ? this.partial : Boolean(mod.partial);
    const actionResult = hasActionPayload(this.locals) ? deserializeActionResult(this.locals._actionPayload.actionResult) : void 0;
    const response = {
      status: actionResult?.error ? actionResult?.error.status : status,
      statusText: actionResult?.error ? actionResult?.error.type : "OK",
      get headers() {
        return headers;
      },
      // Disallow `Astro.response.headers = new Headers`
      set headers(_) {
        throw new AstroError(AstroResponseHeadersReassigned);
      }
    };
    const result = {
      base: manifest.base,
      userAssetsBase: manifest.userAssetsBase,
      cancelled: false,
      clientDirectives,
      inlinedScripts,
      componentMetadata,
      compressHTML,
      cookies,
      /** This function returns the `Astro` faux-global */
      createAstro: (props, slots) => this.createAstro(result, props, slots, ctx),
      links,
      params: this.params,
      partial,
      pathname,
      renderers,
      resolve,
      response,
      request: this.request,
      scripts,
      styles,
      actionResult,
      serverIslandNameMap: this.serverIslands.serverIslandNameMap ?? /* @__PURE__ */ new Map(),
      key: manifest.key,
      trailingSlash: manifest.trailingSlash,
      _experimentalQueuedRendering: {
        pool: pipeline.nodePool,
        htmlStringCache: pipeline.htmlStringCache,
        enabled: manifest.experimentalQueuedRendering?.enabled,
        poolSize: manifest.experimentalQueuedRendering?.poolSize,
        contentCache: manifest.experimentalQueuedRendering?.contentCache
      },
      _metadata: {
        hasHydrationScript: false,
        rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(),
        hasRenderedHead: false,
        renderedScripts: /* @__PURE__ */ new Set(),
        hasDirectives: /* @__PURE__ */ new Set(),
        hasRenderedServerIslandRuntime: false,
        headInTree: false,
        extraHead: [],
        extraStyleHashes,
        extraScriptHashes,
        propagators: /* @__PURE__ */ new Set()
      },
      cspDestination: manifest.csp?.cspDestination ?? (routeData.prerender ? "meta" : "header"),
      shouldInjectCspMetaTags,
      cspAlgorithm,
      // The following arrays must be cloned; otherwise, they become mutable across routes.
      scriptHashes: manifest.csp?.scriptHashes ? [...manifest.csp.scriptHashes] : [],
      scriptResources: manifest.csp?.scriptResources ? [...manifest.csp.scriptResources] : [],
      styleHashes: manifest.csp?.styleHashes ? [...manifest.csp.styleHashes] : [],
      styleResources: manifest.csp?.styleResources ? [...manifest.csp.styleResources] : [],
      directives: manifest.csp?.directives ? [...manifest.csp.directives] : [],
      isStrictDynamic: manifest.csp?.isStrictDynamic ?? false,
      internalFetchHeaders: manifest.internalFetchHeaders
    };
    return result;
  }
  #astroPagePartial;
  /**
   * The Astro global is sourced in 3 different phases:
   * - **Static**: `.generator` and `.glob` is printed by the compiler, instantiated once per process per astro file
   * - **Page-level**: `.request`, `.cookies`, `.locals` etc. These remain the same for the duration of the request.
   * - **Component-level**: `.props`, `.slots`, and `.self` are unique to each _use_ of each component.
   *
   * The page level partial is used as the prototype of the user-visible `Astro` global object, which is instantiated once per use of a component.
   */
  createAstro(result, props, slotValues, apiContext) {
    let astroPagePartial;
    if (this.isRewriting) {
      astroPagePartial = this.#astroPagePartial = this.createAstroPagePartial(result, apiContext);
    } else {
      astroPagePartial = this.#astroPagePartial ??= this.createAstroPagePartial(result, apiContext);
    }
    const astroComponentPartial = { props, self: null };
    const Astro = Object.assign(
      Object.create(astroPagePartial),
      astroComponentPartial
    );
    let _slots;
    Object.defineProperty(Astro, "slots", {
      get: () => {
        if (!_slots) {
          _slots = new Slots(
            result,
            slotValues,
            this.pipeline.logger
          );
        }
        return _slots;
      }
    });
    return Astro;
  }
  createAstroPagePartial(result, apiContext) {
    const renderContext = this;
    const { cookies, locals, params, pipeline, url } = this;
    const { response } = result;
    const redirect = (path, status = 302) => {
      if (this.request[responseSentSymbol$1]) {
        throw new AstroError({
          ...ResponseSentError
        });
      }
      return new Response(null, { status, headers: { Location: path } });
    };
    const rewrite = async (reroutePayload) => {
      return await this.#executeRewrite(reroutePayload);
    };
    const callAction = createCallAction(apiContext);
    return {
      generator: ASTRO_GENERATOR,
      routePattern: this.routeData.route,
      isPrerendered: this.routeData.prerender,
      cookies,
      get session() {
        if (this.isPrerendered) {
          pipeline.logger.warn(
            "session",
            `Astro.session was used when rendering the route ${colors.green(this.routePattern)}, but it is not available on prerendered pages. If you need access to sessions, make sure that the page is server-rendered using \`export const prerender = false;\` or by setting \`output\` to \`"server"\` in your Astro config to make all your pages server-rendered by default. For more information, see https://docs.astro.build/en/guides/sessions/`
          );
          return void 0;
        }
        if (!renderContext.session) {
          pipeline.logger.warn(
            "session",
            `Astro.session was used when rendering the route ${colors.green(this.routePattern)}, but no storage configuration was provided. Either configure the storage manually or use an adapter that provides session storage. For more information, see https://docs.astro.build/en/guides/sessions/`
          );
          return void 0;
        }
        return renderContext.session;
      },
      get cache() {
        return renderContext.cache;
      },
      get clientAddress() {
        return renderContext.getClientAddress();
      },
      get currentLocale() {
        return renderContext.computeCurrentLocale();
      },
      params,
      get preferredLocale() {
        return renderContext.computePreferredLocale();
      },
      get preferredLocaleList() {
        return renderContext.computePreferredLocaleList();
      },
      locals,
      redirect,
      rewrite,
      request: this.request,
      response,
      site: pipeline.site,
      getActionResult: createGetActionResult(locals),
      get callAction() {
        return callAction;
      },
      url,
      get originPathname() {
        return getOriginPathname(renderContext.request);
      },
      get csp() {
        if (!pipeline.manifest.csp) {
          if (pipeline.runtimeMode === "production") {
            pipeline.logger.warn(
              "csp",
              `Astro.csp was used when rendering the route ${colors.green(this.routePattern)}, but CSP was not configured. For more information, see https://docs.astro.build/en/reference/experimental-flags/csp/`
            );
          }
          return void 0;
        }
        return {
          insertDirective(payload) {
            if (renderContext?.result?.directives) {
              renderContext.result.directives = pushDirective(
                renderContext.result.directives,
                payload
              );
            } else {
              renderContext?.result?.directives.push(payload);
            }
          },
          insertScriptResource(resource) {
            renderContext.result?.scriptResources.push(resource);
          },
          insertStyleResource(resource) {
            renderContext.result?.styleResources.push(resource);
          },
          insertStyleHash(hash) {
            renderContext.result?.styleHashes.push(hash);
          },
          insertScriptHash(hash) {
            renderContext.result?.scriptHashes.push(hash);
          }
        };
      }
    };
  }
  getClientAddress() {
    const { pipeline, routeData, clientAddress } = this;
    if (routeData.prerender) {
      throw new AstroError({
        ...PrerenderClientAddressNotAvailable,
        message: PrerenderClientAddressNotAvailable.message(routeData.component)
      });
    }
    if (clientAddress) {
      return clientAddress;
    }
    if (pipeline.adapterName) {
      throw new AstroError({
        ...ClientAddressNotAvailable,
        message: ClientAddressNotAvailable.message(pipeline.adapterName)
      });
    }
    throw new AstroError(StaticClientAddressNotAvailable);
  }
  /**
   * API Context may be created multiple times per request, i18n data needs to be computed only once.
   * So, it is computed and saved here on creation of the first APIContext and reused for later ones.
   */
  #currentLocale;
  computeCurrentLocale() {
    const {
      url,
      pipeline: { i18n },
      routeData
    } = this;
    if (!i18n) return;
    const { defaultLocale, locales, strategy } = i18n;
    const fallbackTo = strategy === "pathname-prefix-other-locales" || strategy === "domains-prefix-other-locales" ? defaultLocale : void 0;
    if (this.#currentLocale) {
      return this.#currentLocale;
    }
    let computedLocale;
    if (isRouteServerIsland(routeData)) {
      let referer = this.request.headers.get("referer");
      if (referer) {
        if (URL.canParse(referer)) {
          referer = new URL(referer).pathname;
        }
        computedLocale = computeCurrentLocale(referer, locales, defaultLocale);
      }
    } else {
      let pathname = routeData.pathname;
      if (!routeData.pattern.test(url.pathname)) {
        for (const fallbackRoute of routeData.fallbackRoutes) {
          if (fallbackRoute.pattern.test(url.pathname)) {
            pathname = fallbackRoute.pathname;
            break;
          }
        }
      }
      pathname = pathname && !isRoute404or500(routeData) ? pathname : url.pathname;
      computedLocale = computeCurrentLocale(pathname, locales, defaultLocale);
      if (routeData.params.length > 0) {
        const localeFromParams = computeCurrentLocaleFromParams(this.params, locales);
        if (localeFromParams) {
          computedLocale = localeFromParams;
        }
      }
    }
    this.#currentLocale = computedLocale ?? fallbackTo;
    return this.#currentLocale;
  }
  #preferredLocale;
  computePreferredLocale() {
    const {
      pipeline: { i18n },
      request
    } = this;
    if (!i18n) return;
    return this.#preferredLocale ??= computePreferredLocale(request, i18n.locales);
  }
  #preferredLocaleList;
  computePreferredLocaleList() {
    const {
      pipeline: { i18n },
      request
    } = this;
    if (!i18n) return;
    return this.#preferredLocaleList ??= computePreferredLocaleList(request, i18n.locales);
  }
}

function redirectTemplate({
  status,
  absoluteLocation,
  relativeLocation,
  from
}) {
  const delay = status === 302 ? 2 : 0;
  return `<!doctype html>
<title>Redirecting to: ${relativeLocation}</title>
<meta http-equiv="refresh" content="${delay};url=${relativeLocation}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${absoluteLocation}">
<body>
	<a href="${relativeLocation}">Redirecting ${from ? `from <code>${from}</code> ` : ""}to <code>${relativeLocation}</code></a>
</body>`;
}

function ensure404Route(manifest) {
  if (!manifest.routes.some((route) => route.route === "/404")) {
    manifest.routes.push(DEFAULT_404_ROUTE);
  }
  return manifest;
}

class Router {
  #routes;
  #base;
  #baseWithoutTrailingSlash;
  #buildFormat;
  #trailingSlash;
  constructor(routes, options) {
    this.#routes = [...routes].sort(routeComparator);
    this.#base = normalizeBase(options.base);
    this.#baseWithoutTrailingSlash = removeTrailingForwardSlash(this.#base);
    this.#buildFormat = options.buildFormat;
    this.#trailingSlash = options.trailingSlash;
  }
  /**
   * Match an input pathname against the route list.
   * If allowWithoutBase is true, a non-base-prefixed path is still considered.
   */
  match(inputPathname, { allowWithoutBase = false } = {}) {
    const normalized = getRedirectForPathname(inputPathname);
    if (normalized.redirect) {
      return { type: "redirect", location: normalized.redirect, status: 301 };
    }
    if (this.#base !== "/") {
      const baseWithSlash = `${this.#baseWithoutTrailingSlash}/`;
      if (this.#trailingSlash === "always" && (normalized.pathname === this.#baseWithoutTrailingSlash || normalized.pathname === this.#base)) {
        return { type: "redirect", location: baseWithSlash, status: 301 };
      }
      if (this.#trailingSlash === "never" && normalized.pathname === baseWithSlash) {
        return { type: "redirect", location: this.#baseWithoutTrailingSlash, status: 301 };
      }
    }
    const baseResult = stripBase(
      normalized.pathname,
      this.#base,
      this.#baseWithoutTrailingSlash,
      this.#trailingSlash
    );
    if (!baseResult) {
      if (!allowWithoutBase) {
        return { type: "none", reason: "outside-base" };
      }
    }
    let pathname = baseResult ?? normalized.pathname;
    if (this.#buildFormat === "file") {
      pathname = normalizeFileFormatPathname(pathname);
    }
    const route = this.#routes.find((candidate) => {
      if (candidate.pattern.test(pathname)) return true;
      return candidate.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
    });
    if (!route) {
      return { type: "none", reason: "no-match" };
    }
    const params = getParams(route, pathname);
    return { type: "match", route, params, pathname };
  }
}
function normalizeBase(base) {
  if (!base) return "/";
  if (base === "/") return base;
  return prependForwardSlash(base);
}
function getRedirectForPathname(pathname) {
  let value = prependForwardSlash(pathname);
  if (value.startsWith("//")) {
    const collapsed = `/${value.replace(/^\/+/, "")}`;
    return { pathname: value, redirect: collapsed };
  }
  return { pathname: value };
}
function stripBase(pathname, base, baseWithoutTrailingSlash, trailingSlash) {
  if (base === "/") return pathname;
  const baseWithSlash = `${baseWithoutTrailingSlash}/`;
  if (pathname === baseWithoutTrailingSlash || pathname === base) {
    return trailingSlash === "always" ? null : "/";
  }
  if (pathname === baseWithSlash) {
    return trailingSlash === "never" ? null : "/";
  }
  if (pathname.startsWith(baseWithSlash)) {
    return pathname.slice(baseWithoutTrailingSlash.length);
  }
  return null;
}
function normalizeFileFormatPathname(pathname) {
  if (pathname.endsWith("/index.html")) {
    const trimmed = pathname.slice(0, -"/index.html".length);
    return trimmed === "" ? "/" : trimmed;
  }
  if (pathname.endsWith(".html")) {
    const trimmed = pathname.slice(0, -".html".length);
    return trimmed === "" ? "/" : trimmed;
  }
  return pathname;
}

class BaseApp {
  manifest;
  manifestData;
  pipeline;
  adapterLogger;
  baseWithoutTrailingSlash;
  logger;
  #router;
  constructor(manifest, streaming = true, ...args) {
    this.manifest = manifest;
    this.manifestData = { routes: manifest.routes.map((route) => route.routeData) };
    this.baseWithoutTrailingSlash = removeTrailingForwardSlash(manifest.base);
    this.pipeline = this.createPipeline(streaming, manifest, ...args);
    this.logger = new Logger({
      dest: consoleLogDestination,
      level: manifest.logLevel
    });
    this.adapterLogger = new AstroIntegrationLogger(this.logger.options, manifest.adapterName);
    ensure404Route(this.manifestData);
    this.#router = this.createRouter(this.manifestData);
  }
  async createRenderContext(payload) {
    return RenderContext.create(payload);
  }
  getAdapterLogger() {
    return this.adapterLogger;
  }
  getAllowedDomains() {
    return this.manifest.allowedDomains;
  }
  matchesAllowedDomains(forwardedHost, protocol) {
    return BaseApp.validateForwardedHost(forwardedHost, this.manifest.allowedDomains, protocol);
  }
  static validateForwardedHost(forwardedHost, allowedDomains, protocol) {
    if (!allowedDomains || allowedDomains.length === 0) {
      return false;
    }
    try {
      const testUrl = new URL(`${protocol || "https"}://${forwardedHost}`);
      return allowedDomains.some((pattern) => {
        return matchPattern(testUrl, pattern);
      });
    } catch {
      return false;
    }
  }
  set setManifestData(newManifestData) {
    this.manifestData = newManifestData;
    this.#router = this.createRouter(this.manifestData);
  }
  removeBase(pathname) {
    pathname = collapseDuplicateLeadingSlashes(pathname);
    if (pathname.startsWith(this.manifest.base)) {
      return pathname.slice(this.baseWithoutTrailingSlash.length + 1);
    }
    return pathname;
  }
  /**
   * It removes the base from the request URL, prepends it with a forward slash and attempts to decoded it.
   *
   * If the decoding fails, it logs the error and return the pathname as is.
   * @param request
   */
  getPathnameFromRequest(request) {
    const url = new URL(request.url);
    const pathname = prependForwardSlash(this.removeBase(url.pathname));
    try {
      return decodeURI(pathname);
    } catch (e) {
      this.getAdapterLogger().error(e.toString());
      return pathname;
    }
  }
  /**
   * Given a `Request`, it returns the `RouteData` that matches its `pathname`. By default, prerendered
   * routes aren't returned, even if they are matched.
   *
   * When `allowPrerenderedRoutes` is `true`, the function returns matched prerendered routes too.
   * @param request
   * @param allowPrerenderedRoutes
   */
  match(request, allowPrerenderedRoutes = false) {
    const url = new URL(request.url);
    if (this.manifest.assets.has(url.pathname)) return void 0;
    let pathname = this.computePathnameFromDomain(request);
    if (!pathname) {
      pathname = prependForwardSlash(this.removeBase(url.pathname));
    }
    const match = this.#router.match(decodeURI(pathname), { allowWithoutBase: true });
    if (match.type !== "match") return void 0;
    const routeData = match.route;
    if (allowPrerenderedRoutes) {
      return routeData;
    } else if (routeData.prerender) {
      return void 0;
    }
    return routeData;
  }
  createRouter(manifestData) {
    return new Router(manifestData.routes, {
      base: this.manifest.base,
      trailingSlash: this.manifest.trailingSlash,
      buildFormat: this.manifest.buildFormat
    });
  }
  /**
   * A matching route function to use in the development server.
   * Contrary to the `.match` function, this function resolves props and params, returning the correct
   * route based on the priority, segments. It also returns the correct, resolved pathname.
   * @param pathname
   */
  devMatch(pathname) {
    return void 0;
  }
  computePathnameFromDomain(request) {
    let pathname = void 0;
    const url = new URL(request.url);
    if (this.manifest.i18n && (this.manifest.i18n.strategy === "domains-prefix-always" || this.manifest.i18n.strategy === "domains-prefix-other-locales" || this.manifest.i18n.strategy === "domains-prefix-always-no-redirect")) {
      let host = request.headers.get("X-Forwarded-Host");
      let protocol = request.headers.get("X-Forwarded-Proto");
      if (protocol) {
        protocol = protocol + ":";
      } else {
        protocol = url.protocol;
      }
      if (!host) {
        host = request.headers.get("Host");
      }
      if (host && protocol) {
        host = host.split(":")[0];
        try {
          let locale;
          const hostAsUrl = new URL(`${protocol}//${host}`);
          for (const [domainKey, localeValue] of Object.entries(
            this.manifest.i18n.domainLookupTable
          )) {
            const domainKeyAsUrl = new URL(domainKey);
            if (hostAsUrl.host === domainKeyAsUrl.host && hostAsUrl.protocol === domainKeyAsUrl.protocol) {
              locale = localeValue;
              break;
            }
          }
          if (locale) {
            pathname = prependForwardSlash(
              joinPaths(normalizeTheLocale(locale), this.removeBase(url.pathname))
            );
            if (url.pathname.endsWith("/")) {
              pathname = appendForwardSlash(pathname);
            }
          }
        } catch (e) {
          this.logger.error(
            "router",
            `Astro tried to parse ${protocol}//${host} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`
          );
          this.logger.error("router", `Error: ${e}`);
        }
      }
    }
    return pathname;
  }
  redirectTrailingSlash(pathname) {
    const { trailingSlash } = this.manifest;
    if (pathname === "/" || isInternalPath(pathname)) {
      return pathname;
    }
    const path = collapseDuplicateTrailingSlashes(pathname, trailingSlash !== "never");
    if (path !== pathname) {
      return path;
    }
    if (trailingSlash === "ignore") {
      return pathname;
    }
    if (trailingSlash === "always" && !hasFileExtension(pathname)) {
      return appendForwardSlash(pathname);
    }
    if (trailingSlash === "never") {
      return removeTrailingForwardSlash(pathname);
    }
    return pathname;
  }
  async render(request, {
    addCookieHeader = false,
    clientAddress = Reflect.get(request, clientAddressSymbol),
    locals,
    prerenderedErrorPageFetch = fetch,
    routeData
  } = {}) {
    const timeStart = performance.now();
    const url = new URL(request.url);
    const redirect = this.redirectTrailingSlash(url.pathname);
    if (redirect !== url.pathname) {
      const status = request.method === "GET" ? 301 : 308;
      const response2 = new Response(
        redirectTemplate({
          status,
          relativeLocation: url.pathname,
          absoluteLocation: redirect,
          from: request.url
        }),
        {
          status,
          headers: {
            location: redirect + url.search
          }
        }
      );
      this.#prepareResponse(response2, { addCookieHeader });
      return response2;
    }
    if (routeData) {
      this.logger.debug(
        "router",
        "The adapter " + this.manifest.adapterName + " provided a custom RouteData for ",
        request.url
      );
      this.logger.debug("router", "RouteData");
      this.logger.debug("router", routeData);
    }
    const resolvedRenderOptions = {
      addCookieHeader,
      clientAddress,
      prerenderedErrorPageFetch,
      locals,
      routeData
    };
    if (locals) {
      if (typeof locals !== "object") {
        const error = new AstroError(LocalsNotAnObject);
        this.logger.error(null, error.stack);
        return this.renderError(request, {
          ...resolvedRenderOptions,
          // If locals are invalid, we don't want to include them when
          // rendering the error page
          locals: void 0,
          status: 500,
          error
        });
      }
    }
    if (!routeData) {
      if (this.isDev()) {
        const result = await this.devMatch(this.getPathnameFromRequest(request));
        if (result) {
          routeData = result.routeData;
        }
      } else {
        routeData = this.match(request);
      }
      this.logger.debug("router", "Astro matched the following route for " + request.url);
      this.logger.debug("router", "RouteData:\n" + routeData);
    }
    if (!routeData) {
      routeData = this.manifestData.routes.find(
        (route) => route.component === "404.astro" || route.component === DEFAULT_404_COMPONENT
      );
    }
    if (!routeData) {
      this.logger.debug("router", "Astro hasn't found routes that match " + request.url);
      this.logger.debug("router", "Here's the available routes:\n", this.manifestData);
      return this.renderError(request, {
        ...resolvedRenderOptions,
        status: 404
      });
    }
    let pathname = this.getPathnameFromRequest(request);
    if (this.isDev() && !routeHasHtmlExtension(routeData)) {
      pathname = pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
    }
    const defaultStatus = this.getDefaultStatusCode(routeData, pathname);
    let response;
    let session;
    let cache;
    try {
      const componentInstance = await this.pipeline.getComponentByRoute(routeData);
      const renderContext = await this.createRenderContext({
        pipeline: this.pipeline,
        locals,
        pathname,
        request,
        routeData,
        status: defaultStatus,
        clientAddress
      });
      session = renderContext.session;
      cache = renderContext.cache;
      if (this.pipeline.cacheProvider) {
        const cacheProvider = await this.pipeline.getCacheProvider();
        if (cacheProvider?.onRequest) {
          response = await cacheProvider.onRequest(
            {
              request,
              url: new URL(request.url)
            },
            async () => {
              const res = await renderContext.render(componentInstance);
              applyCacheHeaders(cache, res);
              return res;
            }
          );
          response.headers.delete("CDN-Cache-Control");
          response.headers.delete("Cache-Tag");
        } else {
          response = await renderContext.render(componentInstance);
          applyCacheHeaders(cache, response);
        }
      } else {
        response = await renderContext.render(componentInstance);
      }
      const isRewrite = response.headers.has(REWRITE_DIRECTIVE_HEADER_KEY);
      this.logThisRequest({
        pathname,
        method: request.method,
        statusCode: response.status,
        isRewrite,
        timeStart
      });
    } catch (err) {
      this.logger.error(null, err.stack || err.message || String(err));
      return this.renderError(request, {
        ...resolvedRenderOptions,
        status: 500,
        error: err
      });
    } finally {
      await session?.[PERSIST_SYMBOL]();
    }
    if (REROUTABLE_STATUS_CODES.includes(response.status) && // If the body isn't null, that means the user sets the 404 status
    // but uses the current route to handle the 404
    response.body === null && response.headers.get(REROUTE_DIRECTIVE_HEADER) !== "no") {
      return this.renderError(request, {
        ...resolvedRenderOptions,
        response,
        status: response.status,
        // We don't have an error to report here. Passing null means we pass nothing intentionally
        // while undefined means there's no error
        error: response.status === 500 ? null : void 0
      });
    }
    this.#prepareResponse(response, { addCookieHeader });
    return response;
  }
  #prepareResponse(response, { addCookieHeader }) {
    for (const headerName of [
      REROUTE_DIRECTIVE_HEADER,
      REWRITE_DIRECTIVE_HEADER_KEY,
      NOOP_MIDDLEWARE_HEADER,
      ROUTE_TYPE_HEADER
    ]) {
      if (response.headers.has(headerName)) {
        response.headers.delete(headerName);
      }
    }
    if (addCookieHeader) {
      for (const setCookieHeaderValue of getSetCookiesFromResponse(response)) {
        response.headers.append("set-cookie", setCookieHeaderValue);
      }
    }
    Reflect.set(response, responseSentSymbol$1, true);
  }
  setCookieHeaders(response) {
    return getSetCookiesFromResponse(response);
  }
  /**
   * Reads all the cookies written by `Astro.cookie.set()` onto the passed response.
   * For example,
   * ```ts
   * for (const cookie_ of App.getSetCookieFromResponse(response)) {
   *     const cookie: string = cookie_
   * }
   * ```
   * @param response The response to read cookies from.
   * @returns An iterator that yields key-value pairs as equal-sign-separated strings.
   */
  static getSetCookieFromResponse = getSetCookiesFromResponse;
  /**
   * If it is a known error code, try sending the according page (e.g. 404.astro / 500.astro).
   * This also handles pre-rendered /404 or /500 routes
   */
  async renderError(request, {
    status,
    response: originalResponse,
    skipMiddleware = false,
    error,
    ...resolvedRenderOptions
  }) {
    const errorRoutePath = `/${status}${this.manifest.trailingSlash === "always" ? "/" : ""}`;
    const errorRouteData = matchRoute(errorRoutePath, this.manifestData);
    const url = new URL(request.url);
    if (errorRouteData) {
      if (errorRouteData.prerender) {
        const maybeDotHtml = errorRouteData.route.endsWith(`/${status}`) ? ".html" : "";
        const statusURL = new URL(`${this.baseWithoutTrailingSlash}/${status}${maybeDotHtml}`, url);
        if (statusURL.toString() !== request.url && resolvedRenderOptions.prerenderedErrorPageFetch) {
          const response2 = await resolvedRenderOptions.prerenderedErrorPageFetch(
            statusURL.toString()
          );
          const override = { status, removeContentEncodingHeaders: true };
          const newResponse = this.mergeResponses(response2, originalResponse, override);
          this.#prepareResponse(newResponse, resolvedRenderOptions);
          return newResponse;
        }
      }
      const mod = await this.pipeline.getComponentByRoute(errorRouteData);
      let session;
      try {
        const renderContext = await this.createRenderContext({
          locals: resolvedRenderOptions.locals,
          pipeline: this.pipeline,
          skipMiddleware,
          pathname: this.getPathnameFromRequest(request),
          request,
          routeData: errorRouteData,
          status,
          props: { error },
          clientAddress: resolvedRenderOptions.clientAddress
        });
        session = renderContext.session;
        const response2 = await renderContext.render(mod);
        const newResponse = this.mergeResponses(response2, originalResponse);
        this.#prepareResponse(newResponse, resolvedRenderOptions);
        return newResponse;
      } catch {
        if (skipMiddleware === false) {
          return this.renderError(request, {
            ...resolvedRenderOptions,
            status,
            response: originalResponse,
            skipMiddleware: true
          });
        }
      } finally {
        await session?.[PERSIST_SYMBOL]();
      }
    }
    const response = this.mergeResponses(new Response(null, { status }), originalResponse);
    this.#prepareResponse(response, resolvedRenderOptions);
    return response;
  }
  mergeResponses(newResponse, originalResponse, override) {
    let newResponseHeaders = newResponse.headers;
    if (override?.removeContentEncodingHeaders) {
      newResponseHeaders = new Headers(newResponseHeaders);
      newResponseHeaders.delete("Content-Encoding");
      newResponseHeaders.delete("Content-Length");
    }
    if (!originalResponse) {
      if (override !== void 0) {
        return new Response(newResponse.body, {
          status: override.status,
          statusText: newResponse.statusText,
          headers: newResponseHeaders
        });
      }
      return newResponse;
    }
    const status = override?.status ? override.status : originalResponse.status === 200 ? newResponse.status : originalResponse.status;
    try {
      originalResponse.headers.delete("Content-type");
      originalResponse.headers.delete("Content-Length");
      originalResponse.headers.delete("Transfer-Encoding");
    } catch {
    }
    const newHeaders = new Headers();
    const seen = /* @__PURE__ */ new Set();
    for (const [name, value] of originalResponse.headers) {
      newHeaders.append(name, value);
      seen.add(name.toLowerCase());
    }
    for (const [name, value] of newResponseHeaders) {
      if (!seen.has(name.toLowerCase())) {
        newHeaders.append(name, value);
      }
    }
    const mergedResponse = new Response(newResponse.body, {
      status,
      statusText: status === 200 ? newResponse.statusText : originalResponse.statusText,
      // If you're looking at here for possible bugs, it means that it's not a bug.
      // With the middleware, users can meddle with headers, and we should pass to the 404/500.
      // If users see something weird, it's because they are setting some headers they should not.
      //
      // Although, we don't want it to replace the content-type, because the error page must return `text/html`
      headers: newHeaders
    });
    const originalCookies = getCookiesFromResponse(originalResponse);
    const newCookies = getCookiesFromResponse(newResponse);
    if (originalCookies) {
      if (newCookies) {
        for (const cookieValue of AstroCookies.consume(newCookies)) {
          originalResponse.headers.append("set-cookie", cookieValue);
        }
      }
      attachCookiesToResponse(mergedResponse, originalCookies);
    } else if (newCookies) {
      attachCookiesToResponse(mergedResponse, newCookies);
    }
    return mergedResponse;
  }
  getDefaultStatusCode(routeData, pathname) {
    if (!routeData.pattern.test(pathname)) {
      for (const fallbackRoute of routeData.fallbackRoutes) {
        if (fallbackRoute.pattern.test(pathname)) {
          return 302;
        }
      }
    }
    const route = removeTrailingForwardSlash(routeData.route);
    if (route.endsWith("/404")) return 404;
    if (route.endsWith("/500")) return 500;
    return 200;
  }
  getManifest() {
    return this.pipeline.manifest;
  }
  logThisRequest({
    pathname,
    method,
    statusCode,
    isRewrite,
    timeStart
  }) {
    const timeEnd = performance.now();
    this.logRequest({
      pathname,
      method,
      statusCode,
      isRewrite,
      reqTime: timeEnd - timeStart
    });
  }
}

function getAssetsPrefix(fileExtension, assetsPrefix) {
  let prefix = "";
  if (!assetsPrefix) {
    prefix = "";
  } else if (typeof assetsPrefix === "string") {
    prefix = assetsPrefix;
  } else {
    const dotLessFileExtension = fileExtension.slice(1);
    prefix = assetsPrefix[dotLessFileExtension] || assetsPrefix.fallback;
  }
  return prefix;
}

const URL_PARSE_BASE = "https://astro.build";
function splitAssetPath(path) {
  const parsed = new URL(path, URL_PARSE_BASE);
  const isAbsolute = URL.canParse(path);
  const pathname = !isAbsolute && !path.startsWith("/") ? parsed.pathname.slice(1) : parsed.pathname;
  return {
    pathname,
    suffix: `${parsed.search}${parsed.hash}`
  };
}
function createAssetLink(href, base, assetsPrefix, queryParams) {
  const { pathname, suffix } = splitAssetPath(href);
  let url = "";
  if (assetsPrefix) {
    const pf = getAssetsPrefix(fileExtension(pathname), assetsPrefix);
    url = joinPaths(pf, slash(pathname)) + suffix;
  } else if (base) {
    url = prependForwardSlash(joinPaths(base, slash(pathname))) + suffix;
  } else {
    url = href;
  }
  return url;
}
function createStylesheetElement(stylesheet, base, assetsPrefix, queryParams) {
  if (stylesheet.type === "inline") {
    return {
      props: {},
      children: stylesheet.content
    };
  } else {
    return {
      props: {
        rel: "stylesheet",
        href: createAssetLink(stylesheet.src, base, assetsPrefix)
      },
      children: ""
    };
  }
}
function createStylesheetElementSet(stylesheets, base, assetsPrefix, queryParams) {
  return new Set(
    stylesheets.map((s) => createStylesheetElement(s, base, assetsPrefix))
  );
}
function createModuleScriptElement(script, base, assetsPrefix, queryParams) {
  if (script.type === "external") {
    return createModuleScriptElementWithSrc(script.value, base, assetsPrefix);
  } else {
    return {
      props: {
        type: "module"
      },
      children: script.value
    };
  }
}
function createModuleScriptElementWithSrc(src, base, assetsPrefix, queryParams) {
  return {
    props: {
      type: "module",
      src: createAssetLink(src, base, assetsPrefix)
    },
    children: ""
  };
}

function createConsoleLogger(level) {
  return new Logger({
    dest: consoleLogDestination,
    level: level ?? "info"
  });
}

class AppPipeline extends Pipeline {
  getName() {
    return "AppPipeline";
  }
  static create({ manifest, streaming }) {
    const resolve = async function resolve2(specifier) {
      if (!(specifier in manifest.entryModules)) {
        throw new Error(`Unable to resolve [${specifier}]`);
      }
      const bundlePath = manifest.entryModules[specifier];
      if (bundlePath.startsWith("data:") || bundlePath.length === 0) {
        return bundlePath;
      } else {
        return createAssetLink(bundlePath, manifest.base, manifest.assetsPrefix);
      }
    };
    const logger = createConsoleLogger(manifest.logLevel);
    const pipeline = new AppPipeline(
      logger,
      manifest,
      "production",
      manifest.renderers,
      resolve,
      streaming,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0
    );
    return pipeline;
  }
  async headElements(routeData) {
    const { assetsPrefix, base } = this.manifest;
    const routeInfo = this.manifest.routes.find(
      (route) => route.routeData.route === routeData.route
    );
    const links = /* @__PURE__ */ new Set();
    const scripts = /* @__PURE__ */ new Set();
    const styles = createStylesheetElementSet(routeInfo?.styles ?? [], base, assetsPrefix);
    for (const script of routeInfo?.scripts ?? []) {
      if ("stage" in script) {
        if (script.stage === "head-inline") {
          scripts.add({
            props: {},
            children: script.children
          });
        }
      } else {
        scripts.add(createModuleScriptElement(script, base, assetsPrefix));
      }
    }
    return { links, styles, scripts };
  }
  componentMetadata() {
  }
  async getComponentByRoute(routeData) {
    const module = await this.getModuleForRoute(routeData);
    return module.page();
  }
  async getModuleForRoute(route) {
    for (const defaultRoute of this.defaultRoutes) {
      if (route.component === defaultRoute.component) {
        return {
          page: () => Promise.resolve(defaultRoute.instance)
        };
      }
    }
    let routeToProcess = route;
    if (routeIsRedirect(route)) {
      if (route.redirectRoute) {
        routeToProcess = route.redirectRoute;
      } else {
        return RedirectSinglePageBuiltModule;
      }
    } else if (routeIsFallback(route)) {
      routeToProcess = getFallbackRoute(route, this.manifest.routes);
    }
    if (this.manifest.pageMap) {
      const importComponentInstance = this.manifest.pageMap.get(routeToProcess.component);
      if (!importComponentInstance) {
        throw new Error(
          `Unexpectedly unable to find a component instance for route ${route.route}`
        );
      }
      return await importComponentInstance();
    } else if (this.manifest.pageModule) {
      return this.manifest.pageModule;
    }
    throw new Error(
      "Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue."
    );
  }
  async tryRewrite(payload, request) {
    const { newUrl, pathname, routeData } = findRouteToRewrite({
      payload,
      request,
      routes: this.manifest?.routes.map((r) => r.routeData),
      trailingSlash: this.manifest.trailingSlash,
      buildFormat: this.manifest.buildFormat,
      base: this.manifest.base,
      outDir: this.manifest?.serverLike ? this.manifest.buildClientDir : this.manifest.outDir
    });
    const componentInstance = await this.getComponentByRoute(routeData);
    return { newUrl, pathname, componentInstance, routeData };
  }
}

class App extends BaseApp {
  createPipeline(streaming) {
    return AppPipeline.create({
      manifest: this.manifest,
      streaming
    });
  }
  isDev() {
    return false;
  }
  // Should we log something for our users?
  logRequest(_options) {
  }
}

const renderers = [];

const serializedData = [{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","distURL":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/_image","component":"node_modules/astro/dist/assets/endpoint/generic.js","params":[],"pathname":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"type":"endpoint","prerender":false,"fallbackRoutes":[],"distURL":[],"isIndex":false,"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about/association","isIndex":false,"type":"page","pattern":"^\\/about\\/association\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"association","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/association.astro","pathname":"/about/association","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about/campus","isIndex":false,"type":"page","pattern":"^\\/about\\/campus\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"campus","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/campus.astro","pathname":"/about/campus","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about/history","isIndex":false,"type":"page","pattern":"^\\/about\\/history\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"history","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/history.astro","pathname":"/about/history","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about/parent-schedule","isIndex":false,"type":"page","pattern":"^\\/about\\/parent-schedule\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"parent-schedule","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/parent-schedule.astro","pathname":"/about/parent-schedule","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about/parents","isIndex":false,"type":"page","pattern":"^\\/about\\/parents\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"parents","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/parents.astro","pathname":"/about/parents","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about/teachers","isIndex":false,"type":"page","pattern":"^\\/about\\/teachers\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"teachers","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/teachers.astro","pathname":"/about/teachers","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about/team","isIndex":false,"type":"page","pattern":"^\\/about\\/team\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"team","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/team.astro","pathname":"/about/team","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about/vision","isIndex":false,"type":"page","pattern":"^\\/about\\/vision\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"vision","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/vision.astro","pathname":"/about/vision","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about/waldorf-list","isIndex":false,"type":"page","pattern":"^\\/about\\/waldorf-list\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"waldorf-list","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/waldorf-list.astro","pathname":"/about/waldorf-list","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/activities/achievement","isIndex":false,"type":"page","pattern":"^\\/activities\\/achievement\\/?$","segments":[[{"content":"activities","dynamic":false,"spread":false}],[{"content":"achievement","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/activities/achievement.astro","pathname":"/activities/achievement","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/activities/experience","isIndex":false,"type":"page","pattern":"^\\/activities\\/experience\\/?$","segments":[[{"content":"activities","dynamic":false,"spread":false}],[{"content":"experience","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/activities/experience.astro","pathname":"/activities/experience","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/activities/highlights","isIndex":false,"type":"page","pattern":"^\\/activities\\/highlights\\/?$","segments":[[{"content":"activities","dynamic":false,"spread":false}],[{"content":"highlights","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/activities/highlights.astro","pathname":"/activities/highlights","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/activities/photos","isIndex":false,"type":"page","pattern":"^\\/activities\\/photos\\/?$","segments":[[{"content":"activities","dynamic":false,"spread":false}],[{"content":"photos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/activities/photos.astro","pathname":"/activities/photos","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/activities/seasons","isIndex":false,"type":"page","pattern":"^\\/activities\\/seasons\\/?$","segments":[[{"content":"activities","dynamic":false,"spread":false}],[{"content":"seasons","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/activities/seasons.astro","pathname":"/activities/seasons","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/activities/seminars","isIndex":false,"type":"page","pattern":"^\\/activities\\/seminars\\/?$","segments":[[{"content":"activities","dynamic":false,"spread":false}],[{"content":"seminars","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/activities/seminars.astro","pathname":"/activities/seminars","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/activities/videos","isIndex":false,"type":"page","pattern":"^\\/activities\\/videos\\/?$","segments":[[{"content":"activities","dynamic":false,"spread":false}],[{"content":"videos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/activities/videos.astro","pathname":"/activities/videos","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/edit/[id]","isIndex":false,"type":"page","pattern":"^\\/admin\\/edit\\/([^/]+?)\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"edit","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/admin/edit/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/edit","isIndex":false,"type":"page","pattern":"^\\/admin\\/edit\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"edit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/edit.astro","pathname":"/admin/edit","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/editor","isIndex":false,"type":"page","pattern":"^\\/admin\\/editor\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"editor","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/editor.astro","pathname":"/admin/editor","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/logout","isIndex":false,"type":"page","pattern":"^\\/admin\\/logout\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/logout.astro","pathname":"/admin/logout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/newsletter/[id]","isIndex":false,"type":"page","pattern":"^\\/admin\\/newsletter\\/([^/]+?)\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"newsletter","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/admin/newsletter/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin","isIndex":true,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/index.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admissions/apply","isIndex":false,"type":"page","pattern":"^\\/admissions\\/apply\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"apply","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/apply.astro","pathname":"/admissions/apply","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admissions/faq","isIndex":false,"type":"page","pattern":"^\\/admissions\\/faq\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"faq","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/faq.astro","pathname":"/admissions/faq","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admissions/guide","isIndex":false,"type":"page","pattern":"^\\/admissions\\/guide\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"guide","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/guide.astro","pathname":"/admissions/guide","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admissions/refund","isIndex":false,"type":"page","pattern":"^\\/admissions\\/refund\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"refund","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/refund.astro","pathname":"/admissions/refund","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admissions/seminar","isIndex":false,"type":"page","pattern":"^\\/admissions\\/seminar\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"seminar","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/seminar.astro","pathname":"/admissions/seminar","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admissions/transfer-out","isIndex":false,"type":"page","pattern":"^\\/admissions\\/transfer-out\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"transfer-out","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/transfer-out.astro","pathname":"/admissions/transfer-out","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admissions/transportation","isIndex":false,"type":"page","pattern":"^\\/admissions\\/transportation\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"transportation","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/transportation.astro","pathname":"/admissions/transportation","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admissions/tuition","isIndex":false,"type":"page","pattern":"^\\/admissions\\/tuition\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"tuition","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/tuition.astro","pathname":"/admissions/tuition","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admissions/visit","isIndex":false,"type":"page","pattern":"^\\/admissions\\/visit\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"visit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/visit.astro","pathname":"/admissions/visit","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admissions/waldorf-qa","isIndex":false,"type":"page","pattern":"^\\/admissions\\/waldorf-qa\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"waldorf-qa","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/waldorf-qa.astro","pathname":"/admissions/waldorf-qa","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admissions/whatis","isIndex":false,"type":"page","pattern":"^\\/admissions\\/whatis\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"whatis","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/whatis.astro","pathname":"/admissions/whatis","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admissions","isIndex":false,"type":"page","pattern":"^\\/admissions\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions.astro","pathname":"/admissions","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/calendar","isIndex":false,"type":"page","pattern":"^\\/calendar\\/?$","segments":[[{"content":"calendar","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/calendar.astro","pathname":"/calendar","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/curriculum/development","isIndex":false,"type":"page","pattern":"^\\/curriculum\\/development\\/?$","segments":[[{"content":"curriculum","dynamic":false,"spread":false}],[{"content":"development","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/curriculum/development.astro","pathname":"/curriculum/development","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/curriculum/elementary-courses","isIndex":false,"type":"page","pattern":"^\\/curriculum\\/elementary-courses\\/?$","segments":[[{"content":"curriculum","dynamic":false,"spread":false}],[{"content":"elementary-courses","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/curriculum/elementary-courses.astro","pathname":"/curriculum/elementary-courses","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/curriculum/normalization","isIndex":false,"type":"page","pattern":"^\\/curriculum\\/normalization\\/?$","segments":[[{"content":"curriculum","dynamic":false,"spread":false}],[{"content":"normalization","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/curriculum/normalization.astro","pathname":"/curriculum/normalization","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/curriculum/qa","isIndex":false,"type":"page","pattern":"^\\/curriculum\\/qa\\/?$","segments":[[{"content":"curriculum","dynamic":false,"spread":false}],[{"content":"qa","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/curriculum/qa.astro","pathname":"/curriculum/qa","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/curriculum/qa-gallery","isIndex":false,"type":"page","pattern":"^\\/curriculum\\/qa-gallery\\/?$","segments":[[{"content":"curriculum","dynamic":false,"spread":false}],[{"content":"qa-gallery","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/curriculum/qa-gallery.astro","pathname":"/curriculum/qa-gallery","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/curriculum/special","isIndex":false,"type":"page","pattern":"^\\/curriculum\\/special\\/?$","segments":[[{"content":"curriculum","dynamic":false,"spread":false}],[{"content":"special","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/curriculum/special.astro","pathname":"/curriculum/special","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/curriculum/whatis","isIndex":false,"type":"page","pattern":"^\\/curriculum\\/whatis\\/?$","segments":[[{"content":"curriculum","dynamic":false,"spread":false}],[{"content":"whatis","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/curriculum/whatis.astro","pathname":"/curriculum/whatis","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/curriculum","isIndex":false,"type":"page","pattern":"^\\/curriculum\\/?$","segments":[[{"content":"curriculum","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/curriculum.astro","pathname":"/curriculum","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/finance","isIndex":false,"type":"page","pattern":"^\\/finance\\/?$","segments":[[{"content":"finance","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/finance.astro","pathname":"/finance","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/newsletter/[id]","isIndex":false,"type":"page","pattern":"^\\/newsletter\\/([^/]+?)\\/?$","segments":[[{"content":"newsletter","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/newsletter/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/newsletter","isIndex":true,"type":"page","pattern":"^\\/newsletter\\/?$","segments":[[{"content":"newsletter","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/newsletter/index.astro","pathname":"/newsletter","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/support","isIndex":false,"type":"page","pattern":"^\\/support\\/?$","segments":[[{"content":"support","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/support.astro","pathname":"/support","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}];
				serializedData.map(deserializeRouteInfo);

const _page0 = () => import('./generic_4PYs5zzo.mjs').then(n => n.g);
const _page1 = () => import('./association_gEg3U2Oo.mjs');
const _page2 = () => import('./campus_DAmdFwiE.mjs');
const _page3 = () => import('./history_D98Davq2.mjs');
const _page4 = () => import('./parent-schedule_YaG3E8dC.mjs');
const _page5 = () => import('./parents_DxpOFwPU.mjs');
const _page6 = () => import('./teachers_Bp-U-ss8.mjs');
const _page7 = () => import('./team_hI1ox5B0.mjs');
const _page8 = () => import('./vision_Bp3O8T7_.mjs');
const _page9 = () => import('./waldorf-list_Cs_HUO4C.mjs');
const _page10 = () => import('./about_yzwkrUnI.mjs');
const _page11 = () => import('./achievement_C33Zp_W2.mjs');
const _page12 = () => import('./experience_DEHOrc8V.mjs');
const _page13 = () => import('./highlights_BCWZtssp.mjs');
const _page14 = () => import('./photos_D4hfZVec.mjs');
const _page15 = () => import('./seasons_beXJc3bi.mjs');
const _page16 = () => import('./seminars_W1sq0NiG.mjs');
const _page17 = () => import('./videos_DiXoqdJP.mjs');
const _page18 = () => import('./_id__D59x4aKP.mjs');
const _page19 = () => import('./edit_qqDwuKdk.mjs');
const _page20 = () => import('./editor_DpKi0_Xr.mjs');
const _page21 = () => import('./logout_BeVcUWh_.mjs');
const _page22 = () => import('./_id__DECD9p5e.mjs');
const _page23 = () => import('./index_BWTai6uf.mjs');
const _page24 = () => import('./apply_B816baF7.mjs');
const _page25 = () => import('./faq_Bc4DKG78.mjs');
const _page26 = () => import('./guide_Co7I8jIv.mjs');
const _page27 = () => import('./refund_BC0PfeqJ.mjs');
const _page28 = () => import('./seminar_i9-1Ew1B.mjs');
const _page29 = () => import('./transfer-out_CDn3zxQ7.mjs');
const _page30 = () => import('./transportation_B3xdp9w3.mjs');
const _page31 = () => import('./tuition_DocREoPz.mjs');
const _page32 = () => import('./visit_89bjhzXq.mjs');
const _page33 = () => import('./waldorf-qa_CnEbi34J.mjs');
const _page34 = () => import('./whatis_a0kUmZjd.mjs');
const _page35 = () => import('./admissions_B-FMh_YR.mjs');
const _page36 = () => import('./calendar_DYJ_VYAv.mjs');
const _page37 = () => import('./contact_Bb7gyJeL.mjs');
const _page38 = () => import('./development_D_LP9HDC.mjs');
const _page39 = () => import('./elementary-courses_DYh5rthg.mjs');
const _page40 = () => import('./normalization_DxC4Eq1Q.mjs');
const _page41 = () => import('./qa_CEqJm1vS.mjs');
const _page42 = () => import('./qa-gallery_uNo5TD46.mjs');
const _page43 = () => import('./special_CrBIJ_Qg.mjs');
const _page44 = () => import('./whatis_Dqgb46dz.mjs');
const _page45 = () => import('./curriculum_D3mm3fDl.mjs');
const _page46 = () => import('./finance_JoAD07l5.mjs');
const _page47 = () => import('./_id__B4Em-QuF.mjs');
const _page48 = () => import('./index_3tjT4ZsX.mjs');
const _page49 = () => import('./support_D6fGbc3j.mjs');
const _page50 = () => import('./index_BZXGXZrK.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about/association.astro", _page1],
    ["src/pages/about/campus.astro", _page2],
    ["src/pages/about/history.astro", _page3],
    ["src/pages/about/parent-schedule.astro", _page4],
    ["src/pages/about/parents.astro", _page5],
    ["src/pages/about/teachers.astro", _page6],
    ["src/pages/about/team.astro", _page7],
    ["src/pages/about/vision.astro", _page8],
    ["src/pages/about/waldorf-list.astro", _page9],
    ["src/pages/about.astro", _page10],
    ["src/pages/activities/achievement.astro", _page11],
    ["src/pages/activities/experience.astro", _page12],
    ["src/pages/activities/highlights.astro", _page13],
    ["src/pages/activities/photos.astro", _page14],
    ["src/pages/activities/seasons.astro", _page15],
    ["src/pages/activities/seminars.astro", _page16],
    ["src/pages/activities/videos.astro", _page17],
    ["src/pages/admin/edit/[id].astro", _page18],
    ["src/pages/admin/edit.astro", _page19],
    ["src/pages/admin/editor.astro", _page20],
    ["src/pages/admin/logout.astro", _page21],
    ["src/pages/admin/newsletter/[id].astro", _page22],
    ["src/pages/admin/index.astro", _page23],
    ["src/pages/admissions/apply.astro", _page24],
    ["src/pages/admissions/faq.astro", _page25],
    ["src/pages/admissions/guide.astro", _page26],
    ["src/pages/admissions/refund.astro", _page27],
    ["src/pages/admissions/seminar.astro", _page28],
    ["src/pages/admissions/transfer-out.astro", _page29],
    ["src/pages/admissions/transportation.astro", _page30],
    ["src/pages/admissions/tuition.astro", _page31],
    ["src/pages/admissions/visit.astro", _page32],
    ["src/pages/admissions/waldorf-qa.astro", _page33],
    ["src/pages/admissions/whatis.astro", _page34],
    ["src/pages/admissions.astro", _page35],
    ["src/pages/calendar.astro", _page36],
    ["src/pages/contact.astro", _page37],
    ["src/pages/curriculum/development.astro", _page38],
    ["src/pages/curriculum/elementary-courses.astro", _page39],
    ["src/pages/curriculum/normalization.astro", _page40],
    ["src/pages/curriculum/qa.astro", _page41],
    ["src/pages/curriculum/qa-gallery.astro", _page42],
    ["src/pages/curriculum/special.astro", _page43],
    ["src/pages/curriculum/whatis.astro", _page44],
    ["src/pages/curriculum.astro", _page45],
    ["src/pages/finance.astro", _page46],
    ["src/pages/newsletter/[id].astro", _page47],
    ["src/pages/newsletter/index.astro", _page48],
    ["src/pages/support.astro", _page49],
    ["src/pages/index.astro", _page50]
]);

const _manifest = deserializeManifest(({"rootDir":"file:///Users/sam/.openclaw/workspace/waldorf-website/","cacheDir":"file:///Users/sam/.openclaw/workspace/waldorf-website/node_modules/.astro/","outDir":"file:///Users/sam/.openclaw/workspace/waldorf-website/dist/","srcDir":"file:///Users/sam/.openclaw/workspace/waldorf-website/src/","publicDir":"file:///Users/sam/.openclaw/workspace/waldorf-website/public/","buildClientDir":"file:///Users/sam/.openclaw/workspace/waldorf-website/dist/client/","buildServerDir":"file:///Users/sam/.openclaw/workspace/waldorf-website/dist/server/","adapterName":"@astrojs/vercel","assetsDir":"_astro","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","distURL":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/_image","component":"node_modules/astro/dist/assets/endpoint/generic.js","params":[],"pathname":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"type":"endpoint","prerender":false,"fallbackRoutes":[],"distURL":[],"isIndex":false,"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-p7aqehih]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-p7aqehih] h1[data-astro-cid-p7aqehih]{font-size:2.5rem;margin-bottom:.5rem}.hero-small[data-astro-cid-p7aqehih] p[data-astro-cid-p7aqehih]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-p7aqehih]{padding:4rem 2rem}.container[data-astro-cid-p7aqehih]{max-width:900px;margin:0 auto}.chairman-message[data-astro-cid-p7aqehih]{background:linear-gradient(135deg,#fff8f0,#fff);padding:2rem;border-radius:20px;margin-bottom:2rem;border-left:5px solid #228B22}.chairman-message[data-astro-cid-p7aqehih] h2[data-astro-cid-p7aqehih]{color:#8b4513;margin-bottom:1rem}.chairman-message[data-astro-cid-p7aqehih] p[data-astro-cid-p7aqehih]{color:#555;line-height:1.8;margin-bottom:1rem}.chairman-message[data-astro-cid-p7aqehih] .signature[data-astro-cid-p7aqehih]{text-align:right;color:#666;margin-top:1.5rem}.content-block[data-astro-cid-p7aqehih]{background:#fff;padding:2rem;border-radius:20px;margin-bottom:1.5rem;box-shadow:0 5px 20px #8b45131a}.content-block[data-astro-cid-p7aqehih] h2[data-astro-cid-p7aqehih]{color:#8b4513;font-size:1.4rem;margin-bottom:1rem}.content-block[data-astro-cid-p7aqehih] p[data-astro-cid-p7aqehih]{color:#555;line-height:1.8}.purpose-block[data-astro-cid-p7aqehih]{background:linear-gradient(135deg,#fff8e1,#fff);border-left:5px solid #FF9800}.purpose-main[data-astro-cid-p7aqehih]{background:#fff8dc;padding:1.2rem;border-radius:10px;margin-bottom:1.5rem;font-style:italic;color:#333}.missions[data-astro-cid-p7aqehih]{display:grid;gap:.8rem}.mission-item[data-astro-cid-p7aqehih]{display:flex;align-items:center;gap:1rem;padding:1rem;background:#f9f9f9;border-radius:10px}.mission-item[data-astro-cid-p7aqehih] .num[data-astro-cid-p7aqehih]{background:#ff9800;color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.9rem;flex-shrink:0}.membership[data-astro-cid-p7aqehih]{background:linear-gradient(135deg,#e8f5e9,#fff)}.member-type[data-astro-cid-p7aqehih] h3[data-astro-cid-p7aqehih],.fees[data-astro-cid-p7aqehih] h3[data-astro-cid-p7aqehih],.rights[data-astro-cid-p7aqehih] h3[data-astro-cid-p7aqehih]{color:#228b22;margin-bottom:.8rem}.fees[data-astro-cid-p7aqehih] ul[data-astro-cid-p7aqehih]{list-style:none;padding:0}.fees[data-astro-cid-p7aqehih] li[data-astro-cid-p7aqehih]{padding:.5rem 0;color:#555}.rights[data-astro-cid-p7aqehih] ol[data-astro-cid-p7aqehih]{padding-left:1.5rem}.rights[data-astro-cid-p7aqehih] li[data-astro-cid-p7aqehih]{padding:.4rem 0;color:#555}.notes[data-astro-cid-p7aqehih]{background:#fff8dc;padding:1rem;border-radius:10px;margin-top:1rem}.notes[data-astro-cid-p7aqehih] p[data-astro-cid-p7aqehih]{color:#666;font-size:.95rem;margin:.5rem 0}.event-box[data-astro-cid-p7aqehih]{background:#e8f5e9;padding:1.5rem;border-radius:15px;text-align:center}.event-box[data-astro-cid-p7aqehih] h3[data-astro-cid-p7aqehih]{color:#228b22;margin-bottom:.5rem}.event-box[data-astro-cid-p7aqehih] p[data-astro-cid-p7aqehih]{color:#555;margin:0}.board-section[data-astro-cid-p7aqehih]{margin-bottom:1.5rem}.board-section[data-astro-cid-p7aqehih] h3[data-astro-cid-p7aqehih]{color:#8b4513;margin-bottom:.5rem}.board-section[data-astro-cid-p7aqehih] ul[data-astro-cid-p7aqehih]{list-style:none;padding:0}.board-section[data-astro-cid-p7aqehih] li[data-astro-cid-p7aqehih]{padding:.4rem 0;color:#555}.chair[data-astro-cid-p7aqehih]{color:#228b22;font-weight:700;font-size:1.1rem}.philosophy[data-astro-cid-p7aqehih]{background:linear-gradient(135deg,#fff3e0,#fff);border:2px solid #ff9800}.footer[data-astro-cid-p7aqehih]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/about/association","isIndex":false,"type":"page","pattern":"^\\/about\\/association\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"association","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/association.astro","pathname":"/about/association","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-6chuvip2]{background:linear-gradient(135deg,#228b22,#8b4513);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-6chuvip2] h1[data-astro-cid-6chuvip2]{font-size:3rem;margin-bottom:.5rem}.section[data-astro-cid-6chuvip2]{padding:4rem 2rem}.container[data-astro-cid-6chuvip2]{max-width:1000px;margin:0 auto}.intro-block[data-astro-cid-6chuvip2]{background:#fff;padding:2rem;border-radius:20px;margin-bottom:2rem;box-shadow:0 10px 40px #8b45131a}.intro-block[data-astro-cid-6chuvip2] p[data-astro-cid-6chuvip2]{color:#666;line-height:1.8;font-size:1.1rem;margin:0}.environment-grid[data-astro-cid-6chuvip2]{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem;margin-bottom:2rem}.env-card[data-astro-cid-6chuvip2]{background:#fff;padding:2rem;border-radius:20px;text-align:center;box-shadow:0 10px 40px #8b45131a}.env-icon[data-astro-cid-6chuvip2]{font-size:3rem;margin-bottom:1rem}.env-card[data-astro-cid-6chuvip2] h3[data-astro-cid-6chuvip2]{color:#8b4513;margin-bottom:.5rem}.env-card[data-astro-cid-6chuvip2] p[data-astro-cid-6chuvip2]{color:#666;margin:0;font-size:.95rem}.safety-block[data-astro-cid-6chuvip2]{background:linear-gradient(135deg,#fff8dc,wheat);padding:2rem;border-radius:20px}.safety-block[data-astro-cid-6chuvip2] h2[data-astro-cid-6chuvip2]{color:#8b4513;margin-bottom:1.5rem}.safety-list[data-astro-cid-6chuvip2]{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem}.safety-list[data-astro-cid-6chuvip2] li[data-astro-cid-6chuvip2]{color:#228b22;font-weight:500;font-size:1.1rem}.footer[data-astro-cid-6chuvip2]{background:#333;color:#fff;padding:2rem;text-align:center}\n"}],"routeData":{"route":"/about/campus","isIndex":false,"type":"page","pattern":"^\\/about\\/campus\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"campus","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/campus.astro","pathname":"/about/campus","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-cj2a6bsk]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-cj2a6bsk] h1[data-astro-cid-cj2a6bsk]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-cj2a6bsk] p[data-astro-cid-cj2a6bsk]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-cj2a6bsk]{padding:4rem 2rem}.container[data-astro-cid-cj2a6bsk]{max-width:800px;margin:0 auto}.timeline[data-astro-cid-cj2a6bsk]{position:relative;padding-left:2rem}.timeline[data-astro-cid-cj2a6bsk]:before{content:\"\";position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(180deg,#8b4513,#228b22);border-radius:2px}.timeline-item[data-astro-cid-cj2a6bsk]{position:relative;padding-left:2rem;margin-bottom:2rem}.timeline-item[data-astro-cid-cj2a6bsk]:before{content:\"\";position:absolute;left:-2.4rem;top:.5rem;width:16px;height:16px;background:#fff;border:4px solid #228B22;border-radius:50%}.timeline-item[data-astro-cid-cj2a6bsk].highlight:before{background:gold;border-color:#8b4513}.year[data-astro-cid-cj2a6bsk]{display:inline-block;background:#8b4513;color:#fff;padding:.3rem 1rem;border-radius:20px;font-weight:700;margin-bottom:.5rem}.timeline-item[data-astro-cid-cj2a6bsk].highlight .year[data-astro-cid-cj2a6bsk]{background:#228b22}.content[data-astro-cid-cj2a6bsk]{background:#fff;padding:1.5rem;border-radius:15px;box-shadow:0 5px 20px #8b45131a}.content[data-astro-cid-cj2a6bsk] h3[data-astro-cid-cj2a6bsk]{color:#8b4513;margin-bottom:.8rem}.content[data-astro-cid-cj2a6bsk] p[data-astro-cid-cj2a6bsk]{color:#555;line-height:1.7;margin-bottom:.5rem}.content[data-astro-cid-cj2a6bsk] .meaning[data-astro-cid-cj2a6bsk]{background:#fff8dc;padding:1rem;border-radius:10px;font-style:italic;color:#666;border-left:4px solid #228B22}.footer[data-astro-cid-cj2a6bsk]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/about/history","isIndex":false,"type":"page","pattern":"^\\/about\\/history\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"history","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/history.astro","pathname":"/about/history","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-3k6jwbpb]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-3k6jwbpb] h1[data-astro-cid-3k6jwbpb]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-3k6jwbpb] p[data-astro-cid-3k6jwbpb]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-3k6jwbpb]{padding:4rem 2rem}.container[data-astro-cid-3k6jwbpb]{max-width:800px;margin:0 auto}.schedule-section[data-astro-cid-3k6jwbpb]{background:#fff;padding:2rem;border-radius:20px;margin-bottom:2rem;box-shadow:0 10px 40px #8b45131a}.schedule-section[data-astro-cid-3k6jwbpb] h2[data-astro-cid-3k6jwbpb]{color:#8b4513;font-size:1.5rem;margin-bottom:1rem;border-bottom:2px solid #FFD700;padding-bottom:.5rem}.schedule-section[data-astro-cid-3k6jwbpb] ul[data-astro-cid-3k6jwbpb]{padding-left:1.5rem;color:#666}.schedule-section[data-astro-cid-3k6jwbpb] li[data-astro-cid-3k6jwbpb]{padding:.5rem 0}.schedule-section[data-astro-cid-3k6jwbpb] p[data-astro-cid-3k6jwbpb]{color:#666;line-height:1.6}.footer[data-astro-cid-3k6jwbpb]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/about/parent-schedule","isIndex":false,"type":"page","pattern":"^\\/about\\/parent-schedule\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"parent-schedule","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/parent-schedule.astro","pathname":"/about/parent-schedule","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n"},{"type":"external","src":"_astro/parents@_@astro.DwVn_s04.css"}],"routeData":{"route":"/about/parents","isIndex":false,"type":"page","pattern":"^\\/about\\/parents\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"parents","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/parents.astro","pathname":"/about/parents","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-5dfpmjvm]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-5dfpmjvm] h1[data-astro-cid-5dfpmjvm]{font-size:2rem;margin-bottom:.5rem}.hero-small[data-astro-cid-5dfpmjvm] p[data-astro-cid-5dfpmjvm]{font-size:1rem;opacity:.9}.hero-small[data-astro-cid-5dfpmjvm],.section[data-astro-cid-5dfpmjvm]{padding:3rem 1rem}.container[data-astro-cid-5dfpmjvm]{max-width:1200px;margin:0 auto;padding:0 1rem}.team-section[data-astro-cid-5dfpmjvm]{margin-bottom:3rem}.team-section[data-astro-cid-5dfpmjvm] h2[data-astro-cid-5dfpmjvm]{color:#8b4513;font-size:1.5rem;margin-bottom:1.5rem;text-align:center}.core-team[data-astro-cid-5dfpmjvm]{display:flex;justify-content:center;gap:1.5rem;flex-wrap:wrap}.grid-3x3[data-astro-cid-5dfpmjvm]{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;max-width:1000px;margin:0 auto}.grid-4x3[data-astro-cid-5dfpmjvm]{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;max-width:1200px;margin:0 auto}.team-card[data-astro-cid-5dfpmjvm]{background:#fff;padding:1rem;border-radius:15px;text-align:center;box-shadow:0 5px 20px #8b45131a;transition:transform .3s}.team-card[data-astro-cid-5dfpmjvm]:hover{transform:translateY(-3px)}.teacher-photo[data-astro-cid-5dfpmjvm]{width:100px;height:100px;border-radius:50%;object-fit:cover;margin:0 auto .8rem;border:3px solid #8B4513;box-shadow:0 3px 10px #00000026}.team-card[data-astro-cid-5dfpmjvm] h3[data-astro-cid-5dfpmjvm]{color:#228b22;font-size:.85rem;margin-bottom:.2rem}.team-card[data-astro-cid-5dfpmjvm] .name[data-astro-cid-5dfpmjvm]{color:#333;font-size:1rem;font-weight:700}.team-card[data-astro-cid-5dfpmjvm] .bio[data-astro-cid-5dfpmjvm]{color:#666;font-size:.8rem;margin-top:.3rem}@media(min-width:768px){.hero-small[data-astro-cid-5dfpmjvm] h1[data-astro-cid-5dfpmjvm]{font-size:3rem}.hero-small[data-astro-cid-5dfpmjvm]{padding:4rem 2rem}.team-section[data-astro-cid-5dfpmjvm]{margin-bottom:4rem}.team-section[data-astro-cid-5dfpmjvm] h2[data-astro-cid-5dfpmjvm]{font-size:2rem;margin-bottom:2rem}.core-team[data-astro-cid-5dfpmjvm]{gap:2rem}.grid-3x3[data-astro-cid-5dfpmjvm]{grid-template-columns:repeat(3,1fr);gap:1.8rem}.grid-4x3[data-astro-cid-5dfpmjvm]{grid-template-columns:repeat(4,1fr);gap:1.8rem}.team-card[data-astro-cid-5dfpmjvm]{padding:1.8rem}.teacher-photo[data-astro-cid-5dfpmjvm]{width:180px;height:180px;border:5px solid #8B4513}.team-card[data-astro-cid-5dfpmjvm] h3[data-astro-cid-5dfpmjvm]{font-size:.9rem}.team-card[data-astro-cid-5dfpmjvm] .name[data-astro-cid-5dfpmjvm]{font-size:1.2rem}.team-card[data-astro-cid-5dfpmjvm] .bio[data-astro-cid-5dfpmjvm]{font-size:.85rem}}.teacher-item[data-astro-cid-5dfpmjvm]{text-align:center;padding:1.2rem;background:#fff;border-radius:15px;box-shadow:0 5px 20px #00000014;transition:transform .3s}.teacher-item[data-astro-cid-5dfpmjvm]:hover{transform:scale(1.05)}.teacher-item[data-astro-cid-5dfpmjvm] .teacher-photo[data-astro-cid-5dfpmjvm]{width:150px;height:150px;margin-bottom:.8rem}.teacher-title[data-astro-cid-5dfpmjvm]{color:#228b22;font-size:.85rem;margin-bottom:.3rem}.teacher-name[data-astro-cid-5dfpmjvm]{color:#333;font-size:1rem;font-weight:600}@media(max-width:900px){.grid-4x3[data-astro-cid-5dfpmjvm],.grid-3x3[data-astro-cid-5dfpmjvm]{grid-template-columns:repeat(3,1fr)}}@media(max-width:700px){.grid-4x3[data-astro-cid-5dfpmjvm],.grid-3x3[data-astro-cid-5dfpmjvm]{grid-template-columns:repeat(2,1fr)}.core-team[data-astro-cid-5dfpmjvm]{flex-direction:column;align-items:center}.teacher-photo[data-astro-cid-5dfpmjvm]{width:140px;height:140px}}.footer[data-astro-cid-5dfpmjvm]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/about/teachers","isIndex":false,"type":"page","pattern":"^\\/about\\/teachers\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"teachers","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/teachers.astro","pathname":"/about/teachers","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-q5gx6tde]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-q5gx6tde] h1[data-astro-cid-q5gx6tde]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-q5gx6tde] p[data-astro-cid-q5gx6tde]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-q5gx6tde]{padding:4rem 2rem}.container[data-astro-cid-q5gx6tde]{max-width:900px;margin:0 auto}.intro-block[data-astro-cid-q5gx6tde]{background:linear-gradient(135deg,#e8f5e9,#fff);padding:2.5rem;border-radius:20px;text-align:center;margin-bottom:2rem;border:2px solid #228B22}.intro-block[data-astro-cid-q5gx6tde] h2[data-astro-cid-q5gx6tde]{color:#8b4513;margin-bottom:1rem}.intro-block[data-astro-cid-q5gx6tde]>p[data-astro-cid-q5gx6tde]{color:#333;font-size:1.15rem;line-height:1.8;margin-bottom:1rem}.intro-block[data-astro-cid-q5gx6tde] .sub[data-astro-cid-q5gx6tde]{color:#666;font-style:italic;margin-bottom:1.5rem}.principles[data-astro-cid-q5gx6tde]{display:flex;justify-content:center;gap:1rem;flex-wrap:wrap}.principle[data-astro-cid-q5gx6tde]{background:#228b22;color:#fff;padding:.8rem 2rem;border-radius:30px;font-weight:700;font-size:1.1rem}.org-chart[data-astro-cid-q5gx6tde]{background:#fff;padding:2rem;border-radius:20px;margin-bottom:2rem;box-shadow:0 10px 40px #8b45131a;text-align:center}.org-title[data-astro-cid-q5gx6tde]{color:#8b4513;font-size:1.5rem;margin-bottom:2rem;font-weight:700}.org-diagram[data-astro-cid-q5gx6tde]{display:flex;justify-content:center;padding:1rem}.triangle-svg[data-astro-cid-q5gx6tde]{width:100%;max-width:450px;height:auto}.org-node[data-astro-cid-q5gx6tde]{cursor:pointer}.org-details[data-astro-cid-q5gx6tde]{margin-bottom:2rem}.detail-card[data-astro-cid-q5gx6tde]{background:#fff;padding:2rem;border-radius:20px;margin-bottom:1.5rem;box-shadow:0 5px 20px #8b45131a}.detail-card[data-astro-cid-q5gx6tde] h2[data-astro-cid-q5gx6tde]{color:#8b4513;font-size:1.3rem;margin-bottom:.3rem}.detail-card[data-astro-cid-q5gx6tde] .subtitle[data-astro-cid-q5gx6tde]{color:#228b22;font-weight:700;margin-bottom:1rem}.detail-card[data-astro-cid-q5gx6tde] ul[data-astro-cid-q5gx6tde]{padding-left:1.2rem}.detail-card[data-astro-cid-q5gx6tde] li[data-astro-cid-q5gx6tde]{color:#555;padding:.4rem 0}.meeting-section[data-astro-cid-q5gx6tde]{background:linear-gradient(135deg,#fff3e0,#fff);padding:2rem;border-radius:20px;border:2px solid #ff9800}.meeting-section[data-astro-cid-q5gx6tde] h2[data-astro-cid-q5gx6tde]{color:#e65100;margin-bottom:1rem}.meeting-desc[data-astro-cid-q5gx6tde]{color:#555;line-height:1.7;margin-bottom:1.5rem}.tasks-grid[data-astro-cid-q5gx6tde]{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem}.task-item[data-astro-cid-q5gx6tde]{display:flex;align-items:center;gap:.8rem;background:#fff;padding:1rem;border-radius:15px}.task-icon[data-astro-cid-q5gx6tde]{font-size:1.5rem}.task-item[data-astro-cid-q5gx6tde] p[data-astro-cid-q5gx6tde]{color:#555;margin:0;font-size:.95rem}.footer[data-astro-cid-q5gx6tde]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}@media(max-width:600px){.org-row[data-astro-cid-q5gx6tde]{gap:1.5rem}.org-circle[data-astro-cid-q5gx6tde]{width:110px;height:110px}.org-center[data-astro-cid-q5gx6tde]{width:80px;height:80px}}\n"}],"routeData":{"route":"/about/team","isIndex":false,"type":"page","pattern":"^\\/about\\/team\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"team","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/team.astro","pathname":"/about/team","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-qwdlkh5l]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-qwdlkh5l] h1[data-astro-cid-qwdlkh5l]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-qwdlkh5l] p[data-astro-cid-qwdlkh5l]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-qwdlkh5l]{padding:4rem 2rem}.container[data-astro-cid-qwdlkh5l]{max-width:800px;margin:0 auto}.vision-block[data-astro-cid-qwdlkh5l]{display:flex;flex-direction:column;gap:2rem}.vision-item[data-astro-cid-qwdlkh5l]{display:flex;gap:1.5rem;background:#fff;padding:2rem;border-radius:20px;box-shadow:0 10px 40px #8b45131a;align-items:flex-start}.number[data-astro-cid-qwdlkh5l]{width:50px;height:50px;background:linear-gradient(135deg,#ff8c00,gold);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.5rem;font-weight:700;flex-shrink:0}.content[data-astro-cid-qwdlkh5l] h3[data-astro-cid-qwdlkh5l]{color:#8b4513;margin:0 0 .5rem}.content[data-astro-cid-qwdlkh5l] p[data-astro-cid-qwdlkh5l]{color:#666;margin:0;line-height:1.8}.footer[data-astro-cid-qwdlkh5l]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/about/vision","isIndex":false,"type":"page","pattern":"^\\/about\\/vision\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"vision","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/vision.astro","pathname":"/about/vision","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-7wg47yhy]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-7wg47yhy] h1[data-astro-cid-7wg47yhy]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-7wg47yhy] p[data-astro-cid-7wg47yhy]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-7wg47yhy]{padding:4rem 2rem}.container[data-astro-cid-7wg47yhy]{max-width:800px;margin:0 auto}.intro-block[data-astro-cid-7wg47yhy],.meaning-block[data-astro-cid-7wg47yhy],.motto-block[data-astro-cid-7wg47yhy]{background:#fff;padding:2rem;border-radius:20px;margin-bottom:2rem;box-shadow:0 10px 40px #8b45131a}.intro-block[data-astro-cid-7wg47yhy] h2[data-astro-cid-7wg47yhy],.meaning-block[data-astro-cid-7wg47yhy] h2[data-astro-cid-7wg47yhy]{color:#8b4513;font-size:1.5rem;margin-bottom:1rem}.intro-block[data-astro-cid-7wg47yhy] p[data-astro-cid-7wg47yhy],.meaning-block[data-astro-cid-7wg47yhy] p[data-astro-cid-7wg47yhy]{color:#666;line-height:1.8;margin-bottom:1rem}.motto-block[data-astro-cid-7wg47yhy]{text-align:center;background:linear-gradient(135deg,#fff8dc,#ffefd5)}.motto-block[data-astro-cid-7wg47yhy] h2[data-astro-cid-7wg47yhy]{color:#8b4513;font-size:1.3rem;margin:0}.footer[data-astro-cid-7wg47yhy]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/about/waldorf-list","isIndex":false,"type":"page","pattern":"^\\/about\\/waldorf-list\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"waldorf-list","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/waldorf-list.astro","pathname":"/about/waldorf-list","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-kh7btl4r]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-kh7btl4r] h1[data-astro-cid-kh7btl4r]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-kh7btl4r] p[data-astro-cid-kh7btl4r]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-kh7btl4r]{padding:4rem 2rem}.container[data-astro-cid-kh7btl4r]{max-width:1000px;margin:0 auto}.section-title[data-astro-cid-kh7btl4r]{text-align:center;font-size:2rem;color:#8b4513;margin-bottom:3rem}.timeline[data-astro-cid-kh7btl4r]{position:relative;padding-left:2rem}.timeline[data-astro-cid-kh7btl4r]:before{content:\"\";position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(to bottom,#8b4513,#228b22);border-radius:2px}.timeline-item[data-astro-cid-kh7btl4r]{position:relative;padding-left:2rem;margin-bottom:2rem}.timeline-item[data-astro-cid-kh7btl4r]:before{content:\"\";position:absolute;left:-2.4rem;top:.5rem;width:16px;height:16px;background:#ff8c00;border-radius:50%;border:3px solid white;box-shadow:0 0 0 3px #8b4513}.timeline-year[data-astro-cid-kh7btl4r]{font-weight:700;color:#8b4513;font-size:1.1rem;margin-bottom:.3rem}.timeline-content[data-astro-cid-kh7btl4r]{background:#fff;padding:1.5rem;border-radius:15px;box-shadow:0 5px 20px #8b45131a}.philosophy[data-astro-cid-kh7btl4r]{background:linear-gradient(135deg,#fff8dc,wheat)}.philosophy-grid[data-astro-cid-kh7btl4r]{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem}.philosophy-card[data-astro-cid-kh7btl4r]{background:#fff;padding:2rem;border-radius:20px;text-align:center;box-shadow:0 10px 30px #8b45131a}.philosophy-card[data-astro-cid-kh7btl4r] .icon[data-astro-cid-kh7btl4r]{font-size:3rem;display:block;margin-bottom:1rem}.footer[data-astro-cid-kh7btl4r]{background:#333;color:#fff;padding:2rem;text-align:center}\n"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-ptyqnsar]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-ptyqnsar] h1[data-astro-cid-ptyqnsar]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-ptyqnsar] p[data-astro-cid-ptyqnsar]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-ptyqnsar]{padding:4rem 2rem}.container[data-astro-cid-ptyqnsar]{max-width:900px;margin:0 auto}.intro[data-astro-cid-ptyqnsar]{font-size:1.2rem;color:#555;margin-bottom:2rem}.post-item[data-astro-cid-ptyqnsar]{background:#fff;padding:2rem;border-radius:12px;box-shadow:0 4px 12px #0000001a;margin-bottom:2rem;border-left:4px solid #228B22}.post-item[data-astro-cid-ptyqnsar] .post-date[data-astro-cid-ptyqnsar]{color:#666;font-size:.85rem}.post-item[data-astro-cid-ptyqnsar] h3[data-astro-cid-ptyqnsar]{color:#8b4513;font-size:1.4rem;margin:.5rem 0}.post-item[data-astro-cid-ptyqnsar] .post-images[data-astro-cid-ptyqnsar]{display:flex;flex-direction:column;gap:1rem;margin:1rem 0}.post-item[data-astro-cid-ptyqnsar] .post-images[data-astro-cid-ptyqnsar] img[data-astro-cid-ptyqnsar]{width:100%;height:auto;max-height:500px;object-fit:contain;border-radius:8px;box-shadow:0 4px 12px #0000001a}.post-item[data-astro-cid-ptyqnsar] p[data-astro-cid-ptyqnsar]{line-height:1.7;color:#555;margin-bottom:.8rem}.post-item[data-astro-cid-ptyqnsar] p[data-astro-cid-ptyqnsar]:last-child{margin-bottom:0}.notice[data-astro-cid-ptyqnsar]{background:#fff3cd;padding:1rem;border-radius:8px;font-size:.85rem;color:#856404;margin-top:2rem}.footer[data-astro-cid-ptyqnsar]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/activities/achievement","isIndex":false,"type":"page","pattern":"^\\/activities\\/achievement\\/?$","segments":[[{"content":"activities","dynamic":false,"spread":false}],[{"content":"achievement","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/activities/achievement.astro","pathname":"/activities/achievement","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-k4pasjg2]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-k4pasjg2] h1[data-astro-cid-k4pasjg2]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-k4pasjg2] p[data-astro-cid-k4pasjg2]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-k4pasjg2]{padding:4rem 2rem}.container[data-astro-cid-k4pasjg2]{max-width:800px;margin:0 auto}.intro[data-astro-cid-k4pasjg2]{text-align:center;color:#666;margin-bottom:2rem}.content-block[data-astro-cid-k4pasjg2]{background:#fff;padding:2rem;border-radius:20px;box-shadow:0 10px 40px #8b45131a}.content-block[data-astro-cid-k4pasjg2] h2[data-astro-cid-k4pasjg2]{color:#8b4513;font-size:1.3rem;margin-bottom:1rem}.content-block[data-astro-cid-k4pasjg2] .post-images[data-astro-cid-k4pasjg2]{display:flex;flex-direction:column;gap:1rem;margin:1rem 0}.content-block[data-astro-cid-k4pasjg2] .post-images[data-astro-cid-k4pasjg2] img[data-astro-cid-k4pasjg2]{width:100%;height:auto;max-height:500px;object-fit:contain;border-radius:8px}.content-block[data-astro-cid-k4pasjg2] p[data-astro-cid-k4pasjg2]{color:#666;line-height:1.8;margin-bottom:1rem}.footer[data-astro-cid-k4pasjg2]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/activities/experience","isIndex":false,"type":"page","pattern":"^\\/activities\\/experience\\/?$","segments":[[{"content":"activities","dynamic":false,"spread":false}],[{"content":"experience","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/activities/experience.astro","pathname":"/activities/experience","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-fi3m4zrd]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-fi3m4zrd] h1[data-astro-cid-fi3m4zrd]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-fi3m4zrd] p[data-astro-cid-fi3m4zrd]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-fi3m4zrd]{padding:4rem 2rem}.container[data-astro-cid-fi3m4zrd]{max-width:800px;margin:0 auto}.intro[data-astro-cid-fi3m4zrd]{text-align:center;color:#666;margin-bottom:2rem}.content-block[data-astro-cid-fi3m4zrd]{background:#fff;padding:2rem;border-radius:20px;box-shadow:0 10px 40px #8b45131a;margin-bottom:2rem}.content-block[data-astro-cid-fi3m4zrd] h2[data-astro-cid-fi3m4zrd]{color:#8b4513;font-size:1.3rem;margin-bottom:1rem}.content-block[data-astro-cid-fi3m4zrd] .post-images[data-astro-cid-fi3m4zrd]{display:flex;flex-direction:column;gap:1rem;margin:1rem 0}.content-block[data-astro-cid-fi3m4zrd] .post-images[data-astro-cid-fi3m4zrd] img[data-astro-cid-fi3m4zrd]{width:100%;height:auto;max-height:500px;object-fit:contain;border-radius:8px}.content-block[data-astro-cid-fi3m4zrd] p[data-astro-cid-fi3m4zrd]{color:#666;line-height:1.8;margin-bottom:1rem}.footer[data-astro-cid-fi3m4zrd]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/activities/highlights","isIndex":false,"type":"page","pattern":"^\\/activities\\/highlights\\/?$","segments":[[{"content":"activities","dynamic":false,"spread":false}],[{"content":"highlights","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/activities/highlights.astro","pathname":"/activities/highlights","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-45j5sfqp]{background:linear-gradient(135deg,#ff8c00,gold);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-45j5sfqp] h1[data-astro-cid-45j5sfqp]{font-size:3rem;margin-bottom:.5rem}.section[data-astro-cid-45j5sfqp]{padding:4rem 2rem}.container[data-astro-cid-45j5sfqp]{max-width:1000px;margin:0 auto}.section-title[data-astro-cid-45j5sfqp]{text-align:center;font-size:2rem;color:#8b4513;margin-bottom:2rem}.photo-grid[data-astro-cid-45j5sfqp]{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:1.5rem}.photo-card[data-astro-cid-45j5sfqp]{background:#fff;border-radius:15px;overflow:hidden;box-shadow:0 10px 30px #8b45131a;transition:transform .3s ease}.photo-card[data-astro-cid-45j5sfqp]:hover{transform:translateY(-5px)}.photo-placeholder[data-astro-cid-45j5sfqp]{height:180px;background:linear-gradient(135deg,#fff8dc,wheat);display:flex;align-items:center;justify-content:center;font-size:4rem}.photo-card[data-astro-cid-45j5sfqp] p[data-astro-cid-45j5sfqp]{padding:1rem;text-align:center;color:#666;margin:0;font-weight:500}.video-section[data-astro-cid-45j5sfqp]{background:wheat}.video-placeholder[data-astro-cid-45j5sfqp]{background:#fff;padding:4rem;border-radius:20px;text-align:center;box-shadow:0 10px 30px #8b45131a}.video-icon[data-astro-cid-45j5sfqp]{font-size:4rem;display:block;margin-bottom:1rem}.video-placeholder[data-astro-cid-45j5sfqp] p[data-astro-cid-45j5sfqp]{color:#666;font-size:1.1rem}.footer[data-astro-cid-45j5sfqp]{background:#333;color:#fff;padding:2rem;text-align:center}\n"}],"routeData":{"route":"/activities/photos","isIndex":false,"type":"page","pattern":"^\\/activities\\/photos\\/?$","segments":[[{"content":"activities","dynamic":false,"spread":false}],[{"content":"photos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/activities/photos.astro","pathname":"/activities/photos","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-ogx7ogrw]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-ogx7ogrw] h1[data-astro-cid-ogx7ogrw]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-ogx7ogrw] p[data-astro-cid-ogx7ogrw]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-ogx7ogrw]{padding:4rem 2rem}.container[data-astro-cid-ogx7ogrw]{max-width:900px;margin:0 auto}h2[data-astro-cid-ogx7ogrw]{color:#8b4513;font-size:1.8rem;margin:3rem 0 1.5rem;border-bottom:2px solid #8B4513;padding-bottom:.5rem}h2[data-astro-cid-ogx7ogrw]:first-of-type{margin-top:0}.post-item[data-astro-cid-ogx7ogrw]{background:#fff;padding:2rem;border-radius:12px;box-shadow:0 4px 12px #0000001a;margin-bottom:2rem;border-left:4px solid #228B22}.post-item[data-astro-cid-ogx7ogrw] .post-date[data-astro-cid-ogx7ogrw]{color:#666;font-size:.85rem}.post-item[data-astro-cid-ogx7ogrw] h3[data-astro-cid-ogx7ogrw]{color:#8b4513;font-size:1.4rem;margin:.5rem 0}.post-item[data-astro-cid-ogx7ogrw] .post-author[data-astro-cid-ogx7ogrw]{color:#228b22;font-size:.9rem;margin-bottom:1rem}.post-item[data-astro-cid-ogx7ogrw] .post-images[data-astro-cid-ogx7ogrw]{display:flex;flex-direction:column;gap:1rem;margin:1rem 0}.post-item[data-astro-cid-ogx7ogrw] .post-images[data-astro-cid-ogx7ogrw] img[data-astro-cid-ogx7ogrw]{width:100%;height:auto;max-height:500px;object-fit:contain;border-radius:8px;box-shadow:0 4px 12px #0000001a}.post-item[data-astro-cid-ogx7ogrw] p[data-astro-cid-ogx7ogrw]{line-height:1.7;color:#555;margin-bottom:.8rem}.post-item[data-astro-cid-ogx7ogrw] p[data-astro-cid-ogx7ogrw]:last-child{margin-bottom:0}.festival-card[data-astro-cid-ogx7ogrw]{background:#fff;padding:2rem;border-radius:12px;box-shadow:0 4px 12px #0000001a;margin-bottom:1.5rem}.festival-card[data-astro-cid-ogx7ogrw] h3[data-astro-cid-ogx7ogrw]{color:#8b4513;font-size:1.3rem;margin-bottom:.5rem}.festival-card[data-astro-cid-ogx7ogrw] p[data-astro-cid-ogx7ogrw]{color:#555;line-height:1.6}.notice[data-astro-cid-ogx7ogrw]{background:#fff3cd;padding:1rem;border-radius:8px;font-size:.85rem;color:#856404;margin-top:2rem}.footer[data-astro-cid-ogx7ogrw]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/activities/seasons","isIndex":false,"type":"page","pattern":"^\\/activities\\/seasons\\/?$","segments":[[{"content":"activities","dynamic":false,"spread":false}],[{"content":"seasons","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/activities/seasons.astro","pathname":"/activities/seasons","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-oz5sc4al]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-oz5sc4al] h1[data-astro-cid-oz5sc4al]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-oz5sc4al] p[data-astro-cid-oz5sc4al]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-oz5sc4al]{padding:4rem 2rem}.container[data-astro-cid-oz5sc4al]{max-width:800px;margin:0 auto}.intro[data-astro-cid-oz5sc4al]{text-align:center;color:#666;margin-bottom:2rem}.content-block[data-astro-cid-oz5sc4al]{background:#fff;padding:2rem;border-radius:20px;box-shadow:0 10px 40px #8b45131a;margin-bottom:2rem}.content-block[data-astro-cid-oz5sc4al] h2[data-astro-cid-oz5sc4al]{color:#8b4513;font-size:1.3rem;margin-bottom:1rem}.content-block[data-astro-cid-oz5sc4al] .post-images[data-astro-cid-oz5sc4al]{display:flex;flex-direction:column;gap:1rem;margin:1rem 0}.content-block[data-astro-cid-oz5sc4al] .post-images[data-astro-cid-oz5sc4al] img[data-astro-cid-oz5sc4al]{width:100%;height:auto;max-height:500px;object-fit:contain;border-radius:8px}.content-block[data-astro-cid-oz5sc4al] p[data-astro-cid-oz5sc4al]{color:#666;line-height:1.8;margin-bottom:1rem}.footer[data-astro-cid-oz5sc4al]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/activities/seminars","isIndex":false,"type":"page","pattern":"^\\/activities\\/seminars\\/?$","segments":[[{"content":"activities","dynamic":false,"spread":false}],[{"content":"seminars","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/activities/seminars.astro","pathname":"/activities/seminars","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-porjcoge]{background:linear-gradient(135deg,#228b22,#8b4513);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-porjcoge] h1[data-astro-cid-porjcoge]{font-size:3rem;margin-bottom:.5rem}.section[data-astro-cid-porjcoge]{padding:4rem 2rem}.container[data-astro-cid-porjcoge]{max-width:1000px;margin:0 auto}.video-grid[data-astro-cid-porjcoge]{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem}.video-card[data-astro-cid-porjcoge]{background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 10px 40px #8b45131a}.video-placeholder[data-astro-cid-porjcoge]{height:180px;background:linear-gradient(135deg,#fff8dc,wheat);display:flex;align-items:center;justify-content:center}.video-placeholder[data-astro-cid-porjcoge] span[data-astro-cid-porjcoge]{font-size:4rem}.video-card[data-astro-cid-porjcoge] h3[data-astro-cid-porjcoge]{color:#8b4513;padding:1rem 1rem .5rem;margin:0}.video-card[data-astro-cid-porjcoge] p[data-astro-cid-porjcoge]{color:#666;padding:0 1rem 1rem;margin:0;font-size:.9rem}.notice[data-astro-cid-porjcoge]{background:#fff8dc;padding:1.5rem;border-radius:15px;text-align:center;margin-top:2rem}.notice[data-astro-cid-porjcoge] p[data-astro-cid-porjcoge]{color:#8b4513;margin:0;font-weight:500}.footer[data-astro-cid-porjcoge]{background:#333;color:#fff;padding:2rem;text-align:center}\n"}],"routeData":{"route":"/activities/videos","isIndex":false,"type":"page","pattern":"^\\/activities\\/videos\\/?$","segments":[[{"content":"activities","dynamic":false,"spread":false}],[{"content":"videos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/activities/videos.astro","pathname":"/activities/videos","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.back-link[data-astro-cid-dtcqb6l3]{color:#8b4513;text-decoration:none;font-size:.9rem}.editor-layout[data-astro-cid-dtcqb6l3]{display:grid;grid-template-columns:1fr 1fr;gap:2rem}@media(max-width:768px){.editor-layout[data-astro-cid-dtcqb6l3]{grid-template-columns:1fr}}.preview-area[data-astro-cid-dtcqb6l3]{background:#fff;border-radius:15px;overflow:hidden;box-shadow:0 5px 20px #0000001a}.preview-header[data-astro-cid-dtcqb6l3]{display:flex;justify-content:space-between;padding:1rem;background:#f5f5f5;font-weight:500}.preview-link[data-astro-cid-dtcqb6l3]{color:#228b22;font-size:.9rem}.preview-content[data-astro-cid-dtcqb6l3]{padding:2rem}.preview-content[data-astro-cid-dtcqb6l3] h2[data-astro-cid-dtcqb6l3]{color:#8b4513;margin-bottom:.5rem}.preview-content[data-astro-cid-dtcqb6l3] p[data-astro-cid-dtcqb6l3]{color:#666}.edit-area[data-astro-cid-dtcqb6l3]{background:#fff;border-radius:15px;padding:1.5rem;box-shadow:0 5px 20px #0000001a}.edit-area[data-astro-cid-dtcqb6l3] h3[data-astro-cid-dtcqb6l3]{margin-bottom:1rem;color:#333}.section-item[data-astro-cid-dtcqb6l3]{display:flex;align-items:center;gap:1rem;padding:.8rem;background:#f9f9f9;border-radius:8px;margin-bottom:.5rem}.section-number[data-astro-cid-dtcqb6l3]{width:30px;height:30px;background:#8b4513;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.8rem}.section-name[data-astro-cid-dtcqb6l3]{flex:1;font-weight:500}.edit-btn[data-astro-cid-dtcqb6l3]{padding:.4rem .8rem;background:#fff;border:1px solid #ddd;border-radius:5px;cursor:pointer}.add-section-btn[data-astro-cid-dtcqb6l3]{width:100%;padding:.8rem;background:#e8f5e9;border:2px dashed #228B22;border-radius:8px;color:#228b22;cursor:pointer;margin-top:.5rem}\n"}],"routeData":{"route":"/admin/edit/[id]","isIndex":false,"type":"page","pattern":"^\\/admin\\/edit\\/([^/]+?)\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"edit","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/admin/edit/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n*{margin:0;padding:0;box-sizing:border-box}body{font-family:Noto Sans TC,-apple-system,sans-serif;background:#f5f5f5}.editor-layout[data-astro-cid-wr2tdydo]{min-height:100vh;background:#f5f5f5}.editor-toolbar[data-astro-cid-wr2tdydo]{background:#fff;padding:1rem 1.5rem;display:flex;justify-content:space-between;align-items:center;box-shadow:0 2px 15px #0000001a;position:sticky;top:0;z-index:100;flex-wrap:wrap;gap:1rem}.toolbar-left[data-astro-cid-wr2tdydo]{display:flex;align-items:center;gap:1rem}.back-btn[data-astro-cid-wr2tdydo]{color:#666;text-decoration:none;padding:.5rem 1rem;border-radius:8px;background:#f0f0f0;font-size:.9rem}.back-btn[data-astro-cid-wr2tdydo]:hover{background:#e0e0e0}.page-title[data-astro-cid-wr2tdydo]{font-size:1.1rem;color:#333;font-weight:700}.toolbar-right[data-astro-cid-wr2tdydo]{display:flex;gap:.5rem;flex-wrap:wrap}.btn[data-astro-cid-wr2tdydo]{padding:.6rem 1rem;border:none;border-radius:8px;cursor:pointer;font-size:.85rem;transition:all .2s;font-family:inherit}.btn[data-astro-cid-wr2tdydo]:hover{transform:scale(1.05)}.btn-secondary[data-astro-cid-wr2tdydo]{background:#e8f5e9;color:#2e7d32}.btn-secondary[data-astro-cid-wr2tdydo]:hover{background:#c8e6c9}.btn-save[data-astro-cid-wr2tdydo]{background:linear-gradient(135deg,#228b22,#8b4513);color:#fff;font-weight:700}.editor-container[data-astro-cid-wr2tdydo]{padding:2rem;max-width:1100px;margin:0 auto}.editor-wrapper[data-astro-cid-wr2tdydo]{background:#fff;padding:3rem;border-radius:20px;box-shadow:0 5px 30px #0000001a;min-height:500px;line-height:1.8;outline:none}.editor-wrapper[data-astro-cid-wr2tdydo]:focus{box-shadow:0 5px 30px #228b2233}.editor-wrapper[data-astro-cid-wr2tdydo] h1[data-astro-cid-wr2tdydo],.editor-wrapper[data-astro-cid-wr2tdydo] h2[data-astro-cid-wr2tdydo]{color:#8b4513;margin:1.5rem 0 1rem}.editor-wrapper[data-astro-cid-wr2tdydo] h3[data-astro-cid-wr2tdydo]{color:#228b22;margin:1.2rem 0 .8rem}.editor-wrapper[data-astro-cid-wr2tdydo] p[data-astro-cid-wr2tdydo]{color:#555;margin-bottom:1rem}.editor-wrapper[data-astro-cid-wr2tdydo] ul[data-astro-cid-wr2tdydo],.editor-wrapper[data-astro-cid-wr2tdydo] ol[data-astro-cid-wr2tdydo]{padding-left:1.5rem;margin-bottom:1rem}.editor-wrapper[data-astro-cid-wr2tdydo] li[data-astro-cid-wr2tdydo]{color:#555;padding:.3rem 0}.editor-wrapper[data-astro-cid-wr2tdydo] table[data-astro-cid-wr2tdydo]{width:100%;border-collapse:collapse;margin:1rem 0}.editor-wrapper[data-astro-cid-wr2tdydo] td[data-astro-cid-wr2tdydo],.editor-wrapper[data-astro-cid-wr2tdydo] th[data-astro-cid-wr2tdydo]{padding:.8rem;border:1px solid #ddd}.editor-wrapper[data-astro-cid-wr2tdydo] th[data-astro-cid-wr2tdydo]{background:#f5f5f5;color:#8b4513}.toast[data-astro-cid-wr2tdydo]{position:fixed;bottom:2rem;right:2rem;background:#228b22;color:#fff;padding:1rem 2rem;border-radius:10px;opacity:0;transition:opacity .3s;font-weight:700}.toast[data-astro-cid-wr2tdydo].show{opacity:1}\n"}],"routeData":{"route":"/admin/edit","isIndex":false,"type":"page","pattern":"^\\/admin\\/edit\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"edit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/edit.astro","pathname":"/admin/edit","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/editor@_@astro.BxjIQULy.css"}],"routeData":{"route":"/admin/editor","isIndex":false,"type":"page","pattern":"^\\/admin\\/editor\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"editor","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/editor.astro","pathname":"/admin/editor","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/logout","isIndex":false,"type":"page","pattern":"^\\/admin\\/logout\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/logout.astro","pathname":"/admin/logout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.upload-form[data-astro-cid-xoipydew]{max-width:600px;margin:0 auto;background:#fff;padding:2rem;border-radius:15px;box-shadow:0 5px 20px #0000001a}.form-group[data-astro-cid-xoipydew]{margin-bottom:1.5rem}.form-group[data-astro-cid-xoipydew] label[data-astro-cid-xoipydew]{display:block;font-weight:500;margin-bottom:.5rem;color:#333}.form-group[data-astro-cid-xoipydew] input[data-astro-cid-xoipydew][type=text]{width:100%;padding:.8rem 1rem;border:1px solid #ddd;border-radius:8px;font-size:1rem}.form-group[data-astro-cid-xoipydew] input[data-astro-cid-xoipydew][type=text]:focus{outline:none;border-color:#8b4513}.file-upload[data-astro-cid-xoipydew]{position:relative}.file-upload[data-astro-cid-xoipydew] input[data-astro-cid-xoipydew][type=file]{position:absolute;opacity:0;width:100%;height:100%;cursor:pointer}.file-label[data-astro-cid-xoipydew]{display:flex;align-items:center;justify-content:center;gap:.5rem;padding:2rem;background:#f5f5f5;border:2px dashed #ddd;border-radius:8px;cursor:pointer;transition:all .2s}.file-label[data-astro-cid-xoipydew]:hover{border-color:#8b4513;background:#fafafa}.upload-icon[data-astro-cid-xoipydew]{font-size:2rem}.upload-text[data-astro-cid-xoipydew]{font-size:1rem;color:#666}.current-file[data-astro-cid-xoipydew]{margin-top:.5rem;font-size:.9rem;color:#666}.info-box[data-astro-cid-xoipydew]{background:#e8f5e9;padding:1rem;border-radius:8px;margin-bottom:1.5rem}.info-box[data-astro-cid-xoipydew] h4[data-astro-cid-xoipydew]{margin-bottom:.5rem;color:#228b22}.info-box[data-astro-cid-xoipydew] ul[data-astro-cid-xoipydew]{margin:0;padding-left:1.2rem;font-size:.9rem;color:#666}.info-box[data-astro-cid-xoipydew] li[data-astro-cid-xoipydew]{margin-bottom:.3rem}.form-actions[data-astro-cid-xoipydew]{display:flex;gap:1rem}.submit-btn[data-astro-cid-xoipydew]{flex:1;padding:1rem;background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;border:none;border-radius:8px;font-size:1rem;font-weight:500;cursor:pointer}.cancel-btn[data-astro-cid-xoipydew]{padding:1rem 2rem;background:#f5f5f5;color:#666;border-radius:8px;text-decoration:none}\n"}],"routeData":{"route":"/admin/newsletter/[id]","isIndex":false,"type":"page","pattern":"^\\/admin\\/newsletter\\/([^/]+?)\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"newsletter","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/admin/newsletter/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.admin-grid[data-astro-cid-u2h3djql]{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;max-width:1200px;margin:0 auto}.admin-card[data-astro-cid-u2h3djql]{background:#fff;border-radius:15px;padding:1.5rem;box-shadow:0 5px 20px #0000001a}.admin-card[data-astro-cid-u2h3djql] h3[data-astro-cid-u2h3djql]{color:#8b4513;margin-bottom:.5rem}.admin-card[data-astro-cid-u2h3djql] p[data-astro-cid-u2h3djql]{color:#666;font-size:.9rem;margin-bottom:1rem}.admin-card[data-astro-cid-u2h3djql].highlight{border:2px solid #228B22}.page-list[data-astro-cid-u2h3djql],.issue-list[data-astro-cid-u2h3djql]{display:flex;flex-direction:column;gap:.5rem;margin-bottom:1rem}.page-item[data-astro-cid-u2h3djql],.issue-item[data-astro-cid-u2h3djql]{display:flex;justify-content:space-between;align-items:center;padding:.8rem 1rem;background:#f5f5f5;border-radius:8px;text-decoration:none;color:#333;transition:all .2s}.page-item[data-astro-cid-u2h3djql]:hover,.issue-item[data-astro-cid-u2h3djql]:hover{background:#e8e8e8;transform:translate(5px)}.issue-info[data-astro-cid-u2h3djql]{font-size:.8rem;color:#666}.add-btn[data-astro-cid-u2h3djql],.action-btn[data-astro-cid-u2h3djql]{display:block;text-align:center;padding:.8rem 1rem;background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;border-radius:8px;text-decoration:none;font-weight:500}.add-btn[data-astro-cid-u2h3djql]:hover,.action-btn[data-astro-cid-u2h3djql]:hover{opacity:.9}.admin-card[data-astro-cid-u2h3djql].highlight-cms{border:2px solid #8B4513}.logout-btn[data-astro-cid-u2h3djql]{background:linear-gradient(135deg,#666,#444)}\n"}],"routeData":{"route":"/admin","isIndex":true,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/index.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-wno2uafb]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-wno2uafb] h1[data-astro-cid-wno2uafb]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-wno2uafb] p[data-astro-cid-wno2uafb]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-wno2uafb]{padding:4rem 2rem}.container[data-astro-cid-wno2uafb]{max-width:800px;margin:0 auto}.flowchart[data-astro-cid-wno2uafb]{background:#fff;border-radius:20px;padding:2rem;margin-bottom:2rem;box-shadow:0 10px 40px #8b45131a}.flowchart[data-astro-cid-wno2uafb] h2[data-astro-cid-wno2uafb]{color:#228b22;font-size:1.5rem;margin-bottom:1.5rem;text-align:center}.flowchart[data-astro-cid-wno2uafb] ol[data-astro-cid-wno2uafb]{list-style:none;padding:0;counter-reset:steps}.flowchart[data-astro-cid-wno2uafb] li[data-astro-cid-wno2uafb]{padding:.8rem 0 .8rem 2rem;position:relative;color:#666;border-left:3px solid #4caf50;margin-left:1rem}.flowchart[data-astro-cid-wno2uafb] li[data-astro-cid-wno2uafb]:before{counter-increment:steps;content:counter(steps);position:absolute;left:-12px;background:#228b22;color:#fff;width:24px;height:24px;border-radius:50%;text-align:center;line-height:24px;font-size:.8rem}.step[data-astro-cid-wno2uafb]{color:#228b22;font-weight:700}.notice[data-astro-cid-wno2uafb]{background:#e8f5e9;padding:2rem;border-radius:20px;margin-bottom:2rem}.notice[data-astro-cid-wno2uafb] h3[data-astro-cid-wno2uafb]{color:#2e7d32;margin-bottom:1rem}.notice[data-astro-cid-wno2uafb] p[data-astro-cid-wno2uafb]{color:#555;line-height:1.8}.requirements[data-astro-cid-wno2uafb]{background:#fff;border-radius:20px;padding:2rem;margin-bottom:2rem;box-shadow:0 10px 40px #8b45131a}.requirements[data-astro-cid-wno2uafb] h3[data-astro-cid-wno2uafb]{color:#8b4513;font-size:1.5rem;margin-bottom:1.5rem}.req-item[data-astro-cid-wno2uafb]{margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid #eee}.req-item[data-astro-cid-wno2uafb]:last-child{border-bottom:none}.req-item[data-astro-cid-wno2uafb] h4[data-astro-cid-wno2uafb]{color:#228b22;margin-bottom:.5rem}.req-item[data-astro-cid-wno2uafb] p[data-astro-cid-wno2uafb],.req-item[data-astro-cid-wno2uafb] li[data-astro-cid-wno2uafb]{color:#666}.req-item[data-astro-cid-wno2uafb] ul[data-astro-cid-wno2uafb]{padding-left:1.2rem}.fees[data-astro-cid-wno2uafb]{background:#fff;border-radius:20px;padding:2rem;box-shadow:0 10px 40px #8b45131a}.fees[data-astro-cid-wno2uafb] h3[data-astro-cid-wno2uafb]{color:#8b4513;font-size:1.5rem;margin-bottom:1rem}.fees[data-astro-cid-wno2uafb] .note[data-astro-cid-wno2uafb]{color:#888;font-size:.9rem;margin-bottom:1rem}.fees[data-astro-cid-wno2uafb] table[data-astro-cid-wno2uafb]{width:100%;border-collapse:collapse}.fees[data-astro-cid-wno2uafb] th[data-astro-cid-wno2uafb],.fees[data-astro-cid-wno2uafb] td[data-astro-cid-wno2uafb]{padding:1rem;text-align:left;border-bottom:1px solid #eee}.fees[data-astro-cid-wno2uafb] th[data-astro-cid-wno2uafb]{background:#f5f5f5;color:#8b4513}.fees[data-astro-cid-wno2uafb] td[data-astro-cid-wno2uafb]{color:#666}.fees[data-astro-cid-wno2uafb] tr[data-astro-cid-wno2uafb]:last-child td[data-astro-cid-wno2uafb]{border-bottom:none}.footer[data-astro-cid-wno2uafb]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/admissions/apply","isIndex":false,"type":"page","pattern":"^\\/admissions\\/apply\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"apply","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/apply.astro","pathname":"/admissions/apply","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-qpaxci3n]{background:linear-gradient(135deg,#228b22,#8b4513);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-qpaxci3n] h1[data-astro-cid-qpaxci3n]{font-size:3rem;margin-bottom:.5rem}.section[data-astro-cid-qpaxci3n]{padding:4rem 2rem}.container[data-astro-cid-qpaxci3n]{max-width:800px;margin:0 auto}.faq-item[data-astro-cid-qpaxci3n]{background:#fff;padding:2rem;border-radius:20px;margin-bottom:1.5rem;box-shadow:0 10px 40px #8b45131a}.faq-item[data-astro-cid-qpaxci3n] h3[data-astro-cid-qpaxci3n]{color:#8b4513;font-size:1.2rem;margin-bottom:1rem}.faq-item[data-astro-cid-qpaxci3n] p[data-astro-cid-qpaxci3n]{color:#666;line-height:1.8;margin:0}.footer[data-astro-cid-qpaxci3n]{background:#333;color:#fff;padding:2rem;text-align:center}\n"}],"routeData":{"route":"/admissions/faq","isIndex":false,"type":"page","pattern":"^\\/admissions\\/faq\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"faq","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/faq.astro","pathname":"/admissions/faq","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-r7ytvnsj]{background:linear-gradient(135deg,#ff8c00,gold);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-r7ytvnsj] h1[data-astro-cid-r7ytvnsj]{font-size:3rem;margin-bottom:.5rem}.section[data-astro-cid-r7ytvnsj]{padding:4rem 2rem}.container[data-astro-cid-r7ytvnsj]{max-width:900px;margin:0 auto}.info-card[data-astro-cid-r7ytvnsj]{background:#fff;padding:2rem;border-radius:20px;margin-bottom:2rem;box-shadow:0 10px 40px #8b45131a}.info-card[data-astro-cid-r7ytvnsj] h2[data-astro-cid-r7ytvnsj]{color:#8b4513;font-size:1.5rem;margin-bottom:1.5rem;padding-bottom:.5rem;border-bottom:2px solid #e0d4c8}.info-table[data-astro-cid-r7ytvnsj]{width:100%;border-collapse:collapse}.info-table[data-astro-cid-r7ytvnsj] th[data-astro-cid-r7ytvnsj],.info-table[data-astro-cid-r7ytvnsj] td[data-astro-cid-r7ytvnsj]{padding:1rem;text-align:left;border-bottom:1px solid #e0d4c8}.info-table[data-astro-cid-r7ytvnsj] th[data-astro-cid-r7ytvnsj]{background:#fff8dc;color:#8b4513;font-weight:600}.requirement-list[data-astro-cid-r7ytvnsj],.contact-list[data-astro-cid-r7ytvnsj]{list-style:none;padding:0}.requirement-list[data-astro-cid-r7ytvnsj] li[data-astro-cid-r7ytvnsj],.contact-list[data-astro-cid-r7ytvnsj] li[data-astro-cid-r7ytvnsj]{padding:.8rem 0;color:#666;border-bottom:1px solid #e0d4c8}.requirement-list[data-astro-cid-r7ytvnsj] li[data-astro-cid-r7ytvnsj]:last-child,.contact-list[data-astro-cid-r7ytvnsj] li[data-astro-cid-r7ytvnsj]:last-child{border-bottom:none}.process-steps[data-astro-cid-r7ytvnsj]{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}.step[data-astro-cid-r7ytvnsj]{text-align:center;padding:1rem;background:#fff8dc;border-radius:15px}.step-num[data-astro-cid-r7ytvnsj]{width:40px;height:40px;background:linear-gradient(135deg,#ff8c00,gold);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;margin:0 auto 1rem}.step[data-astro-cid-r7ytvnsj] h3[data-astro-cid-r7ytvnsj]{color:#8b4513;font-size:1rem;margin-bottom:.5rem}.step[data-astro-cid-r7ytvnsj] p[data-astro-cid-r7ytvnsj]{color:#666;font-size:.9rem;margin:0}.download-links[data-astro-cid-r7ytvnsj]{display:flex;gap:1rem;margin-top:1rem}.download-btn[data-astro-cid-r7ytvnsj]{display:flex;align-items:center;gap:.5rem;padding:1rem 1.5rem;border-radius:10px;text-decoration:none;transition:transform .2s}.download-btn[data-astro-cid-r7ytvnsj]:hover{transform:translateY(-2px)}.download-btn[data-astro-cid-r7ytvnsj].docx{background:#2196f3;color:#fff}.download-btn[data-astro-cid-r7ytvnsj].pdf{background:#f44336;color:#fff}.download-btn[data-astro-cid-r7ytvnsj] .icon[data-astro-cid-r7ytvnsj]{font-size:1.5rem}.footer[data-astro-cid-r7ytvnsj]{background:#333;color:#fff;padding:2rem;text-align:center}@media(max-width:768px){.process-steps[data-astro-cid-r7ytvnsj]{grid-template-columns:1fr 1fr}}\n"}],"routeData":{"route":"/admissions/guide","isIndex":false,"type":"page","pattern":"^\\/admissions\\/guide\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"guide","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/guide.astro","pathname":"/admissions/guide","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-2ok6z33l]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-2ok6z33l] h1[data-astro-cid-2ok6z33l]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-2ok6z33l] p[data-astro-cid-2ok6z33l]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-2ok6z33l]{padding:4rem 2rem}.container[data-astro-cid-2ok6z33l]{max-width:800px;margin:0 auto}.info-card[data-astro-cid-2ok6z33l]{background:#fff;border-radius:20px;padding:2rem;margin-bottom:2rem;box-shadow:0 10px 40px #8b45131a}.info-card[data-astro-cid-2ok6z33l] h2[data-astro-cid-2ok6z33l]{color:#8b4513;font-size:1.5rem;margin-bottom:1.5rem;padding-bottom:.5rem;border-bottom:2px solid #e0d4c8}.fee-item[data-astro-cid-2ok6z33l]{margin-bottom:2rem;padding-bottom:1.5rem;border-bottom:1px solid #eee}.fee-item[data-astro-cid-2ok6z33l]:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}.fee-item[data-astro-cid-2ok6z33l] h3[data-astro-cid-2ok6z33l]{color:#228b22;font-size:1.2rem;margin-bottom:.5rem}.amount[data-astro-cid-2ok6z33l]{font-size:1.3rem;color:#228b22;font-weight:700}.note[data-astro-cid-2ok6z33l]{color:#888;font-size:.9rem;margin-top:.3rem}.fee-table[data-astro-cid-2ok6z33l]{width:100%;margin-top:1rem;border-collapse:collapse}.fee-table[data-astro-cid-2ok6z33l] td[data-astro-cid-2ok6z33l]{padding:.8rem;border-bottom:1px solid #eee}.fee-table[data-astro-cid-2ok6z33l] tr[data-astro-cid-2ok6z33l]:last-child td[data-astro-cid-2ok6z33l]{border-bottom:none}.fee-item[data-astro-cid-2ok6z33l] ul[data-astro-cid-2ok6z33l]{list-style:none;padding:0}.fee-item[data-astro-cid-2ok6z33l] li[data-astro-cid-2ok6z33l]{padding:.5rem 0;color:#666}.installment[data-astro-cid-2ok6z33l]{background:#e8f5e9;padding:1.5rem;border-radius:15px;margin-top:1rem}.installment[data-astro-cid-2ok6z33l] h3[data-astro-cid-2ok6z33l]{color:#2e7d32;margin-bottom:.5rem}.installment[data-astro-cid-2ok6z33l] p[data-astro-cid-2ok6z33l]{color:#555;margin:0}.policy-item[data-astro-cid-2ok6z33l]{margin-bottom:2rem;padding-bottom:1.5rem;border-bottom:1px solid #eee}.policy-item[data-astro-cid-2ok6z33l]:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}.policy-item[data-astro-cid-2ok6z33l] h3[data-astro-cid-2ok6z33l]{color:#228b22;font-size:1.1rem;margin-bottom:.8rem}.policy-item[data-astro-cid-2ok6z33l] ul[data-astro-cid-2ok6z33l]{list-style:none;padding:0}.policy-item[data-astro-cid-2ok6z33l] li[data-astro-cid-2ok6z33l]{color:#666;padding:.4rem 0 .4rem 1.2rem;position:relative}.policy-item[data-astro-cid-2ok6z33l] li[data-astro-cid-2ok6z33l]:before{content:\"•\";color:#228b22;position:absolute;left:0}.refund-table[data-astro-cid-2ok6z33l]{width:100%;border-collapse:collapse;margin-top:.5rem}.refund-table[data-astro-cid-2ok6z33l] th[data-astro-cid-2ok6z33l],.refund-table[data-astro-cid-2ok6z33l] td[data-astro-cid-2ok6z33l]{padding:.8rem;text-align:left;border:1px solid #e0d4c8}.refund-table[data-astro-cid-2ok6z33l] th[data-astro-cid-2ok6z33l]{background:#fff8dc;color:#8b4513}.refund-table[data-astro-cid-2ok6z33l] td[data-astro-cid-2ok6z33l]{color:#555}.footer[data-astro-cid-2ok6z33l]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/admissions/refund","isIndex":false,"type":"page","pattern":"^\\/admissions\\/refund\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"refund","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/refund.astro","pathname":"/admissions/refund","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-ve73tcd6]{background:linear-gradient(135deg,#ff8c00,gold);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-ve73tcd6] h1[data-astro-cid-ve73tcd6]{font-size:3rem;margin-bottom:.5rem}.section[data-astro-cid-ve73tcd6]{padding:4rem 2rem}.container[data-astro-cid-ve73tcd6]{max-width:800px;margin:0 auto}.info-card[data-astro-cid-ve73tcd6]{background:#fff;padding:2rem;border-radius:20px;margin-bottom:2rem;box-shadow:0 10px 40px #8b45131a}.info-card[data-astro-cid-ve73tcd6] h2[data-astro-cid-ve73tcd6]{color:#8b4513;font-size:1.5rem;margin-bottom:1rem;padding-bottom:.5rem;border-bottom:2px solid #e0d4c8}.intro[data-astro-cid-ve73tcd6]{color:#666;line-height:1.8;font-size:1.1rem}.highlight-box[data-astro-cid-ve73tcd6]{background:linear-gradient(135deg,#fff8dc,wheat);padding:1.5rem;border-radius:15px;margin-top:1.5rem}.highlight-box[data-astro-cid-ve73tcd6] h3[data-astro-cid-ve73tcd6]{color:#8b4513;margin-bottom:1rem}.highlight-box[data-astro-cid-ve73tcd6] ul[data-astro-cid-ve73tcd6]{list-style:none;padding:0}.highlight-box[data-astro-cid-ve73tcd6] li[data-astro-cid-ve73tcd6]{padding:.5rem 0;color:#666}.highlight-box[data-astro-cid-ve73tcd6] li[data-astro-cid-ve73tcd6]:before{content:\"✦ \";color:#ff8c00}.event-list[data-astro-cid-ve73tcd6]{display:grid;gap:1rem}.event-item[data-astro-cid-ve73tcd6]{display:flex;gap:1rem;padding:1rem;background:#fff8dc;border-radius:15px}.event-date[data-astro-cid-ve73tcd6]{background:#228b22;color:#fff;padding:.5rem 1rem;border-radius:10px;font-weight:700;white-space:nowrap}.event-content[data-astro-cid-ve73tcd6] h3[data-astro-cid-ve73tcd6]{color:#8b4513;margin-bottom:.3rem}.event-content[data-astro-cid-ve73tcd6] p[data-astro-cid-ve73tcd6]{color:#666;margin:0;font-size:.9rem}.note[data-astro-cid-ve73tcd6]{color:#999;font-size:.9rem;margin-top:1rem}.content-list[data-astro-cid-ve73tcd6]{list-style:none;padding:0}.content-list[data-astro-cid-ve73tcd6] li[data-astro-cid-ve73tcd6]{padding:.8rem 0;color:#666;border-bottom:1px solid #e0d4c8}.content-list[data-astro-cid-ve73tcd6] li[data-astro-cid-ve73tcd6]:last-child{border-bottom:none}.content-list[data-astro-cid-ve73tcd6] li[data-astro-cid-ve73tcd6]:before{content:\"✓ \";color:#228b22}.cta[data-astro-cid-ve73tcd6]{text-align:center;background:linear-gradient(135deg,#8b4513,sienna);color:#fff}.cta[data-astro-cid-ve73tcd6] h2[data-astro-cid-ve73tcd6]{color:#fff;border-bottom:none}.cta[data-astro-cid-ve73tcd6] p[data-astro-cid-ve73tcd6]{color:#ffffffe6}.btn-primary[data-astro-cid-ve73tcd6]{display:inline-block;background:#fff;color:#8b4513;padding:1rem 3rem;border-radius:30px;text-decoration:none;font-weight:700;margin-top:1rem;transition:transform .3s ease}.btn-primary[data-astro-cid-ve73tcd6]:hover{transform:scale(1.05)}.footer[data-astro-cid-ve73tcd6]{background:#333;color:#fff;padding:2rem;text-align:center}\n"}],"routeData":{"route":"/admissions/seminar","isIndex":false,"type":"page","pattern":"^\\/admissions\\/seminar\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"seminar","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/seminar.astro","pathname":"/admissions/seminar","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-dgzs3dew]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-dgzs3dew] h1[data-astro-cid-dgzs3dew]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-dgzs3dew] p[data-astro-cid-dgzs3dew]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-dgzs3dew]{padding:4rem 2rem}.container[data-astro-cid-dgzs3dew]{max-width:800px;margin:0 auto}.step-card[data-astro-cid-dgzs3dew]{display:flex;gap:1.5rem;background:#fff;padding:1.5rem;border-radius:20px;margin-bottom:1.5rem;box-shadow:0 10px 40px #8b45131a}.step-num[data-astro-cid-dgzs3dew]{width:50px;height:50px;background:linear-gradient(135deg,#ff8c00,gold);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:700;flex-shrink:0}.step-content[data-astro-cid-dgzs3dew] h2[data-astro-cid-dgzs3dew]{color:#8b4513;font-size:1.2rem;margin-bottom:.5rem}.step-content[data-astro-cid-dgzs3dew] p[data-astro-cid-dgzs3dew]{color:#666;margin-bottom:.5rem}.step-content[data-astro-cid-dgzs3dew] ul[data-astro-cid-dgzs3dew]{list-style:none;padding:0;margin:.5rem 0}.step-content[data-astro-cid-dgzs3dew] li[data-astro-cid-dgzs3dew]{color:#555;padding:.3rem 0 .3rem 1rem;position:relative}.step-content[data-astro-cid-dgzs3dew] li[data-astro-cid-dgzs3dew]:before{content:\"•\";color:#228b22;position:absolute;left:0}.note[data-astro-cid-dgzs3dew]{color:#888;font-size:.9rem;font-style:italic}.notice[data-astro-cid-dgzs3dew]{background:#fff3e0;padding:1.5rem;border-radius:15px;margin-top:2rem}.notice[data-astro-cid-dgzs3dew] h3[data-astro-cid-dgzs3dew]{color:#e65100;margin-bottom:1rem}.notice[data-astro-cid-dgzs3dew] ul[data-astro-cid-dgzs3dew]{list-style:none;padding:0}.notice[data-astro-cid-dgzs3dew] li[data-astro-cid-dgzs3dew]{color:#666;padding:.4rem 0}.contact[data-astro-cid-dgzs3dew]{background:#e8f5e9;padding:1.5rem;border-radius:15px;margin-top:1.5rem;text-align:center}.contact[data-astro-cid-dgzs3dew] h3[data-astro-cid-dgzs3dew]{color:#2e7d32;margin-bottom:.5rem}.contact[data-astro-cid-dgzs3dew] p[data-astro-cid-dgzs3dew]{color:#555;margin:0}.footer[data-astro-cid-dgzs3dew]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/admissions/transfer-out","isIndex":false,"type":"page","pattern":"^\\/admissions\\/transfer-out\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"transfer-out","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/transfer-out.astro","pathname":"/admissions/transfer-out","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-pp5odirv]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-pp5odirv] h1[data-astro-cid-pp5odirv]{font-size:3rem;margin-bottom:.5rem}.section[data-astro-cid-pp5odirv]{padding:4rem 2rem}.container[data-astro-cid-pp5odirv]{max-width:800px;margin:0 auto}.content-block[data-astro-cid-pp5odirv]{background:#fff;padding:2rem;border-radius:20px;margin-bottom:1.5rem;box-shadow:0 10px 40px #8b45131a}.content-block[data-astro-cid-pp5odirv] h2[data-astro-cid-pp5odirv]{color:#8b4513;font-size:1.3rem;margin-bottom:1rem}.content-block[data-astro-cid-pp5odirv] p[data-astro-cid-pp5odirv],.content-block[data-astro-cid-pp5odirv] li[data-astro-cid-pp5odirv]{color:#666;line-height:1.8}.content-block[data-astro-cid-pp5odirv] ul[data-astro-cid-pp5odirv]{padding-left:1.5rem}.stations[data-astro-cid-pp5odirv]{background:#f5f5f5;padding:1rem;border-radius:10px;margin-top:1rem}.station[data-astro-cid-pp5odirv]{display:flex;align-items:center;gap:.5rem;padding:.5rem 0;color:#555}.station[data-astro-cid-pp5odirv] .icon[data-astro-cid-pp5odirv]{font-size:1.2rem}.map-block[data-astro-cid-pp5odirv] iframe[data-astro-cid-pp5odirv]{border-radius:10px;margin-top:1rem}.contact-block[data-astro-cid-pp5odirv]{background:linear-gradient(135deg,#fff8f0,#fff);border:2px solid #8B4513}.contact-info[data-astro-cid-pp5odirv] p[data-astro-cid-pp5odirv]{margin:.5rem 0;font-size:1.1rem}.footer[data-astro-cid-pp5odirv]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/admissions/transportation","isIndex":false,"type":"page","pattern":"^\\/admissions\\/transportation\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"transportation","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/transportation.astro","pathname":"/admissions/transportation","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-3l7kfokz]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-3l7kfokz] h1[data-astro-cid-3l7kfokz]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-3l7kfokz] p[data-astro-cid-3l7kfokz]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-3l7kfokz]{padding:4rem 2rem}.container[data-astro-cid-3l7kfokz]{max-width:800px;margin:0 auto}.note[data-astro-cid-3l7kfokz]{text-align:center;color:#888;margin-bottom:2rem}.tuition-card[data-astro-cid-3l7kfokz]{background:#fff;border-radius:20px;padding:2rem;margin-bottom:2rem;box-shadow:0 10px 40px #8b45131a}.tuition-card[data-astro-cid-3l7kfokz] h2[data-astro-cid-3l7kfokz]{color:#8b4513;font-size:1.8rem;margin-bottom:1.5rem;text-align:center}.tuition-card[data-astro-cid-3l7kfokz].highlight{background:linear-gradient(135deg,#fff8f0,#fff);border:2px solid #228B22}.semester[data-astro-cid-3l7kfokz]{padding:1rem 0;border-bottom:1px solid #eee}.semester[data-astro-cid-3l7kfokz]:last-of-type{border-bottom:none}.semester[data-astro-cid-3l7kfokz] h3[data-astro-cid-3l7kfokz]{color:#666;font-size:1rem;margin-bottom:.5rem}.amount[data-astro-cid-3l7kfokz]{font-size:2rem;color:#228b22;font-weight:700;margin:.5rem 0}.tuition-card[data-astro-cid-3l7kfokz] ul[data-astro-cid-3l7kfokz]{list-style:none;padding:0;margin:0}.tuition-card[data-astro-cid-3l7kfokz] li[data-astro-cid-3l7kfokz]{color:#666;padding:.2rem 0 .2rem 1rem;position:relative}.tuition-card[data-astro-cid-3l7kfokz] li[data-astro-cid-3l7kfokz]:before{content:\"•\";color:#228b22;position:absolute;left:0}.total[data-astro-cid-3l7kfokz]{background:#f9f9f9;padding:1rem;border-radius:10px;text-align:center;margin-top:1rem;font-size:1.2rem}.total[data-astro-cid-3l7kfokz] span[data-astro-cid-3l7kfokz]{color:#666}.total[data-astro-cid-3l7kfokz] strong[data-astro-cid-3l7kfokz]{color:#8b4513;font-size:1.5rem}.subsidy[data-astro-cid-3l7kfokz]{background:#e8f5e9;padding:1rem;border-radius:10px;margin-top:1rem;text-align:center}.subsidy[data-astro-cid-3l7kfokz] p[data-astro-cid-3l7kfokz]{margin:0;color:#2e7d32}.notice[data-astro-cid-3l7kfokz]{background:#fff3e0;padding:2rem;border-radius:20px;margin-top:2rem}.notice[data-astro-cid-3l7kfokz] h3[data-astro-cid-3l7kfokz]{color:#e65100;margin-bottom:1rem}.notice[data-astro-cid-3l7kfokz] ul[data-astro-cid-3l7kfokz]{list-style:none;padding:0}.notice[data-astro-cid-3l7kfokz] li[data-astro-cid-3l7kfokz]{color:#666;padding:.5rem 0}.footer[data-astro-cid-3l7kfokz]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/admissions/tuition","isIndex":false,"type":"page","pattern":"^\\/admissions\\/tuition\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"tuition","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/tuition.astro","pathname":"/admissions/tuition","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-drawl2rl]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-drawl2rl] h1[data-astro-cid-drawl2rl]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-drawl2rl] p[data-astro-cid-drawl2rl]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-drawl2rl]{padding:4rem 2rem}.container[data-astro-cid-drawl2rl]{max-width:700px;margin:0 auto}.intro[data-astro-cid-drawl2rl]{text-align:center;margin-bottom:2rem}.intro[data-astro-cid-drawl2rl] p[data-astro-cid-drawl2rl]{color:#666;font-size:1.1rem;line-height:1.8;margin-bottom:1rem}.form-container[data-astro-cid-drawl2rl]{background:#fff;padding:2.5rem;border-radius:20px;box-shadow:0 10px 40px #8b45131a}.form-row[data-astro-cid-drawl2rl]{margin-bottom:1.5rem}.form-row[data-astro-cid-drawl2rl].two-col{display:grid;grid-template-columns:1fr 1fr;gap:1rem}.form-group[data-astro-cid-drawl2rl] label[data-astro-cid-drawl2rl]{display:block;color:#8b4513;font-weight:500;margin-bottom:.5rem}.required[data-astro-cid-drawl2rl]{color:#e65100}.form-group[data-astro-cid-drawl2rl] input[data-astro-cid-drawl2rl],.form-group[data-astro-cid-drawl2rl] textarea[data-astro-cid-drawl2rl]{width:100%;padding:12px 15px;border:2px solid #e0d4c8;border-radius:10px;font-size:1rem;font-family:inherit;transition:border-color .3s ease}.form-group[data-astro-cid-drawl2rl] input[data-astro-cid-drawl2rl]:focus,.form-group[data-astro-cid-drawl2rl] textarea[data-astro-cid-drawl2rl]:focus{outline:none;border-color:#8b4513}.hint[data-astro-cid-drawl2rl]{font-size:.85rem;color:#888;margin-top:.3rem}.btn-submit[data-astro-cid-drawl2rl]{width:100%;padding:1rem;background:linear-gradient(135deg,#228b22,#8b4513);color:#fff;border:none;border-radius:10px;font-size:1.1rem;font-weight:700;cursor:pointer;transition:transform .2s ease}.btn-submit[data-astro-cid-drawl2rl]:hover{transform:translateY(-2px)}.contact-info[data-astro-cid-drawl2rl]{text-align:center;margin-top:2rem;padding:1.5rem;background:#f5f5f5;border-radius:15px}.contact-info[data-astro-cid-drawl2rl] h3[data-astro-cid-drawl2rl]{color:#8b4513;margin-bottom:.5rem}.contact-info[data-astro-cid-drawl2rl] p[data-astro-cid-drawl2rl]{color:#666;margin:.3rem 0}.footer[data-astro-cid-drawl2rl]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}@media(max-width:600px){.form-row[data-astro-cid-drawl2rl].two-col{grid-template-columns:1fr}}\n"}],"routeData":{"route":"/admissions/visit","isIndex":false,"type":"page","pattern":"^\\/admissions\\/visit\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"visit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/visit.astro","pathname":"/admissions/visit","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-7rgrydsz]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-7rgrydsz] h1[data-astro-cid-7rgrydsz]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-7rgrydsz] p[data-astro-cid-7rgrydsz]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-7rgrydsz]{padding:4rem 2rem}.container[data-astro-cid-7rgrydsz]{max-width:800px;margin:0 auto}.qa-item[data-astro-cid-7rgrydsz]{background:#fff;padding:2rem;border-radius:20px;margin-bottom:1.5rem;box-shadow:0 10px 40px #8b45131a}.qa-item[data-astro-cid-7rgrydsz] h2[data-astro-cid-7rgrydsz]{color:#8b4513;font-size:1.2rem;margin-bottom:1rem}.qa-item[data-astro-cid-7rgrydsz] p[data-astro-cid-7rgrydsz]{color:#555;line-height:1.8;margin:0}.footer[data-astro-cid-7rgrydsz]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/admissions/waldorf-qa","isIndex":false,"type":"page","pattern":"^\\/admissions\\/waldorf-qa\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"waldorf-qa","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/waldorf-qa.astro","pathname":"/admissions/waldorf-qa","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-7uqn37ex]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-7uqn37ex] h1[data-astro-cid-7uqn37ex]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-7uqn37ex] p[data-astro-cid-7uqn37ex]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-7uqn37ex]{padding:4rem 2rem}.container[data-astro-cid-7uqn37ex]{max-width:800px;margin:0 auto}.content-block[data-astro-cid-7uqn37ex]{background:#fff;padding:2rem;border-radius:20px;margin-bottom:1.5rem;box-shadow:0 10px 40px #8b45131a}.content-block[data-astro-cid-7uqn37ex] h2[data-astro-cid-7uqn37ex]{color:#8b4513;font-size:1.5rem;margin-bottom:1rem}.content-block[data-astro-cid-7uqn37ex] p[data-astro-cid-7uqn37ex]{color:#666;line-height:1.8;margin-bottom:1rem}.content-block[data-astro-cid-7uqn37ex] ul[data-astro-cid-7uqn37ex]{padding-left:1.5rem}.content-block[data-astro-cid-7uqn37ex] li[data-astro-cid-7uqn37ex]{color:#555;padding:.5rem 0}.footer[data-astro-cid-7uqn37ex]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/admissions/whatis","isIndex":false,"type":"page","pattern":"^\\/admissions\\/whatis\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}],[{"content":"whatis","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions/whatis.astro","pathname":"/admissions/whatis","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-macr5mom]{background:linear-gradient(135deg,#ff8c00,gold);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-macr5mom] h1[data-astro-cid-macr5mom]{font-size:3rem;margin-bottom:.5rem}.section[data-astro-cid-macr5mom]{padding:4rem 2rem}.container[data-astro-cid-macr5mom]{max-width:1000px;margin:0 auto}.admissions-card[data-astro-cid-macr5mom]{background:#fff;border-radius:30px;padding:3rem;text-align:center;box-shadow:0 20px 60px #8b451326;position:relative;overflow:hidden}.admissions-card[data-astro-cid-macr5mom]:before{content:\"\";position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(90deg,#8b4513,#228b22,#ff8c00)}.badge[data-astro-cid-macr5mom]{display:inline-block;background:#228b22;color:#fff;padding:.5rem 1.5rem;border-radius:20px;font-weight:700;margin-bottom:1rem}.admissions-card[data-astro-cid-macr5mom] h2[data-astro-cid-macr5mom]{font-size:2.5rem;color:#8b4513;margin-bottom:.5rem}.subtitle[data-astro-cid-macr5mom]{color:#666;font-size:1.2rem;margin-bottom:2rem}.info-grid[data-astro-cid-macr5mom]{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;margin:2rem 0;text-align:left}.info-item[data-astro-cid-macr5mom]{display:flex;gap:1rem;align-items:flex-start;padding:1rem;background:#fff8dc;border-radius:15px}.info-icon[data-astro-cid-macr5mom]{font-size:1.5rem}.info-item[data-astro-cid-macr5mom] h4[data-astro-cid-macr5mom]{color:#8b4513;margin:0 0 .3rem}.info-item[data-astro-cid-macr5mom] p[data-astro-cid-macr5mom]{margin:0;color:#666}.btn-primary[data-astro-cid-macr5mom].large{font-size:1.2rem;padding:1rem 3rem;margin-top:1rem}.process[data-astro-cid-macr5mom]{background:linear-gradient(135deg,wheat,#fff8dc)}.section-title[data-astro-cid-macr5mom]{text-align:center;font-size:2rem;color:#8b4513;margin-bottom:3rem}.process-steps[data-astro-cid-macr5mom]{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:1rem}.step[data-astro-cid-macr5mom]{background:#fff;padding:1.5rem;border-radius:20px;text-align:center;width:150px;box-shadow:0 10px 30px #8b45131a}.step-number[data-astro-cid-macr5mom]{width:40px;height:40px;background:linear-gradient(135deg,#ff8c00,gold);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.2rem;margin:0 auto 1rem}.step[data-astro-cid-macr5mom] h3[data-astro-cid-macr5mom]{color:#8b4513;font-size:1rem;margin-bottom:.5rem}.step[data-astro-cid-macr5mom] p[data-astro-cid-macr5mom]{color:#666;font-size:.85rem;margin:0}.step-arrow[data-astro-cid-macr5mom]{font-size:2rem;color:#8b4513;font-weight:700}.features[data-astro-cid-macr5mom]{background:#fff}.features-grid[data-astro-cid-macr5mom]{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem}.feature-card[data-astro-cid-macr5mom]{background:linear-gradient(135deg,#fff8dc,wheat);padding:2rem;border-radius:20px;text-align:center;box-shadow:0 10px 30px #8b45131a}.feature-icon[data-astro-cid-macr5mom]{font-size:3rem;margin-bottom:1rem}.feature-card[data-astro-cid-macr5mom] h3[data-astro-cid-macr5mom]{color:#8b4513;margin-bottom:.5rem}.feature-card[data-astro-cid-macr5mom] p[data-astro-cid-macr5mom]{color:#666;margin:0}.footer[data-astro-cid-macr5mom]{background:#333;color:#fff;padding:2rem;text-align:center}@media(max-width:768px){.process-steps[data-astro-cid-macr5mom]{flex-direction:column}.step-arrow[data-astro-cid-macr5mom]{transform:rotate(90deg)}}\n"}],"routeData":{"route":"/admissions","isIndex":false,"type":"page","pattern":"^\\/admissions\\/?$","segments":[[{"content":"admissions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admissions.astro","pathname":"/admissions","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-sl2ubhge]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-sl2ubhge] h1[data-astro-cid-sl2ubhge]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-sl2ubhge] p[data-astro-cid-sl2ubhge]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-sl2ubhge]{padding:4rem 2rem}.container[data-astro-cid-sl2ubhge]{max-width:800px;margin:0 auto}.calendar-intro[data-astro-cid-sl2ubhge]{text-align:center;margin-bottom:2rem}.calendar-intro[data-astro-cid-sl2ubhge] p[data-astro-cid-sl2ubhge]{display:inline-block;background:#228b22;color:#fff;padding:.5rem 1.5rem;border-radius:20px;font-size:1.1rem}.calendar-intro[data-astro-cid-sl2ubhge] .note[data-astro-cid-sl2ubhge]{display:block;background:none;color:#666;font-size:.9rem;margin-top:1rem;padding:0}.btn-add[data-astro-cid-sl2ubhge]{display:inline-block;background:#4285f4;color:#fff;padding:.8rem 1.5rem;border-radius:25px;text-decoration:none;margin-top:1rem;font-weight:500;transition:transform .2s}.btn-add[data-astro-cid-sl2ubhge]:hover{transform:scale(1.05)}.calendar-embed[data-astro-cid-sl2ubhge]{background:#fff;border-radius:20px;padding:1rem;margin-top:2rem;box-shadow:0 10px 40px #8b45131a}.month-section[data-astro-cid-sl2ubhge]{background:#fff;border-radius:20px;padding:2rem;box-shadow:0 10px 40px #8b45131a}.month-title[data-astro-cid-sl2ubhge]{color:#8b4513;font-size:1.5rem;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:2px solid #e0d4c8}.event-list[data-astro-cid-sl2ubhge]{display:flex;flex-direction:column;gap:1rem}.event-item[data-astro-cid-sl2ubhge]{display:flex;gap:1rem;padding:1rem;border-radius:15px;background:#f9f9f9;transition:transform .2s ease}.event-item[data-astro-cid-sl2ubhge]:hover{transform:translate(5px)}.event-item[data-astro-cid-sl2ubhge].highlight{background:linear-gradient(135deg,#e8f5e9,#fff);border-left:4px solid #228B22}.event-item[data-astro-cid-sl2ubhge].holiday{background:linear-gradient(135deg,#fff3e0,#fff);border-left:4px solid #ff9800}.event-date[data-astro-cid-sl2ubhge]{display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:60px;padding:.5rem;background:#8b4513;color:#fff;border-radius:10px}.event-date[data-astro-cid-sl2ubhge] .day[data-astro-cid-sl2ubhge]{font-size:1.2rem;font-weight:700}.event-date[data-astro-cid-sl2ubhge] .week[data-astro-cid-sl2ubhge]{font-size:.75rem;opacity:.9}.event-content[data-astro-cid-sl2ubhge]{display:flex;align-items:center}.event-content[data-astro-cid-sl2ubhge] h3[data-astro-cid-sl2ubhge]{color:#555;font-size:1rem;margin:0}.note[data-astro-cid-sl2ubhge]{margin-top:2rem;padding:1.5rem;background:#f5f5f5;border-radius:15px;text-align:center}.note[data-astro-cid-sl2ubhge] p[data-astro-cid-sl2ubhge]{color:#666;margin:.3rem 0;font-size:.95rem}.footer[data-astro-cid-sl2ubhge]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/calendar","isIndex":false,"type":"page","pattern":"^\\/calendar\\/?$","segments":[[{"content":"calendar","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/calendar.astro","pathname":"/calendar","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-uw5kdbxl]{background:linear-gradient(135deg,#228b22,#8b4513);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-uw5kdbxl] h1[data-astro-cid-uw5kdbxl]{font-size:3rem;margin-bottom:.5rem}.section[data-astro-cid-uw5kdbxl]{padding:4rem 2rem}.container[data-astro-cid-uw5kdbxl]{max-width:1000px;margin:0 auto}.section-title[data-astro-cid-uw5kdbxl]{text-align:center;font-size:2rem;color:#8b4513;margin-bottom:3rem}.contact-grid[data-astro-cid-uw5kdbxl]{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem}.contact-card[data-astro-cid-uw5kdbxl]{background:#fff;padding:2rem;border-radius:20px;text-align:center;box-shadow:0 10px 40px #8b45131a;transition:transform .3s ease}.contact-card[data-astro-cid-uw5kdbxl]:hover{transform:translateY(-5px)}.contact-icon[data-astro-cid-uw5kdbxl]{font-size:3rem;margin-bottom:1rem}.contact-card[data-astro-cid-uw5kdbxl] h3[data-astro-cid-uw5kdbxl]{color:#8b4513;margin-bottom:.5rem}.contact-card[data-astro-cid-uw5kdbxl] p[data-astro-cid-uw5kdbxl]{color:#666;margin:0;line-height:1.6}.contact-card[data-astro-cid-uw5kdbxl] a[data-astro-cid-uw5kdbxl]{color:inherit;text-decoration:none;display:block}.contact-card[data-astro-cid-uw5kdbxl] a[data-astro-cid-uw5kdbxl]:hover{color:#8b4513}.map-section[data-astro-cid-uw5kdbxl]{background:wheat}.map-container[data-astro-cid-uw5kdbxl]{border-radius:20px;overflow:hidden;box-shadow:0 10px 40px #8b451326}.contact-form[data-astro-cid-uw5kdbxl]{background:#fff;padding:3rem;border-radius:20px;box-shadow:0 10px 40px #8b45131a;max-width:600px;margin:0 auto}.form-group[data-astro-cid-uw5kdbxl]{margin-bottom:1.5rem}.form-group[data-astro-cid-uw5kdbxl] label[data-astro-cid-uw5kdbxl]{display:block;color:#8b4513;font-weight:500;margin-bottom:.5rem}.form-group[data-astro-cid-uw5kdbxl] input[data-astro-cid-uw5kdbxl],.form-group[data-astro-cid-uw5kdbxl] select[data-astro-cid-uw5kdbxl],.form-group[data-astro-cid-uw5kdbxl] textarea[data-astro-cid-uw5kdbxl]{width:100%;padding:12px 15px;border:2px solid #e0d4c8;border-radius:10px;font-size:1rem;transition:border-color .3s ease;font-family:inherit}.form-group[data-astro-cid-uw5kdbxl] input[data-astro-cid-uw5kdbxl]:focus,.form-group[data-astro-cid-uw5kdbxl] select[data-astro-cid-uw5kdbxl]:focus,.form-group[data-astro-cid-uw5kdbxl] textarea[data-astro-cid-uw5kdbxl]:focus{outline:none;border-color:#8b4513}.form-group[data-astro-cid-uw5kdbxl] textarea[data-astro-cid-uw5kdbxl]{resize:vertical}.btn-primary[data-astro-cid-uw5kdbxl]{width:100%;text-align:center}.footer[data-astro-cid-uw5kdbxl]{background:#333;color:#fff;padding:2rem;text-align:center}@media(max-width:768px){.contact-grid[data-astro-cid-uw5kdbxl]{grid-template-columns:1fr}}\n"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.development-gallery[data-astro-cid-yuswycl2]{display:flex;flex-direction:column;gap:3rem;margin-top:2rem}.development-gallery[data-astro-cid-yuswycl2] img[data-astro-cid-yuswycl2]{width:100%;max-width:1000px;height:auto;margin:0 auto;display:block;border-radius:8px;box-shadow:0 4px 12px #00000026}\n"}],"routeData":{"route":"/curriculum/development","isIndex":false,"type":"page","pattern":"^\\/curriculum\\/development\\/?$","segments":[[{"content":"curriculum","dynamic":false,"spread":false}],[{"content":"development","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/curriculum/development.astro","pathname":"/curriculum/development","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-aoc3oxeh]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-aoc3oxeh] h1[data-astro-cid-aoc3oxeh]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-aoc3oxeh] p[data-astro-cid-aoc3oxeh]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-aoc3oxeh]{padding:4rem 2rem}.container[data-astro-cid-aoc3oxeh]{max-width:1000px;margin:0 auto}.content-block[data-astro-cid-aoc3oxeh]{background:#fff;padding:2rem;border-radius:20px;margin-bottom:2rem;box-shadow:0 10px 40px #8b45131a}.content-block[data-astro-cid-aoc3oxeh] h2[data-astro-cid-aoc3oxeh]{color:#8b4513;font-size:1.5rem;margin-bottom:1rem;border-bottom:2px solid #FFD700;padding-bottom:.5rem}.content-block[data-astro-cid-aoc3oxeh] p[data-astro-cid-aoc3oxeh]{color:#666;line-height:1.8}.grade-section[data-astro-cid-aoc3oxeh]{margin:2rem 0}.grade-section[data-astro-cid-aoc3oxeh] h3[data-astro-cid-aoc3oxeh]{color:#228b22;font-size:1.3rem;margin-bottom:1rem;padding-bottom:.5rem;border-bottom:1px solid #e0e0e0}.video-grid[data-astro-cid-aoc3oxeh]{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:1rem}@media(max-width:900px){.video-grid[data-astro-cid-aoc3oxeh]{grid-template-columns:repeat(2,1fr)}}@media(max-width:600px){.video-grid[data-astro-cid-aoc3oxeh]{grid-template-columns:1fr}}.video-item[data-astro-cid-aoc3oxeh]{background:#f9f9f9;border-radius:15px;overflow:hidden;box-shadow:0 4px 15px #0000001a}.video-container[data-astro-cid-aoc3oxeh]{position:relative;padding-bottom:56.25%;height:0;overflow:hidden}.video-container[data-astro-cid-aoc3oxeh] iframe[data-astro-cid-aoc3oxeh]{position:absolute;top:0;left:0;width:100%;height:100%}.video-item[data-astro-cid-aoc3oxeh] p[data-astro-cid-aoc3oxeh]{padding:1rem;margin:0;font-size:.95rem;color:#555;text-align:center}.footer[data-astro-cid-aoc3oxeh]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/curriculum/elementary-courses","isIndex":false,"type":"page","pattern":"^\\/curriculum\\/elementary-courses\\/?$","segments":[[{"content":"curriculum","dynamic":false,"spread":false}],[{"content":"elementary-courses","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/curriculum/elementary-courses.astro","pathname":"/curriculum/elementary-courses","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-x2wqwdyn]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-x2wqwdyn] h1[data-astro-cid-x2wqwdyn]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-x2wqwdyn] p[data-astro-cid-x2wqwdyn]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-x2wqwdyn]{padding:4rem 2rem}.container[data-astro-cid-x2wqwdyn]{max-width:1000px;margin:0 auto}h2[data-astro-cid-x2wqwdyn]{color:#8b4513;font-size:1.8rem;margin:3rem 0 1.5rem;border-bottom:2px solid #8B4513;padding-bottom:.5rem}h2[data-astro-cid-x2wqwdyn]:first-of-type{margin-top:0}.downloads[data-astro-cid-x2wqwdyn]{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1rem;margin-bottom:1.5rem}.download-item[data-astro-cid-x2wqwdyn]{display:flex;align-items:center;gap:1rem;padding:1rem 1.5rem;background:#fff;border-radius:12px;box-shadow:0 4px 12px #0000001a;text-decoration:none;color:#333;transition:transform .2s,box-shadow .2s}.download-item[data-astro-cid-x2wqwdyn]:hover{transform:translateY(-2px);box-shadow:0 6px 16px #00000026}.download-item[data-astro-cid-x2wqwdyn] .icon[data-astro-cid-x2wqwdyn]{font-size:1.5rem}.schedule-table[data-astro-cid-x2wqwdyn]{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem;margin-bottom:1.5rem}.schedule-item[data-astro-cid-x2wqwdyn]{display:block;padding:1rem 1.5rem;background:#f5f5f5;border-radius:12px;text-decoration:none;color:#333;text-align:center;transition:background .2s}.schedule-item[data-astro-cid-x2wqwdyn]:hover{background:#e0e0e0}.content-block[data-astro-cid-x2wqwdyn]{background:#fff;padding:2rem;border-radius:12px;box-shadow:0 4px 12px #0000001a;margin-bottom:1.5rem}.content-block[data-astro-cid-x2wqwdyn] p[data-astro-cid-x2wqwdyn]{line-height:1.8;color:#555}.video-grid[data-astro-cid-x2wqwdyn]{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:2rem;margin-bottom:2rem}.video-item[data-astro-cid-x2wqwdyn]{background:#fff;padding:1.5rem;border-radius:12px;box-shadow:0 4px 12px #0000001a}.video-item[data-astro-cid-x2wqwdyn] h3[data-astro-cid-x2wqwdyn]{color:#8b4513;font-size:1.1rem;margin-bottom:1rem}.video-item[data-astro-cid-x2wqwdyn] iframe[data-astro-cid-x2wqwdyn]{border-radius:8px}.footer[data-astro-cid-x2wqwdyn]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}@media(max-width:768px){.video-grid[data-astro-cid-x2wqwdyn]{grid-template-columns:1fr}}\n"}],"routeData":{"route":"/curriculum/normalization","isIndex":false,"type":"page","pattern":"^\\/curriculum\\/normalization\\/?$","segments":[[{"content":"curriculum","dynamic":false,"spread":false}],[{"content":"normalization","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/curriculum/normalization.astro","pathname":"/curriculum/normalization","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-ahfpvkce]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-ahfpvkce] h1[data-astro-cid-ahfpvkce]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-ahfpvkce] p[data-astro-cid-ahfpvkce]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-ahfpvkce]{padding:4rem 2rem}.container[data-astro-cid-ahfpvkce]{max-width:800px;margin:0 auto}.qa-item[data-astro-cid-ahfpvkce]{background:#fff;padding:2rem;border-radius:20px;margin-bottom:1.5rem;box-shadow:0 10px 40px #8b45131a}.qa-item[data-astro-cid-ahfpvkce] h2[data-astro-cid-ahfpvkce]{color:#8b4513;font-size:1.2rem;margin-bottom:1rem}.qa-item[data-astro-cid-ahfpvkce] p[data-astro-cid-ahfpvkce]{color:#555;line-height:1.8;margin:0}.footer[data-astro-cid-ahfpvkce]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/curriculum/qa","isIndex":false,"type":"page","pattern":"^\\/curriculum\\/qa\\/?$","segments":[[{"content":"curriculum","dynamic":false,"spread":false}],[{"content":"qa","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/curriculum/qa.astro","pathname":"/curriculum/qa","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-jtliznfa]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-jtliznfa] h1[data-astro-cid-jtliznfa]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-jtliznfa] p[data-astro-cid-jtliznfa]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-jtliznfa]{padding:4rem 2rem}.container[data-astro-cid-jtliznfa]{max-width:1000px;margin:0 auto}.qa-gallery[data-astro-cid-jtliznfa]{display:flex;flex-direction:column;gap:3rem}.qa-gallery[data-astro-cid-jtliznfa] img[data-astro-cid-jtliznfa]{width:100%;height:auto;display:block;border-radius:8px;box-shadow:0 4px 12px #00000026}.footer[data-astro-cid-jtliznfa]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/curriculum/qa-gallery","isIndex":false,"type":"page","pattern":"^\\/curriculum\\/qa-gallery\\/?$","segments":[[{"content":"curriculum","dynamic":false,"spread":false}],[{"content":"qa-gallery","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/curriculum/qa-gallery.astro","pathname":"/curriculum/qa-gallery","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-xzkd7til]{background:linear-gradient(135deg,#ff8c00,gold);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-xzkd7til] h1[data-astro-cid-xzkd7til]{font-size:3rem;margin-bottom:.5rem}.section[data-astro-cid-xzkd7til]{padding:4rem 2rem}.container[data-astro-cid-xzkd7til]{max-width:900px;margin:0 auto}.course-card[data-astro-cid-xzkd7til]{background:#fff;border-radius:25px;padding:2.5rem;margin-bottom:2rem;box-shadow:0 15px 50px #8b451326;display:flex;gap:2rem;align-items:flex-start}.course-icon[data-astro-cid-xzkd7til]{font-size:4rem;flex-shrink:0}.course-card[data-astro-cid-xzkd7til] h2[data-astro-cid-xzkd7til]{color:#8b4513;font-size:1.8rem;margin-bottom:1.5rem}.course-content[data-astro-cid-xzkd7til] h3[data-astro-cid-xzkd7til]{color:#228b22;font-size:1.1rem;margin-bottom:.3rem;margin-top:1rem}.course-content[data-astro-cid-xzkd7til] h3[data-astro-cid-xzkd7til]:first-child{margin-top:0}.course-content[data-astro-cid-xzkd7til] p[data-astro-cid-xzkd7til]{color:#666;margin:0;line-height:1.6}.footer[data-astro-cid-xzkd7til]{background:#333;color:#fff;padding:2rem;text-align:center}@media(max-width:768px){.course-card[data-astro-cid-xzkd7til]{flex-direction:column;text-align:center}.course-icon[data-astro-cid-xzkd7til]{margin:0 auto}}\n"}],"routeData":{"route":"/curriculum/special","isIndex":false,"type":"page","pattern":"^\\/curriculum\\/special\\/?$","segments":[[{"content":"curriculum","dynamic":false,"spread":false}],[{"content":"special","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/curriculum/special.astro","pathname":"/curriculum/special","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-bbvjh2fe]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-bbvjh2fe] h1[data-astro-cid-bbvjh2fe]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-bbvjh2fe] p[data-astro-cid-bbvjh2fe]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-bbvjh2fe]{padding:4rem 2rem}.container[data-astro-cid-bbvjh2fe]{max-width:800px;margin:0 auto}.content-block[data-astro-cid-bbvjh2fe]{background:#fff;padding:2rem;border-radius:20px;margin-bottom:1.5rem;box-shadow:0 10px 40px #8b45131a}.content-block[data-astro-cid-bbvjh2fe] h2[data-astro-cid-bbvjh2fe]{color:#8b4513;font-size:1.5rem;margin-bottom:1rem}.content-block[data-astro-cid-bbvjh2fe] p[data-astro-cid-bbvjh2fe]{color:#666;line-height:1.8;margin-bottom:1rem}.content-block[data-astro-cid-bbvjh2fe] ul[data-astro-cid-bbvjh2fe]{padding-left:1.5rem}.content-block[data-astro-cid-bbvjh2fe] li[data-astro-cid-bbvjh2fe]{color:#555;padding:.5rem 0}.footer[data-astro-cid-bbvjh2fe]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/curriculum/whatis","isIndex":false,"type":"page","pattern":"^\\/curriculum\\/whatis\\/?$","segments":[[{"content":"curriculum","dynamic":false,"spread":false}],[{"content":"whatis","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/curriculum/whatis.astro","pathname":"/curriculum/whatis","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-rlwg7hn6]{background:linear-gradient(135deg,#228b22,#8b4513);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-rlwg7hn6] h1[data-astro-cid-rlwg7hn6]{font-size:3rem;margin-bottom:.5rem}.section[data-astro-cid-rlwg7hn6]{padding:4rem 2rem}.container[data-astro-cid-rlwg7hn6]{max-width:1000px;margin:0 auto}.philosophy-intro[data-astro-cid-rlwg7hn6]{text-align:center;background:linear-gradient(135deg,#fff8dc,wheat);padding:3rem;border-radius:30px}.philosophy-intro[data-astro-cid-rlwg7hn6] h2[data-astro-cid-rlwg7hn6]{color:#8b4513;font-size:2rem;margin-bottom:1rem}.philosophy-intro[data-astro-cid-rlwg7hn6] p[data-astro-cid-rlwg7hn6]{color:#666;font-size:1.1rem;line-height:1.8;max-width:700px;margin:0 auto}.curriculum-card[data-astro-cid-rlwg7hn6]{background:#fff;border-radius:30px;overflow:hidden;margin-bottom:3rem;box-shadow:0 15px 50px #8b451326}.curriculum-header[data-astro-cid-rlwg7hn6]{padding:2rem;color:#fff;text-align:center}.curriculum-card[data-astro-cid-rlwg7hn6].elementary .curriculum-header[data-astro-cid-rlwg7hn6]{background:linear-gradient(135deg,#ff8c00,gold)}.curriculum-card[data-astro-cid-rlwg7hn6].middle .curriculum-header[data-astro-cid-rlwg7hn6]{background:linear-gradient(135deg,#228b22,#32cd32)}.curriculum-card[data-astro-cid-rlwg7hn6].high .curriculum-header[data-astro-cid-rlwg7hn6]{background:linear-gradient(135deg,#8b4513,sienna)}.grade-badge[data-astro-cid-rlwg7hn6]{display:inline-block;background:#ffffff4d;padding:.3rem 1rem;border-radius:20px;font-size:.9rem;margin-bottom:.5rem}.curriculum-header[data-astro-cid-rlwg7hn6] h2[data-astro-cid-rlwg7hn6]{margin:0;font-size:1.8rem}.curriculum-content[data-astro-cid-rlwg7hn6]{padding:2rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.5rem}.curriculum-block[data-astro-cid-rlwg7hn6]{background:#fff8dc;padding:1.5rem;border-radius:15px}.curriculum-block[data-astro-cid-rlwg7hn6] h3[data-astro-cid-rlwg7hn6]{color:#8b4513;font-size:1.1rem;margin-bottom:1rem;padding-bottom:.5rem;border-bottom:2px solid #e0d4c8}.curriculum-block[data-astro-cid-rlwg7hn6] ul[data-astro-cid-rlwg7hn6]{list-style:none;padding:0;margin:0}.curriculum-block[data-astro-cid-rlwg7hn6] li[data-astro-cid-rlwg7hn6]{color:#666;padding:.4rem 0 .4rem 1.2rem;position:relative}.curriculum-block[data-astro-cid-rlwg7hn6] li[data-astro-cid-rlwg7hn6]:before{content:\"✦\";position:absolute;left:0;color:#ff8c00;font-size:.8rem}.section-title[data-astro-cid-rlwg7hn6]{text-align:center;font-size:2rem;color:#8b4513;margin-bottom:3rem}.features[data-astro-cid-rlwg7hn6]{background:linear-gradient(135deg,wheat,#fff8dc)}.features-grid[data-astro-cid-rlwg7hn6]{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem}.feature-card[data-astro-cid-rlwg7hn6]{background:#fff;padding:2rem;border-radius:20px;text-align:center;box-shadow:0 10px 30px #8b45131a}.feature-icon[data-astro-cid-rlwg7hn6]{font-size:3rem;margin-bottom:1rem}.feature-card[data-astro-cid-rlwg7hn6] h3[data-astro-cid-rlwg7hn6]{color:#8b4513;margin-bottom:.5rem}.feature-card[data-astro-cid-rlwg7hn6] p[data-astro-cid-rlwg7hn6]{color:#666;margin:0;font-size:.95rem;line-height:1.5}.footer[data-astro-cid-rlwg7hn6]{background:#333;color:#fff;padding:2rem;text-align:center}\n"}],"routeData":{"route":"/curriculum","isIndex":false,"type":"page","pattern":"^\\/curriculum\\/?$","segments":[[{"content":"curriculum","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/curriculum.astro","pathname":"/curriculum","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-pybm4prc]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-pybm4prc] h1[data-astro-cid-pybm4prc]{font-size:3rem;margin-bottom:.5rem}.hero-small[data-astro-cid-pybm4prc] p[data-astro-cid-pybm4prc]{font-size:1.2rem;opacity:.9}.section[data-astro-cid-pybm4prc]{padding:4rem 2rem}.container[data-astro-cid-pybm4prc]{max-width:800px;margin:0 auto}.intro[data-astro-cid-pybm4prc]{text-align:center;color:#666;margin-bottom:2rem}.finance-section[data-astro-cid-pybm4prc]{background:#fff;padding:2rem;border-radius:20px;margin-bottom:2rem;box-shadow:0 10px 40px #8b45131a}.finance-section[data-astro-cid-pybm4prc] h2[data-astro-cid-pybm4prc]{color:#8b4513;font-size:1.5rem;margin-bottom:1.5rem;border-bottom:2px solid #FFD700;padding-bottom:.5rem}.finance-item[data-astro-cid-pybm4prc]{display:flex;justify-content:space-between;align-items:center;padding:1rem 0;border-bottom:1px solid #eee}.finance-item[data-astro-cid-pybm4prc]:last-child{border-bottom:none}.finance-info[data-astro-cid-pybm4prc] h3[data-astro-cid-pybm4prc]{color:#333;margin:0 0 .3rem}.finance-info[data-astro-cid-pybm4prc] .date[data-astro-cid-pybm4prc]{color:#888;font-size:.9rem;margin:0}.download-btn[data-astro-cid-pybm4prc]{background:linear-gradient(135deg,#ff8c00,orange);color:#fff;padding:.6rem 1.2rem;border-radius:20px;text-decoration:none;font-size:.9rem;white-space:nowrap}.footer[data-astro-cid-pybm4prc]{background:#333;color:#fff;padding:2rem;text-align:center;margin-top:2rem}\n"}],"routeData":{"route":"/finance","isIndex":false,"type":"page","pattern":"^\\/finance\\/?$","segments":[[{"content":"finance","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/finance.astro","pathname":"/finance","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.fb-wrapper[data-astro-cid-ix27ilic]{background:#1a1a2e;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px #00000080;margin:2rem auto;max-width:960px;font-family:sans-serif}.fb-header[data-astro-cid-ix27ilic]{background:linear-gradient(135deg,#6b3a2a,#2d6a2d);color:#fff;padding:.9rem 1.2rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.6rem}.fb-title[data-astro-cid-ix27ilic]{display:flex;align-items:center;gap:.5rem;font-size:1.1rem;font-weight:700}.fb-semester[data-astro-cid-ix27ilic]{font-size:.85rem;font-weight:400;opacity:.85;margin-left:.3rem}.fb-controls[data-astro-cid-ix27ilic]{display:flex;align-items:center;gap:.7rem;flex-wrap:wrap}.fb-pageinfo[data-astro-cid-ix27ilic]{font-size:.9rem;white-space:nowrap}.fb-btn[data-astro-cid-ix27ilic]{background:#fff3;border:1px solid rgba(255,255,255,.35);color:#fff;padding:.45rem 1rem;border-radius:6px;cursor:pointer;font-size:.95rem;transition:background .2s,transform .1s;white-space:nowrap}.fb-btn[data-astro-cid-ix27ilic]:hover{background:#ffffff59;transform:scale(1.04)}.fb-fullscreen-btn[data-astro-cid-ix27ilic]{font-size:1.1rem;padding:.45rem .7rem}.fb-loading[data-astro-cid-ix27ilic]{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:420px;color:#ccc;gap:1rem;font-size:1rem}.fb-spinner[data-astro-cid-ix27ilic]{width:48px;height:48px;border:4px solid rgba(255,255,255,.2);border-top-color:#fff;border-radius:50%;animation:fb-spin .8s linear infinite}@keyframes fb-spin{to{transform:rotate(360deg)}}.fb-stage[data-astro-cid-ix27ilic]{background:radial-gradient(ellipse at center,#2c2c4a,#0f0f1e);padding:24px 12px;min-height:420px;display:flex;justify-content:center;align-items:center}.stf__parent{box-shadow:0 8px 40px #000000b3}.fb-page-item img{image-rendering:-webkit-optimize-contrast;image-rendering:crisp-edges}.fb-thumbs[data-astro-cid-ix27ilic]{display:flex;gap:6px;padding:10px 12px;overflow-x:auto;background:#111126;scrollbar-width:thin;scrollbar-color:#444 transparent}.fb-thumbs[data-astro-cid-ix27ilic]::-webkit-scrollbar{height:4px}.fb-thumbs[data-astro-cid-ix27ilic]::-webkit-scrollbar-thumb{background:#444;border-radius:2px}.fb-thumb[data-astro-cid-ix27ilic]{height:60px;width:auto;border-radius:4px;cursor:pointer;opacity:.55;border:2px solid transparent;transition:opacity .2s,border-color .2s,transform .15s;flex-shrink:0;object-fit:cover}.fb-thumb[data-astro-cid-ix27ilic]:hover{opacity:.85;transform:scale(1.08)}.fb-thumb-active[data-astro-cid-ix27ilic]{opacity:1;border-color:#7ec87e;transform:scale(1.1)}.fb-thumb-more[data-astro-cid-ix27ilic]{height:60px;min-width:60px;background:#ffffff14;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#aaa;font-size:.8rem;flex-shrink:0}[data-astro-cid-ix27ilic]:fullscreen .fb-wrapper[data-astro-cid-ix27ilic],[data-astro-cid-ix27ilic]:-webkit-full-screen .fb-wrapper[data-astro-cid-ix27ilic]{border-radius:0;max-width:100vw;height:100vh}@media(max-width:640px){.fb-header[data-astro-cid-ix27ilic]{flex-direction:column;text-align:center}.fb-controls[data-astro-cid-ix27ilic]{justify-content:center}.fb-stage[data-astro-cid-ix27ilic]{padding:12px 6px;min-height:320px}.fb-thumb[data-astro-cid-ix27ilic]{height:44px}}.intro[data-astro-cid-pyvotnj4]{text-align:center;font-size:1.2rem;color:#666;margin-bottom:1rem}.links-grid[data-astro-cid-pyvotnj4]{display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;max-width:800px;margin:0 auto}.links-grid[data-astro-cid-pyvotnj4] a[data-astro-cid-pyvotnj4]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:.8rem 1.2rem;border-radius:25px;text-decoration:none;font-weight:500;transition:transform .3s}.links-grid[data-astro-cid-pyvotnj4] a[data-astro-cid-pyvotnj4]:hover{transform:scale(1.05)}\n"}],"routeData":{"route":"/newsletter/[id]","isIndex":false,"type":"page","pattern":"^\\/newsletter\\/([^/]+?)\\/?$","segments":[[{"content":"newsletter","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/newsletter/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero[data-astro-cid-4ptckbda]{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:4rem 2rem;text-align:center}.hero[data-astro-cid-4ptckbda] h1[data-astro-cid-4ptckbda]{font-size:2.5rem;margin-bottom:.5rem}.hero[data-astro-cid-4ptckbda] p[data-astro-cid-4ptckbda]{font-size:1.1rem;opacity:.9}.section[data-astro-cid-4ptckbda]{padding:3rem 2rem}.container[data-astro-cid-4ptckbda]{max-width:1000px;margin:0 auto}.latest-card[data-astro-cid-4ptckbda]{display:flex;gap:2rem;align-items:flex-start;background:#fff;border-radius:20px;padding:2rem;box-shadow:0 12px 40px #0000001f;margin-bottom:3rem}.latest-cover-link[data-astro-cid-4ptckbda]{position:relative;flex-shrink:0;display:block;width:200px}.latest-cover[data-astro-cid-4ptckbda]{width:100%;border-radius:10px;box-shadow:4px 4px 20px #00000040;display:block}.latest-badge[data-astro-cid-4ptckbda]{position:absolute;top:-10px;left:-10px;background:linear-gradient(135deg,#e74c3c,#c0392b);color:#fff;font-size:.75rem;font-weight:700;padding:4px 10px;border-radius:20px;box-shadow:0 2px 8px #0003}.latest-info[data-astro-cid-4ptckbda]{flex:1;padding-top:.5rem}.latest-info[data-astro-cid-4ptckbda] h2[data-astro-cid-4ptckbda]{font-size:1.8rem;color:#8b4513;margin-bottom:.5rem}.latest-info[data-astro-cid-4ptckbda] .semester[data-astro-cid-4ptckbda]{color:#666;font-size:1rem;margin-bottom:1.5rem}.read-btn[data-astro-cid-4ptckbda]{display:inline-block;background:linear-gradient(135deg,#8b4513,#228b22);color:#fff;padding:.8rem 2rem;border-radius:30px;text-decoration:none;font-size:1.05rem;font-weight:600;transition:transform .2s,box-shadow .2s;box-shadow:0 4px 15px #8b451359}.read-btn[data-astro-cid-4ptckbda]:hover{transform:scale(1.05);box-shadow:0 6px 20px #8b451373}.section-title[data-astro-cid-4ptckbda]{font-size:1.3rem;color:#8b4513;margin-bottom:1.2rem;padding-bottom:.5rem;border-bottom:2px solid #e8d5c0}.issues-grid[data-astro-cid-4ptckbda]{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:1.2rem}.issue-card[data-astro-cid-4ptckbda]{text-decoration:none;color:inherit;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 15px #0000001a;transition:transform .25s,box-shadow .25s}.issue-card[data-astro-cid-4ptckbda]:hover{transform:translateY(-5px);box-shadow:0 10px 30px #0000002e}.cover-wrap[data-astro-cid-4ptckbda]{position:relative;overflow:hidden;aspect-ratio:3/4;background:#f0ebe5}.issue-cover[data-astro-cid-4ptckbda]{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s}.issue-card[data-astro-cid-4ptckbda]:hover .issue-cover[data-astro-cid-4ptckbda]{transform:scale(1.05)}.cover-overlay[data-astro-cid-4ptckbda]{position:absolute;inset:0;background:#8b4513b3;color:#fff;display:flex;align-items:center;justify-content:center;font-size:.9rem;font-weight:600;opacity:0;transition:opacity .25s}.issue-card[data-astro-cid-4ptckbda]:hover .cover-overlay[data-astro-cid-4ptckbda]{opacity:1}.issue-info[data-astro-cid-4ptckbda]{padding:.6rem .7rem}.issue-info[data-astro-cid-4ptckbda] h4[data-astro-cid-4ptckbda]{font-size:.9rem;color:#8b4513;margin:0 0 .2rem;font-weight:700}.issue-info[data-astro-cid-4ptckbda] p[data-astro-cid-4ptckbda]{font-size:.75rem;color:#888;margin:0;line-height:1.3}@media(max-width:600px){.latest-card[data-astro-cid-4ptckbda]{flex-direction:column;align-items:center;text-align:center}.latest-cover-link[data-astro-cid-4ptckbda]{width:160px}.issues-grid[data-astro-cid-4ptckbda]{grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:.8rem}}\n"}],"routeData":{"route":"/newsletter","isIndex":true,"type":"page","pattern":"^\\/newsletter\\/?$","segments":[[{"content":"newsletter","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/newsletter/index.astro","pathname":"/newsletter","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n.hero-small[data-astro-cid-bonii7em]{background:linear-gradient(135deg,#ff8c00,gold);color:#fff;padding:4rem 2rem;text-align:center}.hero-small[data-astro-cid-bonii7em] h1[data-astro-cid-bonii7em]{font-size:3rem;margin-bottom:.5rem}.section[data-astro-cid-bonii7em]{padding:4rem 2rem}.container[data-astro-cid-bonii7em]{max-width:800px;margin:0 auto}.intro-block[data-astro-cid-bonii7em]{background:#fff;padding:2rem;border-radius:20px;margin-bottom:2rem;box-shadow:0 10px 40px #8b45131a}.intro-block[data-astro-cid-bonii7em] p[data-astro-cid-bonii7em]{color:#666;line-height:1.8;margin-bottom:1rem}.intro-block[data-astro-cid-bonii7em] ul[data-astro-cid-bonii7em]{padding-left:1.5rem;color:#666}.intro-block[data-astro-cid-bonii7em] li[data-astro-cid-bonii7em]{padding:.5rem 0}.bank-card[data-astro-cid-bonii7em]{background:#fff;padding:2rem;border-radius:20px;margin-bottom:2rem;box-shadow:0 10px 40px #8b45131a}.bank-card[data-astro-cid-bonii7em] h2[data-astro-cid-bonii7em]{color:#8b4513;font-size:1.5rem;margin-bottom:1.5rem;padding-bottom:.5rem;border-bottom:2px solid #e0d4c8}.bank-item[data-astro-cid-bonii7em]{background:#fff8dc;padding:1.5rem;border-radius:15px;margin-bottom:1rem}.bank-item[data-astro-cid-bonii7em]:last-child{margin-bottom:0}.bank-item[data-astro-cid-bonii7em] h3[data-astro-cid-bonii7em]{color:#228b22;font-size:1.1rem;margin-bottom:.5rem}.bank-item[data-astro-cid-bonii7em] p[data-astro-cid-bonii7em]{color:#666;margin:.3rem 0}.notice[data-astro-cid-bonii7em]{background:linear-gradient(135deg,#228b22,#8b4513);color:#fff;padding:2rem;border-radius:20px;text-align:center}.notice[data-astro-cid-bonii7em] p[data-astro-cid-bonii7em]{margin:.5rem 0;font-size:1.1rem}.footer[data-astro-cid-bonii7em]{background:#333;color:#fff;padding:2rem;text-align:center}\n"}],"routeData":{"route":"/support","isIndex":false,"type":"page","pattern":"^\\/support\\/?$","segments":[[{"content":"support","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/support.astro","pathname":"/support","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:Noto Sans TC,Microsoft JhengHei,PingFang TC,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom,20px)}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.5rem}h2[data-astro-cid-sckkx6r4]{font-size:1.2rem}h3[data-astro-cid-sckkx6r4]{font-size:1rem}}@media(max-width:480px){h1[data-astro-cid-sckkx6r4]{font-size:1.6rem}h2[data-astro-cid-sckkx6r4]{font-size:1.3rem}h3[data-astro-cid-sckkx6r4]{font-size:1.1rem}}:root{--color-primary: #8B4513;--color-secondary: #228B22;--color-accent: #FF8C00;--color-warm: #FFD700;--color-cream: #FFF8DC;--color-soft-pink: #FFE4E1;--color-sky: #87CEEB}*{box-sizing:border-box}html{font-family:Noto Sans TC,sans-serif;background:linear-gradient(135deg,#fdf6e3,#fff8dc,#fef3c7);color:#333}body{min-height:100vh;margin:0;padding:0}h1,h2,h3,.handwritten{font-family:Liu Jian Mao Cao,Zhi Mang Xing,KaiTi,cursive;font-weight:400}.gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.card{background:#ffffffe6;border-radius:20px;box-shadow:0 10px 40px #8b45131a;backdrop-filter:blur(10px)}.btn-primary{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:#fff;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:500;transition:all .3s ease;border:none;cursor:pointer;display:inline-block}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px #8b45134d}\n.header[data-astro-cid-pux6a34n]{background:#fffffff2;backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;box-shadow:0 2px 20px #8b45131a}.container[data-astro-cid-pux6a34n]{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo[data-astro-cid-pux6a34n]{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:#8b4513}.logo-img[data-astro-cid-pux6a34n]{height:60px;width:auto}.logo-icon[data-astro-cid-pux6a34n]{font-size:2rem}.logo-text[data-astro-cid-pux6a34n]{font-family:Liu Jian Mao Cao,Zhi Mang Xing,cursive;font-size:1.5rem}.nav[data-astro-cid-pux6a34n]{display:flex;gap:.5rem}.nav-item[data-astro-cid-pux6a34n]{position:relative}.nav-link[data-astro-cid-pux6a34n]{text-decoration:none;color:#666;font-weight:500;padding:.5rem 1rem;border-radius:20px;transition:all .3s ease;display:block}.nav-link[data-astro-cid-pux6a34n]:hover{background:linear-gradient(135deg,#8b4513,#228b22);color:#fff}.nav-toggle[data-astro-cid-pux6a34n]{display:block;background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}@media(min-width:1025px){.nav-toggle[data-astro-cid-pux6a34n]{display:none}}.submenu[data-astro-cid-pux6a34n]{display:none;position:absolute;top:100%;left:0;background:#fff;border-radius:15px;box-shadow:0 10px 40px #8b451333;min-width:180px;overflow:hidden;z-index:10}.nav-item[data-astro-cid-pux6a34n]:hover .submenu[data-astro-cid-pux6a34n]{display:block}.submenu-link[data-astro-cid-pux6a34n]{display:block;padding:.8rem 1rem;color:#666;text-decoration:none;transition:all .2s ease}.submenu-link[data-astro-cid-pux6a34n]:hover{background:#fff8dc;color:#8b4513}@media(max-width:1024px){.container[data-astro-cid-pux6a34n]{flex-direction:row;flex-wrap:wrap;justify-content:space-between}.nav[data-astro-cid-pux6a34n]{display:none;position:fixed;inset:0;background:#fff;padding:5rem 1.5rem 2rem;box-shadow:0 10px 20px #0000001a;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:99}.nav[data-astro-cid-pux6a34n].open{display:flex;flex-direction:column}.nav-toggle[data-astro-cid-pux6a34n]{display:block!important;font-size:1.5rem;cursor:pointer;border:none;background:none;position:relative;z-index:101}.nav-close-btn[data-astro-cid-pux6a34n]{display:none;position:fixed;top:1rem;right:1.2rem;z-index:102;font-size:1.8rem;background:none;border:none;cursor:pointer;color:#8b4513;line-height:1}.nav-close-btn[data-astro-cid-pux6a34n].visible{display:block}}\n"},{"type":"external","src":"_astro/index@_@astro.BSn64mz1.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"serverLike":true,"middlewareMode":"classic","base":"/","trailingSlash":"ignore","compressHTML":true,"experimentalQueuedRendering":{"enabled":false,"poolSize":0,"contentCache":false},"componentMetadata":[["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admin/editor.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/about/association.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/about/campus.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/about/history.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/about/parent-schedule.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/about/parents.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/about/teachers.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/about/team.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/about/vision.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/about/waldorf-list.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/activities/achievement.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/activities/experience.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/activities/highlights.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/activities/photos.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/activities/seasons.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/activities/seminars.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/activities/videos.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admin/edit.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admin/edit/[id].astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admin/index.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admin/newsletter/[id].astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admissions.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admissions/apply.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admissions/faq.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admissions/guide.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admissions/refund.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admissions/seminar.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admissions/transfer-out.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admissions/transportation.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admissions/tuition.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admissions/visit.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admissions/waldorf-qa.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admissions/whatis.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/calendar.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/curriculum.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/curriculum/development.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/curriculum/elementary-courses.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/curriculum/normalization.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/curriculum/qa-gallery.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/curriculum/qa.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/curriculum/special.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/curriculum/whatis.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/finance.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/newsletter/[id].astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/newsletter/index.astro",{"propagation":"none","containsHead":true}],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/support.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000virtual:astro:actions/noop-entrypoint":"chunks/noop-entrypoint_BOlrdqWF.mjs","\u0000virtual:astro:middleware":"virtual_astro_middleware.mjs","\u0000virtual:astro:session-driver":"chunks/_virtual_astro_session-driver_DYx9Bb3p.mjs","\u0000virtual:astro:server-island-manifest":"chunks/_virtual_astro_server-island-manifest_CQQ1F5PF.mjs","astro/entrypoints/prerender":"prerender-entry.esaJ8jb4.mjs","@astrojs/vercel/entrypoint":"entry.mjs","\u0000virtual:astro:page:src/pages/about/association@_@astro":"chunks/association_gEg3U2Oo.mjs","\u0000virtual:astro:page:src/pages/about/campus@_@astro":"chunks/campus_DAmdFwiE.mjs","\u0000virtual:astro:page:src/pages/about/history@_@astro":"chunks/history_D98Davq2.mjs","\u0000virtual:astro:page:src/pages/about/parent-schedule@_@astro":"chunks/parent-schedule_YaG3E8dC.mjs","\u0000virtual:astro:page:src/pages/about/parents@_@astro":"chunks/parents_DxpOFwPU.mjs","\u0000virtual:astro:page:src/pages/about/teachers@_@astro":"chunks/teachers_Bp-U-ss8.mjs","\u0000virtual:astro:page:src/pages/about/team@_@astro":"chunks/team_hI1ox5B0.mjs","\u0000virtual:astro:page:src/pages/about/vision@_@astro":"chunks/vision_Bp3O8T7_.mjs","\u0000virtual:astro:page:src/pages/about/waldorf-list@_@astro":"chunks/waldorf-list_Cs_HUO4C.mjs","\u0000virtual:astro:page:src/pages/about@_@astro":"chunks/about_yzwkrUnI.mjs","\u0000virtual:astro:page:src/pages/activities/achievement@_@astro":"chunks/achievement_C33Zp_W2.mjs","\u0000virtual:astro:page:src/pages/activities/experience@_@astro":"chunks/experience_DEHOrc8V.mjs","\u0000virtual:astro:page:src/pages/activities/highlights@_@astro":"chunks/highlights_BCWZtssp.mjs","\u0000virtual:astro:page:src/pages/activities/photos@_@astro":"chunks/photos_D4hfZVec.mjs","\u0000virtual:astro:page:src/pages/activities/seasons@_@astro":"chunks/seasons_beXJc3bi.mjs","\u0000virtual:astro:page:src/pages/activities/seminars@_@astro":"chunks/seminars_W1sq0NiG.mjs","\u0000virtual:astro:page:src/pages/activities/videos@_@astro":"chunks/videos_DiXoqdJP.mjs","\u0000virtual:astro:page:src/pages/admin/edit/[id]@_@astro":"chunks/_id__D59x4aKP.mjs","\u0000virtual:astro:page:src/pages/admin/edit@_@astro":"chunks/edit_qqDwuKdk.mjs","\u0000virtual:astro:page:src/pages/admin/editor@_@astro":"chunks/editor_DpKi0_Xr.mjs","\u0000virtual:astro:page:src/pages/admin/logout@_@astro":"chunks/logout_BeVcUWh_.mjs","\u0000virtual:astro:page:src/pages/admin/newsletter/[id]@_@astro":"chunks/_id__DECD9p5e.mjs","\u0000virtual:astro:page:src/pages/admin/index@_@astro":"chunks/index_BWTai6uf.mjs","\u0000virtual:astro:page:src/pages/admissions/apply@_@astro":"chunks/apply_B816baF7.mjs","\u0000virtual:astro:page:src/pages/admissions/faq@_@astro":"chunks/faq_Bc4DKG78.mjs","\u0000virtual:astro:page:src/pages/admissions/guide@_@astro":"chunks/guide_Co7I8jIv.mjs","\u0000virtual:astro:page:src/pages/admissions/refund@_@astro":"chunks/refund_BC0PfeqJ.mjs","\u0000virtual:astro:page:src/pages/admissions/seminar@_@astro":"chunks/seminar_i9-1Ew1B.mjs","\u0000virtual:astro:page:src/pages/admissions/transfer-out@_@astro":"chunks/transfer-out_CDn3zxQ7.mjs","\u0000virtual:astro:page:src/pages/admissions/transportation@_@astro":"chunks/transportation_B3xdp9w3.mjs","\u0000virtual:astro:page:src/pages/admissions/tuition@_@astro":"chunks/tuition_DocREoPz.mjs","\u0000virtual:astro:page:src/pages/admissions/visit@_@astro":"chunks/visit_89bjhzXq.mjs","\u0000virtual:astro:page:src/pages/admissions/waldorf-qa@_@astro":"chunks/waldorf-qa_CnEbi34J.mjs","\u0000virtual:astro:page:src/pages/admissions/whatis@_@astro":"chunks/whatis_a0kUmZjd.mjs","\u0000virtual:astro:page:src/pages/admissions@_@astro":"chunks/admissions_B-FMh_YR.mjs","\u0000virtual:astro:page:src/pages/calendar@_@astro":"chunks/calendar_DYJ_VYAv.mjs","\u0000virtual:astro:page:src/pages/contact@_@astro":"chunks/contact_Bb7gyJeL.mjs","\u0000virtual:astro:page:src/pages/curriculum/development@_@astro":"chunks/development_D_LP9HDC.mjs","\u0000virtual:astro:page:src/pages/curriculum/elementary-courses@_@astro":"chunks/elementary-courses_DYh5rthg.mjs","\u0000virtual:astro:page:src/pages/curriculum/normalization@_@astro":"chunks/normalization_DxC4Eq1Q.mjs","\u0000virtual:astro:page:src/pages/curriculum/qa@_@astro":"chunks/qa_CEqJm1vS.mjs","\u0000virtual:astro:page:src/pages/curriculum/qa-gallery@_@astro":"chunks/qa-gallery_uNo5TD46.mjs","\u0000virtual:astro:page:src/pages/curriculum/special@_@astro":"chunks/special_CrBIJ_Qg.mjs","\u0000virtual:astro:page:src/pages/curriculum/whatis@_@astro":"chunks/whatis_Dqgb46dz.mjs","\u0000virtual:astro:page:src/pages/curriculum@_@astro":"chunks/curriculum_D3mm3fDl.mjs","\u0000virtual:astro:page:src/pages/finance@_@astro":"chunks/finance_JoAD07l5.mjs","\u0000virtual:astro:page:src/pages/newsletter/[id]@_@astro":"chunks/_id__B4Em-QuF.mjs","\u0000virtual:astro:page:src/pages/newsletter/index@_@astro":"chunks/index_3tjT4ZsX.mjs","\u0000virtual:astro:page:src/pages/support@_@astro":"chunks/support_D6fGbc3j.mjs","\u0000virtual:astro:page:src/pages/index@_@astro":"chunks/index_BZXGXZrK.mjs","/Users/sam/.openclaw/workspace/waldorf-website/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BrsbZg4B.mjs","/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admin/edit.astro?astro&type=script&index=0&lang.ts":"_astro/edit.astro_astro_type_script_index_0_lang.CjDwlFt2.js","/Users/sam/.openclaw/workspace/waldorf-website/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.Ithjr3zM.js","/Users/sam/.openclaw/workspace/waldorf-website/src/components/Navigation.astro?astro&type=script&index=0&lang.ts":"_astro/Navigation.astro_astro_type_script_index_0_lang.4YRaZkrr.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admin/edit.astro?astro&type=script&index=0&lang.ts","let n={},o=\"home\";async function a(){try{n=await(await fetch(\"/data/pages.json\")).json(),o=new URLSearchParams(window.location.search).get(\"page\")||\"home\";const t=n[o]||{title:\"未找到\",content:\"<p>請選擇頁面</p>\"};document.getElementById(\"pageTitle\").textContent=\"✏️ \"+t.title,document.getElementById(\"editorArea\").innerHTML=t.content||\"\"}catch(e){console.error(\"載入失敗:\",e),document.getElementById(\"pageTitle\").textContent=\"✏️ 載入失敗\"}}a();window.onbeforeunload=function(){return\"您有未儲存的變更，確定要離開嗎？\"};"],["/Users/sam/.openclaw/workspace/waldorf-website/src/pages/index.astro?astro&type=script&index=0&lang.ts","async function l(){try{const t=await(await fetch(\"/home-data.json\")).json();if(t.trees&&t.trees.groups){const c=t.trees.groups.split(\"|\").filter(e=>e.trim()),s={雲杉:\"🌲\",月桂:\"🌙\",星辰:\"⭐\",澄月:\"🌙\",銀杏:\"🍂\",暖陽:\"☀️\",海洋:\"🌊\",雲彩:\"☁️\",茉莉:\"🌸\",芙蓉:\"🌺\",榕樹:\"🌳\",天使:\"👼\",彩虹:\"🌈\",水晶:\"💎\"};let i=\"\";c.forEach((e,d)=>{const a=e.includes(\"畢業\")||e.includes(\"彩虹\")||e.includes(\"水晶\");let o=\"🌱\";for(const r in s)if(e.includes(r)){o=s[r];break}i+=`<div class=\"tree-item\">\n              <div style=\"font-size: 2.5rem;\">${o}</div>\n              <div style=\"color: #333; font-size: 0.85rem; font-weight: 600; margin-top: 0.5rem;\">${e}</div>\n            </div>`}),document.getElementById(\"trees-container\").innerHTML=i}}catch{console.log(\"載入樹苗資料失敗\")}}l();"],["/Users/sam/.openclaw/workspace/waldorf-website/src/components/Navigation.astro?astro&type=script&index=0&lang.ts","const c=document.getElementById(\"nav-toggle-btn\"),t=document.querySelector(\".nav\"),e=document.createElement(\"button\");e.className=\"nav-close-btn\";e.textContent=\"✕\";document.body.appendChild(e);function s(){t.classList.add(\"open\"),document.body.style.overflow=\"hidden\",e.classList.add(\"visible\")}function n(){t.classList.remove(\"open\"),document.body.style.overflow=\"\",e.classList.remove(\"visible\")}c?.addEventListener(\"click\",()=>{t.classList.contains(\"open\")?n():s()});e.addEventListener(\"click\",n);t?.querySelectorAll(\"a\").forEach(o=>{o.addEventListener(\"click\",n)});"]],"assets":["/112-g7.pdf","/112-g8.pdf","/112-g9.pdf","/112-檢核表.pdf","/113-g7.pdf","/113-g8.pdf","/113-g9.pdf","/113-晤談紀錄表.pdf","/113-檢核表.pdf","/114-g7.pdf","/114-g8.pdf","/114-g9.pdf","/114-晤談紀錄表.pdf","/114-檢核表.pdf","/20230313-10_orig.jpg","/20230313-11_orig.jpg","/20230313-12_orig.jpg","/20230313-13_orig.jpg","/20230313-1_orig.jpg","/20230313-2_orig.jpg","/20230313-3_orig.jpg","/20230313-4_orig.jpg","/20230313-5_orig.jpg","/20230313-6_orig.jpg","/20230313-7_orig.jpg","/20230313-8_orig.jpg","/20230313-9_orig.jpg","/admin-cms-backup.html","/admin-cms.html","/favicon.ico","/favicon.svg","/home-data.json","/news.json","/qa-1.jpg","/qa-10.jpg","/qa-11.jpg","/qa-12.jpg","/qa-13.jpg","/qa-14.jpg","/qa-15.jpg","/qa-16.jpg","/qa-17.jpg","/qa-18.jpg","/qa-19.jpg","/qa-2.jpg","/qa-20.jpg","/qa-21.jpg","/qa-22.jpg","/qa-23.jpg","/qa-24.jpg","/qa-3.jpg","/qa-4.jpg","/qa-5.jpg","/qa-6.jpg","/qa-7.jpg","/qa-8.jpg","/qa-9.jpg","/teachers.json","/test-cms.html","/achievement/education-2021-1.jpg","/achievement/g10-drama-2024-1.jpg","/achievement/g10-drama-2024-10.jpg","/achievement/g10-drama-2024-11.jpg","/achievement/g10-drama-2024-12.jpg","/achievement/g10-drama-2024-2.jpg","/achievement/g10-drama-2024-3.jpg","/achievement/g10-drama-2024-4.jpg","/achievement/g10-drama-2024-5.jpg","/achievement/g10-drama-2024-6.jpg","/achievement/g10-drama-2024-7.jpg","/achievement/g10-drama-2024-8.jpg","/achievement/g10-drama-2024-9.jpg","/achievement/g10-drama-2026-1.jpg","/achievement/g12-angel-2025-1.jpg","/achievement/g12-crystal-grad-2025-1.jpg","/achievement/g12-dream-2023-1.jpg","/achievement/g6-drama-2024-1.jpg","/achievement/g6-drama-2024-2.jpg","/achievement/g6-drama-2024-3.jpg","/achievement/g6-drama-2024-4.jpg","/achievement/g6-drama-2024-5.jpg","/achievement/g6-drama-2024-6.jpg","/achievement/g6-drama-2024-7.jpg","/achievement/g6-drama-2024-8.jpg","/achievement/g6-drama-2024-9.jpg","/achievement/g6-ocean-ceremony-2025-1.jpg","/achievement/g6-ocean-report-2025-1.png","/achievement/g7-drama-2024-1.jpg","/achievement/g7-drama-2024-2.jpg","/achievement/g7-drama-2024-3.jpg","/achievement/g7-drama-2024-4.jpg","/achievement/g7-drama-2024-5.jpg","/achievement/g7-drama-2024-6.jpg","/achievement/g8-project-2023-1.png","/achievement/g9-lotus-grad-2025-1.jpg","/achievement/reading-2022-1.jpg","/achievement/reading-2022-2.jpg","/admin/config.yml","/admin/dashboard.html","/admin/editor.html","/admin/home-editor.html","/admin/index.html","/admin/visual-editor.html","/blog/autumn-2025-1.jpg","/blog/autumn-beach-1.jpg","/blog/autumn-beach-2.jpg","/blog/autumn-beach-3.jpg","/blog/autumn-beach-4.jpg","/blog/autumn-beach-5.jpg","/blog/autumn-beach-6.jpg","/blog/spring-2022-may-1.jpg","/blog/spring-2022-may-2.jpg","/blog/spring-2022-may-3.jpg","/blog/spring-2022-may-4.jpg","/blog/spring-2022-may-5.jpg","/blog/spring-2022-may-6.jpg","/blog/spring-2024-1.jpg","/blog/spring-2024-2.jpg","/blog/summer-2022-1.jpg","/blog/summer-2025-1.jpg","/blog/winter-2023-1.jpg","/blog/winter-2023-2.jpg","/blog/winter-2023-3.jpg","/blog/winter-2023-4.jpg","/blog/winter-2023-5.jpg","/blog/winter-2025-1.jpg","/blog/winter-2025-2.jpg","/blog/winter-2025-3.jpg","/blog/winter-2025-4.jpg","/blog/winter-2025-5.jpg","/blog/winter-2025-6.jpg","/blog-experience/autumn-2023-1.jpg","/blog-experience/autumn-2023-2.jpg","/blog-experience/autumn-2023-3.jpg","/blog-experience/autumn-2023-4.jpg","/blog-experience/dream-2024-1.jpg","/blog-experience/dream-2024-2.jpg","/blog-experience/dream-2024-3.jpg","/blog-experience/dream-2024-4.jpg","/blog-experience/dream-2024-5.jpg","/blog-experience/dream-2024-6.jpg","/blog-experience/run-2025-1.jpg","/blog-experience/run-2025-2.jpg","/blog-experience/run-2025-3.jpg","/blog-experience/run-2025-4.jpg","/blog-experience/run-2025-5.jpg","/blog-experience/run-2025-6.jpg","/images/logo-test.png","/highlights/highlight-2023-10-1.jpg","/highlights/highlight-2023-10-2.jpg","/highlights/highlight-2023-10-3.jpg","/highlights/highlight-2023-10-4.jpg","/highlights/highlight-2023-10-5.jpg","/highlights/highlight-2023-10-6.jpg","/highlights/highlight-2023-11-1.jpg","/highlights/highlight-2023-11-2.jpg","/highlights/highlight-2023-11-3.jpg","/highlights/highlight-2023-11-4.jpg","/highlights/highlight-2023-11-5.jpg","/highlights/highlight-2023-11-6.jpg","/highlights/highlight-2024-01-1.jpg","/highlights/highlight-2024-01-2.jpg","/highlights/highlight-2024-01-3.jpg","/highlights/highlight-2024-01-4.jpg","/highlights/highlight-2024-01-5.jpg","/highlights/highlight-2024-01-6.jpg","/highlights/highlight-2024-1.jpg","/highlights/highlight-2024-2.jpg","/highlights/highlight-2024-3.jpg","/highlights/highlight-2024-4.jpg","/highlights/highlight-2024-5.jpg","/highlights/highlight-2024-6.jpg","/seminars/seminar-2021-11-1.jpg","/seminars/seminar-2021-11-2.jpg","/seminars/seminar-2022-09-1.jpg","/seminars/seminar-2022-09-2.jpg","/seminars/seminar-2022-1.jpg","/seminars/seminar-2023-03-1.jpg","/seminars/seminar-2023-03-2.jpg","/seminars/seminar-2023-03-3.jpg","/seminars/seminar-2023-1.jpg","/seminars/seminar-2023-2.jpg","/seminars/seminar-2023-3.jpg","/seminars/seminar-2023-4.jpg","/seminars/seminar-2023-5.jpg","/seminars/seminar-2023-6.jpg","/seminars/seminar-2025-1.jpg","/data/pages.json","/images/brand/logo1.png","/images/brand/logo2.png","/images/brand/logo3.png","/images/brand/logo4.png","/images/teachers/admin-team.png","/images/teachers/admin.png","/images/teachers/chen-jiahui.jpg","/images/teachers/chen-shushi.jpg","/images/teachers/fu-liru.jpg","/images/teachers/gao-yujun.jpg","/images/teachers/guo-jiayou.jpg","/images/teachers/hou-mulong.jpg","/images/teachers/huang-wanru.jpg","/images/teachers/jiang-yichen.jpg","/images/teachers/lin-jiaqian.jpg","/images/teachers/lin-jiying.jpg","/images/teachers/luo-shuping.jpg","/images/teachers/pan-yizhen.jpg","/images/teachers/pan-yunru.jpg","/images/teachers/principal.png","/images/teachers/su-yongzhen.jpg","/images/teachers/tang-fanhao.jpg","/images/teachers/teacher1.png","/images/teachers/teacher2.png","/images/teachers/teacher3.png","/images/teachers/teacher4.png","/images/teachers/teacher5.png","/images/teachers/teacher_new1.jpg","/images/teachers/teacher_new10.jpg","/images/teachers/teacher_new11.jpg","/images/teachers/teacher_new12.jpg","/images/teachers/teacher_new13.jpg","/images/teachers/teacher_new14.jpg","/images/teachers/teacher_new15.jpg","/images/teachers/teacher_new16.jpg","/images/teachers/teacher_new17.jpg","/images/teachers/teacher_new18.jpg","/images/teachers/teacher_new19.jpg","/images/teachers/teacher_new2.jpg","/images/teachers/teacher_new20.jpg","/images/teachers/teacher_new3.jpg","/images/teachers/teacher_new4.jpg","/images/teachers/teacher_new5.jpg","/images/teachers/teacher_new6.jpg","/images/teachers/teacher_new7.jpg","/images/teachers/teacher_new8.jpg","/images/teachers/teacher_new9.jpg","/images/teachers/wang-rjun.jpg","/images/teachers/wu-yingmiao.jpg","/images/teachers/xie-chunhan.jpg","/images/teachers/xu-dinyuan.jpg","/images/teachers/xu.jpg","/images/teachers/ye-youzhu.jpg","/images/teachers/yu-lianchen.jpg","/images/teachers/zhan-yawen.jpg","/images/teachers/zhang-siting.jpg","/images/teachers/zheng-jingzhong.jpg"],"buildFormat":"directory","checkOrigin":true,"actionBodySizeLimit":1048576,"serverIslandBodySizeLimit":1048576,"allowedDomains":[],"key":"THEQATyhl58gWTyWP4HKq2t4QNUY3t2+S6BztQA5AG0=","image":{},"devToolbar":{"enabled":false,"debugInfoOutput":""},"logLevel":"info","shouldInjectCspMetaTags":false}));
					const manifestRoutes = _manifest.routes;
					
					const manifest = Object.assign(_manifest, {
					  renderers,
					  actions: () => import('./noop-entrypoint_BOlrdqWF.mjs'),
					  middleware: () => import('../virtual_astro_middleware.mjs'),
					  sessionDriver: () => import('./_virtual_astro_session-driver_DYx9Bb3p.mjs'),
					  
					  serverIslandMappings: () => import('./_virtual_astro_server-island-manifest_CQQ1F5PF.mjs'),
					  routes: manifestRoutes,
					  pageMap,
					});

const createApp$1 = ({ streaming } = {}) => {
  return new App(manifest, streaming);
};

const createApp = createApp$1;

function getFirstForwardedValue(multiValueHeader) {
  return multiValueHeader?.toString()?.split(",").map((e) => e.trim())?.[0];
}
const IP_RE = /^[0-9a-fA-F.:]{1,45}$/;
function isValidIpAddress(value) {
  return IP_RE.test(value);
}
function getValidatedIpFromHeader(headerValue) {
  const raw = getFirstForwardedValue(headerValue);
  if (raw && isValidIpAddress(raw)) {
    return raw;
  }
  return void 0;
}
function getClientIpAddress(request) {
  return getValidatedIpFromHeader(request.headers.get("x-forwarded-for"));
}

const app = createApp();
var entrypoint_default = {
  async fetch(request) {
    const url = new URL(request.url);
    const middlewareSecretHeader = request.headers.get(ASTRO_MIDDLEWARE_SECRET_HEADER);
    const hasValidMiddlewareSecret = middlewareSecretHeader === middlewareSecret;
    let realPath = void 0;
    if (hasValidMiddlewareSecret) {
      realPath = request.headers.get(ASTRO_PATH_HEADER);
    } else if (request.headers.get("x-vercel-isr") === "1") {
      realPath = url.searchParams.get(ASTRO_PATH_PARAM);
    }
    if (typeof realPath === "string") {
      url.pathname = realPath;
      request = new Request(url.toString(), {
        method: request.method,
        headers: request.headers,
        body: request.body
      });
    }
    const routeData = app.match(request);
    let locals = {};
    const astroLocalsHeader = request.headers.get(ASTRO_LOCALS_HEADER);
    if (astroLocalsHeader) {
      if (!hasValidMiddlewareSecret) {
        return new Response("Forbidden", { status: 403 });
      }
      locals = JSON.parse(astroLocalsHeader);
    }
    if (hasValidMiddlewareSecret) {
      request.headers.delete(ASTRO_MIDDLEWARE_SECRET_HEADER);
    }
    const response = await app.render(request, {
      routeData,
      clientAddress: getClientIpAddress(request),
      locals
    });
    if (app.setCookieHeaders) {
      for (const setCookieHeader of app.setCookieHeaders(response)) {
        response.headers.append("Set-Cookie", setCookieHeader);
      }
    }
    return response;
  }
};

export { types as a, entrypoint_default as e, isRemoteAllowed as i, renderComponent as r, spreadAttributes as s, typeHandlers as t };
