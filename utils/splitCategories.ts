export function splitCategories(input: string): string[] {
    if (!input) return [];
  
    // Normalize the input by replacing commas with hashes and removing spaces
    const normalizedInput = input.replace(/,\s*/g, '#').replace(/ /g, '_');
    
    // Split the input into an array using the hash symbol as a delimiter
    const categories = normalizedInput.split('#');
  
    // Filter out any empty strings that might result from leading or trailing hashes
    return categories.filter(category => category.length > 0);
  }
  