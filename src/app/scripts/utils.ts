import uuid4 from "uuid4";
import * as LZString from 'lz-string';

export function GenerateComboCode() : string {


  return uuid4();
}


export function CompressCombo(input : string) : string {
  return LZString.compressToEncodedURIComponent(input);
}

export function DecompressCombo(input : string) : string {
  return LZString.decompressFromEncodedURIComponent(input);
}