import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { theme } from "@/styles/theme";
  
  interface Certification {
    certificationName: string;
    issuer: string;
    certURL: string;
  }
  
  interface ProductOrigin {
    stateLocation: string;
    stateMapLink: string;
    partOfPlant: string;
    originDescription: string;
    factoryName: string;
    factoryAddress: string;
    factoryMapLink: string;
    demoVideoLink: string;
  }
  
  interface ProductAccordionProps {
    certificationList: Certification[];
    productOrigin: ProductOrigin;
  }
  
  export default function ProductAccordion({
    certificationList,
    productOrigin,
  }: ProductAccordionProps) {
    return (
      <Accordion
        type="single"
        collapsible
        className={`w-full ${theme.fonts.body} ${theme.colors.background} ${theme.borders.thin} ${theme.shadows.medium} ${theme.transitions.normal} p-4`}
      >
        
        {/* ✅ Certifications Section */}
        <AccordionItem value="Certifications">
          <AccordionTrigger
            className={`${theme.fontSizes.base} md:${theme.fontSizes.lg} font-medium text-${theme.colors.textPrimary}`}
          >
            Certifications
          </AccordionTrigger>
          <AccordionContent>
            {certificationList.length > 0 ? (
              <ul className="list-disc pl-4 md:pl-6 space-y-2">
                {certificationList.map((cert, index) => (
                  <li key={index} className={`text-${theme.colors.textSecondary}`}>
                    <strong>{cert.certificationName}</strong> by {cert.issuer}  
                    {cert.certURL && (
                      <a
                        href={cert.certURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-${theme.colors.link} underline`}
                      >
                        View Certificate
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No certifications available.</p>
            )}
          </AccordionContent>
        </AccordionItem>
  
        {/* ✅ Product Origin Section */}
        <AccordionItem value="Product Origin">
          <AccordionTrigger
            className={`${theme.fontSizes.base} md:${theme.fontSizes.lg} font-medium text-${theme.colors.textPrimary}`}
          >
            Product Origin
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p><strong>State Location:</strong> {productOrigin.stateLocation}</p>
              {productOrigin.stateMapLink && (
                <p>
                  <a
                    href={productOrigin.stateMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-${theme.colors.link} underline`}
                  >
                    View on Map
                  </a>
                </p>
              )}
              <p><strong>Part of Plant:</strong> {productOrigin.partOfPlant}</p>
              <p><strong>Description:</strong> {productOrigin.originDescription}</p>
              <p><strong>Factory:</strong> {productOrigin.factoryName}</p>
              <p><strong>Address:</strong> {productOrigin.factoryAddress}</p>
              {productOrigin.factoryMapLink && (
                <p>
                  <a
                    href={productOrigin.factoryMapLink}
                    target="_blank"
                    className={`text-${theme.colors.link} underline`}
                  >
                    View Factory on Map
                  </a>
                </p>
              )}
              {productOrigin.demoVideoLink && (
                <p>
                  <a
                    href={productOrigin.demoVideoLink}
                    target="_blank"
                    className={`text-${theme.colors.link} underline`}
                  >
                    Watch Demo Video
                  </a>
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
  
      </Accordion>
    );
  }
  