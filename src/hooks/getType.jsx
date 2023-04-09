export default function getType(type) {
    switch (type) {
      case "water":
        return "water";
      case "ice":
        return "ice";
      case "fire":
        return "fire";
      case "electric":
        return "electric";
      case "grass":
        return "grass";
      case "poison":
        return "poison";
      case "rock":
        return "rock";
      case "ground":
        return "ground";
      case "steel":
        return "steel";
      case "fairy":
        return "fairy";
      case "bug":
        return "bug";
      case "normal":
        return "normal";
      case "fighting":
        return "fighting";
      case "psychic":
        return "psychic";
      case "ghost":
        return "ghost";
      case "dark":
        return "dark";
      case "dragon":
        return "dragon";
      default:
        return "unknown";
    }
  }