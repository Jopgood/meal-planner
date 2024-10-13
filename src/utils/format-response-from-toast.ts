// utils/format-response-for-toast.ts

function truncate(str: string, length: number): string {
  return str.length > length ? str.substring(0, length) + "..." : str;
}

export function formatResponseForToast(
  res: any,
  maxLength: number = 15
): string {
  const formatValue = (value: any): any => {
    if (value === null || value === undefined) return undefined;
    if (typeof value === "string") return truncate(value, maxLength);
    if (typeof value === "object") return formatObject(value);
    return value;
  };

  const formatObject = (obj: any): any => {
    const formatted: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const formattedValue = formatValue(value);
      if (formattedValue !== undefined) {
        formatted[key] = formattedValue;
      }
    }
    return formatted;
  };

  const formattedRes = formatObject(res);
  return JSON.stringify(formattedRes, null, 2);
}
