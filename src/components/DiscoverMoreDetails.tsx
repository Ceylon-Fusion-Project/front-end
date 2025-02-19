interface MoreDataProps {
  nutrition?: string[];
}

export default function DiscoverMoreDetails(nutrition: MoreDataProps) {
  return (
    <section className="mt-12 space-y-6">
      {/* ✅ Show nutrition details as key features */}
      {nutrition.nutrition && nutrition.nutrition.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold">Nutrition Details</h2>
          <h3 className="text-xl font-semibold">Key Features:</h3>
          <ul className="list-disc pl-5 space-y-2">
            {nutrition.nutrition.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-gray-500">No nutritional information available.</p>
      )}
    </section>
  );
}
