"use client";
import React from "react";
import { usePage } from "@/contexts/components";
import { CardSection } from "../cardSection";
import { AddComponent } from "../addComponent";
import { renderComponent } from "../renderComponent";
import { Card } from "../card";

const SectionsArea = () => {
  const { addSection, sections } = usePage();

  return (
    <section className="flex flex-col gap-4">
      {sections.map((section) => {
        if (!section.component) {
          return <AddComponent sectionId={section.id} key={section.id} />;
        }
        return (
          <Card key={section.id}>
            {renderComponent(section.component, section.id, false)}
          </Card>
        );
      })}

      <CardSection onClick={addSection}>
        <p>+ Adicionar sessão</p>
      </CardSection>
    </section>
  );
};

export default SectionsArea;
