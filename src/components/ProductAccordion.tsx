import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { theme } from "@/styles/theme";

interface ProductAccordionProps {
  certificationList: Array<{ certificationName: string; issuer: string; certURL: string }>;
  productOrigin: {
    stateLocation: string;
    stateMapLink: string;
    partOfPlant: string;
    originDescription: string;
    factoryName: string;
    factoryAddress: string;
    factoryMapLink: string;
    demoVideoLink: string;
  };
}

export default function ProductAccordion({
  certificationList,
  productOrigin,
}: ProductAccordionProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="space-y-4">
      {/* Certifications Accordion */}
      <div className={`border ${theme.borders.thin} rounded-lg shadow-md`}>
        <button
          onClick={() => toggleSection("certifications")}
          className={`w-full flex justify-between items-center p-4 bg-white hover:bg-gray-100 ${theme.transitions.fast} rounded-t-lg font-semibold text-lg text-[${theme.colors.textPrimary}]`}
        >
          Certifications
          {openSection === "certifications" ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
        {openSection === "certifications" && (
          <div className="p-4 space-y-3 bg-white text-[${theme.colors.textPrimary}]">
            <ul className="list-disc pl-5 space-y-2">
              {certificationList.map((cert, index) => (
                <li key={index}>
                  <span className="font-semibold text-[${theme.colors.primary}]">{cert.certificationName}</span> by {cert.issuer}{" "}
                  <a
                    href={cert.certURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[${theme.colors.link}] hover:underline font-medium`}
                  >
                    View Certificate
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Product Origin Accordion */}
      <div className={`border ${theme.borders.thin} rounded-lg shadow-md`}>
        <button
          onClick={() => toggleSection("productOrigin")}
          className={`w-full flex justify-between items-center p-4 bg-white hover:bg-gray-100 ${theme.transitions.fast} rounded-t-lg font-semibold text-lg text-[${theme.colors.textPrimary}]`}
        >
          Product Origin
          {openSection === "productOrigin" ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
        {openSection === "productOrigin" && (
          <div className="p-4 bg-white space-y-3 text-[${theme.colors.textPrimary}]">
            <p><strong className="text-[${theme.colors.primary}]">State Location:</strong> {productOrigin.stateLocation} <a href={productOrigin.stateMapLink} target="_blank" rel="noopener noreferrer" className={`text-[${theme.colors.link}] hover:underline`}>View on Map</a></p>
            <p><strong className="text-[${theme.colors.primary}]">Part of Plant:</strong> {productOrigin.partOfPlant}</p>
            <p><strong className="text-[${theme.colors.primary}]">Description:</strong> {productOrigin.originDescription}</p>
            <p><strong className="text-[${theme.colors.primary}]">Factory:</strong> {productOrigin.factoryName}</p>
            <p><strong className="text-[${theme.colors.primary}]">Address:</strong> {productOrigin.factoryAddress}</p>
            <a href={productOrigin.factoryMapLink} target="_blank" rel="noopener noreferrer" className={`text-[${theme.colors.link}] hover:underline`}>View Factory on Map</a><br />
            <a href={productOrigin.demoVideoLink} target="_blank" rel="noopener noreferrer" className={`text-[${theme.colors.link}] hover:underline`}>Watch Demo Video</a>
          </div>
        )}
      </div>
    </div>
  );
}
