import { MOCK_PUBLIC_PETS } from "../data/mockPets";

const dogKey = process.env.REACT_APP_DOG_API_KEY || "";
const catKey = process.env.REACT_APP_CAT_API_KEY || "";

function headers(apiKey) {
  const h = { Accept: "application/json" };
  if (apiKey) h["x-api-key"] = apiKey;
  return h;
}

function normalizeDogImage(item, index) {
  const b = item.breeds?.[0];
  return {
    id: `dog-${item.id || index}`,
    species: "dog",
    breed: b?.name || "Mixed breed",
    imageUrl: item.url,
    temperament: b?.temperament || "Loyal companion — details vary by individual",
    lifeSpan: b?.life_span || "Varies",
    origin: b?.origin || "—",
    size: inferSize(b?.weight?.metric),
  };
}

function normalizeCatImage(item, index) {
  const b = item.breeds?.[0];
  return {
    id: `cat-${item.id || index}`,
    species: "cat",
    breed: b?.name || "Domestic",
    imageUrl: item.url,
    temperament: b?.temperament || "Affectionate — personality varies",
    lifeSpan: b?.life_span || "12-16 years",
    origin: b?.origin || "—",
    size: b?.weight ? `${b.weight} (typical)` : "Medium",
  };
}

function inferSize(metricWeight) {
  if (!metricWeight) return "Medium";
  const n = parseInt(String(metricWeight), 10);
  if (Number.isNaN(n)) return "Medium";
  if (n < 12) return "Small";
  if (n < 28) return "Medium";
  return "Large";
}

export async function fetchPublicPets() {
  const dogUrl =
    "https://api.thedogapi.com/v1/images/search?limit=12&size=med&has_breeds=1";
  const catUrl =
    "https://api.thecatapi.com/v1/images/search?limit=12&size=med&has_breeds=1";

  try {
    const [dogRes, catRes] = await Promise.all([
      fetch(dogUrl, { headers: headers(dogKey) }),
      fetch(catUrl, { headers: headers(catKey) }),
    ]);

    const dogJson = dogRes.ok ? await dogRes.json() : [];
    const catJson = catRes.ok ? await catRes.json() : [];
    const dogs = Array.isArray(dogJson) ? dogJson : [];
    const cats = Array.isArray(catJson) ? catJson : [];

    const list = [
      ...dogs.map((d, i) => normalizeDogImage(d, i)),
      ...cats.map((c, i) => normalizeCatImage(c, i)),
    ].filter((p) => p.imageUrl);

    if (list.length === 0) return [...MOCK_PUBLIC_PETS];
    return list;
  } catch {
    return [...MOCK_PUBLIC_PETS];
  }
}
