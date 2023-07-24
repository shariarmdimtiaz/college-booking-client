import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../../../Providers/ThemeProvider';
import useResearch from '../../../Hooks/useResearch';
import ResearchCard from './ResearchCard';
import AOS from "aos";

const Research = () => {
  const { containerStyles } = useContext(ThemeContext);
  const [ResearchInfo, refetch, dataLoading] = useResearch();
  const researchData = ResearchInfo.slice(0, 10);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);

  return (
    <div style={containerStyles}>
      <div data-aos="fade-up" className="container mx-auto">
        <h2 className="font-bold text-5xl text-center pt-[50px]">
          Research Article
        </h2>
        <div className="grid grid-cols-1 gap-2 py-[50px]">
          {researchData.map((research, index) => (
            <ResearchCard key={research._id} index={index} research={research}></ResearchCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Research;