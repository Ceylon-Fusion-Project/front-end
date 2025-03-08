import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MapPin,
  Video,
} from "lucide-react";
import { theme } from "@/styles/theme";

interface ProductAccordionProps {
  certificationList: Array<{
    certificationName: string;
    issuer: string;
    certURL: string;
  }>;
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

        {/* Certifications List Section */}
        {openSection === "certifications" && (
          <div
            className="p-4 space-y-3 bg-white"
            //style={{ color: theme.colors.textPrimary, backgroundColor: theme.colors.background }}
          >
            <ul className="list-disc pl-5 space-y-2">
              {certificationList.map((cert, index) => (
                <li key={index}>
                  <span className="font-semibold text-[${theme.colors.textPrimary}]">
                    {cert.certificationName}
                  </span>{" "}
                  by {cert.issuer}
                  {". "}
                  <a
                    href={cert.certURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 hover:underline font-medium"
                    style={{ color: theme.colors.link }}
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="h-4 w-4" />{" "}
                    {/* ✅ External Link Icon */}
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
          className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-100 transition-all rounded-t-lg font-semibold text-lg"
          style={{
            transition: theme.transitions.fast,
            color: theme.colors.textPrimary,
          }}
        >
          Product Origin
          {openSection === "productOrigin" ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
        {/* Product Origin Details */}
        {openSection === "productOrigin" && (
          <div className="p-4 bg-white space-y-3">
            <p>
              <strong>State Location:</strong> {productOrigin.stateLocation}{" "}
              <a
                href={productOrigin.stateMapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 hover:underline"
                style={{ color: theme.colors.link }}
              >
                <MapPin className="h-4 w-4 text-red-700" />{" "}
                <span>View on Map</span>
              </a>
            </p>
            <p>
              <strong>Part of Plant:</strong> {productOrigin.partOfPlant}
            </p>
            <p>
              <strong>Description:</strong> {productOrigin.originDescription}
            </p>
            <p>
              <strong>Factory:</strong> {productOrigin.factoryName}
            </p>
            <p>
              <strong>Address:</strong> {productOrigin.factoryAddress}{" "}
            </p>
            <a
              href={productOrigin.factoryMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:underline"
              style={{ color: theme.colors.link }}
            >
              <MapPin className="h-4 w-4 text-red-700" />{" "}
              <span>View Factory on Map</span>
            </a>
            <br />
            {/* Stylish Watch Demo Video Button */}
            <a
              href={productOrigin.demoVideoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 bg-[#3B82F6] hover:bg-[#1E40AF] font-medium rounded-lg shadow-md transition-all duration-200"
              style={{
                //backgroundColor: "#291e10", // A vibrant blue color
                color: "#FFFFFF", // White text for high contrast
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
              }}
            >
              <Video className="h-5 w-5 mr-2 text-white" />
              <span>Watch Demo Video</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
